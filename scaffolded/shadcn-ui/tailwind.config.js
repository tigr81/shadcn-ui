/** @type {import('tailwindcss').Config} */

export default {
	darkMode: ["class"],
	content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
	theme: {
		extend: {
			fontSize: {
				regular: 'var(--font-size-regular)',
				medium: 'var(--font-size-medium)'
			},
			fontWeight: {
				regular: 'var(--font-weight-regular)',
				medium: 'var(--font-weight-medium)'
			},
			fontFamily: {
				mono: 'var(--font-family-mono)',
				serif: 'var(--font-family-serif)'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				xl: 'calc(var(--radius) + 4px)'
			},
			colors: {
				'accent-primary': 'hsl(var(--accent-primary))',
				'accent-secondary': 'hsl(var(--accent-secondary))',
				'accent-tertiary': 'hsl(var(--accent-tertiary))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			backgroundImage: {
				'gradient-accent': 'linear-gradient(84.31deg, hsl(var(--accent-primary)) -0.15%, hsl(var(--accent-secondary)) 102.45%)',
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'progress': {
					'0%': { transform: 'translateX(-100%)' },
					'50%': { transform: 'translateX(0%)' },
					'100%': { transform: 'translateX(100%)' }
				},
				'float': {
					'0%': { transform: 'translateY(0px) rotate(0deg)' },
					'50%': { transform: 'translateY(-20px) rotate(10deg)' },
					'100%': { transform: 'translateY(0px) rotate(0deg)' }
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'fade-in-down': {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'spin-slow': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' }
				},
				'bounce-slow': {
					'0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
					'50%': { transform: 'translateY(-25px) rotate(-15deg)' }
				},
				'pulse-slow': {
					'0%, 100%': { opacity: '1', transform: 'scale(1)' },
					'50%': { opacity: '0.8', transform: 'scale(1.1)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'progress': 'progress 1.5s ease-in-out infinite',
				'float-slow': 'float 15s ease-in-out infinite',
				'fade-in': 'fade-in 0.5s ease-in-out forwards',
				'fade-in-down': 'fade-in-down 0.6s ease-in-out forwards',
				'spin-slow': 'spin-slow 20s linear infinite',
				'bounce-slow': 'bounce-slow 12s ease-in-out infinite',
				'pulse-slow': 'pulse-slow 8s ease-in-out infinite'
			}
		}
	},
	plugins: [
		require("tailwindcss-animate"),
		require('tailwind-scrollbar-hide'),
		function ({ addUtilities, theme }) {
			const createGradientBorder = (width) => ({
				position: 'relative',
				'&::before': {
					content: '""',
					position: 'absolute',
					inset: -1,
					padding: `${width}px`, // Border width
					borderRadius: 'inherit',
					background: theme('backgroundImage.gradient-accent'),
					WebkitMask:
						'linear-gradient(#fff 0 0) content-box, ' +
						'linear-gradient(#fff 0 0)',
					WebkitMaskComposite: 'xor',
					maskComposite: 'exclude',
					pointerEvents: 'none',
				}
			});

			const gradientBorderUtilities = {
				'.gradient-border': createGradientBorder(1),
				'.gradient-border-1': createGradientBorder(1),
				'.gradient-border-2': createGradientBorder(2),
				'.gradient-border-4': createGradientBorder(4)
			};
			
			addUtilities(gradientBorderUtilities);
		},
		function ({ addUtilities }) {
			const newUtilities = {
				'.animation-delay-300': {
					'animation-delay': '300ms',
				},
				'.animation-delay-500': {
					'animation-delay': '500ms',
				},
				'.animation-delay-700': {
					'animation-delay': '700ms',
				},
			}
			addUtilities(newUtilities)
		},

	],
};
