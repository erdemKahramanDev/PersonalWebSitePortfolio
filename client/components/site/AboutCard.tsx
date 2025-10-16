import { useEffect, useState } from "react";

const highlights = [
  { title: "Frontend", desc: "Modern, erişilebilir ve performans odaklı arayüzler" },
  { title: "Backend", desc: "REST/GraphQL API tasarımı ve ölçeklenebilir mimariler" },
  { title: "Mobil", desc: "React Native / Flutter ile üretime hazır uygulamalar" },
  { title: "Bulut & DevOps", desc: "CI/CD, containerization, bulut dağıtımları" },
  { title: "Güvenlik", desc: "Temel güvenlik sertifikasyonları ve etik araştırmalar" },
];

export default function AboutCard() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="rounded-2xl border border-border/60 bg-transparent backdrop-blur-sm p-6 md:p-8">
      <div className="grid gap-6 place-items-center">
        <div className="space-y-4 text-center">
          <div className="font-mono text-sm text-accent">&lt;about&gt;</div>
          <h1 className="font-mono text-2xl font-semibold">Hakkımda</h1>

          <p className="text-foreground/80">
            Yazılım geliştirirken <span className="text-pink-500">temiz</span>, <span className="text-blue-400">test edilebilir</span> ve <span className="text-green-400">kullanıcı odaklı</span> çözümler
            üretmeyi severim. Hem ürün hem de altyapı tarafında uygulamaları uçtan uca
            inşa ediyorum; <span className="text-yellow-400">performans</span>, <span className="text-pink-500">güvenlik</span> ve <span className="text-blue-400">ölçeklenebilirlik</span> önceliğimdir.
          </p>

          {/* Feature highlights removed per request - content will be added later */}

          <div className="mt-4 font-mono text-sm text-accent">&lt;/about&gt;</div>
        </div>
      </div>
    </div>
  );
}
