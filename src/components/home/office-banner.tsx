import { PromoBanner } from "@/components/home/promo-banner";

export function OfficeBanner() {
  return (
    <PromoBanner
      id="office-banner"
      href="/collections/desktop-solutions"
      image="/images/officesection-banner.webp"
      imageAlt="Green and blue Deli office tools: hole punch, stapler, tape dispenser, tray and calculator"
      fallbackColor="#a8ec9c"
      kicker="Comprehensive Collection of"
      title="Office & Desktop Products"
      description={
        <>
          Deli end to end office collection offers everything for smoother
          <br className="hidden sm:inline" /> office operation – with modern
          looks and state of art features
        </>
      }
    />
  );
}
