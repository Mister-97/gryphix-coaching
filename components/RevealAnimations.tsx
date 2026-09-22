"use client";

import { useEffect } from "react";

// Scroll-reveal for cards/steps + the animated stat counters in the stats bar.
// Scoped to the homepage only (these selectors don't exist on other pages).
export default function RevealAnimations() {
  useEffect(() => {
    const revealEls = document.querySelectorAll(
      ".service-card, .process-step, .testimonial-card, .about-feature"
    );
    revealEls.forEach((el) => {
      const e = el as HTMLElement;
      e.style.opacity = "0";
      e.style.transform = "translateY(30px)";
      e.style.transition = "all 0.6s ease";
    });
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const e = entry.target as HTMLElement;
            e.style.opacity = "1";
            e.style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    revealEls.forEach((el) => revealObserver.observe(el));

    const statsBar = document.querySelector(".stats-bar");
    const animateCounters = () => {
      document.querySelectorAll(".stat-number").forEach((counterEl) => {
        const el = counterEl as HTMLElement;
        const text = el.innerText;
        const target = parseInt(text, 10);
        if (isNaN(target)) return;
        const suffix = text.replace(/[0-9]/g, "");
        let count = 0;
        const increment = target / 50;
        const update = () => {
          if (count < target) {
            count += increment;
            el.innerText = Math.ceil(count) + suffix;
            requestAnimationFrame(update);
          } else {
            el.innerText = target + suffix;
          }
        };
        update();
      });
    };
    let statsObserver: IntersectionObserver | null = null;
    if (statsBar) {
      statsObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animateCounters();
              statsObserver?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.5 }
      );
      statsObserver.observe(statsBar);
    }

    return () => {
      revealObserver.disconnect();
      statsObserver?.disconnect();
    };
  }, []);

  return null;
}
