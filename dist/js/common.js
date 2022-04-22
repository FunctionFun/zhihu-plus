$(function () {
  // 开关动画
  $(".switch-input").change(function () {
    var switchPa = $(this).parent(".switch-box");
    var isChecked = $(this).is(":checked");
    if (isChecked) {
      switchPa.addClass("open");
    } else {
      switchPa.removeClass("open");
    }
  });
});

// 获取当前页面id
const getCurTabId = async () => {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
};

async function sendMsgToContentScript(msg) {
  const tab = await getCurTabId();
  chrome.tabs.sendMessage(tab.id, msg);
}
