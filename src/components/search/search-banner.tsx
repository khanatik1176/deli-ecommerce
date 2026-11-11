import { PageBanner } from "@/components/layout/page-banner";

export function SearchBanner({ title }: { title: string }) {
  return <PageBanner title={title} crumb="Search" uppercase />;
}
