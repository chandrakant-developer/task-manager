import { createPortal } from "react-dom";
import { Settings, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function UserMenu({ isOpen, menuPosition, onClose }) {
    const navigate = useNavigate();

    if (!isOpen) return null;

    return createPortal(
        <div
            className="fixed inset-0 bg-transparent z-[1000]"
            onClick={onClose}
        >
            <div
                className="w-[180px] py-2 bg-white rounded-lg border border-gray-200 overflow-hidden flex flex-col gap-1 shadow-md z-[1001] origin-right"
                style={{
                    position: "fixed",
                    bottom: `${menuPosition.bottom}px`,
                    left: `${menuPosition.left}px`,
                }}
            >
                <button
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-500 cursor-pointer transition-colors hover:bg-indigo-50 hover:text-indigo-500"
                    onClick={() => {
                        navigate("/settings");
                        onClose();
                    }}
                >
                    <Settings size={18} />
                    <span>Settings</span>
                </button>

                <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-500 cursor-pointer transition-colors hover:bg-indigo-50 hover:text-indigo-500" >
                    <LogOut size={18} />
                    <span>Sign Out</span>
                </button>
            </div>
        </div>,
        document.body
    );
}