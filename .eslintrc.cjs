/*
 * @Author: dyb-dev
 * @Date: 2024-07-31 21:22:24
 * @LastEditors: dyb-dev
 * @LastEditTime: 2024-08-31 23:42:03
 * @FilePath: /vant-pro/.eslintrc.cjs
 * @Description: eslint配置文件 注意：每次配置文件的更改，建议重启一下vscode，否则可能不会生效
 */

module.exports = {
    extends: ["@dyb-dev/eslint-config"],
    overrides: [
        {
            files: ["**/*.*js", "**/*.ts", "**/*.vue", "**/*.jsx", "**/*.tsx", "**/*.json", "**/*.jsonc"],
            rules: {
                // #region CODE: eslint-plugin-import 插件规则

                // 忽略虚拟模块
                "import/no-unresolved": ["error", { ignore: ["^virtual:", "@", "#"] }]

                // #endregion
            }
        }
    ]
}
