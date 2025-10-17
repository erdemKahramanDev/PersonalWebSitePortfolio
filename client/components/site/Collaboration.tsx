/**
 * Collaboration Section Component
 * 
 * Displays service offerings and collaboration opportunities
 * Features: Responsive grid layout, interactive cards with icons, hover effects
 * 
 * @author Ahmed Erdem Kahraman
 * @date 2025
 */

import { Code2, Brain, Cloud, Database, Monitor, Package, Palette, Server, ShoppingCart, Smartphone, Users, Zap } from "lucide-react";
import React from "react";

type Item = {
  title: string;
  desc: string;
  Icon: React.ComponentType<{ className?: string }>;
};

const items: Item[] = [
  {
    title: "Web Geliştirme",
    desc:
      "Modern, hızlı ve kullanıcı dostu web siteleri oluşturuyorum. Next.js ve React.js ile SEO uyumlu, ölçeklenebilir çözümler sunuyorum.",
    Icon: Monitor,
  },
  {
    title: "Mobil Geliştirme",
    desc: "Tek kod tabanı ile iOS ve Android için akıcı, native deneyim sunan mobil uygulamalar geliştiriyorum. Flutter ve React Native uzmanıyım.",
    Icon: Smartphone,
  },
  {
    title: "Veritabanı Yönetimi",
    desc: "Verilerinizi güvenli, hızlı ve düzenli tutuyorum. MySQL, PostgreSQL ve MongoDB ile veri mimarinizi optimize ediyorum.",
    Icon: Database,
  },
  {
    title: "API Geliştirme",
    desc: "Güvenli ve hızlı API'ler oluşturuyorum. Kimlik doğrulama, ödeme sistemleri ve üçüncü parti entegrasyonlarıyla uçtan uca çözümler sunuyorum.",
    Icon: Server,
  },
  {
    title: "Performans Optimizasyonu",
    desc: "Web sitenizi hızlandırın! Yüklenme sürelerini minimuma indirerek kullanıcı deneyimini en üst seviyeye çıkarıyorum.",
    Icon: Zap,
  },
  {
    title: "E-ticaret Çözümleri",
    desc: "Profesyonel e-ticaret siteleri oluşturuyor, ödeme sistemlerini entegre ederek satış sürecinizi sorunsuz hale getiriyorum.",
    Icon: ShoppingCart,
  },
  {
    title: "Yapay Zeka Çözümleri",
    desc: "İş süreçlerinizi dönüştürün! Yapay zeka ile veri analizi, otomasyon ve akıllı sistemler geliştiriyorum.",
    Icon: Brain,
  },
  {
    title: "Bulut Hizmetleri",
    desc: "Güvenilir ve ölçeklenebilir bulut altyapıları kuruyor, veri depolama ve gerçek zamanlı senkronizasyon sağlıyorum.",
    Icon: Cloud,
  },
  {
    title: "Full Stack Yazılım Geliştirme",
    desc: "Fikrinizden tam ürüne! Node.js–React/Next.js teknolojileriyle uçtan uca modern web çözümleri geliştiriyorum.",
    Icon: Code2,
  },
  {
    title: "ERP Sistemi Geliştirme",
    desc: "İş süreçlerinizi dijitalleştirin! Operasyonlarınızı tek çatı altında toplayan özel ERP sistemleri tasarlıyorum.",
    Icon: Package,
  },
  {
    title: "CRM Çözümleri",
    desc: "Müşteri ilişkilerinizi yönetin! Satış ve destek süreçleriniz için özelleştirilmiş CRM sistemleri oluşturuyorum.",
    Icon: Users,
  },
  {
    title: "Tema Geliştirme",
    desc: "Markanızı yansıtan benzersiz web temaları oluşturuyorum. Hızlı, duyarlı ve SEO dostu tasarımlarla dijital varlığınızı güçlendiriyorum.",
    Icon: Palette,
  },
];

export default function Collaboration() {
  const cardHover = "hover:border-accent/60 hover:bg-accent/10 dark:hover:bg-accent/15 hover:ring-1 hover:ring-accent/30";
  const iconHover = "group-hover:text-emerald-500"
  return (
    <section id="collaboration" className="container mx-auto px-2 lg:px-0">
      <div className="heroBg w-full rounded-lg border border-border/60">
        <div className="px-4 py-12">
          <h2 className="text-accent text-center p-6 font-mono text-lg mb-2">• İş Birliği</h2>
          <h2 className="text-center text-xl lg:text-4xl max-w-5xl mx-auto font-bold font-mono mb-10">
            Yaratıcı çözümler için birlikte çalışalım
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map(({ title, desc, Icon }) => (
              <div
                key={title}
                className={`group border border-border/60 bg-card h-80 px-10 flex flex-col justify-center p-6 rounded-lg transition will-change-transform hover:-translate-y-1 hover:shadow-lg ${cardHover}`}
              >
                <div className="mb-4 mt-6 flex items-center justify-center text-3xl">
                  <Icon className={`h-8 w-8 text-foreground/90 transition-colors ${iconHover}`} />
                </div>
                <h3 className="text-lg font-medium mb-2 text-center transition-colors group-hover:text-foreground">
                  {title}
                </h3>
                <p className="text-sm font-mono text-center text-foreground/80 transition-colors">
                  {desc}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mx-auto flex items-center justify-center mt-12 max-w-lg">
            <p className="text-base">
              Bir sonraki projenizde birlikte çalışmak ister misiniz? Fikirlerinizi hayata geçirelim!
              <a href="#contact" className="text-accent font-bold ml-1">İletişime Geçin</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}