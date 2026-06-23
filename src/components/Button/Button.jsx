import { motion } from "framer-motion";
import styles from "./Button.module.css";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  loading = false,
  disabled = false,
  fullWidth = false,
  onClick,
  type = "button",
  className = "",
}) => {
  return (
    <motion.button
      type={type}
      className={`${styles.btn} ${styles[variant]} ${styles[size]} ${fullWidth ? styles.fullWidth : ""} ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={!disabled && !loading ? { scale: 1.02, y: -1 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
      transition={{ duration: 0.15 }}
    >
      {loading ? (
        <span className={styles.spinner} />
      ) : (
        <>
          {icon && iconPosition === "left" && <span className={styles.icon}>{icon}</span>}
          <span>{children}</span>
          {icon && iconPosition === "right" && <span className={styles.icon}>{icon}</span>}
        </>
      )}
    </motion.button>
  );
};

export default Button;
