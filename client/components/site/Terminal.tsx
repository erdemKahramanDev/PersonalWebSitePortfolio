/**
 * Terminal Component
 * 
 * Animated typing effect terminal with Matrix-style theme
 * Displays developer profile in a retro terminal interface
 * 
 * @author Ahmed Erdem Kahraman
 * @date 2025
 */

import { useEffect, useRef, useState } from "react";

export default function Terminal() {
  const lines = [
    "$ whoami",
    "> Full-stack developer | Problem solver | Coffee enthusiast ☕",
    "",
    "$ cat skills.json",
    "{",
    '  "frontend": ["React", "Next.js", "Nuxt.js", "TypeScript", "TailwindCSS"],',
    '  "backend": ["Laravel", "Mysql","Node.js", "Express", "PostgreSQL", "MongoDB"],',
    '  "superpower": "Hataları özelliğe dönüştürmek 🐛✨"',
    "}",
    "",
    "$ echo $MOTTO",
    "> 'Kod bizim oyun alanımız, hatalar ise gizli ipuçlarıdır.' 🎮",
    "",
    "// Hadi, birlikte harika şeyler yapalım! 🚀",
  ];

  const [displayLines, setDisplayLines] = useState<string[]>([]);
  const [current, setCurrent] = useState("");
  const lineIndex = useRef(0);
  const charIndex = useRef(0);
  const rafRef = useRef<number | null>(null);
  const accRef = useRef(0);
  const lastTimeRef = useRef(0);
  const TYPING_SPEED = 45; // ms per character target
  const LINE_PAUSE = 220; // ms pause between lines

  useEffect(() => {
    let running = true;

    const step = (time: number) => {
      if (!running) return;
      if (!lastTimeRef.current) lastTimeRef.current = time;
      const dt = time - lastTimeRef.current;
      lastTimeRef.current = time;
      accRef.current += dt;

      while (accRef.current >= TYPING_SPEED) {
        accRef.current -= TYPING_SPEED;
        if (lineIndex.current >= lines.length) {
          running = false;
          if (rafRef.current) cancelAnimationFrame(rafRef.current);
          return;
        }

        const line = lines[lineIndex.current];
        if (charIndex.current < line.length) {
          charIndex.current += 1;
          const next = line.slice(0, charIndex.current);
          setCurrent(next);
        } else {
          setDisplayLines((d) => [...d, line]);
          setCurrent("");
          charIndex.current = 0;
          lineIndex.current += 1;
          accRef.current -= -LINE_PAUSE;
        }
      }

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      running = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl border border-border/60 bg-transparent">
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
        <div className="relative w-full max-w-2xl">
          <div className="absolute -left-8 -top-8 h-40 w-72 rounded-xl bg-gradient-to-r from-[#0b1220] to-[#07202a] opacity-30 transform-gpu transition-all animate-float will-change-transform" style={{ transform: 'rotateY(12deg) rotateX(6deg)' }} />
          <div className="absolute -right-8 top-16 h-40 w-72 rounded-xl bg-gradient-to-r from-[#05202a] to-[#0b1220] opacity-25 transform-gpu transition-all animate-float will-change-transform" style={{ transform: 'rotateY(-12deg) rotateX(-6deg)' }} />
          <div className="absolute left-1/2 top-8 h-56 w-96 -translate-x-1/2 rounded-xl bg-gradient-to-r from-[#08323a] to-[#04121a] opacity-20 transform-gpu transition-all animate-float will-change-transform" style={{ transform: 'rotateY(6deg) rotateX(3deg)' }} />
        </div>
      </div>

      <div className="relative h-full w-full overflow-hidden rounded-xl border border-green-500/30 bg-black/95 dark:bg-black/95 text-sm text-green-400 shadow-lg shadow-green-500/10">
        <div className="flex items-center gap-2 border-b border-green-500/20 px-3 py-2 bg-black/60 dark:bg-black/60">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-400" />
            <span className="h-3 w-3 rounded-full bg-yellow-400" />
            <span className="h-3 w-3 rounded-full bg-green-400" />
          </div>
          <div className="ml-3 text-xs text-green-500/70 font-mono">~/projects/ahmederdemkahraman</div>
        </div>
        <pre className="p-3 sm:p-4 font-mono leading-relaxed overflow-y-auto h-[calc(100%-2.5rem)] text-[10px] xs:text-xs sm:text-sm text-green-400 selection:bg-green-400/30">
          {displayLines.map((line, i) => (
            <div key={i} className="whitespace-pre-wrap break-words">
              {line}
            </div>
          ))}
          <div className="whitespace-pre-wrap break-words">
            {current}
            <span className="inline-block w-1 animate-pulse bg-green-400 ml-1 align-middle">&nbsp;</span>
          </div>
        </pre>
      </div>
    </div>
  );
}
