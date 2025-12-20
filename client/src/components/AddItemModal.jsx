import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

function AddItemModal({ isOpen, onClose, onSave, title, placeholder, type }) {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (isOpen) {
      setInputValue('');
    }
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    if (inputValue.trim()) {
      onSave(inputValue.trim());
      setInputValue('');
      onClose();
    }
  }

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="add-item-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleOverlayClick}
          />

          <motion.div
            className="add-item-modal"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: '-50%',
              y: '-50%',
            }}
            exit={{ opacity: 0, scale: 0.9, x: '-50%', y: '-50%' }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
            }}
          >
            <div className="add-item-modal-header">
              <h3>{title}</h3>

              <button
                className="add-item-modal-close-btn"
                onClick={onClose}
                type="button"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="add-item-modal-form">
              <div className="add-item-modal-form-group">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={placeholder}
                  className="add-item-modal-input"
                  autoFocus
                />
              </div>

              <div className="add-item-modal-actions">
                <button
                  type="button"
                  className="add-item-modal-cancel-btn"
                  onClick={onClose}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="add-item-modal-submit-btn"
                  disabled={!inputValue.trim()}
                >
                  Add
                </button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}

export default AddItemModal;

