import { PromoBanner } from "@/components/home/promo-banner";

export function SchoolBanner() {
  return (
    <PromoBanner
      id="school-banner"
      href="/collections/school-stationery"
      image="/images/schoolsection.webp"
      imageAlt="Pastel Macaron school stationery: pencils, ruler, pencil cases and erasers"
      fallbackColor="#f8d8cf"
      kicker="Explore the exclusive"
      title="School Stationery Collection"
      description={
        <>
          from writing to coloring, everything you need for the kids are here.
          <br />
          Safe, beautiful and affordable
        </>
      }
    />
  );
}
