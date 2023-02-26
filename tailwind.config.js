/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'primary': "#fba276",
        'primary-light': "#ffb677",
        'secondary': "#fddd13",
        'secondary-light': "#fffe13",
        'tertiary': "#60b3e0",
        'tertiary-dark': "#3f7593",
        'tertiary-light': "#6db8ff",
    },
    fontFamily: {"sans": ["Lilita One",'cursive']},
  },
  plugins: [],
}
}
