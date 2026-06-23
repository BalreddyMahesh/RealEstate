import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { properties } from "../../data/properties";
import PropertyCard from "../PropertyCard/PropertyCard";
import styles from "./FeaturedProperties.module.css";

const featured = properties.filter((p) => p.featured).slice(0, 6);

const FeaturedProperties = () => {
  return (
    <section className={styles.section}>
      <div className="container">
        <motion.div
          className={`section-header ${styles.header}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <span className="section-label">Hand-Picked</span>
            <h2 className="section-title">
              Featured <span className="gradient-text">Properties</span>
            </h2>
            <p className="section-subtitle">
              Explore our curated selection of premium properties across India's top cities.
            </p>
          </div>
          <Link to="/listings" className={styles.viewAll}>
            View All <ArrowRight size={16} />
          </Link>
        </motion.div>

        <div className={styles.grid}>
          {featured.map((property, i) => (
            <PropertyCard key={property.id} property={property} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
