/*
 *Phoenix TV news tizen system version
 *http://www.ifeng.com/
 */
/// <reference path="jquery.js" />
//
var jsonpath = "http://api.dig24.cn/fit/public/home/";
var jsonpath2 = "http://api.dig24.cn/fit2/public/";
//var jsonpath = "http://tv.dig24.cn/fit/home/";

var ceng = 1; //设置层级
//焦点
var up_id = []; // 记录向上ID
var down_id = []; //记录向下ID
var left_id = []; // 记录向左ID
var right_id = []; //记录向右ID
var baks = false; //确认返回
var baks2 = true
$("input:button").focus(); // 激活当前页面
$(document).on("keydown", function(e) {
	if ($("body").hasClass("loading")) return false;

	var rhtml = $("#r_html")
	switch (ceng) {
		case 1:
			rhtml = $("#r_html")
			break;
		case 2:
			rhtml = $("#r_html_2")
			break;
		case 3:
			rhtml = $("#r_html_3")
			break;
		case 4:
			rhtml = $("#r_html_4")
			break;
		case 5:
			rhtml = $("#r_html_5")
			break;
		case 6:
			rhtml = $("#r_html_6")
			break;
		default:
			mui.toast("没有找到层级")
			break;
	}

	var $th = rhtml.find(".curr"); // 当前焦点元素

	var par_id = $th.parents(".curr-box") && $th.parents(".curr-box").data("currbox"); // 当前组ID  上下
	var par_row_id = $th.parents(".curr-row") && $th.parents(".curr-row").data("currrow"); // 当前组ID  左右
	var $up = $th.data("up") && $("#" + $th.data("up")), //向上的焦点元素
		$down = $th.data("down") && $("#" + $th.data("down")), //向下的焦点元素
		$left = $th.data("left") && $("#" + $th.data("left")), //向左的焦点元素
		$right = $th.data("right") && $("#" + $th.data("right")); //向右的焦点元素

	//alert("上下："+$th.data("up")+"，"+$th.data("down"));
	// alert(e.keyCode);
	switch (e.keyCode) {
		case 10252: //遥控器播放建
			if ($(".btn-play-play").is(":visible")) { //判断有播放状态
				$(".btn-play-play").click()
			} else {
				try {
					if (player.$ele[0].paused) {
						player.play();
					} else {
						player.pause();
					}
				} catch (e) {
					//TODO handle the exception
				}

			}
			break;
		case 38: //上
			if (!ajaxerror || !ajaxerror2) {
				return false;
			}
			if ($(".mui-popup-in") && $(".mui-popup-in").length > 0) {
				return false;
			}

			// if ($("#video").hasClass("fullScreen")) {
			//     var video=$("#video")
			//     //exitFull()
			//     video.removeAttr('style')
			//     video.removeClass("fullScreen")
			//     return false;
			// }

			if ($up && par_id != $up.parents(".curr-box").data("currbox")) down_id.push($th.attr("id")); // 比对父级ID， 不是同组记录向下ID
			//alert(down_id)
			// console.log(down_id)
			if (!!$up && $up.length > 0 && $up.is(":visible")) { // 如果有向上的焦点元素
				$th.removeClass("curr"); //移除当前焦点

				if (!$("#" + up_id[up_id.length - 1]).length > 0 && $("#" + up_id[up_id.length - 1]).index() != $up.parents(
						".curr-box").find(".play-item").length - 1 && par_id != $up.parents(".curr-box").data("currbox") && $up.parents(
						".curr-box").find(".play-item").length > 0) {
					up_id.pop(); //移除记录
					var itemId = $up.parents(".curr-box").find(".play-item").last().attr("id") || $up.parents(".curr-box").find(
						".play-item").last().find(".w").attr("id")
					up_id.push(itemId);
				}
				//alert(up_id)
				//alert(up_id.length)
				if (up_id.length > 0 && par_id != $up.parents(".curr-box").data("currbox")) { //如果向上组ID有值， 并且当前组ID不等于向上组ID
					//alert("#" + up_id[up_id.length-1])
					$("#" + up_id[up_id.length - 1]).addClass("curr"); //设置焦点
					up_id.pop(); //移除记录
				} else {
					//alert("无："+$up.attr("class"))
					$up.addClass("curr"); // 设置焦点
				}
			}
			break;
		case 40: //下
			if (!ajaxerror || !ajaxerror2) {
				return false;
			}
			if ($(".mui-popup-in") && $(".mui-popup-in").length > 0) {
				return false;
			}

			if ($down && par_id != $down.parents(".curr-box").data("currbox")) up_id.push($th.attr("id")); //比对父级ID， 不是同组记录向上ID
			// console.log(up_id)
			if (!!$down && !!$down.length > 0 && $down.is(":visible")) { // 如果有向下的焦点元素
				$th.removeClass("curr"); //移除当前焦点
				if (!$("#" + down_id[down_id.length - 1]).length > 0) down_id.pop(); //移除记录
				if (down_id.length > 0 && par_id != $down.parents(".curr-box").data("currbox")) { //如果向下组ID有值、、并且当前组ID不等于向下组ID
					$("#" + down_id[down_id.length - 1]).addClass("curr"); //设置焦点

					down_id.pop(); //移除记录
				} else {
					$down.addClass("curr"); // 设置焦点
				}
			}
			break;
		case 37: //左
			if (!ajaxerror || !ajaxerror2) {
				return false;
			}
			if ($(".mui-popup-in") && $(".mui-popup-in").length > 0) {
				return false;
			}
			//快退
			if ($(".video").hasClass("fullScreen") || $("#video").hasClass("curr")) {
				return false;
			}

			if ($left && par_row_id != $left.parents(".curr-row").data("currrow")) { //比对父级ID， 不是同组记录向上ID
				right_id.push($th.attr("id"));
				// 左右切换 ， 初始化上下组ID
				up_id = [];
				down_id = [];
			}
			if ($left && $left.length > 0 && $left.is(":visible")) { // 如果有向左的焦点元素
				if ($th.parents(".tab-box").data("htab")) { // 首页频道滚动，，  scroll为判断条件
					tab.left($th);
				}
				$th.removeClass("curr"); //移除当前焦点
				if (left_id.length > 0 && par_row_id != $left.parents(".curr-row").data("currrow")) { //如果向下组ID有值、、并且当前组ID不等于向下组ID
					$("#" + left_id[left_id.length - 1]).addClass("curr"); //设置焦点
					left_id.pop(); //移除记录
				} else {
					$left.addClass("curr"); //设置焦点
				}
			}
			break;
		case 39: //右
			if (!ajaxerror || !ajaxerror2) {
				return false;
			}
			if ($(".mui-popup-in") && $(".mui-popup-in").length > 0) {
				return false;
			}

			//快进
			if ($(".video").hasClass("fullScreen") || $("#video").hasClass("curr")) {
				return false;
			}

			if ($right && par_row_id != $right.parents(".curr-row").data("currrow")) { //比对父级ID， 不是同组记录向上ID
				left_id.push($th.attr("id"));
				// 左右切换 ，初始化上下组ID
				up_id = [];
				down_id = [];
			}
			if ($right && $right.length > 0 && $right.is(":visible")) { // 如果有向右的焦点元素
				if ($th.parents(".tab-box").data("htab")) { // 首页频道滚动，，  scroll为判断条件
					tab.right($th);
				}
				$th.removeClass("curr"); //移除当前焦点
				if (right_id.length > 0 && par_row_id != $right.parents(".curr-row").data("currrow")) { //如果向下组ID有值、、并且当前组ID不等于向下组ID
					$("#" + right_id[right_id.length - 1]).addClass("curr"); //设置焦点
					right_id.pop(); //移除记录
				} else {
					$right.addClass("curr"); //设置焦点
				}
			}
			break;
		case 13: //确定
		case 32:
			if (!ajaxerror || !ajaxerror2) {
				window.location.reload(); //刷新
				//      		if(window.location.href.indexOf("home/home-html")==-1){
				//      			window.history.go(-1);
				//      			ajaxerror=true;
				//      		}else{
				//      			window.location.reload();//刷新
				//      		}
			}

			if ($(".mui-popup-in") && $(".mui-popup-in").length > 0) {
				mui.closePopup();
				return false;
			}
			if ($th[0]) {
				$th[0].click();
			}

			break;
		case 10009: //返回      
			if (!ajaxerror || !ajaxerror2) {
				window.location.reload(); //刷新  		
			}

			if ($(".mui-popup-in") && $(".mui-popup-in").length > 0) {
				mui.closePopup();
				return false;
			}

			if ($(".video").length > 0) {
				var video = document.getElementById("video")
				if ($(".video").hasClass("fullScreen")) {
					$(".video").removeAttr('style');
					$(".video").removeClass("fullScreen");
					return false;
				}
			}

			if ($(".popBox,.popBox2,.popBox3,.popBox4,.popBox5,.popBox6,.popBox7").is(':visible')) {
				return false;
			}


			// if ($("#pay-html").length>0) {
			//     if (!$("#pay-html .popBox").is(":visible")&&baks2) {
			//         $(".popBox").show();
			//         $("#pay-html .back-btn .btn").addClass("past-cur");
			//         $("#pay-html .curr").removeClass("curr")
			//         $("#confirm1").addClass("curr");
			//         return false;
			//     }

			//     if ($("#pay-html .popBox").is(":visible")&&baks2) {
			//         $(".popBox").hide();
			//         $(".popBox .curr").removeClass("curr");
			//         $(".past-cur").addClass("curr");
			//         $("#pay-html .curr").removeClass("past-cur");
			//         baks2=false
			//         alert("1")
			//         return false;
			//     }
			// }



			if ($(".btn-back").length > 0) {
				$(".btn-back")[0].click();
			} else {
				if (baks) { //确认退出；
					$(".baks").hide().find("span").text("");
					window.tizen.application.getCurrentApplication().exit();
					return false;
				} else { //d                    
					baks = true;
					$(".baks").show().find("span").text("再按一次[返回]键，退出！"); //
					setTimeout(function() {
						$(".baks").hide().find("span").text("");
						baks = false;
					}, 2000)
				}
			}
			break;
	}
});

//获取url参数
function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.href.split("?")[1].match(reg);
	// var r = window.location.search.substr(1).match(reg);
	// console.log(name,reg,r,window.location,rr);
	if (r != null) {
		return decodeURI(r[2]);
	} else {
		return null;
	}
}



//获取Cookie
function getCookie(name) {
	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	if (arr = document.cookie.match(reg))
		return unescape(arr[2]);
	else
		return "null";
}

//设置Cookie
function setCookie(name, value, Days) {
	var exp = new Date();
	if (Days > 0) {
		exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
	} else {
		exp.setTime(-1);
	}
	document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/";
}

//删除Cookie
function delCookie(name) {
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval = getCookie(name);
	if (cval != null)
		document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString() + ";path=/";
}

//删除所有cookie
function clearCookie() {
	var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
	if (keys) {
		for (var i = keys.length; i--;) {
			document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString() + "; path=/"
		}
	}
}

var setleftright = {}; //设置缓存
if (localStorage.getItem("setleftright")) {
	setleftright = JSON.parse(localStorage.getItem("setleftright"));
};
(function($) {
	$.fn.HTab = function(options) {

		var hTabObj = {
			init: function(ele, options) {
				this.$ele = ele;
				this.tran_x = 0;
				this.defaults = {
					successAjax: function(id) {}
				}
				this.opts = $.extend({}, this.defaults, options);
			},
			left: function(el) {
				var $th = $(el);
				var $par = $th.parent();
				if ($th.prev().offset().left <= 0) { //
					hTabObj.tran_x = hTabObj.tran_x - $par.width() - $th.offset().left + 60 < 0 ? 0 : hTabObj.tran_x - $par.width() -
						$th.offset().left + 60 //当前值减 当前元素的宽度
					$par.css("transform", "translateX(-" + hTabObj.tran_x + "px)");

					setleftright["left"] = "-" + hTabObj.tran_x;
					localStorage.setItem("setleftright", JSON.stringify(setleftright))
				}
			},
			right: function(el) {
				var $th = $(el);
				var $par = $th.parent();
				// console.log($th,$par)
				if ($th.next().offset().left + $th.next().width() >= $par.width()) { // 如果右侧宽度放不下2个元素
					hTabObj.tran_x += $th.next().offset().left - 60; //设置偏移量， 加当前元素宽度
					$par.css("transform", "translateX(-" + hTabObj.tran_x + "px)");

					setleftright["left"] = "-" + hTabObj.tran_x;
					localStorage.setItem("setleftright", JSON.stringify(setleftright))
				}
			}
		}
		hTabObj.init(this, options);
		//点击事件
		$(hTabObj.$ele).find("a").off().on("click", function() {
			//初始化焦点
			up_id = []; // 记录向上ID
			down_id = []; //记录向下ID
			left_id = []; // 记录向左ID
			right_id = []; //记录向右ID

			setleftright["index"] = $(this).index();
			localStorage.setItem("setleftright", JSON.stringify(setleftright))
			$(this).addClass("on").siblings().removeClass("on");
			// if($(this).offset().left < 60) $(this).offset({left: 60});
			var name = $(this).index() != 0 && $(this).text();
			if (hTabObj.opts.successAjax && typeof hTabObj.opts.successAjax == "function") {
				hTabObj.opts.successAjax(name);
			}
		});
		return hTabObj;
	}
})(jQuery)

//无图图像
var nullimg = 'images/null.jpg';

function lod(t) {
	t.onerror = null;
	t.src = nullimg;
	t.className += " auto-bg default-img";
}
$(function() {
	$(".ratio-img").each(function() {
		if ($(this).attr("src") == "") {
			$(this).attr({
				"src": nullimg
			})
		}
	})
})


//扩展mui.showLoading
;
(function($, window) {
	//显示加载框
	$.showLoading = function(message, type) {
		if ($.os.plus && type !== 'div') {
			$.plusReady(function() {
				plus.nativeUI.showWaiting(message);
			});
		} else {
			var html = '';
			html += '<i class="mui-spinner mui-spinner-white"></i>';
			html += '<p class="text">' + (message || "数据加载中") + '</p>';

			//遮罩层
			var mask = document.getElementsByClassName("mui-show-loading-mask");
			if (mask.length == 0) {
				mask = document.createElement('div');
				mask.classList.add("mui-show-loading-mask");
				document.body.appendChild(mask);
				mask.addEventListener("touchmove", function(e) {
					e.stopPropagation();
					e.preventDefault();
				});
			} else {
				mask[0].classList.remove("mui-show-loading-mask-hidden");
			}
			//加载框
			var toast = document.getElementsByClassName("mui-show-loading");
			if (toast.length == 0) {
				toast = document.createElement('div');
				toast.classList.add("mui-show-loading");
				toast.classList.add('loading-visible');
				document.body.appendChild(toast);
				toast.innerHTML = html;
				toast.addEventListener("touchmove", function(e) {
					e.stopPropagation();
					e.preventDefault();
				});
			} else {
				toast[0].innerHTML = html;
				toast[0].classList.add("loading-visible");
			}
		}
	};

	//隐藏加载框
	$.hideLoading = function(callback) {
		if ($.os.plus) {
			$.plusReady(function() {
				plus.nativeUI.closeWaiting();
			});
		}
		var mask = document.getElementsByClassName("mui-show-loading-mask");
		var toast = document.getElementsByClassName("mui-show-loading");
		if (mask.length > 0) {
			mask[0].classList.add("mui-show-loading-mask-hidden");
		}
		if (toast.length > 0) {
			toast[0].classList.remove("loading-visible");
			callback && callback();
		}
	}
})(mui, window);
var ajaxerror = true;
var ajaxerror2 = true;
var ajaxerror3 = true;

function globalAjax(url, data, call) {
	var tim111 = setTimeout(function() {
		mui.showLoading("正在加载..", "div");
		$("body").addClass("loading");
		clearInterval(tim111);
	}, 200);
	$.ajax({
		type: "get",
		dataType: "json",
		timeout: 30000,
		url: jsonpath + url,
		data: data,
		cache: false,
		success: function(h) {
			clearTimeout(tim111);
			mui.hideLoading(); //隐藏后的回调函数
			$("body").removeClass("loading");
			call && call(h);
		},
		error: function(XMLHttpRequest, status) {
			clearTimeout(tim111);
			mui.hideLoading(); //隐藏后的回调函数
			if (ajaxerror && status == 'error') {
				ajaxerror = false;
				//mui.alert("网路异常，请检查网络或重新加载~");
				ceng = 1;
				parceng = 1;
				Q.go("refresh/refresh-html");

			}

			if (status == 'timeout') { //超时,status还有success,error等值的情况
				mui.toast("请求超时!");
				if (ceng != 1) {
					history.go(-1);
				}
			}

			if (status == 'parsererror') {
				mui.toast("数据错误!");
				if (ceng != 1) {
					history.go(-1);
				}
			}

			$("body").removeClass("loading");
		}
	});
}

function globalAjaxB(url, data, call) {
	var tim222 = setTimeout(function() {
		mui.showLoading("正在加载..", "div");
		$("body").addClass("loading");
		clearInterval(tim222);
	}, 200);
	$.ajax({
		type: "get",
		dataType: "json",
		timeout: 30000,
		url: jsonpath + url,
		data: data,
		cache: false,
		async: false,
		success: function(h) {
			clearTimeout(tim222);
			mui.hideLoading(); //隐藏后的回调函数
			$("body").removeClass("loading");
			call && call(h);
		},
		error: function(XMLHttpRequest, status) {
			clearTimeout(tim222);
			mui.hideLoading(); //隐藏后的回调函数
			if (ajaxerror2 && status == 'error') {
				ajaxerror2 = false;
				//mui.alert("网路异常，请检查网络或重新加载~");
				ceng = 1;
				parceng = 1;
				Q.go("refresh/refresh-html");

			}

			if (status == 'timeout') { //超时,status还有success,error等值的情况
				mui.toast("请求超时!");
				if (ceng != 1) {
					history.go(-1);
				}
			}

			if (status == 'parsererror') {
				mui.toast("数据错误!");
				if (ceng != 1) {
					history.go(-1);
				}
			}

			$("body").removeClass("loading");
		}
	});
}
/*
 * 上传日志
 */

function getLog(log) {
	// 通用参数
	var odata = {
		message: log
	}
	// 拼接传入参数
	odata = JSON.stringify(odata)
	// 请求
	$.ajax({
		type: "get",
		dataType: "json",
		timeout: 30000,
		url: 'http://api.dig24.cn/fit2/public/log/info?message=' + log,
		data: null,
		// contentType: 'application/json',
		// cache: false,
		success: function(h) {
			console.log(h)
		},
		error: function(XMLHttpRequest, status) {
			if (ajaxerror && status == 'error') {
				ajaxerror = false;
				//mui.alert("网路异常，请检查网络或重新加载~");
				ceng = 1;
				parceng = 1;
				Q.go("refresh/refresh-html");

			}

			if (status == 'timeout') { //超时,status还有success,error等值的情况
				mui.toast("请求超时!");
				if (ceng != 1) {
					history.go(-1);
				}
			}

			if (status == 'parsererror') {
				mui.toast("数据错误!");
			}
		}
	});
}
function globalAjaxC(url, data, call) {
	var tim333 = setTimeout(function() {
		mui.showLoading("正在加载..", "div");
		$("body").addClass("loading");
		clearInterval(tim333);
	}, 200);
	$.ajax({
		type: "get",
		dataType: "json",
		timeout: 30000,
		url: jsonpath2 + url,
		data: data,
		cache: false,
		// async: true,
		success: function(h) {
			clearTimeout(tim333);
			mui.hideLoading(); //隐藏后的回调函数
			$("body").removeClass("loading");
			call && call(h);
		},
		error: function(XMLHttpRequest, status) {
			clearTimeout(tim333);
			mui.hideLoading(); //隐藏后的回调函数
			if (ajaxerror3 && status == 'error') {
				ajaxerror3 = false;
				//mui.alert("网路异常，请检查网络或重新加载~");
				ceng = 1;
				parceng = 1;
				Q.go("refresh/refresh-html");

			}

			if (status == 'timeout') { //超时,status还有success,error等值的情况
				mui.toast("请求超时!");
				if (ceng != 1) {
					history.go(-1);
				}
			}

			if (status == 'parsererror') {
				// mui.toast("数据错误!");
				if (ceng != 1) {
					history.go(-1);
				}
			}

			$("body").removeClass("loading");
		}
	});
}

function globalAjaxD(url, data, call) {
	var tim333 = setTimeout(function() {
		mui.showLoading("正在加载..", "div");
		$("body").addClass("loading");
		clearInterval(tim333);
	}, 200);
	$.ajax({
		type: "get",
		dataType: "html",
		timeout: 30000,
		url: jsonpath2 + url,
		data: data,
		cache: false,
		async: true,
		success: function(h) {
			clearTimeout(tim333);
			mui.hideLoading(); //隐藏后的回调函数
			$("body").removeClass("loading");
			call && call(h);
		},
		error: function(XMLHttpRequest, status) {
			clearTimeout(tim333);
			mui.hideLoading(); //隐藏后的回调函数
			if (ajaxerror2 && status == 'error') {
				ajaxerror2 = false;
				//mui.alert("网路异常，请检查网络或重新加载~");
				ceng = 1;
				parceng = 1;
				Q.go("refresh/refresh-html");

			}

			if (status == 'timeout') { //超时,status还有success,error等值的情况
				mui.toast("请求超时!");
				if (ceng != 1) {
					history.go(-1);
				}
			}

			if (status == 'parsererror') {
				// mui.toast("数据错误!");
				if (ceng != 1) {
					history.go(-1);
				}
			}

			$("body").removeClass("loading");
		}
	});
}

function secondToDate(result) {
	var h = Math.floor(result / 3600) < 10 ? '0' + Math.floor(result / 3600) : Math.floor(result / 3600);
	var m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60));
	var s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60));
	return result = h + ":" + m + ":" + s;
}

function secondToTime(result) {
	var m = Math.floor((result / 60 % 60)) < 10 ? Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60));
	return result = m
}
