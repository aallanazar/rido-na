'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useTranslation } from '@/lib/hooks/useTranslation';
import { PenTool, Type, Eraser, Undo, Redo, Trash2, Highlighter, Pencil, Bold, Italic, Underline, List, LayoutTemplate, Palette, Plus } from 'lucide-react';

interface PracticeEditorProps {
    moduleId: string;
}

type Tool = 'pen' | 'pencil' | 'marker' | 'eraser' | 'highlighter';
type Template = 'blank' | 'lined' | 'grid' | 'dotted';

export function PracticeEditor({ moduleId }: PracticeEditorProps) {
    const { t } = useTranslation();
    const [mode, setMode] = useState<'text' | 'pen'>('pen');
    const [htmlValue, setHtmlValue] = useState<string>('');
    const [tool, setTool] = useState<Tool>('pen');
    const [strokeColor, setStrokeColor] = useState('#000000');
    const [strokeWidth, setStrokeWidth] = useState(2);

    // Page Settings
    const [pageHeight, setPageHeight] = useState(1000); // Initial A4-ish height
    const [template, setTemplate] = useState<Template>('blank');
    const [pageColor, setPageColor] = useState('#ffffff');

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const contextRef = useRef<CanvasRenderingContext2D | null>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const textRef = useRef<HTMLDivElement>(null);
    const [textInitialized, setTextInitialized] = useState(false);

    // Initial load/save
    useEffect(() => {
        const savedHtml = localStorage.getItem(`practice_html_${moduleId}`);
        if (savedHtml) setHtmlValue(savedHtml);

        const savedHeight = localStorage.getItem(`practice_height_${moduleId}`);
        if (savedHeight) setPageHeight(Number(savedHeight));

        const savedTemplate = localStorage.getItem(`practice_template_${moduleId}`);
        if (savedTemplate) setTemplate(savedTemplate as Template);

        const savedColor = localStorage.getItem(`practice_color_${moduleId}`);
        if (savedColor) setPageColor(savedColor);

        setTextInitialized(true);
    }, [moduleId]);

    // Save Page Config changes
    useEffect(() => {
        localStorage.setItem(`practice_height_${moduleId}`, String(pageHeight));
        localStorage.setItem(`practice_template_${moduleId}`, template);
        localStorage.setItem(`practice_color_${moduleId}`, pageColor);
    }, [pageHeight, template, pageColor, moduleId]);

    // Force update innerHTML once initialized
    useEffect(() => {
        if (textInitialized && textRef.current && textRef.current.innerHTML !== htmlValue) {
            if (htmlValue === '') {
                textRef.current.innerHTML = '';
            }
        }
    }, [textInitialized]);

    const handleInput = () => {
        if (textRef.current) {
            const val = textRef.current.innerHTML;
            setHtmlValue(val);
            localStorage.setItem(`practice_html_${moduleId}`, val);
        }
    };

    const execCmd = (command: string, value?: string) => {
        document.execCommand(command, false, value);
        if (textRef.current) textRef.current.focus();
    };

    // Canvas Setup & Resize Logic
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const dpr = window.devicePixelRatio || 1;
        // Logic to preserve content on resize
        // We use a temporary canvas to hold current image
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;
        if (tempCtx) tempCtx.drawImage(canvas, 0, 0);

        // Resize
        // We set the canvas styling width/height via CSS/Attributes to match pageHeight
        // The container handles the width (100%), but height is dynamic
        // Since we are inside a flex-1 container, we need to ensure the canvas matches the scrollable content height
        // actually, we will set the canvas height explicitly based on pageHeight

        // However, we rely on the parent div's width
        const rect = canvas.parentElement?.getBoundingClientRect();
        const width = rect?.width || 800;

        canvas.width = width * dpr;
        canvas.height = pageHeight * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${pageHeight}px`;

        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.scale(dpr, dpr);
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            contextRef.current = ctx; // Re-assign context

            // Restore drawing
            // Strategy 1: Load from storage if this is init
            // Strategy 2: Load from temp canvas if this is resize

            // Simple check: if temp canvas has content (not empty), use it. 
            // BUT initial load also triggers this.
            // Let's rely on storage for persistence.
            // If resizing, we should save to storage first? 

            const savedDrawing = localStorage.getItem(`practice_drawing_${moduleId}`);
            if (savedDrawing) {
                const img = new Image();
                img.src = savedDrawing;
                img.onload = () => {
                    // If we just resized, the savedDrawing might be old size. 
                    // drawImage will draw it at 0,0. 
                    // If we are making it taller, it's fine.
                    ctx.drawImage(img, 0, 0, width, img.height / dpr); // Keep aspect ratio logic simple?
                    // Actually, img.src contains the full data url of previous state.
                    // Just drawing it is enough.
                    ctx.drawImage(img, 0, 0, width, (img.height / (img.width / width)));
                    // Wait, dataURL has pixel density baked in? 
                    // Usually dataURL is just an image.
                    // simpler:
                    ctx.drawImage(img, 0, 0, width, img.height * (width / img.width));
                };
            }
        }
    }, [pageHeight, moduleId, mode]); // Trigger on height change

    // Context Styles Update
    useEffect(() => {
        if (!contextRef.current) return;
        const ctx = contextRef.current;

        if (tool === 'eraser') {
            ctx.globalCompositeOperation = 'destination-out';
            ctx.lineWidth = strokeWidth * 2;
        } else {
            ctx.globalCompositeOperation = 'source-over';
            ctx.strokeStyle = strokeColor;
            ctx.lineWidth = strokeWidth;
            if (tool === 'highlighter' || tool === 'marker') {
                ctx.globalAlpha = tool === 'highlighter' ? 0.3 : 0.7;
            } else {
                ctx.globalAlpha = 1.0;
            }
        }
    }, [tool, strokeColor, strokeWidth, pageHeight]); // Re-apply on height change too since context resets

    // ... (Drawing handlers: startDrawing, draw, stopDrawing - mostly same)
    const startDrawing = ({ nativeEvent }: React.MouseEvent | React.TouchEvent) => {
        if (!contextRef.current) return;

        let clientX, clientY;
        if ('touches' in nativeEvent) {
            const touch = nativeEvent.touches[0];
            clientX = touch.clientX;
            clientY = touch.clientY;
        } else {
            const mouse = nativeEvent as MouseEvent;
            clientX = mouse.clientX;
            clientY = mouse.clientY;
        }

        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const offsetX = clientX - rect.left;
        const offsetY = clientY - rect.top;

        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX, offsetY);
        setIsDrawing(true);
    };

    const draw = ({ nativeEvent }: React.MouseEvent | React.TouchEvent) => {
        if (!isDrawing || !contextRef.current) return;

        let clientX, clientY;
        if ('touches' in nativeEvent) {
            const touch = nativeEvent.touches[0];
            clientX = touch.clientX;
            clientY = touch.clientY;
        } else {
            const mouse = nativeEvent as MouseEvent;
            clientX = mouse.clientX;
            clientY = mouse.clientY;
        }

        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const offsetX = clientX - rect.left;
        const offsetY = clientY - rect.top;

        contextRef.current.lineTo(offsetX, offsetY);
        contextRef.current.stroke();
    };

    const [history, setHistory] = useState<string[]>([]);
    const [historyStep, setHistoryStep] = useState<number>(-1);

    const saveToHistory = () => {
        if (!canvasRef.current) return;
        const dataUrl = canvasRef.current.toDataURL();
        const newHistory = history.slice(0, historyStep + 1);
        newHistory.push(dataUrl);
        setHistory(newHistory);
        setHistoryStep(newHistory.length - 1);
        localStorage.setItem(`practice_drawing_${moduleId}`, dataUrl);
    };

    const undo = () => {
        if (historyStep > 0) {
            const newStep = historyStep - 1;
            setHistoryStep(newStep);
            const img = new Image();
            img.src = history[newStep];
            img.onload = () => {
                const canvas = canvasRef.current;
                const ctx = contextRef.current;
                if (canvas && ctx) {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    const prevComposite = ctx.globalCompositeOperation;
                    ctx.globalCompositeOperation = 'source-over';
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height); // simplistic restore
                    ctx.globalCompositeOperation = prevComposite;

                    localStorage.setItem(`practice_drawing_${moduleId}`, history[newStep]);
                }
            };
        }
    };

    const redo = () => {
        if (historyStep < history.length - 1) {
            const newStep = historyStep + 1;
            setHistoryStep(newStep);
            const img = new Image();
            img.src = history[newStep];
            img.onload = () => {
                const canvas = canvasRef.current;
                const ctx = contextRef.current;
                if (canvas && ctx) {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    const prevComposite = ctx.globalCompositeOperation;
                    ctx.globalCompositeOperation = 'source-over';
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    ctx.globalCompositeOperation = prevComposite;
                    localStorage.setItem(`practice_drawing_${moduleId}`, history[newStep]);
                }
            };
        }
    };

    const stopDrawing = () => {
        if (!isDrawing) return;
        if (contextRef.current) contextRef.current.closePath();
        setIsDrawing(false);
        saveToHistory();
    };

    // Initial history push
    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas && history.length === 0) {
            const dataUrl = canvas.toDataURL();
            setHistory([dataUrl]);
            setHistoryStep(0);
        }
    }, [moduleId, history.length]);

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        if (canvas && contextRef.current) {
            contextRef.current.clearRect(0, 0, canvas.width, canvas.height);
            saveToHistory();
        }
    };

    // Add Page function
    const addPage = () => {
        // We save current state first to ensure no loss
        if (canvasRef.current) {
            const dataUrl = canvasRef.current.toDataURL();
            localStorage.setItem(`practice_drawing_${moduleId}`, dataUrl);
        }
        setPageHeight(prev => prev + 1000); // Add another "page"
    };

    // Calculate background style
    const getBackgroundStyle = () => {
        const base = { backgroundColor: pageColor, minHeight: `${pageHeight}px` };
        if (template === 'lined') {
            return {
                ...base,
                backgroundImage: `linear-gradient(${pageColor} 95%, #00000020 95%)`,
                backgroundSize: '100% 40px'
            };
        }
        if (template === 'grid') {
            return {
                ...base,
                backgroundImage: `linear-gradient(#00000010 1px, transparent 1px), linear-gradient(90deg, #00000010 1px, transparent 1px)`,
                backgroundSize: '40px 40px'
            };
        }
        if (template === 'dotted') {
            return {
                ...base,
                backgroundImage: `radial-gradient(#00000020 1px, transparent 1px)`,
                backgroundSize: '20px 20px'
            };
        }
        return base;
    };

    return (
        <div className="flex flex-col md:flex-row gap-4 h-[600px] w-full border border-black/10 dark:border-white/10 rounded-2xl bg-white dark:bg-[#1a1a1a] overflow-hidden">

            {/* Editor Scroll Area */}
            <div className="flex-1 relative bg-zinc-100 dark:bg-[#121212] overflow-y-auto flex flex-col items-center p-4 md:p-8">

                {/* Text Toolbar */}
                {mode === 'text' && (
                    <div className="sticky top-0 z-50 flex items-center gap-2 p-2 px-4 mb-4 rounded-xl border border-black/5 dark:border-white/5 bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-sm">
                        <button onClick={() => execCmd('bold')} className="p-1.5 hover:bg-black/5 dark:hover:bg-white/5 rounded transition-colors" title="Bold">
                            <Bold size={16} />
                        </button>
                        <button onClick={() => execCmd('italic')} className="p-1.5 hover:bg-black/5 dark:hover:bg-white/5 rounded transition-colors" title="Italic">
                            <Italic size={16} />
                        </button>
                        <button onClick={() => execCmd('underline')} className="p-1.5 hover:bg-black/5 dark:hover:bg-white/5 rounded transition-colors" title="Underline">
                            <Underline size={16} />
                        </button>
                        <div className="w-px h-4 bg-black/10 dark:bg-white/10 mx-1" />
                        <button onClick={() => execCmd('insertUnorderedList')} className="p-1.5 hover:bg-black/5 dark:hover:bg-white/5 rounded transition-colors" title="Bullet List">
                            <List size={16} />
                        </button>
                    </div>
                )}

                {/* Page Container */}
                <div
                    className="relative w-full max-w-4xl shadow-lg transition-all duration-300"
                    style={getBackgroundStyle()}
                >
                    {/* Text Content */}
                    <div
                        ref={textRef}
                        contentEditable={mode === 'text'}
                        onInput={handleInput}
                        className={`w-full h-full p-8 md:p-16 resize-none focus:outline-none bg-transparent dark:text-black overflow-hidden prose max-w-none ${mode === 'text' ? 'cursor-text' : 'cursor-default'}`}
                        dangerouslySetInnerHTML={{ __html: htmlValue }}
                        style={{ minHeight: `${pageHeight}px`, color: '#000' }} // Force black text for contrast on paper
                        suppressContentEditableWarning
                    />

                    {/* Canvas Layer */}
                    <canvas
                        ref={canvasRef}
                        onMouseDown={startDrawing}
                        onMouseMove={draw}
                        onMouseUp={stopDrawing}
                        onMouseLeave={stopDrawing}
                        onTouchStart={startDrawing}
                        onTouchMove={draw}
                        onTouchEnd={stopDrawing}
                        className={`absolute inset-0 w-full h-full touch-none cursor-crosshair ${mode === 'text' ? 'pointer-events-none opacity-50 z-0' : 'z-10'}`}
                        style={mode === 'text' ? { pointerEvents: 'none' } : {}}
                    />
                </div>

                {/* Add Page Button */}
                <button
                    onClick={addPage}
                    className="mt-8 mb-4 hover:scale-110 transition-transform p-3 rounded-full bg-black/5 dark:bg-white/10 hover:bg-amber-500 hover:text-white dark:hover:bg-amber-500 text-black/40 dark:text-white/40"
                    title={t('ui.pageSetup.addPage')}
                >
                    <Plus size={24} />
                </button>
            </div>

            {/* Right Toolbar */}
            <div className="w-full md:w-20 bg-gray-50 dark:bg-black/20 border-l border-black/5 dark:border-white/5 flex flex-row md:flex-col items-center py-4 gap-4 overflow-x-auto md:overflow-x-visible md:overflow-y-auto shrink-0 z-20">

                {/* Mode Switcher */}
                <div className="flex flex-col gap-2 p-2 bg-white dark:bg-black/40 rounded-xl shadow-sm border border-black/5 dark:border-white/5">
                    <button
                        onClick={() => setMode('text')}
                        className={`p-2 rounded-lg transition-colors ${mode === 'text' ? 'bg-black text-white dark:bg-white dark:text-black' : 'hover:bg-black/5'}`}
                        title={t('tools.textMode')}
                    >
                        <Type size={20} />
                    </button>
                    <button
                        onClick={() => setMode('pen')}
                        className={`p-2 rounded-lg transition-colors ${mode === 'pen' ? 'bg-black text-white dark:bg-white dark:text-black' : 'hover:bg-black/5'}`}
                        title={t('tools.penMode')}
                    >
                        <PenTool size={20} />
                    </button>
                    <div className="w-full h-px bg-black/5 dark:bg-white/5 my-1" />
                    {/* Page Setup Toggles */}
                    <div className="relative group">
                        <button className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors text-black dark:text-white" title={t('ui.pageSetup.paper')}>
                            <LayoutTemplate size={20} />
                        </button>
                        {/* Popup Menu for Template */}
                        <div className="absolute left-full top-0 ml-2 p-2 bg-white dark:bg-zinc-800 rounded-xl shadow-xl border border-black/5 dark:border-white/5 hidden group-hover:flex flex-col gap-2 w-32 z-50">
                            {(['blank', 'lined', 'grid', 'dotted'] as const).map(tm => (
                                <button key={tm} onClick={() => setTemplate(tm)} className={`text-xs p-2 rounded text-left hover:bg-black/5 ${template === tm ? 'font-bold bg-amber-100 text-amber-800' : ''}`}>
                                    {t(`ui.pageSetup.templates.${tm}`)}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="relative group">
                        <button className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors text-black dark:text-white" title={t('ui.pageSetup.color')}>
                            <Palette size={20} />
                        </button>
                        {/* Popup Menu for Color */}
                        <div className="absolute left-full top-0 ml-2 p-2 bg-white dark:bg-zinc-800 rounded-xl shadow-xl border border-black/5 dark:border-white/5 hidden group-hover:grid grid-cols-3 gap-2 w-32 z-50">
                            {['#ffffff', '#fdfbf7', '#f0f4f8', '#fdf2f8', '#ecfdf5', '#fffbeb'].map(c => (
                                <button
                                    key={c}
                                    onClick={() => setPageColor(c)}
                                    className={`w-6 h-6 rounded-full border border-black/10 ${pageColor === c ? 'ring-2 ring-black' : ''}`}
                                    style={{ backgroundColor: c }}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {mode === 'pen' && (
                    <>
                        <div className="w-full h-px bg-black/5 dark:bg-white/5" />

                        {/* Tools */}
                        <div className="flex flex-col gap-2 w-full px-2">
                            {[
                                { id: 'pen', icon: PenTool, label: t('tools.pen') },
                                { id: 'pencil', icon: Pencil, label: t('tools.pencil') },
                                { id: 'marker', icon: Highlighter, label: t('tools.marker') },
                                { id: 'highlighter', icon: Highlighter, label: t('tools.highlighter') },
                                { id: 'eraser', icon: Eraser, label: t('tools.eraser') },
                            ].map((tol) => (
                                <button
                                    key={tol.id}
                                    onClick={() => setTool(tol.id as Tool)}
                                    className={`p-2 rounded-lg transition-colors flex justify-center ${tool === tol.id ? 'bg-[#d4a373] text-black' : 'hover:bg-black/5 dark:hover:bg-white/5'}`}
                                    title={tol.label}
                                >
                                    <tol.icon size={20} />
                                </button>
                            ))}
                        </div>

                        <div className="w-full h-px bg-black/5 dark:bg-white/5" />

                        {/* Colors */}
                        <div className="grid grid-cols-2 gap-2 px-2">
                            {['#000000', '#FF0000', '#0000FF', '#008000', '#FFA500', '#800080', '#FFFFFF'].map(c => (
                                <button
                                    key={c}
                                    onClick={() => setStrokeColor(c)}
                                    className={`w-6 h-6 rounded-full border border-black/10 ${strokeColor === c ? 'ring-2 ring-offset-2 ring-black dark:ring-white' : ''}`}
                                    style={{ backgroundColor: c }}
                                />
                            ))}
                        </div>

                        <div className="w-full h-px bg-black/5 dark:bg-white/5" />

                        {/* Size */}
                        <div className="flex flex-col gap-2 w-full px-2 items-center">
                            <input
                                type="range"
                                min="1"
                                max="20"
                                value={strokeWidth}
                                onChange={(e) => setStrokeWidth(Number(e.target.value))}
                                className="w-full h-1 bg-black/10 rounded-lg appearance-none cursor-pointer"
                            />
                            <span className="text-xs opacity-50">{strokeWidth}px</span>
                        </div>

                        <div className="w-full h-px bg-black/5 dark:bg-white/5 mt-auto" />

                        {/* Actions */}
                        <div className="flex gap-2 w-full px-2 justify-center">
                            <button onClick={undo} disabled={historyStep <= 0} className="p-2 disabled:opacity-30 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors" title={t('tools.undo')}>
                                <Undo size={20} />
                            </button>
                            <button onClick={redo} disabled={historyStep >= history.length - 1} className="p-2 disabled:opacity-30 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors" title={t('tools.redo')}>
                                <Redo size={20} />
                            </button>
                            <button onClick={clearCanvas} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors" title={t('tools.clear')}>
                                <Trash2 size={20} />
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
