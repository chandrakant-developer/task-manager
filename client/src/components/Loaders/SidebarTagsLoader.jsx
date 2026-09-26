export function SidebarTagsLoader() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="relative w-16 h-6 bg-gray-200 rounded overflow-hidden">
          <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
        </div>
      ))}
    </>
  );
}