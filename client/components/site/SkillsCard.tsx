/**
 * Skills Card Component
 * 
 * Displays technology stack with animated logo marquee
 * Auto-scrolling technology showcase
 * 
 * @author Ahmed Erdem Kahraman
 * @date 2025
 */

import React, { useEffect, useMemo, useRef, useState } from "react";

const iconNames = [
  "laravel",
  "php",
  "python",
  "react",
  "nuxt",
  "nodejs",
  "next",
  "flutter",
  "mysql", 
  "postgresql",
  "mongodb",
  "cloudflare",
  "linux",
  "github"
] as const;

function TechIcon({ name }: { name: string }) {
  const exts = useMemo(() => ["svg", "png", "webp"] as const, []);
  const [idx, setIdx] = useState(0);
  const src = `/icons/${name}.${exts[idx]}`;
  return (
    <img
      src={src}
      alt={name}
      loading="lazy"
      className="h-12 w-auto opacity-95 dark:brightness-125 dark:contrast-125"
      onError={() => setIdx((i) => (i + 1 < exts.length ? i + 1 : i))}
    />
  );
}

export default function SkillsCard() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const segmentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    const segment = segmentRef.current;
    if (!wrapper || !track || !segment) return;

    const calc = () => {
      const segmentWidth = segment.scrollWidth;
      const speed = 60; // px/sn
      const duration = Math.max(8, segmentWidth / speed);
      track.style.setProperty("--segment-width", `${segmentWidth}px`);
      track.style.setProperty("--marquee-duration", `${duration}s`);
    };

    calc();
    const ro = new ResizeObserver(calc);
    ro.observe(wrapper);
    ro.observe(segment);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card p-6 md:p-8">
      {/* Dönen dekoratif halkalar: sağ alt köşe, 4 halka */}
      <div aria-hidden className="pointer-events-none absolute -bottom-12 -right-12 opacity-50 md:opacity-60">
        {/* Ring 1 (outer) */}
        <div className="relative flex items-center justify-center w-[240px] h-[240px] rounded-full border-2 border-[rgb(118,133,121)] animate-spin [animation-duration:70s] [animation-timing-function:linear]">
          <div className="absolute w-[10px] h-[10px] bg-[rgb(118,133,121)] rounded-full -top-[5px] left-1/2 -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute w-[10px] h-[10px] bg-[rgb(118,133,121)] rounded-full -bottom-[5px] left-1/2 -translate-x-1/2 translate-y-1/2" />

          {/* Ring 2 */}
          <div className="relative flex items-center justify-center w-[200px] h-[200px] rounded-full border-2 border-[rgb(118,133,121)] animate-spin [animation-direction:reverse] [animation-duration:60s] [animation-timing-function:linear]">
            <div className="absolute w-[10px] h-[10px] bg-[rgb(118,133,121)] rounded-full -top-[5px] left-1/2 -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute w-[10px] h-[10px] bg-[rgb(118,133,121)] rounded-full -bottom-[5px] left-1/2 -translate-x-1/2 translate-y-1/2" />

            {/* Ring 3 */}
            <div className="relative flex items-center justify-center w-[140px] h-[140px] rounded-full border-2 border-[rgb(118,133,121)] animate-spin [animation-duration:40s] [animation-timing-function:linear]">
              <div className="absolute w-[10px] h-[10px] bg-[rgb(118,133,121)] rounded-full -top-[5px] left-1/2 -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute w-[10px] h-[10px] bg-[rgb(118,133,121)] rounded-full -bottom-[5px] left-1/2 -translate-x-1/2 translate-y-1/2" />

              {/* Ring 4 (innermost - fastest, reverse) */}
              <div className="relative flex items-center justify-center w-[100px] h-[100px] rounded-full border-2 border-[rgb(118,133,121)] animate-spin [animation-direction:reverse] [animation-duration:24s] [animation-timing-function:linear]">
                <div className="absolute w-[10px] h-[10px] bg-[rgb(118,133,121)] rounded-full -top-[5px] left-1/2 -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute w-[10px] h-[10px] bg-[rgb(118,133,121)] rounded-full -bottom-[5px] left-1/2 -translate-x-1/2 translate-y-1/2" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="font-mono text-sm text-accent">• Yeteneklerim</div>

      {/* Marquee logos */}
      <div ref={wrapperRef} className="marquee-container mt-6 relative overflow-hidden rounded-xl border border-border/60">
        <div
          ref={trackRef}
          className="marquee-track animate-marquee flex whitespace-nowrap items-center py-3 will-change-transform"
          style={{
            // Use Tailwind's marquee keyframes, override only duration
            animationDuration: "var(--marquee-duration)"
          }}
        >
          <div ref={segmentRef} className="flex shrink-0 items-center gap-6 px-3">
            {iconNames.map((name) => (
              <div
                key={name + "-a"}
                className="flex h-14 w-32 items-center justify-center rounded-md border border-border/40 bg-secondary/20 dark:bg-secondary/40 p-2"
                aria-label={name}
                title={name}
              >
                <TechIcon name={name} />
              </div>
            ))}
          </div>

          {/* Segment B (duplicate for seamless scroll) */}
          <div className="flex shrink-0 items-center gap-6 px-3" aria-hidden>
            {iconNames.map((name) => (
              <div
                key={name + "-b"}
                className="flex h-14 w-32 items-center justify-center rounded-md border border-border/40 bg-secondary/20 dark:bg-secondary/40 p-2"
                aria-label={name}
                title={name}
              >
                <TechIcon name={name} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-2 text-sm text-foreground/80">
        <div>• <strong>Ön Uç (Front-End)</strong>: HTML, CSS, JavaScript, TailwindCSS, React.js, Next.js, Nuxt.js</div>
        <div>• <strong>Mobil Geliştirme</strong>: Expo React Native, Flutter</div>
        <div>• <strong>Arka Uç (Back-End)</strong>: PHP, Laravel, Node.js, Python</div>
        <div>• <strong>Veritabanları (Databases)</strong>: MySQL, PostgreSQL, MongoDB, MSSQL</div>
        <div>• <strong>Diğer</strong>: Cloudflare, Linux, GitHub, NextUI, NextAuth, Prisma, Directus, Sanity, Clerk, shadcn/ui, PocketBase</div>
      </div>
    </div>
  );
}
