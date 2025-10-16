/**
 * Index Page (Home)
 * 
 * Main landing page with all sections
 * 
 * @author Ahmed Erdem Kahraman
 * @date 2025
 */

import Hero from "@/components/site/Hero";
import LogosMarquee from "@/components/site/LogosMarquee";
import Stats from "@/components/site/Stats";
import ContactSection from "@/components/site/ContactSection";
import SkillsCard from "@/components/site/SkillsCard";
import ResumeCards from "@/components/site/ResumeCards";
import Collaboration from "@/components/site/Collaboration";

export default function Index() {
  return (
    <div className="space-y-10">
      <Hero />
      <section id="about">
        <SkillsCard />
      </section>
      <LogosMarquee />
      <Stats />
      <ResumeCards />
      <section id="collaboration">
        <Collaboration />
      </section>
      
      <section id="contact">
        <ContactSection />
      </section>
    </div>
  );
}
