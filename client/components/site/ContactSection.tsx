/**
 * Contact Section Component
 * 
 * Contact form with validation and email integration
 * Sends messages via server-side mail API
 * 
 * @author Ahmed Erdem Kahraman
 * @date 2025
 */

import { useState } from "react";
import type { ContactRequest, ContactResponse } from "@shared/api";

export default function ContactSection() {
  const [form, setForm] = useState<ContactRequest>({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<null | { ok: boolean; msg: string }>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);

    if (!form.name || !form.email || !form.subject || !form.message) {
      setStatus({ ok: false, msg: "Lütfen tüm alanları doldurun." });
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = (await res.json()) as ContactResponse & { error?: string; detail?: string };

      if (!res.ok || !data.ok) {
        const msg = data?.detail || data?.error || `Hata kodu: ${res.status}`;
        throw new Error(msg);
      }

      setStatus({ ok: true, msg: "Mesajınız iletildi. Teşekkürler!" });
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err: any) {
      setStatus({ ok: false, msg: err?.message || "Mesaj gönderilemedi. Lütfen daha sonra tekrar deneyin." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="mt-16">
      <div className="rounded-2xl border border-border/60 bg-card p-4 sm:p-6 md:p-8">
        <h3 className="font-mono text-xl sm:text-2xl font-semibold">İletişime Geç</h3>
        <p className="mt-2 max-w-2xl text-xs sm:text-sm text-foreground/80">
          Yeni projelerde çalışmak ve iş birliği yapmak için sabırsızlanıyorum. Formu doldurun, size geri dönüş yapayım.
        </p>
        <form onSubmit={onSubmit} className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="grid gap-2">
            <label className="text-xs sm:text-sm text-foreground/80">Adınız</label>
            <input
              name="name"
              value={form.name}
              onChange={onChange}
              className="w-full rounded-md border border-border/60 bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              placeholder="Ad Soyad"
            />
          </div>
          <div className="grid gap-2">
            <label className="text-xs sm:text-sm text-foreground/80">E-posta Hesabınız</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={onChange}
              className="w-full rounded-md border border-border/60 bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              placeholder="ornek@mail.com"
            />
          </div>
          <div className="grid gap-2 md:col-span-2">
            <label className="text-xs sm:text-sm text-foreground/80">Konu</label>
            <input
              name="subject"
              value={form.subject}
              onChange={onChange}
              className="w-full rounded-md border border-border/60 bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              placeholder="Proje konusu"
            />
          </div>
          <div className="grid gap-2 md:col-span-2">
            <label className="text-xs sm:text-sm text-foreground/80">Mesaj</label>
            <textarea
              name="message"
              value={form.message}
              onChange={onChange}
              className="min-h-[120px] sm:min-h-[140px] w-full rounded-md border border-border/60 bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              placeholder="Projenizden bahsedin"
            />
          </div>
          <div className="md:col-span-2">
            <button
              disabled={loading}
              type="submit"
              className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-60"
            >
              {loading ? "Gönderiliyor…" : "Mesaj Gönder"}
            </button>
          </div>
          {status && (
            <div className="md:col-span-2 text-sm mt-1">
              <span className={status.ok ? "text-emerald-500" : "text-destructive"}>{status.msg}</span>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
