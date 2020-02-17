//修改图片
$(".picturefile").on("change", function () {
  var srcs = getObjectURL(this.files[ 0 ]); //获取路径
  loadUpPricture($(this), srcs);
});


/*
*@autor：wangliping
*Desccription:遍历每一个图片是否为空
*Create
*Modified date 2019年11月06日
*/
function earchImg () {
  $(".pictureConentBox").each(function () {
    var ImgSrc = $(this).find(".pictureImg").attr("src");
    if (ImgSrc === "" || ImgSrc === null) {
      $(this).find(".picturefile").val('');
      $(this).find(".pictureImg").attr("src", '');
      $(this).find(".pictureBtn").hide();
      $(this).find(".pictureViewBtn").text("上传图片");
      $(this).find(".pictureBox").addClass("prictureBoxUnll");
    } else {
      $(this).find(".pictureViewBtn").text("修改图片");//修改按钮文字
      $(this).find(".pictureClose").show();//删除按钮显示
      $(this).find(".pictureImg").attr("src", ImgSrc);//图片赋值路径，显示图片
      $(this).find(".pictureBox").removeClass("prictureBoxUnll");//移除图片不存在的情况
    }
  })
}
function getObjectURL (file) {
  var url = null;
  if (window.createObjectURL != undefined) {
    url = window.createObjectURL(file)
  } else if (window.URL != undefined) {
    url = window.URL.createObjectURL(file)
  } else if (window.webkitURL != undefined) {
    url = window.webkitURL.createObjectURL(file)
  }
  return url
};


/*
*@autor：wangliping
*Desccription:上传图片
*Create
*Modified date 2019年11月06日
*/
function loadUpPricture (pricture, prictureSrc) {
  var $thisParent = pricture.parent().parent();
  if (prictureSrc == '') {
    pricture.parent(".pictureBtnBox").find(".pictureBtn").hide();
  } else {
    pricture.parent().parent().find(".updateLoadingBox").show();//显示loading
    setTimeout(function () {
      $thisParent.find(".updateLoadingBox").hide();
      $thisParent.find(".pictureViewBtn").text("修改图片");//修改按钮文字
      $thisParent.find(".pictureClose").show();//删除按钮显示
      $thisParent.find(".pictureImg").attr("src", prictureSrc);//图片赋值路径，显示图片
      $thisParent.find(".pictureBox").removeClass("prictureBoxUnll");//移除图片不存在的情况
    }, 500)
  }
}


/*
*@autor：wangliping
*Desccription:删除图片
*Create
*Modified date 2019年11月06日
*/
function canclePricture (cancleThis) {
  $(cancleThis).parent(".pictureBtnBox").find(".picturefile").val('');
  $(cancleThis).parent(".pictureBtnBox").parent(".pictureConent").find(".pictureImg").attr("src", '');
  $(cancleThis).parent(".pictureBtnBox").find(".pictureBtn").hide();
  $(cancleThis).parent(".pictureBtnBox").find(".pictureViewBtn").text("上传图片");
  $(cancleThis).parent().parent().parent().parent().parent().find(".hiddenInput").find("input[name='merImg']").val("");
  $(cancleThis).parent(".pictureBtnBox").parent(".pictureConent").find(".pictureBox").addClass("prictureBoxUnll");
}


function initialFun (date) {
  var y = date.substring(0, 4);
  var m = date.substring(4, 6);
  var d = date.substring(6, 8);
  return new Date(y + "/" + m + "/" + d);
}

//yyyy-mm-dd类型的字符串转添加相应的天数，返回新的日期
function getNewDay (dateTemp, days) {
  var dateTemp = dateTemp.toString().split("-");
  var nDate = new Date(dateTemp[ 1 ] + '-' + dateTemp[ 2 ] + '-' + dateTemp[ 0 ]);
  var millSeconds = Math.abs(nDate) + (days * 24 * 60 * 60 * 1000);
  var rDate = new Date(millSeconds);
  var year = rDate.getFullYear();
  var month = rDate.getMonth() + 1;
  if (month < 10) month = "0" + month;
  var date = rDate.getDate();
  if (date < 10) date = "0" + date;
  return (year + '-' + month + '-' + date);
}


//调用日期


var trxDtTmBoxObj = $("#trxDtTmBox");
var tranDateTimeEndBoxObj = $("#tranDateTimeEndBox");
var form_datetime = $(".form_datetime");

trxDtTmBoxObj.datetimepicker({
  format: 'yyyy-mm-dd',
  language: 'fr',
  weekStart: 1,
  clearBtn: true,
  autoclose: 1,
  todayHighlight: 1,
  startView: 2,
  forceParse: 0,
  minView: 2,
  showMeridian: 1
})
function deleteConfirm (id) {
  if (id === "" || id === 'null' || id === null) {
    alert("数据异常，参数错误");
  } else {
    $("#confirmWarn").modal('show');
    $('#confirmWarnText').text("确定执行[删除]操作?");
    // $("#confirmWarnYes").attr("onclick", "window.location.href = 'delete?merInfoId=" + id + "\'");
    //前端静态页面写法------start
    var userIdEq = $(id).parents(".lplist-table-btn-box").parents("tr").index();
    $("#confirmWarnYes").attr("onclick", '$(".lplist-table").children("tbody").children("tr").eq(' + userIdEq + ').remove();saveOperate("true","删除成功");trId();');
    //前端静态页面写法------end
  }
}

// 显示加载动画 ---要修改
function loading () {
  $(".loading-box").show();
  setTimeout(function () {
    $(".loading-box").hide();
  }, 1000)
}


//显示提示语句--不用修改
function operateTip (text) {
  $(".qm-operate-tip-text").text(text);
  $(".qm-operate-tip").show();
  setTimeout(function () {
    $(".qm-operate-tip").fadeOut();
  }, 2000)
}