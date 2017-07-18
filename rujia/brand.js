$(function(){   
    //轮播图播放
    function play(dom,i) {
        dom.find('ul.fix li').eq(i).stop(true, true).animate({ zIndex: 1, opacity: 1 }, 1000).siblings().stop(true, true).animate({ zIndex: 0, opacity: 0 }, 1000);
        dom.find('.dots .dot').eq(i).addClass('active').siblings().removeClass('active');
    }
   //生成小点
    function dots(len) {
        var str = "<ol class='dots'>";
        for (var i = 0; i < len; i++) {
            str += '<li class="dot"></li>';
        }
        str = str + '</ol>';
        return str;
    }
    $('#home_banner').each(function () {
        var _this = $(this),
            li = _this.find('.banner_pic ul.fix li');
        var index = 0,
            len = li.length;
        var str = dots(len);
        _this.find('.banner_pic').append(str);
        li.eq(0).css({
            zIndex: 1, opacity: 1
        });

        var dot = _this.find('.dots .dot');
        dot.eq(0).addClass('active');
        var interval;
       
         $('.banner_pic', _this).hover(function () {
            clearInterval(interval);
         }, function () {
             interval = setInterval(function () {
                 index++;
                 if (index >= len) {
                     index = 0;
                 }
                 play(_this, index);
             }, 3000);
        }).trigger('mouseout');
        $('.prev', _this).click(function () {
            index--;
            if (index < 0) {
                index = len-1;
            }
            play(_this, index);
        });
        $('.next', _this).click(function () {
            index++;
            if (index >=len) {
                index = 0;
            }
            play(_this, index);
        });
        $('.dot', _this).live('click',function () {
            var doxIndex =$(this).index();
            index = doxIndex;
            play(_this, index);

        });
    });


//banner鼠标上移
$('#home_banner a.unslider-arrow06').hover(function(){
    $(this).addClass('redon');
    $(this).children('code').addClass('iconon');
},function(){
    $(this).removeClass('redon');
    $(this).children('code').removeClass('iconon');
});

//banner上的tab切换
$('.home_book_tab a').eq(0).addClass('tabon');
$('.home_book_tab a').click(function () {
    var thisindex = $(this).index();
    if (thisindex == "0") {
        publicFn(2, '002359');
    } else {
        publicFn(3, '002359');
    }
    $(this).addClass('tabon').siblings().removeClass('tabon');
    $(".home_book_list").eq($(this).index()).show().siblings(".home_book_list").hide();
});

//搜索上移
$('.home_cx_button a').hover(function(){
    $(this).addClass('cxon');
},function(){
    $(this).removeClass('cxon');
});

//全部品牌弹框
$('.home_all_icon').click(function () {
    $('.home_logos_tk').show();
});
$('.home_logos_tk code').click(function () {
    $(this).parent().hide();
});

//所有品牌名称最后个去除padding
$('#tabs li:last').css('padding-right','0');
//所有品牌的hover

$('.home_logo_name li').hover(function () {
    $(this).addClass("redon");
}, function () {
    $(this).removeClass("redon");
});


$('.home_logo_name p').eq(0).css('left','70px');
$('.home_logo_name li').eq(0).addClass('nameon');
$('.home_logo_fix').eq(0).show();
$("#logo_nav1 li").hide();
$("#logo_nav1 li[TypeId='109']").addClass("bgon");


$(".home_big_img1[TypeId='109'] dd[name='home_big_img1Log']").html($("#logo_nav1 li[TypeId='109']").html());
$("#logo_nav1 li[TypeClassId='3']").children().children().children('em').eq(0).addClass('spanon');
$("#logo_nav1 li[TypeClassId='3']").show();
$(".home_big_img1[TypeId='109']").addClass("show");
$('.home_logo_name li').click(function(){
    var home_p = $('#indicator').width()/2;
    var tab_li=$('#tabs li').eq($(this).index());
    var newPos=tab_li.position().left + (tab_li.width()/2)-home_p;
    $('.home_logo_name p').stop(false,true).animate({left: newPos},300);
    $(this).addClass('nameon').siblings().removeClass('nameon');
    $("#logo_nav1 li").hide();
    $("#logo_nav1 li").removeClass("bgon");
    $("#logo_nav1 li a span em").removeClass("spanon");

   // $("#logo_nav1 li[TypeClassId='" + $(this).attr("TypeClassId") + "']").eq(0).addClass("bgon");
  //  $("#logo_nav1 li[TypeClassId='" + $(this).attr("TypeClassId") + "'] a span em").eq(0).addClass("spanon");
    $("#logo_nav1 li[TypeClassId='" + $(this).attr("TypeClassId") + "']").show();
    $("#logo_nav1 li[TypeClassId='7']").children().children().children('em').eq(0).removeClass('spanon');

    
});
//高端商旅/度假型酒店的click

$('#logo_nav1 li').hover(function () {
    $('#logo_nav1 li').children("a").children("span").children('em').removeClass('spanon');
    $(this).children("a").children("span").children('em').addClass('spanon');
    $(this).addClass('bgon').siblings('li').removeClass('bgon');
    $(".home_big_img1").removeClass("show");
    $(".home_big_img1[TypeId='" + $(this).attr("TypeId") + "'] dd[name='home_big_img1Log']").html($(this).html());
    $(".home_big_img1[TypeId='" + $(this).attr("TypeId") + "']").find("em").removeClass("spanon");
    $(".home_big_img1[TypeId='" + $(this).attr("TypeId") + "']").addClass("show");
});
    $('#logo_nav1 li').eq(0).click();
//会员尊享特惠右侧margin设置
$(".prefer_box:even").css("margin-right","0px");
$(".prefer_box:first").css("margin-right", "45px");

//会员尊享特惠图片上移
$('.prefer_box').hover(function(){
    $(this).children().children('b').animate({
            "bottom":"12px"
    });
    $(this).addClass('preferon');
},function(){
    $(this).children().children('b').animate({
            "bottom":"9px"
    });    
     $(this).removeClass('preferon');
});

//新开业酒店去除margin
$('.hotel_open_nav li').eq(0).addClass('navon');
$('.hotel_open_list').eq(0).show();
//$(".hotel_open_list dl:eq(2)").css("margin-right","0px");
$(".hotel_open_list dl:last").css("margin-right","0px");
$('.hotel_open_nav li').hover(function(){
    $(this).addClass('navon').siblings().removeClass('navon');
    $('.hotel_open_list').eq($(this).index()).show().siblings('.hotel_open_list').hide();
});
//新开业酒店tab
$('.hotel_open_nav p').css('left','http://www.bthhotels.com/Error/NotFound?aspxerrorpath=/Scripts/257.5px');
$('.hotel_open_nav li').hover(function(){
    var hotel_p = $('#openor').width()/2;
    var tabs_li=$('#tabs_open li').eq($(this).index());
    var newhotle=tabs_li.position().left + (tabs_li.width()/2)-hotel_p;
    $('.hotel_open_nav p').stop(false,true).animate({left: newhotle},300);
    $(this).addClass('navon').siblings().removeClass('navon');
    $('.hotel_open_list').eq($(this).index()).show().siblings('.hotel_open_list').hide();
});

//新开业酒店hover
$('.hotel_open_list dl dt,.sub_imgL a,.sub_imgC li a,.sub_imgR li a').hover(function () {
    $(this).addClass('imgon');
},function(){
    $(this).removeClass('imgon');
});
//热门推荐酒店
$(".hot_tj li:last").css("margin-right", "0");
$(".hot_tj ul li").hover(function () {
    $(this).children(".hot_tmbg").fadeIn();
    $(this).children("dl").fadeIn();
    $(this).children("b").hide();
}, function () {
    $(this).children(".hot_tmbg").fadeOut();
    $(this).children("dl").fadeOut();
    $(this).children("b").show();
});

/*底部logoshover效果*/
$(".list_logos li").each(function (i, element) {
    $(element).hover(function () {
        $(element).find(".Artboard_logo").addClass("active")
    }, function () {
        $(element).find(".Artboard_logo").removeClass("active")
    })
});

    //首页关闭弹窗
$(".sy_tk a").click(function () {
    $(".sy_tk").hide();
    $(".popup").hide();
});

});