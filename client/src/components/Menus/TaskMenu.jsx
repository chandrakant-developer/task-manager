import { Calendar, CalendarDays, Clock, Star } from 'lucide-react';
import { SidebarItemsLoader } from "../../components"

const SMART_FILTER_OPTIONS = [
    {
        id: 'all',
        label: 'All',
        icon: Clock
    },
    {
        id: 'today',
        label: 'Todays',
        icon: Calendar
    },
    {
        id: 'upcoming',
        label: 'Upcoming',
        icon: CalendarDays
    },
    {
        id: 'completed',
        label: 'Completed',
        icon: Clock
    },
    {
        id: 'starred',
        label: 'Starred',
        icon: Star
    },
];

export function TaskMenu({ activeFilter, todoCounts, todoCountsLoading, onFilterChange }) {
    return (
        <div className="mt-2 mb-3">
            <div className="py-2 px-4 text-gray-500 text-xs font-semibold uppercase tracking-wide">
                Tasks
            </div>

            <ul className="list-none pl-6 pr-2">
                {todoCountsLoading ? (
                    <SidebarItemsLoader />
                ) : (
                    SMART_FILTER_OPTIONS.map((item) => {
                        const Icon = item.icon;
                        const count = todoCounts?.[item.id] || 0;

                        return (
                            <li key={item.id}>
                                <button
                                    className={`w-full flex items-center justify-between px-2 py-2 text-sm rounded
                                    ${activeFilter === item.id ? "bg-indigo-100 text-indigo-600" : "text-gray-600 hover:bg-indigo-50"}`}
                                    onClick={() => onFilterChange(item.id)}
                                >
                                    <div className="flex items-center gap-2">
                                        <Icon size={16} />
                                        <span>{item.label}</span>
                                    </div>

                                    <div className="w-7 h-5 bg-gray-200 rounded text-xs flex items-center justify-center">
                                        {count}
                                    </div>
                                </button>
                            </li>
                        );
                    })
                )}
            </ul>
        </div>
    );
}