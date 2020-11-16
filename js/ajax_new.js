//全局路由分配
function main() {
	//注册路由
	Q.reg('main', function(aid) {
		var route = window.location.hash.slice(2),
			type = 0,
			can = route.split("?")[1],
			route = route.split("?")[0];
		if (route == "") return false;
		ajax_new(route, type, can);
	});
	Q.init({
		index: 'main'
	});

	//ISO去除延迟
	FastClick.attach(document.body);

	// document.getElementById('loading').style.display = "none";
	Q.go("home/home-html");
}
var parceng = 1 //上级
//渲染页面模版
var set_id = {
	up_id: [],
	down_id: [],
	left_id: [],
	right_id: []
}

function ajax_new(href, a_type, can) {
	var href = href.replace(/-html/, ".html");
	var can = can;
	var r_html = $("#r_html");
	var r_html_2 = $("#r_html_2");
	var r_html_3 = $("#r_html_3");
	var r_html_4 = $("#r_html_4");
	var r_html_5 = $("#r_html_5");
	var r_html_6 = $("#r_html_6");
	//var play_href = href;
	if(window.location.hash.indexOf("list-play-html")!=-1){
	    set_id={
	        up_id:up_id,
	        down_id:down_id,
	        left_id:left_id,
	        right_id:right_id
	    }
	}

	// 防止缓存
	if (href.indexOf("?") == -1) {
		href = href + "?ver=" + Math.random();
	} else {
		href = href + "&ver=" + Math.random();
	}
	
	mui.showLoading("正在加载..", "div");
	$("body").addClass("loading");
	parceng = ceng;
	if (!can) can = "";
	
	// 会员页支付页强制刷新
	if (href.indexOf("vip") != -1 || href.indexOf("pay") != -1) {
		parceng = 1
	}
	
	if (can.indexOf("ceng2") != -1) {
		ceng = 2;
	} else if (can.indexOf("ceng3") != -1) {
		ceng = 3;
	} else if (can.indexOf("ceng4") != -1) {
		ceng = 4;
	} else if (can.indexOf("ceng5") != -1) {
		ceng = 5;
	} else if (can.indexOf("ceng6") != -1) {
		ceng = 6;
	} else if (can.indexOf("resh") != -1) {
		ceng = 1;
		parceng = 1
	} else {
		ceng = 1;
	}
	if (parceng > ceng) { //如果是返回键执行显示隐藏 不渲染页面
		switch (ceng) {
			case 1:
				r_html.show()
				r_html_2.hide().html("");
				r_html_3.hide().html("");
				r_html_4.hide().html("");
				r_html_5.hide().html("");
				r_html_6.hide().html("");
				break;
			case 2:
				r_html_2.show()
				r_html_3.hide().html("");
				r_html_4.hide().html("");
				r_html_5.hide().html("");
				r_html_6.hide().html("");
				r_html.hide();
				break;
			case 3:
				r_html_3.show();
				r_html_4.hide().html("");
				r_html_5.hide().html("");
				r_html_6.hide().html("");
				r_html_2.hide();
				r_html.hide();
				break;
			case 4:
				r_html_4.show();
				r_html_5.hide().html("");
				r_html_6.hide().html("");
				r_html_3.hide();
				r_html_2.hide();
				r_html.hide();
				break;
			case 5:
				r_html_6.hide().html("");
				r_html_5.show();
				r_html_4.hide();
				r_html_3.hide();
				r_html_2.hide();
				r_html.hide();
				break;
			case 6:
				r_html_6.show();
				r_html_5.hide();
				r_html_4.hide();
				r_html_3.hide();
				r_html_2.hide();
				r_html.hide();
				break;
			default:
				mui.toast("层级错误！")
				break;
		}
		//初始化焦点
		up_id = []; // 记录向上ID
		down_id = []; //记录向下ID
		left_id = []; // 记录向左ID
		right_id = []; //记录向右ID

		//     if(window.location.hash.indexOf("list-list-html")!=-1){
		//     up_id=set_id.up_id
		//     down_id=set_id.down_id
		//     left_id=set_id.left_id
		//     right_id=set_id.right_id
		// }

		//playHtml(play_href); // 更新播放器内容
		mui.hideLoading(); //隐藏后的回调函数
		$("body").removeClass("loading");

		return false;
	}


	$.ajax({
		url: href,
		type: "get",
		timeout: 7000,
		dataType: "html",
		cache: true,
		success: function(html) {
			switch (ceng) {
				case 6:
					r_html_6.show().html(html);
					r_html_5.hide();
					r_html_4.hide();
					r_html_3.hide();
					r_html_2.hide();
					r_html.hide();
					break;
				case 5:
					r_html_6.html("").hide();
					r_html_5.show().html(html);
					r_html_4.hide();
					r_html_3.hide();
					r_html_2.hide();
					r_html.hide();
					break;
				case 4:
					r_html_4.show().html(html);
					r_html_6.html("").hide();
					r_html_5.html("").hide();
					r_html_3.hide();
					r_html_2.hide();
					r_html.hide();
					break;
				case 3:
					r_html_3.show().html(html);
					r_html_6.html("").hide();
					r_html_5.html("").hide();
					r_html_4.html("").hide();
					r_html_2.hide();
					r_html.hide();
					break;
				case 2:
					r_html_2.show().html(html);
					r_html_6.html("").hide();
					r_html_5.html("").hide();
					r_html_4.html("").hide();
					r_html_3.html("").hide();
					r_html.hide();
					break;
				case 1:
					r_html.show().html(html);
					r_html_6.html("").hide();
					r_html_5.html("").hide();
					r_html_4.html("").hide();
					r_html_2.html("").hide();
					r_html_3.html("").hide();
					break;
				default:
					mui.toast("层级错误！")
					break;
			}
			if ($("#start-img").is(':visible')) {
				setTimeout(function() {
					$("#start-img").hide();
				}, 2000)
			}
			//初始化焦点
			up_id = []; // 记录向上ID
			down_id = []; //记录向下ID
			left_id = []; // 记录向左ID
			right_id = []; //记录向右ID

			//playHtml(play_href); // 更新播放器内容
			mui.hideLoading(); //隐藏后的回调函数
			$("body").removeClass("loading");
		},
		error: function(err) {
			mui.hideLoading(); //隐藏后的回调函数
			mui.toast("加载错误");
		}
	});
}
