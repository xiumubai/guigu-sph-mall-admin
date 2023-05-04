## 尚品汇后台管理系统

采用 vue3 全家桶（vite+pinia+element-plus+vue-router@4）

查看[更新日志](./CHANGELOG.md)


## 使用方式

### install

```
pnpm install
```

### run

```
pnpm run dev
```

### build

```
pnpm run build:prod
```

## 预览地址

[http://113.141.166.99:3007/#/index](http://113.141.166.99:3007/#/index)

账户密码：admin atguigu123

## 功能介绍

- 使用 Vue3.2.45 + TypeScript 开发
- 采用 Vite4.0 作为项目开发、打包工具（配置 Gzip 打包、TSX 语法、跨域代理……）
- 使用 Prettier 统一格式化代码，集成 Eslint、Stylelint 代码校验规范
- 使用 husky、lint-staged、commitlint、commitizen、cz-git 规范提交信息
- 使用 Pinia 替代 Vuex，轻量、简单、易用， 集成 Pinia 持久化插件
- 使用 TypeScript 对 Axios 整个二次封装
- 基于 Element-plus 二次封装 [ProTable](https://juejin.cn/post/7166068828202336263) 组件，基于配置化去开发常用的表格。
- 支持页面全屏展示
- 支持菜单权限的配置和管理
- 支持三种方式（指令，hooks，组件）的按钮级别的权限控制
- 支持暗黑模式的切换
- 支持自定义主题切换
- 支持 i18n 国际化
- 自定义指令开发

## 文件目录介绍

```
guiug-sph-mall-admin
├─ .husky                 # husky 配置文件
├─ .vscode                # VSCode 推荐配置
├─ mock                   # mock数据
├─ public                 # 静态资源文件（该文件夹不会被打包）
├─ scripts                # 脚本文件
├─ src
│  ├─ api                 # API 接口管理
│  ├─ assets              # 静态资源文件
│  ├─ components          # 全局组件
│  ├─ config              # 全局配置项
│  ├─ directives          # 全局指令文件
│  ├─ enums               # 项目常用枚举
│  ├─ hooks               # 常用 Hooks 封装
│  ├─ languages           # 语言国际化 i18n
│  ├─ layouts             # 框架布局模块
│  ├─ routers             # 路由管理
│  ├─ stores              # pinia store
│  ├─ styles              # 全局样式文件
│  ├─ typings             # 全局 ts 声明
│  ├─ utils               # 常用工具库
│  ├─ views               # 项目所有页面
│  ├─ App.vue             # 项目主组件
│  ├─ env.d.ts            # 指定 ts 识别 vue
│  └─ main.ts             # 项目入口文件
├─ .editorconfig          # 统一不同编辑器的编码风格
├─ .env.development       # 开发环境配置
├─ .env.production        # 生产环境配置
├─ .env.test              # 测试环境配置
├─ .eslintignore          # 忽略 Eslint 校验
├─ .eslintrc.cjs          # Eslint 校验配置文件
├─ .gitignore             # 忽略 git 提交
├─ .prettierignore        # 忽略 Prettier 格式化
├─ .prettierrc.json       # Prettier 格式化配置
├─ .stylelintignore       # 忽略 stylelint 格式化
├─ .stylelintrc.js        # stylelint 样式格式化配置
├─ commitlint.config.js   # git 提交规范配置
├─ index.html             # 入口 html
├─ LICENSE                # 开源协议文件
├─ lint-staged.config     # lint-staged 配置文件
├─ pnpm-lock.json         # 依赖包包版本锁
├─ package.json           # 依赖包管理
├─ README.md              # README 介绍
├─ STANDARD.md            # 项目编码规范说明书
├─ tsconfig.json          # typescript 全局配置
└─ vite.config.ts         # vite 全局配置文件
```

## 项目截图

### 1.登陆页

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cc43ab2effde43848d19df6e53125753~tplv-k3u1fbpfcp-zoom-1.image)

### 2.首页

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6d13f40912a64edbb0050c6966fc58b1~tplv-k3u1fbpfcp-zoom-1.image)

### 3.主题切换

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fb449a5f916242a3956a95a4a39f7cd5~tplv-k3u1fbpfcp-zoom-1.image)

### 4.暗黑模式

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/96123e9e16ff4274acb2c01c0e2f3af9~tplv-k3u1fbpfcp-zoom-1.image)

## 代码仓库

https://gitee.com/guigu-fe/guigu-sph-mall-admin

本项目后续会集成更多好玩业界解决方案，欢迎大家持续关注，提 issues。

## 文章教程系列

- [vue3 admin 保姆教学指南 ｜ 项目规范集成教程，看完秒懂项目中各种奇怪的文件和配置](https://juejin.cn/post/7195080019394166842)
- [vue3 admin 保姆教学指南 ｜ 一文让你彻底上手 vue3 全家桶，集成 pinia+element-plus+vue-router@4](https://juejin.cn/post/7196852501190082616)
- [vue3 admin 保姆教学指南｜关于使用 typescript 二次封装 Axios 的特别说明](https://juejin.cn/post/7214146630467305530)
- [vue3 admin 保姆教学指南｜关于 pinia 的使用](https://juejin.cn/post/7214342319348138041)
- [vue3 admin 保姆教学指南｜登录和菜单权限的实现](https://juejin.cn/post/7215035912186413115)
- [vue3 admin 保姆教学指南｜后台管理系统的 Layout 实现](https://juejin.cn/post/7215125397347680314)
- [vue3 admin 保姆教学指南｜ element-plus 如何实现主题切换和暗黑模式](https://juejin.cn/post/7215485221830852665)
- [vue3 admin 开发中的奇淫巧技｜在 vue 中如何刷新当前页面](https://juejin.cn/post/7216130963276644407)
- 未更新完...
