"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type LoopItem<T> = { item: T; index: number; isClone: boolean; key: string };

/**
 * Builds the rendered track for an endless carousel: `clones` copies of the
 * last items, then every item, then `clones` copies of the first items.
 */
export function loopTrack<T>(items: T[], clones: number): LoopItem<T>[] {
  const n = items.length;
  return Array.from({ length: n + clones * 2 }, (_, t) => {
    const index = (((t - clones) % n) + n) % n;
    const isClone = t < clones || t >= clones + n;
    return { item: items[index], index, isClone, key: isClone ? `clone-${t}` : `item-${index}` };
  });
}

/**
 * Endless carousel state. Moving past either end animates onto a clone, then
 * jumps (without animation) to the matching real position, so the carousel
 * always keeps moving in the chosen direction instead of rewinding.
 */
export function useLoopCarousel({
  count,
  clones,
  slideMs,
  autoplayMs,
  paused = false,
}: {
  count: number;
  clones: number;
  slideMs: number;
  autoplayMs?: number;
  paused?: boolean;
}) {
  const [pos, setPos] = useState(clones);
  const [animate, setAnimate] = useState(true);
  const busy = useRef(false);
  const settleTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const current = (((pos - clones) % count) + count) % count;

  const go = useCallback(
    (dir: 1 | -1) => {
      if (busy.current) return;
      busy.current = true;
      setAnimate(true);
      setPos((p) => p + dir);
      // A timer rather than transitionend, which may never fire in a background tab.
      settleTimer.current = setTimeout(() => {
        setPos((p) => {
          if (p >= clones + count) return p - count;
          if (p < clones) return p + count;
          return p;
        });
        setAnimate(false);
        busy.current = false;
      }, slideMs);
    },
    [clones, count, slideMs],
  );

  useEffect(() => () => clearTimeout(settleTimer.current), []);

  useEffect(() => {
    if (!autoplayMs || paused) return;
    const id = setInterval(() => go(1), autoplayMs);
    return () => clearInterval(id);
  }, [autoplayMs, paused, go, current]);

  return { pos, animate, current, go };
}
