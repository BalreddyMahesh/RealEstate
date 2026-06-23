import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Phone, Mail, MapPin, Briefcase, Building2, Globe, Share2, MessageCircle } from "lucide-react";
import { agents, properties } from "../data/properties";
import PropertyCard from "../components/PropertyCard/PropertyCard";
import styles from "./AgentProfile.module.css";

const AgentProfile = () => {
  const { id } = useParams();
  const agent = agents.find((a) => a.id === Number(id));

  if (!agent) {
    return (
      <div className={styles.notFound}>
        <h2>Agent not found</h2>
        <Link to="/agents" className={styles.backLink}>View All Agents</Link>
      </div>
    );
  }

  const agentProps = properties.filter((p) => p.agent.id === agent.id);

  return (
    <motion.div
      className={styles.page}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Hero Banner */}
      <div className={styles.heroBanner}>
        <div className={styles.bannerOverlay} />
        <div className={`container ${styles.bannerContent}`}>
          <motion.div
            className={styles.agentCard}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className={styles.photoWrap}>
              <img src={agent.photo} alt={agent.name} className={styles.photo} />
              <div className={styles.onlineBadge} />
            </div>
            <div className={styles.agentInfo}>
              <h1 className={styles.name}>{agent.name}</h1>
              <p className={styles.specialization}>{agent.specialization}</p>
              <div className={styles.stats}>
                <div className={styles.stat}>
                  <Star size={16} fill="#f59e0b" color="#f59e0b" />
                  <strong>{agent.rating}</strong>
                  <span>({agent.reviews} reviews)</span>
                </div>
                <span className={styles.dot} />
                <div className={styles.stat}>
                  <Briefcase size={16} />
                  <strong>{agent.experience}</strong> years
                </div>
                <span className={styles.dot} />
                <div className={styles.stat}>
                  <Building2 size={16} />
                  <strong>{agent.listings}</strong> listings
                </div>
                <span className={styles.dot} />
                <div className={styles.stat}>
                  <MapPin size={16} />
                  <span>{agent.location}</span>
                </div>
              </div>
              <div className={styles.contacts}>
                <a href={`tel:${agent.phone}`} className={styles.contactBtn}>
                  <Phone size={16} /> {agent.phone}
                </a>
                <a href={`mailto:${agent.email}`} className={styles.contactBtn}>
                  <Mail size={16} /> {agent.email}
                </a>
              </div>
              <div className={styles.socials}>
                <a href={agent.social.linkedin} className={styles.socialBtn} aria-label="LinkedIn"><Globe size={18} /></a>
                <a href={agent.social.twitter} className={styles.socialBtn} aria-label="Twitter"><Share2 size={18} /></a>
                <a href={agent.social.instagram} className={styles.socialBtn} aria-label="Instagram"><MessageCircle size={18} /></a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container">
        <div className={styles.layout}>
          <div className={styles.main}>
            {/* Bio */}
            <motion.div
              className={styles.section}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className={styles.sectionTitle}>About {agent.name}</h2>
              <p className={styles.bio}>{agent.bio}</p>
            </motion.div>

            {/* Agent Properties */}
            <motion.div
              className={styles.section}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className={styles.sectionTitle}>
                Listed Properties
                <span className={styles.propCount}>{agentProps.length}</span>
              </h2>
              {agentProps.length > 0 ? (
                <div className={styles.propsGrid}>
                  {agentProps.map((p, i) => (
                    <PropertyCard key={p.id} property={p} index={i} />
                  ))}
                </div>
              ) : (
                <p className={styles.noProps}>No properties listed yet.</p>
              )}
            </motion.div>
          </div>

          <div className={styles.sidebar}>
            {/* Key Stats */}
            <motion.div
              className={styles.statsCard}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className={styles.cardTitle}>Key Statistics</h3>
              {[
                { label: "Properties Sold", value: `${Math.floor(agent.listings * 0.7)}+` },
                { label: "Total Sales Value", value: agent.sales },
                { label: "Client Reviews", value: agent.reviews },
                { label: "Specialization", value: agent.specialization },
                { label: "Active Location", value: agent.location },
                { label: "Experience", value: `${agent.experience} Years` },
              ].map((s) => (
                <div key={s.label} className={styles.statRow}>
                  <span className={styles.statLabel}>{s.label}</span>
                  <span className={styles.statValue}>{s.value}</span>
                </div>
              ))}
            </motion.div>

            {/* Contact Form Simplified */}
            <motion.div
              className={styles.contactCard}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className={styles.cardTitle}>Quick Contact</h3>
              <a href={`tel:${agent.phone}`} className={styles.bigContactBtn}>
                <Phone size={20} /> Call Now
              </a>
              <a href={`mailto:${agent.email}`} className={`${styles.bigContactBtn} ${styles.outlineBtn}`}>
                <Mail size={20} /> Send Email
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AgentProfile;
