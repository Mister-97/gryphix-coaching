import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RevealAnimations from "@/components/RevealAnimations";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Testimonials | Gryphix Coaching & Development",
  description: "What clients say about coaching with Gryphix Coaching & Development.",
};

export default function TestimonialsPage() {
  return (
    <>
      <RevealAnimations />
      <Nav />
      <section className="testimonials" id="testimonials">
        <div className="testimonials-header"><span className="subtitle">Success Stories</span><h2>What Our Clients Say</h2></div>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="testimonial-stars">
              {[0,1,2,3,4].map((i) => (
                <svg key={i} viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              ))}
            </div>
            <p className="testimonial-text">What sets this coaching apart is the natural flow of the dialogue and the depth of the listening. You get an incredibly intelligent partner who uses logic and objective perspective to help you see things clearly. If you are looking for someone to just agree with you, look elsewhere. This is for people who want a coach who cares enough to be honest and call you on the things holding you back.</p>
            <div className="testimonial-author"><div className="testimonial-avatar">BC</div><div className="testimonial-info"><h5>Brian C.</h5><span>Sales Expert</span></div></div>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-stars">
              {[0,1,2,3,4].map((i) => (
                <svg key={i} viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              ))}
            </div>
            <p className="testimonial-text">My sessions were foundational for my growth. The insight I gained helped me build clarity, confidence, and trust in my own decision-making. Even years later, I still reach out to my coach for perspective. It continues to shape how I lead and move through life.</p>
            <div className="testimonial-author"><div className="testimonial-avatar">ED</div><div className="testimonial-info"><h5>Esin D.</h5><span>Artist &amp; Creative Entrepreneur</span></div></div>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-stars">
              {[0,1,2,3,4].map((i) => (
                <svg key={i} viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              ))}
            </div>
            <p className="testimonial-text">Served as an amazing sounding board and provided guidance to help me achieve my professional objectives.</p>
            <div className="testimonial-author"><div className="testimonial-avatar">TE</div><div className="testimonial-info"><h5>Taitia E.</h5><span>SVP Commercial Banking</span></div></div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
