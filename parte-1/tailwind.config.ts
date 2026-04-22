import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        green: "#B9FF66",
        dark: "#191A23",
        gray: "#F3F3F3",
      },
      spacing: {
        section: "100px",
        "section-b": "140px",
        "card-p": "50px",
        "panel-y": "70px",
        "panel-x": "60px",
        "btn-x": "35px",
      },
      fontFamily: {
        sans: ["Space Grotesk", "sans-serif"],
      },
      borderRadius: {
        card: "45px",
        btn: "14px",
      },
      boxShadow: {
        card: "0px 5px 0px 0px #191A23",
      },
      maxWidth: {
        container: "1440px",
      },
    },
  },
  plugins: [],
};

export default config;
