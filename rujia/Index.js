var keywordInterval = null;
$(function () {
   

    loadCity();
    loadShangQuan();
    loadHotels();
    $("#home_zbse").focus(function () {
        keywordInterval = setInterval('intervalMonitorKeyWord()', 100);
    }).blur(function () {
        if (keywordInterval)
            clearInterval(keywordInterval);
    });
    //关键字查询
    $("#home_zbse").keydown(function () {
        $("#key").val('');
        $("#keyDescript").val('');
        if ($(this).val() == "") {
            $(".keyword_pop").show();
            $(".keyword_pop_two").hide();
        } else {
            $(".keyword_pop").hide();
            $(".keyword_pop_two").show();
        }
        $(".citypop").hide();

        //地图搜索
        var placeSearch = new AMap.PlaceSearch({ //构造地点查询类
            pageSize: 15,
            pageIndex: 1,
            city:  $("input[name='cityName']").val(), //城市
            //,panel: "searchBox"
        });

        placeSearch.search($(this).val(), function (status, result) {
            if (status === 'complete' && result.info === 'OK') {
                //TODO : 解析返回结果,如果设置了map和panel，api将帮助完成点标注和列表
                //
                var resultContainer = $(".keyword_wz_list").empty();

                $(result.poiList.pois).each(function (index, poi) {
                    resultContainer.append(" <li><a"
                                + " data-mpoint='M" + poi.location.Lon + '_'
                                + poi.location.Lat + "_5'"
                                + "  data-pname='" + poi.name
                                + "' title='" + poi.name + "'>"
                                + poi.name + "</a></li>");
                });
                ShowNotFound();
                //绑定点击搜索结果列表事件
                $(".keyword_wz_list a").click(function () {
                    $("#home_zbse").val($(this).data("pname"));
                    $("#key").val($(this).data("mpoint"));
                    $(".keyword_pop_two").hide();
                }).hover(function () {
                    $(this).addClass('redon');
                    $(this).children(".city_hotel_num,.citypop_view_num").addClass("redon");
                }, function () {
                    $(this).removeClass('redon');
                    $(this).children(".city_hotel_num,.citypop_view_num").removeClass("redon");
                });
            }
        });
    });
    $('.home_book_list').eq(0).show();
    //日历选择器失焦后去掉背景颜色;
    $(function () {
        bgColor($('#beginDate'));
        bgColor($('#endDate'));
        function bgColor(obj) {
            obj.blur(function () {           
                $(this).parent(".home_input_time").css('background', "#fff");
            });
             obj.focus(function () {
                    $(this).parent(".home_input_time").css('background', "#fcf5ea");
            });
        }
    })
    
 

    //城市选择开始	
    $("input[name='city_select']").click(function () {//弹出城市选择框
        $(".date_box,.keyword_pop,.keyword_pop_two").hide();
        if ($(this).val() == '中文/全拼') {
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
        if ($(window).scrollTop() < 250) {
            $("html, body").animate({ scrollTop: 420 }, "slow");
        } else {
            return;
        }
    });
    $("input[name='city_select']").blur(function () {
        $(this).removeClass('city_line_on');
        if (replace_all($(this).val(), " ", "") != "" && replace_all($(this).val(), " ", "") != "中文/全拼") {
            if ($("input[name='cityName_old']").val() != $(this).val()) {
                var cityObj = $("#pop2_city li").first();
                var list_search_csz = $(cityObj).find("b").children(".city_zm").html();
                var list_search_pinyin = $(cityObj).children(".pop_citypinyin").html();
                var list_search_code = $(cityObj).children(".pop_citycode").html();

                $("input[name='city_select']").val(list_search_csz);
                $("input[name='cityName']").val(list_search_pinyin);
                $("input[name='cityCode']").val(list_search_code);
                $("#key_cond").val(list_search_code); //作为商圈的所在城市代码
                $("#key_cond_txt").val(list_search_csz);
                $("input[name='cityName_old']").val(list_search_csz);
                $(".popcity_liandong").val(list_search_csz);

                $("input[name='city_select']").parent().removeClass("list_search_inputon");
                $(".csxz").removeClass("home_banner_order_cityon");

                if ($("#key").length > 0 && $("#key").val() != "" && $("#key").val().substring(0, 1) != "J") {
                    $("#key").val("");
                    $("#list_zbse").val("");
                }
                loadShangQuan();
                loadHotels();
            }
        }
    });
    $(".citypop_c ul li,.citypop_c h1,.citypoptwo_c ul li,.citypopthree_c ul li").hover(function () {
        $(this).addClass("redon");
        $(this).children(".city_hotel_num,.citypop_view_num").addClass("redon");
    }, function () {
        $(this).removeClass("redon");
        $(this).children(".city_hotel_num,.citypop_view_num").removeClass("redon");
    });
    $('.home_book_list').eq(0).show();

    //酒店预订input框选中与未选中
    $(".home_time input").focus(function () {
        var oldValue = $(this).val();
        if (oldValue == this.defaultValue) {
            //$(this).val("");
            $(this).parent().addClass('city_line_on');
        }
    });

    $(".home_time input").blur(function () {
        
        var oldValue = $(this).val();
        if (oldValue == "") {
            $(this).val(this.defaultValue);
            //$(this).parent().removeClass('city_line_on');
            $(this).removeClass('city_line_on');
        } else if (oldValue !== "") {
            $(this).removeClass('city_line_on');
            
        }
      
    });
    $("#city_select2").click(function () {//弹出城市选择框
        $(".date_box,.keyword_pop,.keyword_pop_two").hide();
        if ($(this).val() == '城市') {
            $(".zb_pop").hide();
        } else {
            $(".zb_pop").show();
        }
    });
    $(".citypop_c ul li,.citypop_c h1,.citypoptwo_c ul li,.citypopthree_c ul li,.invite_mc_list li").hover(function() {
            $(".invite_mc_list li").click(function() { //请选择酒店
            var invite_tab = $(this).text();
            $(".invite_tk").hide();
            $("#home_zbse2").val(invite_tab);
            $("#home_zbse2").removeClass("search_line_on");
        });
    });

    //请选择酒店
    $("#home_zbse2").click(function () {
        if ($(this).val() == '请选择酒店') {
            $(this).val("");
            $(".invite_tk").hide();
            $(this).removeClass("search_line_on");
        } else {
            $(".invite_tk").show();
            $(this).addClass("search_line_on");
        }
        if ($(window).scrollTop() < 250) {
            $("html, body").animate({ scrollTop: 420 }, "slow");
        } else {
            return;
        }
    });
    //协议用户选择酒店输入感应
    $('#home_zbse2').bind("keyup", function(event) {
        if ($("#hotelName_old").val() != $(this).val()) {
            $("#hotelName_old").val($(this).val());
            bindHotelInput(this);
        }
        $("#xieyihotel").html($(this).val());
    });

    $(".zb_pop_close").click(function () {
        $(".zb_pop").hide();
        $("input[name='city_select']").removeClass("home_banner_order_cityon");
        $("#home_zbjd").removeClass("home_zb_w635_searchon");
    });

    $(".zb_pop_tab li:first").addClass("zb_pop_tabon");
    $(".zb_pop_list ul").eq(0).show();
    $(".zb_pop_tab li").hover(function () {
        $(this).addClass("zb_pop_tabon").siblings().removeClass("zb_pop_tabon");
        $(".zb_pop_list ul").eq($(this).index()).show().siblings().hide();
    });
    $(".zb_pop_se li a").hover(function () {
        $(this).addClass("zb_pop_seon");
    }, function () {
        $(this).removeClass("zb_pop_seon");
    });

    $(".zb_pop_se li a").click(function () {//关键字选择
        var home_zb_pop_se_z = $(this).html();
        $(".zb_pop").hide();
        $(".csxz").val(home_zb_pop_se_z);
        if ($(".csxz").attr("id") == 'city_select') {
            $("input[name='city_select']").removeClass("home_banner_order_cityon");
        }
        if ($(".csxz").attr("id") == 'home_zbjd') {
            $("#home_zbjd").removeClass("home_zb_w635_searchon");
        }
    });

    $(".city_pop_close").click(function () {
        $(".citypop").hide();
    });

    //城市输入感应
    $('input[name="city_select"]').bind("keyup", function (event) {
        $("b[name='citypop_c']").html($(this).val());
        $('input[name="city_select"]').val($(this).val());
        if (replace_all($("input[name='city_select']").val(), " ", "") != "" && replace_all($("input[name='city_select']").val(), " ", "") != "中文/全拼") {
            if ($("input[name='cityName_old']").val() != $(this).val()) {
                $("input[name='cityName_old']").val($(this).val());
                bindCityInput(this);
            }
        }
        else {
            // BindCity_Auto(this);
        }
    });

    $("input[name='city_select']").keydown(function () {

        if (replace_all($("input[name='city_select']").val(), " ", "") != "" && replace_all($("input[name='city_select']").val(), " ", "") != "中文/全拼") {
            if ($("input[name='cityName_old']").val() != $("input[name='city_select']").val()) {
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
                    alert("上一页")
                };
                break;
            case 39:     //右方向键
                if ($(".citypop").is(":visible")) {
                    alert("下一页")
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
        $("input[name='city_select']").val(city_z);
        $("input[name='cityName_old']").val(city_z);
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
        if ($(window).scrollTop() < 250) {
            $("html, body").animate({ scrollTop: 420 }, "slow");
        } else {
            return;
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

    $(".keyword_pop_fix ul li").click(function () {//关键字选择
        var keyword_pop_tab_z = $(this).text();
        $(".keyword_pop").hide();
        $("#home_zbse").val(keyword_pop_tab_z);
        $("#home_zbse").removeClass("search_line_on");
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
        $("#keyDescript").val($("#home_zbse").val());
    })
    //关键字结束

    var thisId = window.location.hash;
    if (thisId != "" && thisId != undefined && thisId == "#xieyi") {
        $(thisId).addClass('tabon').siblings().removeClass('tabon');
        $(".home_book_list").eq($(thisId).index()).show().siblings(".home_book_list").hide();

    }
});

$(document).mouseup(function (e) {//时间控件点击空白处隐藏
    var _con = $(".zb_pop");
    if (!_con.is(e.target) && _con.has(e.target).length === 0) {
        $(".zb_pop").hide();
    }
    _con = $(".keyword_pop");
    if (!_con.is(e.target) && _con.has(e.target).length === 0) {
        $(".keyword_pop").hide();
    }
    _con = $(".keyword_pop_two");
    if (!_con.is(e.target) && _con.has(e.target).length === 0) {
        $(".keyword_pop_two").hide();
    }
    _con = $(".city_none");
    if (!_con.is(e.target) && _con.has(e.target).length === 0) {
        $(".city_none").hide();
    }
    _con = $(".invite_tk");
    if (!_con.is(e.target) && _con.has(e.target).length === 0) {
        $(".invite_tk").hide();
    } 
    
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
                    if ($("#his li").length > 0) {
                        $("#his").show();
                        var firstli= $("#his li").first();
                        var list_search_csz = firstli.find("a").html();
                        var list_search_pinyin = firstli.find(".pop_pinyin").html();
                        var list_search_code = firstli.find(".pop_code").html();

                        $(".zb_pop").hide();
                        $("input[name='city_select']").val(list_search_csz);
                        $("input[name='cityName']").val(list_search_pinyin);
                        $("input[name='cityCode']").val(list_search_code);
                        $("#key_cond").val(list_search_code); //作为商圈的所在城市代码
                        $("#key_cond_txt").val(list_search_csz);
                        $("input[name='cityName_old']").val(list_search_csz);
                        $(".popcity_liandong").val(list_search_csz);

                        $("input[name='city_select']").parent().removeClass("list_search_inputon");
                        $(".csxz").removeClass("home_banner_order_cityon");

                        if ($("#key").length > 0 && $("#key").val() != "" && $("#key").val().substring(0, 1) != "J") {
                            $("#key").val("");
                            $("#list_zbse").val("");
                        }
                        loadShangQuan();
                        loadHotels();
                    }
                      

                    $(".zb_pop_se li a").bind("mouseover", function () {
                        $(this).addClass("zb_pop_seon");
                    });

                    $(".zb_pop_se li a").bind("mouseout", function () {
                        $(this).removeClass("zb_pop_seon");
                    });

                    $("#pop2_city li").on("mouseover","li", function () {
                        $(this).addClass("redon");
                        $(this).children(".city_hotel_num,.citypop_view_num").addClass("redon");
                    });

                    $("#pop2_city li").on("mouseout","li", function () {
                        $(this).removeClass("redon");
                        $(this).children(".city_hotel_num,.citypop_view_num").removeClass("redon");
                    });

                    $(".zb_pop_se li a").bind("click", function () {
                        var list_search_csz = $(this).html();
                        var list_search_pinyin = $(this).parent().children(".pop_pinyin").html();
                        var list_search_code = $(this).parent().children(".pop_code").html();

                        $(".zb_pop").hide();
                        $("input[name='city_select']").val(list_search_csz);
                        $("input[name='cityName']").val(list_search_pinyin);
                        $("input[name='cityCode']").val(list_search_code);
                        $("#key_cond").val(list_search_code); //作为商圈的所在城市代码
                        $("#key_cond_txt").val(list_search_csz);
                        $("input[name='cityName_old']").val(list_search_csz);
                        $(".popcity_liandong").val(list_search_csz);

                        $("input[name='city_select']").parent().removeClass("list_search_inputon");
                        $(".csxz").removeClass("home_banner_order_cityon");

                        if ($("#key").length > 0 && $("#key").val() != "" && $("#key").val().substring(0, 1) != "J") {
                            $("#key").val("");
                            $("#list_zbse").val("");
                        }
                        loadShangQuan();
                        loadHotels();
                    });
                }
                else {
                    $("#his").empty();
                    $("#city_hide").empty();
                }
            }
            else {
                //alert("没有相关数据");
            }
        }
    });
}
function loadHotels() {
    $.ajax({
        type: "GET",
        url: "/Ajax/GetHomeHotel_All",
        data: { cityCode: $("#cityCode").val(), ts: Math.random() },
        dataType: "json",
        success: function (result) {
            if (result != null && result.Code == "200") {
                if (result.data != null && result.data != undefined && result.data != "") {

                    $("#hotel_hide").empty();
                    $(".invite_mc_list").empty();

                    $(result.data).each(function (i,item) {
                        //if (item.s_ContractNo != "") {
                            $("#hotel_hide").append("<dd data-CityCode='" + item.s_CityCode + "' style='display:none;'><span class='pop_hotelname'>" + item.s_HotelNm + "</span>" + item.s_ContractNo + "<span class='pop_ContractNo' style='display:none;'>" + item.s_ContractNo + "</span></span><span class='pop_hotelcode' style='display:none;'>" + item.s_HotelCd + "</span></dd>");
                            $(".invite_mc_list").append('<li class=""><a class="pop_hotelname">' + item.s_HotelNm + '</a><span class="pop_hotelpinyin" style="display:none;">' + item.s_ContractNo + '</span><span class="pop_hotelcode" style="display:none;">' + item.s_HotelCd + '</span></li>');

                        //}
                    });
                    hotelPick_Page();
                    
                }
                else {
                    $("#hotel_hide").empty();
                    $(".invite_mc_list").empty();
                    var home_zbseval = "";
                    if ($("#home_zbse2").val()!="请选择酒店")
                        home_zbseval = $("#home_zbse2").val();
                    $(".invite_mc_list").append("<p class=\"keyword_citynone_title\">您所选的城市没有搜索到 “<b>" + home_zbseval + "</b>” 相关的酒店</p>");
                }
            }
            else {
                //alert("没有相关数据");
            }
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
        if (num1 % num2 == 0)
            result = result - 1;
    }
    else {
        result = Math.ceil(result);
    }
    return result;
}


function loadShangQuan() {
    var cityName = $("input[name='cityName']").val();
    var type = "ch";
    $.ajax({
        type: "GET",
        url: "/Ajax/GetShangQun_Auto",
        data: { cityName: cityName,type:type },
        dataType: "json",
        success: function (result) {

            if (result != null && result.Code == "200") {
                if (result.data != null && result.data != undefined && result.data != "") {
                    $("#pop_shangquan").empty();
                    $("#pop_xinzheng").empty();
                    $("#pop_xianlu").empty();
                    $(".keyword_xzq_list,.keyword_metro_list,.keyword_sq_list").empty();
                    var RCount = 0, DCount = 0;
                    var keyLCount = 0, keyRCount = 0, keyDCount = 0
                    $(result.data).each(function (i) {
                        switch (result.data[i].KeySearchType) {
                            case "L":
                                var obj = $("<label><input data-signle='2'  type='checkbox' data-CD='" +
                                     result.data[i].KeyCD + "' value='" +
                                     result.data[i].KeyCD + "' data-id=" +
                                     result.data[i].KeyCD + "' data-type='sq'><i></i>" +
                                     result.data[i].KeyName + "</label>");
                                obj.find(":checkbox").click(function () {
                                    //bindShangQuanClick($(this));

                                });
                                $("#pop_shangquan").append(obj);
                                if (keyLCount < 10) {
                                    $(".keyword_sq_list").append('<li class=""><a data-type="sq" data-cd="' + result.data[i].KeyCD + '"  >' + result.data[i].KeyName + '</a></li>');
                                    keyLCount++;
                                }
                                break;
                            case "R":
                                $("#pop_xinzheng").append(" <li><a data-signle='1' data-id='" + result.data[i].KeyCD + "' data-CD='" + result.data[i].KeyCD + "' data-type='xzq'>" + result.data[i].KeyName + "</a></li>");
                                if (keyRCount < 16) {
                                    $(".keyword_xzq_list").append('<li class=""><a data-type="xzq" data-cd="' + result.data[i].KeyCD + '"  >' + result.data[i].KeyName + '</a></li>');
                                    keyRCount++;
                                }

                                RCount++;
                                break;
                            case "D":
                                $("#pop_xianlu").append(" <li> <a data-signle='1' data-id='" + result.data[i].KeyCD + "' data-CD=" + result.data[i].KeyCD + " data-type='metro'>" + result.data[i].KeyName + "</a> </li>");
                                //if (keyDCount < 20) {
                                //    $(".keyword_metro_list").append('<li class=""><a data-type="metro" data-cd="' + result.data[i].KeyCD + '"  >' + result.data[i].KeyName + '</a></li>');
                                //    keyDCount++;
                                //}
                                $(".keyword_metro_list").append('<li class=""><a data-type="metro" data-cd="' + result.data[i].KeyCD + '"  >' + result.data[i].KeyName + '</a></li>');

                                DCount++;
                                break;
                            default:
                                break;
                        }
                        //车站机场...

                    });
                    var more = '<a class="list_wz_gd"><span>更多</span><i class=""></i></a>';

                    $(".list_wz_content ul.list_wz_list").each(function (i, el) {

                        if ($(el).hasClass("list_wz_list")) {
                            if ($(el).find("input").size() > 14) {
                                $(el).addClass("h60").append(more);
                            }
                        } else {
                            if ($(el).find("a").size() > 16) {
                                $(el).addClass("h60").append(more);
                            }
                        }


                    });
                    //单选上移
                    $('.list_wz_content ul li a').hover(function () {
                        $(this).addClass('navon');
                    }, function () {
                        $(this).removeClass('navon');
                    });
                    //筛选两行显示更多
                    $('.list_wz_gd').click(function () {
                        $(this).siblings().remove(".list_wz_gd")
                        if ($(this).children('i').hasClass("upon")) {
                            $(this).children('i').removeClass("upon");
                            $(this).children("span").html("更多")
                            $(this).parent().addClass('h60');
                        } else {
                            $(this).children('i').addClass("upon");
                            $(this).children("span").html("收起");
                            $(this).parent().removeClass('h60');
                        }

                    });

                    //关键词推荐
                    $('.keyword_xzq_list li a,.keyword_sq_list li,.keyword_jc_list li a,.keyword_metro_list li a').hover(
                   function () {
                       $(this).addClass('redon');
                       $(this).children(".city_hotel_num,.citypop_view_num").removeClass("redon");
                   }, function () {
                       $(this).removeClass('redon');
                       $(this).children(".city_hotel_num,.citypop_view_num").removeClass("redon");
                   });
                    $(".keyword_pop_box li").click(function () {
                        $("#home_zbse").val($(this).find("a").text()).attr("style",'color:#535353');
                        var cd = $(this).find("a").data("cd");
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
                                //车站机场 未完成
                                //case "metro":
                                //    break;
                            default:
                        }
                        $("#key").val(prefix + cd);
                        $(".keyword_pop").hide();
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
    $(".city_none").hide();
    $(obj).parent().addClass("nc");
    if (!$(obj).hasClass("popcity_liandong") && !$(obj).hasClass("owner")) {
        $(obj).parent().addClass("list_search_inputon");
    }
    $(".csxz").addClass("home_banner_order_cityon");

    $(".keyword_pop").hide();
    $(".keyword_pop_two").hide();

    if ($("#city_hide dd").length > 0) {
        $("#pop2_city").empty();
        var h = 0;
        var ct_value = $(obj).val();

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
        });

        if (mtc_Pinyin != "" && mtc_CD != "") {
            $("input[name='cityName']").val(mtc_Pinyin);
            $("input[name='cityCode']").val(mtc_CD);
        }
     

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
            var city_z = $(this).find("b").children(".city_zm").html();
            var city_pinyin = $(this).children(".pop_citypinyin").html();
            var city_code = $(this).children(".pop_citycode").html();

            $("input[name='city_select']").val(city_z);
            $("input[name='cityName']").val(city_pinyin);
            $("input[name='cityCode']").val(city_code);
            $("input[name='cityName_old']").val(city_z);
            $("#key_cond").val(city_code);
            $("#key_cond_txt").val(city_z);
            $(".popcity_liandong").val(city_z);

            if ($("#key").length > 0 && $("#key").val() != "" && $("#key").val().substring(0, 1) != "J") {
                $("#key").val("");
                $("#list_zbse").val("");
            }
            loadShangQuan();
            loadHotels();
            $(".citypop").hide();
        });

        $("#pop2_city li").bind("mouseover", function () {
            $(this).addClass("redon");
            $(this).children(".city_hotel_num,.citypop_view_num").addClass("redon");
        });

        $("#pop2_city li").bind("mouseout", function () {
            $(this).removeClass("redon");
            $(this).children(".city_hotel_num,.citypop_view_num").removeClass("redon");
        });

        if (h > 12) {
            $("#cpk_CurrentPage").val("1");
            $("#cpk_MaxPage").val(div(h, 12) + 1);

            $("#citypick_page").empty();

            $("#citypick_page").append("<a  id='cpk_pre' class='page_left'><i></i></a><a id='cpk_1' class='page_num'>1</a>");
            for (var k = 2; k <= parseInt($("#cpk_MaxPage").val()) ; k++) {
                $("#citypick_page").append("<a id='cpk_" + k + "' href='javascript:;' class='page_num'>" + k + "</a>");
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
            //$("#citypick_page .page_num:eq(0)").addClass("city_pageon");

        }
        else {
            $("#citypick_page").empty();
            if (h == 0) {
                $(".citypop").hide();
                 $(".city_none").show();
                
            }
               
        }
    }
    else {
        $("#pop2_city").empty();
        $("#citypick_page").empty();
    }
}

//绑定酒店数据【输入感应】
function bindHotelInput(obj) {

    if ($("#hotel_hide dd").length > 0) {
        $(".invite_mc_list").empty();
        var h = 0;
        var ht_value = $(obj).val();

        var mtc_Mark = false;
        var mtc_Pinyin = "";
        var mtc_CD = "";

        //从新加载查询的数据
        $("#hotel_hide dd").each(function (i) {
            var hotelName = $(this).children("span").eq(0).text();
            var pinyin = $(this).children("span").eq(1).text();
            var hotelcode = $(this).children("span").eq(2).text();
            if (hotelName == ht_value) {
                mtc_Mark = true;
                mtc_Pinyin = pinyin;
                mtc_CD = hotelcode;
            }

            if (hotelName.indexOf(ht_value) >= 0 || pinyin.indexOf(ht_value) >= 0 || pinyin.toLowerCase().indexOf(ht_value) >= 0 || pinyin.indexOf(ht_value) >= 0) {
                $(".invite_mc_list").append('<li class=""><a class="pop_hotelname">' + hotelName + '</a><span class="pop_hotelpinyin" style="display:none;">' + pinyin + '</span><span class="pop_hotelcode" style="display:none;">' + hotelcode + '</span></li>');
                h++;
            }
        });
        hotelPick_Page();
      

        if (mtc_Mark) {
            $("#hotelCode").val(mtc_CD);
            $("#hotelName").val(ht_value);
        }
        else {
            $("#hotelCode").val("");
            $("#hotelName").val("");
        }
    }
    else {
        $("#pop2_city").empty();
        $("#citypick_page").empty();
    }
}
//生成协议用户酒店分页
function hotelPick_Page() {
    var h = $(".invite_mc_list li").length - 1;
    if (h > 17) {
        $("#hotel_CurrentPage").val("1");
        $("#hotel_MaxPage").val(div(h, 18) + 1);

        $("#hotelPage").empty();

        $("#hotelPage").append("<a  id='hotel_pre' class='page_left'><i></i></a><a id='hotel_1' class='page_num'>1</a>");
        for (var k = 2; k <= parseInt($("#hotel_MaxPage").val()); k++) {
            $("#hotelPage").append("<a id='hotel_" + k + "' href='#' class='page_num'>" + k + "</a>");
        }
        $("#hotelPage").append("<a id='hotel_next' class='page_right'><i></i> </a>");

        hotelPick_PageChange(h, parseInt($("#hotel_CurrentPage").val()), parseInt($("#hotel_MaxPage").val()));
        for (var m = 1; m <= parseInt($("#hotel_MaxPage").val()); m++) {
            $("#hotel_" + m).click(function() {
                var id = $(this).attr("id");
                var index = id.substring(6);
                $("#hotel_CurrentPage").val(index);

                hotelPick_PageChange(h, parseInt($("#hotel_CurrentPage").val()), parseInt($("#hotel_MaxPage").val()));

            });
        }

    } else {
        $("#hotelPage").empty();
        if (h == -1) {
            $(".invite_mc_list").append("<p class=\"keyword_citynone_title\">您所选的城市没有搜索到 “<b>" + $("#home_zbse2").val() + "</b>” 相关的酒店</p>");
        }
    }


        $("#hotel_pre").bind("click", function () {
            if ($("#hotel_CurrentPage").val() == 1) {
                return;
                } else {
                var curpage = $("#hotel_CurrentPage").val();
                curpage = parseInt(curpage) -1;
                $("#hotel_CurrentPage").val(curpage);

                hotelPick_PageChange(h, curpage, parseInt($("#hotel_MaxPage").val()));
            }
            });

        $("#hotel_next").bind("click", function() {
            if ($("#hotel_CurrentPage").val() == $("#hotel_MaxPage").val()) {
                return;
        } else {
                var curpage = $("#hotel_CurrentPage").val();
                curpage = parseInt(curpage) +1;
                $("#hotel_CurrentPage").val(curpage);

                hotelPick_PageChange(h, curpage, parseInt($("#hotel_MaxPage").val()));
                }
        });
        $(".invite_mc_list li").hover(function() {
            $(this).addClass("redon");
            $(this).children(".city_hotel_num,.citypop_view_num").addClass("redon");
            }, function() {
                $(this).removeClass("redon");
            $(this).children(".city_hotel_num,.citypop_view_num").removeClass("redon");
            });
                //从新绑定选择事件
        $(".invite_mc_list li a").click(function() {
            $("#home_zbse2").val($(this).text());
            $("#home_zbse2").val($(this).text());
            $("#hotelCode").val($(this).parent().find(".pop_hotelcode").text());
            $("#hotelName").val($(this).text());
            $(".invite_tk").hide();
            }).hover(function() {
                $(this).addClass('redon');
                $(this).children(".city_hotel_num,.citypop_view_num").addClass("redon");
            }, function() {
                $(this).removeClass('redon');
                $(this).children(".city_hotel_num,.citypop_view_num").removeClass("redon");
            });

}

function hotelPick_PageChange(dataCount, currentPage, maxPage) {
    for (var v = 1; v <= maxPage; v++) {
        $("#hotel_" + v).removeAttr("class");
        if (currentPage == v) {
            $("#hotel_" +v).attr("class", "city_pageon");
            }
    else {
            $("#hotel_" +v).attr("class", "page_num");
            }
    }
    $(".invite_mc_list").children("li").hide();
    for (var v = 1; v <= dataCount; v++) {
        
        if (v >= (currentPage -1) * 18 +1 && v <= currentPage * 18) {
            $(".invite_mc_list").children("li").eq(v -1).show();
            }
    }
}
//酒店关键字查询开始


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
            data: { name: "keyNotFoundtop-12", cityCD: $("input[name='cityCode']").val(), ts: Math.random() },
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
                            $(this).children(".city_hotel_num,.citypop_view_num").addClass("redon");
                        }, function () {
                            $(this).removeClass('redon');
                            $(this).children(".city_hotel_num,.citypop_view_num").removeClass("redon");
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
    if (key == "请输入酒店名、商圈、地标等" || key == "" || key == "请输入酒店名、商圈、地标等") {
        return;
    }

   $(".keyword_mc_list").html('');
    $(".keyword_pop_three").hide();
    $(".keyword_city_title b").text(key);
    if (keywordXhr && keywordXhr.readyState != 4) {
        keywordXhr.abort();
    }
    keywordXhr = $.ajax({
        type: "GET",
        url: "/Ajax/SearchHotel",
        data: { name: $.trim(key), cityCD: $("input[name='cityCode']").val(), ts: Math.random() },
        dataType: "json",
        success: function (result) {
            if (result != null && result.Code == "200") {
                if (result.data != null &&
                    result.data != undefined &&
                    result.data != "" &&
                    result.data.length != 0) {

                    $(result.data).each(function (i) {
                        $(".keyword_mc_list").append("<li data-keycd=" + result.data[i].KeySearchType + result.data[i].KeyCD + "> " +
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
                        $(this).children(".city_hotel_num,.citypop_view_num").addClass("redon");
                    }, function () {
                        $(this).removeClass('redon');
                        $(this).children(".city_hotel_num,.citypop_view_num").removeClass("redon");
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




function bannerlog(id) {
    $.ajax({
        type: "GET",
        url: "/Ajax/AddScrollPicLog",
        data: { id: id, ts: Math.random() },
        dataType: "json",
        success: function (data) {
        }
    });
}