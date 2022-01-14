const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
	prefix: 'tw-',
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
	colors: {
		blue: {
			default: '#336699',
		},
		brown: {
			default: '#59452a',
		},
		gold: {
			default: '#eed062',
		},
		gray: {
			default: '#333333',
			200: '#666666',
			300: '#757575',
			400: '#cccccc',
			500: '#ebebeb',
			600: '#f7f7f7',
		},
		green: {
			default: '#006e47',
		},
		orange: {
			default: '#bf4e0f',
		},
		navy: {
			default: '#004151',
			200: '#d9e3e5',
		},
		red: {
			default: '#a63535',
		},
		transparent: 'transparent',
		white: {
			default: '#ffffff',
		},
	},
	fontFamily: {
		sans: [
			'Proxima Nova W01',
			...fontFamily.sans,
		],
		mono: [...fontFamily.mono],
	},
	fontSize: {
		'7xs': '8px',
		'6xs': '9px',
		'5xs': '10px',
		'4xs': '11px',
		'3xs': '12px',
		'2xs': '13px',
		'xs': '14px',
		'sm': '15px',
		'base': '16px',
		'lg': '19px',
		'xl': '24px',
		'2xl': '32px',
		'3xl': '38px',
		'4xl': '40px',
		'5xl': '50px',
		'6xl': '60px',
	},
	fontWeight: {
		thin: 100,
		light: 300,
		normal: 400,
		semibold: 600,
		bold: 600,
	},
	extend: {
		inset: {
			'1/2': '50%',
			'full': '100%',
		},
		lineHeight: {
			tight: '1.1',
			snug: '1.2',
			normal: '1.4',
		},
		margin: {
			'1/12': '8.3333333333%',
		},
		outline: {
			blue: ['1px solid #336699', '2px'],
		},
		screens: {
			print: { raw: 'print' },
			screen: { raw: 'screen' },
			// 900px is the new mobile breakpoint
			sm: { 'max': '639px' }, // @media (max-width: 639px)
			md: '640px', // @media (min-width: 640px)
			mdOnly: { 'min': '640px', 'max': '1217px' }, // @media (min-width: 640px) and @media (max-width:1217px)
			lg: '1218px', // @media (min-width: 1218px)
			// TODO (aboyer) Override "md" breakpoint once responsive-checkout branch is merged to master.
			// md: '900px',
			// This should be removed - legacy foundation breakpoint
			smOnly: { raw: '(max-width: 899px)' },
		},
		transitionDelay: {
			'0': '0ms',
			'2000': '2000ms',
			'2500': '2500ms',
		},
	},
  },
  variants: {},
  plugins: [],
}
