import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "../../data/properties";
import styles from "./Testimonials.module.css";

const StarRating = ({ rating }) => (
  <div className={styles.stars}>
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={14}
        fill={i < rating ? "#f59e0b" : "none"}
        color={i < rating ? "#f59e0b" : "#cbd5e1"}
      />
    ))}
  </div>
);

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((p) => (p + 1) % testimonials.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const go = (idx) => {
    setDirection(idx > current ? 1 : -1);
    setCurrent(idx);
  };

  const prev = () => {
    setDirection(-1);
    setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length);
  };
  const next = () => {
    setDirection(1);
    setCurrent((p) => (p + 1) % testimonials.length);
  };

  const t = testimonials[current];

  return (
    <section className={styles.section}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="section-label">Testimonials</span>
          <h2 className="section-title">
            What Our <span className="gradient-text">Clients Say</span>
          </h2>
          <p className="section-subtitle">
            Real stories from happy homeowners and investors who found their dream properties.
          </p>
        </motion.div>

        <div className={styles.sliderWrap}>
          <button className={`${styles.navBtn} ${styles.prev}`} onClick={prev}>
            <ChevronLeft size={20} />
          </button>

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              className={styles.card}
              custom={direction}
              initial={{ opacity: 0, x: direction * 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -direction * 80 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <div className={styles.quoteIcon}>
                <Quote size={28} fill="currentColor" />
              </div>
              <p className={styles.review}>{t.review}</p>
              <StarRating rating={t.rating} />
              <div className={styles.author}>
                <img src={t.image} alt={t.name} className={styles.avatar} />
                <div>
                  <div className={styles.name}>{t.name}</div>
                  <div className={styles.meta}>
                    {t.location} · {t.property}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <button className={`${styles.navBtn} ${styles.next}`} onClick={next}>
            <ChevronRight size={20} />
          </button>
        </div>

        <div className={styles.dots}>
          {testimonials.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === current ? styles.dotActive : ""}`}
              onClick={() => go(i)}
            />
          ))}
        </div>

        <div className={styles.miniCards}>
          {testimonials.map((item, i) => (
            <motion.div
              key={item.id}
              className={`${styles.miniCard} ${i === current ? styles.miniActive : ""}`}
              onClick={() => go(i)}
              whileHover={{ y: -4 }}
            >
              <img src={item.image} alt={item.name} className={styles.miniAvatar} />
              <div className={styles.miniName}>{item.name}</div>
              <StarRating rating={item.rating} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
