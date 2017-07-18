$(function() {
    loadCity();

    //输入城市
    $('.city_input').keyup(function(event) {
        $("input[name=citycode]").val("");
        var importStr = $(this).val();
        $(".data_box2 .impot_letter").html(importStr);
        bindCityInput(this);
    });

    //输入城市
    $('.city_input2').keyup(function(event) {
        $("input[name=citycode]").val("");
        var importStr = $(this).val();
        $(".Data_box2 .impot_letter").html(importStr);
        bindCityInput(this);
    });
});

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

                    //$("#his").empty();
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
                            } else {
                                $("#city_hide").append("<dd data-Hotelnum='" + Hotelnum + "' style='display:none;'><span class='pop_cityname'>" + Descript + "</span>" + Pinyin + "<span class='pop_citypinyin' style='display:none;'>" + Pinyin + "</span></span><span class='pop_citycode' style='display:none;'>" + CD + "</span><span class='pop_city_jp' style='display:none;'>" + FirstPinyin + "</span></dd>");
                            }
                        }
                        if ($("#his li").length > 0)
                            $("#his").show();
                    });
                }
                else {
                    $("#city_hide").empty();
                }
            }
            else {
            }
        }
    });
}

function bindCityInput(obj) {

    $('.data_box').hide();
    $('.data_box2').show();
    $('.data_box3').hide();
    //$(obj).parent().addClass("nc");
    //if (!$(obj).hasClass("popcity_liandong") && !$(obj).hasClass("owner")) {
    //    $(obj).parent().addClass("list_search_inputon");
    //}
    //$(".csxz").addClass("home_banner_order_cityon");

    //$(".keyword_pop").hide();
    //$(".keyword_pop_two").hide();

    if ($("#city_hide dd").length > 0) {
        $("#data_box2").empty();
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
                mtc_Pinyin = Descript;
                mtc_CD = CD
            }

            if (Descript.indexOf(ct_value) >= 0 || Pinyin.indexOf(ct_value) >= 0 || FirstPinyin.toLowerCase().indexOf(ct_value) >= 0 || FirstPinyin.indexOf(ct_value) >= 0) {
                if (h > 11) {
                    $("#data_box2").append("<li style='display:none;'><b><span class='city_name'>" + Descript + "</span></b><span class='city_pin' style='display:none;'>" + Pinyin + "</span></span><span class='city_code' style='display:none;'>" + CD + "</span></li>");
                    //$(".citypop_c").append("<dd style='display:none;'><span class='pop_cityname'>" + descript + "</span>" + pinyin + "<span class='pop_citypinyin' style='display:none;'>" + pinyin + "</span></span><span class='pop_citycode' style='display:none;'>" + cd + "</span></dd>");
                }
                else {
                    $("#data_box2").append("<li><b><span  class='city_name' >" + Descript + "</span></b><span class='city_pin' style='display:none;'>" + Pinyin + "</span></span><span class='city_code' style='display:none;'>" + CD + "</span></li>");

                }
                h++;
            }
        });

        if (mtc_Pinyin != "" && mtc_CD != "") {
            $("#citySelect").val(mtc_Pinyin);
            $("#citycode").val(mtc_CD);
        }

        if (h > 12) {
            $("#cpk_CurrentPage").val("1");
            $("#cpk_MaxPage").val(div(h, 12) + 1);

            $("#citypick_page").empty();

            //$("#citypick_page").append("<a  id='cpk_pre' class='page_left'><i></i></a><a id='cpk_1' class='page_num'>1</a>");
            $("#citypick_page").append("<span id='cpk_1' class='current'>1</span>");
            for (var k = 2; k <= parseInt($("#cpk_MaxPage").val()) ; k++) {
                //$("#citypick_page").append("<a id='cpk_" + k + "' href='javascript:;' class='page_num'>" + k + "</a>");
                $("#citypick_page").append("<span id='cpk_" + k + "'>" + k + "</span>");
            }
            //$("#citypick_page").append("<a id='cpk_next' class='page_right'><i></i> </a>");

            for (var m = 1; m <= parseInt($("#cpk_MaxPage").val()) ; m++) {
                $("#cpk_" + m).click(function () {
                    var id = $(this).attr("id");
                    var index = id.substring(4);
                    $("#cpk_CurrentPage").val(index);

                    cityPick_PageChange(h, parseInt($("#cpk_CurrentPage").val()), parseInt($("#cpk_MaxPage").val()));

                });
            }


        }
        else {
            $("#citypick_page").empty();
            if (h == 0) {
                $('.data_box2').hide();
                $('.data_box3').show();

            }

        }
    }
    else {
        $("#data_box2").empty();
        $("#citypick_page").empty();
    }
}
function cityPick_PageChange(dataCount, currentPage, maxPage) {
    for (var v = 1; v <= maxPage; v++) {
        $("#cpk_" + v).removeAttr("class");
        if (currentPage == v) {
            $("#cpk_" + v).attr("class", "current");
        }
    }
    for (var v = 1; v <= dataCount; v++) {
        $("#data_box2").children("li").eq(v - 1).hide();
        if (v >= (currentPage - 1) * 12 + 1 && v <= currentPage * 12) {
            $("#data_box2").children("li").eq(v - 1).show();
        }
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