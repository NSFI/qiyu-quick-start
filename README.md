## qiyu-quick-start

一个基于electron的桌面小工具，用于快速启动七鱼前端本地开发环境

### 功能和特性
- 基于electron的套壳web应用
- 适配windows及mac系统
- 支持一键启动本地服务
- 支持开发环境切换（debug <-> test）
- 自定义工程和指令


### 如何使用
安装依赖  
`npm i`   
打包应用，windows和mac系统下指令有所不同
- windows: `gulp package`
- mac: `gulp packagemac`   
  
在项目根目录outApp文件夹下可找到打包后的应用
- windows: qiyu-quick-start-win32-x64文件夹
- mac: 

### 修改配置的工程和指令
- windows:    
修改qiyu-quick-start-win32-x64\resources\app\setting.json即可
- mac:   

### 本地开发
- 开发环境  
  `npm start`启动web页面devServer；   
  `npm run main`启动electron应用
- 生产环境   
  `npm run build`打包web代码；   
  `npm run main-prod`启动electron应用

