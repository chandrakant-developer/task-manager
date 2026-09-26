import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { User, Mail, Phone, Pencil, Shield, KeyRound, Smartphone, Monitor, TriangleAlert, LogOut, Trash2, ChevronRight } from "lucide-react";
import { ChangePasswordModal } from "../Modals/ChangePasswordModal";
import { changePasswordThunk } from "../../store/thunks/auth.thunk";
import { handleCreateItem } from "../../helpers";
import { getErrorMessage } from "../../helpers/error.helper";
import { toast } from "react-toastify";

export function AccountSettings() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const [activeTab, setActiveTab] = useState("profile");
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);

  async function handlePasswordChange(data) {
    try {
      await dispatch(changePasswordThunk(data));
      toast.success("Password changed successfully");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  }

  return (
    <>
      <div className="flex items-center gap-2 mb-8 border-b border-gray-200">
        <button
          onClick={() => setActiveTab("profile")}
          className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === "profile"
            ? "border-indigo-500 text-indigo-600"
            : "border-transparent text-gray-500 hover:text-indigo-600"
            }`}
        >
          Profile
        </button>

        <button
          onClick={() => setActiveTab("security")}
          className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === "security"
            ? "border-amber-500 text-amber-600"
            : "border-transparent text-gray-500 hover:text-amber-600"
            }`}
        >
          Security
        </button>

        <button
          onClick={() => setActiveTab("sessions")}
          className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === "sessions"
            ? "border-emerald-500 text-emerald-600"
            : "border-transparent text-gray-500 hover:text-emerald-600"
            }`}
        >
          Sessions
        </button>

        <button
          onClick={() => setActiveTab("danger")}
          className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === "danger"
            ? "border-red-500 text-red-600"
            : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
        >
          Danger Zone
        </button>
      </div>

      <div className="w-full min-w-0">
        {activeTab === "profile" && (
          <>
            <div className="text-sm text-indigo-600">
              View and manage your personal account information.
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="border border-indigo-200 bg-indigo-50 text-indigo-700 rounded-xl p-4 hover:border-indigo-300 hover:shadow-sm transition-all">
                <div className="flex items-center gap-3">
                  <User size={22} className="text-indigo-600 shrink-0" />

                  <div className="min-w-0 flex-1">
                    <div className="text-xs mt-1">
                      Full Name
                    </div>

                    <div className="text-sm font-medium mt-1 overflow-hidden text-ellipsis whitespace-nowrap">
                      {user?.name || "-"}
                    </div>
                  </div>
                </div>
              </div>

              <div className="border border-indigo-200 rounded-xl p-4 bg-indigo-50 text-indigo-700 hover:border-indigo-300 hover:shadow-sm transition-all">
                <div className="flex items-center gap-4">
                  <Mail size={22} className="text-indigo-600 shrink-0" />

                  <div className="min-w-0 flex-1">
                    <div className="text-xs mt-1">
                      Email Address
                    </div>

                    <div
                      className="text-sm font-medium mt-1 overflow-hidden text-ellipsis whitespace-nowrap"
                      title={user?.email}
                    >
                      {user?.email || "-"}
                    </div>
                  </div>
                </div>
              </div>

              <div className="border border-indigo-200 rounded-xl p-4 bg-indigo-50 text-indigo-700 hover:border-indigo-300 hover:shadow-sm transition-all">
                <div className="flex items-center gap-4">
                  <Phone size={20} className="text-indigo-600 shrink-0" />

                  <div className="min-w-0 flex-1">
                    <div className="text-xs mt-1">
                      Phone Number
                    </div>

                    <div className="text-sm font-medium mt-1 overflow-hidden text-ellipsis whitespace-nowrap">
                      {user?.phoneNumber || "--"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                type="button"
                onClick={() => setIsEditProfileModalOpen(true)}
                className="
                  flex items-center justify-center
                  w-10 h-10
                  rounded-full
                  border border-indigo-200
                  bg-indigo-50
                  text-indigo-600
                  hover:bg-indigo-100
                  hover:border-indigo-300
                  transition-all
                "
                title="Edit Profile"
              >
                <Pencil size={18} />
              </button>
            </div>
          </>
        )}

        {activeTab === "security" && (
          <>
            <div className="text-sm text-amber-600">
              Protect your account and keep your credentials secure.
            </div>

            <div className="flex flex-wrap gap-4 mt-4">
              <div
                className="flex items-center justify-between p-4 border border-amber-200 rounded-xl bg-amber-50 text-amber-700 hover:bg-amber-100 transition-all gap-4 cursor-pointer"
                onClick={() => setIsChangePasswordModalOpen(true)}
              >
                <KeyRound size={20} className="text-amber-600" />

                <div>
                  <div className="text-sm font-medium">
                    Change Password
                  </div>

                  <div className="text-xs">
                    Update your account password
                  </div>
                </div>

                <ChevronRight size={18} className="text-amber-700" />
              </div>
            </div>
          </>
        )}

        {activeTab === "sessions" && (
          <>
            <div className="text-sm text-emerald-600">
              Monitor and manage devices currently signed in to your account.
            </div>

            <div className="flex flex-wrap gap-4 mt-4">
              <div className="flex items-center justify-between p-4 border border-emerald-200 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 gap-3 transition-all cursor-pointer">
                <Monitor size={20} className="text-emerald-600" />

                <div>
                  <div className="text-sm font-medium">
                    Current Device
                  </div>

                  <div className="text-xs">
                    This session is active
                  </div>
                </div>

                <ChevronRight size={18} className="text-emerald-700" />
              </div>

              <div className="flex items-center justify-between p-4 border border-emerald-200 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 gap-3 transition-all cursor-pointer">
                <Smartphone size={20} className="text-emerald-600" />

                <div>
                  <div className="text-sm font-medium">
                    View Other Devices
                  </div>
                </div>

                <ChevronRight size={18} className="text-emerald-700" />
              </div>
            </div>
          </>
        )}

        {activeTab === "danger" && (
          <>
            <div className="text-sm text-red-600">
              These actions are irreversible and may permanently affect your account.
            </div>

            <div className="flex flex-wrap gap-6 mt-4">
              <div className="flex items-center justify-between p-4 border border-red-200 rounded-md bg-red-50 text-red-600 hover:bg-red-100 transition-all cursor-pointer gap-3">
                <LogOut size={20} />

                <div>
                  <div className="text-sm font-medium">
                    Logout From All Devices
                  </div>
                </div>

                <ChevronRight size={18} />
              </div>

              <div className="flex items-center justify-between p-6 border border-red-200 rounded-md bg-red-50 text-red-600 hover:bg-red-100 transition-all cursor-pointer gap-3">
                <Trash2 size={20} />

                <div>
                  <div className="text-sm font-medium">
                    Delete Account
                  </div>
                </div>

                <ChevronRight size={18} />
              </div>
            </div>
          </>
        )}
      </div>

      <ChangePasswordModal
        isOpen={isChangePasswordModalOpen}
        onClose={() => setIsChangePasswordModalOpen(false)}
        onSave={(data) => { handlePasswordChange(data); }}
      />
    </>
  );
}