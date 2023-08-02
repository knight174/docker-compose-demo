# 使用 Node.js 18 作为基础镜像
FROM node:18-alpine

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json 到容器中
COPY package*.json ./

# 安装应用程序依赖
RUN npm install

# 复制应用程序代码到容器中
COPY . .

# 暴露应用程序的端口
EXPOSE 3000

# 启动应用程序
CMD ["npm", "run", "start:prod"]
