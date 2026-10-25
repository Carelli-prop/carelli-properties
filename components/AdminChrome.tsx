"use client";

import { useEffect } from "react";

export default function AdminChrome() {
  useEffect(() => {
    document.body.classList.add("is-admin");
    return () => document.body.classList.remove("is-admin");
  }, []);

  return null;
}
