import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", isDark);
    root.classList.toggle("light", !isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <button
      aria-pressed={isDark}
      onClick={() => setIsDark((s) => !s)}
      className="relative inline-flex items-center rounded-full p-1"
      title={isDark ? "Karanlık tema" : "Açık tema"}
    >
      <span className={`flex h-8 w-14 items-center rounded-full transition-colors duration-300 ${isDark ? 'bg-gray-700 border border-border/50' : 'bg-gray-200 border border-border/40'}`}>
        <span className={`inline-flex h-6 w-6 transform items-center justify-center rounded-full bg-white text-yellow-400 shadow-md transition-transform duration-300 ${isDark ? 'translate-x-6 bg-slate-800 text-white' : 'translate-x-1 bg-white text-yellow-400'}`}>
          {isDark ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.36 6.36l-1.42-1.42M7.05 6.05L5.64 4.64m12.02 0l-1.41 1.41M7.05 17.95l-1.41 1.41" />
            </svg>
          )}
        </span>
      </span>
    </button>
  );
}
