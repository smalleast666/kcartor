
## 安装依赖
npm install 

## 运行server
node ./server/bin/www
或 npm run server

## 运行client
npm start

## 打包 client
npm run build

## 删除打包文件目录
npm run clear

### client打包路径
/server/public


## 注意事项
正式打包时 删除webpack.config.pro.js 文件的57行
devtool: shouldUseSourceMap ? 'source-map' : false, //开启后会打包开发依赖


## 目录结构

server //server
src //client

40d6d0c5da48fe6bd4bc4a7515012e7ea40746b0
