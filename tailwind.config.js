/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
      './src/components/**/*.{js,ts,jsx,tsx,mdx}',
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {
        colors: {
          'primary': '#4F46E5', // Adjust to your brand color
          'secondary': '#10B981',
          'accent': '#F59E0B',
          'danger': '#EF4444',
        },
      },
    },
    plugins: [
      require('@tailwindcss/forms'),
    ],
  }