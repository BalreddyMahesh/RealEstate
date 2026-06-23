import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import ContactForm from "../components/ContactForm/ContactForm";
import styles from "./Contact.module.css";

const contactInfo = [
  {
    icon: <MapPin size={22} />,
    title: "Visit Our Office",
    lines: ["42 Marina Bay, Connaught Place", "New Delhi, 110001"],
    color: "#2563eb",
  },
  {
    icon: <Phone size={22} />,
    title: "Call Us",
    lines: ["+91 12345 67890", "+91 98765 43210"],
    color: "#0ea5e9",
  },
  {
    icon: <Mail size={22} />,
    title: "Email Us",
    lines: ["hello@dreamhome.in", "support@dreamhome.in"],
    color: "#10b981",
  },
  {
    icon: <Clock size={22} />,
    title: "Working Hours",
    lines: ["Mon – Sat: 9AM – 7PM", "Sunday: 10AM – 4PM"],
    color: "#f59e0b",
  },
];

const Contact = () => {
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
          >
            <span className="section-label">Get In Touch</span>
            <h1 className={styles.title}>We'd Love to Hear From You</h1>
            <p className={styles.subtitle}>
              Have questions about a property, need expert advice, or want to list your property? Reach out to us.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container">
        {/* Contact Info Cards */}
        <div className={styles.infoGrid}>
          {contactInfo.map((info, i) => (
            <motion.div
              key={info.title}
              className={styles.infoCard}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <div className={styles.infoIcon} style={{ background: `${info.color}15`, color: info.color }}>
                {info.icon}
              </div>
              <h3 className={styles.infoTitle}>{info.title}</h3>
              {info.lines.map((line) => (
                <p key={line} className={styles.infoLine}>{line}</p>
              ))}
            </motion.div>
          ))}
        </div>

        <div className={styles.mainLayout}>
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <ContactForm
              title="Send Us a Message"
              subtitle="Our team will get back to you within 24 hours with expert guidance."
            />
          </motion.div>

          {/* Map + Additional */}
          <motion.div
            className={styles.rightCol}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className={styles.mapCard}>
              <div className={styles.mapPlaceholder}>
                <MapPin size={44} className={styles.mapPin} />
                <h4>Our Office Location</h4>
                <p>42 Marina Bay, Connaught Place<br />New Delhi, 110001</p>
              </div>
            </div>

            <div className={styles.chatCard}>
              <div className={styles.chatIcon}>
                <MessageCircle size={28} />
              </div>
              <div>
                <h4 className={styles.chatTitle}>Live Chat Support</h4>
                <p className={styles.chatDesc}>Chat with our team in real-time for immediate assistance.</p>
              </div>
              <button className={styles.chatBtn}>Start Chat</button>
            </div>

            <div className={styles.faqCard}>
              <h4 className={styles.faqTitle}>Quick Answers</h4>
              {[
                { q: "How do I schedule a property visit?", a: "Call us or fill the contact form and our agent will arrange a visit within 24 hours." },
                { q: "Are your listings verified?", a: "Yes, every listing is verified by our team for authenticity and accuracy." },
                { q: "Do you charge brokerage?", a: "We offer zero brokerage on selected properties. Contact us for details." },
              ].map((faq) => (
                <details key={faq.q} className={styles.faqItem}>
                  <summary className={styles.faqQ}>{faq.q}</summary>
                  <p className={styles.faqA}>{faq.a}</p>
                </details>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
