import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

export function AddItemModal({ isOpen, onClose, onSave, title, placeholder }) {
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

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-[1001]"
      onClick={handleOverlayClick}
    >
      <div className="fixed top-1/2 left-1/2 bg-white rounded-xl shadow-xl w-[90%] max-w-[400px] overflow-hidden flex flex-col z-[9999] -translate-x-1/2 -translate-y-1/2">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h3 className='text-xl font-semibold text-gray-900'>
            {title}
          </h3>

          <button
            className="p-2 flex items-center justify-center text-gray-500 rounded-md cursor-pointer transition-colors hover:bg-indigo-50 hover:text-indigo-500"
            onClick={onClose}
            type="button"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={placeholder}
              className="w-full px-4 py-3 border border-gray-200 rounded-md text-base bg-white transition-colors focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 placeholder:text-gray-500"
              autoFocus
            />
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
              type="submit"
              className="px-6 py-3 rounded-md text-sm font-medium bg-indigo-500 text-white transition-all duration-200 hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!inputValue.trim()}
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}