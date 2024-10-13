import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const centomilaTheme: CustomThemeConfig = {
	name: 'cento-minimal',
	properties: {
		// =~= Theme Properties =~=
		'--theme-font-family-base': `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
		'--theme-font-family-heading': `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
		'--theme-font-color-base': '0 0 0',
		'--theme-font-color-dark': '255 255 255',
		'--theme-rounded-base': '2px',
		'--theme-rounded-container': '2px',
		'--theme-border-base': '1px',
		// =~= Theme On-X Colors =~=
		'--on-primary': '0 0 0',
		'--on-secondary': '255 255 255',
		'--on-tertiary': '0 0 0',
		'--on-success': '0 0 0',
		'--on-warning': '255 255 255',
		'--on-error': '255 255 255',
		'--on-surface': '255 255 255',
		// =~= Theme Colors  =~=
		// primary | #aaaaaa
		'--color-primary-50': '242 242 242', // #f2f2f2
		'--color-primary-100': '238 238 238', // #eeeeee
		'--color-primary-200': '234 234 234', // #eaeaea
		'--color-primary-300': '221 221 221', // #dddddd
		'--color-primary-400': '196 196 196', // #c4c4c4
		'--color-primary-500': '170 170 170', // #aaaaaa
		'--color-primary-600': '153 153 153', // #999999
		'--color-primary-700': '128 128 128', // #808080
		'--color-primary-800': '102 102 102', // #666666
		'--color-primary-900': '83 83 83', // #535353
		// secondary | #555555
		'--color-secondary-50': '230 230 230', // #e6e6e6
		'--color-secondary-100': '221 221 221', // #dddddd
		'--color-secondary-200': '213 213 213', // #d5d5d5
		'--color-secondary-300': '187 187 187', // #bbbbbb
		'--color-secondary-400': '136 136 136', // #888888
		'--color-secondary-500': '85 85 85', // #555555
		'--color-secondary-600': '77 77 77', // #4d4d4d
		'--color-secondary-700': '64 64 64', // #404040
		'--color-secondary-800': '51 51 51', // #333333
		'--color-secondary-900': '42 42 42', // #2a2a2a
		// tertiary | #989898
		'--color-tertiary-50': '240 240 240', // #f0f0f0
		'--color-tertiary-100': '234 234 234', // #eaeaea
		'--color-tertiary-200': '229 229 229', // #e5e5e5
		'--color-tertiary-300': '214 214 214', // #d6d6d6
		'--color-tertiary-400': '183 183 183', // #b7b7b7
		'--color-tertiary-500': '152 152 152', // #989898
		'--color-tertiary-600': '137 137 137', // #898989
		'--color-tertiary-700': '114 114 114', // #727272
		'--color-tertiary-800': '91 91 91', // #5b5b5b
		'--color-tertiary-900': '74 74 74', // #4a4a4a
		// success | #69c0b1
		'--color-success-50': '233 246 243', // #e9f6f3
		'--color-success-100': '225 242 239', // #e1f2ef
		'--color-success-200': '218 239 236', // #daefec
		'--color-success-300': '195 230 224', // #c3e6e0
		'--color-success-400': '150 211 200', // #96d3c8
		'--color-success-500': '105 192 177', // #69c0b1
		'--color-success-600': '95 173 159', // #5fad9f
		'--color-success-700': '79 144 133', // #4f9085
		'--color-success-800': '63 115 106', // #3f736a
		'--color-success-900': '51 94 87', // #335e57
		// warning | #886655
		'--color-warning-50': '237 232 230', // #ede8e6
		'--color-warning-100': '231 224 221', // #e7e0dd
		'--color-warning-200': '225 217 213', // #e1d9d5
		'--color-warning-300': '207 194 187', // #cfc2bb
		'--color-warning-400': '172 148 136', // #ac9488
		'--color-warning-500': '136 102 85', // #886655
		'--color-warning-600': '122 92 77', // #7a5c4d
		'--color-warning-700': '102 77 64', // #664d40
		'--color-warning-800': '82 61 51', // #523d33
		'--color-warning-900': '67 50 42', // #43322a
		// error | #880000
		'--color-error-50': '237 217 217', // #edd9d9
		'--color-error-100': '231 204 204', // #e7cccc
		'--color-error-200': '225 191 191', // #e1bfbf
		'--color-error-300': '207 153 153', // #cf9999
		'--color-error-400': '172 77 77', // #ac4d4d
		'--color-error-500': '136 0 0', // #880000
		'--color-error-600': '122 0 0', // #7a0000
		'--color-error-700': '102 0 0', // #660000
		'--color-error-800': '82 0 0', // #520000
		'--color-error-900': '67 0 0', // #430000
		// surface | #333333
		'--color-surface-50': '224 224 224', // #e0e0e0
		'--color-surface-100': '214 214 214', // #d6d6d6
		'--color-surface-200': '204 204 204', // #cccccc
		'--color-surface-300': '173 173 173', // #adadad
		'--color-surface-400': '112 112 112', // #707070
		'--color-surface-500': '51 51 51', // #333333
		'--color-surface-600': '46 46 46', // #2e2e2e
		'--color-surface-700': '38 38 38', // #262626
		'--color-surface-800': '31 31 31', // #1f1f1f
		'--color-surface-900': '25 25 25' // #191919
	}
};
