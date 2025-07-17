// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"], // adjust as per project
  theme: {
    extend: {
      fontFamily: {
        inter: ['"Inter"', 'sans-serif'],
        poetsen: ['"Poetsen One"', 'cursive'],
      },
      colors: {
        bg: "#070806",
        textPrimary: "#48e0d3",
        textSecondary: "#c6c7c6",
        buttonDark: "#231f20",
      },
      maxWidth: {
        container: "1660px",
      },
      fontSize: {
        sm: "16px",
        policyP: "18px",
        policyH4: "20px",
        smallSpan: "12px",
      },
      lineHeight: {
        sm: "26px",
        policy: "29px",
      },
      backgroundImage: {
        hero: "url('/pkVckAy4hre6SOgAjgjXMYt9vc0.avif')",
      },
      backdropBlur: {
        custom: '10px',
      },
      spacing: {
        heroTop: "clamp(60px, 8vw, 100px)",
      },
    },
  },
  plugins: [],
};
