 
; (function ($) {
    $("#pwd").keyup(function (e) {
        if (e.keyCode === 13) {
            $("#btn_part_login").trigger("click");
        }
    });


    //会员登陆
    LG.login = function () {
        var accountNo = $("#accountNo").val();
        var pwd = $("#pwd").val();
        if ($("#head_check_input").hasClass("tc_fogetlabel")) {
            $("#autologin").val("yes");
        } else {
            $("#autologin").val("no");
        }
        LG.log(accountNo);
        if (accountNo === "") {
            $("#errorMsg").html("账号不能为空");
            $("#accountNo").focus();
            return;
        }
        if (pwd === "") {
            $("#errorMsg").html("密码不能为空");
            $("#pwd").focus();
            return;
        }
        if (!$(".head_myrj_box").is(":animated")) {
            $(".head_myrj_tc").animate({ width: '0px' }, "slow", function () {
                $(".head_myrj_box").animate({ height: '41px' }, "slow", function () {
                    $(".head_myrj_tc_login").hide("2000");
                });
            });
            $(".head_myrj_add").removeClass("head_myrj_top_iconon");
        }
        $("#loginForm").submit();
        return false;
    };
 
    //预订
    LG.book = function (hotelCd, rmTpCd) {
        var myForm = $("<form></form>");
        if (activityCode == "point") {
            $(myForm).attr("action", "http://www.bthhotels.com/Error/NotFound?aspxerrorpath=/Resv/CreatePoint.aspx");
        } else {
            $(myForm).attr("action", "http://www.bthhotels.com/Error/NotFound?aspxerrorpath=/Resv/Create.aspx");
        }
        $(myForm).attr("method", "post");
        $(myForm).append("<input type='hidden' name='hotelid' value='" + hotelid + "' />");
        $(myForm).append("<input type='hidden' name='RoomType' value='" + roomType + "' />");
        $(myForm).append("<input type='hidden' name='CheckIn' value='" + startDate + "' />");
        $(myForm).append("<input type='hidden' name='CheckOut' value='" + endDate + "' />");
        $(myForm).append("<input type='hidden' name='ActivityCode' value='" + activityCode + "' />");
        $(myForm).append("<input type='hidden' name='r' value='" + Math.random() + "' />");
        $(myForm).append("<input type='hidden' name='cityID' value='" + cityID + "'");
        $(myForm).append("<input type='submit' id='btnSubmit' />");
        $("body").append(myForm);
        myForm.submit();
    };

  

})(jQuery);
//Array Plug 2016-12-16 韩延忠

Array.prototype.remove = function (item) {
    this.splice($.inArray(item, this), 1);
}


