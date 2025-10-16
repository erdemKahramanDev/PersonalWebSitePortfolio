const stats = [
  { k: "Yıl Deneyim", v: "5+" },
  { k: "Tamamlanan Projeler", v: "7+" },
  { k: "Müşteri Memnuniyeti", v: "12+" },
  { k: "Kod Satırı", v: "18M+" },
];

export default function Stats() {
  return (
    <section aria-label="İstatistikler" className="mt-10">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.k} className="rounded-xl border border-border/60 bg-card p-6 text-center">
            <div className="text-3xl font-bold text-accent">{s.v}</div>
            <div className="mt-1 text-sm text-foreground/70">{s.k}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
