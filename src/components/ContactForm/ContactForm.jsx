import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Send, User, Mail, Phone, MessageSquare } from "lucide-react";
import toast from "react-hot-toast";
import Button from "../Button/Button";
import styles from "./ContactForm.module.css";

// Defined OUTSIDE the component so React never remounts inputs on parent re-render
const Field = ({ label, icon, type = "text", placeholder, as = "input", value, error, onChange }) => (
  <div className={styles.field}>
    <label className={styles.label}>{label}</label>
    <div className={`${styles.inputWrap} ${error ? styles.error : ""}`}>
      <span className={styles.fieldIcon}>{icon}</span>
      {as === "textarea" ? (
        <textarea
          className={styles.textarea}
          placeholder={placeholder}
          rows={4}
          value={value}
          onChange={onChange}
        />
      ) : (
        <input
          type={type}
          className={styles.input}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      )}
    </div>
    {error && <span className={styles.errorMsg}>{error}</span>}
  </div>
);

const validate = (form) => {
  const e = {};
  if (!form.name.trim()) e.name = "Name is required";
  if (!form.email.trim()) e.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email address";
  if (form.phone && !/^\+?[\d\s\-()]{7,15}$/.test(form.phone)) e.phone = "Enter a valid phone number";
  if (!form.message.trim()) e.message = "Message is required";
  else if (form.message.trim().length < 10) e.message = "Message must be at least 10 characters";
  return e;
};

const ContactForm = ({
  title = "Get In Touch",
  subtitle = "Fill out the form and our team will get back to you within 24 hours.",
}) => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = useCallback((field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => (prev[field] ? { ...prev, [field]: "" } : prev));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    toast.success("Inquiry submitted successfully!", { duration: 4000 });
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <motion.div
      className={styles.wrapper}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.formHeader}>
        <h3 className={styles.formTitle}>{title}</h3>
        <p className={styles.formSubtitle}>{subtitle}</p>
      </div>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <div className={styles.row}>
          <Field
            label="Your Name"
            icon={<User size={16} />}
            placeholder="Rahul Sharma"
            value={form.name}
            error={errors.name}
            onChange={handleChange("name")}
          />
          <Field
            label="Email Address"
            icon={<Mail size={16} />}
            type="email"
            placeholder="rahul@example.com"
            value={form.email}
            error={errors.email}
            onChange={handleChange("email")}
          />
        </div>
        <Field
          label="Phone Number (Optional)"
          icon={<Phone size={16} />}
          type="tel"
          placeholder="+91 98765 43210"
          value={form.phone}
          error={errors.phone}
          onChange={handleChange("phone")}
        />
        <Field
          label="Your Message"
          icon={<MessageSquare size={16} />}
          as="textarea"
          placeholder="Tell us about your property requirements..."
          value={form.message}
          error={errors.message}
          onChange={handleChange("message")}
        />
        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          loading={loading}
          icon={<Send size={16} />}
          iconPosition="right"
        >
          Send Message
        </Button>
      </form>
    </motion.div>
  );
};

export default ContactForm;
