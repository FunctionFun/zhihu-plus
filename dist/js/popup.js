// 读取配置
chrome.storage.sync.get(
  { zhihuPlus: false, noImage: false },
  function (items) {
    if (items) {
      $(".switch-input").each(function () {
        var value = $(this).val();
        var switchPa = $(this).parent(".switch-box");
        if (value === "zhihuPlus" && items.zhihuPlus) {
          $(this).attr("checked", "checked");
          switchPa.addClass("open");
        }
        if (value === "noImage" && items.noImage) {
          $(this).attr("checked", "checked");
          switchPa.addClass("open");
        }
      });
    }
  }
);

$(function () {
  $(".switch-input").change(function () {
    var value = $(this).val();
    var isChecked = $(this).is(":checked");
    if (value === "zhihuPlus") {
      beautyUI(isChecked);
    } else if (value === "noImage") {
      noImage(isChecked);
    }
  });
});

function beautyUI(isChecked) {
  console.log("界面美化-开关", isChecked);
  sendMsgToContentScript({ cmd: "zhihuPlus", value: isChecked });
}

function noImage(isChecked) {
  console.log("无图模式-开关", isChecked);
  sendMsgToContentScript({ cmd: "noImage", value: isChecked });
}
