"use client";

import { useRef, useState } from "react";
import { Photo } from "./ui";

export type GalleryPhoto = { src: string; alt: string };

export default function Gallery({
  label,
  photos,
}: {
  label: string;
  photos: GalleryPhoto[];
}) {
  const scroller = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const stepWidth = () => {
    const el = scroller.current;
    const first = el?.children[0] as HTMLElement | undefined;
    if (!first) return 1;
    return first.offsetWidth + 16;
  };

  const onScroll = () => {
    const el = scroller.current;
    if (!el) return;
    const i = Math.round(el.scrollLeft / stepWidth());
    setIndex(Math.max(0, Math.min(photos.length - 1, i)));
  };

  const goTo = (i: number) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollTo({ left: i * stepWidth(), behavior: "smooth" });
  };

  return (
    <div className="gallery-block">
      <div
        className="gallery"
        role="group"
        aria-label={`Photos of ${label}. Swipe sideways to see more.`}
        tabIndex={0}
        ref={scroller}
        onScroll={onScroll}
      >
        {photos.map((p, i) => (
          <Photo
            key={`${p.src}-${i}`}
            src={p.src}
            alt={p.alt}
            width={600}
            height={450}
            priority={i === 0}
          />
        ))}
      </div>
      <div className="gallery-dots" role="group" aria-label={`Choose a photo of ${label}`}>
        {photos.map((p, i) => (
          <button
            key={i}
            type="button"
            className={`dot ${i === index ? "is-active" : ""}`}
            aria-label={`Photo ${i + 1} of ${photos.length}`}
            aria-current={i === index}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
      <p className="meta gallery-hint">
        {`Swipe or scroll sideways, or tap a dot, to see all ${photos.length} photos.`}
      </p>
    </div>
  );
}
