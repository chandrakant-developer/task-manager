import { Folder, Plus } from "lucide-react";
import { SidebarItemsLoader } from "../../components";

export const COLORS = ['#3b82f6', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#f97316'];

export function ListMenu({ lists, listsLoading, listsError, listCounts, canManageItems, onAddList }) {
    return (
        <div className="mb-3">
            <div className="flex items-center justify-between py-2 px-4 text-gray-500 text-xs font-semibold uppercase tracking-wide">
                Lists

                {canManageItems && (
                    <button
                        className="flex items-center gap-1 text-indigo-500 text-xs font-medium"
                        onClick={onAddList}
                    >
                        <Plus size={14} />
                        <span>Add List</span>
                    </button>
                )}
            </div>

            <ul className="list-none pl-6 pr-2">
                {listsLoading ? (
                    <SidebarItemsLoader />
                ) : listsError ? (
                    <div className="p-2 text-sm text-red-500">
                        {listsError}
                    </div>
                ) : (
                    lists.map((list, index) => (
                        <li key={list._id}>
                            <div className="w-full flex items-center justify-between px-2 py-2 text-sm text-gray-600 rounded hover:bg-indigo-50">
                                <div className="flex items-center gap-2">
                                    <Folder
                                        size={16}
                                        style={{
                                            color: COLORS[index % COLORS.length],
                                            fill: COLORS[index % COLORS.length],
                                        }}
                                    />

                                    <span>{list.name}</span>
                                </div>

                                <div className="w-7 h-5 bg-gray-200 rounded text-xs flex items-center justify-center">
                                    {listCounts[list.name] || 0}
                                </div>
                            </div>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}