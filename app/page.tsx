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
            <a href="#about" className="btn-secondary">Learn More</a>
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

      <section className="founder" id="founder">
        <div className="founder-content">
          <span className="subtitle">Meet the Founder</span>
          <h2>About Me</h2>
          <div className="founder-image">
            <div className="founder-photo">
              <div className="founder-image-main"></div>
              <div className="founder-accent"></div>
              <div className="founder-badge"><div className="years">25+</div><span>Years Leading Teams</span></div>
            </div>
            <div className="founder-quote">
              <h4>Why I Coach</h4>
              <p>If I had experienced the benefits of coaching earlier in my career, I believe I would have grown faster, made better decisions, and navigated challenges with greater confidence and intention. That&apos;s why I&apos;m passionate about helping others accelerate their growth, gain clarity, and reach their potential. Coaching isn&apos;t about having someone give you the answers. It&apos;s about having a partner who helps you discover the right questions, challenge limiting beliefs, and move forward with purpose.</p>
              <p>This is the work that inspires me every day.</p>
            </div>
          </div>
          <p>Gryphix Coaching was founded on a simple realization: coaching has the power to change the trajectory of a person&apos;s career and life.</p>
          <p>Throughout my career, I was fortunate to work with leaders who challenged me, supported me, and helped me see potential in myself that I couldn&apos;t always see on my own. Looking back, I often wonder how much faster I could have grown and how much more intentional my career journey could have been if I had access to coaching earlier.</p>
          <p>That realization became the foundation for Gryphix Coaching.</p>
          <p>For more than 25 years, I&apos;ve led teams, developed leaders, and navigated the challenges that come with growing careers, driving performance, and balancing the demands of leadership. I&apos;ve seen talented people struggle not because they lacked ability, but because they lacked a trusted partner to help them think differently, build confidence, and unlock their full potential.</p>
          <p>Today, my mission is to be that partner for others.</p>
          <p>Through coaching, I help leaders increase self-awareness, strengthen communication, navigate challenges with confidence, and lead with greater purpose and intention. Whether you&apos;re stepping into your first leadership role, preparing for your next opportunity, or looking to become a more effective leader, coaching provides the space to reflect, grow, and take meaningful action.</p>
          <p>I believe that leadership is a skill that can be developed, not a trait reserved for a select few. When people invest in their growth, they not only improve their own performance, they positively impact their teams, organizations, and communities.</p>
          <p>My goal is simple: help people become the leaders they aspire to be, faster and with greater clarity than they could on their own.</p>
          <p className="closing-line">Because every great leader deserves someone in their corner.</p>
        </div>
      </section>

      <section className="virtual" id="virtual">
        <div className="virtual-header">
          <span className="subtitle">How It Works</span>
          <h2>Professional Coaching, Right From Your Home</h2>
          <p>Experience the power of face-to-face coaching from the environment that you feel most at ease.</p>
        </div>
        <div className="virtual-showcase">
          <div className="virtual-image"><div className="laptop-frame"><div className="laptop-screen"></div><div className="laptop-base"></div></div></div>
          <div className="virtual-benefits">
            <div className="virtual-benefit"><span className="number">01</span><div><h4>Crystal Clear Video Calls</h4><p>HD video conferencing that makes you feel like you&apos;re in the same room. See facial expressions, body language, and connect deeply.</p></div></div>
            <div className="virtual-benefit"><span className="number">02</span><div><h4>Your Comfortable Space</h4><p>Open up more easily from the comfort of your own home or office. No commute, no waiting rooms&mdash;just transformation.</p></div></div>
            <div className="virtual-benefit"><span className="number">03</span><div><h4>Global Accessibility</h4><p>Connect from anywhere in the world. Whether you&apos;re at home, traveling, or relocated&mdash;your coaching continues seamlessly.</p></div></div>
          </div>
        </div>
      </section>

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

      <section className="process" id="process">
        <div className="process-header"><span className="subtitle">Your Journey</span><h2>Four Steps to Transformation</h2></div>
        <div className="process-steps">
          <div className="process-step"><div className="step-number">1</div><h4>Discovery Call</h4><p>A free 20-minute video call to understand your goals and see if we&apos;re the right fit.</p></div>
          <div className="process-step"><div className="step-number">2</div><h4>Custom Plan</h4><p>We create a personalized coaching program tailored to your unique situation and aspirations.</p></div>
          <div className="process-step"><div className="step-number">3</div><h4>Virtual Sessions</h4><p>Regular one-on-one video sessions where real transformation happens through guided conversations.</p></div>
          <div className="process-step"><div className="step-number">4</div><h4>Lasting Change</h4><p>Ongoing support and accountability to ensure your growth continues long after our work together.</p></div>
        </div>
      </section>

      <section className="testimonials" id="testimonials">
        <div className="testimonials-header"><span className="subtitle">Success Stories</span><h2>What Our Clients Say</h2></div>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="testimonial-stars">
              {[0,1,2,3,4].map((i) => (
                <svg key={i} viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              ))}
            </div>
            <p className="testimonial-text">What sets this coaching apart is the natural flow of the dialogue and the depth of the listening. You get an incredibly intelligent partner who uses logic and objective perspective to help you see things clearly. If you are looking for someone to just agree with you, look elsewhere&mdash;this is for people who want a coach who cares enough to be honest and call you on the things holding you back.</p>
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
