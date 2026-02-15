'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Navbar } from '@/components/ui/Navbar';
import {
  ArrowLeft,
  Bookmark,
  Play,
  Lightbulb,
  CheckCircle2,
  MessageCircleQuestion,
  Atom,
  FlaskConical,
  Leaf,
  Activity,
  Shield,
  Microscope,
} from 'lucide-react';
import { usePlatformStore } from '@/lib/store/usePlatformStore';

export default function SubjectModulePage() {
  const params = useParams();
  const router = useRouter();

  const subjectId = Array.isArray(params.subject) ? params.subject[0] : params.subject;
  const moduleParam = Array.isArray(params.module) ? params.module[0] : params.module;
  const moduleIndex = Number(moduleParam);
  const { progress, updateProgress } = usePlatformStore();
  const [tipOpened, setTipOpened] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [answerInput, setAnswerInput] = useState('');

  const progressKey = `subjectModule:math:${moduleIndex}`;
  const fallbackProgress = moduleIndex === 1 ? 75 : moduleIndex === 2 ? 20 : moduleIndex === 3 ? 0 : 100;
  const moduleProgress = Math.max(0, Math.min(100, progress[progressKey] ?? fallbackProgress));
  const setMinProgress = (value: number) => {
    if (moduleProgress < value) updateProgress(progressKey, value);
  };

  if (!subjectId || !Number.isFinite(moduleIndex) || moduleIndex < 1) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-5xl mx-auto px-4 pt-28">
          <button
            onClick={() => router.push(`/platform/${subjectId ?? ''}`)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft size={18} />
            Back
          </button>
        </div>
      </main>
    );
  }

  if (subjectId === 'physics') {
    const key = `subjectModule:physics:${moduleIndex}`;
    const value = Math.max(0, Math.min(100, progress[key] ?? 75));

    return (
      <main className="min-h-screen bg-[#101822] text-foreground">
        <Navbar />
        <div className="max-w-7xl mx-auto pt-24 px-4 sm:px-6 lg:px-8 pb-10 space-y-8">
          <header className="rounded-xl border border-border bg-card p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button onClick={() => router.push('/platform/physics')} className="text-muted-foreground hover:text-primary">
                <ArrowLeft size={18} />
              </button>
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Physics Lab // Mod {moduleIndex}</div>
                <h1 className="text-lg font-bold">Advanced Mechanics</h1>
              </div>
            </div>
            <button onClick={() => updateProgress(key, 100)} className="px-3 py-2 rounded-lg bg-primary text-white text-xs font-semibold">
              Mark complete
            </button>
          </header>

          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="space-y-6">
              <div className="bg-card border border-border rounded-xl p-5">
                <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground mb-4">Target Formula</h3>
                <div className="bg-muted/40 rounded-lg p-4 mb-4 text-center border border-border">
                  <p className="font-mono text-xl text-primary">T = 2π √(L/g)</p>
                </div>
                <div className="space-y-2 text-xs text-muted-foreground">
                  <div className="flex justify-between"><span>T: Period (s)</span><span>Output</span></div>
                  <div className="flex justify-between"><span>L: Length (m)</span><span className="text-primary">Variable</span></div>
                  <div className="flex justify-between"><span>g: Gravity</span><span>Constant</span></div>
                </div>
              </div>
              <div className="bg-card border border-border rounded-xl p-5">
                <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground mb-4">Variables</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs mb-2"><span>Length</span><span className="text-primary">1.50 m</span></div>
                    <input className="w-full" type="range" min={0.1} max={5} step={0.1} defaultValue={1.5} onChange={() => updateProgress(key, Math.max(value, 85))} />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-2"><span>Mass</span><span className="text-primary">0.5 kg</span></div>
                    <input className="w-full" type="range" min={0.1} max={2} step={0.1} defaultValue={0.5} onChange={() => updateProgress(key, Math.max(value, 90))} />
                  </div>
                </div>
                <button onClick={() => updateProgress(key, 100)} className="w-full mt-4 bg-primary text-white py-2 rounded-lg font-semibold text-sm">
                  Run Simulation
                </button>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <div className="rounded-xl border border-border bg-card h-96 relative overflow-hidden">
                <div className="absolute top-4 left-4 text-xs font-mono text-primary">FPS: 60 | t: 12.4s</div>
                <div className="h-full flex items-center justify-center">
                  <div className="w-52 h-52 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center">
                    <Activity size={44} className="text-primary" />
                  </div>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold">Experiment Evaluation</h3>
                  <span className="text-xs bg-muted px-2 py-1 rounded">Pending Review</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="h-48 rounded-lg border border-border bg-muted/40" />
                  <div className="space-y-3">
                    <input className="w-full rounded border border-border bg-background p-2" placeholder="Calculated period (s)" onChange={() => updateProgress(key, Math.max(value, 95))} />
                    <textarea className="w-full rounded border border-border bg-background p-2 h-24" placeholder="Observation notes" />
                    <button onClick={() => updateProgress(key, 100)} className="bg-primary text-white text-sm px-4 py-2 rounded">Submit Results</button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    );
  }

  if (subjectId === 'biology') {
    const key = `subjectModule:biology:${moduleIndex}`;
    const value = Math.max(0, Math.min(100, progress[key] ?? 40));

    return (
      <main className="min-h-screen bg-[#102215] text-foreground">
        <Navbar />
        <div className="max-w-[1400px] mx-auto pt-24 pb-12 px-6 space-y-8">
          <header className="rounded-2xl border border-border bg-card p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={() => router.push('/platform/biology')} className="text-muted-foreground hover:text-primary">
                <ArrowLeft size={18} />
              </button>
              <div>
                <h1 className="text-xl font-bold">Interactive Biology Visual Learning</h1>
                <p className="text-xs text-muted-foreground">Module {moduleIndex}</p>
              </div>
            </div>
            <button onClick={() => updateProgress(key, 100)} className="px-3 py-2 bg-primary text-white rounded-lg text-xs font-semibold">Mark complete</button>
          </header>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div className="xl:col-span-2 space-y-8">
              <div className="rounded-3xl border border-border bg-card p-6">
                <span className="px-3 py-1 bg-primary/15 text-primary text-xs font-bold uppercase rounded-full">Interactive Theory</span>
                <h2 className="text-3xl font-bold mt-3 mb-4">Plant Cell Structure</h2>
                <div className="relative w-full h-[520px] rounded-2xl border border-border bg-muted/30 flex items-center justify-center">
                  <Microscope size={56} className="text-primary" />
                  <button onClick={() => updateProgress(key, Math.max(value, 70))} className="absolute top-4 right-4 w-10 h-10 rounded-full border border-border bg-card">+</button>
                  <button onClick={() => updateProgress(key, Math.max(value, 85))} className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-primary text-white text-xs">View Full Report</button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-2xl border border-border bg-card p-6">
                  <h3 className="font-bold text-lg mb-3">Quick Facts</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>Plant cells have a cell wall, unlike animal cells.</li>
                    <li>Chloroplasts enable photosynthesis.</li>
                    <li>Vacuoles can take up most of cell volume.</li>
                  </ul>
                </div>
                <div className="rounded-2xl border border-border bg-card p-6">
                  <h3 className="font-bold text-lg mb-2">Quiz Mode</h3>
                  <p className="text-sm text-muted-foreground mb-4">Test your knowledge before moving on.</p>
                  <button onClick={() => updateProgress(key, Math.max(value, 95))} className="w-full py-2.5 bg-primary text-white rounded-lg font-semibold">Start Quiz</button>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-3xl border border-border bg-card p-6 h-[400px]">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-bold">3D Anatomy</h3>
                    <p className="text-xs text-muted-foreground">Human Heart</p>
                  </div>
                </div>
                <div className="h-[300px] rounded-xl border border-border bg-muted/40 flex items-center justify-center">
                  <Leaf size={36} className="text-primary" />
                </div>
              </div>
              <div className="rounded-3xl border border-border bg-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg">Labeling Task</h3>
                  <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded">2/5 Done</span>
                </div>
                <button onClick={() => updateProgress(key, Math.max(value, 90))} className="w-full mt-2 py-2 border border-border rounded-lg text-sm font-medium">Reset Task</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (subjectId === 'chemistry') {
    const key = `subjectModule:chemistry:${moduleIndex}`;
    const value = Math.max(0, Math.min(100, progress[key] ?? 50));

    return (
      <main className="min-h-screen bg-[#102216] text-foreground">
        <Navbar />
        <div className="max-w-7xl mx-auto pt-24 px-6 lg:px-8 pb-8 grid grid-cols-1 xl:grid-cols-[1fr_260px] gap-6">
          <div className="space-y-6">
            <header className="rounded-xl border border-border bg-card p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button onClick={() => router.push('/platform/chemistry')} className="text-muted-foreground hover:text-primary">
                  <ArrowLeft size={18} />
                </button>
                <div>
                  <h1 className="text-xl font-bold">Chemistry Laboratory Module</h1>
                  <p className="text-xs text-muted-foreground">Lab Station Alpha // Module {moduleIndex}</p>
                </div>
              </div>
              <button onClick={() => updateProgress(key, 100)} className="px-3 py-2 bg-primary text-white text-xs rounded-lg font-semibold">Mark complete</button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {['Atomic Structure', 'Reactions', 'Bonds', 'Kinetics'].map((title, idx) => (
                <div key={title} className="rounded-xl border border-border bg-card p-5">
                  <div className="w-11 h-11 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-3"><FlaskConical size={20} /></div>
                  <h3 className="font-bold mb-1">{title}</h3>
                  <p className="text-xs text-muted-foreground mb-3">Module block {idx + 1}</p>
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden"><div className="h-full bg-primary" style={{ width: `${Math.max(0, Math.min(100, value - idx * 10))}%` }} /></div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold mb-3">3D Molecular Viewer</h3>
                <div className="h-72 rounded-lg border border-border bg-muted/40 flex items-center justify-center">
                  <Atom className="text-primary" size={40} />
                </div>
                <div className="flex gap-2 mt-3">
                  <button className="px-3 py-1.5 rounded bg-muted border border-border text-sm">Rotate</button>
                  <button className="px-3 py-1.5 rounded bg-muted border border-border text-sm">Zoom +</button>
                  <button className="px-3 py-1.5 rounded bg-muted border border-border text-sm">Zoom -</button>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-bold mb-3">Equation Balancer</h3>
                <div className="text-center font-mono p-3 rounded border border-border bg-muted/30 mb-3">? H₂ + ? O₂ → ? H₂O</div>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <input type="number" className="rounded border border-border p-2 bg-background" onChange={() => updateProgress(key, Math.max(value, 75))} />
                  <input type="number" className="rounded border border-border p-2 bg-background" onChange={() => updateProgress(key, Math.max(value, 80))} />
                  <input type="number" className="rounded border border-border p-2 bg-background" onChange={() => updateProgress(key, Math.max(value, 85))} />
                </div>
                <button onClick={() => updateProgress(key, 100)} className="w-full bg-primary text-white py-2 rounded text-sm font-semibold">Validate Results</button>
              </div>
            </div>
          </div>

          <aside className="rounded-xl border border-border bg-card p-5 space-y-4 h-fit">
            <h3 className="text-xs uppercase tracking-widest text-primary font-bold">Safety Protocols</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex gap-2"><Shield size={14} className="mt-1 text-primary" />Flammable materials</div>
              <div className="flex gap-2"><Shield size={14} className="mt-1 text-primary" />Toxic vapors control</div>
              <div className="flex gap-2"><Shield size={14} className="mt-1 text-primary" />Eye protection required</div>
            </div>
          </aside>
        </div>
      </main>
    );
  }

  if (subjectId !== 'math') {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-5xl mx-auto px-4 pt-28">
          <button
            onClick={() => router.push(`/platform/${subjectId}`)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft size={18} />
            Back
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#0f2e3a] text-slate-100 min-h-screen flex flex-col">
      <Navbar />

      <header className="sticky top-0 z-40 mt-20 bg-slate-900/95 backdrop-blur border-b border-blue-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => router.push('/platform/math')} className="text-slate-400 hover:text-blue-300 transition-colors flex items-center">
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-lg font-bold">Lineare Funktionen</h1>
              <p className="text-xs text-muted-foreground">Modul {moduleIndex}: Analysis Basics</p>
            </div>
          </div>

          <div className="flex items-center gap-4 flex-1 max-w-md mx-8">
            <div className="w-full bg-slate-700 rounded-full h-2.5 overflow-hidden">
              <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${moduleProgress}%` }} />
            </div>
            <span className="text-sm font-medium text-slate-300 min-w-[3ch]">{moduleProgress}%</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => updateProgress(progressKey, 100)}
              className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-500 transition-colors"
            >
              Als abgeschlossen markieren
            </button>
            <button className="p-2 text-slate-400 hover:text-blue-300 transition-colors">
              <Bookmark size={18} />
            </button>
            <div className="w-8 h-8 rounded-full bg-blue-900/40 flex items-center justify-center text-blue-200 font-bold text-sm">JS</div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-8 pb-12">
          <section>
            <h2 className="text-3xl font-bold mb-4">Steigung & Y-Achsenabschnitt</h2>
            <p className="text-slate-300 leading-relaxed text-lg">
              In dieser Lektion lernen wir die fundamentalen Bausteine einer linearen Funktion kennen. Wir untersuchen,
              wie sich die Parameter auf den Graphen auswirken.
            </p>
          </section>

          <section className="bg-slate-900/70 rounded-xl overflow-hidden border border-blue-900/40">
            <div className="relative aspect-video bg-black/85 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <button className="relative z-10 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg">
                <Play size={30} className="ml-1" />
              </button>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="flex justify-between text-white text-xs mb-2 font-medium">
                  <span>05:23 / 12:45</span>
                  <span>HD</span>
                </div>
                <div className="h-1 bg-white/20 rounded-full">
                  <div className="h-full bg-blue-500 w-1/3 rounded-full" />
                </div>
              </div>
            </div>
            <div className="p-4 flex items-center justify-between bg-slate-800/50">
              <div>
                <h3 className="font-semibold">Video Kapitel</h3>
                <div className="flex gap-2 mt-2 text-xs">
                  <span className="px-2 py-1 bg-card border border-border rounded">0:00 Intro</span>
                  <span className="px-2 py-1 bg-blue-600 text-white rounded">1:45 Steigung m</span>
                  <span className="px-2 py-1 bg-card border border-border rounded">5:20 Beispiel 1</span>
                </div>
              </div>
              <button className="text-blue-300 font-medium text-sm">Summary PDF</button>
            </div>
          </section>
        </div>

        <div className="lg:col-span-5 relative">
          <div className="sticky top-24 space-y-6">
            <div className="bg-slate-900/70 rounded-xl border border-blue-900/40 overflow-hidden">
              <div className="bg-blue-700 p-4 flex items-center justify-between text-white">
                <h3 className="font-bold">Übungsaufgabe 1</h3>
                <span className="text-xs bg-white/20 px-2 py-1 rounded font-medium">10 Punkte</span>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <p className="text-lg font-medium mb-2">Bestimme die Steigung</p>
                  <p className="text-muted-foreground">
                    Eine Gerade verläuft durch den Ursprung O(0|0) und den Punkt A(3|6). Wie groß ist die Steigung m?
                  </p>
                </div>

                <div>
                  <button
                    onClick={() => {
                      setTipOpened((prev) => !prev);
                      setMinProgress(25);
                    }}
                    className="text-sm text-blue-300 font-medium flex items-center gap-1"
                  >
                    <Lightbulb size={16} /> Tipp anzeigen
                  </button>
                  {tipOpened ? (
                    <div className="mt-2 p-3 rounded-lg border border-border bg-muted/40 text-sm text-muted-foreground">
                      Denke daran: Der Ursprung hat die Koordinaten (0|0). Nutze die Formel m = y/x.
                    </div>
                  ) : null}
                </div>

                <div className="space-y-3">
                  {['m = 0.5', 'm = 3', 'm = 2'].map((choice) => (
                    <label key={choice} className="flex items-center p-3 border border-border rounded-lg hover:bg-muted/40 cursor-pointer transition-all">
                      <input
                        className="h-4 w-4"
                        name="slope_question"
                        type="radio"
                        checked={selectedChoice === choice}
                        onChange={() => {
                          setSelectedChoice(choice);
                          setMinProgress(50);
                        }}
                      />
                      <span className="ml-3">{choice}</span>
                    </label>
                  ))}
                </div>

                <div className="pt-4 border-t border-border">
                  <label className="block text-sm font-medium mb-2">Ergebnis eingeben (optional)</label>
                  <input
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background"
                    placeholder="z.B. 2"
                    type="text"
                    value={answerInput}
                    onChange={(e) => {
                      setAnswerInput(e.target.value);
                      if (e.target.value.trim().length > 0) setMinProgress(75);
                    }}
                  />
                </div>

                <button
                  onClick={() => updateProgress(progressKey, 100)}
                    className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg flex justify-center items-center gap-2"
                >
                  Antwort prüfen
                  <CheckCircle2 size={16} />
                </button>
              </div>
            </div>

            <div className="bg-slate-900/70 border border-blue-900/40 rounded-xl p-4">
              <h4 className="font-semibold mb-2">Notizen</h4>
              <textarea className="w-full bg-transparent border border-border rounded-lg p-3 text-sm resize-none h-24" placeholder="Schreibe dir hier wichtige Punkte auf..." />
            </div>

            <div className="flex items-center justify-between bg-slate-900/70 p-4 rounded-xl border border-blue-900/40">
              <div className="flex items-center gap-3">
                <div className="bg-muted p-2 rounded-full">
                  <MessageCircleQuestion size={18} className="text-muted-foreground" />
                </div>
                <div className="text-sm">
                  <p className="font-medium">Frage stellen</p>
                  <p className="text-muted-foreground text-xs">Community hilft</p>
                </div>
              </div>
              <ArrowLeft size={16} className="rotate-180 text-muted-foreground" />
            </div>
          </div>
        </div>
      </main>
    </main>
  );
}
