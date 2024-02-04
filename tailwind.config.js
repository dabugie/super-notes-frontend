/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      visibility: ['group-hover'],
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        },
        shake: {
          '0%': {
            transform: 'translateX(0)'
          },
          '25%': {
            transform: 'translateX(-5px)'
          },
          '50%': {
            transform: 'translateX(5px)'
          },
          '75%': {
            transform: 'translateX(-5px)'
          },
          '100%': {
            transform: 'translateX(0)'
          }
        },
        tada: {
          '0%': {
            transform: 'scale(1)'
          },
          '10%': {
            transform: 'scale(1) rotate(-1deg)'
          },
          '20%': {
            transform: 'scale(1) rotate(-1deg)'
          },
          '30%': {
            transform: 'scale(1.1) rotate(1deg)'
          },
          '40%': {
            transform: 'scale(1.1) rotate(-1deg)'
          },
          '50%': {
            transform: 'scale(1.1) rotate(1deg)'
          },
          '60%': {
            transform: 'scale(1.1) rotate(-1deg)'
          },
          '70%': {
            transform: 'scale(1.1) rotate(1deg)'
          },
          '80%': {
            transform: 'scale(1.1) rotate(-1deg)'
          },
          '90%': {
            transform: 'scale(1.1) rotate(1deg)'
          },
          '100%': {
            transform: 'scale(1) rotate(0)'
          }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        shake: 'shake 0.5s ease-in-out',
        tada: 'tada 1s ease-in-out'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
};
