'use client';

import React, { useState, useRef } from 'react';
import {
  Search,
  Flame,
  Award,
  Zap,
  Trophy,
  Star,
  CheckCircle2,
  ArrowRight,
  Timer,
  Lightbulb,
  Upload,
  FileText,
  Sparkles,
  X,
  ChevronRight,
  RotateCcw,
  CheckCheck,
  AlertCircle,
  Loader2,
  BookOpen,
} from 'lucide-react';

// ─── AI Quiz Generator Modal ──────────────────────────────────────────────────
function QuizGeneratorModal({ onClose, onQuizReady }) {
  const [file, setFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [questionCount, setQuestionCount] = useState(10);
  const fileInputRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) setFile(dropped);
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) setFile(e.target.files[0]);
  };

  const readFileAsBase64 = (f) =>
    new Promise((res, rej) => {
      const r = new FileReader();
      r.onload = () => res(r.result.split(',')[1]);
      r.onerror = () => rej(new Error('Lesen fehlgeschlagen'));
      r.readAsDataURL(f);
    });

  const readFileAsText = (f) =>
    new Promise((res, rej) => {
      const r = new FileReader();
      r.onload = () => res(r.result);
      r.onerror = () => rej(new Error('Lesen fehlgeschlagen'));
      r.readAsText(f);
    });

  const generateQuiz = async () => {
    if (!file) return;
    setLoading(true);
    setError('');

    try {
      let messageContent = [];
      const isPDF = file.type === 'application/pdf';
      const isImage = file.type.startsWith('image/');

      if (isPDF) {
        const base64 = await readFileAsBase64(file);
        messageContent = [
          {
            type: 'document',
            source: { type: 'base64', media_type: 'application/pdf', data: base64 },
          },
          {
            type: 'text',
            text: `Erstelle genau ${questionCount} Multiple-Choice-Quizfragen auf Basis des obigen Dokuments. Antworte NUR mit einem JSON-Array ohne Markdown-Backticks. Jede Frage hat folgende Felder: {"question": "...", "options": ["A","B","C","D"], "correctIndex": 0, "explanation": "..."}`,
          },
        ];
      } else if (isImage) {
        const base64 = await readFileAsBase64(file);
        messageContent = [
          { type: 'image', source: { type: 'base64', media_type: file.type, data: base64 } },
          {
            type: 'text',
            text: `Erstelle genau ${questionCount} Multiple-Choice-Quizfragen auf Basis des obigen Bildes/Dokuments. Antworte NUR mit einem JSON-Array ohne Markdown-Backticks. Jede Frage hat folgende Felder: {"question": "...", "options": ["A","B","C","D"], "correctIndex": 0, "explanation": "..."}`,
          },
        ];
      } else {
        const text = await readFileAsText(file);
        messageContent = [
          {
            type: 'text',
            text: `Hier ist der Inhalt der Datei:\n\n${text}\n\nErstelle genau ${questionCount} Multiple-Choice-Quizfragen auf Basis dieses Textes. Antworte NUR mit einem JSON-Array ohne Markdown-Backticks. Jede Frage hat folgende Felder: {"question": "...", "options": ["A","B","C","D"], "correctIndex": 0, "explanation": "..."}`,
          },
        ];
      }

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 4000,
          system:
            'Du bist ein Bildungs-Experte, der hochwertige Multiple-Choice-Quizfragen erstellt. Antworte immer nur mit einem gültigen JSON-Array, niemals mit anderem Text oder Backticks.',
          messages: [{ role: 'user', content: messageContent }],
        }),
      });

      const data = await response.json();
      const raw = data.content?.map((b) => b.text || '').join('');
      const cleaned = raw.replace(/```json|```/g, '').trim();
      const questions = JSON.parse(cleaned);

      onQuizReady({
        title: file.name.replace(/\.[^.]+$/, ''),
        questions,
      });
    } catch (err) {
      setError('Fehler beim Generieren. Bitte versuche es erneut.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const acceptedTypes = '.pdf,.txt,.md,.csv,.html,.json,.js,.py,.ts,.jsx,.tsx';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-[#0e1e14] border border-[#2a4a35] rounded-2xl w-full max-w-lg shadow-2xl relative overflow-hidden">
        {/* decorative glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent" />

        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                <Sparkles size={20} className="text-emerald-400" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">KI Quiz-Generator</h2>
                <p className="text-xs text-slate-400">Datei hochladen → Quiz erhalten</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <X size={18} className="text-slate-400" />
            </button>
          </div>

          {/* Drop Zone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 ${
              dragOver
                ? 'border-emerald-400 bg-emerald-400/10 scale-[1.01]'
                : file
                ? 'border-emerald-500/60 bg-emerald-500/5'
                : 'border-slate-600 hover:border-emerald-500/50 hover:bg-emerald-500/5'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept={acceptedTypes}
              onChange={handleFileChange}
              className="hidden"
            />

            {file ? (
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <FileText size={24} className="text-emerald-400" />
                </div>
                <p className="font-semibold text-emerald-300">{file.name}</p>
                <p className="text-xs text-slate-500">{(file.size / 1024).toFixed(1)} KB</p>
                <button
                  onClick={(e) => { e.stopPropagation(); setFile(null); }}
                  className="text-xs text-slate-500 hover:text-red-400 transition-colors mt-1"
                >
                  Entfernen
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center">
                  <Upload size={24} className="text-slate-400" />
                </div>
                <div>
                  <p className="font-semibold text-slate-200">Datei hierher ziehen</p>
                  <p className="text-sm text-slate-500 mt-1">oder klicken zum Auswählen</p>
                </div>
                <p className="text-xs text-slate-600">PDF, TXT, MD, CSV, Code-Dateien</p>
              </div>
            )}
          </div>

          {/* Question Count */}
          <div className="mt-5">
            <label className="text-sm font-semibold text-slate-300 block mb-3">
              Anzahl der Fragen: <span className="text-emerald-400">{questionCount}</span>
            </label>
            <div className="flex gap-2">
              {[5, 10, 15].map((n) => (
                <button
                  key={n}
                  onClick={() => setQuestionCount(n)}
                  className={`flex-1 py-2 rounded-lg text-sm font-bold border transition-all ${
                    questionCount === n
                      ? 'bg-emerald-500 border-emerald-400 text-black'
                      : 'bg-slate-800 border-slate-600 text-slate-400 hover:border-emerald-500/50'
                  }`}
                >
                  {n} Fragen
                </button>
              ))}
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="mt-4 flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3">
              <AlertCircle size={16} className="text-red-400 flex-shrink-0" />
              <p className="text-sm text-red-300">{error}</p>
            </div>
          )}

          {/* Generate Button */}
          <button
            onClick={generateQuiz}
            disabled={!file || loading}
            className={`w-full mt-5 py-3.5 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all duration-300 ${
              !file || loading
                ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                : 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-lg shadow-emerald-500/30 hover:-translate-y-0.5'
            }`}
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                KI generiert Fragen…
              </>
            ) : (
              <>
                <Sparkles size={18} />
                Quiz generieren
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Generated Quiz Player ────────────────────────────────────────────────────
function GeneratedQuizPlayer({ quiz, onClose }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState([]);

  const q = quiz.questions[current];
  const total = quiz.questions.length;
  const progress = ((current) / total) * 100;

  const handleSelect = (idx) => {
    if (revealed) return;
    setSelected(idx);
  };

  const handleReveal = () => {
    if (selected === null) return;
    setRevealed(true);
    const correct = selected === q.correctIndex;
    if (correct) setScore((s) => s + 1);
    setAnswers((a) => [...a, { correct, selected }]);
  };

  const handleNext = () => {
    if (current + 1 >= total) {
      setFinished(true);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
      setRevealed(false);
    }
  };

  const handleRestart = () => {
    setCurrent(0);
    setSelected(null);
    setRevealed(false);
    setScore(0);
    setFinished(false);
    setAnswers([]);
  };

  if (finished) {
    const pct = Math.round((score / total) * 100);
    const grade = pct >= 80 ? '🏆' : pct >= 60 ? '👍' : '📚';
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
        <div className="bg-[#0e1e14] border border-[#2a4a35] rounded-2xl w-full max-w-md p-8 text-center shadow-2xl">
          <div className="text-6xl mb-4">{grade}</div>
          <h2 className="text-2xl font-bold text-white mb-2">Quiz abgeschlossen!</h2>
          <p className="text-slate-400 mb-6">{quiz.title}</p>
          <div className="relative w-32 h-32 mx-auto mb-6">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#1e3a2a" strokeWidth="3" strokeDasharray="100,100" />
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#10b981" strokeWidth="3" strokeDasharray={`${pct},100`} strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-white">{pct}%</span>
              <span className="text-xs text-slate-400">{score}/{total}</span>
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={handleRestart} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-slate-600 text-slate-300 hover:bg-slate-800 transition-colors font-semibold">
              <RotateCcw size={16} /> Nochmal
            </button>
            <button onClick={onClose} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-500 text-black font-bold hover:bg-emerald-400 transition-colors">
              <CheckCheck size={16} /> Fertig
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#0e1e14] border border-[#2a4a35] rounded-2xl w-full max-w-xl shadow-2xl my-4">
        {/* Top bar */}
        <div className="p-5 border-b border-[#1a3225]">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <BookOpen size={16} className="text-emerald-400" />
              <span className="text-sm font-semibold text-slate-300 truncate max-w-[200px]">{quiz.title}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-500 font-mono">{current + 1} / {total}</span>
              <button onClick={onClose} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors">
                <X size={16} className="text-slate-400" />
              </button>
            </div>
          </div>
          <div className="w-full bg-[#1a3225] rounded-full h-1.5 overflow-hidden">
            <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="p-6">
          {/* Score strip */}
          <div className="flex items-center gap-2 mb-5">
            <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-400">
              ✓ {score} richtig
            </div>
            {answers.filter((a) => !a.correct).length > 0 && (
              <div className="px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-xs font-bold text-red-400">
                ✗ {answers.filter((a) => !a.correct).length} falsch
              </div>
            )}
          </div>

          {/* Question */}
          <h3 className="text-lg font-bold text-white leading-snug mb-5">{q.question}</h3>

          {/* Options */}
          <div className="space-y-3 mb-5">
            {q.options.map((opt, idx) => {
              const isSelected = selected === idx;
              const isCorrect = idx === q.correctIndex;
              let cls = 'border-[#2a4a35] bg-[#0a1a10] hover:border-emerald-500/40';
              if (revealed) {
                if (isCorrect) cls = 'border-emerald-500 bg-emerald-500/15';
                else if (isSelected && !isCorrect) cls = 'border-red-500 bg-red-500/10';
                else cls = 'border-[#1a3225] bg-[#0a1a10] opacity-50';
              } else if (isSelected) {
                cls = 'border-emerald-400 bg-emerald-400/10';
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 flex items-center justify-between ${cls}`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-7 h-7 rounded-full border flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                      revealed && isCorrect ? 'border-emerald-400 bg-emerald-400 text-black'
                      : revealed && isSelected && !isCorrect ? 'border-red-400 bg-red-400 text-white'
                      : isSelected ? 'border-emerald-400 bg-emerald-400/20 text-emerald-300'
                      : 'border-slate-600 text-slate-500'
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className={`text-sm font-medium ${revealed && isCorrect ? 'text-emerald-300' : 'text-slate-200'}`}>{opt}</span>
                  </div>
                  {revealed && isCorrect && <CheckCircle2 size={18} className="text-emerald-400 flex-shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {revealed && (
            <div className="bg-[#0a1e12] border-l-4 border-emerald-500 p-4 rounded-r-lg mb-5">
              <div className="flex items-start gap-3">
                <Lightbulb size={18} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">Erklärung</p>
                  <p className="text-sm text-slate-300 leading-relaxed">{q.explanation}</p>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3">
            {!revealed ? (
              <button
                onClick={handleReveal}
                disabled={selected === null}
                className={`px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all ${
                  selected === null
                    ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                    : 'bg-emerald-500 text-black hover:bg-emerald-400 shadow-lg shadow-emerald-500/30 hover:-translate-y-0.5'
                }`}
              >
                Antwort prüfen
                <ChevronRight size={16} />
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 bg-emerald-500 text-black hover:bg-emerald-400 shadow-lg shadow-emerald-500/30 hover:-translate-y-0.5 transition-all"
              >
                {current + 1 >= total ? 'Ergebnis' : 'Nächste Frage'}
                <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────
export default function QuizDashboard() {
  const [selectedAnswer, setSelectedAnswer] = useState(1);
  const [showGenerator, setShowGenerator] = useState(false);
  const [activeQuiz, setActiveQuiz] = useState(null);

  const topics = [
    { id: 1, title: 'Intro to Python', difficulty: 'Easy', progress: 45 },
    { id: 2, title: 'Advanced Geometry', difficulty: 'Medium', progress: 10 },
  ];

  const handleQuizReady = (quiz) => {
    setShowGenerator(false);
    setActiveQuiz(quiz);
  };

  return (
    <main className="min-h-screen bg-[#102216] text-slate-100 flex flex-col">
      {/* Modals */}
      {showGenerator && (
        <QuizGeneratorModal onClose={() => setShowGenerator(false)} onQuizReady={handleQuizReady} />
      )}
      {activeQuiz && (
        <GeneratedQuizPlayer quiz={activeQuiz} onClose={() => setActiveQuiz(null)} />
      )}

      {/* Header */}
      <header className="w-full border-b border-[#1a3225] bg-[#102216]/95 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-500 flex items-center justify-center text-black font-bold text-xl shadow-[0_0_15px_rgba(16,185,129,0.4)]">
                Q
              </div>
              <span className="text-xl font-bold tracking-tight">
                Quiz<span className="text-emerald-400">Master</span>
              </span>
            </div>

            <div className="hidden md:flex flex-1 max-w-lg mx-8 relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                <Search size={20} />
              </span>
              <input
                className="block w-full pl-10 pr-3 py-2.5 border border-[#1a3225] rounded-lg bg-[#0e1e14] placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-all"
                placeholder="Thema suchen…"
                type="text"
              />
            </div>

            <div className="flex items-center gap-6">
              {/* ✨ AI Quiz Button */}
              <button
                onClick={() => setShowGenerator(true)}
                className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 text-sm font-semibold hover:bg-emerald-500/25 hover:border-emerald-400 transition-all group"
              >
                <Sparkles size={16} className="group-hover:rotate-12 transition-transform" />
                KI Quiz erstellen
              </button>

              <div className="flex items-center gap-2 text-sm font-medium text-orange-400">
                <Flame size={18} />
                <span>12 Tage</span>
              </div>

              <div className="flex items-center gap-3 pl-6 border-l border-[#1a3225]">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold">Alex Chen</p>
                  <p className="text-xs text-emerald-400">Level 5</p>
                </div>
                <div className="h-10 w-10 rounded-full border-2 border-emerald-500 bg-emerald-500/20 flex items-center justify-center text-emerald-300 font-bold">
                  A
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        <div className="flex flex-col gap-8 items-center">

          {/* ✨ AI Quiz Banner */}
          <section className="w-full max-w-2xl">
            <div className="relative overflow-hidden rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-900/40 via-[#0e1e14] to-[#102216] p-6">
              <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
              <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center flex-shrink-0">
                    <Upload size={22} className="text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg">Quiz aus deiner Datei generieren</h3>
                    <p className="text-sm text-slate-400 mt-0.5">Lade PDF, Textdatei oder Code hoch. Die KI erstellt 10–15 Fragen automatisch.</p>
                    <div className="flex gap-2 mt-2 flex-wrap">
                      {['PDF', 'TXT', 'Markdown', 'Code'].map((t) => (
                        <span key={t} className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-wider">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setShowGenerator(true)}
                  className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 text-black font-bold text-sm hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/30 hover:-translate-y-0.5"
                >
                  <Sparkles size={16} />
                  Jetzt starten
                </button>
              </div>
            </div>
          </section>

          {/* Recommended Topics */}
          <section className="w-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Empfohlene Themen</h2>
              <a href="#" className="text-emerald-400 hover:text-white transition-colors text-sm font-medium">Alle anzeigen</a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
              {topics.map((topic) => (
                <div key={topic.id} className="group relative bg-[#0e1e14] rounded-xl overflow-hidden shadow-lg border border-[#1a3225] hover:border-emerald-500/50 transition-all duration-300 cursor-pointer">
                  <div className="h-40 w-full bg-[#0a1a10] flex items-center justify-center relative">
                    <code className="text-xs text-slate-600">preview_{topic.id}</code>
                    <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full border border-emerald-500/20">
                      <span className={`text-xs font-bold uppercase tracking-wider ${topic.difficulty === 'Easy' ? 'text-green-400' : 'text-orange-400'}`}>{topic.difficulty}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-emerald-400 transition-colors">{topic.title}</h3>
                    <p className="text-sm text-slate-500 mb-4">Meistere die Grundlagen mit interaktiven Übungen.</p>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-[#1a3225] rounded-full h-1.5">
                        <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${topic.progress}%` }} />
                      </div>
                      <span className="text-xs text-slate-500 font-mono">{topic.progress}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Active Quiz Session */}
          <section className="w-full">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="w-2 h-8 bg-emerald-500 rounded-sm"></span>
              Aktive Sitzung
            </h2>
            <div className="bg-[#0e1e14] rounded-xl p-8 border border-emerald-500/20 shadow-2xl max-w-2xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div className="flex-1">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
                    <span>Frage 4 / 10</span>
                    <span>CSS Grundlagen</span>
                  </div>
                  <div className="w-full bg-[#1a3225] rounded-full h-2.5 overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: '40%' }} />
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-[#0a1a10] px-4 py-2 rounded-lg border border-emerald-500/20">
                  <Timer size={18} className="text-emerald-400" />
                  <span className="font-mono text-lg font-bold">00:42</span>
                </div>
              </div>

              <div className="mb-8">
                <span className="inline-block px-3 py-1 rounded text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 mb-4">
                  Multiple Choice
                </span>
                <h3 className="text-2xl md:text-3xl font-bold leading-tight">
                  Welche CSS-Eigenschaft richtet Elemente entlang der Hauptachse in einem Flexbox-Container aus?
                </h3>
              </div>

              <div className="grid gap-4 mb-8">
                {[
                  { id: 0, label: 'align-items' },
                  { id: 1, label: 'justify-content', correct: true },
                  { id: 2, label: 'flex-direction' },
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setSelectedAnswer(option.id)}
                    className={`w-full p-5 text-left rounded-xl border-2 transition-all duration-200 flex items-center justify-between ${
                      selectedAnswer === option.id && option.correct
                        ? 'border-emerald-500 bg-emerald-500/10'
                        : 'border-[#1a3225] bg-[#0a1a10] hover:border-emerald-500/50'
                    }`}
                  >
                    <span className="font-medium text-lg">{option.label}</span>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                      selectedAnswer === option.id && option.correct
                        ? 'bg-emerald-500 text-black'
                        : 'border border-slate-600'
                    }`}>
                      {selectedAnswer === option.id && option.correct && <CheckCircle2 size={16} />}
                    </div>
                  </button>
                ))}
              </div>

              <div className="bg-emerald-500/10 border-l-4 border-emerald-500 p-6 rounded-r-lg">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-emerald-500 rounded-full text-black">
                    <Lightbulb size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-emerald-400 text-lg mb-1">Richtig!</h4>
                    <p className="text-slate-300 leading-relaxed">
                      <code className="text-emerald-400 bg-black/30 px-1 py-0.5 rounded font-mono text-sm">justify-content</code>{' '}
                      legt fest, wie der Browser den Platz zwischen und um Inhaltselemente entlang der Hauptachse verteilt.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-lg py-3 px-8 rounded-lg shadow-lg shadow-emerald-500/30 hover:-translate-y-1 transition-all flex items-center gap-2">
                  Nächste Frage
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="w-full max-w-2xl mx-auto space-y-8 mt-12">
          {/* Level */}
          <div className="bg-[#0e1e14] rounded-xl p-6 border border-[#1a3225] shadow-lg">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Award size={20} className="text-emerald-400" />
              Aktuelles Level
            </h3>
            <div className="flex items-center gap-6">
              <div className="relative w-24 h-24 flex-shrink-0">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#1a3225" strokeDasharray="100,100" strokeWidth="3" />
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#10b981" strokeDasharray="45,100" strokeLinecap="round" strokeWidth="3" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-2xl font-bold">5</span>
                  <span className="text-[0.6rem] text-slate-500 uppercase">Level</span>
                </div>
              </div>
              <div>
                <h4 className="font-bold text-xl">Wissenssuchender</h4>
                <p className="text-sm text-slate-500 mb-2">450 / 1000 XP</p>
                <p className="text-xs text-emerald-400">Noch 550 XP bis zum nächsten Level</p>
              </div>
            </div>
          </div>

          {/* Leaderboard */}
          <div className="bg-[#0e1e14] rounded-xl p-6 border border-[#1a3225] shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Rangliste</h3>
              <span className="text-xs bg-[#1a3225] px-2 py-1 rounded text-slate-500">Wöchentlich</span>
            </div>
            <div className="space-y-4">
              {[
                { rank: 1, name: 'CyberStudent', score: 9000, medal: '🥇' },
                { rank: 2, name: 'Du', score: 8400, medal: '🥈', current: true },
                { rank: 3, name: 'CodeNinja', score: 7850, medal: '🥉' },
                { rank: 4, name: 'PixelDev', score: 6200, medal: '' },
              ].map((user) => (
                <div key={user.rank} className={`flex items-center justify-between p-3 rounded-lg ${user.current ? 'bg-emerald-500/10 border border-emerald-500/20' : 'hover:bg-[#1a3225]'} transition-colors`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-6 text-center font-bold ${user.rank === 1 ? 'text-yellow-400' : user.rank === 2 ? 'text-gray-300' : 'text-orange-400'}`}>{user.medal || user.rank}</div>
                    <div className={`h-8 w-8 rounded-full ${user.current ? 'bg-emerald-500/30 border border-emerald-500' : 'bg-[#1a3225]'} flex items-center justify-center text-xs font-bold`}>{user.name[0]}</div>
                    <span className={`font-medium text-sm ${user.current ? 'text-white font-bold' : 'text-slate-400'}`}>{user.name}</span>
                  </div>
                  <span className="font-mono text-emerald-400 text-sm font-bold">{user.score}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Badges */}
          <div className="bg-[#0e1e14] rounded-xl p-6 border border-[#1a3225] shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Abzeichen</h3>
              <span className="text-xs text-emerald-400 cursor-pointer hover:underline">Alle anzeigen</span>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: Zap, label: 'Speedster', earned: true },
                { icon: Trophy, label: 'Top Woche', earned: true },
                { icon: Star, label: 'Mastermind', earned: false },
                { icon: Award, label: 'Gelehrter', earned: false },
                { icon: Trophy, label: 'Teamplayer', earned: false },
              ].map((badge, idx) => {
                const Icon = badge.icon;
                return (
                  <div key={idx} className={`flex flex-col items-center gap-2 ${badge.earned ? '' : 'opacity-40'}`}>
                    <div className={`w-14 h-14 rounded-full border-2 flex items-center justify-center ${badge.earned ? 'bg-[#1a3225] border-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.2)]' : 'bg-[#0a1a10] border-slate-700'}`}>
                      <Icon size={24} className={badge.earned ? 'text-emerald-400' : 'text-slate-600'} />
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wide text-center">{badge.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </aside>
      </div>

      {/* Footer */}
      <footer className="border-t border-[#1a3225] bg-[#0e1e14]/50 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-600 text-sm">
          © 2025 QuizMaster Education. Lerne täglich weiter.
        </div>
      </footer>
    </main>
  );
}