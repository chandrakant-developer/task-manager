import { Plus } from "lucide-react";
import { SidebarTagsLoader } from "../../components";

export const COLORS = [
    { bg: '#dbeafe', text: '#1e40af' },
    { bg: '#d1fae5', text: '#065f46' },
    { bg: '#fef3c7', text: '#92400e' },
    { bg: '#fee2e2', text: '#991b1b' },
    { bg: '#e9d5ff', text: '#6b21a8' },
    { bg: '#fce7f3', text: '#9f1239' },
    { bg: '#cffafe', text: '#164e63' },
    { bg: '#fed7aa', text: '#9a3412' },
];

export function TagMenu({ tags, tagsLoading, tagsError, canManageItems, onAddTag }) {
    return (
        <div className="mb-3">
            <div className="flex items-center justify-between py-2 px-4 text-gray-500 text-xs font-semibold uppercase tracking-wide">
                Tags

                {canManageItems && (
                    <button
                        className="flex items-center gap-1 text-indigo-500 text-xs font-medium"
                        onClick={onAddTag}
                    >
                        <Plus size={14} />
                        <span>Add Tag</span>
                    </button>
                )}
            </div>

            <div className="flex flex-wrap gap-2 px-5 mt-2 ml-3">
                {tagsLoading ? (
                    <SidebarTagsLoader />
                ) : tagsError ? (
                    <div className="text-sm text-red-500">
                        {tagsError}
                    </div>
                ) : (
                    tags.map((tag, index) => {
                        const color = COLORS[index % COLORS.length];

                        return (
                            <div
                                key={tag._id}
                                className="flex items-center gap-1 px-3 py-1 border border-black/10 rounded-md text-sm font-medium whitespace-nowrap transition hover:opacity-90 hover:-translate-y-px hover:shadow-sm"
                                style={{
                                    backgroundColor: color.bg,
                                    color: color.text,
                                }}
                            >
                                {tag.name}
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}