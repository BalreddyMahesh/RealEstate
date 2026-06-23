import { motion } from "framer-motion";
import { FileText, Building2, User, Copyright, AlertTriangle, LogOut, Scale } from "lucide-react";
import styles from "./TermsOfService.module.css";

const Section = ({ icon, title, children }) => (
  <div className={styles.section}>
    <div className={styles.sectionHeader}>
      <span className={styles.sectionIcon}>{icon}</span>
      <h2 className={styles.sectionTitle}>{title}</h2>
    </div>
    <div className={styles.sectionBody}>{children}</div>
  </div>
);

const TermsOfService = () => (
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
          <h1 className={styles.heroTitle}>Terms of Service</h1>
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
            Please read these Terms of Service carefully before using the <strong>DreamEstate</strong> platform.
            By accessing or using our services, you agree to be bound by these terms. If you do not agree
            to these terms, you may not use our platform.
          </p>
        </div>

        <Section icon={<FileText size={22} />} title="1. Acceptance of Terms">
          <p>
            By accessing, browsing, or using DreamEstate (the "Platform"), you acknowledge that you have read,
            understood, and agree to be bound by these Terms of Service and our Privacy Policy.
          </p>
          <p>
            These Terms apply to all visitors, users, and others who access or use the Platform. We reserve the
            right to update or modify these Terms at any time. Continued use of the Platform after any such
            changes constitutes your acceptance of the new Terms.
          </p>
          <p>
            You must be at least 18 years of age to use our services. By using DreamEstate, you represent and
            warrant that you meet this requirement.
          </p>
        </Section>

        <Section icon={<Building2 size={22} />} title="2. Property Listings">
          <p>DreamEstate provides a platform for property listings and real estate information. Regarding listings:</p>
          <ul>
            <li>All property listings are provided for informational purposes only and are subject to availability.</li>
            <li>Property details including pricing, area, and availability may change without notice.</li>
            <li>We do not guarantee the accuracy, completeness, or currency of any listing information.</li>
            <li>Listing images are representative and may differ from the actual property.</li>
            <li>DreamEstate does not own, sell, or lease any properties listed on the Platform.</li>
            <li>Users must independently verify all property details before making purchasing or rental decisions.</li>
            <li>Fraudulent or misleading listings are prohibited and will be removed immediately.</li>
          </ul>
        </Section>

        <Section icon={<User size={22} />} title="3. User Responsibilities">
          <p>As a user of DreamEstate, you agree to:</p>
          <ul>
            <li>Provide accurate and truthful information when using our services or submitting inquiries.</li>
            <li>Use the Platform only for lawful purposes and in accordance with these Terms.</li>
            <li>Not engage in any activity that disrupts or interferes with the Platform's functionality.</li>
            <li>Not attempt to gain unauthorized access to any portion of the Platform or its systems.</li>
            <li>Not use automated tools (bots, scrapers) to collect data from the Platform without prior written consent.</li>
            <li>Not harass, abuse, or harm other users, agents, or DreamEstate staff.</li>
            <li>Keep your account credentials confidential and notify us immediately of any unauthorized access.</li>
            <li>Not upload or transmit any malicious code, viruses, or harmful content.</li>
          </ul>
        </Section>

        <Section icon={<Copyright size={22} />} title="4. Intellectual Property">
          <p>
            All content on DreamEstate, including but not limited to text, graphics, logos, images, property
            photographs, software, and user interfaces, is the exclusive property of DreamEstate or its
            content suppliers and is protected by Indian and international copyright, trademark, and other
            intellectual property laws.
          </p>
          <ul>
            <li>You may not reproduce, distribute, modify, or create derivative works without express written permission.</li>
            <li>Personal, non-commercial use of platform content is permitted with proper attribution.</li>
            <li>DreamEstate's trademarks and brand names may not be used in connection with any unauthorized products or services.</li>
            <li>User-submitted content (reviews, inquiries) grants DreamEstate a non-exclusive license to use such content on the Platform.</li>
          </ul>
        </Section>

        <Section icon={<AlertTriangle size={22} />} title="5. Limitation of Liability">
          <p>
            To the maximum extent permitted by applicable law, DreamEstate and its affiliates, officers,
            directors, employees, and agents shall not be liable for any:
          </p>
          <ul>
            <li>Indirect, incidental, special, consequential, or punitive damages.</li>
            <li>Loss of profits, data, goodwill, or other intangible losses.</li>
            <li>Damages resulting from unauthorized access to or use of our servers or personal information.</li>
            <li>Damages resulting from interruption or cessation of transmission to or from the Platform.</li>
            <li>Damages resulting from any property transaction facilitated through the Platform.</li>
          </ul>
          <p>
            DreamEstate is a platform connecting buyers, sellers, and agents. We are not a party to any
            property transactions and disclaim all liability arising from such transactions.
          </p>
          <p>
            Our aggregate liability for any claims related to our services shall not exceed INR 10,000 (ten
            thousand rupees) or the amount you paid to us in the preceding 12 months, whichever is greater.
          </p>
        </Section>

        <Section icon={<LogOut size={22} />} title="6. Account Termination">
          <p>
            We reserve the right to suspend or terminate your access to DreamEstate at our sole discretion,
            without notice, for conduct that we believe:
          </p>
          <ul>
            <li>Violates these Terms of Service or any applicable laws or regulations.</li>
            <li>Is harmful to other users, third parties, or DreamEstate's business interests.</li>
            <li>Involves fraudulent activity, spam, or misrepresentation.</li>
            <li>Compromises the security or integrity of the Platform.</li>
          </ul>
          <p>
            You may also terminate your account at any time by contacting us at
            {" "}<a href="mailto:support@dreamestate.in">support@dreamestate.in</a>.
            Upon termination, your right to use the Platform will immediately cease.
          </p>
          <p>
            Provisions that by their nature should survive termination (including intellectual property,
            disclaimer of warranties, limitation of liability, and governing law) shall remain in effect.
          </p>
        </Section>

        <Section icon={<Scale size={22} />} title="7. Governing Law">
          <p>
            These Terms of Service shall be governed by and construed in accordance with the laws of India,
            without regard to its conflict of law provisions.
          </p>
          <p>
            Any disputes arising from these Terms or your use of DreamEstate shall be subject to the exclusive
            jurisdiction of the courts located in New Delhi, India.
          </p>
          <p>
            If any provision of these Terms is found to be unenforceable or invalid, that provision shall be
            limited or eliminated to the minimum extent necessary so that these Terms shall otherwise remain
            in full force and effect.
          </p>
          <p>
            These Terms constitute the entire agreement between you and DreamEstate regarding your use of the
            Platform and supersede all prior agreements and understandings.
          </p>
        </Section>

        <div className={styles.contactSection}>
          <h3>Questions about our Terms?</h3>
          <p>
            If you have any questions or concerns about these Terms of Service, please contact our legal team:
          </p>
          <a href="mailto:legal@dreamestate.in" className={styles.contactLink}>legal@dreamestate.in</a>
        </div>
      </div>
    </div>
  </motion.div>
);

export default TermsOfService;
