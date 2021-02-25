import {config} from '@services/Config'
const cacheKey=config.appVersion
const cacheFileList =[]
// 监听 install 事件
self.addEventListener('install', function (event) {
  // 等待所有资源缓存完成时，才可以进行下一步
  event.waitUntil(
    caches.open(cacheKey).then(function (cache) {
      // 要缓存的文件 URL 列表
      return cache.addAll(cacheFileList)
    })
  )
})

// 捕获请求并返回缓存数据
self.addEventListener('fetch', function(event) {
  const request = event.request
  const resource = global.caches.match(request).then(response => {
    if (response) {
      return response
    }
    return fetch(request)
      .then(responseNetwork => {
        if (!responseNetwork || !responseNetwork.ok) {
          return responseNetwork
        }
        const responseCache = responseNetwork.clone()
        global.caches
          .open(cacheKey)
          .then(cache => {
            return cache.put(request, responseCache)
          })
        return responseNetwork
      })
      .catch(() => {
        if (event.request.mode === 'navigate') {
          return global.caches.match('./')
        }
        return null
      })
  })
  event.respondWith(resource)
})

// 新 Service Workers 线程取得控制权后，将会触发其 activate 事件
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          // 不在白名单的缓存全部清理掉
          if (cacheFileList.indexOf(cacheName) === -1) {
            // 删除缓存
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
})
