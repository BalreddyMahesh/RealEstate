import { motion } from "framer-motion";
import { SearchX } from "lucide-react";
import Button from "../Button/Button";
import styles from "./EmptyState.module.css";

const EmptyState = ({ title = "No properties found", description = "Try adjusting your filters.", onReset }) => {
  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.iconWrap}>
        <SearchX size={48} />
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.desc}>{description}</p>
      {onReset && (
        <Button variant="primary" onClick={onReset}>
          Clear Filters
        </Button>
      )}
    </motion.div>
  );
};

export default EmptyState;
