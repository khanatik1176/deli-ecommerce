import { BallPens } from "@/components/home/ball-pens";
import { Bestsellers } from "@/components/home/bestsellers";
import { BusinessPens } from "@/components/home/business-pens";
import { Calculators } from "@/components/home/calculators";
import { CategoryCarousel } from "@/components/home/category-carousel";
import { ColoringProducts } from "@/components/home/coloring-products";
import { DesktopSolutions } from "@/components/home/desktop-solutions";
import { ErasersSharpeners } from "@/components/home/erasers-sharpeners";
import { GraphitePencils } from "@/components/home/graphite-pencils";
import { HeroSlider } from "@/components/home/hero-slider";
import { KidsFavorites } from "@/components/home/kids-favorites";
import { MarkersHighlighters } from "@/components/home/markers-highlighters";
import { OfficeBanner } from "@/components/home/office-banner";
import { OfficeConsumables } from "@/components/home/office-consumables";
import { SchoolBanner } from "@/components/home/school-banner";
import { ScientificCalculators } from "@/components/home/scientific-calculators";
import { Showcase } from "@/components/home/showcase";
import { SectionDivider } from "@/components/ui/section-divider";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <HeroSlider />
      <CategoryCarousel />
      <Bestsellers />
      <Showcase />
      <SectionDivider />
      <ScientificCalculators />
      <Calculators />
      <SectionDivider />
      <KidsFavorites />
      <SchoolBanner />
      <BallPens />
      <GraphitePencils />
      <ColoringProducts />
      <ErasersSharpeners />
      <OfficeBanner />
      <DesktopSolutions />
      <BusinessPens />
      <OfficeConsumables />
      <MarkersHighlighters />
      <BallPens id="ball-pens-2" />
    </main>
  );
}
