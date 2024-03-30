# answer-tongyi

## 项目介绍

一个基于Vue3+TS的AI项目，AI接口使用的是阿里的通义千问接口，因为目前还没写登录，所以需要自己去申请[通义千问apiKey](https://dashscope.console.aliyun.com/apiKey)，替换 src/utils/http/index.ts 文件的请求拦截器里面的token变量

![image-20240331012834041](/Users/h/Library/Application Support/typora-user-images/image-20240331012937777.png)

我用的模型是通义千问的qwen-turbo，自己如果有需要，可参考[对应模型的开发文档](https://dashscope.console.aliyun.com/model)![image-20240331013652524](/Users/h/Library/Application Support/typora-user-images/image-20240331013652524.png)

## 项目设置

### 依赖安装

```sh
npm install
```

### 项目运行

```sh
npm run dev
```

### 打包

```sh
npm run build
```
