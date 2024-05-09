/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    // prettier配置
    'prettier/prettier': [
      'warn',
      {
        singleQuote: true, // 单引号
        semi: false, // 无分号
        printWidth: 80, // 每行最宽80字符
        trailingComma: 'none', // 不加对象/数据最后一个逗号
        endOfLine: 'auto' // 换行符不限制
      }
    ],
    'vue/multi-word-component-names': [
      'warn',
      {
        ignores: ['index'] // 指定文件名称忽略多单词校验
      }
    ],
    // 关闭 props解构校验
    'vue/no-setup-props-destructure': ['off'],
    'no-undef': 'error' // 未定义变量提示
  }
}
