import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactNative from 'eslint-plugin-react-native';
import pluginTs from '@typescript-eslint/eslint-plugin';
import parserTs from '@typescript-eslint/parser';
import pluginPrettier from 'eslint-plugin-prettier';

export default [
	{
		files: ['**/*.{ts,tsx,js,jsx}'],
		languageOptions: {
			parser: parserTs,
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module',
				ecmaFeatures: { jsx: true },
			},
		},
		plugins: {
			react: eslintPluginReact,
			'react-native': eslintPluginReactNative,
			'@typescript-eslint': pluginTs,
			prettier: pluginPrettier,
		},
		rules: {
			'prettier/prettier': 'error',
			'react/react-in-jsx-scope': 'off',
		},
		settings: {
			react: {
				version: 'detect',
			},
		},
	},
];
