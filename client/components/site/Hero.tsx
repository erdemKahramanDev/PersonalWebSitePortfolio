/**
 * Hero Section Component
 * 
 * Main landing section with animated terminal and developer introduction
 * Features: Terminal animation, responsive layout, gradient text effects
 * 
 * @author Ahmed Erdem Kahraman
 * @date 2025
 */

import { cn } from "@/lib/utils";
import Terminal from "./Terminal";
import { useState } from "react";

export default function Hero() {
  const [showFullText, setShowFullText] = useState(false);

  return (
    <section id="home" className="">
      <div className="container mx-auto mt-6 px-2 lg:px-0" style={{ background: 'transparent' }}>
        <div className="flex flex-col box-linear-animation lg:flex-row items-center justify-between heroBg animatedBox p-8 lg:min-h-[650px] rounded-lg shadow-lg relative gap-12" style={{ background: 'transparent' }}>
          <div className="relative flex-shrink-0 w-full lg:w-5/12 flex justify-center">
            <div className="rounded-lg overflow-hidden w-full max-w-[350px] h-[320px] sm:max-w-[400px] sm:h-[380px] lg:w-[450px] lg:h-[450px] xl:w-[500px] xl:h-[500px]">
              <Terminal />
            </div>
          </div>

          <div className="lg:w-7/12 mt-6 lg:mt-0 text-center lg:text-left">
            <div className="font-mono text-base sm:text-lg">
              <span className="text-pink-400">&lt;span&gt;</span>
              <span className="text-foreground"> Merhaba, ben Ahmed Erdem
                <span className="blinking-cursor text-yellow-400">|</span>
              </span>
              <span className="text-pink-400">&lt;/span&gt;</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-6 md:mt-8 font-medium font-mono leading-tight">
              <span className="animated-gradient-text">{`{Full`}</span>
              <p>
                <span className="animated-gradient-text">{`Stack}`}</span> Web &amp; App developer
              </p>
            </h1>

            <div className="mt-4 px-4 sm:px-6 md:px-0">
              <p className={cn(
                "herotext text-foreground/80 text-sm sm:text-base transition-all duration-500",
                !showFullText && "line-clamp-4 md:line-clamp-none"
              )}> 
                <span className="text-pink-500">&lt;p&gt;</span> Merhaba, ben modern teknolojileri kullanarak <span className="text-green-400">yenilikçi</span>, <span className="text-yellow-400">ölçeklenebilir</span> ve <span className="text-blue-400">kullanıcıyı merkeze alan</span> web ve mobil çözümler hayata geçiren bir yazılım geliştiricisiyim. 
                <span className={cn(showFullText ? "inline" : "hidden md:inline")}>
                  <br /><br /> Teknoloji yelpazemde yer alan <span className="text-pink-500">Next.js, Nuxt.js, Node.js, Flutter</span> ve <span className="text-pink-500">React.js</span> gibi araçlarla sadece kod yazmıyor, aynı zamanda performanslı ve geleceğe dönük sistemler inşa ediyorum. Özellikle <span className="text-green-400">sistem mimarisi</span> tasarımı, mikroservisler ve veritabanı optimizasyonu gibi konulara büyük bir tutkuyla yaklaşıyorum.
                  <br /><br /> Backend tarafında, yüksek trafiği sorunsuzca yönetebilen, modüler ve kolayca geliştirilebilen mimariler tasarlamak en büyük önceliğim. API tasarımı ve veri modellemesiyle sağlam temeller atarak ölçeklenebilir çözümler üretiyorum.
                  <br /><br /> Hedefim; estetik ve işlevselliği buluşturan, hem kod kalitesiyle hem de kullanıcı deneyimiyle öne çıkan özel yazılım çözümleri geliştirmektir. Web sitesi geliştirme, mobil uygulama oluşturma ve yazılım satın alma hizmetleri sunmaktayım.
                </span>
                <span className="text-pink-500">&lt;/p&gt;</span> 
              </p>
              
              <button 
                onClick={() => setShowFullText(!showFullText)}
                className="md:hidden mt-4 mx-auto text-xs sm:text-sm text-foreground dark:text-accent hover:text-foreground/70 dark:hover:text-accent/80 transition-colors font-medium flex items-center gap-1.5 bg-accent/10 dark:bg-accent/20 px-4 py-2 rounded-lg hover:bg-accent/20 dark:hover:bg-accent/30"
              >
                {showFullText ? (
                  <>
                    <span>Daha Az Göster</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  </>
                ) : (
                  <>
                    <span>Devamını Oku</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}