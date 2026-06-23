import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./Pagination.module.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const visible = pages.filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1
  );

  const withEllipsis = [];
  let prev = 0;
  for (const p of visible) {
    if (p - prev > 1) withEllipsis.push("...");
    withEllipsis.push(p);
    prev = p;
  }

  return (
    <motion.div
      className={styles.pagination}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <button
        className={styles.navBtn}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft size={18} />
      </button>

      {withEllipsis.map((item, i) =>
        item === "..." ? (
          <span key={`dots-${i}`} className={styles.ellipsis}>...</span>
        ) : (
          <button
            key={item}
            className={`${styles.pageBtn} ${item === currentPage ? styles.active : ""}`}
            onClick={() => onPageChange(item)}
          >
            {item}
          </button>
        )
      )}

      <button
        className={styles.navBtn}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight size={18} />
      </button>
    </motion.div>
  );
};

export default Pagination;
