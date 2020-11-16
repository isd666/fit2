/**
 * Created by Administrator on 2018/3/6.
 */
(function(window) {
    var Page = function(options) {
        var default1 = {
            ele: "page",
            page: 8,
            //homeText: "首页",
            //backText: "尾页",
            prevText: "上一页",
            nextText: "下一页",
            pageNum: 5,
            curr: 1
        }
        for (var i in options) {
            default1[i] = options[i]
        }
        var opts = default1;
        return new Page.fn.init(opts);
    }

    Page.fn = Page.prototype = {
        constructor: Page,
        init: function(opts) {
            this.page = opts.page;
            this.curr = opts.curr;
            this.el = opts.ele;
            // this.homeText = opts.homeText;
            // this.backText = opts.backText;
            this.prevText = opts.prevText;
            this.nextText = opts.nextText;
            this.pageNum = opts.pageNum;
            this.changePage = opts.changePage;
            this.currPage = opts.currPage;
            var num = this.page >= this.pageNum ? this.pageNum : this.page;
            // /console.log(this.el);
            this.makeHtml("",1,num);  // 初始化
        },
        makeHtml: function(currPage, startPage, endPage, eleId) {
            var el = document.getElementById(this.el);
            var id = el.dataset.currbox + "-";
            var up = el.dataset.prevbox;
            var ii = 2;
            var prev = '<a href="javascript:;" id="'+id+''+1+'" data-up="'+up+'" data-right="'+id+''+2+'" class="page-prev f-40 flex-center">'+this.prevText+'</a>';
            //var home = '<a href="javascript:;" id="'+id+''+1+'" data-up="'+up+'" data-right="'+id+''+(2)+'" class="c999 page-home">'+this.homeText+'</a>';
            var zongye = '<span class="f-20 cfff f-b">共'+this.page+'页</span>';
            var page = "";
            for(var i=startPage; i<=endPage; i++) { //根据page创建分页
                if (i == currPage) {
                    page += '<a href="javascript:;" id="'+id+''+(ii)+'" data-up="'+up+'" data-left="'+id+''+(ii-1)+'" data-right="'+id+''+(ii+1)+'" class="page-on">'+i+'</a>';
                }else {
                    if (currPage == "" && i == startPage) {
                        page += '<a href="javascript:;" id="'+id+''+(ii)+'" data-up="'+up+'" data-left="'+id+''+(ii-1)+'" data-right="'+id+''+(ii+1)+'" class="page-on">'+i+'</a>';
                    }else{
                        page += '<a href="javascript:;" id="'+id+''+(ii)+'" data-up="'+up+'" data-left="'+id+''+(ii-1)+'" data-right="'+id+''+(ii+1)+'">'+i+'</a>';
                    }
                }
                ii++;
            }
            var next = '<a href="javascript:;" id="'+id+''+(ii)+'" data-up="'+up+'" data-left="'+id+''+(ii-1)+'" class="page-next f-40 flex-center mag-l-20">'+this.nextText+'</a>';
            //var back = '<a href="javascript:;" id="'+id+''+(ii+1)+'" data-up="'+up+'" data-left="'+id+''+(ii)+'" class="c999 page-back">'+this.backText+'</a>';
            var html =  prev + page + next + zongye;
            el.innerHTML = html;
            //alert(html)
            if (eleId) {
                var currEl = document.getElementsByClassName(eleId)[0] || document.getElementById(eleId);
                currEl.className += " curr";  //设置当前点击焦点
            }

            //添加事件
            var btn = el.getElementsByTagName("a");
            var obj = this;
            for (var i=0; i<btn.length; i++){
                btn[i].onclick = function () {
                    $("#page .curr").removeClass("curr");
                    $(this).addClass("curr");
                    var currPage = 0;
                    var class_name = this.className;
                    // if (class_name.indexOf("page-home") != -1) {  //  点击首页
                    //     if(startPage == 1) return false; // 当前是首页
                    //     startPage = 1;
                    //     endPage = startPage + obj.pageNum > obj.page ? obj.page : startPage + obj.pageNum - 1;
                    //     currPage = startPage;
                    //     obj.makeHtml(currPage,startPage,endPage, "page-home");
                    // }else if (class_name.indexOf("page-back") != -1) {  // 点击尾页
                    //     if(endPage == obj.page) return false; // 当前是尾页
                    //     endPage = obj.page;
                    //     startPage = endPage - obj.pageNum + 1 < 1  ? 1 : endPage - obj.pageNum+1;
                    //     currPage = endPage;
                    //     obj.makeHtml(currPage,startPage,endPage, "page-back");
                    // }else 
                    if (class_name.indexOf("page-prev") != -1) {  // 点击上一页
                        if (startPage == 1) {
                            mui.toast("已经是第一页了")
                            return false
                        };  // 如果当前是第一页
                        startPage = startPage - obj.pageNum < 1 ? 1 : startPage - obj.pageNum;
                        endPage = startPage + obj.pageNum > obj.page ? obj.page : startPage + obj.pageNum - 1;
                        currPage = startPage;
                        obj.makeHtml(currPage,startPage,endPage,"page-prev");
                    }else if (class_name.indexOf("page-next") != -1) {  // 点击下一页
                        if (endPage == obj.page) {
                            mui.toast("已经是最后一页了")
                            return false
                        };  // 如果当前是最后一页
                        startPage = endPage + 1 + obj.pageNum > obj.page ? obj.page - obj.pageNum + 1 : endPage + 1;
                        endPage = endPage + obj.pageNum > obj.page ? obj.page : endPage + obj.pageNum;
                        currPage = startPage;
                        obj.makeHtml(currPage,startPage,endPage, "page-next");
                    }else {  // 点击其他分页
                        if(class_name.indexOf("page-on") != -1) return false; // 防止重复调用
                        currPage = this.textContent || this.innerText;
                        currPage = Number(currPage);
                        if (currPage == startPage) { //当前分页是最前一个
                            startPage = (currPage - Math.floor(obj.pageNum/2)) < 1 ? 1 : (currPage - Math.floor(obj.pageNum/2));
                            endPage = startPage + obj.pageNum > obj.page ? obj.page : startPage + obj.pageNum - 1;
                        }
                        if (currPage == endPage) {  // 当前分页是最后一个
                            endPage = (currPage + Math.floor(obj.pageNum/2)) > obj.page ? obj.page : (currPage + Math.floor(obj.pageNum/2));
                            startPage = endPage - obj.pageNum + 1 < 1  ? 1 : endPage - obj.pageNum+1;
                        }
                        obj.makeHtml(currPage,startPage,endPage, this.id);
                        $(".page a.curr").removeClass("curr");
                        $(".page a.page-on").addClass("curr");
                    }
                    // if (obj.currPage && typeof obj.currPage == "function") obj.currPage(currPage);
                    obj.curr = currPage;
                    if (obj.changePage && typeof obj.changePage == "function") obj.changePage(currPage);
                }
            }
        },
        changePageF: function (page) {
            var endPage = page + this.pageNum > this.page ? this.page : page + this.pageNum - 1;
            var startPage = endPage - this.pageNum + 1 < 1  ? 1 : endPage - this.pageNum+1;
            this.makeHtml(page,startPage,endPage);
            this.curr = page;
            if (this.changePage && typeof this.changePage == "function") this.changePage(page);
        }
    }
    Page.fn.init.prototype = Page.fn;
    window.Page = Page;
})(window);