$(function() {
	// pc端
	//$('.top_nav li.school').hover(function() {
	//	$(this).find('a').css('display', 'block');
	//}, function() {
	//    $(this).find('a').css('display', 'none');
	//});
    $('.top_nav li.school').hover(function() {
		$(this).find('.second_nav').stop().slideDown();
	}, function() {
		$(this).find('.second_nav').stop().slideUp();
	});
    //导航
	$(window).scroll(function (event) {
	    var navBar = $('.top_nav ');
	    var slideBody = $('.slide_body');
	    var navHeight = navBar.find('.left_nav ').height();
	    var topHeight = $('.main_pc .top').height();
	    var scrollTop = $(this).scrollTop();
	    if (scrollTop >= topHeight+1 ) {
	        navBar.addClass('navFixed');
	        slideBody.css('margin-top',navHeight+'px')
	    } else {
	        navBar.removeClass('navFixed');
	        slideBody.css('margin-top', 0)
	    }
	    
	});

	// 移动端
	// 导航展开
	var onOff = 0;
	$('.top_nav .nav_icon').click(function(event) {
		if (onOff == 0) {
			onOff ++;
			$('.top_nav .left_nav').css('transform', 'translateX(100%)');
			// 滚定导航滚动防止页面滚动
			$('body').css('overflow', 'hidden');
		}else{
			onOff --;
			$('.top_nav .left_nav').css('transform', 'translateX(0)');
			$('body').css('overflow', 'auto');
		};
	});
	// 二级导航展开
	$('.mb_nav_list li .item').click(function(event) {
		$(this).toggleClass('active');
		$(this).find('.arrow').toggleClass('unfold');
		$(this).find('.arrow').html('&#xe867;');
		$(this).find('.unfold').html('&#xe66d;');

		$(this).siblings('.sec_item').slideToggle();
	});




});

function regFunction(obj, str, condition) {
    if (condition && $(obj).siblings(".tipBox").length == 0 ) {
        obj.focus().css('border-color', 'red');
        $('<span class="tipBox" style="color:red; font-size:14px;margin-left:10px;">' + str + '</span>').insertAfter(obj);
    } else if (!condition) {
        obj.css('border-color', '#d4d4d4');
        $(obj).siblings(".tipBox").remove();
    }
};
