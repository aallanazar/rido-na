'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useTranslation } from '@/lib/hooks/useTranslation';
import { PenTool, Type, Eraser, Undo, Redo, Trash2, Highlighter, Pencil } from 'lucide-react';

interface PracticeEditorProps {
    moduleId: string;
}

type Tool = 'pen' | 'pencil' | 'marker' | 'eraser' | 'highlighter';

export function PracticeEditor({ moduleId }: PracticeEditorProps) {
    const { t } = useTranslation();
    const [mode, setMode] = useState<'text' | 'pen'>('pen');
    const [textValue, setTextValue] = useState<string>('');
    const [tool, setTool] = useState<Tool>('pen');
    const [strokeColor, setStrokeColor] = useState('#000000');
    const [strokeWidth, setStrokeWidth] = useState(2);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const contextRef = useRef<CanvasRenderingContext2D | null>(null);
    const [isDrawing, setIsDrawing] = useState(false);

    // Initial load/save simulation for text
    useEffect(() => {
        const savedText = localStorage.getItem(`practice_text_${moduleId}`);
        if (savedText) setTextValue(savedText);
    }, [moduleId]);

    useEffect(() => {
        localStorage.setItem(`practice_text_${moduleId}`, textValue);
    }, [textValue, moduleId]);

    // Canvas Setup
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Higher density for sharper drawing
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();

        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;

        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.scale(dpr, dpr);
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            contextRef.current = ctx;
        }

        // Restore drawing if we had one saved (simple raw data url approach for MVP)
        const savedDrawing = localStorage.getItem(`practice_drawing_${moduleId}`);
        if (savedDrawing && ctx) {
            const img = new Image();
            img.src = savedDrawing;
            img.onload = () => ctx.drawImage(img, 0, 0, rect.width, rect.height);
        }
    }, [moduleId, mode]); // Re-init when Mode changes to ensure correct sizing if hidden

    // Update Context Styles
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
    }, [tool, strokeColor, strokeWidth]);

    const startDrawing = ({ nativeEvent }: React.MouseEvent | React.TouchEvent) => {
        if (!contextRef.current) return;

        // Handle both mouse and touch coordinates
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
                    // Note: using scaled raw dims might be better to re-draw
                    // Actually, if we clear, we should restore context properties? 
                    // No, context properties (lineWidth, color) persist unless we reset specific ones.
                    // But drawImage is unaffected by strokeStyle.
                    // However, we should ensure composite operation is reset if needed? 
                    // It should be fine as drawImage ignores it mostly or uses source-over default.
                    // Let's force source-over for restoration just in case eraser was active.
                    const prevComposite = ctx.globalCompositeOperation;
                    ctx.globalCompositeOperation = 'source-over';
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
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
            // Save blank or loaded state
            const dataUrl = canvas.toDataURL();
            setHistory([dataUrl]);
            setHistoryStep(0);
        }
    }, [moduleId, history.length]); // simple init, depend on history.length to ensure it runs only once initially

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        if (canvas && contextRef.current) {
            contextRef.current.clearRect(0, 0, canvas.width, canvas.height); // Note: using scaled raw dims might be better
            // Actually clearRect uses logical units if transform is applied? No, context is scaled.
            // Let's rely on reset:
            saveToHistory();
        }
    };

    return (
        <div className="flex flex-col md:flex-row gap-4 h-[600px] w-full border border-black/10 dark:border-white/10 rounded-2xl bg-white dark:bg-[#1a1a1a] overflow-hidden">

            {/* Editor Area */}
            <div className="flex-1 relative bg-white dark:bg-[#121212]">
                {mode === 'text' && (
                    <textarea
                        className="w-full h-full p-8 resize-none focus:outline-none bg-transparent dark:text-white"
                        placeholder="Start typing..."
                        value={textValue}
                        onChange={(e) => setTextValue(e.target.value)}
                    />
                )}

                <canvas
                    ref={canvasRef}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                    className={`absolute inset-0 w-full h-full touch-none cursor-crosshair ${mode === 'text' ? 'pointer-events-none opacity-50' : ''}`}
                />
            </div>

            {/* Right Toolbar */}
            <div className="w-full md:w-20 bg-gray-50 dark:bg-black/20 border-l border-black/5 dark:border-white/5 flex flex-row md:flex-col items-center py-4 gap-4 overflow-x-auto md:overflow-x-visible md:overflow-y-auto">

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
                </div>

                {mode === 'pen' && (
                    <>
                        <div className="w-full h-px bg-black/5 dark:bg-white/5" />

                        {/* Tools */}
                        <div className="flex flex-col gap-2 w-full px-2">
                            {[
                                { id: 'pen', icon: PenTool, label: t('tools.pen') },
                                { id: 'pencil', icon: Pencil, label: t('tools.pencil') },
                                { id: 'marker', icon: Highlighter, label: t('tools.marker') }, // using highlighter icon for marker
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
