import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin, Bed, Bath, Square, Heart, Share2, Phone, Mail,
  ChevronLeft, ChevronRight, Star, CheckCircle, ArrowLeft, X,
  Navigation, ExternalLink
} from "lucide-react";
import { properties } from "../data/properties";
import PropertyCard from "../components/PropertyCard/PropertyCard";
import Button from "../components/Button/Button";
import styles from "./PropertyDetails.module.css";

const formatPrice = (price) => {
  if (price >= 10000000) return `₹${(price / 10000000).toFixed(2)} Cr`;
  if (price >= 100000) return `₹${(price / 100000).toFixed(0)} L`;
  return `₹${price.toLocaleString()}`;
};

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const property = properties.find((p) => p.id === Number(id));
  const [activeImg, setActiveImg] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [liked, setLiked] = useState(() => {
    const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
    return favs.includes(Number(id));
  });

  if (!property) {
    return (
      <div className={styles.notFound}>
        <h2>Property not found</h2>
        <Button variant="primary" onClick={() => navigate("/listings")}>Back to Listings</Button>
      </div>
    );
  }

  const imgs = property.images || [property.image];
  const similar = properties.filter((p) => p.id !== property.id && p.propertyType === property.propertyType).slice(0, 3);

  const toggleLike = () => {
    const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
    const updated = liked ? favs.filter((fid) => fid !== property.id) : [...favs, property.id];
    localStorage.setItem("favorites", JSON.stringify(updated));
    setLiked(!liked);
  };

  const prevImg = () => setActiveImg((p) => (p - 1 + imgs.length) % imgs.length);
  const nextImg = () => setActiveImg((p) => (p + 1) % imgs.length);

  return (
    <motion.div
      className={styles.page}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className={styles.topBar}>
        <div className="container">
          <Link to="/listings" className={styles.backBtn}>
            <ArrowLeft size={18} /> Back to Listings
          </Link>
        </div>
      </div>

      {/* Image Gallery */}
      <div className={styles.gallery}>
        <div className={styles.mainImgWrap}>
          <AnimatePresence mode="wait">
            <motion.img
              key={activeImg}
              src={imgs[activeImg]}
              alt={property.title}
              className={styles.mainImg}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setLightbox(true)}
            />
          </AnimatePresence>
          <button className={`${styles.navBtn} ${styles.prev}`} onClick={prevImg}><ChevronLeft size={22} /></button>
          <button className={`${styles.navBtn} ${styles.next}`} onClick={nextImg}><ChevronRight size={22} /></button>
          <div className={styles.imgCount}>{activeImg + 1} / {imgs.length}</div>
        </div>
        {imgs.length > 1 && (
          <div className={styles.thumbnails}>
            {imgs.map((img, i) => (
              <img
                key={i}
                src={img}
                alt=""
                className={`${styles.thumb} ${i === activeImg ? styles.thumbActive : ""}`}
                onClick={() => setActiveImg(i)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div className={styles.lightbox} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button className={styles.lightboxClose} onClick={() => setLightbox(false)}><X size={24} /></button>
            <img src={imgs[activeImg]} alt="" className={styles.lightboxImg} />
            <button className={`${styles.lightboxNav} ${styles.lightboxPrev}`} onClick={prevImg}><ChevronLeft size={28} /></button>
            <button className={`${styles.lightboxNav} ${styles.lightboxNext}`} onClick={nextImg}><ChevronRight size={28} /></button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container">
        <div className={styles.layout}>
          {/* Main Content */}
          <div className={styles.main}>
            <div className={styles.titleRow}>
              <div>
                <div className={styles.badges}>
                  <span className={styles.typeBadge}>{property.propertyType}</span>
                  {property.featured && <span className={styles.featuredBadge}>Featured</span>}
                </div>
                <h1 className={styles.title}>{property.title}</h1>
                <div className={styles.locationRow}>
                  <MapPin size={16} />
                  <span>{property.location}</span>
                </div>
              </div>
              <div className={styles.priceBlock}>
                <div className={styles.price}>{formatPrice(property.price)}</div>
                <div className={styles.priceNote}>Negotiable</div>
              </div>
            </div>

            {/* Key Specs */}
            <div className={styles.specs}>
              {[
                { icon: <Bed size={20} />, label: "Bedrooms", value: property.bedrooms },
                { icon: <Bath size={20} />, label: "Bathrooms", value: property.bathrooms },
                { icon: <Square size={20} />, label: "Area", value: `${property.area.toLocaleString()} sq.ft` },
              ].map((s) => (
                <div key={s.label} className={styles.specItem}>
                  <div className={styles.specIcon}>{s.icon}</div>
                  <div className={styles.specValue}>{s.value}</div>
                  <div className={styles.specLabel}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>About This Property</h2>
              <p className={styles.description}>{property.description}</p>
            </div>

            {/* Amenities */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Amenities & Features</h2>
              <div className={styles.amenitiesGrid}>
                {property.amenities.map((a) => (
                  <div key={a} className={styles.amenityItem}>
                    <CheckCircle size={16} className={styles.amenityIcon} />
                    {a}
                  </div>
                ))}
              </div>
            </div>

            {/* Map Section */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Location &amp; Map</h2>
              <div className={styles.mapAddress}>
                <MapPin size={16} className={styles.mapPinIcon} />
                <span>{property.address || property.location}</span>
              </div>
              <div className={styles.mapContainer}>
                <iframe
                  title="Property Location"
                  className={styles.mapIframe}
                  src={`https://maps.google.com/maps?q=${property.lat},${property.lng}&t=m&z=15&output=embed&iwloc=near`}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className={styles.mapActions}>
                <a
                  href={`https://www.google.com/maps?q=${property.lat},${property.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.directionsBtn}
                >
                  <Navigation size={16} />
                  Get Directions
                </a>
                <a
                  href={`https://www.google.com/maps?q=${property.lat},${property.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.viewMapBtn}
                >
                  <ExternalLink size={14} />
                  Open in Google Maps
                </a>
              </div>
            </div>

            {/* Similar Properties */}
            {similar.length > 0 && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Similar Properties</h2>
                <div className={styles.similarGrid}>
                  {similar.map((p, i) => (
                    <PropertyCard key={p.id} property={p} index={i} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className={styles.sidebar}>
            {/* Agent Card */}
            <div className={styles.agentCard}>
              <img src={property.agent.photo} alt={property.agent.name} className={styles.agentPhoto} />
              <div className={styles.agentInfo}>
                <h3 className={styles.agentName}>{property.agent.name}</h3>
                <div className={styles.agentRating}>
                  <Star size={14} fill="#f59e0b" color="#f59e0b" />
                  <span>{property.agent.rating}</span>
                  <span className={styles.agentExp}>{property.agent.experience} years exp.</span>
                </div>
              </div>
              <div className={styles.agentActions}>
                <a href={`tel:${property.agent.phone}`} className={styles.agentBtn}>
                  <Phone size={16} /> Call Agent
                </a>
                <a href={`mailto:${property.agent.email}`} className={`${styles.agentBtn} ${styles.agentBtnOutline}`}>
                  <Mail size={16} /> Email
                </a>
              </div>
              <Link to={`/agents/${property.agent.id}`} className={styles.viewAgentLink}>
                View Agent Profile
              </Link>
            </div>

            {/* Action Buttons */}
            <div className={styles.actionCard}>
              <button
                className={`${styles.likeBtn} ${liked ? styles.liked : ""}`}
                onClick={toggleLike}
              >
                <Heart size={18} fill={liked ? "currentColor" : "none"} />
                {liked ? "Saved to Favorites" : "Save to Favorites"}
              </button>
              <button className={styles.shareBtn}>
                <Share2 size={18} /> Share Property
              </button>
            </div>

            {/* Quick Info */}
            <div className={styles.infoCard}>
              <h4 className={styles.infoTitle}>Property Details</h4>
              {[
                { label: "Property Type", value: property.propertyType },
                { label: "Price", value: formatPrice(property.price) },
                { label: "Area", value: `${property.area.toLocaleString()} sq.ft` },
                { label: "Bedrooms", value: property.bedrooms },
                { label: "Bathrooms", value: property.bathrooms },
                { label: "Location", value: property.city },
                { label: "Posted On", value: new Date(property.postedDate).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" }) },
              ].map((item) => (
                <div key={item.label} className={styles.infoRow}>
                  <span className={styles.infoLabel}>{item.label}</span>
                  <span className={styles.infoValue}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyDetails;
