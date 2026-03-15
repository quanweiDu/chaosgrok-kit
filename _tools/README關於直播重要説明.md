# 本地直播工具备份

这里存放本地直播环境的配置文件备份，不参与网站构建。

## 文件说明

- `nginx.conf` — nginx-rtmp 配置，复制到 `E:\OBS\nginx-rtmp\nginx-rtmp-win32-master\conf\`
- `watch-recordings.mjs` — 录像监听脚本，复制到 `E:\OBS\nginx-rtmp\nginx-rtmp-win32-master\`

## 本地开发启动流程

每次重启电脑后需要手动启动以下服务：

**终端 1 — nginx 直播服务器**
```powershell
cd E:\OBS\nginx-rtmp\nginx-rtmp-win32-master
taskkill /f /im nginx.exe   # 先杀掉旧进程（如果有）
.\nginx.exe
```

**终端 2 — 录像监听 + 自动生成 md**
```powershell
cd E:\OBS\nginx-rtmp\nginx-rtmp-win32-master
node watch-recordings.mjs
```

**终端 3 — Astro 开发服务器**
```powershell
cd E:\site-v4最终版git
npm run dev
```

**终端 4 — Decap CMS 本地代理（需要用 CMS 时）**
```powershell
cd E:\site-v4最终版git
npx decap-server
```

## OBS 推流配置

- 服务：自定义
- 服务器：`rtmp://localhost/live`
- 推流码：`stream`

## 直播流地址

- HLS 播放：`http://localhost:8080/hls/stream.m3u8`
- 状态查看：`http://localhost:8080/stat`
