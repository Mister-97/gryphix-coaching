import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Virtual Sessions | Gryphix Coaching & Development",
  description: "Professional coaching, right from your home. See how Gryphix Coaching's virtual sessions work.",
};

export default function VirtualSessionsPage() {
  return (
    <>
      <Nav />
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
            <div className="virtual-benefit"><span className="number">02</span><div><h4>Your Comfortable Space</h4><p>Open up more easily from the comfort of your own home or office. No commute, no waiting rooms, just transformation.</p></div></div>
            <div className="virtual-benefit"><span className="number">03</span><div><h4>Global Accessibility</h4><p>Connect from anywhere in the world. Whether you&apos;re at home, traveling, or relocated, your coaching continues seamlessly.</p></div></div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
