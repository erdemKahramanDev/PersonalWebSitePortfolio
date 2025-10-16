/**
 * Resume Cards Component
 * 
 * Displays education timeline and GitHub activity feed
 * Fetches latest repositories from GitHub API
 * 
 * @author Ahmed Erdem Kahraman
 * @date 2025
 */

import React, { useEffect, useMemo, useState } from "react";

interface TimelineItem {
  year: string;
  title: string;
  subtitle?: string;
}

const education: TimelineItem[] = [
  { year: "2018-2024", title: "Bilecik Şeyh Edebali Üniversitesi", subtitle: "Bilgisayar Mühendisliği" },
  { year: "2017-2018", title: "Bilecik Şeyh Edebali Üniversitesi", subtitle: "İngilizce Hazırlık" },
  { year: "2013-2017", title: "Gazi Anadolu Lisesi", subtitle: "İstanbul / Sayısal" },
];

function TimelineCard({ title, items }: { title: string; items: TimelineItem[] }) {
  return (
    <div className="px-4 heroBg w-full rounded-lg lg:px-8 relative border border-border/60">
      <h2 className="text-accent p-6 font-mono text-xl mb-6">• {title}</h2>
      <div className="relative overflow-y-auto no-scrollbar pr-2 max-h-64 md:max-h-80">
        <div className="absolute left-6 top-0 h-full border-l-2 border-slate-300 dark:border-slate-600" />
        <ul className="space-y-6">
          {items.map((it, idx) => (
            <li key={idx} className="relative flex items-start space-x-4">
              <div className="w-3 h-3 bg-accent rounded-full mt-1.5" />
              <div className="pl-8 flex flex-col">
                <span className="text-muted-foreground text-base font-semibold">{it.year}</span>
                <span className="text-foreground font-mono text-lg">{it.title}</span>
                {it.subtitle && (
                  <span className="text-muted-foreground text-base">{it.subtitle}</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background/80 via-background/10 to-transparent pointer-events-none" />
    </div>
  );
}

export default function ResumeCards() {
  return (
    <section aria-label="Özgeçmiş" className="grid gap-6 md:grid-cols-2">
      <TimelineCard title="Eğitim" items={education} />
      <GitLogCard />
    </section>
  );
}

function GitLogCard() {
  const [items, setItems] = useState<TimelineItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const username = useMemo(() => (import.meta.env.VITE_GITHUB_USERNAME as string | undefined) || "erdemKahramanDev", []);

  useEffect(() => {
    let cancelled = false;
    const fetchEvents = async () => {
      if (!username) {
        setItems([]);
        return;
      }
      try {
        setLoading(true);
        setError(null);
        
        const reposRes = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=10&type=owner`, {
          headers: {
            Accept: "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28",
          },
        });
        
        if (!reposRes.ok) {
          throw new Error(`GitHub API error ${reposRes.status}`);
        }
        
        const repos = (await reposRes.json()) as any[];
        
        if (!cancelled) {
          // Repoları tarih formatında göster
          const repoItems: TimelineItem[] = repos
            .filter((r) => !r.fork) // Fork'ları hariç tut
            .map((r) => {
              const updated = r?.updated_at as string | undefined;
              const pushed = r?.pushed_at as string | undefined;
              const created = r?.created_at as string | undefined;
              const date = new Date(pushed || updated || created || Date.now());
              
              const formatter = new Intl.DateTimeFormat('tr-TR', {
                month: 'short',
                year: 'numeric'
              });
              const year = formatter.format(date);
              
              const name = r?.name as string | undefined;
              const desc = r?.description as string | undefined;
              const lang = r?.language as string | undefined;
              
              return {
                year,
                title: name ?? "Repo",
                subtitle: desc || (lang ? `${lang} projesi` : "Repository"),
                timestamp: date.getTime()
              };
            })
            .sort((a: any, b: any) => b.timestamp - a.timestamp)
            .slice(0, 8);
          
          setItems(repoItems);
        }
      } catch (e: any) {
        if (!cancelled) {
          setError(e?.message ?? "GitHub'dan veriler alınamadı");
          setItems([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchEvents();
    return () => {
      cancelled = true;
    };
  }, [username]);

  const list = items ?? [];
  return (
    <div className="px-4 heroBg w-full rounded-lg lg:px-8 relative border border-border/60">
      <h2 className="text-accent p-6 font-mono text-xl mb-6">• Git Günlüğü</h2>
      <div className="relative overflow-y-auto no-scrollbar pr-2 max-h-64 md:max-h-80">
        <div className="absolute left-6 top-0 h-full border-l-2 border-slate-300 dark:border-slate-600" />
        {list.length > 0 ? (
          <ul className="space-y-6">
            {list.map((it, idx) => (
              <li key={idx} className="relative flex items-start space-x-4">
                <div className="w-3 h-3 bg-accent rounded-full mt-1.5" />
                <div className="pl-8 flex flex-col">
                  <span className="text-muted-foreground text-base font-semibold">{it.year}</span>
                  <span className="text-foreground font-mono text-lg">{it.title}</span>
                  {it.subtitle && (
                    <span className="text-muted-foreground text-base">{it.subtitle}</span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="pl-8 py-2 text-muted-foreground text-sm">Henüz etkinlik bulunmuyor.</div>
        )}
      </div>
      {loading && <div className="absolute right-4 top-4 text-xs text-muted-foreground">Yükleniyor…</div>}
      {error && <div className="mt-2 text-xs text-destructive">{error}</div>}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background/80 via-background/10 to-transparent pointer-events-none" />
    </div>
  );
}
