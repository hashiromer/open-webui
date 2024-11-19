import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

// /** @type {import('vite').Plugin} */
// const viteServerConfig = {
// 	name: 'log-request-middleware',
// 	configureServer(server) {
// 		server.middlewares.use((req, res, next) => {
// 			res.setHeader('Access-Control-Allow-Origin', '*');
// 			res.setHeader('Access-Control-Allow-Methods', 'GET');
// 			res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
// 			res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
// 			next();
// 		});
// 	}
// };

export default defineConfig(({ mode }) => {
	// Determine the appropriate frontend URL
	const frontendUrl: string =
		mode === 'production' ? process.env.FRONTEND_PROD_URL  : process.env.FRONTEND_DEV_URL 
	
	const url = new URL(frontendUrl);
	const host: string = url.hostname;
	const port: number = parseInt(url.port, 10) 

	return {
		plugins: [sveltekit()],
		define: {
			APP_VERSION: JSON.stringify(process.env.npm_package_version),
			APP_BUILD_HASH: JSON.stringify(process.env.APP_BUILD_HASH || 'dev-build'),
			BACKEND_PROD_URL: JSON.stringify(process.env.BACKEND_PROD_URL),
			BACKEND_DEV_URL: JSON.stringify(process.env.BACKEND_DEV_URL),
		},
		build: {
			sourcemap: true
		},
		worker: {
			format: 'es'
		},
		server: {
			host,
			port,
			strictPort: true 

		}
	};
});
