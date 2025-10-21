"use client";

import Image from "next/image";
import { Button } from "antd";
import { SunOutlined, MoonOutlined } from "@ant-design/icons";
import { useTheme } from "@/context/themeContext";
import { useAuth } from "@/context/authContext";
import { useEffect, useState } from "react";
import logoDesk from "@/public/logodesk.png";
import logoMobile from "@/public/logomobile.png";

export default function Header() {
  const { isDark, toggleTheme } = useTheme();
  const { logout } = useAuth();
  const [isMobile, setIsMobile] = useState(false);

  // calcula se é mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header
      className={`w-full h-14 flex items-center justify-between px-6 backdrop-blur-md border-b  transition-colors duration-300 ${
        isDark
          ? "bg-black/90 border-white/10"
          : "bg-[#2B292D] border-black/10"
      }`}
    >
      <div className="flex items-center gap-2">
        <Image
          src={isMobile ? logoMobile : logoDesk}
          alt="Cubos Movies Logo"
          width={isMobile ? 36 : 160}
          height={isMobile ? 35 : 36}
          priority
        />
        <h1
          className={`font-semibold tracking-wide transition-colors ${
            isDark ? "text-[#E4E4E7]" : "text-[#6F6D78]"
          } ${isMobile ? "text-[20px]" : "text-[24px]"}`}
        >
          Movies
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <Button
          shape="circle"
          size="large"
          onClick={toggleTheme}
          className={`border-none transition-colors duration-300 ${
            isDark
              ? "bg-[#1E1E1E] text-white hover:bg-[#2B2B2B]"
              : "bg-[#EDEDED] text-[#6F6D78] hover:bg-[#D8D8D8]"
          }`}
          icon={isDark ? <SunOutlined /> : <MoonOutlined />}
        />

        <Button
          type="primary"
          className={`border-none font-medium px-5 transition-colors duration-300 ${
            isDark
              ? "bg-[#8E4EC6] hover:!bg-[#7d3db4]"
              : "bg-[#BE93E4] hover:!bg-[#a56fd8] text-[#F7F7F7]"
          }`}
          onClick={logout}
        >
          Logout
        </Button>
      </div>
    </header>
  );
}
