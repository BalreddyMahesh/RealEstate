import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import styles from "./LiveChat.module.css";

const BOT_REPLIES = [
  "Hello! How can I help you today?",
  "Our agent will contact you shortly.",
  "Please provide your contact details and we'll reach out!",
  "We have amazing properties across 120+ cities in India.",
  "You can browse our listings to find your dream home.",
  "Our team is available Mon–Sat, 9 AM to 7 PM.",
  "Would you like to schedule a property visit?",
  "We offer home loans at competitive interest rates.",
  "Feel free to call us at +91 12345 67890 for immediate assistance.",
  "Thank you for reaching out to DreamEstate!",
];

const formatTime = (date) =>
  date.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });

let msgIdCounter = 0;
const mkId = () => ++msgIdCounter;

const INITIAL_MESSAGES = [
  {
    id: mkId(),
    from: "bot",
    text: "👋 Hi there! Welcome to DreamEstate. How can I help you find your perfect property today?",
    time: new Date(),
  },
];

const LiveChat = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [unread, setUnread] = useState(0);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      setUnread(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const sendMessage = useCallback(() => {
    const text = input.trim();
    if (!text) return;

    const userMsg = { id: mkId(), from: "user", text, time: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    const delay = 800 + Math.random() * 800;
    setTimeout(() => {
      const reply = BOT_REPLIES[Math.floor(Math.random() * BOT_REPLIES.length)];
      setTyping(false);
      setMessages((prev) => [
        ...prev,
        { id: mkId(), from: "bot", text: reply, time: new Date() },
      ]);
      if (!open) setUnread((n) => n + 1);
    }, delay);
  }, [input, open]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        className={styles.fab}
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        aria-label="Toggle live chat"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
              <X size={24} />
            </motion.span>
          ) : (
            <motion.span key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}>
              <MessageCircle size={24} />
            </motion.span>
          )}
        </AnimatePresence>
        {!open && unread > 0 && (
          <span className={styles.badge}>{unread}</span>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.window}
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
          >
            {/* Header */}
            <div className={styles.header}>
              <div className={styles.headerLeft}>
                <div className={styles.botAvatar}>
                  <Bot size={18} />
                </div>
                <div>
                  <div className={styles.headerTitle}>DreamEstate Support</div>
                  <div className={styles.headerStatus}>
                    <span className={styles.statusDot} />
                    Online — typically replies instantly
                  </div>
                </div>
              </div>
              <button className={styles.closeBtn} onClick={() => setOpen(false)} aria-label="Close chat">
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className={styles.messages}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  className={`${styles.msgRow} ${msg.from === "user" ? styles.userRow : styles.botRow}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {msg.from === "bot" && (
                    <div className={styles.avatarSmall}><Bot size={14} /></div>
                  )}
                  <div className={styles.bubble}>
                    <p className={styles.msgText}>{msg.text}</p>
                    <span className={styles.timestamp}>{formatTime(msg.time)}</span>
                  </div>
                  {msg.from === "user" && (
                    <div className={`${styles.avatarSmall} ${styles.userAvatar}`}><User size={14} /></div>
                  )}
                </motion.div>
              ))}

              {/* Typing indicator */}
              <AnimatePresence>
                {typing && (
                  <motion.div
                    className={`${styles.msgRow} ${styles.botRow}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className={styles.avatarSmall}><Bot size={14} /></div>
                    <div className={styles.bubble}>
                      <div className={styles.typingDots}>
                        <span /><span /><span />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className={styles.inputArea}>
              <input
                ref={inputRef}
                className={styles.chatInput}
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                maxLength={500}
              />
              <button
                className={styles.sendBtn}
                onClick={sendMessage}
                disabled={!input.trim()}
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </div>

            <div className={styles.footer}>
              Powered by <strong>DreamEstate AI</strong>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LiveChat;
