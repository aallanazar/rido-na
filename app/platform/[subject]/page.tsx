'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Navbar } from '@/components/ui/Navbar';
import { useTranslation } from '@/lib/hooks/useTranslation';
import {
    BookOpen,
    PenTool,
    Code as CodeIcon,
    ArrowLeft,
    Calculator,
    Shapes,
    Sigma,
    BarChart3,
    Trophy,
    Play,
    RotateCcw,
    Atom,
    FlaskConical,
    Leaf,
    Shield,
    Activity,
    Microscope,
    Database,
    ArrowRight,
} from 'lucide-react';
import { PracticeEditor } from '@/components/platform/PracticeEditor';
import { CodePlayground } from '@/components/platform/CodePlayground';
import { usePlatformStore } from '@/lib/store/usePlatformStore';

export default function SubjectPage() {
    const params = useParams();
    // Ensure subject is a string
    const subjectId = Array.isArray(params.subject) ? params.subject[0] : params.subject;
    const { t } = useTranslation();
    const [practiceMode, setPracticeMode] = useState<'selection' | 'writing' | 'coding'>('selection');
    const { progress } = usePlatformStore();

    // Handle "Practice" subject specifically
    if (subjectId === 'practice') {
        return (
            <main className="min-h-screen bg-background flex flex-col">
                <Navbar />

                <div className="flex-1 w-full max-w-7xl mx-auto px-4 pt-32 pb-12">

                    {/* Header */}
                    <div className="mb-8 flex items-center justify-between">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-serif text-foreground">
                                {t('ui.practiceMode')}
                            </h1>
                            <div className="h-1 w-24 bg-primary rounded-full" />
                        </div>

                        {practiceMode !== 'selection' && (
                            <button
                                onClick={() => setPracticeMode('selection')}
                                className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border hover:bg-muted transition-colors"
                            >
                                <ArrowLeft size={16} />
                                <span className="text-sm font-medium text-foreground">{t('ui.backToSelection')}</span>
                            </button>
                        )}
                    </div>

                    {/* Selection Mode */}
                    {practiceMode === 'selection' && (
                        <div className="flex flex-col gap-6 max-w-2xl mx-auto mt-12 w-full">
                            {/* Writing Card */}
                            <button
                                onClick={() => setPracticeMode('writing')}
                                className="group relative overflow-hidden p-8 rounded-3xl bg-card border border-border hover:border-primary transition-all hover:shadow-xl text-left flex flex-row items-center gap-6 w-full"
                            >
                                <div className="shrink-0 bg-primary/10 p-4 rounded-full text-primary group-hover:scale-110 transition-transform">
                                    <PenTool size={32} />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold mb-1 text-foreground">{t('ui.writing')}</h2>
                                    <p className="text-muted-foreground text-sm">
                                        Write like in a Word document, with rich text and digital pen support.
                                    </p>
                                </div>
                            </button>

                            {/* Coding Card */}
                            <button
                                onClick={() => setPracticeMode('coding')}
                                className="group relative overflow-hidden p-8 rounded-3xl bg-card border border-border hover:border-secondary transition-all hover:shadow-xl text-left flex flex-row items-center gap-6 w-full"
                            >
                                <div className="shrink-0 bg-secondary/10 p-4 rounded-full text-secondary group-hover:scale-110 transition-transform">
                                    <CodeIcon size={32} />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold mb-1 text-foreground">{t('ui.coding')}</h2>
                                    <p className="text-muted-foreground text-sm">
                                        Write and experiment with code in a dedicated playground environment.
                                    </p>
                                </div>
                            </button>
                        </div>
                    )}

                    {/* Writing App */}
                    {practiceMode === 'writing' && (
                        <div className="w-full h-[calc(100vh-250px)] min-h-150">
                            <PracticeEditor moduleId="practice-free-write" />
                        </div>
                    )}

                    {/* Coding App */}
                    {practiceMode === 'coding' && (
                        <div className="w-full">
                            <CodePlayground title={t('ui.coding')} mode="code" initialCode="// Write your code here..." />
                        </div>
                    )}
                </div>
            </main>
        );
    }

    if (subjectId === 'math') {
        const moduleMeta = [
            { id: 1, title: 'Algebra', subtitle: 'Foundations & Equations', level: 'Hard', icon: Calculator, action: 'Continue Learning', totalLessons: 15 },
            { id: 2, title: 'Geometry', subtitle: 'Shapes & Space', level: 'Medium', icon: Shapes, action: 'Continue', totalLessons: 10 },
            { id: 3, title: 'Calculus', subtitle: 'Limits & Derivatives', level: 'Advanced', icon: Sigma, action: 'Start Module', totalLessons: 22 },
            { id: 4, title: 'Statistics', subtitle: 'Data & Probability', level: 'Easy', icon: BarChart3, action: 'Review', totalLessons: 8 },
        ] as const;

        const cards = [
            ...moduleMeta,
        ].map((meta) => {
            const pctKey = `subjectModule:math:${meta.id}`;
            const fallback = meta.id === 1 ? 75 : meta.id === 2 ? 20 : meta.id === 3 ? 0 : 100;
            const progressPct = Math.max(0, Math.min(100, progress[pctKey] ?? fallback));
            const completedLessons = Math.round((progressPct / 100) * meta.totalLessons);

            return {
                ...meta,
                progress: progressPct,
                lessons: `${completedLessons}/${meta.totalLessons} Lessons`,
            };
        });

        const overallProgress = Math.round(cards.reduce((sum, card) => sum + card.progress, 0) / cards.length);

        return (
            <main className="min-h-screen bg-[#0f2e3a] text-slate-100">
                <Navbar />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12">
                    <header className="mb-10">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
                            <div>
                                <div className="text-sm font-medium text-primary mb-1 tracking-wide uppercase">Year 10 Curriculum</div>
                                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Mathematik</h1>
                            </div>
                            <div className="bg-card p-4 rounded-xl border border-border flex items-center gap-4 min-w-[280px]">
                                <div className="flex-1">
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-muted-foreground font-medium">Course Progress</span>
                                        <span className="text-primary font-bold">{overallProgress}%</span>
                                    </div>
                                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                        <div className="h-full bg-primary rounded-full" style={{ width: `${overallProgress}%` }} />
                                    </div>
                                </div>
                                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                    <Trophy size={18} />
                                </div>
                            </div>
                        </div>
                    </header>

                    <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                        {cards.map((card) => {
                            const Icon = card.icon;
                            return (
                                <Link
                                    key={card.id}
                                    href={`/platform/math/${card.id}`}
                                    className="bg-card rounded-2xl p-6 border border-border hover:shadow-lg hover:border-primary/30 transition-all duration-300 flex flex-col"
                                >
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                            <Icon size={22} />
                                        </div>
                                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-muted text-muted-foreground">{card.level}</span>
                                    </div>
                                    <h3 className="text-xl font-bold mb-1">{card.title}</h3>
                                    <p className="text-muted-foreground text-sm mb-6">{card.subtitle}</p>

                                    <div className="mt-auto">
                                        <div className="mb-6">
                                            <div className="flex justify-between text-xs text-muted-foreground mb-2">
                                                <span>Completed</span>
                                                <span>{card.progress}%</span>
                                            </div>
                                            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                                <div className="h-full bg-primary rounded-full" style={{ width: `${card.progress}%` }} />
                                            </div>
                                            <div className="mt-2 text-sm font-semibold">{card.lessons}</div>
                                        </div>

                                        <div className="w-full py-3 rounded-lg border border-primary text-primary font-medium text-center flex items-center justify-center gap-2">
                                            {card.action}
                                            {card.progress === 100 ? <RotateCcw size={16} /> : <Play size={16} />}
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </section>

                    <section className="mt-12">
                        <div className="bg-primary text-primary-foreground rounded-2xl p-8">
                            <span className="inline-block py-1 px-3 bg-white/20 rounded-lg text-xs font-medium mb-3">Daily Challenge</span>
                            <h3 className="text-2xl md:text-3xl font-bold mb-2">Mastering Quadratic Formulas</h3>
                            <p className="text-primary-foreground/90 mb-6 max-w-xl">
                                Boost your algebra skills with today&apos;s quick fire challenge. 10 questions, 5 minutes.
                            </p>
                            <button className="bg-white text-primary px-6 py-3 rounded-lg font-bold">Start Challenge</button>
                        </div>
                    </section>
                </div>
            </main>
        );
    }

    if (subjectId === 'physics') {
        const cards = [
            { id: 1, title: 'Mechanics', subtitle: 'Kinematics, Dynamics & Statics', icon: Activity, fallback: 100 },
            { id: 2, title: 'Electricity', subtitle: 'Circuits & Fields', icon: Atom, fallback: 33 },
            { id: 3, title: 'Optics', subtitle: 'Refraction & Lenses', icon: Play, fallback: 0 },
            { id: 4, title: 'Thermodynamics', subtitle: 'Heat & Energy Transfer', icon: Trophy, fallback: 0 },
        ].map((module) => {
            const progressValue = Math.max(0, Math.min(100, progress[`subjectModule:physics:${module.id}`] ?? module.fallback));
            return { ...module, progressValue };
        });

        const systemCharge = Math.round(cards.reduce((sum, item) => sum + item.progressValue, 0) / cards.length);

        return (
            <main className="min-h-screen bg-[#101822] text-foreground">
                <Navbar />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10 space-y-8">
                    <header className="rounded-xl border border-border bg-card p-5">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded bg-primary/15 text-primary flex items-center justify-center">
                                    <Atom size={20} />
                                </div>
                                <div>
                                    <div className="text-xs uppercase tracking-widest font-bold text-muted-foreground">Physics Lab // Mod 04</div>
                                    <h1 className="text-xl font-bold">Advanced Mechanics</h1>
                                </div>
                            </div>
                            <div className="w-full md:w-64">
                                <div className="flex justify-between text-[11px] uppercase tracking-wider font-bold text-primary mb-1">
                                    <span>System Charge</span>
                                    <span>{systemCharge}%</span>
                                </div>
                                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                    <div className="h-full bg-primary" style={{ width: `${systemCharge}%` }} />
                                </div>
                            </div>
                        </div>
                    </header>

                    <section>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-sm uppercase tracking-widest text-muted-foreground font-bold">Active Systems</h2>
                            <span className="text-xs bg-muted px-2 py-1 rounded">Select a module to load simulation</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {cards.map((card) => {
                                const Icon = card.icon;
                                const active = card.id === 1;
                                return (
                                    <Link
                                        key={card.id}
                                        href={`/platform/physics/${card.id}`}
                                        className={`rounded-xl p-5 transition-all hover:-translate-y-1 border ${active ? 'border-primary bg-card shadow-sm' : 'border-border bg-card'}`}
                                    >
                                        <div className="mb-4 text-primary bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center">
                                            <Icon size={22} />
                                        </div>
                                        <h3 className="text-lg font-bold mb-1">{card.title}</h3>
                                        <p className="text-xs text-muted-foreground mb-4">{card.subtitle}</p>
                                        <div className="w-full bg-muted h-1 rounded overflow-hidden">
                                            <div className="bg-primary h-full" style={{ width: `${card.progressValue}%` }} />
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </section>
                </div>
            </main>
        );
    }

    if (subjectId === 'biology') {
        const cards = [
            { id: 1, title: 'Cell Biology', subtitle: 'Structure & Function', fallback: 55 },
            { id: 2, title: 'Genetics', subtitle: 'Heredity & Variation', fallback: 20 },
            { id: 3, title: 'Ecology', subtitle: 'Systems & Interactions', fallback: 10 },
            { id: 4, title: 'Human Body', subtitle: 'Anatomy & Physiology', fallback: 35 },
        ].map((module) => {
            const progressValue = Math.max(0, Math.min(100, progress[`subjectModule:biology:${module.id}`] ?? module.fallback));
            return { ...module, progressValue };
        });

        return (
            <main className="min-h-screen bg-[#102215] text-foreground">
                <Navbar />
                <div className="max-w-[1400px] mx-auto pt-24 pb-12 px-6 space-y-8">
                    <section>
                        <div className="flex items-end justify-between mb-6">
                            <div>
                                <h2 className="text-3xl font-bold mb-2">Explore Modules</h2>
                                <p className="text-muted-foreground">Select a biological system to begin your visual journey.</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {cards.map((card, idx) => (
                                <Link
                                    key={card.id}
                                    href={`/platform/biology/${card.id}`}
                                    className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer border border-border bg-card hover:border-primary/40 transition-all duration-300"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                                    <div className="absolute inset-0 opacity-20 bg-primary" style={{ opacity: 0.12 + idx * 0.04 }} />
                                    <div className="absolute bottom-0 left-0 p-6 z-10">
                                        <div className="w-8 h-8 rounded-lg bg-primary/20 backdrop-blur flex items-center justify-center text-primary mb-3">
                                            <Leaf size={14} />
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-1">{card.title}</h3>
                                        <p className="text-sm text-white/80">{card.subtitle}</p>
                                        <div className="mt-3 h-1.5 w-44 bg-white/20 rounded overflow-hidden">
                                            <div className="h-full bg-primary" style={{ width: `${card.progressValue}%` }} />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>

                    <section className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                        <div className="xl:col-span-2 rounded-3xl border border-border bg-card p-6">
                            <h3 className="text-2xl font-bold mb-2">Interactive Theory</h3>
                            <p className="text-muted-foreground mb-6">Plant Cell Structure</p>
                            <div className="h-[420px] rounded-2xl border border-border bg-muted/30 flex items-center justify-center">
                                <div className="text-center">
                                    <Microscope className="mx-auto mb-3 text-primary" size={36} />
                                    <p className="text-sm text-muted-foreground">Interactive cell canvas is loaded in module view</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="rounded-2xl border border-border bg-card p-5">
                                <h4 className="font-bold mb-2">3D Anatomy</h4>
                                <p className="text-sm text-muted-foreground mb-4">Human Heart</p>
                                <div className="h-44 rounded-xl bg-muted/40 border border-border" />
                            </div>
                            <div className="rounded-2xl border border-border bg-card p-5">
                                <h4 className="font-bold mb-2">Labeling Task</h4>
                                <p className="text-sm text-muted-foreground">Drag and drop exercise opens inside each module.</p>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        );
    }

    if (subjectId === 'chemistry') {
        const cards = [
            { id: 1, title: 'Atomic Structure', subtitle: 'Electron configurations & orbitals', status: 'IN PROGRESS', fallback: 78 },
            { id: 2, title: 'Reactions', subtitle: 'Stoichiometry & catalysts', status: 'PENDING', fallback: 40 },
            { id: 3, title: 'Bonds', subtitle: 'Ionic & Covalent forces', status: 'LOCKED', fallback: 0 },
            { id: 4, title: 'Kinetics', subtitle: 'Reaction rates & energy', status: 'OPEN', fallback: 20 },
        ].map((module) => {
            const progressValue = Math.max(0, Math.min(100, progress[`subjectModule:chemistry:${module.id}`] ?? module.fallback));
            return { ...module, progressValue };
        });

        return (
            <main className="min-h-screen bg-[#102216] text-foreground">
                <Navbar />
                <div className="max-w-7xl mx-auto pt-24 p-6 lg:p-8 space-y-6">
                    <div>
                        <h2 className="text-3xl font-bold mb-2">Molecular Dynamics</h2>
                        <p className="text-muted-foreground max-w-2xl">Continue your investigation into covalent bonds and electron sharing.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {cards.map((card) => (
                            <Link key={card.id} href={`/platform/chemistry/${card.id}`} className="rounded-xl border border-border bg-card p-5 hover:border-primary/40 transition-colors">
                                <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                                    <FlaskConical size={20} />
                                </div>
                                <h3 className="text-lg font-bold mb-1">{card.title}</h3>
                                <p className="text-sm text-muted-foreground mb-4">{card.subtitle}</p>
                                <div className="flex items-center justify-between text-xs">
                                    <span className="px-2 py-1 rounded bg-muted text-muted-foreground">{card.status}</span>
                                    <span className="text-primary font-semibold">{card.progressValue}%</span>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 rounded-xl border border-border bg-card p-6">
                            <h3 className="font-bold mb-4">3D Molecular Viewer</h3>
                            <div className="h-72 rounded-xl border border-border bg-muted/30 flex items-center justify-center">
                                <FlaskConical size={34} className="text-primary" />
                            </div>
                        </div>
                        <div className="rounded-xl border border-border bg-card p-6">
                            <h3 className="font-bold mb-4">Safety Protocols</h3>
                            <div className="space-y-3 text-sm text-muted-foreground">
                                <div className="flex items-start gap-2"><Shield size={14} className="mt-1 text-primary" /> Flammable materials: keep distance from heat.</div>
                                <div className="flex items-start gap-2"><Shield size={14} className="mt-1 text-primary" /> Toxic samples: gloves and ventilation required.</div>
                                <div className="flex items-start gap-2"><Shield size={14} className="mt-1 text-primary" /> Eye protection mandatory in simulation tasks.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    if (subjectId === 'it') {
        return (
            <main className="min-h-screen bg-[#101622] text-foreground">
                <Navbar />
                <div className="max-w-7xl mx-auto pt-24 px-6 lg:px-8 pb-12">
                    {/* Header */}
                    <header className="mb-12">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                            <div>
                                <div className="text-sm font-bold text-primary uppercase tracking-wide mb-2">IT Fundamentals</div>
                                <h1 className="text-4xl md:text-5xl font-bold mb-3">System Architecture & Security</h1>
                                <p className="text-muted-foreground max-w-2xl">Master the fundamental components of modern computing. Analyze hardware, design networks, and secure systems against vulnerabilities.</p>
                            </div>
                            <div className="bg-card border border-border rounded-lg p-4 flex items-center gap-4 min-w-[240px]">
                                <div>
                                    <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Module Progress</div>
                                    <div className="text-2xl font-bold text-primary">68%</div>
                                </div>
                                <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                                    <div className="h-full bg-primary" style={{ width: '68%' }} />
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* Bento Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[minmax(200px,auto)]">
                        {/* Hardware Explorer - Main Card */}
                        <Link href="/platform/it/1" className="col-span-1 md:col-span-2 lg:row-span-2 group relative overflow-hidden rounded-2xl bg-card border border-border shadow-sm hover:shadow-md hover:border-primary/50 transition-all duration-300 p-6 flex flex-col">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
                            <div className="relative z-10 flex flex-col h-full">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="p-2 rounded bg-primary/10 text-primary">
                                        <Activity size={24} />
                                    </div>
                                    <span className="bg-green-500/10 text-green-600 dark:text-green-400 text-xs px-2 py-1 rounded border border-green-500/20">INTERACTIVE LAB</span>
                                </div>
                                <h2 className="text-2xl font-bold text-foreground mb-2">Rechneraufbau-Explorer</h2>
                                <p className="text-muted-foreground text-sm mb-6 flex-grow">Dive into the motherboard. Identify components, understand bus systems, and assemble virtual hardware configurations.</p>
                                <div className="relative w-full h-40 mb-6 rounded-lg overflow-hidden bg-muted border border-border">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <button className="bg-primary/90 hover:bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center transition-transform hover:scale-110 shadow-lg shadow-primary/25">
                                            <Play size={20} className="ml-1" />
                                        </button>
                                    </div>
                                </div>
                                <button className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                                    <span>Launch Explorer</span>
                                    <Play size={16} />
                                </button>
                            </div>
                        </Link>

                        {/* Network Topology */}
                        <div className="col-span-1 md:col-span-2 lg:col-span-2 rounded-2xl bg-card border border-border shadow-sm p-6 hover:border-primary/50 transition-all duration-300">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-lg font-bold flex items-center gap-2">
                                        <Shield size={20} className="text-primary" />
                                        Network Topology
                                    </h3>
                                    <p className="text-sm text-muted-foreground mt-1">Design LAN/WAN infrastructures.</p>
                                </div>
                                <button className="text-xs bg-card border border-border hover:bg-primary hover:text-primary-foreground px-3 py-1.5 rounded transition-colors">
                                    New Diagram
                                </button>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mt-4">
                                <div className="bg-muted/30 p-3 rounded border border-border hover:border-primary/50 cursor-pointer transition-colors group">
                                    <div className="h-20 bg-muted rounded mb-2 overflow-hidden relative">
                                        <div className="absolute inset-0 flex items-center justify-center text-primary/50">Network</div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-medium">Office_LAN_v2</span>
                                        <span className="text-xs text-muted-foreground">2h ago</span>
                                    </div>
                                </div>
                                <div className="bg-muted/30 p-3 rounded border border-border hover:border-primary/50 cursor-pointer transition-colors">
                                    <div className="h-20 bg-muted rounded mb-2 flex items-center justify-center text-muted-foreground">
                                        <Activity size={24} />
                                    </div>
                                    <div className="text-sm font-medium">Create New</div>
                                </div>
                            </div>
                        </div>

                        {/* Security Cases */}
                        <div className="col-span-1 lg:col-span-1 lg:row-span-2 rounded-2xl bg-card border border-border shadow-sm flex flex-col hover:border-primary/50 transition-all duration-300">
                            <div className="p-5 border-b border-border bg-muted/30">
                                <h3 className="font-bold flex items-center gap-2">
                                    <Shield className="text-red-500" size={20} />
                                    Security Cases
                                </h3>
                                <p className="text-xs text-muted-foreground mt-1">Analyze active threats.</p>
                            </div>
                            <div className="p-3 flex-1 overflow-y-auto space-y-2">
                                {[
                                    { id: '#404', status: 'Pending', title: 'Phishing Analysis', desc: 'Investigate email headers for spoofed domains...' },
                                    { id: '#202', status: 'Solved', title: 'SQL Injection', desc: 'Login form vulnerability patch verification.' },
                                    { id: '#501', status: 'New', title: 'DDoS Mitigation', desc: 'Traffic spike patterns on main gateway.' },
                                ].map((caseItem) => (
                                    <div key={caseItem.id} className="p-3 rounded hover:bg-muted/30 transition-colors cursor-pointer border-l-2 border-transparent hover:border-primary">
                                        <div className="flex justify-between mb-1">
                                            <span className="text-xs font-mono text-primary bg-primary/10 px-1 rounded">{caseItem.id}</span>
                                            <span className={`text-[10px] font-bold uppercase ${caseItem.status === 'Pending' ? 'text-orange-500' : caseItem.status === 'Solved' ? 'text-green-500' : 'text-blue-500'}`}>
                                                {caseItem.status}
                                            </span>
                                        </div>
                                        <h4 className="text-sm font-medium mb-1">{caseItem.title}</h4>
                                        <p className="text-xs text-muted-foreground line-clamp-2">{caseItem.desc}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="p-3 border-t border-border">
                                <button className="w-full text-xs font-medium text-primary hover:text-foreground transition-colors flex items-center justify-center gap-1">
                                    <span>View All Cases</span>
                                    <ArrowRight size={14} />
                                </button>
                            </div>
                        </div>

                        {/* Theory Module Cards */}
                        <div className="rounded-2xl bg-card border border-border shadow-sm p-5 flex flex-col justify-between hover:border-primary/50 transition-all duration-300 group">
                            <div className="flex justify-between items-start">
                                <div className="p-2 rounded bg-indigo-500/10 text-indigo-500 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                                    <BookOpen size={20} />
                                </div>
                                <span className="text-xs text-muted-foreground">Theory</span>
                            </div>
                            <div className="mt-3">
                                <h3 className="text-lg font-bold">OS Architecture</h3>
                                <p className="text-xs text-muted-foreground mt-1">Kernel & User Space</p>
                            </div>
                            <div className="mt-4 w-full bg-muted rounded-full h-1.5">
                                <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: '100%' }} />
                            </div>
                        </div>

                        <div className="rounded-2xl bg-card border border-border shadow-sm p-5 flex flex-col justify-between hover:border-primary/50 transition-all duration-300 group">
                            <div className="flex justify-between items-start">
                                <div className="p-2 rounded bg-teal-500/10 text-teal-500 group-hover:bg-teal-500 group-hover:text-white transition-colors">
                                    <Database size={20} />
                                </div>
                                <span className="text-xs text-muted-foreground">Theory</span>
                            </div>
                            <div className="mt-3">
                                <h3 className="text-lg font-bold">Databases</h3>
                                <p className="text-xs text-muted-foreground mt-1">SQL & Relational</p>
                            </div>
                            <div className="mt-4 w-full bg-muted rounded-full h-1.5">
                                <div className="bg-teal-500 h-1.5 rounded-full" style={{ width: '45%' }} />
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="col-span-1 md:col-span-2 lg:col-span-4 grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="rounded-lg border border-border bg-card p-4 flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                                    <BookOpen size={24} />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold">12h 40m</p>
                                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Study Time</p>
                                </div>
                            </div>
                            <div className="rounded-lg border border-border bg-card p-4 flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500">
                                    <Trophy size={24} />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold">850 XP</p>
                                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Weekly Earned</p>
                                </div>
                            </div>
                            <div className="rounded-lg border border-border bg-card p-4 flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500">
                                    <BarChart3 size={24} />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold">Top 5%</p>
                                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Class Rank</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    // Default view for other subjects (placeholder)
    const translated = t(`subjects.${subjectId}`);
    const displayTitle = (translated && translated !== `subjects.${subjectId}`)
        ? translated
        : (subjectId ? subjectId.charAt(0).toUpperCase() + subjectId.slice(1) : 'Subject');

    return (
        <main className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <div className="flex-1 w-full max-w-7xl mx-auto px-4 pt-32 pb-12">
                <div className="mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 font-serif text-foreground">
                        {displayTitle}
                    </h1>
                    <div className="h-1 w-24 bg-primary rounded-full" />
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {/* Placeholder Content Cards */}
                    <div className="col-span-full bg-card rounded-2xl p-8 border border-border text-center">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                            <BookOpen size={32} />
                        </div>
                        <h2 className="text-2xl font-bold mb-3 text-foreground">{t('ui.contentComingSoon') || 'Coming Soon'}</h2>
                        <p className="text-muted-foreground max-w-lg mx-auto">
                            We are currently preparing high-quality materials for <span className="font-semibold text-primary">{displayTitle}</span>.
                            Please check back later or explore other subjects.
                        </p>
                    </div>

                    {/* Dummy skeleton loaders to make it look "active" */}
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-48 rounded-2xl bg-muted animate-pulse border border-border" />
                    ))}
                </div>
            </div>
        </main>
    );
}
