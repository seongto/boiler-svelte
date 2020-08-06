import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';

import scss 				from 'rollup-plugin-scss';
import autoPreprocess 		from 'svelte-preprocess'
import replace 				from '@rollup/plugin-replace';
import dotenv               from 'dotenv'

dotenv.config();
const production = !process.env.ROLLUP_WATCH;

export default {
	input: 'src/main.js',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'public/build/bundle.js'
	},
	plugins: [
		scss(),
		svelte({
			/**
			 * Auto preprocess supported languages with
			 * '<template>'/'external src files' support
			 **/
			preprocess: autoPreprocess({ /* options */ })
			/**
			 * It is also possible to manually enqueue
			 * stand-alone processors
			 * */
		}),
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs(),
		
		replace({
	  
			// 2 level deep object should be stringify
			process: JSON.stringify({
				env: {
					NODE_ENV: process.env.BUILD,
					TOKEN_KEY: process.env.TOKEN_KEY,
					SERVER_API: process.env.BUILD === "production" ? process.env.SERVER_API_PROD : process.env.SERVER_API_DEV,
					IMG_URL: process.env.IMG_URL,
				}
			}),
		}),

		// In dev mode, call `npm run start` once
		// the bundle has been generated
		!production && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload('public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	],
	watch: {
		clearScreen: false
	}
};

function serve() {
	let started = false;

	return {
		writeBundle() {
			if (!started) {
				started = true;

				require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
					stdio: ['ignore', 'inherit', 'inherit'],
					shell: true
				});
			}
		}
	};
}
