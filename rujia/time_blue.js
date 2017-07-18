$(function(){
		
	var arr_week=new Array("周日","周一","周二","周三","周四","周五","周六");
	var nowDate = new Date();
	var this_year = nowDate.getFullYear();//获取当前年份
	var this_month = nowDate.getMonth() + 1;//获取当前月份
	var this_data = nowDate.getDate();//获取当前几号			 
	var this_first = new Date(this_year,this_month-1,1); //获取本月第一天
	var next_first = new Date(this_year,this_month,1); //获取下月中的第一天
	var next_year = next_first.getFullYear();//获取当前下月年份
	var next_month = next_first.getMonth() + 1;//获取下月月份
	var manx_first = new Date(this_year,this_month+1,1); //获取下下月中的第一天
	var this_last=new Date(next_first.getTime()-1000*60*60*24);//获取本月最后一天
	var next_last=new Date(manx_first.getTime()-1000*60*60*24);//获取下月最后一天
	var this_first_week = this_first.getDay();//当月第一天是星期几
	var this_first_day = this_first.getDay();//当月第一天是几月
	var next_first_week = next_first.getDay();//下月第一天是星期几
	var this_last_data = this_last.getDate();//获取本月最后一天几号
	var next_last_data = next_last.getDate();//获取下月最后一天几号
	var manx_year = manx_first.getFullYear();//获取下下月年份
	var manx_month = manx_first.getMonth() + 1;//获取下下月月份
	var manx_first_week = manx_first.getDay();//下下月第一天是星期几	
	var manx_next_first = new Date(this_year,this_month+2,1); //获取下下月中的第一天
	var manx_next_year = manx_next_first.getFullYear();//获取当前下下月年份
	var manx_next_month = manx_next_first.getMonth() + 1;//获取下下月月份	

	
	//三个月以后的信息

	//存储系统当前时间	
	var today_y=this_year;
	var today_m=this_month;	
	var today_d=this_data;
	var today_all;
	var manx_next_all;
	function compare_basic(compare_y,compare_m,compare_d){
		if(compare_m<10){
			if(compare_d<10){
				compare_all=compare_y+'-0'+compare_m+'-0'+compare_d;
			}else{
				compare_all=compare_y+'-0'+compare_m+'-'+compare_d;
			}
		}else{
			if(compare_d<10){
				compare_all=compare_y+'-'+compare_m+'-0'+compare_d;
			}else{
				compare_all=compare_y+'-'+compare_m+'-'+compare_d;
			}			
		}
		return compare_all;
	}
    today_all = compare_basic(this_year, this_month, this_data);
    //判断当前酒店是高星还是非高星
    var IsEconomy = $("#IsEconomy").val(); //订单提交的高星判断
    //如果是高星，则为365天可选
    if (IsEconomy == "false" || IsEconomy == "False") {
        manx_next_all = compare_basic(this_year + 1, this_month, this_data);
    }
    //如果是非高星，则为90天可选
    else {
        var maxDate = new Date(today_y, today_m, today_d + 90);
        manx_next_all = compare_basic(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate());
    }
	function change_year(year_num)//变年份
	{
		this_year = this_year + year_num;		 
		var this_first = new Date(this_year,this_month-1,1); //获取本月第一天
		var next_first = new Date(this_year,this_month,1); //获取下月中的第一天
		var next_year = next_first.getFullYear();//获取当前下月年份
		var next_month = next_first.getMonth() + 1;//获取下月月份
		var manx_first = new Date(this_year,this_month+1,1); //获取下下月中的第一天
		var this_last=new Date(next_first.getTime()-1000*60*60*24);//获取本月最后一天
		var next_last=new Date(manx_first.getTime()-1000*60*60*24);//获取下月最后一天
		var this_first_week = this_first.getDay();//当月第一天是星期几
		var next_first_week = next_first.getDay();//下月第一天是星期几
		var this_last_data = this_last.getDate();//获取本月最后一天几号
		var next_last_data = next_last.getDate();//获取下月最后一天几
		var manx_year = manx_first.getFullYear();//获取下下月年份
		var manx_month = manx_first.getMonth() + 1;//获取下下月月份
		var manx_first_week = manx_first.getDay();//下下月第一天是星期几				
		create_data(this_year,this_month,this_first_week,this_last_data,next_year,next_month,next_first_week,next_last_data,manx_year,manx_month,manx_first_week);
	}		
	
	function change_month(month_num)//变月份
	{
		this_month = this_month + month_num;
		if(this_month < 1)
		{
			this_month = 12;
			change_year(-1);
		}
		else if(this_month > 12)
		{
			this_month = 1;
			change_year(1);
		}		 
		var this_first = new Date(this_year,this_month-1,1); //获取本月第一天
		var next_first = new Date(this_year,this_month,1); //获取下月中的第一天
		var next_year = next_first.getFullYear();//获取当前下月年份
		var next_month = next_first.getMonth() + 1;//获取下月月份
		var manx_first = new Date(this_year,this_month+1,1); //获取下下月中的第一天
		var this_last=new Date(next_first.getTime()-1000*60*60*24);//获取本月最后一天
		var next_last=new Date(manx_first.getTime()-1000*60*60*24);//获取下月最后一天
		var this_first_week = this_first.getDay();//当月第一天是星期几
		var next_first_week = next_first.getDay();//下月第一天是星期几
		var this_last_data = this_last.getDate();//获取本月最后一天几号
		var next_last_data = next_last.getDate();//获取下月最后一天几
		var manx_year = manx_first.getFullYear();//获取下下月年份
		var manx_month = manx_first.getMonth() + 1;//获取下下月月份
		var manx_first_week = manx_first.getDay();//下下月第一天是星期几								
		create_data(this_year,this_month,this_first_week,this_last_data,next_year,next_month,next_first_week,next_last_data,manx_year,manx_month,manx_first_week);
	}			
	
	function create_data(this_year,this_month,this_first_week,this_last_data,next_year,next_month,next_first_week,next_last_data,manx_year,manx_month,manx_first_week){
		//日期列表赋值
		var left_data = '';
		for(i=1;i<=this_last_data;i++){//生成左边日历		
			if(i<10){
                if (this_month < 10) {
                    left_data = left_data + '<a trq="'+this_year+'/0'+this_month+'/0'+i+'"  txq="'+arr_week[(this_first_week+(i-1))%7]+'" >'+i+'</a>';	
                }
                else {
                    left_data = left_data + '<a trq="'+this_year+'/'+this_month+'/0'+i+'"   txq="'+arr_week[(this_first_week+(i-1))%7]+'" >'+i+'</a>';
                }					
			}else if(i==this_last_data){
                if (this_month < 10) {
					if (next_month < 10) {
						left_data = left_data + '<a class="dd_alast" trq="'+this_year+'/0'+this_month+'/'+this_last_data+'" txq="'+arr_week[(this_first_week+(i-1))%7]+'" trql="'+next_year+'/0'+next_month+'/0'+1+'" txql="'+arr_week[next_first_week]+'" >'+this_last_data+'</a>';
					}
					else {
						left_data = left_data + '<a class="dd_alast" trq="'+this_year+'/0'+this_month+'/'+this_last_data+'" txq="'+arr_week[(this_first_week+(i-1))%7]+'" trql="'+next_year+'/'+next_month+'/0'+1+'" txql="'+arr_week[next_first_week]+'" >'+this_last_data+'</a>';
						
					}						                    
                }
                else{
					if (next_month < 10) {
						left_data = left_data + '<a class="dd_alast" trq="'+this_year+'/'+this_month+'/'+this_last_data+'"  txq="'+arr_week[(this_first_week+(i-1))%7]+'" trql="'+next_year+'/0'+next_month+'/0'+1+'" txql="'+arr_week[next_first_week]+'" >'+this_last_data+'</a>';
					}
					else {
						left_data = left_data + '<a class="dd_alast" trq="'+this_year+'/'+this_month+'/'+this_last_data+'"  txq="'+arr_week[(this_first_week+(i-1))%7]+'" trql="'+next_year+'/'+next_month+'/0'+1+'" txql="'+arr_week[next_first_week]+'" >'+this_last_data+'</a>';
					}		
                } 					               	
			}else{
                if (this_month < 10) {
                    left_data = left_data + '<a trq="'+this_year+'/0'+this_month+'/'+i+'"  txq="'+arr_week[(this_first_week+(i-1))%7]+'" >'+i+'</a>';	
                }
                else {
                    left_data = left_data + '<a trq="'+this_year+'/'+this_month+'/'+i+'"  txq="'+arr_week[(this_first_week+(i-1))%7]+'" >'+i+'</a>';	
                }						
			}
			
		}	
		var right_data = '';
		for(j=1;j<=next_last_data;j++){//生成右边日历		
			if(j<10){
                if (next_month < 10) {
                    right_data = right_data + '<a trq="'+next_year+'/0'+next_month+'/0'+j+'"  txq="'+arr_week[(next_first_week+(j-1))%7]+'" >'+j+'</a>';	
                }
                else {
                    right_data = right_data + '<a trq="'+next_year+'/'+next_month+'/0'+j+'"  txq="'+arr_week[(next_first_week+(j-1))%7]+'" >'+j+'</a>';	
                }					
			}else if(j==next_last_data){
                if (next_month < 10) {
					if (manx_month < 10) {
						right_data = right_data + '<a class="dd_alast" trq="'+next_year+'/0'+next_month+'/'+next_last_data+'"  txq="'+arr_week[(next_first_week+(j-1))%7]+'" trql="'+manx_year+'/0'+manx_month+'/0'+1+'" txql="'+arr_week[manx_first_week]+'">'+next_last_data+'</a>';
					}
					else {
						right_data = right_data + '<a class="dd_alast" trq="'+next_year+'/0'+next_month+'/'+next_last_data+'"  txq="'+arr_week[(next_first_week+(j-1))%7]+'" trql="'+manx_year+'/'+manx_month+'/0'+1+'" txql="'+arr_week[manx_first_week]+'" >'+next_last_data+'</a>';
					}						                    
                }
                else{
					if (manx_month < 10) {
						right_data = right_data + '<a class="dd_alast" trq="'+next_year+'/'+next_month+'/'+next_last_data+'"  txq="'+arr_week[(next_first_week+(j-1))%7]+'" trql="'+manx_year+'/0'+manx_month+'/0'+1+'" txql="'+arr_week[manx_first_week]+'">'+next_last_data+'</a>';
					}
					else {
						right_data = right_data + '<a class="dd_alast" trq="'+next_year+'/'+next_month+'/'+next_last_data+'"  txq="'+arr_week[(next_first_week+(j-1))%7]+'" trql="'+manx_year+'/'+manx_month+'/0'+1+'" txql="'+arr_week[manx_first_week]+'">'+next_last_data+'</a>';
					}		
                } 					               	
			}else{
                if (next_month < 10) {
                    right_data = right_data + '<a trq="'+next_year+'/0'+next_month+'/'+j+'"   txq="'+arr_week[(next_first_week+(j-1))%7]+'">'+j+'</a>';	
                }
                else {
                    right_data = right_data + '<a trq="'+next_year+'/'+next_month+'/'+j+'"  txq="'+arr_week[(next_first_week+(j-1))%7]+'" >'+j+'</a>';	
                }						
			}
			
		}			

		 
		$("#time_first dl dd").html(left_data);
		$("#time_first dl dd a").eq(0).css("margin-left",this_first_week*41);	
		$("#time_first .date_top").children("code").html(''+this_year+'');	
		$("#time_first .date_top").children("label").html(''+this_month+'');	
		$("#time_second dl dd").html(right_data);	
		$("#time_second dl dd a").eq(0).css("margin-left",next_first_week*41);	 			 
		$("#time_second .date_top").children("code").html(''+next_year+'');	
		$("#time_second .date_top").children("label").html(''+next_month+'');			 
		
	}
	create_data(this_year,this_month,this_first_week,this_last_data,next_year,next_month,next_first_week,next_last_data,manx_year,manx_month,manx_first_week);
	var dateBox = $('.date_box'),
            startData = $('.start_data'),
            endData = $('.end_data'),
            listChoose = $('.list_choose');
    //第一次日历出现时
	checkToday(today_all);

    //翻月按钮出现时
	$('.date_left_j,.date_right_j').hover(function () {
	    $(this).addClass('jton');
	}, function () {
	    $(this).removeClass('jton');
	});
	var judgeTime; //判断点击日期是入住还是离店
	var startTime = startData.val();//入住时间
	var endTime = endData.val();//离店时间
	
    //入住、离店日期点击日历生成
	function clickCreate(val) {
	    this_year = parseInt(val.substr(0, 4));
	    this_months = val.substr(5, 2);
	    this_month = parseInt(this_months.replace(/\b(0+)/gi, ""));
	    this_data = parseInt(val.substr(8, 2));//获取当前几号			 
	    this_first = new Date(this_year, this_month - 1, 1); //获取本月第一天
	    next_first = new Date(this_year, this_month, 1); //获取下月中的第一天
	    next_year = next_first.getFullYear();//获取当前下月年份
	    next_month = next_first.getMonth() + 1;//获取下月月份
	    manx_first = new Date(this_year, this_month + 1, 1); //获取下下月中的第一天
	    this_last = new Date(next_first.getTime() - 1000 * 60 * 60 * 24);//获取本月最后一天
	    next_last = new Date(manx_first.getTime() - 1000 * 60 * 60 * 24);//获取下月最后一天
	    this_first_week = this_first.getDay();//当月第一天是星期几
	    this_first_day = this_first.getDay();//当月第一天是几月
	    next_first_week = next_first.getDay();//下月第一天是星期几
	    this_last_data = this_last.getDate();//获取本月最后一天几号
	    next_last_data = next_last.getDate();//获取下月最后一天几号
	    manx_year = manx_first.getFullYear();//获取下下月年份
	    manx_month = manx_first.getMonth() + 1;//获取下下月月份
	    manx_first_week = manx_first.getDay();//下下月第一天是星期几	
	    manx_next_first = new Date(this_year, this_month + 2, 1); //获取下下月中的第一天
	    manx_next_year = manx_next_first.getFullYear();//获取当前下下月年份
	    manx_next_month = manx_next_first.getMonth() + 1;//获取下下月月份	

	    create_data(this_year, this_month, this_first_week, this_last_data, next_year, next_month, next_first_week, next_last_data, manx_year, manx_month, manx_first_week);
	}
    //入住日期点击
	startData.click(function () {
	    var val = $(this).val();
	    if (val!='') {
	        clickCreate(val);
	        
	    }
	    listChoose.addClass("home_order_form_inputon");
	    dateBox.show().removeClass('right');
	    $(".zb_pop").hide();
	    $(".home_order_form_input").removeClass("home_order_form_inputon");
	    $(".home_banner_order_time").removeClass("home_order_form_inputon");
	    judgeTime = 0;
	    $(".date_dl dd a").removeClass('date_cur cur hover_before');

	    checkToday(today_all);

	    $(".date_dl dd a[trq='" + val + "']").addClass('date_cur');
	    var max = $(".date_dl dd a[trq='" + manx_next_all.replace("-", "/").replace("-", "/") + "']");
	    max.addClass('date_ddhui');
	    if ($(this).hasClass("gundong")) {
	        if ($(window).scrollTop() < 250) {
	            $("html, body").animate({ scrollTop: 420 }, "slow");
	        } else {
	            return;
	        }
	    }

	});
    //离店日期点击
	endData.click(function () {
	    var val = startData.val(),
			endVal = endData.val();
	    if (val != '') {
	        clickCreate(val);
	    }
	    listChoose.addClass("home_order_form_inputon");
	    dateBox.show().addClass('right');
	    $(".zb_pop").hide();
	    $(".home_order_form_input").removeClass("home_order_form_inputon");
	    $(".home_banner_order_time").removeClass("home_order_form_inputon");
	    judgeTime = 1;

	    checkToday(val);
	    timeFull(startTime, endTime);
	    $(".date_dl dd a").removeClass('date_cur');
	    $(".date_dl dd a[trq='" + val + "']").addClass('date_cur cur');
	    $(".date_dl dd a[trq='" + endVal + "']").addClass('date_cur');
	    if ($(this).hasClass("gundong")) {
	        if ($(window).scrollTop() < 250) {
	            $("html, body").animate({ scrollTop: 420 }, "slow");
	        } else {
	            return;
	        }
	    }
	});
    //上一个月
	$(".date_left_j").click(function () {
	    change_month(-1);
	    var val = startData.val();
	    var val_end = endData.val();
	    $(".date_dl dd a[trq='" + val + "']").addClass('date_cur');

	    if (judgeTime == 0) {
	        checkToday(today_all);
	        var max = $(".date_dl dd a[trq='" + manx_next_all.replace("-", "/").replace("-", "/") + "']");
	        max.addClass('date_ddhui');
	    }
	    else {
	        $(".date_dl dd a[trq='" + val + "']").addClass('cur');

	        checkToday(startTime);
	        timeFull(startTime, endTime);
	        $(".date_dl dd a[trq='" + val_end + "']").addClass('date_cur');

	    }
	});
    //下一个月
	$(".date_right_j").click(function () {
	    change_month(1);
	    var val = startData.val();
	    var val_end = endData.val();
	    $(".date_dl dd a[trq='" + val + "']").addClass('date_cur');

	    if (judgeTime == 0) {
	        checkToday(today_all);
	        var max = $(".date_dl dd a[trq='" + manx_next_all.replace("-", "/").replace("-", "/") + "']");
	        max.addClass('date_ddhui');
	    }
	    else {
	        $(".date_dl dd a[trq='" + val + "']").addClass('cur');

	        $(".date_dl dd a[trq='" + val_end + "']").addClass('date_cur');

	        checkToday(startTime);
	        timeFull(startTime, endTime);
	    }

	});
	$('.date_dl dd a').live('click', function () {
	    var _this = $(this),
			trq = _this.attr('trq');

	    if (!_this.hasClass('date_ddhui') && !_this.hasClass('cur')) {
	        $(".date_dl dd a").removeClass('date_cur');

	        if (judgeTime == 0) {
	            $(".date_dl dd a").removeClass('cur');
	            _this.addClass('date_cur').addClass('cur');
	            startTime = trq;
	            startData.val(trq);
	            $("#time_check").val(_this.attr('txq'));
	            var nexttrq, nexttxq,
					end_val = endData.val(),
					start = new Date(trq.replace("-", "/").replace("-", "/")),
					end = new Date(end_val.replace("-", "/").replace("-", "/"));
	            if (_this.hasClass("dd_alast")) {
	                nexttrq = _this.attr('trql');
	                nexttxq = _this.attr('txql');
	                $(".date_right_j").trigger("click");
	            }
	            else {
	                nexttrq = _this.next().attr('trq');
	                nexttxq = _this.next().attr('txq');
	            }
	            if (start < end) { }
	            else {
	                endData.val(nexttrq);
	                $("#time_checkout").val(nexttxq);

	            }
	            endData.trigger("click");


	        }
	        else {
	            listChoose.removeClass("home_order_form_inputon");
	            dateBox.hide();
	            endTime = trq;
	            endData.val(trq);
	            $("#time_checkout").val(_this.attr('txq'));
	            timeFull(startTime, endTime);
                var days = DateDiff($(".start_data").val(), $(".end_data").val());
			days = "共" +days + "晚";
			$(".item2").find("strong").eq(0).html(days);

	        }
	        try {
	            if (dateChaged) {
	                dateChaged();
	            }
	        } catch (e) {
	            LG.log("请手动实现dateChaged()函数获取日期！");
	        }
	       
	    }
       
	});
    //日期比较，之前checkToday置灰
	function checkToday(start) {
	    var today_start = new Date(start.replace("-", "/").replace("-", "/"));
	    var today_max = new Date(manx_next_all.replace("-", "/").replace("-", "/"));
	    $(".date_dl dd a").each(function () {
	        var trq = $(this).attr('trq');
	        var today_end = new Date(trq.replace("-", "/").replace("-", "/"));
	        $(this).removeClass('date_ddhui');
	        if (today_end < today_start) {
	            $(this).addClass('date_ddhui');
	        }
	        if (today_end > today_max) {
	            $(this).addClass('date_ddhui');
	        }
	    });



	}
    //两段日期之间变红
	function timeFull(start, end) {
	    var start = new Date(start.replace("-", "/").replace("-", "/"));
	    var end = new Date(end.replace("-", "/").replace("-", "/"));
	    $(".date_fix dd a").each(function (i) {
	        var cur_date = $(this).attr('trq'),
				cur = new Date(cur_date.replace("-", "/").replace("-", "/"));
	        if (cur > start && cur < end && cur <= new Date(manx_next_all.replace("-", "/").replace("-", "/"))) {
	            $(this).addClass('hover_before');
	        }
	        else {
	            $(this).removeClass('hover_before');
	        }

	    });

	}
    //日历hover
	$('.date_dl dd a').live('mouseover', function () {
	    if (judgeTime == 1) {
	        var trq = $(this).attr('trq');
	        if (new Date(trq.replace("-", "/").replace("-", "/")) >= new Date(endTime.replace("-", "/").replace("-", "/"))) {
	            timeFull(startTime, trq);

	        } else {
	            timeFull(startTime, endTime);

	        }
	    }
	});
	$('.date_dl dd a').live('mouseout', function () {
	    if (judgeTime == 1) {
	        timeFull(startTime, endTime);
	    }
	});
		
});

