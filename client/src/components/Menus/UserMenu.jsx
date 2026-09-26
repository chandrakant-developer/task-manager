import { createPortal } from "react-dom";
import { Settings, LogOut, Info, CircleHelp, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { logoutUserThunk } from "../../store/thunks/auth.thunk";

export function UserMenu({ isOpen, menuPosition, onClose, onOpenSettings }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.user);
  const { loading } = useSelector((state) => state.user);

  if (!isOpen) return null;

  async function handleLogout() {
    if (loading) return;

    try {
      await dispatch(logoutUserThunk());
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error(error.message || error.response?.data?.message || "Logout failed");
    }
  }

  return createPortal(
    <div
      className="fixed inset-0 bg-transparent z-[1000]"
      onClick={onClose}
    >
      <div
        className="w-[320px] bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden"
        style={{
          position: "fixed",
          bottom: `${menuPosition.bottom + 10}px`,
          left: `${menuPosition.left + 5}px`,
        }}
      >
        <div className="flex items-center gap-3 p-5">
          <div className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center font-semibold">
            {user?.name?.charAt(0)?.toUpperCase()}
          </div>

          <div className="min-w-0">
            <div className="font-medium text-gray-900 truncate">
              {user?.name}
            </div>

            <div className="text-sm text-gray-500 truncate">
              {user?.email}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200" />

        <div className="p-2">
          <button
            onClick={() => {
              onOpenSettings();
              onClose();
            }}
            className="flex items-center gap-3 w-full px-3 py-3 rounded-lg hover:bg-gray-100"
          >
            <Settings size={18} />
            Settings
          </button>

          <button
            disabled={loading}
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-3 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors disabled:opacity-50"
          >
            <LogOut size={18} />
            {loading ? "Signing out..." : `Sign Out ${user?.name}`}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}