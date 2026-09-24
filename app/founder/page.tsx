import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Founder | Gryphix Coaching & Development",
  description: "Meet Will, the founder of Gryphix Coaching & Development, and the story behind why he coaches.",
};

export default function FounderPage() {
  return (
    <>
      <Nav />
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
          <div className="founder-quote">
            <h4>Why I Coach</h4>
            <p>If I had experienced the benefits of coaching earlier in my career, I believe I would have grown faster, made better decisions, and navigated challenges with greater confidence and intention. That&apos;s why I&apos;m passionate about helping others accelerate their growth, gain clarity, and reach their potential. Coaching isn&apos;t about having someone give you the answers. It&apos;s about having a partner who helps you discover the right questions, challenge limiting beliefs, and move forward with purpose.</p>
            <p>This is the work that inspires me every day.</p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
