import { SlidersHorizontal, X, ChevronDown } from "lucide-react";
import styles from "./PropertyFilters.module.css";

const PropertyFilters = ({ filters, onChange, onReset, totalCount }) => {
  const update = (key, value) => onChange({ ...filters, [key]: value });

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <div className={styles.headerLeft}>
          <SlidersHorizontal size={18} />
          <span>Filters</span>
        </div>
        <button className={styles.resetBtn} onClick={onReset}>
          <X size={14} /> Reset
        </button>
      </div>

      <div className={styles.resultCount}>
        <span className={styles.count}>{totalCount}</span> properties found
      </div>

      <div className={styles.group}>
        <label className={styles.label}>Search</label>
        <input
          className={styles.input}
          placeholder="Property name..."
          value={filters.search}
          onChange={(e) => update("search", e.target.value)}
        />
      </div>

      <div className={styles.group}>
        <label className={styles.label}>Location / City</label>
        <input
          className={styles.input}
          placeholder="e.g. Mumbai, Bangalore"
          value={filters.location}
          onChange={(e) => update("location", e.target.value)}
        />
      </div>

      <div className={styles.group}>
        <label className={styles.label}>Property Type</label>
        <div className={styles.selectWrap}>
          <select
            className={styles.select}
            value={filters.type}
            onChange={(e) => update("type", e.target.value)}
          >
            <option value="">All Types</option>
            <option value="Apartment">Apartment</option>
            <option value="Villa">Villa</option>
            <option value="House">House</option>
            <option value="Bungalow">Bungalow</option>
            <option value="Penthouse">Penthouse</option>
            <option value="Duplex">Duplex</option>
            <option value="Cottage">Cottage</option>
          </select>
          <ChevronDown size={16} className={styles.selectIcon} />
        </div>
      </div>

      <div className={styles.group}>
        <label className={styles.label}>Bedrooms</label>
        <div className={styles.chipGroup}>
          {["", "1", "2", "3", "4", "5+"].map((n) => (
            <button
              key={n}
              className={`${styles.chip} ${filters.bedrooms === n ? styles.chipActive : ""}`}
              onClick={() => update("bedrooms", n)}
            >
              {n || "Any"}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.group}>
        <label className={styles.label}>Bathrooms</label>
        <div className={styles.chipGroup}>
          {["", "1", "2", "3", "4+"].map((n) => (
            <button
              key={n}
              className={`${styles.chip} ${filters.bathrooms === n ? styles.chipActive : ""}`}
              onClick={() => update("bathrooms", n)}
            >
              {n || "Any"}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.group}>
        <label className={styles.label}>
          Price Range: <span className={styles.priceLabel}>
            ₹{(filters.minPrice / 100000).toFixed(0)}L – ₹{(filters.maxPrice / 10000000).toFixed(1)}Cr
          </span>
        </label>
        <div className={styles.rangeGroup}>
          <input
            type="range"
            className={styles.range}
            min={0}
            max={50000000}
            step={500000}
            value={filters.minPrice}
            onChange={(e) => update("minPrice", Number(e.target.value))}
          />
          <input
            type="range"
            className={styles.range}
            min={0}
            max={50000000}
            step={500000}
            value={filters.maxPrice}
            onChange={(e) => update("maxPrice", Number(e.target.value))}
          />
        </div>
      </div>

      <div className={styles.group}>
        <label className={styles.label}>Sort By</label>
        <div className={styles.selectWrap}>
          <select
            className={styles.select}
            value={filters.sort}
            onChange={(e) => update("sort", e.target.value)}
          >
            <option value="latest">Latest</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
          <ChevronDown size={16} className={styles.selectIcon} />
        </div>
      </div>
    </aside>
  );
};

export default PropertyFilters;
