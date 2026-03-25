import { createPortal } from "react-dom";
import { Settings, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { clearUser } from "../store/slices/auth.slice";

export function UserMenu({ isOpen, menuPosition, onClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const MENU_ITEMS = [
    {
      label: "Settings",
      icon: Settings,
      path: "/settings",
    },
    {
      label: "Sign Out",
      icon: LogOut,
      action: "logout",
    },
  ];

  async function handleLogout() {
    try {
      const res = await fetch("http://localhost:5001/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Logout failed");
        return;
      }

      toast.success("Logged out successfully");

      dispatch(clearUser());

      navigate("/login");

    } catch (error) {
      console.error(error);
      toast.error("Network error");
    }
  }

  function handleClick(item) {
    if (item.action === "logout") {
      handleLogout();
    } else {
      navigate(item.path);
    }

    onClose();
  }

  return createPortal(
    <div
      className="fixed inset-0 bg-transparent z-[1000]"
      onClick={onClose}
    >
      <div
        className="flex flex-col gap-1 w-[180px] bg-white rounded-md border border-gray-200 overflow-hidden shadow-md z-[1001] origin-right"
        style={{
          position: "fixed",
          bottom: `${menuPosition.bottom}px`,
          left: `${menuPosition.left}px`,
        }}
      >
        {MENU_ITEMS.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-500 cursor-pointer transition-colors hover:bg-indigo-50 hover:text-indigo-500"
              onClick={() => handleClick(item)}
            >
              <Icon size={18} />
              <div>{item.label}</div>
            </div>
          );
        })}
      </div>
    </div>,
    document.body
  );
}