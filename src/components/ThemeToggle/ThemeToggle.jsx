import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import styles from "./ThemeToggle.module.css";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <motion.button
      className={styles.toggle}
      onClick={toggleTheme}
      aria-label="Toggle theme"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Sun
        size={14}
        className={`${styles.icon} ${!isDark ? styles.iconActive : ""}`}
      />
      <motion.div
        className={styles.track}
        animate={{
          background: isDark ? "rgba(37,99,235,0.22)" : "rgba(226,232,240,1)",
          borderColor: isDark ? "rgba(59,130,246,0.35)" : "var(--border)",
        }}
        transition={{ duration: 0.25 }}
      >
        <motion.div
          className={styles.thumb}
          animate={{ x: isDark ? 27 : 3 }}
          transition={{ type: "spring", stiffness: 500, damping: 35 }}
        />
      </motion.div>
      <Moon
        size={14}
        className={`${styles.icon} ${isDark ? styles.iconActive : ""}`}
      />
    </motion.button>
  );
};

export default ThemeToggle;
