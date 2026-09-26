import { useState } from "react";
import { X } from "lucide-react";
import { GeneralSettings, ListsSettings, TagsSettings, AccountSettings, } from "../Settings";
import { SettingsSidebar } from "../Sidebar/SettingsSidebar";

export function SettingsModal({ isOpen, onClose, }) {
    const [activeTab, setActiveTab] = useState("general");

    if (!isOpen) return null;

    const renderContent = () => {
        switch (activeTab) {
            case "lists":
                return <ListsSettings />;

            case "tags":
                return <TagsSettings />;

            case "account":
                return <AccountSettings />;

            default:
                return <GeneralSettings />;
        }
    };

    return (
        <div className="fixed inset-0 z-[2000] bg-black/30 backdrop-blur-sm flex items-center justify-center">
            <div className=" flex flex-col bg-white w-[95vw] max-w-6xl h-[75vh] max-h-[700px] rounded-3xl shadow-2xl overflow-hidden">
                <div className="flex items-center justify-between px-8 py-5 border-b border-gray-200">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Settings
                    </h1>

                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-md hover:bg-gray-100 transition-colors flex items-center justify-center"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="flex flex-1 min-h-0">
                    <SettingsSidebar
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                    />

                    <main className="flex-1 overflow-y-auto px-8 py-6">
                        {renderContent()}
                    </main>
                </div>
            </div>
        </div>
    );
}