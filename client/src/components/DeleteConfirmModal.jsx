import { createPortal } from 'react-dom';
import { AlertTriangle, X } from 'lucide-react';

export function DeleteConfirmModal({ 
  isOpen,
  onClose,
  onConfirm,
  itemName,
  title = 'Delete Task',
  message = 'Are you sure you want to delete this task?'
}) {
  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  function handleConfirm() {
    onConfirm();
    onClose();
  }

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-[1001]"
      onClick={handleOverlayClick}
    >
      <div className="fixed top-1/2 left-1/2 bg-white rounded-xl shadow-xl w-[90%] max-w-[600px] overflow-hidden flex flex-col z-[9999] -translate-x-1/2 -translate-y-1/2">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h3 className='text-xl font-semibold text-gray-900'>
            {title}
          </h3>

          <button
            type="button"
            className="p-2 flex items-center justify-center text-gray-500 rounded-md cursor-pointer transition-colors hover:bg-indigo-50 hover:text-indigo-500"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-4 mb-6 p-4 bg-rose-500/10 rounded-lg">
            <AlertTriangle size={24} className="text-rose-500 shrink-0" />
            
            <div className="flex-1">
              <p className="m-0 text-gray-900 leading-relaxed">
                {message}
              </p>

              {itemName && (
                <p className="mt-2 mb-0 text-gray-900 leading-relaxed">
                  <strong>"{itemName}"</strong>
                </p>
              )}

              <p className="mt-2 mb-0 text-sm text-gray-500 leading-relaxed">
                This action cannot be undone.
              </p>
            </div>
          </div>

          <div className="flex gap-3 justify-end">
            <button
              type="button"
              className="px-6 py-3 rounded-md text-sm font-medium border border-gray-200 bg-white text-gray-500 transition-all duration-200 hover:bg-gray-50 hover:text-gray-900"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="button"
              className="px-6 py-3 rounded-md text-sm font-medium cursor-pointer transition-all duration-200 border-none bg-rose-500 text-white hover:bg-rose-600"
              onClick={handleConfirm}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}