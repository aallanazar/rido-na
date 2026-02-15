'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
} from 'lucide-react';

export default function QuizDashboard() {
  const [selectedAnswer, setSelectedAnswer] = useState(1);

  const topics = [
    { id: 1, title: 'Intro to Python', difficulty: 'Easy', progress: 45 },
    { id: 2, title: 'Advanced Geometry', difficulty: 'Medium', progress: 10 },
  ];

  return (
    <main className="min-h-screen bg-[#102216] text-slate-100 flex flex-col">
      {/* Header */}
      <header className="w-full border-b border-border bg-[#102216]/95 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-background font-bold text-xl shadow-[0_0_15px_rgba(var(--primary),0.5)]">
                Q
              </div>
              <span className="text-xl font-bold tracking-tight">
                Quiz<span className="text-primary">Master</span>
              </span>
            </div>

            {/* Search */}
            <div className="hidden md:flex flex-1 max-w-lg mx-8 relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                <Search size={20} />
              </span>
              <input
                className="block w-full pl-10 pr-3 py-2.5 border border-border rounded-lg leading-5 bg-card placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm transition-shadow duration-200"
                placeholder="Find a topic..."
                type="text"
              />
            </div>

            {/* User Profile */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-sm font-medium text-orange-400">
                <Flame size={18} />
                <span>12 Day Streak</span>
              </div>
              <div className="flex items-center gap-3 pl-6 border-l border-border">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-foreground">Alex Chen</p>
                  <p className="text-xs text-primary">Level 5</p>
                </div>
                <Image
                  className="h-10 w-10 rounded-full border-2 border-primary object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQrAFWlZFiP5uFgjAzKllEhQp4HJnxbQwyyBpVqUDodGOJpOhYs6aE8NS2hWp-u4wEHKaWqAUSIsHgzAU4qj4mf3pA1VYxqxmeagmS88U1RsDfVaBSvrsRHRKvrN6ehDt3tck4xd50cgZIfFW8zayim-SmthktRCGn9kBYY9iO5b9dGvObaXygFAA8dQkOym2sbBZsggtyNZopTxTvEJiR0CKmIkGUsUgruTjXzJZ1t1kF6Z9Citi4_wrrniDtcNu5e52naHJhK_E"
                  alt="User Avatar"
                  width={40}
                  height={40}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Content */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          {/* Recommended Topics */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Recommended Topics</h2>
              <Link href="#" className="text-primary hover:text-foreground transition-colors text-sm font-medium">
                View All
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {topics.map((topic) => (
                <div
                  key={topic.id}
                  className="group relative bg-card rounded-xl overflow-hidden shadow-lg border border-border hover:border-primary transition-all duration-300 hover:shadow-[0_0_20px_rgba(var(--primary),0.15)] cursor-pointer"
                >
                  <div className="h-40 w-full overflow-hidden relative bg-muted">
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                      <code className="text-sm">code_area_{topic.id}</code>
                    </div>
                    <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full border border-primary/30">
                      <span className={`text-xs font-bold uppercase tracking-wider ${topic.difficulty === 'Easy' ? 'text-green-400' : topic.difficulty === 'Medium' ? 'text-orange-400' : 'text-red-400'}`}>
                        {topic.difficulty}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{topic.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">Master the basics and dive deeper with interactive lessons.</p>
                    <div className="flex items-center justify-between">
                      <div className="w-full bg-muted rounded-full h-1.5 mr-4 max-w-[100px]">
                        <div className="bg-primary h-1.5 rounded-full" style={{ width: `${topic.progress}%` }} />
                      </div>
                      <span className="text-xs text-muted-foreground">{topic.progress}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Active Quiz Session */}
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="w-2 h-8 bg-primary rounded-sm"></span>
              Current Session
            </h2>
            <div className="bg-card rounded-xl p-8 border border-primary/20 shadow-2xl relative overflow-hidden">
              {/* Progress & Timer */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div className="flex-1">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
                    <span>Question 4 / 10</span>
                    <span>CSS Mastery</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
                    <div className="bg-primary h-full rounded-full transition-all duration-500" style={{ width: '40%' }} />
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-background px-4 py-2 rounded-lg border border-primary/20">
                  <Timer size={18} className="text-primary" />
                  <span className="font-mono text-lg font-bold">00:42</span>
                </div>
              </div>

              {/* Question */}
              <div className="mb-8">
                <span className="inline-block px-3 py-1 rounded text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 mb-4">
                  Multiple Choice
                </span>
                <h3 className="text-2xl md:text-3xl font-bold leading-tight">
                  Which CSS property is used to align items along the main axis in a Flexbox container?
                </h3>
              </div>

              {/* Options */}
              <div className="grid gap-4 mb-8">
                {[
                  { id: 0, label: 'align-items' },
                  { id: 1, label: 'justify-content', correct: true },
                  { id: 2, label: 'flex-direction' },
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setSelectedAnswer(option.id)}
                    className={`w-full p-5 text-left rounded-xl border-2 transition-all duration-200 flex items-center justify-between relative overflow-hidden group ${
                      selectedAnswer === option.id && option.correct
                        ? 'border-primary bg-primary/10 shadow-[0_0_15px_rgba(var(--primary),0.1)]'
                        : 'border-border bg-background hover:border-primary hover:bg-primary/5'
                    }`}
                  >
                    <span className="font-medium text-lg">{option.label}</span>
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                        selectedAnswer === option.id && option.correct
                          ? 'bg-primary text-background'
                          : 'border border-muted-foreground group-hover:border-primary group-hover:bg-primary/20'
                      }`}
                    >
                      {selectedAnswer === option.id && option.correct && <CheckCircle2 size={16} />}
                    </div>
                    {selectedAnswer === option.id && option.correct && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent skew-x-12" />
                    )}
                  </button>
                ))}
              </div>

              {/* Feedback */}
              <div className="bg-primary/10 border-l-4 border-primary p-6 rounded-r-lg">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary rounded-full text-background">
                    <Lightbulb size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary text-lg mb-1">Correct!</h4>
                    <p className="text-foreground leading-relaxed">
                      <code className="text-primary bg-background/30 px-1 py-0.5 rounded font-mono text-sm">
                        justify-content
                      </code>{' '}
                      defines how the browser distributes space between and around content items along the main-axis of a flex container. Great
                      job!
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-8 flex justify-end">
                <button className="bg-primary hover:bg-primary/90 text-background font-bold text-lg py-3 px-8 rounded-lg shadow-lg shadow-primary/30 transform hover:-translate-y-1 transition-all flex items-center gap-2">
                  Next Question
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* Right Sidebar */}
        <aside className="lg:col-span-4 space-y-8">
          {/* Level System */}
          <div className="bg-card rounded-xl p-6 border border-border shadow-lg">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Award size={20} className="text-primary" />
              Current Level
            </h3>
            <div className="flex items-center gap-6">
              {/* Circular Progress */}
              <div className="relative w-24 h-24 flex-shrink-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-muted"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeDasharray="100, 100"
                    strokeWidth="3"
                  ></path>
                  <path
                    className="text-primary"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeDasharray="45, 100"
                    strokeLinecap="round"
                    strokeWidth="3"
                  ></path>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-2xl font-bold">5</span>
                  <span className="text-[0.6rem] text-muted-foreground uppercase">Level</span>
                </div>
              </div>
              <div>
                <h4 className="font-bold text-xl text-foreground">Knowledge Seeker</h4>
                <p className="text-sm text-muted-foreground mb-2">450 / 1000 XP</p>
                <p className="text-xs text-primary">550 XP to next level</p>
              </div>
            </div>
          </div>

          {/* Leaderboard */}
          <div className="bg-card rounded-xl p-6 border border-border shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-foreground">Rangliste</h3>
              <span className="text-xs bg-muted px-2 py-1 rounded text-muted-foreground">Weekly</span>
            </div>
            <div className="space-y-4">
              {[
                { rank: 1, name: 'CyberStudent', score: 9000, medal: '🥇' },
                { rank: 2, name: 'You', score: 8400, medal: '🥈', current: true },
                { rank: 3, name: 'CodeNinja', score: 7850, medal: '🥉' },
                { rank: 4, name: 'PixelDev', score: 6200, medal: '' },
              ].map((user) => (
                <div
                  key={user.rank}
                  className={`flex items-center justify-between p-3 rounded-lg transition-colors ${user.current ? 'bg-primary/10 border border-primary/30' : 'hover:bg-muted'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 text-center font-bold ${user.rank === 1 ? 'text-yellow-400' : user.rank === 2 ? 'text-gray-300' : 'text-orange-400'}`}>
                      {user.medal || user.rank}
                    </div>
                    <div className={`h-8 w-8 rounded-full ${user.current ? 'bg-primary/30 border border-primary' : 'bg-muted'} overflow-hidden flex items-center justify-center text-xs font-bold`}>
                      {user.name[0]}
                    </div>
                    <span className={`font-medium text-sm ${user.current ? 'text-foreground font-bold' : 'text-muted-foreground'}`}>
                      {user.name}
                    </span>
                  </div>
                  <span className="font-mono text-primary text-sm font-bold">{user.score}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Badges */}
          <div className="bg-card rounded-xl p-6 border border-border shadow-lg">
            <h3 className="text-lg font-bold mb-4 flex items-center justify-between">
              <span>Abzeichen</span>
              <span className="text-xs text-primary cursor-pointer hover:underline">View All</span>
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: Zap, label: 'Speed Demon', earned: true },
                { icon: Trophy, label: 'Perfect Week', earned: true },
                { icon: Star, label: 'Mastermind', earned: false },
                { icon: Award, label: 'Scholar', earned: false },
                { icon: Trophy, label: 'Team Player', earned: false },
              ].map((badge, idx) => {
                const Icon = badge.icon;
                return (
                  <div
                    key={idx}
                    className={`flex flex-col items-center gap-2 ${badge.earned ? 'opacity-100' : 'opacity-40'} ${badge.earned ? 'group cursor-pointer' : 'cursor-not-allowed'}`}
                  >
                    <div
                      className={`w-14 h-14 rounded-full border-2 flex items-center justify-center ${
                        badge.earned
                          ? 'bg-gray-800 border-primary shadow-[0_0_10px_rgba(var(--primary),0.3)] group-hover:scale-110 transition-transform'
                          : 'bg-gray-900 border-muted-foreground group-hover:border-muted transition-colors'
                      }`}
                    >
                      <Icon size={24} className={badge.earned ? 'text-primary' : 'text-muted-foreground'} />
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wide text-center text-foreground">{badge.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </aside>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-muted-foreground text-sm">
          © 2023 QuizMaster Education. Keep Learning.
        </div>
      </footer>
    </main>
  );
}
