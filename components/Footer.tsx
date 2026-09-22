export default function Footer() {
  return (
    <footer>
      <div className="footer-grid">
        <div className="footer-brand">
          <a href="/" className="logo">Gryphix Coaching & Development</a>
          <p>Transforming lives through personalized virtual coaching. Connect from anywhere, achieve everywhere.</p>
          <div className="footer-social">
            <a href="https://www.instagram.com/gryphixcoaching/" target="_blank" rel="noopener" aria-label="Instagram">
              <svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" fill="none" stroke="currentColor" strokeWidth="2"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="currentColor" strokeWidth="2"/></svg>
            </a>
            <a href="https://bsky.app/profile/gryphix.bsky.social" target="_blank" rel="noopener" aria-label="Bluesky">
              <svg viewBox="0 0 24 24"><path d="M12 10.8C10.7 8 6.4 4.8 3.5 4c-1-0.2-1.5 0.3-1.5 1.2 0 1.5 0.3 8 0.6 9 0.5 1.8 2.5 2.4 4 2.2-3 0.5-5.5 1.7-2 3.5 3.7 2 5.7-1 6.4-2.2 0.7 1.2 2.7 4.2 6.4 2.2 3.5-1.8 1-3-2-3.5 1.5 0.2 3.5-0.4 4-2.2 0.3-1 0.6-7.5 0.6-9 0-0.9-0.5-1.4-1.5-1.2C17.6 4.8 13.3 8 12 10.8z"/></svg>
            </a>
            <a href="https://www.youtube.com/@Gryphixllc" target="_blank" rel="noopener" aria-label="YouTube">
              <svg viewBox="0 0 24 24"><path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 00.5 6.2 31 31 0 000 12a31 31 0 00.5 5.8 3 3 0 002.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 002.1-2.1A31 31 0 0024 12a31 31 0 00-.5-5.8zM9.6 15.6V8.4L15.8 12z"/></svg>
            </a>
            <a href="https://www.linkedin.com/in/will-m-671970416/" target="_blank" rel="noopener" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
          </div>
        </div>
        <div className="footer-column">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/#about">About</a></li>
            <li><a href="/#founder">Founder</a></li>
            <li><a href="/#virtual">Virtual Sessions</a></li>
            <li><a href="/#services">Services</a></li>
            <li><a href="/#testimonials">Testimonials</a></li>
            <li><a href="/blog">Blog</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Services</h4>
          <ul>
            <li><a href="/#services">Retail Coaching</a></li>
            <li><a href="/#services">Career Coaching</a></li>
            <li><a href="/#services">Leadership Development</a></li>
            <li><a href="/#services">Executive Coaching</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Contact</h4>
          <ul>
            <li><a href="mailto:Will@gryphixllc.com">Will@gryphixllc.com</a></li>
            <li><a href="https://calendly.com/gryphixcoaching/30min" target="_blank">Book a Free Call</a></li>
            <li><a href="/blog">Blog</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 Gryphix Coaching & Development. All rights reserved.</p>
        <p>Privacy Policy | Terms of Service | <a href="/admin/login">Admin Portal</a></p>
      </div>
    </footer>
  );
}
