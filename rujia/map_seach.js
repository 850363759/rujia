var mapdragendlistener = null;//全局地图拖动事件监听器
$(function () {
    //切换城市
    $(".zb_pop_se li").click(function () {
        location = "shanghai.htm"/*tpa=http://www.bthhotels.com/map/*/ + $(this).find(".pop_pinyin").text();
    });
    $(".citypop").on("click", "li", function () { 
        location = "shanghai.htm"/*tpa=http://www.bthhotels.com/map/*/ + $(this).find(".pop_citypinyin").text();
    });
    //其寻找酒店列表页
    $(".list_wap").hover(function () {
        $(this).addClass("active")
    }, function () {
        $(this).removeClass("active")
    })
    $(".keyword_pop").on("mouseover", "li", function () {
        $(this).find("a").css({ "backgroundColor": "#C0191F", })
        $(this).find("a").css({ "color": "#ffffff", })
        $(this).css({ "backgroundColor": "#C0191F" })
        $(this).css({ "color": "#ffffff", })
    }) 
    $(".keyword_pop").on("mouseout", "li", function () {
        $(this).css({ "backgroundColor": "#ffffff" })
        $(this).css({ "color": "#535353", })
        $(this).find("a").css({ "backgroundColor": "#ffffff" })
        $(this).find("a").css({ "color": "#535353", })
    })
    $(".zb_pop_tab li:first").addClass("zb_pop_tabon");
    $(".zb_pop_list ul").eq(0).show();
    $(".zb_pop_tab li").hover(function () {
        $(this).addClass("zb_pop_tabon").siblings().removeClass("zb_pop_tabon");
        $(".zb_pop_list ul").eq($(this).index()).show().siblings().hide();
    });
    $(".zb_pop_se").on("hover", "li a", (function () {
        $(this).addClass("zb_pop_seon");
    }, function () {
        $(this).removeClass("zb_pop_seon");
    }));

    $(".zb_pop_se li a").click(function () {//关键字选择
        var home_zb_pop_se_z = $(this).html();
        $(".zb_pop").hide();
        $(".csxz").val(home_zb_pop_se_z);
        if ($(".csxz").attr("id") == 'city_select') {
            $("#city_select").removeClass("home_banner_order_cityon");
        }
        if ($(".csxz").attr("id") == 'home_zbjd') {
            $("#home_zbjd").removeClass("home_zb_w635_searchon");
        }
    });

    $(".home_zb_w635_ss li").hover(function () {
        var zb_ss_bgx = $(this).attr("bdx");
        $(this).children("i").css("background-position", zb_ss_bgx + "px -52px");
    }, function () {
        if ($(this).hasClass("home_zb_iconclick")) {
            return;
        } else {
            var zb_ss_bgx = $(this).attr("bdx");
            $(this).children("i").css("background-position", zb_ss_bgx + "px 0px");
        }
    });

    $(".home_around_tab li a:first").addClass("home_around_tabon");
    $(".home_around_change li a:first").addClass("home_around_changeon");
    $(".home_around_change li a").hover(function () {
        $(this).addClass("home_around_changeon");
    }, function () {
        $(this).removeClass("home_around_changeon");
    });

    $(".home_zb_w635_ss li").click(function () {
        var zb_ss_bgx = $(this).attr("bdx");
        if ($(this).hasClass("home_zb_iconclick")) {
            $(this).children("i").css("background-position", zb_ss_bgx + "px 0px");
            $(this).removeClass("home_zb_iconclick");
            $(".home_around").slideUp();
            $(".home_around_sj").hide()
        } else {
            $(".home_zb_w635_ss li").each(function () {
                var zb_ss_bgxt = $(this).attr("bdx");
                $(this).children("i").css("background-position", zb_ss_bgxt + "px 0px");
            });
            $(this).children("i").css("background-position", zb_ss_bgx + "px -52px");
            $(this).addClass("home_zb_iconclick").siblings().removeClass("home_zb_iconclick");
            $(".home_around").slideDown();
            $(".home_around_sj").show().css({ "left": $(this).offset().left + 26, "top": $(".home_around").offset().top - 9 });
        }
    });

    //快速查找周边酒店结束
    //查询hover
    $('.list_cx_button input').hover(function () {
        $(this).addClass('cxon');
    }, function () {
        $(this).removeClass('cxon');
    });
    $(document).mouseup(function (e) {
        var _con = $(".zb_pop");
        if (!_con.is(e.target) && _con.has(e.target).length === 0) {
            $(".zb_pop").hide();
            $('#city_select').removeClass('city_line_on');
        }
    });
    $(document).mouseup(function (e) {
        var _con = $(".citypop");
        if (!_con.is(e.target) && _con.has(e.target).length === 0) {
            $(".citypop").hide();
        }
    });

    //时间点击空白处隐藏

    $(document).mouseup(function (e) {
        var _con = $(".date_box");
        if (!_con.is(e.target) && _con.has(e.target).length === 0) {
            $(".date_box").hide();
            $('.list_choose').removeClass("home_order_form_inputon");
        }
    });
    //商圈丶地标
    $(document).mouseup(function (e) {
        var _con = $(".keyword_pop");
        if (!_con.is(e.target) && _con.has(e.target).length === 0) {
            $(".list_search input").removeClass(".search_line_on")
            $(".keyword_pop").hide();
        }
    });

    //地图动态高度
    var winWidth = 0;
    var winHeight = 0;

    function findDimensions() //函数：获取尺寸
    {
        //获取窗口宽度
        if (window.innerWidth)
            winWidth = window.innerWidth;
        else if ((document.body) && (document.body.clientWidth))
            winWidth = document.body.clientWidth;
        //获取窗口高度
        if (window.innerHeight)
            winHeight = window.innerHeight;
        else if ((document.body) && (document.body.clientHeight))
            winHeight = document.body.clientHeight;
        //通过深入Document内部对body进行检测，获取窗口大小
        if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
            winHeight = document.documentElement.clientHeight;
            winWidth = document.documentElement.clientWidth;
        }
        //结果输出至文本框

        $(".map_bd").css("height", winHeight - 119)
        $(".map_side").css("height", winHeight - 80)
        $(".side_list").css("height", winHeight - 200)
    }
    //调用函数，获取数值
    findDimensions()
    window.onresize = findDimensions;





    $(".side_list_head a").hover(function () {
        $(this).addClass("active")
    }, function () {
        $(this).removeClass("active")
    })

    $(".btn_side_close").click(function () {
        if (!$(".map_side").hasClass("active")) {
            $(".map_side").addClass("active");
            $(".drag_box").addClass("active")
            $(".drag_box_select").addClass("active")
            $(".btn_side_close").find("span").html("&#xe621;")
            $('.filter_box').css('margin-right', '0px');

        } else {
            $(".map_side").removeClass("active");
            $(".drag_box").removeClass("active")
            $(".drag_box_select").removeClass("active")
            $(".btn_side_close").find("span").html("&#xe635;")
            $('.filter_box').css('margin-right', '313px');

        }
    })

    $(".drag_box_select").click(function () {
        if ($(this).hasClass("select")) {
            $(this).removeClass("select")
            $("#key").val('');
        } else {
            rectangle();
            $(this).addClass("select")
        }
    })
    //拖动地图搜索
    $(".drag_box").click(function () {
        if (!$(".drag_box").find("a").hasClass(("select"))) {
            $(this).find("a").addClass("select");
            $(this).find("a div").addClass("active");
            $(this).find("a div i").addClass("active");

            mapdragendlistener = AMap.event.addListener(map, 'dragend', function (e) { //添加事件 
                $(".drag_box_select").removeClass("select");
                var result = map.getCenter();
                var point = 'M' + result.lng + '_' + result.lat + '_5';
                clearkeywords();
                clearFilter();
                $("#key").val(point);
                loadMainListByAsync(true);
            });
        } else {
            clearkeywords();
            clearFilter();
            $(this).find("a").removeClass("select");
            $(this).find("a div").removeClass("active");
            $(this).find("a div i").removeClass("active");
            if (mapdragendlistener) {
                AMap.event.removeListener(mapdragendlistener)
            }


        }
    })
    //酒店联动结束

    // //排序 
    $(".side_filter_box li").click(function () {
        $(this).siblings().find("a").removeClass("active")
        $(this).find("a").addClass("active")

        switch ($(this).index()) {
            case 0:
                $("#orderBy").val(0);
                break;
            case 1:
                $("#orderBy").val(1);
                break;
            case 2:
                $("#orderBy").val(4);
                break;
            default:
                break;
        }
        SubmitQuery();
    })
    //位置
    $(".position_tab_box a").each(function (i, element) {
        $(element).click(function () {
            $(this).addClass("active");
            $(this).siblings().removeClass("active")
            $(".area_list_box").eq(i).addClass("active").siblings(".area_list_box").removeClass("active")
        })
    })
    //nav hover延迟效果
    var timer = null;
    $(".filter_list .item_li").each(function (i, element) {
        var _this = $(element)
        $(element).mousemove(function () {
            clearInterval(timer);
            _this.find($(".item_list")).show()
            _this.find($(".icon_i")).html("&#xe64b;")
            $(element).siblings().find(".item_list").hide()
            _this.siblings().find(".icon_i").html("&#xe665;")
        })
        $(element).mouseout(function () {
            timer = setTimeout(function () {
                _this.find($(".item_list")).hide()
                _this.find($(".icon_i")).html("&#xe665;")
            }, 150);
        })
    })
    $(".area_list_box a").hover(function () {
        $(this).addClass("active")
    }, function () {
        $(this).removeClass("active")
    })
    //nav hover延迟效果结束

    //多选hover
    $(".item_default").hover(function () {
        $(this).addClass("select")
        $(this).find($("span")).addClass("select")
    }, function () {
        $(this).removeClass("select")
        $(this).find($("span")).removeClass("select")
    })
    //多选hover结束
    $(".location_s .item_default").click(function () {
        $(this).removeClass("active")
        $(this).find("span").removeClass("active")
        $(".area_list_box i").removeClass("select")
        $(".area_list_items a").removeClass("select")
        area_list_ready = 0
    })
    //多选联动效果
    $(".item_li_list").each(function (i, element) {
        var item_li_list = 0;
        $(element).find("li").each(function (i, items) {
            $(items).click(function () {
                if (!$(items).find("i").hasClass("select")) {
                    $(items).find("i").addClass("select")
                    item_li_list++
                } else {
                    $(items).find("i").removeClass("select")
                    item_li_list--
                }
                LG.log(item_li_list)
                if (item_li_list > 0) {
                    $(element).find(".item_default").addClass("active")
                    $(element).find(".item_default span").addClass("active")
                } else {
                    $(element).find(".item_default").removeClass("active")
                    $(element).find(".item_default span").removeClass("active")
                }
                $(element).find(".item_default").click(function () {
                    $(this).removeClass("active")
                    $(this).find("span").removeClass("active")
                    $(element).find("li i").removeClass("select")
                    item_li_list = 0;
                })
            })
        })
        $(element).find(".item_default").click(function () {
            $(this).removeClass("active")
            $(this).find("span").removeClass("active")
            $(element).find("li i").removeClass("select")
            item_li_list = 0;
        })
    })
    $(".item_li_list li").hover(function () {
        $(this).find("i").addClass("active")
    }, function () {
        $(this).find("i").removeClass("active")
    })


    var area_list_ready = 0;
    $(".location_s .area_list_box").on("click", "li", function () {
        if ($(this).find("i").hasClass("select")) {
            area_list_ready--
            $(this).find("i").removeClass("select")
        } else {
            $(this).find("i").addClass("select")
            area_list_ready++
        }
        if (area_list_ready > 0) {
            $(".location_s .item_default").addClass("active")
            $(".location_s .item_default span").addClass("active")
        } else {
            $(".location_s .item_default").removeClass("active")
            $(".location_s .item_default span").removeClass("active")
        }
    })

    $(".area_list_box").on("click", "a", function () {
        $(this).parents(".area_list_box").siblings(".item_default").addClass("active")
        $(this).parents(".area_list_box").siblings(".item_default").find("span").addClass("active")
        $(this).addClass("select").siblings().removeClass("select")
        $(this).parents(".area_list_box").siblings(".area_list_box").find("a").removeClass("select")
        $(this).parents(".area_list_box").siblings(".area_list_box").find("li i").removeClass("select")
        area_list_ready = 0;
    })
    //联动结束

    $(".item_list_btn input").hover(function () {
        $(this).addClass("active")
    }, function () {
        $(this).removeClass("active")
    })
    $("body").on("mouseover", ".money .dspmsg", function () {
        $(this).addClass("active")
    }).on("mouseout", ".money .dspmsg", function () {
        $(this).removeClass("active")
    });

    //评价hover
    $(".synthesiz_score ").on('hover', ".li2", (function () {
        $(this).css("text-decoration", "underline")
    }, function () {
        $(this).css("text-decoration", "none")
    })
    );

    //搜索按钮
    $(".list_cx_button input,.item_btn_confirm").click(function () {
        $("#SelectArea").val('');
        $("#SignleAreaFilter").val('');//行政区;地铁;车站等单选
        $("#QuerySource").val('1')
        //商圈
        var areaArr = [];
        $(".letters_block i.select").each(function (i, el) {
            areaArr.push($(el).data("id"));
        });
        if (areaArr.length != 0) {
            $("#SelectArea").val(areaArr.join('|'));
            //清除地铁车站
            $('#SignleAreaFilter').val('');
        }
        // 

        if ($(this).hasClass("item_btn_confirm")) {
            var currentArray = [];
            var idBoxSelector = "";
            var spliter = '';
            clearFilter();
            var list = $(".area_list .letters_block i.select,.item_list .item_icon i.select");
            list.each(function (i, el) {
                var _val = $(el).data("value");
                switch ($(el).data("type")) {
                    case "sq":
                        idBoxSelector = "#SelectArea";
                        spliter = '|';
                        break;

                    case "brand":
                        idBoxSelector = "#Brands";
                        spliter = ',';
                        break;
                    case "price":
                        idBoxSelector = "#priceRage";
                        spliter = '_';

                        break;
                    case "equip":
                        idBoxSelector = "#device";
                        spliter = 'X';

                        break;
                    case "item":
                        idBoxSelector = "#feature";
                        spliter = '|';
                        break;
                    default:
                }
                if (idBoxSelector) {
                    currentArray = $(idBoxSelector).val().split(spliter);
                    if (currentArray.indexOf(_val) > -1) {
                        //存在 移除 
                        currentArray.remove(_val);
                    } else {
                        //不存在 添加
                        currentArray.push(_val);
                    }
                    $(idBoxSelector).val(currentArray.join(spliter));
                }

            })
            //提交查询
            SubmitQuery(true);
        }

        SubmitQuery();

    });

    //行政区,地铁,车站等单选
    $(".area_list_items").on("click", "a", function () {
        var _id = $(this).data("cd");
        var _ty = $(this).data('type');
        var prefix = "";
        //写入VALUE
        var ValueType = '';
        switch (_ty) {
            case "xzq":
                ValueType = 'X';
                break;
            case "metro":
                ValueType = 'D';
                break;
            case "view":
                ValueType = 'J';
                break;
            case "air":
                ValueType = 'A';
                break;
            default:
        }

        $('#SignleAreaFilter').val(ValueType + _id);
        //清除商圈
        $(".letters_block i.select").removeClass("select");
        $("#SelectArea").val('');
        SubmitQuery();

    });

    SubmitQuery();
})




function loadShangQuan() {
    var cityName = $("#cityName").val();
    var type = "ch";
    $.ajax({
        type: "GET",
        url: "/Ajax/GetShangQun_Auto",
        data: { cityName: cityName, type: type },
        dataType: "json",
        success: function (result) {

            if (result != null && result.Code == "200") {
                if (result.data != null && result.data != undefined && result.data != "") {
                    $(".area_list_items").empty()
                    $(".keyword_xzq_list,.keyword_metro_list,.keyword_sq_list,.keyword_jc_list").empty();
                    var RCount = 0, DCount = 0;
                    var keyLCount = 0, keyRCount = 0, keyDCount = 0
                    $(result.data).each(function (i) {
                        switch (result.data[i].KeySearchType) {
                            case "L":
                                var obj = $("<li title='" + result.data[i].KeyName + "(" + result.data[i].HotelCount + ")'><div class='multiselect' > <i data-CD='" +
                                     result.data[i].KeyCD + "' data-value='" +
                                     result.data[i].KeyCD + "' data-id='" +
                                     result.data[i].KeyCD + "' data-type='sq' " +

                                     " data-name='" + result.data[i].KeyName + "'></i> </div> <strong>" +
                                     result.data[i].KeyName + "(" + result.data[i].HotelCount + ")</strong></li>");

                                $("#pop_shangquan").append(obj);
                                if (keyLCount < 10) {
                                    $(".keyword_sq_list").append('<li class=""><a data-type="sq" href="javascript:void(0)" data-cd="' + result.data[i].KeyCD + '"  >' + result.data[i].KeyName + '</a>(' + result.data[i].HotelCount + ') </li>');
                                    keyLCount++;
                                }
                                break;
                            case "R":

                                $("#pop_xinzheng").append("<a href='javascript:void(0);'  title='" +
                                    result.data[i].KeyName + "(" +
                                    result.data[i].HotelCount + ")' data-type='xzq' data-cd='" +
                                    result.data[i].KeyCD + "'  >" + result.data[i].KeyName + "(" +
                                    result.data[i].HotelCount + ')</a>');

                                if (keyRCount < 10) {
                                    $(".keyword_xzq_list").append('<li class=""><a href="javascript:void(0)" data-type="xzq" data-cd="' + result.data[i].KeyCD + '"  >' + result.data[i].KeyName + '</a>(' + result.data[i].HotelCount + ') </li>');
                                    keyRCount++;
                                }

                                RCount++;
                                break;
                            case "D":
                                $("#pop_xianlu").append("<a href='javascript:void(0);'  data-signle='1' data-id='"
                                    + result.data[i].KeyCD +
                                   "' data-CD='" + result.data[i].KeyCD +
                                   "' data-type='metro' title='" + result.data[i].KeyName + "(" + result.data[i].HotelCount + ")' >"
                                    + result.data[i].KeyName + "(" + result.data[i].HotelCount + ")</a>");
                                //if (keyDCount < 20) {
                                //    $(".keyword_metro_list").append('<li class=""><a data-type="metro" data-cd="' + result.data[i].KeyCD + '"  >' + result.data[i].KeyName + '</a></li>');
                                //    keyDCount++;
                                //}
                                $(".keyword_metro_list").append('<li class=""><a data-type="metro" data-cd="' + result.data[i].KeyCD + '"  >' + result.data[i].KeyName + '</a>(' + result.data[i].HotelCount + ') </li>');
                                DCount++;
                                break;
                            case "J":
                                $("#pop_view").append(" <li title='" + result.data[i].KeyName + "(" + result.data[i].HotelCount + ")'> <a data-signle='1' data-name='" + result.data[i].KeyName + "' data-id='" + result.data[i].KeyCD + "' data-CD=" + result.data[i].KeyCD + " data-type='view'>" + result.data[i].KeyName + "(" + result.data[i].HotelCount + ")</a></li>");

                                break;
                            case "A":
                                $("#pop_air").append(" <li title='" + result.data[i].KeyName + "(" + result.data[i].HotelCount + ")'> <a data-signle='1' data-name='" + result.data[i].KeyName + "' data-id='" + result.data[i].KeyCD + "' data-CD=" + result.data[i].KeyCD + " data-type='air'>" + result.data[i].KeyName + "(" + result.data[i].HotelCount + ")</a></li>");
                                //if (keyDCount < 20) {
                                //    $(".keyword_metro_list").append('<li class=""><a data-type="metro" data-cd="' + result.data[i].KeyCD + '"  >' + result.data[i].KeyName + '</a></li>');
                                //    keyDCount++;
                                //}
                                $(".keyword_jc_list").append('<li ' + result.data[i].KeyName + "(" + result.data[i].HotelCount + ')"  class=""><a data-type="air" data-cd="' + result.data[i].KeyCD + '"  >' + result.data[i].KeyName + '</a>(' + result.data[i].HotelCount + ')</li>');

                            default:
                                break;
                        }
                        //车站机场...

                    });
                    //商圈、行政区、地铁线路、景点门票
                    $(".area_list_box a").hover(function () {
                        $(this).addClass("active")
                    }, function () {
                        $(this).removeClass("active")
                    })
                    $(".location_s .area_list_box li").hover(function () {
                        $(this).find("i").addClass("active")
                        $(this).find("strong").addClass("select")
                    }, function () {
                        $(this).find("i").removeClass("active")
                        $(this).find("strong").removeClass("select")
                    })
                    //关键词推荐
                    $(".keyword_sq_list li").hover(function () {
                        $(this).addClass("redon")
                        $(this).find("a").addClass("redon")
                    }, function () {
                        $(this).removeClass("redon")
                        $(this).find("a").removeClass("redon")
                    })
                    $('.keyword_xzq_list li a,.keyword_jc_list li a,.keyword_metro_list li a').hover(
                   function () {
                       $(this).addClass('redon');
                   }, function () {
                       $(this).removeClass('redon');
                   });
                }
                else {
                    $("#pop_shangquan").empty();
                    $("#pop_xinzheng").empty();
                    $("#pop_xianlu").empty();
                }
            }
            else {
                //alert("没有相关数据");
            }
        }
    });
}


function SubmitQuery(resetPage) {
    //获取当前Action
    if (resetPage) {
        $("#pageNo").val('');
    } 
    if ($("#city_select").val() == "" || $("#city_select").val() == "中文 / 全拼") {
        $("#city_select").val($("#CityNameCn").val());

    }
    //异步加载页面
    loadMainListByAsync();
}

var loadlist_main = null;
function loadMainListByAsync(keepMapLevel) {
    var parms = {
        cityCode: $("#cityCode").val(),
        SelectArea: $("#SelectArea").val(),
        SignleAreaFilter: $("#SignleAreaFilter").val(),//行政区,地铁,车站等单选
        priceRage: $("#priceRage").val(),
        feature: $("#feature").val(),
        cityName: $("#cityName").val(),
        beginDate: $("#beginDate").val(),
        endDate: $("#endDate").val(),
        orderBy: $("#orderBy").val(),
        pageNo: $("#pageNo").val(),
        device: $("#device").val(),
        key: $("#key").val(),
        keyDescript: $("#keyDescript").val(),
        Brands: $("#Brands").val()
    }
    //判断是否是点击查询按钮
    if ($("#QuerySource").val() == "1") {
        var keywords = $.trim($("#home_zbse").val());
        if ($("#key").val() == ''  && keywords != "" && keywords != "请输入酒店名、商圈、地标等") {
            $("#key").val("J" + keywords);
        }  

        parms = {
            cityName: $("#cityName").val(),
            cityCode: $("#cityCode").val(),
            key: $("#key").val(),
            keyDescript: $("#keyDescript").val(),
            beginDate: $("#beginDate").val(),
            endDate: $("#endDate").val(),
        }
        $("#QuerySource").val('0');
    }

    var url = "/HotelAct/MapAsyncSearch";
    $(".side_list .side_list_box").empty();
    //$(".list_loading").show();
    window.scroll = null;
    window.onscroll = null;
    if (loadlist_main && loadlist_main.readyState != 4) {
        loadlist_main.abort();
    }
    $("#loading").show();
    loadlist_main = $.ajax({
        type: "POST",
        url: url,
        data: parms,
        success: function (result) {
            if (result) {
                $(".side_list .side_list_box").html(result);
                var totalRow = $("#rowCount").val();
                //无数据
                if (totalRow == 0) {
                    $(".side_list .side_list_box").empty();
                }
                //绑定样式
            }
            $("#loading").hide();
            //不自动适应坐标点
            if (!keepMapLevel) {
                map.setFitView();
            }
            bindAfterLoad();
        }
    });


}
function clearFilter() {
    $("#SelectArea").val('');
    $("#SignleAreaFilter").val('');//行政区;地铁;车站等单选
    $("#priceRage").val('');
    $("#feature").val('');
    $("#orderBy").val('');
    $("#device").val('');
    $("#Brands").val('');
}
function clearkeywords() {
    $("#key").val('');
    $("#keyDescript").val('');
    $("#home_zbse").val('请输入酒店名、商圈、地标等');

}
function clearHover() {
    $(".list_icon[data-index]").removeClass("active")
    $(".list_icon[data-index]").find(".pc_icon").removeClass("active")
    $(".list_icon[data-index]").find(".pc_icon i").removeClass("active")
    $(".list_icon[data-index]").find("span").removeClass("active")
    $(".list_icon[data-index]").find("strong").removeClass("active")

    $(".side_list dl[data-pointindex] dt i").removeClass("active")
    $(".side_list dl[data-pointindex]").removeClass("active")
}
function bindAfterLoad() {
    //酒店上移联动效果
    $(".side_list").on("mouseover", "dl[data-pointindex]", function () {
        var positionIndex = $(this).data("pointindex");
        $(".list_icon[data-index=" + positionIndex + "]").addClass("active")
        $(".list_icon[data-index=" + positionIndex + "]").find(".pc_icon").addClass("active")
        $(".list_icon[data-index=" + positionIndex + "]").find(".pc_icon i").addClass("active")
        $(".list_icon[data-index=" + positionIndex + "]").find("span").addClass("active")
        $(".list_icon[data-index=" + positionIndex + "]").find("strong").addClass("active")
        $(this).find("dt i").addClass("active")
        $(this).addClass("active")

    }).on("mouseout", "dl[data-pointindex]", function () {
        clearHover();
    })
    $(".side_list").on("click", "dl[data-pointindex]", function () {
        var m_index = $(this).data("pointindex");
        ToggleMarkerClick(m_index);
        LG.log('click' + m_index)
        position = new AMap.LngLat($(this).data("lon"), $(this).data("lat"));
        markerClick(m_index, position);

    });
    $("#map_container")
       .on("mouseover", ".list_icon[data-index]", function () {
           $(this).addClass("active")
           $(this).find(".pc_icon").addClass("active")
           $(this).find(".pc_icon i").addClass("active")
           $(this).find("span").addClass("active")
           $(this).find("strong").addClass("active")
           $(".side_list dl[data-pointindex=" + $(this).data("index") + "]")
               .addClass("active").find("dt i").addClass("active")
       }).on("mouseout", ".list_icon[data-index]", function () {
           $(this).removeClass("active")
           $(this).find(".pc_icon").removeClass("active")
           $(this).find(".pc_icon i").removeClass("active")
           $(this).find("span").removeClass("active")
           $(this).find("strong").removeClass("active")
           $(".side_list dl[data-pointindex=" + $(this).data("index") + "]")
               .removeClass("active").find("dt i").removeClass("active")
       });

}

function bindSignleFilter() {
    $(".list_wz_content li a[data-signle]").click(function () {
        //绑定选中效果
        var _id = $(this).attr('data-id');
        var _ty = $(this).attr('data-type');
        var _val = $(this).data('cd');

        if ($(this).hasClass('navon_on')) {
            clearSingleFilter();
        } else {
            $('.list_wz_location').find('.list_wz_all').removeClass('list_wz_boxonow');
            //写入VALUE
            var ValueType = '';
            switch (_ty) {
                case "xzq":
                    ValueType = 'X';
                    break;
                case "metro":
                    ValueType = 'D';
                    break;
                case "view":
                    ValueType = 'J';
                    break;
                case "station":
                    ValueType = 'C';
                    break;

                default:

            }
            clearSingleFilter();
            $(this).addClass('navon_on');
            $(".list_wz_show ul").append("<li data-signle='1' data-value='" + _id + "' data-type='" + _ty + "'>" + $(this).text() + "<code class='icon iconfont close'>&#xe73e;</code></li>");
            $(".list_wz_show span").show();

            $('#SignleAreaFilter').val(ValueType + _val);

            LG.log($('#SignleAreaFilter').val())
        }



        //绑定并清空商圈
        clearShangQuan();
        setClearBtnStyle();
        //提交查询
        SubmitQuery(true);
    });
}

function markerClick(m_index, position) {

    mark = markers[m_index];
    infoWindow.setContent(mark.getExtData().infoWinContent);
    infoWindow.open(map, position);
    //关闭信息窗体 
    $("body").on('click', ".hotel_pop  span.close", function () {
        map.clearInfoWindow();
    });
    map.setCenter(position);
    LG.log("markerClick:" + m_index)
    ToggleMarkerClick(m_index);


}

function ToggleMarkerClick(m_index) {
    LG.log("ToggleMarkerClick:" + m_index)
    //清除原有地图标记选中样式
    $(".list_icon[data-index]").removeClass("select")
    $(".list_icon[data-index]").find(".pc_icon").removeClass("select")
    $(".list_icon[data-index]").find(".pc_icon i").removeClass("select")
    $(".list_icon[data-index]").find("span").removeClass("select")
    $(".list_icon[data-index]").find("strong").removeClass("select")
    //清除列表原有标记选中样式
    $(".side_list dl[data-pointindex] dt i").removeClass("select")
    $(".side_list dl[data-pointindex]").removeClass("select")

    //添加选中样式
    var icon = $(".list_icon[data-index=" + m_index + "]");
    icon.addClass("select");
    icon.find(".pc_icon").addClass("select")
    icon.find(".pc_icon i").addClass("select")
    icon.find("span").addClass("select")
    icon.find("strong").addClass("select")
    //列表
    $(".side_list dl[data-pointindex=" + m_index + "]")
        .addClass("select")
        .find("dt i")
        .addClass("select");
}
//鼠标画框
function rectangle() {

    var rectOptions = {
        strokeStyle: "dashed",
        strokeColor: "#FF33FF",
        fillColor: "#FF99FF",
        fillOpacity: 0.5,
        strokeOpacity: 1,
        strokeWeight: 2
    };

    map.plugin(["AMap.MouseTool"], function () {
        var mouseTool = new AMap.MouseTool(map);
        //通过rectOptions更改拉框放大时鼠标绘制的矩形框样式
        mouseTool.rectangle(rectOptions);
        AMap.event.addListener(mouseTool, 'draw', function (e) { //添加事件

            $(".drag_box_select").removeClass("select")
            var result = e.obj.getPath();
            LG.log(e.obj.getPath());//获取路径 
            clearkeywords();
            clearFilter();
            $("#key").val("R" + result[0].lng + "," + result[0].lat + "|" + result[2].lng + "," + result[2].lat);



            mouseTool.close(true);
            loadMainListByAsync(true);
        });
    });

}


//分页
function initPagination(totalRow, currentPageIndex) {
    $(".page").pagination(totalRow, {
        num_edge_entries: 1, //边缘页数
        num_display_entries: 3, //主体页数
        current_page: currentPageIndex,
        items_per_page: 8, //每页显示1项
        callback: function (pageindex, jq) {
            LG.log(pageindex);
            if (pageindex == currentPageIndex) {
                LG.log("跳过绑定当前页。");
                return false;
            }
            $("#pageNo").val(parseInt(pageindex) + 1);
            SubmitQuery(false);
            return false;
        }//回调函数
    });

}
