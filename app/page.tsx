import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RevealAnimations from "@/components/RevealAnimations";

export default function Home() {
  return (
    <>
      <RevealAnimations />
      <Nav />
      <section className="hero">
        <div className="hero-bg-shape"></div>
        <div className="hero-content">
          <div className="hero-badge"><span className="dot"></span>Virtual Coaching Sessions Available</div>
          <h1>Transform Your Life <span className="accent">From Anywhere</span></h1>
          <p>Connect with expert life coaching through personalized virtual sessions. Unlock your potential, overcome obstacles, and create the life you&apos;ve always envisioned.</p>
          <div className="hero-buttons">
            <a href="https://calendly.com/gryphixcoaching/30min" target="_blank" className="btn-primary">
              Start Your Journey
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a href="/about" className="btn-secondary">Learn More</a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-image-container">
            <div className="hero-image"></div>
            <div className="floating-card card-1">
              <div className="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 10l5 5-5 5"/><path d="M4 4v7a4 4 0 004 4h12"/></svg></div>
              <div className="text"><strong>Live Video Sessions</strong><span>Face-to-face coaching</span></div>
            </div>
            <div className="floating-card card-2">
              <div className="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg></div>
              <div className="text"><strong>Flexible Scheduling</strong><span>Book your time</span></div>
            </div>
            <div className="floating-card card-3">
              <div className="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg></div>
              <div className="text"><strong>Proven Results</strong><span>98% satisfaction</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-bar">
        <div className="stat-item"><div className="stat-number">98%</div><div className="stat-label">Client Satisfaction</div></div>
        <div className="stat-item"><div className="stat-number">10+</div><div className="stat-label">Years Experience</div></div>
        <div className="stat-item"><div className="stat-number">Elite</div><div className="stat-label">Executive Clientele</div></div>
        <div className="stat-item"><div className="stat-number">Pro</div><div className="stat-label">Guest Speaker</div></div>
      </section>

      <section className="cta">
        <div className="cta-content">
          <div className="cta-badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>
            Free Discovery Session
          </div>
          <h2>Ready to Start Your Transformation?</h2>
          <p>Book your complimentary 20-minute discovery call today. No pressure, just a conversation about your goals and how we can help you achieve them.</p>
          <a href="https://calendly.com/gryphixcoaching/30min" target="_blank" className="btn-primary">
            Book Your Free Call
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}
