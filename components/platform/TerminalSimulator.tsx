'use client';

import React, { useMemo, useState } from 'react';

type FsNode = { type: 'dir'; children: Record<string, FsNode> } | { type: 'file'; content: string; mode?: string };

function splitPath(path: string): string[] {
  return path.split('/').filter(Boolean);
}

function joinPath(parts: string[]): string {
  return '/' + parts.join('/');
}

function resolvePath(cwd: string[], input: string): string[] {
  const base = input.startsWith('/') ? [] : [...cwd];
  const parts = input.startsWith('/') ? splitPath(input) : splitPath(input);
  const out = [...base];
  for (const p of parts) {
    if (p === '.') continue;
    if (p === '..') out.pop();
    else out.push(p);
  }
  return out;
}

function getNode(root: FsNode, path: string[]): FsNode | null {
  let cur: FsNode = root;
  for (const p of path) {
    if (cur.type !== 'dir') return null;
    const next = cur.children[p];
    if (!next) return null;
    cur = next;
  }
  return cur;
}

function ensureDir(root: FsNode, path: string[]): { root: FsNode; ok: boolean; err?: string } {
  let cur: FsNode = root;
  for (const p of path) {
    if (cur.type !== 'dir') return { root, ok: false, err: 'Not a directory' };
    cur.children[p] ??= { type: 'dir', children: {} };
    cur = cur.children[p];
  }
  return { root, ok: true };
}

export function TerminalSimulator({
  title,
}: {
  title: string;
}) {
  const [history, setHistory] = useState<string[]>([
    'ridona-terminal: type `help` for commands',
  ]);
  const [input, setInput] = useState('');
  const [cwd, setCwd] = useState<string[]>([]);
  const [fs, setFs] = useState<FsNode>(() => ({
    type: 'dir',
    children: {
      home: { type: 'dir', children: { student: { type: 'dir', children: {} } } },
      etc: { type: 'dir', children: {} },
      tmp: { type: 'dir', children: {} },
    },
  }));

  const prompt = useMemo(() => `student@ridona:${joinPath(cwd)}$`, [cwd]);

  function println(line: string) {
    setHistory((h) => [...h, line]);
  }

  function run(cmdline: string) {
    const trimmed = cmdline.trim();
    println(`${prompt} ${trimmed}`);
    if (!trimmed) return;

    const [cmd, ...args] = trimmed.split(/\s+/);
    const root = fs;

    if (cmd === 'help') {
      println('Supported: pwd, ls, cd, mkdir, touch, cat, echo, rm, chmod, whoami, clear');
      return;
    }
    if (cmd === 'clear') {
      setHistory([]);
      return;
    }
    if (cmd === 'whoami') {
      println('student');
      return;
    }
    if (cmd === 'pwd') {
      println(joinPath(cwd));
      return;
    }
    if (cmd === 'ls') {
      const target = args[0] ?? '.';
      const path = resolvePath(cwd, target);
      const node = getNode(root, path);
      if (!node) return println('ls: no such file or directory');
      if (node.type !== 'dir') return println(target);
      println(Object.keys(node.children).sort().join('  '));
      return;
    }
    if (cmd === 'cd') {
      const target = args[0] ?? '/home/student';
      const next = resolvePath(cwd, target);
      const node = getNode(root, next);
      if (!node || node.type !== 'dir') return println('cd: not a directory');
      setCwd(next);
      return;
    }
    if (cmd === 'mkdir') {
      const name = args[0];
      if (!name) return println('mkdir: missing operand');
      const path = resolvePath(cwd, name);
      const res = ensureDir(root, path);
      if (!res.ok) return println(`mkdir: ${res.err}`);
      setFs({ ...root });
      return;
    }
    if (cmd === 'touch') {
      const name = args[0];
      if (!name) return println('touch: missing file operand');
      const path = resolvePath(cwd, name);
      const dirPath = path.slice(0, -1);
      const base = path[path.length - 1];
      const dir = getNode(root, dirPath);
      if (!dir || dir.type !== 'dir') return println('touch: cannot touch');
      dir.children[base] ??= { type: 'file', content: '' };
      setFs({ ...root });
      return;
    }
    if (cmd === 'cat') {
      const name = args[0];
      if (!name) return println('cat: missing file operand');
      const path = resolvePath(cwd, name);
      const node = getNode(root, path);
      if (!node || node.type !== 'file') return println('cat: no such file');
      println(node.content || '');
      return;
    }
    if (cmd === 'echo') {
      println(args.join(' '));
      return;
    }
    if (cmd === 'rm') {
      const name = args[0];
      if (!name) return println('rm: missing operand');
      const path = resolvePath(cwd, name);
      const dirPath = path.slice(0, -1);
      const base = path[path.length - 1];
      const dir = getNode(root, dirPath);
      if (!dir || dir.type !== 'dir') return println('rm: cannot remove');
      delete dir.children[base];
      setFs({ ...root });
      return;
    }
    if (cmd === 'chmod') {
      const mode = args[0];
      const name = args[1];
      if (!mode || !name) return println('chmod: usage chmod <mode> <file>');
      const path = resolvePath(cwd, name);
      const node = getNode(root, path);
      if (!node || node.type !== 'file') return println('chmod: no such file');
      node.mode = mode;
      setFs({ ...root });
      return;
    }

    println(`${cmd}: command not found`);
  }

  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/10">
      <div className="flex items-center justify-between gap-4 mb-4">
        <h3 className="text-xl font-serif font-bold">{title}</h3>
        <div className="text-xs font-semibold opacity-60">Terminal</div>
      </div>

      <div className="rounded-xl border border-black/10 dark:border-white/10 bg-black text-white p-4 min-h-[240px] max-h-[360px] overflow-auto font-mono text-xs">
        {history.map((line, idx) => (
          <div key={idx} className="whitespace-pre-wrap">
            {line}
          </div>
        ))}
      </div>

      <form
        className="mt-3 flex items-center gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          run(input);
          setInput('');
        }}
      >
        <span className="text-xs opacity-60">{prompt}</span>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 px-3 py-2 text-sm font-mono focus:outline-none focus:border-[#d4a373]/60"
          placeholder="command…"
        />
      </form>
    </div>
  );
}

