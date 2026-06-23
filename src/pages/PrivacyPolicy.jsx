import { motion } from "framer-motion";
import { Shield, Eye, Lock, Cookie, Link as LinkIcon, UserCheck, Mail } from "lucide-react";
import styles from "./PrivacyPolicy.module.css";

const Section = ({ icon, title, children }) => (
  <div className={styles.section}>
    <div className={styles.sectionHeader}>
      <span className={styles.sectionIcon}>{icon}</span>
      <h2 className={styles.sectionTitle}>{title}</h2>
    </div>
    <div className={styles.sectionBody}>{children}</div>
  </div>
);

const PrivacyPolicy = () => (
  <motion.div
    className={styles.page}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <div className={styles.hero}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.badge}>Legal</div>
          <h1 className={styles.heroTitle}>Privacy Policy</h1>
          <p className={styles.heroSub}>
            Last updated: June 23, 2026 &nbsp;·&nbsp; Effective from January 1, 2025
          </p>
        </motion.div>
      </div>
    </div>

    <div className="container">
      <div className={styles.content}>
        <div className={styles.intro}>
          <p>
            At <strong>DreamEstate</strong>, we respect your privacy and are committed to protecting the personal
            information you share with us. This Privacy Policy explains what data we collect, how we use it,
            and the choices you have. By using our platform, you agree to the terms described below.
          </p>
        </div>

        <Section icon={<Eye size={22} />} title="1. Information We Collect">
          <p>We collect information in the following ways:</p>
          <ul>
            <li><strong>Personal Identification:</strong> Name, email address, phone number, and contact details submitted via forms or account registration.</li>
            <li><strong>Usage Data:</strong> Pages visited, search queries, filters applied, and properties viewed on our platform.</li>
            <li><strong>Device Information:</strong> IP address, browser type, device type, operating system, and referral URLs.</li>
            <li><strong>Communication Data:</strong> Messages sent to agents or our support team through the platform.</li>
            <li><strong>Location Data:</strong> Approximate location based on IP address or location permissions (if granted) to show relevant listings.</li>
          </ul>
        </Section>

        <Section icon={<Shield size={22} />} title="2. How We Use Your Information">
          <p>The information we collect is used to:</p>
          <ul>
            <li>Provide and improve our real estate search and listing services.</li>
            <li>Connect you with verified property agents and respond to your inquiries.</li>
            <li>Personalize your experience with relevant property recommendations.</li>
            <li>Send service updates, newsletters, and property alerts (only with your consent).</li>
            <li>Analyze platform usage to improve features and user experience.</li>
            <li>Detect, prevent, and address technical issues or fraudulent activity.</li>
            <li>Comply with legal obligations and enforce our Terms of Service.</li>
          </ul>
        </Section>

        <Section icon={<Lock size={22} />} title="3. Data Security">
          <p>
            We take data security seriously and implement appropriate technical and organizational measures to protect
            your personal information against unauthorized access, disclosure, alteration, or destruction.
          </p>
          <ul>
            <li>All data transmissions are encrypted using industry-standard SSL/TLS protocols.</li>
            <li>Access to personal data is restricted to authorized personnel only.</li>
            <li>We conduct regular security audits and vulnerability assessments.</li>
            <li>We do not store payment card information on our servers.</li>
          </ul>
          <p>
            While we strive to protect your data, no method of electronic transmission or storage is 100% secure.
            We encourage you to use strong passwords and keep your account credentials confidential.
          </p>
        </Section>

        <Section icon={<Cookie size={22} />} title="4. Cookies & Tracking Technologies">
          <p>
            We use cookies and similar tracking technologies to enhance your experience on DreamEstate. Cookies are
            small data files stored on your device.
          </p>
          <ul>
            <li><strong>Essential Cookies:</strong> Required for the platform to function (e.g., session management, dark/light theme preference).</li>
            <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with the platform (e.g., page views, bounce rates).</li>
            <li><strong>Preference Cookies:</strong> Remember your search filters, favorite properties, and display settings.</li>
            <li><strong>Marketing Cookies:</strong> Used to show relevant property ads on third-party sites (only with your consent).</li>
          </ul>
          <p>You can control cookie preferences through your browser settings at any time.</p>
        </Section>

        <Section icon={<LinkIcon size={22} />} title="5. Third-Party Services">
          <p>
            DreamEstate integrates with the following third-party services to deliver features on our platform:
          </p>
          <ul>
            <li><strong>Google Maps:</strong> Used to display property locations and provide directions. Google's Privacy Policy applies to their services.</li>
            <li><strong>Analytics Providers:</strong> We may use services like Google Analytics to understand platform usage patterns.</li>
            <li><strong>Email Service Providers:</strong> To send transactional emails and newsletters.</li>
            <li><strong>Payment Gateways:</strong> For any premium features, we use PCI-compliant payment processors.</li>
          </ul>
          <p>
            These third parties have their own privacy policies governing their data practices. We recommend reviewing
            them as well.
          </p>
        </Section>

        <Section icon={<UserCheck size={22} />} title="6. Your Rights">
          <p>You have the following rights regarding your personal data:</p>
          <ul>
            <li><strong>Right to Access:</strong> Request a copy of the personal data we hold about you.</li>
            <li><strong>Right to Rectification:</strong> Correct inaccurate or incomplete personal information.</li>
            <li><strong>Right to Deletion:</strong> Request deletion of your personal data, subject to legal obligations.</li>
            <li><strong>Right to Object:</strong> Opt out of marketing communications or profiling at any time.</li>
            <li><strong>Right to Data Portability:</strong> Receive your data in a structured, commonly used format.</li>
            <li><strong>Right to Withdraw Consent:</strong> Withdraw consent for data processing where consent was the basis.</li>
          </ul>
          <p>To exercise any of these rights, please contact our Data Protection Officer (details below).</p>
        </Section>

        <Section icon={<Mail size={22} />} title="7. Contact Information">
          <p>
            If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices,
            please contact us:
          </p>
          <div className={styles.contactBox}>
            <div className={styles.contactItem}>
              <strong>DreamEstate Privacy Team</strong>
            </div>
            <div className={styles.contactItem}>
              <span>Email:</span>
              <a href="mailto:privacy@dreamestate.in">privacy@dreamestate.in</a>
            </div>
            <div className={styles.contactItem}>
              <span>Address:</span>
              <span>42 Marina Bay, Connaught Place, New Delhi 110001, India</span>
            </div>
            <div className={styles.contactItem}>
              <span>Phone:</span>
              <a href="tel:+911234567890">+91 12345 67890</a>
            </div>
          </div>
          <p>
            We will respond to all requests within 30 days. If you are unsatisfied with our response, you may
            lodge a complaint with your local data protection authority.
          </p>
        </Section>

        <div className={styles.updateNote}>
          We may update this Privacy Policy from time to time. Any material changes will be notified via email or
          a prominent notice on the platform. Continued use of DreamEstate after changes constitutes acceptance
          of the updated policy.
        </div>
      </div>
    </div>
  </motion.div>
);

export default PrivacyPolicy;
