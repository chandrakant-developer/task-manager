import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';

function DeleteConfirmModal({ isOpen, onClose, onConfirm, taskTitle }) {
  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  function handleConfirm() {
    onConfirm();
    onClose();
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
              width: '90%',
              maxWidth: '600px',
            }}
          >
            <div className="add-item-modal-header">
              <h3>Delete Task</h3>

              <button
                className="add-item-modal-close-btn"
                onClick={onClose}
                type="button"
              >
                <X size={20} />
              </button>
            </div>

            <div className="add-item-modal-form">
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '1.5rem',
                  padding: '1rem',
                  background: 'rgba(239, 68, 68, 0.1)',
                  borderRadius: '8px',
                }}
              >
                <AlertTriangle size={24} color="#ef4444" style={{ flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, color: 'var(--text-main)', lineHeight: '1.5' }}>
                    Are you sure you want to delete this task?
                  </p>
                  {taskTitle && (
                    <p style={{ margin: '0.5rem 0 0 0', color: 'var(--text-main)', lineHeight: '1.5' }}>
                      <strong>"{taskTitle}"</strong>
                    </p>
                  )}
                  <p
                    style={{
                      margin: '0.5rem 0 0 0',
                      fontSize: '0.875rem',
                      color: 'var(--text-muted)',
                      lineHeight: '1.5',
                    }}
                  >
                    This action cannot be undone.
                  </p>
                </div>
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
                  type="button"
                  className="add-item-modal-submit-btn"
                  onClick={handleConfirm}
                  style={{
                    background: 'var(--danger)',
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}

export default DeleteConfirmModal;

