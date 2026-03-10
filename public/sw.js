const CACHE = 'chaosgrok-v1';

// 预缓存的核心资源
const PRECACHE = [
  '/',
  '/blog',
  '/about',
  '/offline',
];

// 安装时预缓存
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(PRECACHE))
  );
  self.skipWaiting();
});

// 激活时清理旧缓存
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// 请求拦截：网络优先，失败走缓存
self.addEventListener('fetch', e => {
  // 只处理 GET 请求，跳过 API 和外部请求
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return;

  // 音频/视频文件直接走网络，不缓存（体积太大）
  if (url.pathname.match(/\.(mp3|mp4|webm)$/)) return;

  e.respondWith(
    fetch(e.request)
      .then(res => {
        // 成功则更新缓存
        const clone = res.clone();
        caches.open(CACHE).then(cache => cache.put(e.request, clone));
        return res;
      })
      .catch(() =>
        // 网络失败走缓存，缓存也没有则返回离线页
        caches.match(e.request).then(cached => cached || caches.match('/offline'))
      )
  );
});
