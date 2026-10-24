"use client";

import { useEffect } from "react";

export default function ButtonFeel() {
  useEffect(() => {
    const onPointer = (e: PointerEvent) => {
      const target = (e.target as HTMLElement).closest(
        "a.btn, button.btn, button.choice-btn"
      ) as HTMLElement | null;
      if (!target || target.hasAttribute("disabled")) return;
      target.classList.remove("btn-attention");
      void target.offsetWidth;
      target.classList.add("btn-attention");
      window.setTimeout(() => target.classList.remove("btn-attention"), 950);
    };
    window.addEventListener("pointerdown", onPointer);
    return () => window.removeEventListener("pointerdown", onPointer);
  }, []);

  return null;
}
