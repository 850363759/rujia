$(function() {
	
	// 头部城市搜索框start
	var width = $('.head_city').parent().width();
	$('.head_city').css('width', width+'px');
	// 鼠标悬停
		$('.letter_nav ul li').mousemove(function(event) {
			$(this).addClass('current').siblings('li').removeClass('current');
		});


		// 热门
		//$('.letter_nav .hot_search').mousemove(function(event) {
		//	$('.search_res .hot').show().siblings('ul').hide();
    //});
		var navList = $('.letter_nav .ping_search');
    $.each(navList, function(index, el) {
        $(el).mousemove(function() {
            console.log(index);
            $(".search_res .zb_pop_se").eq(index).show().siblings('ul').hide();
        });
    });


		//分页按钮
		$('.page_num span').click(function(event) {
			$(this).addClass('current').siblings('span').removeClass('current');
		});



		// 搜索框事件
		// 点击输入框
		var ID = '';
		$('.city_input').click(function(event) {
			$(".zb_pop_se").eq(0).show().siblings('ul').hide(); 
			event.stopPropagation();
			ID = "getInput"
			$('.head_city').show();
			$('.data_box').show();
			$('.data_box2').hide();
			$('.data_box3').hide();
		});
		// 输入输入框
		var importStr ='';
		$('.city_input').keyup(function(event) {
			$('.data_box').hide();
			$('.data_box2').show();
			// 匹配不成功
			var strArr = ['a','b','c','d'];
			 importStr=$(this).val();
			$.each(strArr, function(index, val) {
				if (val==importStr) {
					$('.data_box3').show();
					$('.data_box2').hide();
					return false;
				}else{
					$('.data_box3').hide();
				}
			});
		});

		$('body:not(.city_input)').click(function(event) {
			ID = "blur"
			if (ID=='blur') {};
			$('.head_city').hide();
		});
		$('.head_city').click(function(event) {
			event.stopPropagation();
			ID = "getInput";
		});


		// 选择城市
		
		$('.search_res ul li ').click(function(event) {
			//把值赋予input表单
			$('.city_input').val($(this).find('a').text());
		    $('#citycode').val($(this).find('.pop_code').text());
			$('.head_city').hide();
		});
		
		$('.data_box2 .search_res').on('click', 'li', function(event) {
			//把值赋予input表单
			$('.city_input').val($(this).find('b').text());
			$('#citycode').val($(this).find('.city_code').text())
			$('.head_city').hide();
			
		});
});