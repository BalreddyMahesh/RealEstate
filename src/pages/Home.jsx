import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Building2,
  Shield,
  TrendingUp,
  Headphones,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import Hero from "../components/Hero/Hero";
import FeaturedProperties from "../components/FeaturedProperties/FeaturedProperties";
import Testimonials from "../components/Testimonials/Testimonials";
import styles from "./Home.module.css";

const services = [
  {
    icon: <Building2 size={28} />,
    title: "Buy a Property",
    desc: "Browse thousands of verified listings and find your perfect home with our expert guidance.",
    color: "#2563eb",
    link: "/listings",
  },
  {
    icon: <TrendingUp size={28} />,
    title: "Sell Your Property",
    desc: "List your property with us and reach millions of potential buyers across India.",
    color: "#0ea5e9",
    link: "/contact",
  },
  {
    icon: <Shield size={28} />,
    title: "Verified Listings",
    desc: "All properties are verified by our team to ensure authenticity and accuracy of information.",
    color: "#10b981",
    link: "/listings",
  },
  {
    icon: <Headphones size={28} />,
    title: "Expert Support",
    desc: "Our dedicated team of real estate experts is available 24/7 to assist you.",
    color: "#f59e0b",
    link: "/contact",
  },
];

const whyUs = [
  "Zero brokerage on selected properties",
  "RERA verified listings",
  "Virtual property tours",
  "Legal documentation support",
  "Home loan assistance",
  "Post-sale support & guidance",
];

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Hero />

      {/* Services Section */}
      <section className={styles.servicesSection}>
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="section-label">Our Services</span>
            <h2 className="section-title">
              Everything You Need in{" "}
              <span className="gradient-text">One Place</span>
            </h2>
            <p className="section-subtitle">
              From searching to signing, we make real estate simple and
              stress-free.
            </p>
          </motion.div>

          <div className={styles.servicesGrid}>
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                className={styles.serviceCard}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <div
                  className={styles.serviceIcon}
                  style={{ background: `${s.color}15`, color: s.color }}
                >
                  {s.icon}
                </div>
                <h3 className={styles.serviceTitle}>{s.title}</h3>
                <p className={styles.serviceDesc}>{s.desc}</p>
                <Link
                  to={s.link}
                  className={styles.serviceLink}
                  style={{ color: s.color }}
                >
                  Learn more <ArrowRight size={14} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <FeaturedProperties />

      {/* Why Choose Us */}
      <section className={styles.whySection}>
        <div className="container">
          <div className={styles.whyGrid}>
            <motion.div
              className={styles.whyImage}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80"
                alt="Premium real estate"
              />
              <div className={styles.whyBadge}>
                <div className={styles.badgeNum}>10+</div>
                <div className={styles.badgeText}>Years of Excellence</div>
              </div>
            </motion.div>

            <motion.div
              className={styles.whyContent}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="section-label">Why Choose Us</span>
              <h2 className="section-title">
                India's Most <span className="gradient-text">Trusted</span> Real
                Estate Platform
              </h2>
              <p className={styles.whyDesc}>
                We go beyond listings. Our team of 300+ certified agents,
                combined with cutting-edge technology, makes your property
                journey seamless, safe, and successful.
              </p>
              <ul className={styles.checkList}>
                {whyUs.map((item) => (
                  <li key={item}>
                    <CheckCircle size={18} className={styles.checkIcon} />
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/listings" className={styles.whyCta}>
                Explore Properties <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Cities Section */}
      <section className={styles.citiesSection}>
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="section-label">Locations</span>
            <h2 className="section-title">
              Properties Across{" "}
              <span className="gradient-text">Top Cities</span>
            </h2>
          </motion.div>

          <div className={styles.citiesGrid}>
            {[
              {
                name: "Mumbai",
                count: "12,450+",
                img: "https://images.unsplash.com/photo-1562979314-bee7453e911c?w=600&q=80",
              },
              {
                name: "Bangalore",
                count: "9,820+",
                img: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=600&q=80",
              },
              {
                name: "Delhi NCR",
                count: "8,630+",
                img: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&q=80",
              },
              {
                name: "Goa",
                count: "3,240+",
                img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&q=80",
              },
              {
                name: "Hyderabad",
                count: "6,780+",
                img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&auto=format&fit=crop&q=80",
              },
              {
                name: "Pune",
                count: "5,920+",
                img: "https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?auto=compress&cs=tinysrgb&w=600",
              },
            ].map((city, i) => (
              <motion.div
                key={city.name}
                className={styles.cityCard}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
              >
                <Link to={`/listings?location=${city.name}`}>
                  <img src={city.img} alt={city.name} />
                  <div className={styles.cityOverlay} />
                  <div className={styles.cityInfo}>
                    <h3>{city.name}</h3>
                    <span>{city.count} Properties</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className="container">
          <motion.div
            className={styles.ctaBox}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className={styles.ctaTitle}>Ready to Find Your Dream Home?</h2>
            <p className={styles.ctaSubtitle}>
              Join over 15,000 happy families who found their perfect property
              with DreamHome.
            </p>
            <div className={styles.ctaBtns}>
              <Link to="/listings" className={styles.ctaBtnPrimary}>
                Browse Properties <ArrowRight size={18} />
              </Link>
              <Link to="/contact" className={styles.ctaBtnSecondary}>
                Talk to an Expert
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;
