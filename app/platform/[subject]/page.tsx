'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Navbar } from '@/components/ui/Navbar';
import { useTranslation } from '@/lib/hooks/useTranslation';
import { usePlatformStore } from '@/lib/store/usePlatformStore';
import {
    Activity,
    ArrowRight,
    Atom,
    BarChart3,
    Bell,
    BookOpen,
    Calculator,
    Cpu,
    Database,
    FlaskConical,
    Microscope,
    Network,
    PenTool,
    Play,
    Settings,
    Shield,
    Sigma,
    Trophy,
} from 'lucide-react';

export default function SubjectPage() {
    const params = useParams<{ subject: string }>();
    const subjectId = Array.isArray(params.subject) ? params.subject[0] : params.subject;
    const { t } = useTranslation();
    const progress = usePlatformStore((state) => state.progress);

    if (!subjectId) {
        return null;
    }

    if (subjectId === 'math') {
        const modules = [
            { id: 1, title: 'Analysis', subtitle: 'Funktionen & Grenzwerte', icon: Sigma, fallback: 82 },
            { id: 2, title: 'Algebra', subtitle: 'Gleichungen & Matrizen', icon: Calculator, fallback: 67 },
            { id: 3, title: 'Geometrie', subtitle: 'Ebenen & Vektoren', icon: PenTool, fallback: 40 },
            { id: 4, title: 'Stochastik', subtitle: 'Wahrscheinlichkeit', icon: BarChart3, fallback: 20 },
        ].map((module) => ({
            ...module,
            progressValue: Math.max(0, Math.min(100, progress[`subjectModule:math:${module.id}`] ?? module.fallback)),
        }));

        return (
            <main className="min-h-screen bg-[#0f2e3a] text-white">
                <Navbar />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10 space-y-8">
                    <header className="rounded-xl border border-blue-900/60 bg-[#143c4b] p-6">
                        <h1 className="text-3xl font-bold">Mathematik-Dashboard</h1>
                        <p className="text-sm text-blue-100 mt-2">Weiß & Dunkelblau Theme mit klarem Fokus auf Aufgabenfortschritt.</p>
                    </header>
                    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {modules.map((module) => {
                            const Icon = module.icon;
                            return (
                                <Link key={module.id} href={`/platform/math/${module.id}`} className="rounded-xl p-5 border border-blue-900/60 bg-[#123847] hover:border-white/50 transition-all">
                                    <div className="w-11 h-11 rounded bg-white/10 flex items-center justify-center mb-4 text-white">
                                        <Icon size={20} />
                                    </div>
                                    <h3 className="font-bold text-lg">{module.title}</h3>
                                    <p className="text-xs text-blue-100 mt-1 mb-4">{module.subtitle}</p>
                                    <div className="w-full h-1.5 rounded bg-blue-950/60 overflow-hidden">
                                        <div className="h-full bg-white" style={{ width: `${module.progressValue}%` }} />
                                    </div>
                                </Link>
                            );
                        })}
                    </section>
                </div>
            </main>
        );
    }

    if (subjectId === 'physics') {
        const modules = [
            { id: 1, title: 'Mechanics', subtitle: 'Kinematics & Dynamics', icon: Activity, fallback: 100 },
            { id: 2, title: 'Electricity', subtitle: 'Circuits & Fields', icon: Atom, fallback: 33 },
            { id: 3, title: 'Optics', subtitle: 'Refraction & Lenses', icon: Play, fallback: 0 },
            { id: 4, title: 'Thermodynamics', subtitle: 'Heat & Energy', icon: Trophy, fallback: 0 },
        ].map((module) => ({
            ...module,
            progressValue: Math.max(0, Math.min(100, progress[`subjectModule:physics:${module.id}`] ?? module.fallback)),
        }));

        const systemCharge = Math.round(modules.reduce((sum, item) => sum + item.progressValue, 0) / modules.length);

        return (
            <main className="min-h-screen bg-[#101822] text-slate-100">
                <Navbar />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10 space-y-8">
                    <header className="rounded-xl border border-slate-800/80 bg-slate-950/40 p-5">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/30">
                                    <Atom size={18} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs text-slate-400 uppercase tracking-widest font-bold">Physics Lab // Mod 04</span>
                                    <h1 className="text-lg font-bold">Advanced Mechanics</h1>
                                </div>
                            </div>
                            <div className="w-full md:w-64">
                                <div className="flex justify-between text-[11px] uppercase tracking-wider font-bold text-primary mb-1">
                                    <span>System Charge</span>
                                    <span>{systemCharge}%</span>
                                </div>
                                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-primary" style={{ width: `${systemCharge}%` }} />
                                </div>
                            </div>
                        </div>
                    </header>

                    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {modules.map((module) => {
                            const Icon = module.icon;
                            const active = module.id === 1;
                            return (
                                <Link key={module.id} href={`/platform/physics/${module.id}`} className={`rounded-xl p-5 transition-all hover:-translate-y-1 border ${active ? 'border-primary bg-slate-900 shadow-[0_0_15px_rgba(19,109,236,0.15)]' : 'border-slate-800 bg-slate-900/70 hover:border-primary/50'}`}>
                                    <div className="mb-4 text-primary bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center"><Icon size={22} /></div>
                                    <h3 className="text-lg font-bold mb-1">{module.title}</h3>
                                    <p className="text-xs text-slate-400 mb-4">{module.subtitle}</p>
                                    <div className="w-full bg-slate-800 h-1 rounded overflow-hidden">
                                        <div className="bg-primary h-full" style={{ width: `${module.progressValue}%` }} />
                                    </div>
                                </Link>
                            );
                        })}
                    </section>
                </div>
            </main>
        );
    }

    if (subjectId === 'chemistry') {
        const modules = [
            { id: 1, title: 'Atoms', subtitle: 'Atomic Structure', icon: Atom, fallback: 78 },
            { id: 2, title: 'Molecules', subtitle: 'Molecular Geometry', icon: FlaskConical, fallback: 56 },
            { id: 3, title: 'Bonds', subtitle: 'Ionic & Covalent', icon: Shield, fallback: 30 },
            { id: 4, title: 'Kinetics', subtitle: 'Reaction Rates', icon: Activity, fallback: 20 },
        ].map((module) => ({
            ...module,
            progressValue: Math.max(0, Math.min(100, progress[`subjectModule:chemistry:${module.id}`] ?? module.fallback)),
        }));

        return (
            <main className="min-h-screen bg-[#101822] text-white">
                <Navbar />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10 space-y-8">
                    <header className="rounded-xl border border-yellow-400/30 bg-[#0f1a2f] p-6">
                        <h1 className="text-3xl font-bold text-yellow-300">Chemie-Labor</h1>
                        <p className="text-sm text-blue-100 mt-2">Gelb + Dunkelblau Design wie gewünscht.</p>
                    </header>
                    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {modules.map((module) => {
                            const Icon = module.icon;
                            return (
                                <Link key={module.id} href={`/platform/chemistry/${module.id}`} className="rounded-xl p-5 border border-blue-900/60 bg-[#132341] hover:border-yellow-300/70 transition-all">
                                    <div className="w-11 h-11 rounded bg-yellow-400/15 text-yellow-300 flex items-center justify-center mb-4"><Icon size={20} /></div>
                                    <h3 className="font-bold text-lg">{module.title}</h3>
                                    <p className="text-xs text-blue-100 mt-1 mb-4">{module.subtitle}</p>
                                    <div className="w-full h-1.5 rounded bg-blue-950/70 overflow-hidden"><div className="h-full bg-yellow-300" style={{ width: `${module.progressValue}%` }} /></div>
                                </Link>
                            );
                        })}
                    </section>
                </div>
            </main>
        );
    }

    if (subjectId === 'biology') {
        const modules = [
            { id: 1, title: 'Cell Biology', subtitle: 'Cell Structure', icon: Microscope, fallback: 72 },
            { id: 2, title: 'Genetics', subtitle: 'DNA & RNA', icon: Database, fallback: 50 },
            { id: 3, title: 'Ecology', subtitle: 'Ecosystems', icon: Activity, fallback: 36 },
            { id: 4, title: 'Evolution', subtitle: 'Natural Selection', icon: Trophy, fallback: 18 },
        ].map((module) => ({
            ...module,
            progressValue: Math.max(0, Math.min(100, progress[`subjectModule:biology:${module.id}`] ?? module.fallback)),
        }));

        return (
            <main className="min-h-screen bg-[#102215] text-white">
                <Navbar />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10 space-y-8">
                    <header className="rounded-xl border border-emerald-400/30 bg-[#153321] p-6">
                        <h1 className="text-3xl font-bold text-white">Biologie-Campus</h1>
                        <p className="text-sm text-emerald-100 mt-2">Grün + Weiß Design wie gewünscht.</p>
                    </header>
                    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {modules.map((module) => {
                            const Icon = module.icon;
                            return (
                                <Link key={module.id} href={`/platform/biology/${module.id}`} className="rounded-xl p-5 border border-emerald-900/70 bg-[#173624] hover:border-white/60 transition-all">
                                    <div className="w-11 h-11 rounded bg-white/10 text-white flex items-center justify-center mb-4"><Icon size={20} /></div>
                                    <h3 className="font-bold text-lg">{module.title}</h3>
                                    <p className="text-xs text-emerald-100 mt-1 mb-4">{module.subtitle}</p>
                                    <div className="w-full h-1.5 rounded bg-emerald-950/70 overflow-hidden"><div className="h-full bg-white" style={{ width: `${module.progressValue}%` }} /></div>
                                </Link>
                            );
                        })}
                    </section>
                </div>
            </main>
        );
    }

    if (subjectId === 'it') {
        return (
            <main className="min-h-screen bg-[#101622] text-slate-100">
                <Navbar />
                <div className="max-w-7xl mx-auto pt-24 px-4 lg:px-6 pb-12">
                    <div className="rounded-xl border border-slate-800 bg-slate-950/60 overflow-hidden">
                        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] min-h-[720px]">
                            <aside className="hidden lg:flex flex-col justify-between border-r border-slate-800 bg-[#151c2c]">
                                <div>
                                    <div className="h-16 flex items-center px-5 border-b border-slate-800">
                                        <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-white font-bold text-lg">CS</div>
                                        <span className="ml-3 font-bold text-lg text-white">EduPlatform</span>
                                    </div>
                                    <nav className="mt-6 flex flex-col gap-2 px-3">
                                        {[
                                            { icon: Activity, label: 'Overview', active: true },
                                            { icon: Cpu, label: 'Hardware' },
                                            { icon: Network, label: 'Networks' },
                                            { icon: Shield, label: 'Security' },
                                            { icon: Database, label: 'Databases' },
                                        ].map((item) => {
                                            const Icon = item.icon;
                                            return (
                                                <button key={item.label} className={`flex items-center p-3 rounded-lg transition-colors ${item.active ? 'bg-primary/10 text-primary' : 'text-slate-400 hover:bg-slate-800 hover:text-primary'}`}>
                                                    <Icon size={18} />
                                                    <span className="ml-3 font-medium">{item.label}</span>
                                                </button>
                                            );
                                        })}
                                    </nav>
                                </div>
                                <div className="p-4 border-t border-slate-800">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-slate-700" />
                                        <div>
                                            <p className="text-sm font-semibold text-white">Alex Chen</p>
                                            <p className="text-xs text-slate-400">Student ID: #4921</p>
                                        </div>
                                    </div>
                                </div>
                            </aside>

                            <div className="flex flex-col">
                                <header className="h-16 border-b border-slate-800 bg-[#101622]/80 backdrop-blur-sm px-6 flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-sm text-slate-400">
                                        <span>Modules</span>
                                        <ArrowRight size={12} />
                                        <span className="text-white font-medium">IT Fundamentals</span>
                                        <ArrowRight size={12} />
                                        <span className="text-primary font-medium">Overview</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button className="p-2 rounded bg-slate-800 text-slate-400 hover:text-primary"><Bell size={16} /></button>
                                        <button className="flex items-center gap-2 px-3 py-1.5 rounded bg-slate-800 text-slate-300 text-sm hover:bg-slate-700 transition">
                                            <Settings size={14} />
                                            <span>Settings</span>
                                        </button>
                                    </div>
                                </header>

                                <div className="flex-1 overflow-y-auto p-6 lg:p-8">
                                    <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                                        <div>
                                            <h1 className="text-3xl font-bold text-white uppercase tracking-wide mb-2">System Architecture & Security</h1>
                                            <p className="text-slate-400 max-w-2xl">Master the fundamental components of modern computing. Analyze hardware, design networks, and secure systems against vulnerabilities.</p>
                                        </div>
                                        <div className="bg-[#1a2333] border border-slate-800 rounded-lg p-3 flex items-center gap-4 shadow-sm">
                                            <div className="flex flex-col"><span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Module Progress</span><span className="text-xl font-bold text-primary">68%</span></div>
                                            <div className="w-32 h-2 bg-slate-700 rounded-full overflow-hidden"><div className="h-full bg-primary" style={{ width: '68%' }} /></div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[minmax(180px,auto)]">
                                        <Link href="/platform/it/1" className="col-span-1 md:col-span-2 lg:row-span-2 rounded-2xl bg-[#1a2333] border border-slate-800 p-6 hover:border-primary/50 transition-all">
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="p-2 rounded bg-primary/10 text-primary"><Cpu size={24} /></div>
                                                <span className="bg-green-500/10 text-green-400 text-xs px-2 py-1 rounded border border-green-500/20">INTERACTIVE LAB</span>
                                            </div>
                                            <h2 className="text-2xl font-bold text-white mb-2">Rechneraufbau-Explorer</h2>
                                            <p className="text-slate-400 text-sm">Dive into the motherboard and hardware diagnostics.</p>
                                        </Link>
                                        <div className="col-span-1 md:col-span-2 rounded-2xl bg-[#1a2333] border border-slate-800 p-6 hover:border-primary/50 transition-all">
                                            <h3 className="text-lg font-bold flex items-center gap-2"><Network size={20} className="text-primary" />Network Topology</h3>
                                            <p className="text-sm text-slate-400 mt-2">Design LAN/WAN infrastructures.</p>
                                        </div>
                                        <div className="rounded-2xl bg-[#1a2333] border border-slate-800 p-5"><h3 className="font-bold text-white">OS Architecture</h3><p className="text-xs text-slate-400 mt-2">Kernel & User Space</p></div>
                                        <div className="rounded-2xl bg-[#1a2333] border border-slate-800 p-5"><h3 className="font-bold text-white">Databases</h3><p className="text-xs text-slate-400 mt-2">SQL & Relational</p></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    const translated = t(`subjects.${subjectId}`);
    const displayTitle = translated && translated !== `subjects.${subjectId}` ? translated : subjectId.charAt(0).toUpperCase() + subjectId.slice(1);

    return (
        <main className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <div className="flex-1 w-full max-w-7xl mx-auto px-4 pt-32 pb-12">
                <div className="mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 font-serif text-foreground">{displayTitle}</h1>
                    <div className="h-1 w-24 bg-primary rounded-full" />
                </div>
                <div className="col-span-full bg-card rounded-2xl p-8 border border-border text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary"><BookOpen size={32} /></div>
                    <h2 className="text-2xl font-bold mb-3 text-foreground">{t('ui.contentComingSoon') || 'Coming Soon'}</h2>
                </div>
            </div>
        </main>
    );
}
