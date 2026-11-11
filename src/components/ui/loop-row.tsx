"use client";

import { useRef, useState, type CSSProperties, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { loopTrack, useLoopCarousel } from "@/hooks/use-loop-carousel";

/**
 * An endless, one-item-at-a-time carousel row.
 *
 * `visibleClassName` sets `--visible` (items per view) per breakpoint, e.g.
 * "[--visible:2] lg:[--visible:4]". `clones` must be at least the largest
 * `--visible` value. `arrowTop` is a CSS length for the arrows' vertical centre;
 * it may use `cqw` (row width) and `var(--visible)`.
 */
export function LoopRow<T>({
  items,
  label,
  renderItem,
  getKey,
  visibleClassName,
  clones,
  arrowTop,
  itemClassName = "px-2 sm:px-[15.5px]",
  slideMs = 500,
  autoplayMs,
}: {
  items: T[];
  label: string;
  renderItem: (item: T, opts: { isClone: boolean }) => ReactNode;
  getKey: (item: T) => string;
  visibleClassName: string;
  clones: number;
  arrowTop: string;
  itemClassName?: string;
  slideMs?: number;
  autoplayMs?: number;
}) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [touching, setTouching] = useState(false);
  const touchX = useRef<number | null>(null);
  const track = loopTrack(items, clones);
  const { pos, animate, go } = useLoopCarousel({
    count: items.length,
    clones,
    slideMs,
    autoplayMs,
    paused: hovered || focused || touching,
  });

  const arrowStyle: CSSProperties = { top: arrowTop };
  const arrowClass =
    "absolute hidden -translate-y-1/2 p-1 text-neutral-800 transition hover:text-neutral-950 sm:block";

  return (
    <div
      className={`relative [container-type:inline-size] ${visibleClassName}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      // Pause for keyboard users only; a mouse click on an arrow also focuses it.
      onFocus={(e) => setFocused(e.target.matches(":focus-visible"))}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false);
      }}
    >
      <div
        aria-roledescription="carousel"
        aria-label={label}
        className="touch-pan-y overflow-hidden"
        onTouchStart={(e) => {
          touchX.current = e.touches[0].clientX;
          setTouching(true);
        }}
        onTouchEnd={(e) => {
          const start = touchX.current;
          touchX.current = null;
          setTouching(false);
          if (start === null) return;
          const dx = e.changedTouches[0].clientX - start;
          if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
        }}
      >
        <ul
          className={`flex ${animate ? "transition-transform ease-in-out" : ""}`}
          style={{
            transform: `translateX(calc(${pos} * -100% / var(--visible)))`,
            transitionDuration: animate ? `${slideMs}ms` : undefined,
          }}
        >
          {track.map(({ item, isClone, key }) => (
            <li
              key={isClone ? key : getKey(item)}
              aria-hidden={isClone || undefined}
              className={`w-[calc(100%/var(--visible))] shrink-0 ${itemClassName}`}
            >
              {renderItem(item, { isClone })}
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        aria-label={`Previous ${label.toLowerCase()}`}
        onClick={() => go(-1)}
        style={arrowStyle}
        className={`${arrowClass} -left-3 sm:-left-[38px]`}
      >
        <ChevronLeft className="size-6" strokeWidth={1.5} />
      </button>
      <button
        type="button"
        aria-label={`Next ${label.toLowerCase()}`}
        onClick={() => go(1)}
        style={arrowStyle}
        className={`${arrowClass} -right-3 sm:-right-[38px]`}
      >
        <ChevronRight className="size-6" strokeWidth={1.5} />
      </button>
    </div>
  );
}
