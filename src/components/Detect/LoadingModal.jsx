import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./LoadingModal.css";

const LoadingModal = ({ isOpen, loadingStage, isReady, onReady }) => {
  const loadingMessages = {
    fetching: "Fetching resources...",
    initializing: "Initializing gesture recognizer...",
    loading: "Loading model...",
    ready: "Ready to start!",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="loading-modal-overlay"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="loading-modal-content"
          >
            {!isReady ? (
              <>
                <div className="loading-spinner">
                  <div className="spinner"></div>
                </div>
                <h2 className="loading-title">Loading</h2>
                <p className="loading-message">{loadingMessages[loadingStage] || loadingMessages.loading}</p>
                <div className="loading-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </>
            ) : (
              <>
                <div className="ready-icon">
                  <svg
                    width="64"
                    height="64"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <h2 className="loading-title">Ready!</h2>
                <p className="loading-message">Gesture recognizer is ready to use</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onReady}
                  className="ready-button"
                >
                  Access
                </motion.button>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingModal;

