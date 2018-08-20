module.exports = {
	extends: [
		'airbnb',
		'plugin:ava/recommended'
	],
	plugins: ['react', 'jsx-a11y', 'import', 'ava'],
	env: {
		browser: true,
		node: true,
		es6: true,
		jasmine: true
	},
	parser: 'babel-eslint',
	parserOptions: {
		sourceType: "module",
		allowImportExportEverywhere: false,
		codeFrame: false
	},
	rules: {
		'no-tabs': 0,
		'consistent-return': 0,
		strict: 0,
		'linebreak-style': 0,
		'no-console': 0,
		'no-underscore-dangle': 0,
		'global-require': 0,
		'import/no-extraneous-dependencies': 0,
		'no-param-reassign': 0,
		'no-mixed-operators': 0,
		'no-bitwise': ['error', { allow: ['~'] }],
		'comma-dangle': ['error', { functions: 'ignore' }],
		'new-cap': 0,
		'no-restricted-syntax': 0,
		'no-unused-expressions': ['error', { allowTernary: true }],
		'prefer-const': ['error', {'destructuring': 'all'}]
	},
	globals: {}
};
