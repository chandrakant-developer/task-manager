import { useState } from "react";
import { Monitor, Sun, Moon } from "lucide-react";

export function GeneralSettings() {
  const [theme, setTheme] = useState("system");

  return (
    <div className="w-full min-w-0 bg-transparent">
      <div className="flex flex-col gap-8">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Theme
          </h3>

          <p className="text-sm text-gray-500 mb-5">
            Choose how the application looks.
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setTheme("light")}
              className={`flex items-center gap-3 px-5 py-3 border rounded-xl transition-all ${
                theme === "light"
                  ? "border-indigo-500 bg-indigo-50 text-indigo-600"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <Sun size={18} />
              Light
            </button>

            <button
              onClick={() => setTheme("dark")}
              className={`flex items-center gap-3 px-5 py-3 border rounded-xl transition-all ${
                theme === "dark"
                  ? "border-indigo-500 bg-indigo-50 text-indigo-600"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <Moon size={18} />
              Dark
            </button>

            <button
              onClick={() => setTheme("system")}
              className={`flex items-center gap-3 px-5 py-3 border rounded-xl transition-all ${
                theme === "system"
                  ? "border-indigo-500 bg-indigo-50 text-indigo-600"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <Monitor size={18} />
              System
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}