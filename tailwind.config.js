module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(220, 70%, 50%)',
        accent: 'hsl(160, 70%, 50%)',
        bg: 'hsl(220, 10%, 95%)',
        surface: 'hsl(0, 0%, 100%)',
        text: 'hsl(220, 10%, 10%)',
        muted: 'hsl(220, 10%, 60%)',
      },
      spacing: {
        sm: '8px',
        md: '12px',
        lg: '20px',
      },
      borderRadius: {
        sm: '6px',
        md: '10px',
        lg: '16px',
      },
      boxShadow: {
        card: '0 4px 16px hsla(0,0%,0%,0.08)',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-out',
        'slide-up': 'slideUp 0.2s ease-out',
      },
    },
  },
  plugins: [],
}
