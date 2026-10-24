"use client";

import { useEffect, useRef } from "react";

type Option = { value: string; label: string };

const ITEM_HEIGHT = 60;
const VIEW_HEIGHT = 240;
const PAD = (VIEW_HEIGHT - ITEM_HEIGHT) / 2;

function prefersReduced(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export default function Picker({
  label,
  options,
  value,
  onChange,
  emptyMessage = "None available",
}: {
  label: string;
  options: Option[];
  value: string;
  onChange: (val: string) => void;
  emptyMessage?: string;
}) {
  const listRef = useRef<HTMLUListElement>(null);
  const valueRef = useRef(value);
  const settleTimer = useRef<number | null>(null);
  const programmatic = useRef(false);

  valueRef.current = value;

  const selectedIndex = options.findIndex((o) => o.value === value);

  const paint = () => {
    const list = listRef.current;
    if (!list || options.length === 0) return;
    const centre = Math.max(
      0,
      Math.min(options.length - 1, Math.round(list.scrollTop / ITEM_HEIGHT))
    );
    Array.from(list.children).forEach((child, i) => {
      child.setAttribute("aria-selected", i === centre ? "true" : "false");
    });
  };

  const scrollToIndex = (i: number) => {
    const list = listRef.current;
    if (!list) return;
    programmatic.current = true;
    list.scrollTo({
      top: i * ITEM_HEIGHT,
      behavior: prefersReduced() ? "instant" : "smooth",
    });
    paint();
    window.setTimeout(() => {
      programmatic.current = false;
    }, prefersReduced() ? 0 : 350);
  };

  useEffect(() => {
    const list = listRef.current;
    if (!list || options.length === 0) return;
    const i = options.findIndex((o) => o.value === valueRef.current);
    if (i < 0) return;
    const target = i * ITEM_HEIGHT;
    if (Math.abs(list.scrollTop - target) > 1) {
      programmatic.current = true;
      list.scrollTo({ top: target, behavior: "instant" });
      paint();
      window.setTimeout(() => {
        programmatic.current = false;
      }, 0);
    }
  }, [value, options]);

  const handleScroll = () => {
    paint();
    if (programmatic.current) return;
    if (settleTimer.current) window.clearTimeout(settleTimer.current);
    settleTimer.current = window.setTimeout(() => {
      const list = listRef.current;
      if (!list || options.length === 0) return;
      const i = Math.max(
        0,
        Math.min(options.length - 1, Math.round(list.scrollTop / ITEM_HEIGHT))
      );
      const next = options[i];
      if (next && next.value !== valueRef.current) onChange(next.value);
    }, 90);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (options.length === 0) return;
    const i = options.findIndex((o) => o.value === valueRef.current);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.min(i + 1, options.length - 1);
      onChange(options[next].value);
      scrollToIndex(next);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.max(i - 1, 0);
      onChange(options[next].value);
      scrollToIndex(next);
    } else if (e.key === "Home") {
      e.preventDefault();
      onChange(options[0].value);
      scrollToIndex(0);
    } else if (e.key === "End") {
      e.preventDefault();
      const last = options.length - 1;
      onChange(options[last].value);
      scrollToIndex(last);
    }
  };

  if (options.length === 0) {
    return (
      <div className="picker-empty">
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="picker-wrapper">
      <span className="picker-label">{label}</span>
      <div className="picker-mask">
        <ul
          ref={listRef}
          className="picker"
          role="listbox"
          aria-label={label}
          tabIndex={0}
          onScroll={handleScroll}
          onKeyDown={handleKeyDown}
          style={{ paddingTop: `${PAD}px`, paddingBottom: `${PAD}px` }}
        >
          {options.map((opt, i) => (
            <li
              key={opt.value}
              role="option"
              aria-selected={i === selectedIndex}
              className="picker-item"
              style={{ height: `${ITEM_HEIGHT}px` }}
              onClick={() => {
                onChange(opt.value);
                scrollToIndex(i);
              }}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
