"use client";

import { useEffect, useRef } from "react";

export default function CursorEffect() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const onMove = (e: MouseEvent) => {
      cursor.style.left = e.clientX - 10 + "px";
      cursor.style.top = e.clientY - 10 + "px";
    };
    document.addEventListener("mousemove", onMove);

    // Delegated instead of per-element listeners, so it keeps working on
    // dynamically rendered content (blog list, admin) without re-attaching.
    const onOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement)?.closest("a, button")) cursor.classList.add("hover");
    };
    const onOut = (e: MouseEvent) => {
      if ((e.target as HTMLElement)?.closest("a, button")) cursor.classList.remove("hover");
    };
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  return <div className="cursor" ref={cursorRef}></div>;
}
