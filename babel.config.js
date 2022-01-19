module.exports = {
	plugins: [
		[
			'@babel/plugin-proposal-decorators', { 'legacy': true },
		],
		[
			'babel-plugin-module-resolver', {
				'root': ['./src'],
				'alias': {
					'~': './src',
					'#': './css',
					'-': '.',
				},
			},
		],
	],
};
