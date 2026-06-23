import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Grid, List, SlidersHorizontal, X } from "lucide-react";
import { properties } from "../data/properties";
import PropertyCard from "../components/PropertyCard/PropertyCard";
import PropertyFilters from "../components/PropertyFilters/PropertyFilters";
import Pagination from "../components/Pagination/Pagination";
import EmptyState from "../components/EmptyState/EmptyState";
import Loader from "../components/Loader/Loader";
import { useDebounce } from "../hooks/useDebounce";
import styles from "./Listings.module.css";

const ITEMS_PER_PAGE = 9;

const defaultFilters = {
  search: "",
  location: "",
  type: "",
  bedrooms: "",
  bathrooms: "",
  minPrice: 0,
  maxPrice: 50000000,
  sort: "latest",
};

const Listings = () => {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState(() => ({
    ...defaultFilters,
    location: searchParams.get("location") || "",
    type: searchParams.get("type") || "",
    maxPrice: searchParams.get("budget") ? Number(searchParams.get("budget")) : 50000000,
  }));
  const [page, setPage] = useState(1);
  const [view, setView] = useState("grid");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const debouncedSearch = useDebounce(filters.search, 350);
  const debouncedLocation = useDebounce(filters.location, 350);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(() => {
    let list = [...properties];

    if (debouncedSearch)
      list = list.filter((p) => p.title.toLowerCase().includes(debouncedSearch.toLowerCase()));

    if (debouncedLocation)
      list = list.filter(
        (p) =>
          p.location.toLowerCase().includes(debouncedLocation.toLowerCase()) ||
          p.city.toLowerCase().includes(debouncedLocation.toLowerCase())
      );

    if (filters.type) list = list.filter((p) => p.propertyType === filters.type);

    if (filters.bedrooms) {
      const n = filters.bedrooms === "5+" ? 5 : Number(filters.bedrooms);
      list = list.filter((p) => (filters.bedrooms === "5+" ? p.bedrooms >= n : p.bedrooms === n));
    }

    if (filters.bathrooms) {
      const n = filters.bathrooms === "4+" ? 4 : Number(filters.bathrooms);
      list = list.filter((p) => (filters.bathrooms === "4+" ? p.bathrooms >= n : p.bathrooms === n));
    }

    list = list.filter((p) => p.price >= filters.minPrice && p.price <= filters.maxPrice);

    if (filters.sort === "price_asc") list.sort((a, b) => a.price - b.price);
    else if (filters.sort === "price_desc") list.sort((a, b) => b.price - a.price);
    else list.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));

    return list;
  }, [debouncedSearch, debouncedLocation, filters.type, filters.bedrooms, filters.bathrooms, filters.minPrice, filters.maxPrice, filters.sort]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  const handleReset = () => {
    setFilters(defaultFilters);
    setPage(1);
  };

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.pageHeader}>
          <div className="container">
            <div className={styles.pageTitle} style={{ height: 32, width: 220, background: "var(--border)", borderRadius: 8 }} />
            <div style={{ height: 16, width: 160, background: "var(--border)", borderRadius: 6, marginTop: 8 }} />
          </div>
        </div>
        <div className="container">
          <div className={styles.skeletonLayout}>
            <div className={styles.grid}>
              {Array.from({ length: 6 }).map((_, i) => (
                <Loader key={i} type="skeleton" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

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
            transition={{ duration: 0.5 }}
          >
            <h1 className={styles.pageTitle}>Property Listings</h1>
            <p className={styles.pageSubtitle}>
              {filtered.length} properties found across India
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container">
        <div className={styles.layout}>
          {/* Sidebar – desktop */}
          <div className={styles.sidebarDesktop}>
            <PropertyFilters
              filters={filters}
              onChange={handleFilterChange}
              onReset={handleReset}
              totalCount={filtered.length}
            />
          </div>

          {/* Mobile sidebar overlay */}
          {sidebarOpen && (
            <div className={styles.mobileOverlay} onClick={() => setSidebarOpen(false)}>
              <div className={styles.mobileSidebar} onClick={(e) => e.stopPropagation()}>
                <div className={styles.mobileSidebarHeader}>
                  <span>Filters</span>
                  <button onClick={() => setSidebarOpen(false)}><X size={20} /></button>
                </div>
                <PropertyFilters
                  filters={filters}
                  onChange={handleFilterChange}
                  onReset={handleReset}
                  totalCount={filtered.length}
                />
              </div>
            </div>
          )}

          <div className={styles.main}>
            <div className={styles.toolbar}>
              <button className={styles.filterToggle} onClick={() => setSidebarOpen(true)}>
                <SlidersHorizontal size={16} /> Filters
              </button>
              <span className={styles.toolbarCount}>{filtered.length} results</span>
              <div className={styles.viewToggle}>
                <button
                  className={`${styles.viewBtn} ${view === "grid" ? styles.viewBtnActive : ""}`}
                  onClick={() => setView("grid")}
                >
                  <Grid size={16} />
                </button>
                <button
                  className={`${styles.viewBtn} ${view === "list" ? styles.viewBtnActive : ""}`}
                  onClick={() => setView("list")}
                >
                  <List size={16} />
                </button>
              </div>
            </div>

            {paginated.length === 0 ? (
              <EmptyState
                title="No properties match your search"
                description="Try adjusting your filters or search terms to find more results."
                onReset={handleReset}
              />
            ) : (
              <>
                <div className={view === "grid" ? styles.grid : styles.listView}>
                  {paginated.map((p, i) => (
                    <PropertyCard key={p.id} property={p} index={i} />
                  ))}
                </div>
                <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
              </>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Listings;
