$(function(){   
//客户端选择上移
$(".app_list_button li").hover(function(){
    $(this).addClass("redon");
},function(){
    $(this).removeClass("redon");
});
//全系列住宿空间去除padding
$(".app_nav dl:last").css("padding-right","0");

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
$('#app_banner').each(function () {
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

});