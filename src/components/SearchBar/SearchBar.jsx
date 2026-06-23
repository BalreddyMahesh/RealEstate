import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Home, IndianRupee, Search } from "lucide-react";
import styles from "./SearchBar.module.css";

const SearchBar = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ location: "", type: "", budget: "" });

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (form.location) params.set("location", form.location);
    if (form.type) params.set("type", form.type);
    if (form.budget) params.set("budget", form.budget);
    navigate(`/listings?${params.toString()}`);
  };

  return (
    <motion.div
      className={styles.wrapper}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
    >
      <form className={styles.form} onSubmit={handleSearch}>
        <div className={styles.field}>
          <MapPin size={18} className={styles.fieldIcon} />
          <input
            className={styles.input}
            placeholder="Location (e.g. Mumbai, Goa)"
            value={form.location}
            onChange={(e) => setForm((p) => ({ ...p, location: e.target.value }))}
          />
        </div>
        <div className={styles.divider} />
        <div className={styles.field}>
          <Home size={18} className={styles.fieldIcon} />
          <select
            className={styles.input}
            value={form.type}
            onChange={(e) => setForm((p) => ({ ...p, type: e.target.value }))}
          >
            <option value="">Property Type</option>
            <option value="Apartment">Apartment</option>
            <option value="Villa">Villa</option>
            <option value="House">House</option>
            <option value="Bungalow">Bungalow</option>
            <option value="Penthouse">Penthouse</option>
            <option value="Duplex">Duplex</option>
            <option value="Cottage">Cottage</option>
          </select>
        </div>
        <div className={styles.divider} />
        <div className={styles.field}>
          <IndianRupee size={18} className={styles.fieldIcon} />
          <select
            className={styles.input}
            value={form.budget}
            onChange={(e) => setForm((p) => ({ ...p, budget: e.target.value }))}
          >
            <option value="">Budget</option>
            <option value="5000000">Under ₹50 Lakh</option>
            <option value="10000000">Under ₹1 Crore</option>
            <option value="20000000">Under ₹2 Crore</option>
            <option value="50000000">Under ₹5 Crore</option>
          </select>
        </div>
        <motion.button
          type="submit"
          className={styles.searchBtn}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          <Search size={20} />
          <span>Search</span>
        </motion.button>
      </form>
    </motion.div>
  );
};

export default SearchBar;
