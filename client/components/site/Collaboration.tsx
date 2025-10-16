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
      "Next.js ve React.js başta olmak üzere HTML/CSS/JS ile hızlı, erişilebilir ve SEO dostu web arayüzleri tasarlar ve uygularım.",
    Icon: Monitor,
  },
  {
    title: "Mobil Geliştirme",
    desc: "Flutter ve React Native ile iOS/Android’de tek kod tabanından akıcı, ölçeklenebilir mobil uygulamalar üretirim.",
    Icon: Smartphone,
  },
  {
    title: "Veritabanı Yönetimi",
    desc: "MySQL, PostgreSQL ve MongoDB üzerinde şema tasarımı, optimizasyon ve bakım süreçlerini üstlenirim.",
    Icon: Database,
  },
  {
    title: "API Geliştirme",
    desc: "Güvenli REST API’ler, kimlik doğrulama ve ödeme entegrasyonlarını içeren uçtan uca servisler kurarım.",
    Icon: Server,
  },
  {
    title: "Performans Optimizasyonu",
    desc: "Yüklenme süresi, Core Web Vitals ve genel tepki süresini ölçer, dar boğazları gideririm.",
    Icon: Zap,
  },
  {
    title: "E-ticaret Çözümleri",
    desc: "Stripe ve Iyzico ile ödeme akışlarını kurar; ölçeklenebilir mağaza altyapıları kurgularım.",
    Icon: ShoppingCart,
  },
  {
    title: "Yapay Zeka Çözümleri",
    desc: "İş süreçlerinize uygun ML/AI bileşenleri entegre eder, veri odaklı iyileştirmeler yaparım.",
    Icon: Brain,
  },
  {
    title: "Bulut Hizmetleri",
    desc: "Firebase, PocketBase ve Directus ile hızlı backend kurar; depolama, auth ve gerçek zamanlı veriyi yönetirim.",
    Icon: Cloud,
  },
  {
    title: "Full Stack Yazılım Geliştirme",
    desc: "Node.js–React/Next.js hattında Prisma, MongoDB/PostgreSQL ile modern, sürdürülebilir tam yığın çözümler geliştiririm.",
    Icon: Code2,
  },
  {
    title: "ERP Sistemi Geliştirme",
    desc: "Operasyonlarınızı tek çatı altında toplayan modüler ERP bileşenleri tasarlar ve uygularım.",
    Icon: Package,
  },
  {
    title: "CRM Çözümleri",
    desc: "Satış ve destek ekiplerinin ihtiyaçlarına göre özelleşen akışlar ve entegrasyonlar oluştururum.",
    Icon: Users,
  },
  {
    title: "Tema Geliştirme",
    desc: "Markanıza özel, hızlı ve SEO uyumlu temaları kodlar, sürümlemesini yaparım.",
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
            Bireysel olarak veya ekiple birlikte ihtiyaçlarınıza özel çözümler geliştirebiliriz.
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
              Yeni projelerde çalışmak ve iş birliği yapmak için sabırsızlanıyorum. Haydi fikirlerinizi konuşalım!
              <a className="text-accent font-bold ml-1"> İletişime Geç!</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
