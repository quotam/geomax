import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'
import plugin from 'tailwindcss/plugin'

const theme = plugin(function ({ addComponents }) {
	addComponents({
		'.container': {
			width: '100%',
			maxWidth: '160rem',
			margin: '0 auto',
			'@screen lg': {
				maxWidth: '130rem'
			},
			'@screen md': {
				maxWidth: '75rem'
			},
			'@screen sm': {
				maxWidth: '48rem'
			},
			'@screen xs': {
				maxWidth: '36rem'
			}
		}
	})
})

const config: Config = {
	darkMode: ['class'],
	content: [
		'./shared/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./entities/**/*.{ts,tsx}',
		'./kernel/**/*.{ts,tsx}',
		'./features/**/*.{ts,tsx}'
	],
	corePlugins: {
		container: false
	},
	experimental: {
		optimizeUniversalDefaults: true
	},
	theme: {
		screens: {
			lg: { raw: 'screen and (max-width: 1366px)' },
			md: { raw: 'screen and (max-width: 1024px)' },
			sm: { raw: 'screen and (max-width: 767px)' },
			xs: { raw: 'screen and (max-width: 500px)' }
		},
		fontFamily: {
			sans: ['var(--font-sans)', ...fontFamily.sans]
		},
		fontWeight: {
			normal: '400',
			medium: '600',
			bold: '700'
		},
		fontSize: {
			'0': ['0', '0'],
			xs: ['clamp(1.2rem, 0.875vw, 1.4rem)', '2rem'],
			base: ['clamp(1.4rem, 1vw, 1.6rem)', '2.4rem'],
			lg: ['1.8rem', '2.2rem'],
			xl: ['2rem', '2.8rem'],
			'2xl': ['2.4rem', '2.6rem'],
			'3xl': ['clamp(3rem, 2vw, 3.2rem)', '3.4rem'],
			heading: ['3.4rem', '3.6rem']
		},
		colors: {
			transparent: 'transparent',
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
			black: 'hsl(0, 0%, 0%)',
			border: 'hsl(var(--border))',
			input: 'hsl(var(--input))',
			ring: 'hsl(var(--ring))',
			chart: {
				'1': 'hsl(var(--chart-1))',
				'2': 'hsl(var(--chart-2))',
				'3': 'hsl(var(--chart-3))',
				'4': 'hsl(var(--chart-4))',
				'5': 'hsl(var(--chart-5))'
			}
		},
		borderColor: {
			DEFAULT: 'hsl(var(--border))',
			foreground: 'hsl(var(--foreground))',
			primary: 'hsl(var(--primary))',
			secondary: 'hsl(var(--secondary))'
		},
		borderRadius: {
			DEFAULT: 'var(--radius)',
			0: '0',
			full: '100%',
			xl: 'calc(var(--radius) + 0.4rem)',
			lg: 'var(--radius)',
			md: 'calc(var(--radius) - 0.2rem)',
			sm: 'calc(var(--radius) - 0.4rem)'
		},
		extend: {
			typography: {
				DEFAULT: {
					css: {
						color: 'inherit', // Наследуемый цвет текста
						fontSize: '1.6rem', // Наследуемый размер текста
						code: {
							color: 'inherit' // Наследуемый цвет текста
						},
						lineHeight: 'inherit', // Наследуемая высота строки
						p: {
							color: 'inherit' // Наследуемый цвет текста
						},
						span: {
							color: 'inherit' // Наследуемый цвет текста
						},
						ul: {
							color: 'inherit' // Наследуемый цвет текста
						},
						h1: {
							color: 'inherit', // Наследуемый цвет текста
							fontSize: '3.4rem',
							fontWeight: 'bold',
							lineHeight: '3.6rem'
						}
					}
				}
			},
			spacing: Object.fromEntries(
				Array.from({ length: 101 }, (_, i) => [[i], `${(i * 0.4).toFixed(1)}rem`])
			)
		}
	},
	plugins: [
		require('tailwindcss-animate'),
		require('@tailwindcss/typography'),
		theme
	]
}
export default config
