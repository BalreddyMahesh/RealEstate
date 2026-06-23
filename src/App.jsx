import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import LiveChat from "./components/LiveChat/LiveChat";
import Home from "./pages/Home";
import Listings from "./pages/Listings";
import PropertyDetails from "./pages/PropertyDetails";
import AgentProfile from "./pages/AgentProfile";
import Agents from "./pages/Agents";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Sitemap from "./pages/Sitemap";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route path="/agents" element={<Agents />} />
        <Route path="/agents/:id" element={<AgentProfile />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/sitemap" element={<Sitemap />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Navbar />
        <main style={{ flex: 1 }}>
          <AnimatedRoutes />
        </main>
        <Footer />
        <LiveChat />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "var(--bg-card)",
              color: "var(--text-primary)",
              border: "1px solid var(--border)",
              borderRadius: "12px",
              boxShadow: "var(--shadow-lg)",
              fontSize: "0.9rem",
              fontWeight: "500",
            },
            success: {
              iconTheme: { primary: "#10b981", secondary: "#fff" },
            },
            error: {
              iconTheme: { primary: "#ef4444", secondary: "#fff" },
            },
          }}
        />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
