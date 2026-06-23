import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Home, Building2, MapPin, Users, Phone,
  Shield, FileText, Map, ChevronRight
} from "lucide-react";
import styles from "./Sitemap.module.css";

const sitemapData = [
  {
    category: "Main Pages",
    icon: <Home size={20} />,
    links: [
      { label: "Home", to: "/", desc: "Platform homepage with featured properties and search" },
      { label: "Property Listings", to: "/listings", desc: "Browse and filter all available properties" },
      { label: "Our Agents", to: "/agents", desc: "Meet our certified real estate experts" },
      { label: "Contact Us", to: "/contact", desc: "Get in touch with our team" },
    ],
  },
  {
    category: "Property Pages",
    icon: <Building2 size={20} />,
    links: [
      { label: "Luxury Apartment — Bandra West, Mumbai", to: "/property/1", desc: "3 BHK · ₹4.50 Cr · Mumbai" },
      { label: "Modern Villa — Koramangala, Bangalore", to: "/property/2", desc: "4 BHK · ₹3.20 Cr · Bangalore" },
      { label: "Heritage Bungalow — Civil Lines, Delhi", to: "/property/3", desc: "5 BHK · ₹8.75 Cr · Delhi" },
      { label: "Sea View Penthouse — Marine Drive, Mumbai", to: "/property/4", desc: "4 BHK · ₹12.50 Cr · Mumbai" },
      { label: "Premium Villa — Jubilee Hills, Hyderabad", to: "/property/5", desc: "4 BHK · ₹5.80 Cr · Hyderabad" },
      { label: "Tech Corridor Apartment — Whitefield, Bangalore", to: "/property/6", desc: "3 BHK · ₹1.85 Cr · Bangalore" },
      { label: "Beach House — Calangute, Goa", to: "/property/7", desc: "3 BHK · ₹2.40 Cr · Goa" },
      { label: "Duplex Apartment — Indiranagar, Bangalore", to: "/property/8", desc: "3 BHK · ₹2.10 Cr · Bangalore" },
      { label: "Hill Station Retreat — Kodaikanal, TN", to: "/property/9", desc: "4 BHK · ₹1.60 Cr · Tamil Nadu" },
      { label: "Business District Condo — BKC, Mumbai", to: "/property/10", desc: "2 BHK · ₹3.90 Cr · Mumbai" },
      { label: "Garden Estate — Sadashivanagar, Bangalore", to: "/property/11", desc: "5 BHK · ₹9.50 Cr · Bangalore" },
      { label: "Smart Apartment — Wakad, Pune", to: "/property/12", desc: "2 BHK · ₹95 L · Pune" },
    ],
  },
  {
    category: "Agent Profiles",
    icon: <Users size={20} />,
    links: [
      { label: "Priya Sharma — Senior Agent", to: "/agents/1", desc: "12 years experience · Mumbai specialist" },
      { label: "Rahul Mehta — Property Expert", to: "/agents/2", desc: "9 years experience · Bangalore expert" },
      { label: "Aisha Khan — Luxury Specialist", to: "/agents/3", desc: "15 years experience · Delhi & NCR" },
      { label: "Vikram Patel — Investment Advisor", to: "/agents/4", desc: "11 years experience · Pan-India" },
      { label: "Deepa Nair — Residential Expert", to: "/agents/5", desc: "8 years experience · South India" },
    ],
  },
  {
    category: "Legal & Info",
    icon: <Shield size={20} />,
    links: [
      { label: "Privacy Policy", to: "/privacy-policy", desc: "How we collect, use, and protect your data" },
      { label: "Terms of Service", to: "/terms-of-service", desc: "Rules and guidelines for using DreamEstate" },
      { label: "Sitemap", to: "/sitemap", desc: "Complete list of all pages on DreamEstate" },
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const Sitemap = () => (
  <motion.div
    className={styles.page}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <div className={styles.hero}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.badge}>Navigation</div>
          <h1 className={styles.heroTitle}>Sitemap</h1>
          <p className={styles.heroSub}>
            A complete directory of all pages available on DreamEstate.
          </p>
        </motion.div>
      </div>
    </div>

    <div className="container">
      <motion.div
        className={styles.grid}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {sitemapData.map((group) => (
          <motion.div key={group.category} className={styles.card} variants={cardVariants}>
            <div className={styles.cardHeader}>
              <span className={styles.cardIcon}>{group.icon}</span>
              <h2 className={styles.cardTitle}>{group.category}</h2>
              <span className={styles.cardCount}>{group.links.length}</span>
            </div>
            <ul className={styles.linkList}>
              {group.links.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className={styles.sitemapLink}>
                    <div className={styles.linkContent}>
                      <span className={styles.linkLabel}>{link.label}</span>
                      <span className={styles.linkDesc}>{link.desc}</span>
                    </div>
                    <ChevronRight size={16} className={styles.linkArrow} />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>

      <div className={styles.footer}>
        <Map size={18} />
        <span>
          DreamEstate — {sitemapData.reduce((acc, g) => acc + g.links.length, 0)} pages across {sitemapData.length} categories
        </span>
      </div>
    </div>
  </motion.div>
);

export default Sitemap;
