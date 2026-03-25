export function SidebarItemsSkeleton() {
  return (
    <li>
      <div className="flex items-center justify-between px-2 py-2">
        <div className="flex items-center gap-2">
          <div className="relative w-4 h-4 bg-gray-200 rounded overflow-hidden">
            <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
          </div>

          <div className="relative w-24 h-3 bg-gray-200 rounded overflow-hidden">
            <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
          </div>
        </div>

        <div className="relative w-7 h-5 bg-gray-200 rounded overflow-hidden">
          <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
        </div>
      </div>
    </li>
  );
}