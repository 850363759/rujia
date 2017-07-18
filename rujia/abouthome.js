/**
 * Created by yanxuan on 2017/3/1.
 */
$(function(){
   //大事记
    $('.event_list li .year').click(function(){
       $(this).parents('li').addClass('on').siblings('li').removeClass('on');
       $(window).scrollTop($(this).parents('li').offset().top-40);
    })
    //如家--加盟服务hover
    $(".join_service_main img:odd").hover(function () {
        var top=$('.join_service_main').offset().top;
        var left=$('.join_service_main').offset().left;
        $(".join_bigimg").show().css({ 'left':'auto',"right": 0, "top": $(this).parent().offset().top-top})
            .find("img").attr("src", $(this).attr("bigsrc"));
    });
    $(".join_service_main img:even").hover(function () {
        var top=$('.join_service_main').offset().top;
        var left=$('.join_service_main').offset().left;
        $(".join_bigimg").show().css({'right':0, "left": $(this).parent().offset().left -left, "top": $(this).parent().offset().top-top}).
            find("img").attr("src", $(this).attr("bigsrc"));
    });
    $(".join_bigimg").hover(function () {
        return;
    }, function () {
        $(".join_bigimg").hide();
    });
    //加盟云上四季民宿酒店
    $(".jy_que p").click(function () {
        if ($(this).hasClass("jton")) {
            $(this).siblings("ul").hide();
            $(this).removeClass("jton");
        } else {
            $(this).siblings("ul").show();
            $(this).addClass("jton");
        }
    });
    //品牌页展开收起
    $('.sign_home_page .menu dd .kind_name').click(function(){
        var dd=$(this).parents('dd');
        if(dd.hasClass('cur')){
            dd.removeClass('cur').find('.kind_con').stop(true,true).slideUp();
        }
        else{
            dd.addClass('cur').find('.kind_con').stop(true,true).slideDown();
            dd.siblings().removeClass('cur').find('.kind_con').stop(true,true).slideUp();
        }
    });
    //加入及升级
    var LiIndex=-1;
    $('.sl_vip_page .vip_list li a').hover(function(){
        var _this=$(this),
            img=_this.find('img'),
            hover=img.attr('data-hover'),
            li=_this.parents('li'),
            list=li.parents('.vip_list'),
            index=li.index(),
           sLi=list.find('li');
        li.addClass('hover gray');
        for(var i=0;i<index;i++){
            var mLi=sLi.eq(i);
            var gray=mLi.find('img').attr('data-gray');
            mLi.addClass('gray').find('img').attr({src:gray});
        }
        if(LiIndex==0){
            sLi.eq(LiIndex).addClass('hover').find('img').attr({src:sLi.eq(LiIndex).find('img').attr('data-hover')});
        }
        if(LiIndex>0){
            for(var i=0;i<=LiIndex;i++){
                var sImg=sLi.eq(i).find('img');
                sLi.eq(i).addClass('gray');
                sImg.attr({src:sImg.attr('data-gray')});
            }
            sLi.eq(LiIndex).addClass('hover gray').find('img').attr({src:sLi.eq(LiIndex).find('img').attr('data-hover')});
        }
        img.attr({src:hover});
    }
    ,function(){
        var _this=$(this),
            img=_this.find('img'),
            aril=img.attr('data-aril'),
            li=_this.parents('li'),
            list=li.parents('.vip_list'),
            index=li.index(),
            sLi=list.find('li');
        li.removeClass('hover');
        sLi.removeClass('gray');
        img.attr({src:aril});
        for(var i=0;i<=sLi.length;i++){
            var sImg=sLi.eq(i).find('img');
            sImg.attr({src:sImg.attr('data-aril')});
        }
        if(LiIndex==0){
            sLi.eq(LiIndex).addClass('hover').find('img').attr({src:sLi.eq(LiIndex).find('img').attr('data-hover')});
        }
        if(LiIndex>0){
            for(var i=0;i<LiIndex;i++){
                var sImg=sLi.eq(i).find('img');
                sLi.eq(i).addClass('gray');
                sImg.attr({src:sImg.attr('data-gray')});
            }
            sLi.eq(LiIndex).addClass('hover gray').find('img').attr({src:sLi.eq(LiIndex).find('img').attr('data-hover')});
        }
    }).click(function(){
        var _this=$(this),
            img=_this.find('img'),
            hover=img.attr('data-hover'),
            li=_this.parents('li'),
            list=li.parents('.vip_list'),
            index=li.index(),
            clickLi=list.find('li.click');
        if(li.hasClass('click')){return;}
        LiIndex=index;
        li.addClass('click hover gray');
        clickLi.removeClass('click hover gray').find('img').attr({src:clickLi.find('img').attr('data-aril')});
        img.attr({src:hover});
        for(var i=0;i<index;i++){
            var sLi=list.find('li').eq(i);
            var gray=sLi.find('img').attr('data-gray');
            sLi.addClass('gray').find('img').attr({src:gray});
        }
        for(var j=index+1;j<=list.find('li').length;j++){
            list.find('li').eq(j).removeClass('gray').find('img').attr({src:list.find('li').eq(j).find('img').attr('data-aril')});
        }
    });
    //会员权益--酒店分类切换
    $('.sl_vip_page .sort_wrap a').click(function(){
        var _this = $(this),
            index = _this.index(),
            rel = $('.sl_vip_page .hotel_wrap .hotel_name').eq(index);
        _this.addClass('cur').siblings('a').removeClass('cur');
        $('.sl_vip_page .hotel_wrap .hotel_name').eq(index).addClass('cur').siblings().removeClass('cur');
        rel.find('a').eq(0).trigger('click');

       
    });
    //会员权益--酒店表格切换
    $('.sl_vip_page .hotel_wrap .hotel_name a').click(function(){
        var _this=$(this),
            attr=_this.attr('data');
       
        _this.addClass('cur').siblings().removeClass('cur');
       $('.table_wrap').find('.'+attr).show().siblings().hide();
    });
    //会员公告
    $('.notice_list .title').click(function(){
        var list=$(this).parents('.notice_list');
        if(!list.hasClass('cur')){
            list.addClass('cur').siblings('.notice_list').removeClass('cur');

        }
        else{
            list.removeClass('cur')
        }
    });
    //会员答疑
    $('.question_sort a').click(function(){
        var _this=$(this),
            index=_this.index();
        _this.addClass('cur').siblings('a').removeClass('cur');
        $('.question_con .box').eq(index).show().siblings().hide();
    });
    //加盟费用奇偶行加样式
    $('.help_right_con_table tr:even').addClass('gray');
});