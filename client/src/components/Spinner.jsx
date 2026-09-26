export function Spinner({ height = "min-h-screen" }) {
    return (
        <div className={`flex items-center justify-center ${height}`}>
            <div className="w-12 h-12 border-5 border-gray-300 border-t-purple-500 rounded-full animate-spin"></div>
        </div>
    );
}
