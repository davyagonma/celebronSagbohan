import { SponsorBar } from "./components/SponsorBar";
import { Hero } from "./components/Hero";
import { Nav } from "./components/Nav";
import { BioSection } from "./components/BioSection";
import { MomentsSection } from "./components/MomentsSection";
import { DiscographySection } from "./components/DiscographySection";
import { PalmaresSection } from "./components/PalmaresSection";
import { GallerySection } from "./components/GallerySection";
import { SourcesSection } from "./components/SourcesSection";
import { BadgeGeneratorSection } from "./components/BadgeGeneratorSection";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-[100dvh] bg-stage-black text-ink">
      <SponsorBar />
      <Hero />
      <Nav />
      <main>
        <BioSection />
        <MomentsSection />
        <DiscographySection />
        <PalmaresSection />
        <GallerySection />
        <BadgeGeneratorSection />
        <SourcesSection />
      </main>
      <Footer />
    </div>
  );
}
