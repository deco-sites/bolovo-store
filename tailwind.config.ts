import daisyui from "daisyui";

export default {
  plugins: [daisyui],
  daisyui: { themes: [], logs: false },
  content: ["./**/*.tsx"],
  theme: {
    container: { center: true },
    extend: {
      fontFamily: {
        "rubik": ["Rubik"],
        "acumin": ["Acumin"],
        "ouroboros": ["Ouroboros"],
        "averia": ["Averia Serif Libre"],
        "eb-garamond": ["EB Garamond"],
      },
      screens: {
        "xs": "420px",
        "3xl": "1600px",
      },
      aspectRatio: {
        "240/300": "240 / 300",
        "270/300": "270 / 300",
      },
      scrollbarWidth: {
        thin: "thin",
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
