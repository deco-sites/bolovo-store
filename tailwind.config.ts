import daisyui from "daisyui";

export default {
  plugins: [daisyui],
  daisyui: { themes: [], logs: false },
  content: ["./**/*.tsx"],
  theme: {
    container: { center: true },
    extend: {
      fontFamily: {
        "AcuminPro-Bold": ["AcuminPro-Bold"],
        "AcuminPro-BoldItalic": ["AcuminPro-BoldItalic"],
        "AcuminPro-Regular": ["AcuminPro-regular"],
        "AcuminPro-Italic": ["AcuminPro-Italic"],
      },
    },  
  },
};
