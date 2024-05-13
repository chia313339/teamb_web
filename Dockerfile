# 選擇一個有 Node.js 的基礎映像
FROM node:lts-alpine

# 設定工作目錄
WORKDIR /app

# 複製 package.json 和 package-lock.json
COPY package*.json ./

# 安裝依賴
RUN npm install

# 複製所有檔案到容器中
COPY . .

# 建構應用程式
RUN npm run build

# 安裝一個輕量級的 HTTP 服務器
RUN npm install -g http-server

# 開啟 8080 端口
EXPOSE 8080

# 啟動 HTTP 服務器來服務你的應用程式
CMD ["http-server", "dist", "-c-1", "--proxy", "http://localhost:8080?"]

