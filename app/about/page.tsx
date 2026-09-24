import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RevealAnimations from "@/components/RevealAnimations";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Gryphix Coaching & Development",
  description: "Learn how Gryphix Coaching & Development helps you bridge the gap between where you are and where you want to be.",
};

export default function AboutPage() {
  return (
    <>
      <RevealAnimations />
      <Nav />
      <section className="about" id="about">
        <div className="about-image">
          <div className="about-image-main"></div>
          <div className="about-accent"></div>
          <div className="experience-badge"><div className="years">10+</div><span>Years of Impact</span></div>
        </div>
        <div className="about-content">
          <span className="subtitle">About Gryphix Coaching & Development</span>
          <h2>Your Partner in Personal Transformation</h2>
          <p>At Gryphix Coaching & Development, we believe everyone has the power to create extraordinary change in their lives. Through personalized virtual coaching sessions, we help you bridge the gap between where you are and where you want to be.</p>
          <p>Our approach combines proven coaching methodologies with genuine human connection, all delivered through the convenience of online sessions that fit your schedule.</p>
          <p className="inclusive-statement">This is an inclusive space where all are welcome.</p>
          <div className="about-features">
            <div className="about-feature">
              <div className="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg></div>
              <div><h4>Personalized Approach</h4><p>Tailored strategies for your unique journey</p></div>
            </div>
            <div className="about-feature">
              <div className="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg></div>
              <div><h4>Flexible Sessions</h4><p>Virtual meetings that fit your life</p></div>
            </div>
            <div className="about-feature">
              <div className="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div>
              <div><h4>Safe Space</h4><p>Confidential and judgment-free</p></div>
            </div>
            <div className="about-feature">
              <div className="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg></div>
              <div><h4>Measurable Growth</h4><p>Track your progress every step</p></div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
