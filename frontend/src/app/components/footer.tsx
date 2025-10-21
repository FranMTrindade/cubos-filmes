"use client";

import { useTheme } from "@/context/themeContext";

export default function Footer() {
  const { isDark } = useTheme();

  return (
    <footer
      className={`w-full h-14 flex items-center justify-center backdrop-blur-md border-t transition-colors duration-300 ${
        isDark
          ? "bg-black/90 border-white/10"
          : "bg-[#F8F8F880] border-black/10"
      }`}
    >
      <p
        className={`text-sm transition-colors duration-300 ${
          isDark ? "text-[#A1A1AA]" : "text-[#000]"
        }`}
      >
        © {new Date().getFullYear()} <span className="font-semibold">Cubos Movies</span> — Todos os direitos reservados.
      </p>
    </footer>
  );
}
