import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Eye, EyeOff } from "lucide-react";

export function ChangePasswordModal({ isOpen, onClose, onSave }) {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        }
    }, [isOpen]);

    function handleSubmit(e) {
        e.preventDefault();

        if (
            !currentPassword.trim() ||
            !newPassword.trim() ||
            !confirmPassword.trim()
        ) {
            return;
        }

        if (newPassword !== confirmPassword) {
            return;
        }

        onSave({
            currentPassword,
            newPassword,
            confirmPassword,
        });

        onClose();
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
            className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-[2100]"
            onClick={handleOverlayClick}
        >
            <div className="fixed top-1/2 left-1/2 bg-white rounded-xl shadow-xl w-[90%] max-w-[450px] overflow-hidden flex flex-col z-[9999] -translate-x-1/2 -translate-y-1/2">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-900">
                        Change Password
                    </h3>

                    <button
                        className="p-2 flex items-center justify-center text-gray-500 rounded-md transition-colors hover:bg-indigo-50 hover:text-indigo-500"
                        onClick={onClose}
                        type="button"
                    >
                        <X size={20} />
                    </button>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="p-6 space-y-4"
                >
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Current Password
                        </label>

                        <div className="relative">
                            <input
                                type={showCurrentPassword ? "text" : "password"}
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                            />

                            <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                            >
                                {showCurrentPassword ? (
                                    <EyeOff size={18} />
                                ) : (
                                    <Eye size={18} />
                                )}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            New Password
                        </label>

                        <div className="relative">
                            <input
                                type={showNewPassword ? "text" : "password"}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                            />

                            <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                            >
                                {showNewPassword ? (
                                    <EyeOff size={18} />
                                ) : (
                                    <Eye size={18} />
                                )}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Confirm Password
                        </label>

                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                            />

                            <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? (
                                    <EyeOff size={18} />
                                ) : (
                                    <Eye size={18} />
                                )}
                            </button>
                        </div>
                    </div>

                    {confirmPassword && newPassword !== confirmPassword && (
                        <p className="text-sm text-red-500">
                            Passwords do not match
                        </p>
                    )}

                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-3 rounded-md text-sm font-medium border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={
                                !currentPassword ||
                                !newPassword ||
                                !confirmPassword ||
                                newPassword !== confirmPassword
                            }
                            className="px-6 py-3 rounded-md text-sm font-medium bg-indigo-500 text-white hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Change Password
                        </button>
                    </div>
                </form>
            </div>
        </div>,
        document.body
    );
}