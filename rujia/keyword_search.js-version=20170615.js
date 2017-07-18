$(function () {


    loadCity();
    loadShangQuan();

    //城市选择开始	
    $("#city_select").click(function () {//弹出城市选择框
        $(".date_box,.keyword_pop,.keyword_pop_two").hide();
        if ($(this).val() == '中文 / 全拼') {
            $(this).val("");
            $(".zb_pop").hide();
            $("#pb_zbjd").removeClass("csxz");
            $(this).addClass("csxz");
            $(this).addClass("pb_banner_order_cityon");
            $(this).removeClass('city_line_on');
        } else {
            $(".zb_pop").show();
            $("#pb_zbjd").removeClass("csxz");
            $(this).addClass('city_line_on');
            $(this).addClass("csxz");
            $(this).addClass("pb_banner_order_cityon");
        }

    });
    $("#city_select").blur(function () {
        $(this).removeClass('city_line_on');
    });
    $(".citypop_c ul li,.citypop_c h1,.citypoptwo_c ul li,.citypopthree_c ul li").hover(function () {
        $(this).addClass("redon");
        $(this).children(".city_hotel_num,.citypop_view_num").addClass("redon");
    }, function () {
        $(this).removeClass("redon");
        $(this).children(".city_hotel_num,.citypop_view_num").removeClass("redon");
    });


    $(".city_pop_close").click(function () {
        $(".citypop").hide();
    });

    //城市输入感应
    $('#city_select').bind("keyup", function (event) {
        if (replace_all($("#city_select").val(), " ", "") != "" && replace_all($("#city_select").val(), " ", "") != "中文／全拼") {
            $('.citypop_c').css("display", "block");
            if ($("#cityName_old").val().trim() != $("#city_select").val().trim()) {
                //$("#cityName_old").val($("#city_select").val());
                bindCityInput(this);
            }
        }
        else if (replace_all($("#city_select").val(), " ", "") == "") {
            // BindCity_Auto(this);
            $('.citypop_c').css("display", "none");

        }
    });

    $("#city_select").keydown(function () {

        if (replace_all($("#city_select").val().trim(), " ", "") != ""
            && replace_all($("#city_select").val().trim(), " ", "") != "中文／全拼") {
            if ($("#cityName_old").val() != $("#city_select").val().trim()) {
                $(".keyword_pop_two").hide();
                $(".zb_pop").hide();
                $(".citypop").show();

                bindCityInput(this);
            }
        }
        else {
            // BindCity_Auto(this);
        }


    });
    $(window).keyup(function (event) {
        switch (event.keyCode) {
            case 37:     //左方向键
                if ($(".citypop").is(":visible")) {
                    //alert("上一页")
                };
                break;
            case 39:     //右方向键
                if ($(".citypop").is(":visible")) {
                    //alert("下一页")
                };
                break;
            case 40:     //下方向键
                if ($(".citypop").filter(":visible")) {
                    var cityon_index = $(".cityon").index();
                    var cityon_length = $(".citypop_c dl dd").length - 1;
                    if ($(".cityon").index() == -1 || cityon_index == cityon_length) {
                        $(".citypop_c dl dd").eq(0).addClass("cityon").siblings().removeClass("cityon");
                    } else {
                        $(".citypop_c dl dd").eq(cityon_index + 1).addClass("cityon").siblings().removeClass("cityon");
                    }
                };
                break;
            case 38:     //上方向键
                if ($(".citypop").filter(":visible")) {
                    var cityon_index = $(".cityon").index();
                    var cityon_length = $(".citypop_c dl dd").length - 1;
                    if (cityon_index == -1 || cityon_index == 0) {
                        $(".citypop_c dl dd").eq(cityon_length).addClass("cityon").siblings().removeClass("cityon");
                    } else {
                        $(".citypop_c dl dd").eq(cityon_index - 1).addClass("cityon").siblings().removeClass("cityon");
                    }
                };
                break;
            case 13:     //enter键
                if ($(".citypop").filter(":visible")) {
                    $(".cityon").trigger("click")
                };
                break;
        }
    });
    $(".citypop dl dd").hover(function () {//鼠标放上去高亮
        $(this).addClass("cityon");
    }, function () {
        $(this).removeClass("cityon");
    });
    $(".citypop dl dd").live("click", function () {//给城市选择赋值
        var city_z = $(this).children("span").html();
        $("#city_select").val(city_z);
        $(".citypop").hide();
    });
    //城市选择结束

    //关键字开始
    $("#home_zbse").click(function () {
        $(".zb_pop,.date_box,.citypop").hide();
        if ($(this).val() == '请输入酒店名、商圈、地标等') {
            $(this).val("");
            $(".keyword_pop").hide();
            $(this).removeClass("search_line_on");
        } else {
            $(".keyword_pop").show();
            $(this).addClass("search_line_on");
        }

    });

    $("#city_select").blur(function () {
        var key = $("#city_select").val().trim();
        //为空，或者没有找到结果则还原原来的值
        if (key == "" ||key == "中文 / 全拼"|| $("#pop2_city li").size() == 0) {
            $("#city_select").val($("#CityNameCn").val());
            return false;
        }
        if ($("#CityNameCn").val() != key && $("#pop2_city li").size() != 0) {

            var equalItem;
            $("#pop2_city li b span").each(function (i, el) {
                if ($(el).text() == key) {
                    equalItem = $(el).parent().parent();
                }
            });

            //找不到完全匹配就取筛选结果的第一个
            if (!equalItem) {
                equalItem = $("#pop2_city li").first();
            }
            var city = equalItem;
            location.href = "http://www.bthhotels.com/list/" + $(city).children(".pop_citypinyin").text();

        }
    });
    $("#city_select").keypress(function (e) {
        var eCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
        if (eCode == 13) {
            $(this).trigger('blur');
        }
    });
    $("#home_zbse").keypress(function (e) {
        var eCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
        if (eCode == 13) {
            $(".list_cx_button input").trigger('click');
        }
    });
    $("#home_zbse").blur(function () {
        $(this).removeClass("search_line_on");
    });

    $('.keyword_pop_fix:last').css('border-bottom', 'none');
    $('.keyword_pop_two_fix:last').css('border-bottom', 'none');

    $(".keyword_pop_tab_div li a").hover(function () {
        $(this).addClass("keyword_pop_tab_divon");
    }, function () {
        $(this).removeClass("keyword_pop_tab_divon");
    });
    //关键字选择
    $(".keyword_pop_fix").on("click", " ul li", function () {
        $("#home_zbse").val($(this).find('a').text());
        var cd = $(this).find('a').data("cd");
        var prefix = "";
        switch ($(this).find("a").data("type")) {
            case "sq":
                prefix = "S";
                break;
            case "xzq":
                prefix = "X";
                break;
            case "metro":
                prefix = "D";
                break;
                //车站机场  
            case "view":
                prefix = "J";
            case "air":
                prefix = "A";
                break;
            default:
        }
        $("#key").val(prefix + cd);
        $(".keyword_pop").hide();
    });

    $(".keyword_pop_two_l ul a").hover(function () {
        $(this).addClass("keyword_pop_two_on");
    }, function () {
        $(this).removeClass("keyword_pop_two_on");
    });
    $(".keyword_pop_two_tip ul a").click(function () {
        $(".keyword_pop_two").hide();
        $("#home_zbse").val($(this).text());
    });
    $(".keyword_pop_two_tip ul a").hover(function () {
        $(this).addClass("keyword_pop_two_tipon");
    }, function () {
        $(this).removeClass("keyword_pop_two_tipon");
    });

    $(".keyword_pop_two_l:last").css("padding-bottom", "0px");

    $(".keyword_pop_two_l ul a").click(function () {//关键字选择
        var home_order_zb_two_l_z = $(this).text();
        $(".keyword_pop_two").hide();
        $("#home_zbse").val(home_order_zb_two_l_z);

    });
    $(".list_cx_button input").click(function () {
        if ($("#home_zbse").val() != "请输入酒店名、商圈、地标等") {
            $("#keyDescript").val($("#home_zbse").val());
        }
    })
    //关键字结束

    //时间点击空白处隐藏
    $(document).mouseup(function (e) {
        var _con = $(".date_box");
        if (!_con.is(e.target) && _con.has(e.target).length === 0) {
            $(".date_box").hide();
            $('.list_choose').removeClass("home_order_form_inputon");
        }
    });

    //关键字点击空白处隐藏
    $(document).mouseup(function (e) {
        var _con = $(".keyword_pop");
        if (!_con.is(e.target) && _con.has(e.target).length === 0) {
            _con.hide();
            $('#home_zbse').removeClass("search_line_on");
        }
        var _con = $(".keyword_pop_two");
        if (!_con.is(e.target) && _con.has(e.target).length === 0) {
            _con.hide();
            $('.list_choose').removeClass("search_line_on");
        }
        var _con = $(".keyword_pop_three");
        if (!_con.is(e.target) && _con.has(e.target).length === 0) {
            _con.hide();
            $('.list_choose').removeClass("search_line_on");
        }
    });

});


//日期改变/ 在日期控件中调用此方法 time.js
function dateChaged() {

    $("#beginDate").val($(".start_data").val());
    $("#endDate").val($(".end_data").val());
}
function loadCity() {
    $.ajax({
        type: "GET",
        url: "/Ajax/GetCity_All",
        data: { ts: Math.random() },
        dataType: "json",
        success: function (result) {
            if (result != null && result.Code == "200") {
                var usedCity = result.Message;
                if (result.data != null && result.data != undefined && result.data != "") {

                    $("#his").empty();
                    $("#city_hide").empty();

                    $(result.data).each(function (i) {
                        var CD = result.data[i].CD;
                        var Descript = result.data[i].Descript;
                        var Pinyin = result.data[i].Pinyin;
                        var FirstPinyin = result.data[i].FirstPinyin;
                        var Type = result.data[i].Type;
                        var Hotelnum = result.data[i].Hotelnum;

                        if (FirstPinyin != "") {
                            if (Type == "looked") {
                                $("#his").append("<li><a title='" + Descript + "'>" + Descript + "</a><span class='pop_pinyin' style='display: none;'>" + Pinyin + "</span><span class='pop_code' style='display: none;'>" + CD + "</span></li>");
                            }
                            else {
                                $("#city_hide").append("<dd data-Hotelnum='" + Hotelnum + "' style='display:none;'><span class='pop_cityname'>" + Descript + "</span>" + Pinyin + "<span class='pop_citypinyin' style='display:none;'>" + Pinyin + "</span></span><span class='pop_citycode' style='display:none;'>" + CD + "</span><span class='pop_city_jp' style='display:none;'>" + FirstPinyin + "</span></dd>");


                            }
                        }
                    });
                    if ($("#his li").length > 0)
                        $("#his").show();

                    $(".zb_pop_se li a").bind("mouseover", function () {
                        $(this).addClass("zb_pop_seon");
                    });

                    $(".zb_pop_se li a").bind("mouseout", function () {
                        $(this).removeClass("zb_pop_seon");
                    });

                    $(".zb_pop_se li a").bind("click", function () {
                        var list_search_csz = $(this).html();
                        var list_search_pinyin = $(this).parent().children(".pop_pinyin").text();
                        var list_search_code = $(this).parent().children(".pop_code").text();

                        $(".zb_pop").hide();
                        $("#cityName_old").val($("#city_select").val().trim());
                        $("#city_select").val(list_search_csz);

                        $("#cityName").val(list_search_pinyin);
                        //重设地图城市
                        if (map) {
                            map.setCity(list_search_csz);
                        }
                        $("#cityCode").val(list_search_code);
                        $("#key_cond").val(list_search_code); //作为商圈的所在城市代码
                        $("#key_cond_txt").val(list_search_csz);

                        $(".popcity_liandong").val(list_search_csz);
                        $("#city_select").parent().removeClass("list_search_inputon");
                        $(".csxz").removeClass("home_banner_order_cityon");

                        if ($("#key").length > 0 && $("#key").val() != "" && $("#key").val().substring(0, 1) != "J") {
                            $("#key").val("");
                            $("#list_zbse").val("");
                        }
                        loadShangQuan();
                    });
                }
                else {
                    $("#his").empty();
                    $("#city_hide").empty();
                }
            }
            //else {
            //    alert("没有相关数据");
            //}
        }
    });
}

function replace_all(value, oldstr, newstr) {
    var arrcount = value.split(oldstr).length;

    var ret = value.replace(oldstr, newstr);

    if (ret.split(oldstr).length < arrcount) {
        return replace_all(ret, oldstr, newstr);
    }
    else {
        return ret;
    }
}

function div(number1, number2) {
    var num1 = Math.round(number1);
    var num2 = Math.round(number2);
    var result = num1 / num2;
    if (result >= 0) {
        result = Math.floor(result);
    }
    else {
        result = Math.ceil(result);
    }
    return result;
}


function cityPick_PageChange(dataCount, currentPage, maxPage) {
    for (var v = 1; v <= maxPage; v++) {
        $("#cpk_" + v).removeAttr("class");
        if (currentPage == v) {
            $("#cpk_" + v).attr("class", "city_pageon");
        }
        else {
            $("#cpk_" + v).attr("class", "page_num");
        }
    }
    for (var v = 1; v <= dataCount; v++) {
        $("#pop2_city").children("li").eq(v - 1).hide();
        if (v >= (currentPage - 1) * 12 + 1 && v <= currentPage * 12) {
            $("#pop2_city").children("li").eq(v - 1).show();
        }
    }
}


//绑定商圈数据2【输入感应】
function bindCityInput(obj) {

    $(".zb_pop").hide();
    $(".citypop").show();//.css({ "left": $(obj).offset().left - 8, "top": $(obj).offset().top + 30 });
    $(obj).parent().addClass("nc");
    if (!$(obj).hasClass("popcity_liandong") && !$(obj).hasClass("owner")) {
        $(obj).parent().addClass("list_search_inputon");
    }
    $(".csxz").addClass("home_banner_order_cityon");
    $("#currentCityKey").show().find("b").text($(obj).val())
    $(".keyword_pop").hide();
    $(".keyword_pop_two").hide();

    if ($("#city_hide dd").length > 0) {
        $("#pop2_city").empty();
        var h = 0;
        var ct_value = $("#city_select").val().trim();

        var mtc_Mark = false;
        var mtc_Pinyin = "";
        var mtc_CD = "";

        $("#city_hide dd").each(function (i) {
            var Descript = $(this).children("span").eq(0).text();
            var Pinyin = $(this).children("span").eq(1).text();
            var CD = $(this).children("span").eq(2).text();
            var FirstPinyin = $(this).children("span").eq(3).text();
            var Hotelnum = $(this).data("hotelnum");
            if (Descript == ct_value) {
                mtc_Mark = true;
                mtc_Pinyin = Pinyin;
                mtc_CD = CD
            }

            if (Descript.indexOf(ct_value) >= 0 || Pinyin.indexOf(ct_value) >= 0 || FirstPinyin.toLowerCase().indexOf(ct_value) >= 0 || FirstPinyin.indexOf(ct_value) >= 0) {
                if (h > 11) {
                    $("#pop2_city").append("<li style='display:none;'><b><span class='city_zm'>" + Descript + "</span></b><span class='city_hotel_num'> - <b class='city_num'>" + Hotelnum + "</b>家</span><span class='pop_citypinyin' style='display:none;'>" + Pinyin + "</span></span><span class='pop_citycode' style='display:none;'>" + CD + "</span></li>");
                    //$(".citypop_c").append("<dd style='display:none;'><span class='pop_cityname'>" + descript + "</span>" + pinyin + "<span class='pop_citypinyin' style='display:none;'>" + pinyin + "</span></span><span class='pop_citycode' style='display:none;'>" + cd + "</span></dd>");
                }
                else {
                    $("#pop2_city").append("<li><b><span  class='city_zm' >" + Descript + "</span></b><span class='city_hotel_num'> - <b class='city_num'>" + Hotelnum + "</b>家</span><span class='pop_citypinyin' style='display:none;'>" + Pinyin + "</span></span><span class='pop_citycode' style='display:none;'>" + CD + "</span></li>");

                }
                h++;
            }
            if (h == 0) {
                $("#currentCityNotFound").show();
            } else {
                $("#currentCityNotFound").hide();
            }
        });


        $("#cityName").val(mtc_Pinyin);
        $("#cityCode").val(mtc_CD);

        $("#list_zbse").val("");
        $("#key").val("");
        $("#input_old").val("");
        if (mtc_Mark) {
            $("#key_cond").val(mtc_CD);
            $("#key_cond_txt").val(ct_value);
        }
        else {
            $("#key_cond").val("");
            $("#key_cond_txt").val("");
        }

        $("#pop2_city li").bind("click", function () {
            setCity($(this));
        });

        $("#pop2_city").on("mouseover", "li", function () {
            $(".citypop dl dd").removeClass("cityon");
            $(this).addClass("redon");
            $(this).find('.city_hotel_num').css("color", " #fff");
        });

        $("#pop2_city").on("mouseout", "li", function () {
            $(this).removeClass("redon");
            $(this).find('.city_hotel_num').css("color", " #979797");
        });

        if (h > 12) {
            $("#cpk_CurrentPage").val("1");
            $("#cpk_MaxPage").val(div(h, 12) + 1);

            $("#citypick_page").empty();

            $("#citypick_page").append("<a  id='cpk_pre' class='page_left'><i></i></a><a id='cpk_1' class='page_num'>1</a>");
            for (var k = 2; k <= parseInt($("#cpk_MaxPage").val()) ; k++) {
                $("#citypick_page").append("<a id='cpk_" + k + "' href='#' class='page_num'>" + k + "</a>");
            }
            $("#citypick_page").append("<a id='cpk_next' class='page_right'><i></i> </a>");

            for (var m = 1; m <= parseInt($("#cpk_MaxPage").val()) ; m++) {
                $("#cpk_" + m).click(function () {
                    var id = $(this).attr("id");
                    var index = id.substring(4);
                    $("#cpk_CurrentPage").val(index);

                    cityPick_PageChange(h, parseInt($("#cpk_CurrentPage").val()), parseInt($("#cpk_MaxPage").val()));

                });
            }

            $("#cpk_pre").bind("click", function () {
                if ($("#cpk_CurrentPage").val() == 1) {
                    return;
                }
                else {
                    var curpage = $("#cpk_CurrentPage").val();
                    curpage = parseInt(curpage) - 1;
                    $("#cpk_CurrentPage").val(curpage);

                    cityPick_PageChange(h, curpage, parseInt($("#cpk_MaxPage").val()));
                }
            });

            $("#cpk_next").bind("click", function () {
                if ($("#cpk_CurrentPage").val() == $("#cpk_MaxPage").val()) {
                    return;
                }
                else {
                    var curpage = $("#cpk_CurrentPage").val();
                    curpage = parseInt(curpage) + 1;
                    $("#cpk_CurrentPage").val(curpage);

                    cityPick_PageChange(h, curpage, parseInt($("#cpk_MaxPage").val()));
                }
            });
            $("#citypick_page .page_num:eq(0)").addClass("city_pageon");

        }
        else {
            $("#citypick_page").empty();
        }
    }
    else {
        $("#pop2_city").empty();
        $("#citypick_page").empty();
    }
}
//酒店关键字查询开始

function setCity(cityObj) {
    var city_z = $(cityObj).find("b").children(".city_zm").html();
    var city_pinyin = $(cityObj).children(".pop_citypinyin").html();
    var city_code = $(cityObj).children(".pop_citycode").html();

    $("#city_select").val(city_z);
    $("#cityName").val(city_pinyin);
    $("#cityCode").val(city_code);
    //$("#cityName_old").val(city_z);
    $("#key_cond").val(city_code);
    $("#key_cond_txt").val(city_z);
    $(".popcity_liandong").val(city_z);

    if ($("#key").length > 0 && $("#key").val() != "" && $("#key").val().substring(0, 1) != "J") {
        $("#key").val("");
        $("#list_zbse").val("");
    }
    loadShangQuan();
    $(".citypop").hide();
}
//显示未找到
function ShowNotFound() {
    var key = $("#home_zbse").val();
    if ($(".keyword_mc_list li").html() == '') {
        $(".keyword_pop_two").hide();
        $(".keyword_pop_three").show();
        $("#keyNotFoundArea").text(key);
        $(".recommendHotels dd").remove();
        $.ajax({
            type: "GET",
            url: "/Ajax/SearchHotel",
            data: { name: "keyNotFoundtop-12", cityCD: $("#cityCode").val(), ts: Math.random() },
            dataType: "json",
            success: function (result) {
                if (result != null && result.Code == "200") {
                    if (result.data != null && result.data != undefined && result.data != "" && result.data.length != 0) {


                        $(result.data).each(function (i) {
                            $(".recommendHotels").append("<dd data-keycd=" + result.data[i].KeySearchType + result.data[i].KeyCD + "> " +
                                result.data[i].BrandDes +
                                "（" + result.data[i].KeyName + ") </dd>");
                        });
                        //绑定点击搜索结果列表事件
                        $(".recommendHotels dd").click(function () {
                            $("#home_zbse").val($(this).text());
                            $("#key").val($(this).data("keycd"));
                            $(".keyword_pop_three").hide();

                        }).hover(function () {
                            $(this).addClass('redon');
                        }, function () {
                            $(this).removeClass('redon');
                        });
                    }
                }
            }
        });
    }
}

var oldkeyword = "";
var keywordXhr = null;
function intervalMonitorKeyWord() {

    $(".citypop").hide();
    var key = $.trim($("#home_zbse").val());


    if (key == "") {
        $(".keyword_pop_two").hide();
        $(".keyword_pop").show();
        $("#key").val('');
        $("#keyDescript").val('');
        return;
    } else {
        $(".keyword_pop").hide();
        $(".keyword_pop_two").show();
    }
    if (oldkeyword == key) {
        return;
    }
    oldkeyword = key;
    $("#key").val('');
    $("#keyDescript").val('');
    if (key == "请输入酒店名、商圈、地标等" || key == "" || key == "J请输入酒店名、商圈、地标等") {
        return;
    }

    $(".keyword_mc_list").html('');
    $(".keyword_pop_three").hide()
    $(".keyword_city_title b").text(key);
    if (keywordXhr && keywordXhr.readyState != 4) {
        keywordXhr.abort();
    }
    keywordXhr = $.ajax({
        type: "GET",
        url: "/Ajax/SearchHotel",
        data: { name: $.trim(key), cityCD: $("#cityCode").val(), ts: Math.random() },
        dataType: "json",
        success: function (result) {
            if (result != null && result.Code == "200") {
                if (result.data != null &&
                    result.data != undefined &&
                    result.data != "" &&
                    result.data.length != 0) {

                    $(result.data).each(function (i) {
                        $(".keyword_mc_list").append("<li data-keycd="
                            + result.data[i].KeySearchType + result.data[i].KeyCD
                            + " title=" + result.data[i].BrandDes + "(" + result.data[i].KeyName
                            + "）> " +
                            result.data[i].BrandDes +
                            "（" + result.data[i].KeyName.replace(key,
                                "<b>" + key + "</b>") +
                            ") </li>");
                    });
                    //绑定点击搜索结果列表事件
                    $(".keyword_mc_list li").click(function () {
                        $("#home_zbse").val($(this).text());
                        $("#key").val($(this).data("keycd"));
                        $(".keyword_pop_two").hide();
                    }).hover(function () {
                        $(this).addClass('redon');
                    }, function () {
                        $(this).removeClass('redon');
                    });;
                } else {
                    $(".keyword_mc_list").append("<p class=\"keyword_citynone_title\">您所选的城市没有搜索到 “<b>" + key + "</b>” 相关的酒店</p>");
                }
                ShowNotFound();
            }
        }
    });
}
//关键字查询结束