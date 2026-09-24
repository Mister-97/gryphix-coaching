import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RevealAnimations from "@/components/RevealAnimations";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Process | Gryphix Coaching & Development",
  description: "Four steps to transformation: discovery call, custom plan, virtual sessions, and lasting change.",
};

export default function ProcessPage() {
  return (
    <>
      <RevealAnimations />
      <Nav />
      <section className="process" id="process">
        <div className="process-header"><span className="subtitle">Your Journey</span><h2>Four Steps to Transformation</h2></div>
        <div className="process-steps">
          <div className="process-step"><div className="step-number">1</div><h4>Discovery Call</h4><p>A free 20-minute video call to understand your goals and see if we&apos;re the right fit.</p></div>
          <div className="process-step"><div className="step-number">2</div><h4>Custom Plan</h4><p>We create a personalized coaching program tailored to your unique situation and aspirations.</p></div>
          <div className="process-step"><div className="step-number">3</div><h4>Virtual Sessions</h4><p>Regular one-on-one video sessions where real transformation happens through guided conversations.</p></div>
          <div className="process-step"><div className="step-number">4</div><h4>Lasting Change</h4><p>Ongoing support and accountability to ensure your growth continues long after our work together.</p></div>
        </div>
      </section>
      <Footer />
    </>
  );
}
