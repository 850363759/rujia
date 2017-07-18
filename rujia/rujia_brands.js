$(function () {
    $(document).mouseup(function (e) {//时间控件点击空白处隐藏
        var _con = $(".date_box");
        if (!_con.is(e.target) && _con.has(e.target).length === 0) {
            $(".date_box").hide();
        }
    });
    $('.top_logo').attr({ "href": "javascript:;" });
	/*酒店推荐hover*/
	$(".exhibit_cont").hover(function(){
		$(this).find(".exhibit_home_title").addClass("active")
		$(this).siblings(".exhibit_mask_l").addClass("active")
		$(this).find("p").addClass("active")
		$(this).find("span").addClass("active")
		$(this).find("strong").addClass("active")
		$(this).find("a").css("display","block")
	},function(){
		$(this).siblings(".exhibit_mask_l").removeClass("active")
		$(this).find("p").removeClass("active")
		$(this).find("span").removeClass("active")
		$(this).find("strong").removeClass("active")
		$(this).find(".exhibit_home_title").removeClass("active")
		$(this).find("a").css("display","none")
	})
	$(".exhibit_cont a").hover(function(){
		$(this).addClass("active")
	},function(){
		$(this).removeClass("active")
	})
	/*酒店推荐hover结束*/
	$(".home_ty_img a").hover(function(){
		$(this).addClass("active")
	},function(){
		$(this).removeClass("active")
	})
	/*优惠促销hover*/
	$(".images_list li").hover(function(){
		$(this).find("p").addClass("active")
		$(this).find("img").addClass("active")
		$(this).find("div").animate({"bottom":13},300)
		$(this).find("span").animate({"bottom":13},300)
	},function(){
		$(this).find("p").removeClass("active")
		$(this).find("img").removeClass("active")
		$(this).find("div").animate({"bottom":9},300)
		$(this).find("span").animate({"bottom":9},300)
	})
	$(".images_list li").eq(0).css("marginLeft", "0")
	/*高端_头部hover\click效果*/
	$(".nav_list li").hover(function(){
		$(this).find("span").addClass("active")
		$(this).find(".nav_cont").stop(true,true).slideDown();
	},function(){
		$(this).find("span").removeClass("active")
		$(this).find(".nav_cont").stop(true,true).slideUp();
	})
	
	$(".new_home_r li").hover(function(){
		$(this).find("img").addClass("preferon")
		$(this).find("span").animate({"bottom":13},300)
	},function(){
		$(this).find("img").removeClass("preferon")
		$(this).find("span").animate({"bottom":9},300)
	})
	/*新闻hover*/
	
	$(".gd_home_News .gd_news_con .plue").hover(function(){
		$(this).css("color","#F08D00")
	},function(){
		$(this).css("color","#90704D")
	})
	/*更多hover*/
	$(".gd_More").hover(function(){
		$(this).addClass("active")
	},function(){
		$(this).removeClass("active")
	})
	/*高端——酒店推荐*/
	$(".gd_home_Recommend li").eq(0).css("marginLeft",0)
	$(".gd_home_Recommend li a").hover(function(){
		$(this).addClass('active')
	},function(){
		$(this).removeClass('active')
	})
	
	$(".gd_nanshan_home .home_Coupon .images_list li").eq(0).css("marginLeft",0)
	/*视频*/
	var video = document.getElementById('videoID');
	var video = $('#videoID').get(0);
	var video = $('#videoID')[0];
	var video = $('#videoID');
	$('.btnPlay').on('click', function() {
		alert($)
		if(video[0].paused){
			video[0].play();
		}
			else
		{
			 video[0].pause();
		}
		return false
	})
	/*底部logoshover效果*/
	$(".list_logos li").each(function(i,element){
		$(element).hover(function(){
			$(element).find(".Artboard_logo").addClass("active")
		},function(){
			$(element).find(".Artboard_logo").removeClass("active")
		})
	})
	$(".hotel_choose .list_image li").each(function(i,element){
		$(element).find("a").hover(function(){
			$(this).find("img").addClass("active")
		},function(){
			$(this).find("img").removeClass("active")
		})
	})
	$(".gd_home_content .images_list li").eq(0).css("marginLeft",0)
	$(".hotel_choose .list_image li").eq(0).css("marginLeft",0)
})
