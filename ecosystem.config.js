module.exports = {
	apps: [
		{
			name: 'API',
			script: 'index.js',

			instances: 2,
			autorestart: true,
			watch: false,
			max_memory_restart: '800M',
			env: {
				NODE_ENV: 'development',
			},
			env_production: {
				NODE_ENV: 'production',
			},
		},
	],
}
