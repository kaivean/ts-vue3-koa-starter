/**
 * @file eslintrc
 * @author kaivean
 */

// reference to https://github.com/ecomfe/eslint-config
module.exports = {
    extends: [
        // "plugin:vue/essential",
        // "eslint:recommended",
        '@ecomfe/eslint-config', // npm i -D eslint @babel/core @babel/eslint-parser @babel/eslint-plugin @ecomfe/eslint-config
        '@ecomfe/eslint-config/baidu/default',
        '@ecomfe/eslint-config/vue', // 注意顺序 npm i -D eslint-plugin-vue
        // 注意这些规则会要求使用 ES6 的 import 来引入依赖，
        // 如果使用的是 require 则会出现检查错误，可禁用 import/no-commonjs 和 import/unambiguous 来解决。
        '@ecomfe/eslint-config/typescript', // npm i -D @typescript-eslint/parser @typescript-eslint/eslint-plugin
    ],
    parserOptions: {
        // requireConfigFile: false,
        parser: 'babel-eslint',
    },
    env: {
        // jasmine: true,
        es6: true,
        browser: true,
        // node: true,
    },
    globals: {

    },
    rules: {
        'vue/require-direct-export': 'off'
        // 'vue/max-attributes-per-line': 'off'
        // 'no-console': ['error', {allow: ['warn', 'error']}],
        // 'comma-dangle': ['error', {
        //     'arrays': 'never', // 对象和数组后面可以不加逗号
        //     'objects': 'never',
        // }]
        // 'import/no-commonjs': 'off',
        // 'import/unambiguous': 'off',
        // 'import/extensions': 'off',
        // 'import/no-unresolved': 'off',
    }
};
