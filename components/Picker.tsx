"use client";

import { useEffect, useRef, useState } from "react";

type Option = { value: string; label: string };

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
  const ITEM_HEIGHT = 60;
  const PADDING_ITEMS = 2;

  useEffect(() => {
    if (!listRef.current || options.length === 0) return;
    const index = options.findIndex((o) => o.value === value);
    if (index >= 0) {
      listRef.current.scrollTop = index * ITEM_HEIGHT;
    }
  }, [value, options]);

  const handleScroll = () => {
    if (!listRef.current) return;
    const index = Math.round(listRef.current.scrollTop / ITEM_HEIGHT);
    const clamped = Math.max(0, Math.min(index, options.length - 1));
    if (options[clamped] && options[clamped].value !== value) {
      onChange(options[clamped].value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!listRef.current || options.length === 0) return;
    const index = options.findIndex((o) => o.value === value);
    let nextIndex = index;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      nextIndex = Math.min(index + 1, options.length - 1);
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      nextIndex = Math.max(index - 1, 0);
    }
    if (nextIndex !== index) {
      onChange(options[nextIndex].value);
      listRef.current.scrollTop = nextIndex * ITEM_HEIGHT;
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
      <label className="picker-label">{label}</label>
      <div className="picker-mask">
        <ul
          ref={listRef}
          className="picker"
          role="listbox"
          aria-label={label}
          tabIndex={0}
          onScroll={handleScroll}
          onKeyDown={handleKeyDown}
          style={{
            paddingTop: `${PADDING_ITEMS * ITEM_HEIGHT}px`,
            paddingBottom: `${PADDING_ITEMS * ITEM_HEIGHT}px`,
          }}
        >
          {options.map((opt) => (
            <li
              key={opt.value}
              role="option"
              aria-selected={opt.value === value}
              className="picker-item"
              style={{ height: `${ITEM_HEIGHT}px` }}
              onClick={() => {
                onChange(opt.value);
                if (listRef.current) {
                  const idx = options.findIndex((o) => o.value === opt.value);
                  listRef.current.scrollTop = idx * ITEM_HEIGHT;
                }
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
