$(function() {
	
	// 轮播
	var glide = $('.slider').glide({
		//autoplay:true,//是否自动播放 默认值 true如果不需要就设置此值
		animationTime:500, //动画过度效果，只有当浏览器支持CSS3的时候生效
		arrows:true, //是否显示左右导航器
		arrowsWrapperClass: "arrowsWrapper",//滑块箭头导航器外部DIV类名
		arrowMainClass: "slider-arrow",//滑块箭头公共类名
		arrowRightClass:"slider-arrow--right",//滑块右箭头类名
		arrowLeftClass:"slider-arrow--left",//滑块左箭头类名
		arrowRightText:">",//定义左右导航器文字或者符号也可以是类
		arrowLeftText:"<",

		nav:true, //主导航器也就是本例中显示的小方块
		navCenter:true, //主导航器位置是否居中
		navClass:"slider-nav",//主导航器外部div类名
		navItemClass:"slider-nav__item", //本例中小方块的样式
		navCurrentItemClass:"slider-nav__item--current" //被选中后的样式
	});

	// 初始化微信动态列表
	$('.wechat_trend .wechat_trend_list li:nth-child(4n)').css('margin-right', '0px');
	var imgWidth = document.querySelector('.articelBox ul.wechat_trend_list').offsetWidth;
	var imgList = document.querySelector('.wechat_trend .articelBox');
	var imgs = imgList.querySelectorAll('ul.wechat_trend_list');
	var leftArr = document.querySelector('.chgLeft');
	var rightArr = document.querySelector('.chgRight');
	var picIndex = 0;
    //点击右箭头显示下一张图片
	
	rightArr.onclick = function () {
	    //console.log(imgs.length)
	    if (picIndex < imgs.length - 1) {
	        picIndex++;
	        console.log(picIndex)
	        var destination = -picIndex * imgWidth;
	        animation(imgList, destination)
	        btnChangeColor()
	    }
	}
	leftArr.onclick = function () {
	    if (picIndex > 0) {
	        picIndex--;
	        var destination = -picIndex * imgWidth;
	        animation(imgList, destination)
	        btnChangeColor()
	    }
	}
	leftArr.style.color = '#eee';
	var btnChangeColor = function () {
	    if (picIndex >0) {
	        leftArr.style.color = '#c5c5c5'
	    } else {
	        leftArr.style.color = '#eee';
	        leftArr.classList.remove('active')
	    }
	    if (picIndex < imgs.length - 1) {
	        rightArr.style.color = '#c5c5c5'
	    } else {
	        rightArr.style.color = '#eee';
	        rightArr.classList.remove('active')
	    }
	}

	function animation(obj, destination) {// 传递对象和目的地参数
	    clearInterval(obj.timer);//防止重复点击重复设置定时器
	    obj.timer = setInterval(function () {
	        //console.log('调用')
	        var step = 60; //步长
	        var location = obj.offsetLeft; //当前位置
	        //console.log(location)
	        //console.log(destination)
	        step = location < destination ? step : -step //当前位置小于目的位置步长为正数 否则为负数
	        if (Math.abs(location - destination) >= Math.abs(step)) { //如果当前位置和目的地位置的差绝对值大于等于步长的绝对值 继续走 
	            location += step;
	            obj.style.left = location + 'px';
	            //console.log(imgList)

	        } else {
	            obj.style.left = destination + 'px';  //如果当前位置和目的地位置的差绝对值小于步长的绝对值否则手动设置let值为目的地
	            clearInterval(obj.timer);//关闭定时器
	        };
	    }, 15);
	}

	$('.chgRight').hover(function () {
	    if (picIndex < imgs.length - 1) {
	        $(this).addClass('active')
	    }
	}, function () {
	    $(this).removeClass('active')
	});

	$('.chgLeft').hover(function () {
	    if (picIndex >0) {
	        $(this).addClass('active')
	    }
	}, function () {
	    $(this).removeClass('active')
	});

});

