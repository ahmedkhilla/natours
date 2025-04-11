import { defineConfig } from 'eslint/config';
import globals from 'globals';
import js from '@eslint/js';

export default defineConfig([
    {
        files: ['**/*.{js,mjs,cjs}'],
        languageOptions: {
            sourceType: 'module',
            globals: globals.node,
        },
        plugins: { js },
        extends: ['js/recommended'],
        rules: {
            'no-console': 'warn',
            'no-unused-vars': 'warn',
        },
    },
]);
