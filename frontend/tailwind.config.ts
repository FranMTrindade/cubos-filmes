import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/antd/dist/**/*.css",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#8E4EC6",
        darkBg: "#121214",
        inputBg: "#1C1C1E",
        placeholder: "#6F6D78",
      },
      borderRadius: {
        xl: "4px",
      },
    },
  },
  plugins: [],
};

export default config;
