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
      },
      screens: {
        "xs": "420px",
      },
      boxShadow: {
        "menu": "inset 0px 17px 23px -30px #0000005e",
      },
    },
  },
};
