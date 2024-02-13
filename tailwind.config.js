/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

// const windmill = require('@windmill/react-ui/config');

// module.exports = windmill({
//   content: [
//   './src/**/*.{js,jsx,ts,tsx}',
//    './public/index.html',
//  ],
//   purge: [],
//   theme: {
//     extend: {
//       backgroundColor: {
//         'primary': '#dfc7f5',
//       },
//       screens: {
//         'tablet': '640px',   // Define a custom breakpoint for tablets
//         'mobile': '480px',   // Define a custom breakpoint for mobile devices
//       },
//     },
//   },
//   variants: {},
//   plugins: [
//     require('@tailwindcss/forms'),
//     require('tailwindcss'),
//     require('autoprefixer'),
//   ],
// });