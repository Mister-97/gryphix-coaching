import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RevealAnimations from "@/components/RevealAnimations";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | Gryphix Coaching & Development",
  description: "Coaching programs designed for you: retail coaching, career advancement, and leadership development.",
};

export default function ServicesPage() {
  return (
    <>
      <RevealAnimations />
      <Nav />
      <section className="services" id="services">
        <div className="services-header"><span className="subtitle">What We Offer</span><h2>Coaching Programs Designed for You</h2></div>
        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg></div>
            <h3>Retail Coaching</h3>
            <p>Three decades in retail leadership, applied to your team. Coaching built specifically for the pace, pressure, and people challenges of the retail floor.</p>
            <a href="https://calendly.com/gryphixcoaching/30min" target="_blank" className="service-link">Get Started<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
          </div>
          <div className="service-card">
            <div className="service-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></svg></div>
            <h3>Career Advancement</h3>
            <p>Navigate career transitions, develop leadership skills, and create a professional life aligned with your values and goals.</p>
            <a href="https://calendly.com/gryphixcoaching/30min" target="_blank" className="service-link">Get Started<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
          </div>
          <div className="service-card">
            <div className="service-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg></div>
            <h3>Leadership Development</h3>
            <p>Build your leadership capacity through individual or group coaching sessions. Work through proven frameworks and apply lessons to your unique circumstances.</p>
            <a href="https://calendly.com/gryphixcoaching/30min" target="_blank" className="service-link">Get Started<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
