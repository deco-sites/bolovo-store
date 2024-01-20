import daisyui from "daisyui";

export default {
  plugins: [daisyui],
  daisyui: { themes: [], logs: false },
  content: ["./**/*.tsx"],
  theme: {
    container: { center: true },
    extend: {
      fontFamily: {
        "acumin": ["Acumin"],
        "averia": ["Averia Serif Libre"],
        "eb-garamond": ["EB Garamond"],
      },
      screens: {
        "xs": "420px",
      },
      boxShadow: {
        "menu": "inset 0px 17px 23px -30px #0000005e",
      },
      animation: {
        "spin-slow": "spin 5s linear infinite",
      },
    },
  },
};
