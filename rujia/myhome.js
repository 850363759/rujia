$(function () {

    //$(".my_info_buttonR").click(function () {
    //    $(this).parent().parent().hide();
    //});

    //初始化显示列表对应的分页插件
    $("#OrderlistPagination").hide();
    $("#OrderhistorylistPagination").hide();

    $("#ExpendcorePagination").hide();
    $("#AboutExpiredcorePagination").hide();
    $("#ScorePagination").hide();

    //优惠券的分页插件
    $("#UsedCouponPagination").hide();
    $("#ExpiredCouponPagination").hide();
    $("#NotUsedCouponPagination").hide();

    //选项卡切换
    $('.rj_public_nav li').eq(0).addClass('navon');
    $('.rj_yx_main:not(:first)').hide();
    $('.rj_public_nav li').click(function () {
        if ($(this).html() == "未入住订单") {
            $("#OrderlistPage").show();
            $("#OrderhistorylistPagination").hide();
        }
        if ($(this).html() == "历史订单") {
            $("#OrderlistPage").hide();
            $("#OrderhistorylistPagination").show();
        }

        if ($(this).html() == "充值明细") {
            $("#ExpendcorePagination").hide();
            $("#AboutExpiredcorePagination").hide();
            $("#ScorePagination").show();
        }
        if ($(this).html() == "支出明细") {
            $("#ScorePagination").hide();
            $("#AboutExpiredcorePagination").hide();
            $("#ExpendcorePagination").show();
        }
        if ($(this).html() == "即将过期") {

            $("#ExpendcorePagination").hide();
            $("#ScorePagination").hide();
            $("#AboutExpiredcorePagination").show();
        }

        if ($(this).html() == "未使用") {
            $("#UsedCouponPagination").hide();
            $("#ExpiredCouponPagination").hide();
            $("#NotUsedCouponPagination").show();
        }
        if ($(this).html() == "已使用") {

            $("#UsedCouponPagination").show();
            $("#ExpiredCouponPagination").hide();
            $("#NotUsedCouponPagination").hide();
        }
        if ($(this).html() == "已过期") {

            $("#UsedCouponPagination").show();
            $("#ExpiredCouponPagination").hide();
            $("#NotUsedCouponPagination").hide();
        }

        $(this).addClass('navon').siblings().removeClass('navon');
        $('.rj_yx_main').eq($(this).index()).show().siblings('.rj_yx_main').hide();
    });
    //删除订单
    $('.popup').height($(document).height());
    $('.rj_yx_delete').live('click', function () {
        $(this).parent().siblings('.my_delete_tk,.popup').show();
    });

    //支付订单上移
    $('.or_button a').hover(function () {
        $(this).addClass('payon');
    }, function () {
        $(this).removeClass('payon');
    });

    //立即支付
    $('.rj_yx_w90 dt').hover(function () {
        $(this).addClass('redon');
    }, function () {
        $(this).removeClass('redon');
    });

    //积分积点碳积分上移
    $('.jf_icon').hover(function () {
        $(this).parent().parent().siblings('.tips_jf').show().css({ "left": $(this).offset().left - 99, "top": $(this).offset().top + 33 });
    }, function () {
        $(this).parent().parent().siblings('.tips_jf').hide();
    });

    $('.jd_icon').hover(function () {
        $(this).parent().parent().siblings('.tips_jd').show().css({ "left": $(this).offset().left - 200, "top": $(this).offset().top + 33 });
    }, function () {
        $(this).parent().parent().siblings('.tips_jd').hide();
    });

    $('.tjf_icon').hover(function () {
        $(this).parent().parent().siblings('.tips_tjf').show().css({ "left": $(this).offset().left - 99, "top": $(this).offset().top + 33 });
    }, function () {
        $(this).parent().parent().siblings('.tips_tjf').hide();
    });


    //优惠赠券下拉
    $('.yx_tic_box ul.yx_tic_name').click(function () {
        $(this).siblings('.yxtic_list').slideToggle();
        $(this).children().children('.yx_tic_jt').children('i').toggleClass('upon');
    });


    //收藏酒店今日最低价
    $('.low_price_icon').hover(function () {
        $(this).parent().parent().siblings('.tips_jf').show().css({ "left": $(this).offset().left - 360, "top": $(this).offset().top - 155 });
    }, function () {
        $(this).parent().parent().siblings('.tips_jf').hide();
    });




    //我的钱包页面的js  start
    //积分显示
    $('.jf_icon_money').hover(function () {

        $(this).siblings('.tips_jf_money').show();
    }, function () {
        $(this).siblings('.tips_jf_money').hide();
    });










    //我的钱包页面的js
    var walletTab = new Tabs('.detailed ul li', 'active', '.detailed-info');

    $('.reset-pwd').on('click', function () {
        reImg("1");
        $(".modal-pc-forgetPwd").hide();
        $('.modal-pc-resetPwd').show();
    });

    //关闭各种弹窗
    $('.close-reset,.close-resetPwdSuccess,.close-forgetPwd,.close-forgetPwdSuccess,.close-clause,.close').on('click', function () {
        //	$('.modal-pc-resetPwd').hide();
        //alert(123)
        $(this).parents('.modal-pc').hide();
    });

    //我要充值页面
    var rechargeTab = new Tabs('.pay-tab ul li', 'active-recharge', '.pay-info')

    //radio
    bankNumber = null;
    $('.tab-info-group').on('click', function () {

        if ($(this).children('strong').eq(1).css('display') == 'inline') {

            $(this).children('strong').eq(0).toggle();
            $(this).children('strong').eq(1).toggle();
            bankNumber = $(this).attr('id');

        } else {
            $('.pay-info').children('.tab-info-group').children('strong:odd').hide();
            $('.pay-info').children('.tab-info-group').children('strong:even').show();
            $(this).children('strong').eq(0).hide();
            $(this).children('strong').eq(1).show();
            bankNumber = $(this).attr('id');
        }

    })

    //是否同意如家充值条款
    $('.agree-recharge strong').on('click', function () {
        $(this).toggle().siblings('strong').toggle();
    })






    //点击确认发票信息
    //$('.invoice-sure').on('click', function () {
    //    if ($('.common-invoice').hasClass('on-again')) {
    //        alert('显示普')
    //        $(this).parents('.invoice-info').hide();
    //        $('.invoice-over-common').show();
    //        var data = $('.invoice-head').val();
    //        alert(data)



    //    } else {
    //        alert('xianshi zhuan')
    //        $(this).parents('.invoice-info').hide();
    //        $('.invoice-over-special').show();
    //    }
    //})






    //平邮快递之间的切换

    $('.pingyou,.kuaidi').on('click', function () {
       
        var petcardmoney = $("#petcardmoney").val();//用户当前余额
        ////修改快递发票信息。如果当前用户余额小于10（快递费），隐藏快递选择栏
        if (parseInt(petcardmoney) < 10) {
            if ($(this).prop('className') == 'kuaidi') {
                $(this).find('span').css('color', '#979797')
                return;
            }
        }

        
        if ($(this).hasClass('on-again')) {
            return;
        }
        $(this).addClass('on-again').children('strong').toggle().parent().siblings('div').removeClass('on-again').children('strong').toggle();

    })












    //弹出如旅钱包充值条款
    $('.agree-recharge span').on('click', function () {
        $('.modal-pc-clause').show();
    })

    //在支付密码修改页面点击忘记支付密码 	
    $('.forget-pwd').on('click', function () {
        $(this).parents('.modal-pc').hide();
        $('.modal-pc-forgetPwd').show();
    })


    //我的钱包js  end



    //我的信息js start

    //我的信息 性别选择
    $('.my_info_nr p b.my_sexnan').click(function () {
        $('.my_info_nr p b.my_sexnv').show();
        $('.my_info_nr p b.my_sexnv_on').hide();
        $(this).hide();
        $(this).siblings('.my_sexnan_on').show();
    });
    $('.my_info_nr p b.my_sexnv').click(function () {
        $('.my_info_nr p b.my_sexnan').show();
        $('.my_info_nr p b.my_sexnan_on').hide();
        $(this).hide();
        $(this).siblings('.my_sexnv_on').show();
    });


    //我的信息 性别选择
    $('.my_info_sex li').children().children('i').eq(0).addClass('sexon');
    $('.my_info_sex li').click(function () {
        $('.my_info_sex li').children().children().removeClass('sexon');
        $(this).children().children('i').addClass('sexon');
    });

    //密码修改
    $('.popup').height($(document).height());
    $('#password_change').click(function () {
        $(this).parent().parent().siblings('#my_info_password,.popup').show();
    });


    //修改手机号码
    $('.popup').height($(document).height());
    $('#phone_change').click(function () {
        $(this).parent().parent().siblings('#my_phone_tk1,.popup').show();
    });


    //修改电子邮箱
    $('.popup').height($(document).height());
    $('#email_change').click(function () {
        $(this).parent().parent().siblings('#my_info_tk1,.popup').show();
    });

    $('.my_info_buttonR').click(function () {
        $('.my_info_bg,.my_delete_tk,.popup').hide();
    });

    //获取电子邮箱验证码hover
    //$('.my_info_yzm input').hover(function () {
    //    $(this).addClass('yzmon');
    //}, function () {
    //    $(this).removeClass('yzmon');
    //});

    //input框点击
    //封装输入框获取焦点和失去焦点函数 LJB
    $(":text").on("focus", function () {
        $(this).addClass('inputon')
    });

    $(":text").on("blur", function () {
        $(this).removeClass('inputon');
    });


    //会员信息修改button的上移
    $('.mem_change_button input').hover(function () {
        $(this).addClass('redon');
    }, function () {
        $(this).removeClass('redon');
    });
    $('.mem_change_submit input').hover(function () {
        $(this).addClass('redon');
    }, function () {
        $(this).removeClass('redon');
    });

    //会员信息修改单选点击
    $('.mem_change_ul li').children().children('i').eq(0).addClass('sexon');
    $('.mem_change_ul li').click(function () {
        $('.mem_change_ul li').children().children('i').removeClass('sexon');
        $(this).children().children('i').addClass('sexon');
    });

    //会员信息修改单选切换
    $('.mem_change_list').eq(0).show();
    $('.mem_change_ul li').click(function () {
        $('.mem_change_list').eq($(this).index()).show().siblings('.mem_change_list').hide();
    });

    //会员信息修改input
    $(".mem_change_input input,.mem_change_yzm input").focus(function () {
        var oldValue = $(this).val();
        if (oldValue == this.defaultValue) {
            $(this).val("");
            $(this).addClass('redon');
        }
    });

    $(".mem_change_input input,.mem_change_yzm input").blur(function () {
        var oldValue = $(this).val();
        if (oldValue == "") {
            $(this).val(this.defaultValue);
            $(this).removeClass('redon');
        } else if (oldValue !== "") {
            $(this).removeClass('redon').css('color', '#535353');
        }
    });

    $(".mem_change_textarea textarea").focus(function () {
        var oldValue = $(this).val();
        if (oldValue == this.defaultValue) {
            $(this).val("");
            $(this).addClass('redon');
            $(this).parent().addClass('redon');
        }
    });

    $(".mem_change_textarea textarea").blur(function () {
        var oldValue = $(this).val();
        if (oldValue == "") {
            $(this).val(this.defaultValue);
            $(this).removeClass('redon');
            $(this).parent().removeClass('redon');
        } else if (oldValue !== "") {
            $(this).removeClass('redon').css('color', '#535353');
            $(this).parent().removeClass('redon');
        }
    });



    //我的信息js end



    //收藏
    $('.list_intro_collect').hover(function () {
        if ($(this).children("strong").html() == "收藏") {
            $(this).children("strong").addClass("spanon");
            $(this).find("span").css("color", "#C0191F");
        } else if ($(this).children("strong").html() == "已收藏") {
            $(this).find("span").html("&#xe60c;");
            $(this).children("strong").addClass("spanon");
            $(this).children("strong").html("取消收藏");
        }
    }, function () {
        if ($(this).children("strong").html() == "收藏") {
            $(this).children("strong").removeClass("spanon");
            $(this).find("span").css("color", "#979797");
        } else if ($(this).children("strong").html() == "取消收藏") {
            $(this).find("span").html("&#xe60d;")
            $(this).children("strong").html("已收藏");
        }
    });
    //$('.list_intro_collect').click(function () {
    //    if ($(this).children("strong").html() == "收藏") {
    //        $(this).find("span").css("color", "#c0191f");
    //        $(this).children("strong").html("已收藏");
    //        $(this).children("strong").addClass("spanon")
    //    } else if ($(this).children("strong").html() == "取消收藏") {
    //        $(this).find("span").css("color", "#979797");
    //        $(this).find("span").html("&#xe60d;");
    //        $(this).children("strong").removeClass("spanon");
    //        $(this).children("strong").html("收藏");

    //    }
    //});
    $(".list_intro_collect").click(function () {
        var hotelCd = $(this).attr("hotelCd");
        var login_mk = $(this).data("login_mk");
        if ($(this).children("strong").html() == "收藏") {
            collect_add(this, hotelCd, login_mk);
        }
        else {
            collect_cancel(this, hotelCd, login_mk);
        }
    });




    //钱包 发票功能
    //新增发票信息确认
    //修改发票信息验证
    var winForm1 = new FormValidation($("#modifyInvoice"), $("#modifyInvoice #add_sure"));
    winForm1.registeFunc(function () {
        return winForm1.setInput($("#modifyInvoice #input_invoiceTitle")).Regx("notNull");
    });
    winForm1.registeFunc(function () {
        return winForm1.setInput($("#modifyInvoice #input_recipients")).Regx("notNull");
    });
    winForm1.registeFunc(function () {
        return winForm1.setInput($("#modifyInvoice #input_phone")).Regx("telNum");
    });

    winForm1.registeFunc(function () {
        return winForm1.setInput($("#modifyInvoice #input_address")).Regx("notNull");
    });
    winForm1.registeFunc(function () {
        return winForm1.setInput($("#modifyInvoice #input_postcode")).Regx("6Number");
    });
    winForm1.registeFunc(function () {
        return winForm1.setInput($("#modifyInvoice #input_taxt_code")).Regx("notNull");
    });
    winForm1.registeFunc(function () {
        return winForm1.setInput($("#modifyInvoice #input_taxt_code1")).Regx("notNull");
    });

    winForm1.subBtn.click(function () {
        if (winForm1.validate()) {
            var type = "";
            var kd = "";
            var total = parseInt($("#totalrechargeamount").html());
            var petcardmoney = $("#petcardmoney").val();//用户当前余额
            var kuaidi = parseInt($("#kuaidiamount").html());
            var invoicemoney = $("#Recharge_input").val();
           
            var expressmoney = "0";
            if ($(".pingyou").find("strong").eq(1).css("display") != "none") {
                type = "01";
                kd = "平邮(免费)";
                $("#kuaidiamount").html("0");
                ////需要快递发票，如果当前用户余额小于10（快递费）,充值总金额=充值金额+10。如果余额大于10，充值总金额=充值金额
               
                //if (parseInt(petcardmoney) < 10) {
                //    total = total - kuaidi;
                //}
            }
            else {
                var kdf = parseInt($("#kuaidiamount").html());

                type = "02";
                kd = "快递(10元)";
                $("#kuaidiamount").html("10");
                expressmoney = "10";
                if (kdf == 0) {
                    //if (parseInt(petcardmoney) < 10) {
                    //    total = total + 10;
                    //}
                }
            }
            $("#totalrechargeamount").html(total);
            $("input[name='total_fee']").val(total);
            var province = $("#province").val()
            var city = $("#city").val()
            var area = $("#area").val()


            var data = {
                userName: $("#input_recipients").val(),
                province: $("#province").val(),
                city: $("#city").val(),
                area: $("#area").val(),
                address: $("#input_address").val(),
                postcode: $("#input_postcode").val(),
                title: $("#input_invoiceTitle").val(),
                taxt_code: $("#input_taxt_code").val(),
                Invoice_money: invoicemoney,
                Express_money:expressmoney,
                express: type
            };

            $.ajax({
                url: "/member/PetCardReceiptInsert",
                type: 'post',
                datatype: 'json',
                data: data,
                success: function (data) {
                    $(".modal-pc-needv2").hide();
                    $(".invoice-over-common").show();

                    //页面显示修改后数据
                    $("#s_invoicetitle").html($("#input_invoiceTitle").val());
                    $("#s_address").html($("#province").find("option:selected").text() + $("#city").find("option:selected").text() + $("#area").find("option:selected").text() + $("#input_address").val());
                    $("#s_kuaidi").html(kd);
                }
            });

            //$.post('@Url.Action("PetCardReceiptInsert", "Member")', data, function (data) {
            //    $(".modal-pc-needv2").hide();
            //    $(".invoice-over-common").show();

            //    //页面显示修改后数据
            //    $("#s_invoicetitle").html($("#input_invoiceTitle").val());
            //    $("#s_address").html($("#province").find("option:selected").text() + $("#city").find("option:selected").text() + $("#area").find("option:selected").text() + $("#input_address").val());
            //    $("#s_kuaidi").html(kd);
            //});

        };
    });




    //充值列表，补开发票功能。
    var winForm2 = new FormValidation($("#modifyInvoice"), $("#modifyInvoice #bkinvoice_sure"));
    winForm2.registeFunc(function () {
        return winForm2.setInput($("#modifyInvoice #input_invoiceTitle")).Regx("notNull");
    });
    winForm2.registeFunc(function () {
        return winForm2.setInput($("#modifyInvoice #input_recipients")).Regx("notNull");
    });
    winForm2.registeFunc(function () {
        return winForm2.setInput($("#modifyInvoice #input_phone")).Regx("telNum");
    });

    winForm2.registeFunc(function () {
        return winForm2.setInput($("#modifyInvoice #input_address")).Regx("notNull");
    });
    winForm2.registeFunc(function () {
        return winForm2.setInput($("#modifyInvoice #input_postcode")).Regx("6Number");
    });
    winForm2.registeFunc(function () {
        //如果发票抬头长度大于5，纳税人识别号 和统一社会信用代码必须有一个填写
        if ($("#input_invoiceTitle").val().length > 5) {
            if ($("#input_taxt_code").val() != "" || $("#input_taxt_code1").val() != "") {
                return true;
            } else {
                alert("纳税人识别号与统一社会信用代码二项必须填一项");
            }
        }
        else { return true;}
    });
    winForm2.subBtn.click(function () {
        if (winForm2.validate()) {
            
            var type = "";
            var kd = "";
            var total = parseInt($("#totalrechargeamount").html());
            var kuaidi = parseInt($("#kuaidiamount").html());
            var petcardmoney = $("#petcardmoney").val();//用户当前余额
            var invoicemoney = "0";
            if ($(".pingyou").find("strong").eq(1).css("display") != "none") {
                type = "01";
                kd = "平邮(免费)";
                $("#kuaidiamount").html("0");
                ////需要快递发票，如果当前用户余额小于10（快递费）,充值总金额=充值金额+10。如果余额大于10，充值总金额=充值金额
               
                //if (parseInt(petcardmoney) < 10) {
                //    total = total - kuaidi;
                //}
            }
            else {
                type = "02";
                kd = "快递(10元)";
                invoicemoney = "10";
                $("#kuaidiamount").html("10");
                ////需要快递发票，如果当前用户余额小于10（快递费）,充值总金额=充值金额+10。如果余额大于10，充值总金额=充值金额
               
                //if (parseInt(petcardmoney) < 10) {
                //    total = total + 10;
                //}
            }
            $("#totalrechargeamount").html(total);
            $("input[name='total_fee']").val(total);
            var province = $("#province").val()
            var city = $("#city").val()
            var area = $("#area").val()
            var taxt_code = "";
            if ($("#input_taxt_code").val() != "")
            {
                taxt_code = $("#input_taxt_code").val();
            }
            if ($("#input_taxt_code1").val() != "") {
                taxt_code = $("#input_taxt_code1").val();
            }

            var data = {
                userName: $("#input_recipients").val(),
                province: $("#province").val(),
                city: $("#city").val(),
                area: $("#area").val(),
                address: $("#input_address").val(),
                postcode: $("#input_postcode").val(),
                title: $("#input_invoiceTitle").val(),
                taxt_code: taxt_code,
                Invoice_money: invoicemoney,
                express: type,
                log_seq: $("#log_seq").val(),
            };

            $.ajax({
                url: "/member/PetCarduserReceipt",
                type: 'post',
                datatype: 'json',
                data: data,
                success: function (data) {
                    if (data.IsError == true) {
                        alert(data.Msg);
                    } else {
                        $(".modal-pc-needv2").hide();
                        $(".invoice-over-common").show();

                        //页面显示修改后数据
                        $("#s_invoicetitle").html($("#input_invoiceTitle").val());
                        $("#s_address").html($("#province").find("option:selected").text() + $("#city").find("option:selected").text() + $("#area").find("option:selected").text() + $("#input_address").val());
                        $("#s_kuaidi").html(kd);
                    }
                }
            });



        };
    });





    //常用入住人


    //关闭弹框
    $('.close-occupany,.close-occupany-btn').on('click', function () {
        $('.modal-pc-occupany').hide();
    })


    //常住人管理
    var winForm3 = new FormValidation($(".modal-pc-occupany"), $(".modal-pc-occupany .sure-occupany"));
    winForm3.registeFunc(function () {
        return winForm3.setInput($(".modal-pc-occupany #favLinkman_name")).Regx("notNull");
    });
    $("#favLinkman_name", ".modal-pc-occupany").blur(winForm3.getNewestRegiFunc());
    winForm3.registeFunc(function () {
        return winForm3.setInput($(".modal-pc-occupany #favLinkman_tel")).Regx("telNumOrNull");
    });
    winForm3.subBtn.click(function () {
        if (winForm3.validate()) {
            saveLinkman("更新");
        }
    });

    //常用入住人 end


    //sk 发票的js
    $('.new-invoice').on('click', function () {
        $('.mask4').show();
    })

    //变换
    $(".mask4 .tab p").each(function (i, element) {
        $(element).click(function () {
            $(this).find("i").addClass("active")
            $(element).find("span").addClass("active")
            $(element).siblings().find(".btn i").removeClass("active")
            $(element).siblings().find("span").removeClass("active")
            $(".tab_list li").eq(i).addClass("active").siblings().removeClass("active")
        })
    })


    //默认地址里面是否选择默认地址
    $('.defaultReceipt').on('click', function () {
        $(this).children('.icon_l').toggle();
    })
    //打开地址弹框
    $('.add-address').on('click', function () {
        $('.mask_use_location').show();
    })
    //关闭地址弹框
    $('.undo').on('click', function () {
        $('.mask_use_location').hide();
    })

    //密码修改
    $('.popup').height($(document).height());
    $('#password_change').click(function () {
        $(this).parent().siblings('#my_info_password,.popup').show();
    });



    //新增银行卡
    $('.popup').height($(document).height());
    $('#add_memcard').click(function () {
        $(this).parent().siblings('#add_memcard_tk,.popup').show();
    });

    //卡号验证上移
    $('.my_card_yz input').hover(function () {
        $(this).addClass('yzon');
    }, function () {
        $(this).removeClass('yzon');
    });
    //卡号input框点击
    $('.my_card_input input').focus(function () {
        $(this).addClass('inputon');
    });
    $('.my_card_input input').blur(function () {
        $(this).removeClass('inputon');
    });
    //银联卡下一步上移
    $('.my_card_button input').hover(function () {
        $(this).addClass('redon');
    }, function () {
        $(this).removeClass('redon');
    });
    //银联卡点击获取手机验证码
    $('.my_pay_yzm input').hover(function () {
        $(this).addClass('inputon');
    }, function () {
        $(this).removeClass('inputon');
    });


});

function pageinit() {
    //分页上移
    $(".page a").hover(function () {
        $(this).addClass("pageon");
    }, function () {
        $(this).removeClass("pageon");
    });
}
//表单验证;
$(function () {
    //账号验证
    $('#user_name_ipt').blur(function () {
        var user_name_val = $('#user_name_ipt').val();
        var re_tel = /^1[358]\d{9}$/;
        // var re_name = /(^[A-Za-z_]+$)|(^[\u4E00-\u9FA5]$)/;
        var re_name = /\D+/;
        if (re_tel.test(user_name_val) || re_name.test(user_name_val)) {
            $('#user_name_ipt').css('border', '');
            $('#user_name_sp1').css('display', "none");
        } else if (user_name_val == "") {
            $('#user_name_ipt').css('border', '1px solid #C0191F');
            $('#user_name_sp1').css('display', "block");
            $('#user_name_sp1').html('用户名/手机号不能为空')
        } else {
            $('#user_name_ipt').css('border', '1px solid #C0191F');
            $('#user_name_sp1').css('display', "block");
            $('#user_name_sp1').html('用户名/手机号格式错误')
        }
    });
    //订单号验证;
    var order_Ipt = document.getElementById('order_ipt');
    var order_Sp1 = document.getElementById('order_sp1');
    $('#order_ipt').blur(function () {
        var order_val = $('#order_ipt').val();
        var re_order = /^[0-9]{9}$/;
        if (re_order.test(order_val)) {
            $('#order_ipt').css('border', '');
            $('#order_sp1').css('display', "none");

        } else if (order_val == "") {
            $('#order_ipt').css('border', '1px solid #C0191F');
            $('#order_sp1').css('display', "block");
            $('#order_sp1').html('订单号为9位数字')
        } else {
            $('#order_ipt').css('border', '1px solid #C0191F');
            $('#order_sp1').css('display', "block");
            $('#order_sp1').html('订单号为9位数字')
        }
    });
    //提交
    $('#submit_btn').click(function () {
        if ($('#user_name_sp1').css('display') == "block" || $('#order_sp1').css('display') == "block") {
            return false;
        }
    })
})





