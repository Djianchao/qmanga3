module.exports = {
    root: true,
    env: {
        browser: true,
        es6: true
    },
    globals: {
        process: true,
        require: true,
        module: true,
        AMap: true
    },
    extends: [
        'plugin:vue/strongly-recommended',
        'eslint:recommended'
    ],
    parserOptions: {
        ecmaVersion: 2015,
        parser: 'babel-eslint',
        sourceType: 'module'
    },
    rules: {
        // 代码风格
        // 强制在代码块中开括号前和闭括号后有空格
        'block-spacing': [2, 'always'],
        // 强制在代码块中使用一致的大括号风格
        'brace-style': [2, '1tbs', {
            'allowSingleLine': true
        }],
        // 强制在逗号后面使用空格，前面不用
        'comma-spacing': [2, {
            'before': false,
            'after': true
        }],
        // 禁止使用拖尾逗号
        'comma-dangle': [2, 'never'],
        // 将逗号放置在当前行的末尾
        'comma-style': [2, 'last'],
        // 用变量做对象属性的取值师，禁止前后有空格
        'computed-property-spacing': [2, 'never'],
        // 两个空格缩进
        'indent': [2, 4, {
            'SwitchCase': 1
        }],
        // 对象字面量的键和值前后都有间距
        'key-spacing': [2, {
            'beforeColon': false,
            'afterColon': true
        }],
        // 关键字前后都有间距
        'keyword-spacing': [2, {
            'before': true,
            'after': true
        }],
        // 不激活换行规则
        'linebreak-style': 0,
        // 三元操作数中间跨多行后进行换行
        'multiline-ternary': [2, 'always-multiline'],
        // 最多一行空行
        'no-multiple-empty-lines': [2, {
            'max': 1
        }],
        // 禁止可以表达为更简单结构的三元操作符
        'no-unneeded-ternary': [2, {
            'defaultAssignment': false
        }],
        // 统一为单引号
        'quotes': [2, 'single'],
        // 不用 ;
        'semi': [2, 'never'],
        // 要求语句块之前有空格
        'space-before-blocks': [2, 'always'],
        // 禁止函数圆括号之前有一个空格
        'space-before-function-paren': [2, 'never'],
        // 禁止圆括号内的空格
        'space-in-parens': [2, 'never'],
        // 要求中缀操作符周围有空格
        'space-infix-ops': 2,
        // 一元操作符之后有空格
        'space-unary-ops': [2, {
            'words': true,
            'nonwords': false
        }],
        // 注释前有空白
        'spaced-comment': [2, 'always', {
            'markers': ['global', 'globals', 'eslint', 'eslint-disable', '*package', '!', ',']
        }],
        // switch 的冒号右有空格
        'switch-colon-spacing': [2, {
            'after': true,
            'before': false
        }],
        // ES6
        // 箭头函数的参数使用圆括号，可省略则允许省略
        'arrow-parens': [2, 'as-needed'],
        // 箭头函数的箭头前后有空格 
        'arrow-spacing': [2, {
            'before': true,
            'after': true
        }],
        'vue/multi-word-component-names': 'off',
        // Vue - https://github.com/vuejs/eslint-plugin-vue
        'vue/html-indent': [2],
        'vue/max-attributes-per-line': 0,
        'vue/require-default-prop': 0,
        'vue/singleline-html-element-content-newline': 0,
        'vue/attributes-order': 2,
        'vue/order-in-components': 2,
        'vue/this-in-template': 2,
        'vue/script-indent': [2, 4, {
            'switchCase': 1
        }]
    }
}
