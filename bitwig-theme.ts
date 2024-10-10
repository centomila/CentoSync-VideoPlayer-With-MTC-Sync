
import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';
import { getThemeProperties } from "@skeletonlabs/tw-plugin";


export const bitwigTheme: CustomThemeConfig = {
	name: 'bitwig',
	properties: {
		// ...getThemeProperties("skeleton"),
		// =~= Theme Properties =~=
		"--theme-font-family-base": `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
		"--theme-font-family-heading": `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
		"--theme-font-color-base": "0 0 0",
		"--theme-font-color-dark": "255 255 255",
		"--theme-rounded-base": "4px",
		"--theme-rounded-container": "4px",
		"--theme-border-base": "2px",
		// =~= Theme On-X Colors =~=
		"--on-primary": "var(--color-surface-900)",
		"--on-secondary": "var(--color-surface-900)",
		"--on-tertiary": "0 0 0",
		"--on-success": "0 0 0",
		"--on-warning": "255 255 255",
		"--on-error": "255 255 255",
		"--on-surface": "255 255 255",
		// =~= Theme Colors  =~=
		// primary | #ff8713 
		"--color-primary-50": "255 237 220", // #ffeddc
		"--color-primary-100": "255 231 208", // #ffe7d0
		"--color-primary-200": "255 225 196", // #ffe1c4
		"--color-primary-300": "255 207 161", // #ffcfa1
		"--color-primary-400": "255 171 90", // #ffab5a
		"--color-primary-500": "255 135 19", // #ff8713
		"--color-primary-600": "230 122 17", // #e67a11
		"--color-primary-700": "191 101 14", // #bf650e
		"--color-primary-800": "153 81 11", // #99510b
		"--color-primary-900": "125 66 9", // #7d4209
		// secondary | #3dd9ff 
		"--color-secondary-50": "226 249 255", // #e2f9ff
		"--color-secondary-100": "216 247 255", // #d8f7ff
		"--color-secondary-200": "207 246 255", // #cff6ff
		"--color-secondary-300": "177 240 255", // #b1f0ff
		"--color-secondary-400": "119 228 255", // #77e4ff
		"--color-secondary-500": "61 217 255", // #3dd9ff
		"--color-secondary-600": "55 195 230", // #37c3e6
		"--color-secondary-700": "46 163 191", // #2ea3bf
		"--color-secondary-800": "37 130 153", // #258299
		"--color-secondary-900": "30 106 125", // #1e6a7d
		// tertiary | #ffde42 
		"--color-tertiary-50": "255 250 227", // #fffae3
		"--color-tertiary-100": "255 248 217", // #fff8d9
		"--color-tertiary-200": "255 247 208", // #fff7d0
		"--color-tertiary-300": "255 242 179", // #fff2b3
		"--color-tertiary-400": "255 232 123", // #ffe87b
		"--color-tertiary-500": "255 222 66", // #ffde42
		"--color-tertiary-600": "230 200 59", // #e6c83b
		"--color-tertiary-700": "191 167 50", // #bfa732
		"--color-tertiary-800": "153 133 40", // #998528
		"--color-tertiary-900": "125 109 32", // #7d6d20
		// success | #3aff9e 
		"--color-success-50": "225 255 240", // #e1fff0
		"--color-success-100": "216 255 236", // #d8ffec
		"--color-success-200": "206 255 231", // #ceffe7
		"--color-success-300": "176 255 216", // #b0ffd8
		"--color-success-400": "117 255 187", // #75ffbb
		"--color-success-500": "58 255 158", // #3aff9e
		"--color-success-600": "52 230 142", // #34e68e
		"--color-success-700": "44 191 119", // #2cbf77
		"--color-success-800": "35 153 95", // #23995f
		"--color-success-900": "28 125 77", // #1c7d4d
		// warning | #d92e24 
		"--color-warning-50": "249 224 222", // #f9e0de
		"--color-warning-100": "247 213 211", // #f7d5d3
		"--color-warning-200": "246 203 200", // #f6cbc8
		"--color-warning-300": "240 171 167", // #f0aba7
		"--color-warning-400": "228 109 102", // #e46d66
		"--color-warning-500": "217 46 36", // #d92e24
		"--color-warning-600": "195 41 32", // #c32920
		"--color-warning-700": "163 35 27", // #a3231b
		"--color-warning-800": "130 28 22", // #821c16
		"--color-warning-900": "106 23 18", // #6a1712
		// error | #664747 
		"--color-error-50": "232 227 227", // #e8e3e3
		"--color-error-100": "224 218 218", // #e0dada
		"--color-error-200": "217 209 209", // #d9d1d1
		"--color-error-300": "194 181 181", // #c2b5b5
		"--color-error-400": "148 126 126", // #947e7e
		"--color-error-500": "102 71 71", // #664747
		"--color-error-600": "92 64 64", // #5c4040
		"--color-error-700": "77 53 53", // #4d3535
		"--color-error-800": "61 43 43", // #3d2b2b
		"--color-error-900": "50 35 35", // #322323
		// surface | #2e2e2e 
		"--color-surface-50": "224 224 224", // #e0e0e0
		"--color-surface-100": "213 213 213", // #d5d5d5
		"--color-surface-200": "203 203 203", // #cbcbcb
		"--color-surface-300": "171 171 171", // #ababab
		"--color-surface-400": "109 109 109", // #6d6d6d
		"--color-surface-500": "46 46 46", // #2e2e2e
		"--color-surface-600": "41 41 41", // #292929
		"--color-surface-700": "35 35 35", // #232323
		"--color-surface-800": "28 28 28", // #1c1c1c
		"--color-surface-900": "23 23 23", // #171717

		
		

	}
}