import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Building2, Phone, User, Menu, X } from "lucide-react";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import Button from "../Button/Button";
import styles from "./Navbar.module.css";

const navLinks = [
  { label: "Home", path: "/", icon: <Home size={16} /> },
  { label: "Listings", path: "/listings", icon: <Building2 size={16} /> },
  { label: "Agents", path: "/agents", icon: <User size={16} /> },
  { label: "Contact", path: "/contact", icon: <Phone size={16} /> },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <motion.nav
      className={`${styles.navbar} ${scrolled || !isHome ? styles.scrolled : ""}`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={styles.logo}>
          <div className={styles.logoIcon}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M3 12L12 3L21 12V21H15V15H9V21H3V12Z" fill="white" fillOpacity="0.95" />
              <rect x="10" y="15" width="4" height="6" fill="rgba(255,255,255,0.6)" />
              <path d="M12 3L21 12" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
            </svg>
          </div>
          <span className={styles.logoText}>
            Dream<span>Estate</span>
          </span>
        </Link>

        <ul className={styles.navLinks}>
          {navLinks.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                end={link.path === "/"}
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.active : ""}`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className={styles.actions}>
          <ThemeToggle />
          <Link to="/listings">
            <Button variant="primary" size="sm">
              Browse Properties
            </Button>
          </Link>
          <button
            className={styles.hamburger}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.mobileInner}>
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <NavLink
                    to={link.path}
                    end={link.path === "/"}
                    className={({ isActive }) =>
                      `${styles.mobileLink} ${isActive ? styles.active : ""}`
                    }
                  >
                    {link.icon}
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
              <div className={styles.mobileTheme}>
                <span>Theme</span>
                <ThemeToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
