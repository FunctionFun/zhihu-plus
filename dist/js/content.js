var config = {
  zhihuPlus: false,
  noImage: false,
}

var isFollow = false

// 读取配置
chrome.storage.sync.get({ zhihuPlus: false, noImage: false }, function (items) {
  console.log('读取', items)
  if (items) {
    config.zhihuPlus = items.zhihuPlus
    config.noImage = items.noImage
    if (items.zhihuPlus) {
      $('html').attr('data-zhihuPlus', true)
      renderFollowBtn()
    }
    if (items.noImage) {
      $('html').attr('noImage', true)
    }
  }
})

// 监听来自 popup 或者 background 的消息
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log("收到消息", request);
  if (request.cmd == 'zhihuPlus') {
    config.zhihuPlus = request.value
    $('html').attr('data-zhihuPlus', request.value)
    // 存储配置
    chrome.storage.sync.set({ zhihuPlus: request.value })
    renderFollowBtn()
  }
  if (request.cmd == 'noImage') {
    config.noImage = request.value
    $('html').attr('noImage', request.value)
    // 存储配置
    chrome.storage.sync.set({ noImage: request.value })
  }
})

// 外站地址直接跳转
const webHost = window.location.host
if (webHost === 'link.zhihu.com') {
  const rule = /target=(.+?)(&|$)/
  const regRet = location.search.match(rule)
  if (regRet && regRet.length === 3) {
    location.href = decodeURIComponent(regRet[1])
  }
}

// 视频下载
const iconDownload =
  '<svg class="icon" width="16px" height="16px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#8590a6" d="M508 794.3h-0.2c-8.7-0.1-16.9-3.6-23-9.8L189.5 481.1c-9.1-9.3-11.7-23.2-6.6-35.2 5.1-12 16.8-19.8 29.9-19.8h143V81.5c0-17.9 14.5-32.4 32.4-32.4H636c17.9 0 32.4 14.5 32.4 32.4v344.6h143c13.1 0 24.9 7.9 29.9 20s2.2 26-7 35.3L530.9 784.8c-6.1 6.1-14.3 9.5-22.9 9.5zM289.5 490.9l218.8 224.8 224.8-224.8H636c-17.9 0-32.4-14.5-32.4-32.4V113.9h-183v344.6c0 17.9-14.5 32.4-32.4 32.4h-98.7z"  /><path fill="#8590a6" d="M837.8 948.9H186.2c-51.6 0-93.6-42-93.6-93.6V709.8c0-17.9 14.5-32.4 32.4-32.4s32.4 14.5 32.4 32.4v145.6c0 15.9 12.9 28.8 28.8 28.8h651.5c15.9 0 28.8-12.9 28.8-28.8V699.8c0-17.9 14.5-32.4 32.4-32.4s32.4 14.5 32.4 32.4v155.5c0.1 51.7-41.9 93.6-93.5 93.6z"  /></svg>'

$(function () {
  setTimeout(() => {
    $('.RichText-ZVideoLinkCardContainer').append(
      `<div class="download-btn">${iconDownload}下载</div>`
    )
  }, 2000)

  $(document).on(
    'click',
    '.RichText-ZVideoLinkCardContainer .download-btn',
    function () {
      $('.ZVideoLinkCard-player').load(function () {
        var videoDom = $('.ZVideoLinkCard-player').contents()
        var videoSrc = videoDom.find('video')
        console.log('视频下载地址', videoSrc)
      })
    }
  )
})
