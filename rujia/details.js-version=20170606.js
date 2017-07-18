
function loadRecomments(pageIndex) {
    var parms = {
        hotelcd: $("#hotelCd").val(),
        pageNo: pageIndex
    };
    $("#loadinguser_review_list").show();
    $(".user_review_list").load("/HotelAct/dianping", parms, function () {
        var totalRow = parseInt($("#TotalRows").val());
        var currentPageIndex = parseInt($("#currentPageIndex").val());
        initPagination(totalRow, currentPageIndex);
        $("#loadinguser_review_list").hide();
    });
}


function loadRoomTypeList() {

    var memberNo = $(".clientele span").text();

    var params = {
        ArrDate: $("#beginDate").val(),
        DepDate: $("#endDate").val(),
        hotelCd: $('#hotelCd').val(),
        memberNo: memberNo
    }
    $("#loadingRoomTypes").show();
    if ($(".rj_roomtypebox").size() > 0) {//经济型 
        $(".list_roomtype").empty();
        $(".list_roomtype").load("/HotelAct/HotelRomList", params, function () {
            //早点未登录
            $(".break_ago").hover(function () {
                $(".list_room_break").show();//.css({ "left": $(this).offset().left - 546, "top": $(this).offset().top - 846 });
            }, function () {
                $(".list_room_break").hide();
            });
            //返券礼包hover
            $(".price_row_return").hover(function () {
                $(".return_tip_tk").show().css({ "left": $(this).offset().left - 90, "top": $(this).offset().top - 100 });
                if ($(this).data("gr2") == '1') {
                    $(".return_tip1").show();
                    $(".return_tip2").hide();
                } else {
                    $(".return_tip2").show();
                    $(".return_tip1").hide();
                }
            }, function () {
                $(".return_tip_tk").hide()
            })
            $(".price_row_gift").hover(function () {
                $(".gift_tip_tk").show().css({ "left": $(this).offset().left - 96, "top": $(this).offset().top - 81 });
            }, function () {
                $(".gift_tip_tk").hide()
            })
            zoomIn2();
            $("#loadingRoomTypes").hide();
            $(".list_room_fix:last-child").css({ "borderBottom": "0 none" });

        });
    } else {//中高端
        $("#roomTypeContanner").empty();
        $("#roomTypeContanner").load("/HotelAct/HotelRomList_JG", params, function () {
            //返券礼包hover
            $(".price_row_return").hover(function () {
                $(".return_tip_tk").show().css({ "left": $(this).offset().left - 90, "top": $(this).offset().top - 100 });
                if ($(this).data("gr2") == '1') {
                    $(".return_tip1").show();
                    $(".return_tip2").hide();
                } else {
                    $(".return_tip2").show();
                    $(".return_tip1").hide();
                }
            }, function () {
                $(".return_tip_tk").hide()
            })
            $(".price_row_gift").hover(function () {
                $(".gift_tip_tk").show().css({ "left": $(this).offset().left - 96, "top": $(this).offset().top - 81 });
            }, function () {
                $(".gift_tip_tk").hide()
            })

            zoomIn2();
            $("#loadingRoomTypes").hide();
            $(".list_room_fix:last-child").css({ "borderBottom": "0 none" });

        });

    }

}
function zoomIn2() {
    /*图片放大2*/
    $(".list_room_img").mouseover(function (e) {
        $(".room_bigon").show().css({ "left": (e.pageX + 5) + "px", "top": (e.pageY + 5) + "px" });
        img_src = "<img  onerror='javascript:this.style.display=\"none\"' src='" + $(this).attr('src_img') + "'/>";
        $(".room_bigon ul").append(img_src);
    }).mouseout(function (e) {
        $(".room_bigon").hide().children("ul").empty();
    }).mousemove(function (e) {
        $(".room_bigon").css({ "left": (e.pageX + 5) + "px", "top": (e.pageY + 5) + "px" });
    });
}
//日期改变/ 在日期控件中调用此方法 time.js
function dateChaged() {
    $("#beginDate").val($(".start_data").val());
    $("#endDate").val($(".end_data").val());
    var days = DateDiff($("#beginDate").val(), $("#endDate").val());
    $("#totalDate").text(days);
}
var firstLoad = true;
var currentIndexTemp//保存当前页面索引
function initPagination(totalRow, currentPageIndex) {
    $(".page").pagination(totalRow, {
        num_edge_entries: 1, //边缘页数
        num_display_entries: 5, //主体页数
        current_page: currentPageIndex - 1,
        items_per_page: 10, //每页显示10项
        callback: function (pageindex, jq) {
            //pageindex = pageindex + 1;
            LG.log("首次加载：" + firstLoad);
            if (firstLoad || pageindex == currentIndexTemp - 1) {
                LG.log("跳过首次加载。");
                firstLoad = false;
                return false;
            }
            currentIndexTemp = pageindex + 1;
            loadRecomments(currentIndexTemp);
            return false;
        }//回调函数
    });

}
//判断地图前面的span的长度
$(function () {
    if ($('.list_intro_address_tj span').width() >= 380) {
        $('.list_intro_address_tj span').css("width", 380);
    }
})
$(function () {
    $(".information .information_list ul dl.service_iconfix").each(function () {
        $(this).children("dd:gt(3)").hide();
    });
    $(".service_jt").click(function () {
        if ($(this).children("span").html() == "全部展开") {
            $(".information .information_list ul dl.service_iconfix dd").show();
            $(this).children("span").html("收起");
            $(this).children("code").html("&#xe64b;");
        } else if ($(this).children("span").html() == "收起") {
            $(".information .information_list ul dl.service_iconfix").each(function () {
                $(this).children("dd:gt(3)").hide();
            });
            $(this).children("span").html("全部展开");
            $(this).children("code").html("&#xe665;");
        }

    });
});
$(function () {

    var hotelName = $(".list_introduce .list_introduce_l DIV.head").text();
    $("body #roomTypeContanner").on("click", ".span5 a,.list_room_yd a", function () {
        var params = LG.getParams($(this).attr("href"));
        if (params) {
            var roomTypeName = params["RmTpCd"];
            publicFn(7, "002359", hotelName, roomTypeName);
        } 
    })
    //加载房型
    loadRoomTypeList();
    $(".list_cx_button").click(function () {
        publicFn(6, "002359");
        loadRoomTypeList();
    });
    //加载评论 

    loadRecomments(1);

    $(".list_intro_map").click(function () {
        $("#key").val('H' + $(this).data("hotelcd"));
        $("#keyDescript").val($(this).data("hotelnm"));
        $("#cityName").val($(this).data("city"));
        $("#frm").attr("action", "/map/" + $(this).data("city"));
        $("#frm").submit();
    });

    /*hover小标签显示*/
    $(".langman_tip").hover(function () {
        $(".langman_tip_tk").show()
    }, function () {
        $(".langman_tip_tk").hide()
    })
    $(".zero_tip").hover(function () {
        $(".zero_tip_tk").show()
    }, function () {
        $(".zero_tip_tk").hide()
    })
    $(".ticket_tip").hover(function () {
        $(".ticket_tip_tk").show()
    }, function () {
        $(".ticket_tip_tk").hide()
    })
    $(".gaokao_tip").hover(function () {
        $(".gaokao_tip_tk").show()
    }, function () {
        $(".gaokao_tip_tk").hide()
    })

    $(".list_intro_money_top").find("code").hover(function () {
        $(".list_money_po").show()
    }, function () {
        $(".list_money_po").hide()
    })

    /*划入*/
    $(".grade .synthesiz_score .li2").hover(function () {
        $(this).css("text-decoration", "underline")
    }, function () {
        $(this).css("text-decoration", "none")
    })
    /*全景*/
    var overallurl = jQuery(".ifm").data('overallurl');
    var str = '<iframe id="ifmOverAll" style="width:1000px;height:470px" src="' + overallurl + '" allowtransparency="true" frameborder="0">' + '</iframe>';
    $(".tab_pic .icon_l").click(function () {//全景
        $(".panorama").show();
        $(".ifm").append(str);
    })
    $(".ifm").find(".delete").click(function () {
        $(".panorama").hide();
        $("#ifmOverAll").remove()
    })
    /*轮播图*/
    $(".tab_pic .icon_r").click(function () {
        $(".mask").show()
    })

    $(".tab_image_list .delete").click(function (event) {
        $(".mask").hide()
    })
    var curIndex = 0;//当前index
    var imgLen = $(".tab_image_list .image_list ul").children("li").length;
    var li_w = $(".tab_image_list .image_list ul li").eq(0).width();
    $(".tab_image_list .image_list").find("ul").css("width", imgLen * li_w)

    $(".tab_image_list .price").click(function () {
        //根据curIndex进行上一个图片处理 
        curIndex = (curIndex > 0) ? (--curIndex) : (imgLen - 1);
        changeTo(curIndex);
        curIndex2 = curIndex + 1
        $(".tab_numb .span1").html(curIndex2)
    });
    //右箭头点击处理
    $(".tab_image_list .next").click(function () {
        curIndex = (curIndex < imgLen - 1) ? (++curIndex) : 0;
        changeTo(curIndex);
        curIndex1 = curIndex + 1;
        $(".tab_numb .span1").html(curIndex1);
    });
    $(".tab_numb .span2").html($(".image_list_bt ol li").length)
    $(".tab_pic .icon_r span.number").html($(".image_list_bt ol li").length + "张")
    function changeTo(num) {
        var goLeft = num * li_w;
        $(".tab_image_list .image_list ul").stop().animate({ left: "-" + goLeft + "px" }, 500);
        $(".image_list_bt ol li div").find("span").removeClass("active").eq(num).addClass("active");
    }
    //对下面进行事件绑定处理等
    $(".image_list_bt ol li").each(function (item, element) {
        $(element).click(function () {
            $(".tab_numb .span1").html(item + 1)
            changeTo(item);
            curIndex = item
        })
    });
    $(".image_list_bt ol li").each(function (item, element) {
        $(element).hover(function () {
            $(".image_list_bt ol").find("li").removeClass("active").eq(item).addClass("active");
        })
    });
    /*轮播结束*/

    /*图片放大1*/
    var picWidth;
    $(".sk_pic .fd_image_pic div div").mouseover(function () {
        var thissrc = $(this).attr("_src");
        $(".datu").show().find("img").attr("src", thissrc);
        picWidth = $('.datu img').width();


    });
    $(".sk_pic .fd_image_pic div div").mousemove(function (e) {

        if (e.target == this) {
            var thissrc = $(this).attr("_src");

            if (e.pageY + $('.datu').height() + 50 > $(window).height() + $(window).scrollTop()) {
                $(".datu").css({ "bottom": "0px", "top": "auto", "position": "fixed" });
            } else {
                $(".datu").css({ "bottom": "auto", "top": e.pageY + 5, "position": "absolute" });
            }
            if ($(this).parent("div").hasClass("pic4") || $(this).parent("div").hasClass("pic3") || $(this).parent("div").hasClass("pic7") || $(this).parent("div").hasClass("pic8")) {
                $(".datu").css({ "left": e.pageX - picWidth - 20 });
            } else {
                $(".datu").css({ "left": e.pageX + 20 });
            }

        }


    });

    $(".sk_pic .fd_image_pic div.notfound_img div").mouseout(function (e) {

        $(".datu").hide();



    });

    /*评价/选项卡*/

    var tab_list_len = $(".tab_list .list ul li").length;

    var tab_list_w = $(".tab_list .list ul li").width();
    $(".tab_list .list").find("ul").css("width", tab_list_w * tab_list_len)
    var tab_list_ready = 0
    $(".tab_list a.price").click(function () {
        tab_list_ready--;
        if (tab_list_ready < 0) {
            tab_list_ready = 0
            return false
        }
        var num = $(".tab_list .list ul").find("li").eq(0).attr("data-username")
        $(".remark_on_name span").html(num)
        $(".tab_list .list").find("ul").animate({ left: tab_list_w * -tab_list_ready }, 500)
    })
    $(".tab_list a.next").click(function () {
        tab_list_ready++;
        if (tab_list_ready > tab_list_len - 1) {
            tab_list_ready = tab_list_len - 1
            return false
        }
        var num1 = $(".tab_list .list ul").find("li").eq(1).attr("data-username")
        $(".remark_on_name span").html(num1)
        $(".tab_list .list").find("ul").animate({ left: tab_list_w * -tab_list_ready }, 500)
    })
    $(".tab_list a").hover(function () {
        $(this).addClass("active")
        $(this).find("span").addClass("active")
    }, function () {
        $(this).removeClass("active")
        $(this).find("span").removeClass("active")
    })
    $(".tab_list a").click(function () {
        $(this).addClass("select")
        $(this).find("span").addClass("select")
        $(this).siblings().find("span").removeClass("select")
        $(this).siblings().removeClass("select")
    })

    /*nav 高亮*/
    $(".nav_top .nav_list a").hover(
        function () {
            $(this).addClass("active")
        },
        function () {
            $(this).removeClass("active")
        }
    )
    $(".nav_top .nav_list a").click(function () {
        $(this).addClass("btn").siblings().removeClass("btn")
    })
    /*预定 高亮 hover*/
    $(".table_list td .span5").find("a").hover(function () {
        $(this).css({
            "color": "#ffffff",
            "background": "#c0191f"
        })
    }, function () {
        $(this).css({
            "color": "#c0191f",
            "background": "#ffffff"
        })
    })

    /*小icon hover*/
    $(".table_list_brown").hover(function () {
        $(this).find(".tips_brown").show()
    }, function () {
        $(this).find(".tips_brown").hide()
    })
    /*价格hover*/
    $(".table_list .td4 .span3").hover(function () {
        $(this).siblings(".list_room_money").show();
        $(this).siblings(".list_login_money").show()
    }, function () {
        $(this).siblings(".list_room_money").hide();
        $(this).siblings(".list_login_money").hide()
    })
    /*附近酒店hover*/
    $(".nearby_hotel dl").each(function (i, element) {
        $(element).hover(function () {
            $(element).css("border", "1px solid #E5E5E5")
        }, function () {
            $(element).css("border", "1px solid #f9f8f6")
        })
    })
    /*吃喝玩乐选项卡*/
    $(".traffic_tab a").each(function (item, element) {
        $(element).click(function () {
            $(element).addClass("active").siblings().removeClass("active");
            $(".tab_cate_list .cate_list").eq(item).show().siblings().hide()
        })
    })
    /*评价*/
    $(".user_review_list").children("dl").eq(0).css({
        "marginTop": "0",
    })
    $(".user_review_list").children("dl").eq(0).children().eq(1).css({
        "borderTop": "none"
    })
    /*来自xxx评论选项卡*/
    $(".user_reviews .tab a").each(function (i, element) {
        $(element).click(function () {
            $(element).addClass("active").siblings().removeClass("active")
            $(".user_reviews_cont").removeClass("active")
            $(".user_reviews_cont").eq(i).addClass("active");
        })
    })
    /*页面滚动导航条置顶*/
    //	var nav_top_ofst=$(".nav_top").offset().top;
    //	alert(nav_top_ofst)
    $(".list_cx_button a").live("click", function () {
        $("html,body").animate({ scrollTop: $("#detail_top_nav").offset().top }, 1000);
    });

    $(window).scroll(function () {
        if ($(window).scrollTop() > 554) {
            $(".date_box").addClass("active")
            $(".nav_top").addClass("active")
            $(".nav_list").addClass("active")
            $(".nav_top a").addClass("select")
            $(".list_cx_button a").addClass("active")
            $(".nav_time").addClass("active")

        } else {
            $(".date_box").removeClass("active")
            $(".nav_top").removeClass("active")
            $(".nav_list").removeClass("active")
            $(".nav_top a").removeClass("select")
            $(".list_cx_button a").removeClass("active")
            $(".nav_time").removeClass("active")
        }
    })
    $(window).scroll(function () {
        if ($(window).width() > 976 && $(window).width() < 1183 && $(window).scrollTop() > 554) {
            $(".nav_list").addClass("select")
            $(".nav_list a").addClass("select")
            $(".date_box").addClass("select")
        } else {
            $(".nav_list").removeClass("select")
            $(".nav_list a").removeClass("select")
            $(".date_box").removeClass("select")
        }
    })

    $(window).resize(function () {
        if ($(window).scrollTop() > 554) {
            $(".date_box").addClass("active")
            $(".nav_top").addClass("active")
            $(".nav_list").addClass("active")
            $(".nav_top a").addClass("select")
            $(".list_cx_button a").addClass("active")
        } else {
            $(".date_box").removeClass("active")
            $(".nav_top").removeClass("active")
            $(".nav_list").removeClass("active")
            $(".nav_top a").removeClass("select")
            $(".list_cx_button a").removeClass("active")
        }
    })
    $(window).resize(function () {
        if ($(window).width() > 976 && $(window).width() < 1183 && $(window).scrollTop() > 554) {
            $(".nav_list").addClass("select")
            $(".nav_list a").addClass("select")
            $(".date_box").addClass("select")
        } else {
            $(".nav_list").removeClass("select")
            $(".nav_list a").removeClass("select")
            $(".date_box").removeClass("select")
        }
    })


    $(".list_cx_button a").hover(function () {
        $(this).css("background", "#CD474C")
    }, function () {
        $(this).css("background", "#c0191f")
    })

    //收藏
    $('.list_intro_collect').hover(function () {
        if ($(this).children("strong").html() == "收藏") {
            $(this).children("strong").addClass("spanon");
            $(this).find("span").css("color", "#C0191F");
        } else if ($(this).children("strong").html() == "已收藏") {
            $(this).find("span").html("&#xe60c;");
            $(this).children("strong").addClass("spanon");
            $(this).children("strong").html("取消收藏");
        }
    }, function () {
        if ($(this).children("strong").html() == "收藏") {
            $(this).children("strong").removeClass("spanon");
            $(this).find("span").css("color", "#979797");
        } else if ($(this).children("strong").html() == "取消收藏") {
            $(this).find("span").html("&#xe60d;")
            $(this).children("strong").html("已收藏");
        }
    });

    $(".list_intro_collect").click(function () {
        var hotelCd = $(this).attr("hotelCd");
        var login_mk = $(this).data("login_mk");
        if ($(this).children("strong").html() == "收藏") {
            collect_add(this, hotelCd, login_mk);
        }
        else {
            collect_cancel(this, hotelCd, login_mk);
        }
    });

    $("body").delegate('.price_row a', 'mouseover', function () {
        var _this = $(this),
            loginMoney = _this.parents('.list_room_fix').find(".list_login_money"),
            roomMoney = _this.parents('.list_room_fix').find('.list_room_money');
        var width = _this.width(),
            left = _this.offset().left - _this.parents('.list_room_fixbox').offset().left,
            loginMoneyWidth = loginMoney.width(),
            roomMoneyWidth = roomMoney.width();
        roomMoney.show().css({ left: left + width / 2 - roomMoneyWidth / 2 });
        loginMoney.show().css({ left: left + width / 2 - loginMoneyWidth / 2 });
    }).delegate('.price_row a', 'mouseout', function () {
        $(this).parents('.list_room_fix').find(".list_room_money").hide();
        $(this).parents('.list_room_fix').find(".list_login_money").hide();
    });


    $("body").delegate('.td4 .priceTag', 'mouseover', function () {
        var _this = $(this),
            loginMoney = _this.parents('.td4').find(".list_login_money");
        var width = _this.width(),
            left = _this.offset().left - _this.parents('.td4').offset().left,
            loginMoneyWidth = loginMoney.width();
        var itemcount = loginMoney.data("itemcount");
        if (itemcount < 7) {

            loginMoneyWidth = 459 / 7 * itemcount;

        }
        else { loginMoneyWidth = 459; }

        loginMoney.show().css({ width: loginMoneyWidth, left: left + width / 2 - loginMoneyWidth / 2 - 10 });
    })
        .delegate('.td4 .span3', 'mouseout', function () {
            $(this).parents('.td4').find(".list_login_money").hide();
        });

    $("body").delegate(".list_room_fix .vipicon", 'mouseover', function () {
        var _this = $(this),
            brown = _this.parents('.list_room_fix').find('.tips_brown');
        var width = _this.width(),
            brownWidth = brown.width(),
            left = _this.offset().left - _this.parents('.list_room_fixbox').offset().left;
        brown.show().css({ left: left + width / 2 - 13 - brownWidth / 2 });
    }).delegate(".list_room_fix .vipicon", 'mouseout', function () {
        $(this).parents('.list_room_fix').find(".tips_brown").hide()
    });
    $(".list_label a").click(function () {
        $(".list_label a").removeClass("active");
        $(this).addClass("active")
        if ($(".list_label span").has("active")) {
            $(".list_label span").removeClass("active")
        }
    })
    $(".list_label span").click(function () {
        $(this).addClass("active")
        $(".list_label a").removeClass("active")
    })


    $(document).mouseup(function (e) {
        var _con = $(".date_box");
        if (!_con.is(e.target) && _con.has(e.target).length === 0) {
            $(".date_box").hide();
            $('.list_choose').removeClass("home_order_form_inputon");
        }
    });

    //酒店预订点击锚点事件

    $("#jdyd").click(function () {
        var jdyd_top = $("#roomTypeContanner").offset().top - 100;
        $("html,body").animate({ scrollTop: jdyd_top }, 500);
    });
    $("#jdxx").click(function () {
        var jdxx_top = $("#information").offset().top - 99;
        var jdxx_topp = $("#information").offset().top - 230;
        if ($(".nav_top").hasClass("active")) {
            $("html,body").animate({ scrollTop: jdxx_top }, 500);
        } else {
            $("html,body").animate({ scrollTop: jdxx_topp }, 500);
        }
    });
    $("#yhdp").click(function () {
        var yhdp_top = $("#user_reviews").offset().top - 99;
        var yhdp_topp = $("#user_reviews").offset().top - 230;
        if ($(".nav_top").hasClass("active")) {
            $("html,body").animate({ scrollTop: yhdp_top }, 500);
        } else {
            $("html,body").animate({ scrollTop: yhdp_topp }, 500);
        }

    });

})


//地图操作相关 
//设定坐标点
function setLoactions(hlocations) {
    //设定地图标记
    SetPoints(hlocations);
    map.setFitView();
    if (map.getZoom() > 14) {
        map.setZoom(14);//500m
    }
}

var markers = [];
function SetPoints(hlocations) {

    $(hlocations).each(function (i, item) {
        new AMap.Marker({
            map: map,
            //icon: 'mark_b3.png'/*tpa=http://webapi.amap.com/theme/v1.3/markers/n/mark_b3.png*/,
            content: "<span class='MapMark'>" + (i + 1) + "<span>",
            position: item,
            offset: new AMap.Pixel(-12, -36)
        });
    });
}

//窗体滚动
$(window).scroll(function () {
    var scrollTop = $(window).scrollTop();
    if ($('.information').offset().top - scrollTop < 100) {
        $(".nav_top .nav_list a").eq(1).addClass('btn').siblings().removeClass('btn');
    }
    else {
        $(".nav_top .nav_list a").eq(0).addClass('btn').siblings().removeClass('btn');

    }
    if ($('.user_reviews').offset().top - scrollTop < 100) {
        $(".nav_top .nav_list a").eq(2).addClass('btn').siblings().removeClass('btn');

    }
    $(".to_comments").off("click").on('click', function () {
        $(".nav_top .nav_list a").eq(2).addClass('btn').siblings().removeClass('btn');
        $("html,body").animate({ scrollTop: $(".user_reviews").offset().top - 160 }, 1000);

    });
});






