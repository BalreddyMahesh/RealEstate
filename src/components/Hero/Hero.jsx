import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Play,
  TrendingUp,
  Users,
  MapPin,
  UserCheck,
} from "lucide-react";
import SearchBar from "../SearchBar/SearchBar";
import styles from "./Hero.module.css";

const stats = [
  { value: "50K+", label: "Properties", icon: <TrendingUp size={20} /> },
  { value: "15K+", label: "Happy Clients", icon: <Users size={20} /> },
  { value: "120", label: "Cities", icon: <MapPin size={20} /> },
  { value: "300+", label: "Expert Agents", icon: <UserCheck size={20} /> },
];

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.bg}>
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80"
          alt="Luxury home"
          className={styles.bgImg}
        />
        <div className={styles.overlay} />
      </div>

      <div className={`container ${styles.content}`}>
        <motion.div
          className={styles.badge}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <span className={styles.badgeDot} />
          India's #1 Real Estate Platform
        </motion.div>

        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          Find Your <span className={styles.highlight}>Dream</span>
          <br />
          Property Today
        </motion.h1>

        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          Discover thousands of premium properties across India. Buy, sell, or
          rent with confidence using our trusted platform.
        </motion.p>

        <SearchBar />

        <motion.div
          className={styles.ctaButtons}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
        >
          <Link to="/listings" className={styles.ctaPrimary}>
            Buy Property <ArrowRight size={18} />
          </Link>
          <Link to="/contact" className={styles.ctaSecondary}>
            Sell Property
          </Link>
          <button
            className={styles.ctaVideo}
            onClick={() =>
              window.open(
                "https://www.youtube.com/watch?v=Xv9oYTkkBGc",
                "_blank",
              )
            }
          >
            <span className={styles.playBtn}>
              <Play size={14} fill="currentColor" />
            </span>
            Watch Tour
          </button>
        </motion.div>
      </div>

      <div className={styles.statsBar}>
        <div className="container">
          <div className={styles.statsGrid}>
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className={styles.statItem}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + i * 0.1 }}
              >
                <div className={styles.statValue}>{stat.value}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
