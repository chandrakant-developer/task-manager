import { Settings, Folder, Tags, User, } from "lucide-react";

const ITEMS = [
  {
    id: "general",
    label: "General",
    icon: Settings,
  },
  {
    id: "lists",
    label: "Lists",
    icon: Folder,
  },
  {
    id: "tags",
    label: "Tags",
    icon: Tags,
  },
  {
    id: "account",
    label: "Account",
    icon: User,
  },
];

export function SettingsSidebar({ activeTab, setActiveTab, }) {
  return (
    <aside className="w-60 border-r border-gray-200 p-5">
      <div className="flex flex-col gap-1">
      {ITEMS.map((item) => {
        const Icon = item.icon;

        const isActive =
          activeTab === item.id;

        return (
          <button
            key={item.id}
            onClick={() =>
              setActiveTab(item.id)
            }
            className={` relative flex items-center gap-3 w-full px-4 py-2 rounded-xl text-left transition-all duration-200

              ${ isActive ? ` text-indigo-600 ` : ` text-gray-700 hover:bg-gray-100 ` }
            `}
          >
            <Icon size={18} />

            <span className="font-medium">
              {item.label}
            </span>

            {isActive && (
              <div className="ml-auto w-2 h-2 rounded-full bg-indigo-500" />
            )}
          </button>
        );
      })}
    </div>
    </aside>
  );
}