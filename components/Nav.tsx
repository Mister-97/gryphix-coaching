"use client";

import { useEffect, useState } from "react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={scrolled ? "scrolled" : ""}>
      <a href="/" className="logo">Gryphix Coaching & Development</a>
      <ul className={`nav-links${menuOpen ? " active" : ""}`}>
        <li><a href="/about" onClick={() => setMenuOpen(false)}>About</a></li>
        <li><a href="/founder" onClick={() => setMenuOpen(false)}>Founder</a></li>
        <li><a href="/virtual-sessions" onClick={() => setMenuOpen(false)}>Virtual Sessions</a></li>
        <li><a href="/services" onClick={() => setMenuOpen(false)}>Services</a></li>
        <li><a href="/process" onClick={() => setMenuOpen(false)}>Process</a></li>
        <li><a href="/testimonials" onClick={() => setMenuOpen(false)}>Testimonials</a></li>
        <li><a href="/blog" onClick={() => setMenuOpen(false)}>Blog</a></li>
        <li>
          <a href="https://calendly.com/gryphixcoaching/30min" target="_blank" className="nav-cta" onClick={() => setMenuOpen(false)}>
            Book a Call
          </a>
        </li>
      </ul>
      <div className="menu-toggle" onClick={() => setMenuOpen((v) => !v)}>
        <span></span><span></span><span></span>
      </div>
    </nav>
  );
}
