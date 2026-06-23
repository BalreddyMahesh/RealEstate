import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Mail, Globe, Share2, MessageCircle, Briefcase, ArrowUp } from "lucide-react";
import toast from "react-hot-toast";
import styles from "./Footer.module.css";

const Footer = () => {
  const [showTop, setShowTop] = useState(false);
  const [email, setEmail] = useState("");
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  useEffect(() => {
    const handler = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) {
      toast.error("Please enter your email address.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    toast.success("Subscribed successfully! Welcome to DreamEstate.", { duration: 4000 });
    setEmail("");
  };

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.brand}>
            <Link to="/" className={styles.logo}>
              <div className={styles.logoIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M3 12L12 3L21 12V21H15V15H9V21H3V12Z" fill="white" fillOpacity="0.95" />
                  <rect x="10" y="15" width="4" height="6" fill="rgba(255,255,255,0.55)" />
                </svg>
              </div>
              <span>Dream<span>Estate</span></span>
            </Link>
            <p className={styles.tagline}>
              India's most trusted real estate platform. Find, buy, sell, and rent premium properties across 120+ cities.
            </p>
            <div className={styles.socials}>
              {[
                { icon: <Globe size={18} />, label: "Website" },
                { icon: <Share2 size={18} />, label: "Share" },
                { icon: <MessageCircle size={18} />, label: "Chat" },
                { icon: <Briefcase size={18} />, label: "LinkedIn" },
              ].map((s) => (
                <motion.a key={s.label} href="#" className={styles.socialBtn} aria-label={s.label} whileHover={{ y: -3 }}>
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h4 className={styles.colTitle}>Quick Links</h4>
            <ul className={styles.linkList}>
              {[
                { to: "/", label: "Home" },
                { to: "/listings", label: "Property Listings" },
                { to: "/agents", label: "Our Agents" },
                { to: "/contact", label: "Contact Us" },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className={styles.footerLink}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className={styles.colTitle}>Property Types</h4>
            <ul className={styles.linkList}>
              {["Apartments", "Villas", "Independent Houses", "Bungalows", "Penthouses", "Duplex Homes"].map((t) => (
                <li key={t}>
                  <Link to="/listings" className={styles.footerLink}>{t}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className={styles.colTitle}>Contact Info</h4>
            <ul className={styles.contactList}>
              <li>
                <MapPin size={16} className={styles.contactIcon} />
                <span>42 Marina Bay, Connaught Place, New Delhi 110001</span>
              </li>
              <li>
                <Phone size={16} className={styles.contactIcon} />
                <a href="tel:+911234567890">+91 12345 67890</a>
              </li>
              <li>
                <Mail size={16} className={styles.contactIcon} />
                <a href="mailto:hello@dreamestate.in">hello@dreamestate.in</a>
              </li>
            </ul>
            <div className={styles.newsletter}>
              <p className={styles.nlLabel}>Subscribe to updates</p>
              <form className={styles.nlRow} onSubmit={handleSubscribe} noValidate>
                <input
                  className={styles.nlInput}
                  placeholder="Your email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" className={styles.nlBtn}>Subscribe</button>
              </form>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>© {new Date().getFullYear()} DreamEstate. All rights reserved.</p>
          <div className={styles.bottomLinks}>
            <Link to="/privacy-policy" className={styles.bottomLink}>Privacy Policy</Link>
            <Link to="/terms-of-service" className={styles.bottomLink}>Terms of Service</Link>
            <Link to="/sitemap" className={styles.bottomLink}>Sitemap</Link>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showTop && (
          <motion.button
            className={styles.backToTop}
            onClick={scrollTop}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Back to top"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;
