$(function(){
	 	//显示价格品牌
	 		//获取当前弹框高度，不能直接拿上面的可视区直接用 

		 	$("#skwrap .foot .skBrand").on("tap",function(){//点击显示
		 		$("#skPrice").show();
		 		$("#skwrap").hide()
		 	})
	 		$("#skPrice .skPrice_top").on("tap",function(){//点击遮罩消失
	 			$(this).parent().hide();
	 			$("#skwrap").show()
	 		})
	 		//单选
	 		$("#skPrice #oneRadio ul li").on("tap",function(){
				$(this).addClass("active").siblings().removeClass("active");		
				
			})
	 		//多选
	 		var $listLi=$("#skPrice #twoRadio ul li"); 		
	 		$listLi.each(function(i,element){
	 			var ready=true;
	 			$(element).on("tap",function(){
	 				if(ready){
	 					$(element).addClass("active")
	 					ready=false;
	 				}else{
	 					$(element).removeClass("active");
	 					ready=true;
	 				}
	 			})
	 		})
		//显示价格品牌结束
	 	//显示排序
	 	var h=$(window).height();
	 	$("#mask .hz").css("height",h-$("#mask ul li").height()+"px")
			$("#sort").on("tap",function(){
			  	$("#mask").show();
			})		
			$("#mask .hz").on("tap",function(){	//点击遮罩消失
				$(this).parent().parent().hide()
			})	
			$("#mask ul li").each(function(){
				$(this).on("tap",function(){
					$(this).addClass("active").siblings("li").removeClass("active");			
					$(this).find("span").addClass("active");
					$(this).siblings("li").find("span").removeClass("active");
				})
			})

// 区域位置

			var $Div=$("#sktony #cont .tab div");
				$Div.on("tap",function(){
					$(this).addClass("active").siblings().removeClass("active")
					var index=$Div.index(this);
					$("#sktony #cont .list div").eq(index).addClass("aaa").siblings().removeClass("aaa")				
				})
				$("#sktony #cont .list div p").on("tap",function(){
					$(this).addClass("active").siblings().removeClass("active");
					$(this).find("span").show();
					$(this).siblings("p").find("span").hide()
				})


	//筛选 
				var $clentH=$(window).height();	
				var $skTerritory_list=$("#skTerritory_list")
				var $contH=$clentH-$skTerritory_list.find(".top").height()-$skTerritory_list.find(".footer").height();	
				$("#skTerritory_list #cont").css("height",$contH);
				var $aLi=$("#skTerritory_list #cont .tab li");
				var $aUl=$("#skTerritory_list #cont .right ul");
				var $tab_li=$aUl.find("li");  
				
				$aLi.on("tap",function(){
					$(this).addClass("active").siblings().removeClass("active");
					var index=$aLi.index(this);
					$aUl.eq(index).show().siblings().hide();		
				});
				$tab_li.on("tap",function(){
					$(this).find(".span2").show();
					$(this).siblings().find(".span2").hide();	
					var index=$tab_li.index(this);
					$("#cont .rightTab").find("ul").eq(index).show().siblings().hide()
				});
				
				//多选
				var $List=$(".rightTab ul li");
				$List.each(function(i,element){
					var check=true;
					$(element).find("span").on("tap",function(){
						if(check){
							$(this).addClass("active");
							check=false;
						}else{
							$(this).removeClass("active")
							check=true;
						}
					})
				})		
				//重置
				$skTerritory_list.find("#rese").on("tap",function(){
					$List.find("span").removeClass("active")
				})





//城市切换
			
			$("#sk_selectionCity #guojia div").on("tap",function(){
				$(this).addClass("active").siblings().removeClass("active")
			})
			//城市切换结束

			//底部筛选
			var $List=$("#sk_selectionCity #sklistUl li");
			$List.each(function(i,element){
				var ready=true;
				$(element).find("span").on("tap",function(){
					if(ready){
						$(element).find("a").addClass("select");
						ready=false;
					}else{
						$(element).find("a").removeClass("select");
						ready=true;
					}
				})
			})
			//底部筛选结束
			
			//侧边栏
			var $list=$("#sk_letter").find("li");
			$list.each(function(i,element){
				$(element).on("tap",function(){
					var num=$(element).find("span").html();
					$(element).find("a").html(num);
					$(element).find("a").show();
					$(element).siblings().find("a").hide()
				})
			})


//搜索

			var $ipt=$(".skSeek .top ul li input")
			$(".close").on("tap",function(){
				$ipt.val("")
			})	
			$ipt.focus(function(){
				$(".skSeek1").hide();
				$(".skSeek2").show();
			})
			
			$(".skSeek2 .top ul .list1").on("tap",function(){
				$(".skSeek1").show()
				$(".skSeek2").hide();
			})
			//多选
			$(".skSeek1 ul li").each(function(i,element){
				var ready=true;
				$(element).on("tap",function(){
				
				if(ready){
					$(element).addClass("active");				
					ready=false;
				}else{
					$(element).removeClass("active")
					ready=true;
				}
			})
			})
		//地图
		var l=$(window).height()
			$(".warpsearch").css("height",l)	













});



	






