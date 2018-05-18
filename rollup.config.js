
import babel from 'rollup-plugin-babel';
import eslint from 'rollup-plugin-eslint';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import builtins from 'rollup-plugin-node-builtins';
import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';

// POST CSS Plugins
import postcss from 'rollup-plugin-postcss';
import atImport from 'postcss-import';
import nested from 'postcss-nested';
import simplevars from 'postcss-simple-vars';
import cssnext from 'postcss-cssnext';
import cssnano from 'cssnano';

export default {
	input: 'src/app/index.js',
	output: {
		file: 'build/js/main.js',
		format: 'iife',
		ourceMap: process.env.NODE_ENV !== 'production',
	},
	external: [
		{ 'react': 'React' }
	],
	plugins: [
		replace({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
			'router.basename': 'ask.me'
		}),
		eslint({
			exclude: [
				'src/app/css/**'
			]
		}),
		builtins(),
		postcss({
			extensions: ['.css', '.sss'],
			extract: './build/css/main.css',
			modules: true,
			plugins: [
				cssnext({ warnForDuplication: false }),
				simplevars(),
				nested(),
				atImport(),
				cssnano(),
			],
		}),
		babel({
			runtimeHelpers: true,
			exclude: ['node_modules/**'],
		}),
		resolve({
			jsnext: true,
			main: true,
			browser: true,
			modulesOnly: false,
		}),
		commonjs({
			include: 'node_modules/**',
			namedExports: {
				'./node_modules/react/index.js': ['cloneElement', 'createElement', 'PropTypes', 'Children', 'Component', 'isValidElement', 'PureComponent'],
				'./node_modules/react-dom/index.js': ['findDOMNode'],
			}
		}),
		(process.env.NODE_ENV === 'production' && uglify({
			compress: {
				screw_ie8: true,
				warnings: false
			},
			output: {
				comments: false
			},
			sourceMap: false
		})),
	],
};