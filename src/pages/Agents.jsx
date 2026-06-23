import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Briefcase, Building2, MapPin, Phone, Mail } from "lucide-react";
import { agents } from "../data/properties";
import styles from "./Agents.module.css";

const Agents = () => {
  return (
    <motion.div
      className={styles.page}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className={styles.pageHeader}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="section-label">Expert Team</span>
            <h1 className={styles.title}>Meet Our Top Agents</h1>
            <p className={styles.subtitle}>
              Work with India's finest real estate professionals, handpicked for their expertise and client satisfaction record.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container">
        <div className={styles.grid}>
          {agents.map((agent, i) => (
            <motion.div
              key={agent.id}
              className={styles.card}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <div className={styles.cardTop}>
                <div className={styles.photoWrap}>
                  <img src={agent.photo} alt={agent.name} className={styles.photo} />
                  <div className={styles.onlineDot} />
                </div>
                <div className={styles.ratingBadge}>
                  <Star size={12} fill="#f59e0b" color="#f59e0b" />
                  {agent.rating}
                </div>
              </div>

              <div className={styles.body}>
                <h3 className={styles.name}>{agent.name}</h3>
                <p className={styles.spec}>{agent.specialization}</p>
                <div className={styles.stats}>
                  <div className={styles.stat}>
                    <Briefcase size={14} />
                    <span>{agent.experience} yrs</span>
                  </div>
                  <div className={styles.stat}>
                    <Building2 size={14} />
                    <span>{agent.listings} listings</span>
                  </div>
                  <div className={styles.stat}>
                    <MapPin size={14} />
                    <span>{agent.location}</span>
                  </div>
                </div>
                <div className={styles.salesRow}>
                  <span className={styles.salesLabel}>Total Sales</span>
                  <span className={styles.salesValue}>{agent.sales}</span>
                </div>
                <div className={styles.actions}>
                  <Link to={`/agents/${agent.id}`} className={styles.viewBtn}>
                    View Profile
                  </Link>
                  <a href={`tel:${agent.phone}`} className={styles.iconBtn} title="Call">
                    <Phone size={16} />
                  </a>
                  <a href={`mailto:${agent.email}`} className={styles.iconBtn} title="Email">
                    <Mail size={16} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Agents;
