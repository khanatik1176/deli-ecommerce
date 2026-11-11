import Link from "next/link";
import { ChevronRight } from "lucide-react";

/** Dark full-width page header with a title and, by default, a Home › Page breadcrumb. */
export function PageBanner({
  title,
  crumb,
  kicker,
  image,
  uppercase = false,
  align = "center",
  className = "h-[220px] sm:h-[325px]",
  titleClassName = "",
}: {
  title: string;
  /** Current page name shown after "Home". Omit to hide the breadcrumb. */
  crumb?: string;
  /** Small red line shown above the title. */
  kicker?: string;
  /** Background photo under /public; a dark gradient is used without one. */
  image?: string;
  uppercase?: boolean;
  align?: "center" | "left";
  /** Height classes. */
  className?: string;
  /** Extra title classes, e.g. a max width to control wrapping. */
  titleClassName?: string;
}) {
  const left = align === "left";
  return (
    <section
      className={`relative flex items-center overflow-hidden bg-[#3a3a3a] bg-cover bg-center text-white ${
        left ? "" : "justify-center px-4 text-center"
      } ${className}`}
      style={image ? { backgroundImage: `url(${image})` } : undefined}
    >
      <div
        aria-hidden="true"
        className={
          image
            ? "absolute inset-0 bg-black/55"
            : "absolute inset-0 bg-[radial-gradient(ellipse_at_center,#5a5a5a_0%,#3a3a3a_55%,#262626_100%)]"
        }
      />
      <div
        className={
          left
            ? "relative mx-auto w-full max-w-[1750px] px-4 sm:px-[50px]"
            : "relative"
        }
      >
        <div className={left ? "sm:px-[19px]" : ""}>
          {kicker && (
            <p className="mb-3 text-[16px] font-medium text-[#ff4d5e] sm:mb-5 sm:text-[22px]">
              {kicker}
            </p>
          )}
          <h1
            className={` ml-10 text-[30px] font-bold leading-tight tracking-[-0.03em] sm:text-[42px] ${
              uppercase ? "uppercase" : ""
            } ${titleClassName}`}
          >
            {title}
          </h1>
          {crumb && (
            <nav aria-label="Breadcrumb" className="mt-3 sm:mt-4">
              <ol className="flex items-center justify-center gap-1.5 text-[16px] font-semibold sm:text-[18px]">
                <li>
                  <Link href="/" className="hover:underline">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">
                  <ChevronRight className="size-4" strokeWidth={1.75} />
                </li>
                <li aria-current="page">{crumb}</li>
              </ol>
            </nav>
          )}
        </div>
      </div>
    </section>
  );
}
