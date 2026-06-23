import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, MapPin, Bed, Bath, Square, Eye } from "lucide-react";
import styles from "./PropertyCard.module.css";

const formatPrice = (price) => {
  if (price >= 10000000) return `₹${(price / 10000000).toFixed(1)} Cr`;
  if (price >= 100000) return `₹${(price / 100000).toFixed(0)} L`;
  return `₹${price.toLocaleString()}`;
};

const PropertyCard = ({ property, index = 0 }) => {
  const [liked, setLiked] = useState(() => {
    const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
    return favs.includes(property.id);
  });

  const toggleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
    const updated = liked
      ? favs.filter((id) => id !== property.id)
      : [...favs, property.id];
    localStorage.setItem("favorites", JSON.stringify(updated));
    setLiked(!liked);
  };

  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.4 }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
    >
      <Link to={`/property/${property.id}`} className={styles.imageWrap}>
        <img src={property.image} alt={property.title} className={styles.image} loading="lazy" />
        <div className={styles.imageOverlay} />
        {property.featured && <span className={styles.featuredBadge}>Featured</span>}
        <span className={styles.typeBadge}>{property.propertyType}</span>
        <button
          className={`${styles.likeBtn} ${liked ? styles.liked : ""}`}
          onClick={toggleLike}
          aria-label="Toggle favorite"
        >
          <Heart size={16} fill={liked ? "currentColor" : "none"} />
        </button>
        <div className={styles.viewOverlay}>
          <Eye size={18} />
          View Details
        </div>
      </Link>

      <div className={styles.body}>
        <div className={styles.priceRow}>
          <span className={styles.price}>{formatPrice(property.price)}</span>
          <span className={styles.location}>
            <MapPin size={13} />
            {property.location}
          </span>
        </div>

        <h3 className={styles.title}>{property.title}</h3>

        <div className={styles.specs}>
          <span className={styles.spec}>
            <Bed size={14} />
            {property.bedrooms} Beds
          </span>
          <span className={styles.specDot} />
          <span className={styles.spec}>
            <Bath size={14} />
            {property.bathrooms} Baths
          </span>
          <span className={styles.specDot} />
          <span className={styles.spec}>
            <Square size={14} />
            {property.area.toLocaleString()} sq.ft
          </span>
        </div>

        <div className={styles.footer}>
          <div className={styles.agentInfo}>
            <img src={property.agent.photo} alt={property.agent.name} className={styles.agentPhoto} />
            <span className={styles.agentName}>{property.agent.name}</span>
          </div>
          <Link to={`/property/${property.id}`} className={styles.viewBtn}>
            View
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard;
