
$(function () {
    //头部app上移
    $(".app_head_box").hover(function () {
        $(this).children("code").addClass("redon");
        $(this).children("dl").show();
    }, function () {
        $(this).children("code").removeClass("redon");
        $(this).children("dl").hide();
    });
    $(".Customer_service").hover(function () {
        $(this).addClass("redon")
    }, function () {
        $(this).removeClass("redon")
    })
    //以下是调用上面的函数
    var mb = myBrowser();
    if ("IE" == mb) {
        $(".list_logos ul li div").addClass("Artboard_logo_ie");
        $(".brands_logo").addClass("brands_logo_ie");
        $(".em_cm").addClass("em_ie");
        $("i").addClass("i_ie")
    }
    if ("FF" == mb) {

    }
    if ("Chrome" == mb) {

    }
    if ("Opera" == mb) {
    }
    if ("Safari" == mb) {
        $(".list_logos ul li div").removeClass("Artboard_logo_ie");
        $(".brands_logo").removeClass("brands_logo_ie");
        $(".em_cm").removeClass("em_ie");
        $("i").removeClass("i_ie");
        $(".list_logos ul li div").addClass("Artboard_logo_cm")
    }
    //初始化页面
    var screenWidth = document.documentElement.scrollWidth;
    arrange();
    $(window).resize(function (event) {
        screenWidth = document.documentElement.scrollWidth;
        arrange()
    });
    function arrange() {
        var proLi = $('#proList li');
        if (screenWidth >= 1200) {
            for (var i = 0; i < proLi.length; i++) {
                proLi.eq(i).css('marginLeft', '22px');
                if (i % 5 == 0) {
                    proLi.eq(i).css('marginLeft', '0');
                };
            };
        } else {
            for (var i = 0; i < proLi.length; i++) {
                proLi.eq(i).css('marginLeft', '37px');
                if (i % 4 == 0) {
                    proLi.eq(i).css('marginLeft', '0');
                };
            };
        };
    }
    //导航上移与选中
    $(".nav li").hover(function () {
        $(this).addClass("navon").find('.nav_con').stop(true, true).slideDown();
        $(this).siblings().find('.nav_con').stop(true, true).slideUp();
    }, function () {
        $(this).removeClass("navon");
        $(this).find('.nav_con').stop(true, true).slideUp();
    });
    $(".nav li").click(function () {
        $(this).addClass("naon").siblings().removeClass("naon");
    });
    //登录前上移
    $('.top_login_txt').hover(function () {
        $(this).children('.top_login_xl').show();
    }, function () {
        $(this).children('.top_login_xl').hide();
    });

    $('.top_login_xl dd').hover(function () {
        $(this).addClass('pon');
    }, function () {
        $(this).removeClass('pon');
    });
    //登录后上移
    $('.top_login_box').hover(function () {
        $(this).children('.top_login_list').show();
    }, function () {
        $(this).children('.top_login_list').hide();
    });
    $('.top_login_list p').hover(function () {
        $(this).addClass('pon');
    }, function () {
        $(this).removeClass('pon');
    });

    //散客订单查询button上移
    $(".novip_form input.bth").hover(function () {
        $(this).addClass("redon");
    }, function () {
        $(this).removeClass("redon");
    });


});

function IsPrompt(logined, url) {
    if (url.indexOf('/') == 0) {
        url = location.origin + url;
    }
    if (url == "#") {
        url = location.href;
    }
    if (logined != '1') {
        $(".popup").height($(document).height());
        //$(".login_tk").show();
        $(".gd_member_login #quicklybook").attr("href", url);
        $(".gd_member_login").show();

        $(".popup").show();
        return false;
    } else {
        location.href = url;
    }
}
function myBrowser() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf("Opera") > -1;
    if (isOpera) {
        return "Opera"
    }; //判断是否Opera浏览器
    if (userAgent.indexOf("Firefox") > -1) {
        return "FF";
    } //判断是否Firefox浏览器
    if (userAgent.indexOf("Chrome") > -1) {
        return "Chrome";
    }
    if (userAgent.indexOf("Safari") > -1) {
        return "Safari";
    } //判断是否Safari浏览器
    if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
        return "IE";
    }; //判断是否IE浏览器
}

window['LG'] = window.LG || {};
LG.log = function (data) {
    if (window.console && console.log) {
        console.log(data)
    }
};
LG.IsIE8 = function () {
    if (navigator.userAgent.indexOf("MSIE 8.0") > 0) {
        return true;
    } else
        return false;
}

//自定义 IE8之前的indexOf
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (elt /*, from*/) {
        var len = this.length >>> 0;

        var from = Number(arguments[1]) || 0;
        from = (from < 0)
            ? Math.ceil(from)
            : Math.floor(from);
        if (from < 0)
            from += len;

        for (; from < len; from++) {
            if (from in this &&
                this[from] === elt)
                return from;
        }
        return -1;
    };
}



//获取URL中的参数键值对数据(参数:location.href) 
LG.getParams = function (href) {
    var params = {};
    var queryString = unescape(href).split("?");
    if (queryString.length <= 1) {
        return null;
    }
    var args = queryString[1].split("&");
    for (var i = 0; i < args.length; i++) {
        var arg = args[i].split("=");
        var key = arg[0];
        var value = "";
        if (arg.length > 1) {
            value = arg[1];
        }
        params[key] = value;
    }
    return params;
};

LG.NewGUID = function () {
    var guid = "";
    for (var i = 1; i <= 32; i++) {
        var n = Math.floor(Math.random() * 16.0).toString(16);
        guid += n;
        if ((i === 8) || (i === 12) || (i === 16) || (i === 20))
            guid += "-";
    }
    return guid;
}

LG.Eval = function (jsonText) {
    //JSON2.parse(jsonText);
    return window.eval("(" + jsonText + ")");
};


LG.cookie = (function () {
    var fn = function () { };
    fn.prototype.get = function (name) {
        var cookieValue = "";
        var search = name + "=";
        var offset = document.cookie.indexOf(search);
        var end = document.cookie.indexOf(";", offset);
        if (document.cookie.length > 0) {
            if (offset !== -1) {
                offset += search.length;
                if (end === -1) end = document.cookie.length;
                cookieValue = decodeURIComponent(document.cookie.substring(offset, end))
            }
        }
        return cookieValue;
    };
    fn.prototype.set = function (cookieName, cookieValue, DayValue) {
        var expire = "";
        var day_value = 1;
        if (DayValue !== null) {
            day_value = DayValue;
        }
        expire = new Date((new Date()).getTime() + day_value * 86400000);
        expire = "; expires=" + expire.toGMTString();
        document.cookie = cookieName + "=" + encodeURIComponent(cookieValue) + ";path=/" + expire;
    }
    fn.prototype.remvoe = function (cookieName) {
        var expire = "";
        expire = new Date((new Date()).getTime() - 1);
        expire = "; expires=" + expire.toGMTString();
        document.cookie = cookieName + "=" + escape("") + ";path=/" + expire;
    };
    return new fn();
})();

//Array Plug 2016-12-16 韩延忠

Array.prototype.remove = function (item) {
    this.splice($.inArray(item, this), 1);
}
//JSON Plug
var JSON;
if (!JSON) JSON = {}; (function () {
    "use strict";
    function f(a) {
        return a < 10 ? "0" + a : a
    }
    if (typeof Date.prototype.toJSON !== "function") {
        Date.prototype.toJSON = function () {
            return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
        };
        String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function () {
            return this.valueOf();
        };
    }
    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap, indent, meta = {
            "\b": "\\b",
            "\t": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            '"': '\\"',
            "\\": "\\\\"
        },
        rep;
    function quote(a) {
        escapable.lastIndex = 0;
        return escapable.test(a) ? '"' + a.replace(escapable,
            function (a) {
                var b = meta[a];
                return typeof b === "string" ? b : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
            }) + '"' : '"' + a + '"'
    }
    function str(h, i) {
        var c, e, d, f, g = gap,
            b, a = i[h];
        if (a && typeof a === "object" && typeof a.toJSON === "function") a = a.toJSON(h);
        if (typeof rep === "function") a = rep.call(i, h, a);
        switch (typeof a) {
            case "string":
                return quote(a);
            case "number":
                return isFinite(a) ? String(a) : "null";
            case "boolean":
            case "null":
                return String(a);
            case "object":
                if (!a) return "null";
                gap += indent;
                b = [];
                if (Object.prototype.toString.apply(a) === "[object Array]") {
                    f = a.length;
                    for (c = 0; c < f; c += 1) b[c] = str(c, a) || "null";
                    d = b.length === 0 ? "[]" : gap ? "[\n" + gap + b.join(",\n" + gap) + "\n" + g + "]" : "[" + b.join(",") + "]";
                    gap = g;
                    return d
                }
                if (rep && typeof rep === "object") {
                    f = rep.length;
                    for (c = 0; c < f; c += 1) if (typeof rep[c] === "string") {
                        e = rep[c];
                        d = str(e, a);
                        d && b.push(quote(e) + (gap ? ": " : ":") + d)
                    }
                } else for (e in a) if (Object.prototype.hasOwnProperty.call(a, e)) {
                    d = str(e, a);
                    d && b.push(quote(e) + (gap ? ": " : ":") + d)
                }
                d = b.length === 0 ? "{}" : gap ? "{\n" + gap + b.join(",\n" + gap) + "\n" + g + "}" : "{" + b.join(",") + "}";
                gap = g;
                return d
        }
    }
    if (typeof JSON.stringify !== "function") JSON.stringify = function (d, a, b) {
        var c;
        gap = "";
        indent = "";
        if (typeof b === "number") for (c = 0; c < b; c += 1) indent += " ";
        else if (typeof b === "string") indent = b;
        rep = a;
        if (a && typeof a !== "function" && (typeof a !== "object" || typeof a.length !== "number")) throw new Error("JSON.stringify");
        return str("", {
            "": d
        })
    };
    if (typeof JSON.parse !== "function") JSON.parse = function (text, reviver) {
        var j;
        function walk(d, e) {
            var b, c, a = d[e];
            if (a && typeof a === "object") for (b in a) if (Object.prototype.hasOwnProperty.call(a, b)) {
                c = walk(a, b);
                if (c !== undefined) a[b] = c;
                else delete a[b]
            }
            return reviver.call(d, e, a)
        }
        text = String(text);
        cx.lastIndex = 0;
        if (cx.test(text)) text = text.replace(cx,
            function (a) {
                return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
            });
        if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
            j = eval("(" + text + ")");
            return typeof reviver === "function" ? walk({
                "": j
            },
                "") : j
        }
        throw new SyntaxError("JSON.parse");
    };
    /*add by Irving 2012年9月14日11:43:42*/
    if (typeof JSON.formToJSON !== "function") JSON.formToJSON = function (a) {
        var data = $('#' + a).serializeArray();
        var result = {};
        var multiChooseArray = result[arrName]; for (var formValue, j = 0; j < data.length; j++) {
            formValue = data[j];
            var name = formValue.name;
            var value = formValue.value;
            if (name.indexOf('.') < 0) {
                result[name] = value;
                continue;
            } else {
                var simpleNames = name.split('.');
                // 构建命名空间
                var obj = result;
                for (var i = 0; i < simpleNames.length - 1; i++) {
                    var simpleName = simpleNames[i];
                    if (simpleName.indexOf('[') < 0) {
                        if (obj[simpleName] === null) {
                            obj[simpleName] = {};
                        }
                        obj = obj[simpleName];
                    } else { // 数组
                        // 分隔
                        var arrNames = simpleName.split('[');
                        var arrName = arrNames[0];
                        var arrIndex = parseInt(arrNames[1]);
                        if (obj[arrName] === null) {
                            obj[arrName] = []; // new Array();
                        }
                        obj = obj[arrName];
                        if (obj[arrIndex] === null) {
                            obj[arrIndex] = {}; // new Object();
                        }
                        obj = obj[arrIndex];
                    }
                }
                if (obj[simpleNames[simpleNames.length - 1]]) {
                    var temp = obj[simpleNames[simpleNames.length - 1]];
                    obj[simpleNames[simpleNames.length - 1]] = temp;
                } else {
                    obj[simpleNames[simpleNames.length - 1]] = value;
                }
            }
        }
        LG.log(result);
        return result;
    }
})();

Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S": this.getMilliseconds()
    }
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "")
            .substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
                : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}


function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
        "SymbianOS", "Windows Phone",
        "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}

//字符串转化为日期
function parseDate(str) {
    if (str instanceof Date) {
        return str;
    }
    if (typeof str == 'string') {
        var results = str.match(/^ *(\d{4})(\d{2})(\d{2}) *$/);
        if (results && results.length > 3)
            return new Date(parseInt(results[1], 10), parseInt(results[2], 10) - 1, parseInt(results[3], 10));
        results = str.match(/^ *(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2}) *$/);
        if (results && results.length > 6)
            return new Date(parseInt(results[1], 10), parseInt(results[2], 10) - 1, parseInt(results[3], 10), parseInt(results[4], 10), parseInt(results[5], 10), parseInt(results[6], 10));
        results = str.match(/^ *(\d{4})(-|\/)(\d{1,2})(-|\/)(\d{1,2}) *$/);
        if (results && results.length > 3)
            return new Date(parseInt(results[1], 10), parseInt(results[2], 10) - 1, parseInt(results[3], 10));
        results = str.match(/^ *(\d{4})(-|\/)(\d{1,2})(-|\/)(\d{1,2}) +(\d{1,2}):(\d{1,2}) *$/);
        if (results && results.length > 5)
            return new Date(parseInt(results[1], 10), parseInt(results[2], 10) - 1, parseInt(results[3], 10), parseInt(results[4], 10), parseInt(results[5], 10));
        results = str.match(/^ *(\d{4})(-|\/)(\d{1,2})(-|\/)(\d{1,2}) +(\d{1,2}):(\d{1,2}):(\d{1,2}) *$/);
        if (results && results.length > 6)
            return new Date(parseInt(results[1], 10), parseInt(results[2], 10) - 1, parseInt(results[3], 10), parseInt(results[4], 10), parseInt(results[5], 10), parseInt(results[6], 10));
        results = str.match(/^ *(\d{4})(-|\/)(\d{1,2})(-|\/)(\d{1,2}) +(\d{1,2}):(\d{1,2}):(\d{1,2})\.(\d{1,9}) *$/);
        if (results && results.length > 7)
            return new Date(parseInt(results[1], 10), parseInt(results[2], 10) - 1, parseInt(results[3], 10), parseInt(results[4], 10), parseInt(results[5], 10), parseInt(results[6], 10), parseInt(results[7], 10));
    }
    return null;
}


function splitAndTrim(str, spliter) {
    var newArray = str.split(spliter);

    if (newArray[0] == "")
        newArray.remove(newArray[0]);

    if (newArray[newArray.length - 1]) {
        var newArray_Last = newArray[newArray.length - 1];
        if (newArray_Last == "")
            newArray.remove(newArray_Last);
    }
    return newArray;
}

//阻止冒泡
function stopPropagation(e) {
    if (e.stopPropagation)
        e.stopPropagation();
    else
        e.cancelBubble = true;
};


//tab选项卡
function Tabs(dom, active, info) {
    var that = this;
    this.dom = dom;
    this.active = active;
    this.info = info;

    $('body').on('click', dom, function () {
        that.btnclick(this);
    });
}

Tabs.prototype.btnclick = function (tabLi) {
    $(tabLi).addClass(this.active).siblings(this.dom).removeClass(this.active);
    $(this.info).eq($(tabLi).index()).show().siblings(this.info).hide();
}



//模态框弹出位置居中
function AlertCenter(alertDom, parentDom) {
    var that = this;
    this.alertDom = alertDom;
    this.parentDom = parentDom;
    this.$dom = $(this.alertDom);


}

AlertCenter.prototype.getshow = function () {
    LG.log(this);
    this.divWidth = this.$dom.width();
    this.divHeight = this.$dom.height();
    this.modalLeft = $(window).width() / 2 - this.divWidth / 2 + 'px';
    this.modalTop = $(window).height() / 2 - this.divHeight / 2 + 'px';
    this.$dom.parent(this.parentDom).show();
    this.$dom.css({ 'top': this.modalTop, 'left': this.modalLeft });
}



//表单验证
function FormValidation($formElement, $submitBtn) {//参数为jQuery对象
    this.Form = arguments[0];  //arguments获取所有形参 arguments[0]==$formElement
    this.subBtn = arguments[1];
    this.allowSubmit = false;
    this.InputChkFuncSet = [];
    //可变
    this.defaultBorderColor = "rgb(204, 204, 204)"; //初始默认输入框边框色
    this.tipColor = "#c0191f"; //验证失败的提示颜色
    this.initForm = function (func) {
        $("input[type=text],input[type=password],input[type=textarea]", this.Form).val("").css("border-color", this.defaultBorderColor).siblings("span.errTip").hide();
        if (typeof func === "function") func.call(this, this.Form);
    };
    this.validate = function () {
        try {
            var chkPassNum = 0;
            for (var i = 0; i < this.InputChkFuncSet.length; i++) {
                if (this.InputChkFuncSet[i]())
                    chkPassNum++;
                else
                    return false;
            }
            if (chkPassNum == this.InputChkFuncSet.length)
                this.allowSubmit = true;
            else
                this.allowSubmit = false;
            return this.allowSubmit;
        } catch (err) {
            return false;
        }
    };
    this.setInput = function ($input) {
        LG.log(this.Form.find($input).length);
        var $onlyInput = this.Form.find($input);
        if ($onlyInput.length > 0)
            return new InputChk($onlyInput, this.defaultBorderColor, this.tipColor);
        else
            return false;
    };
    this.registeFunc = function (func) {//func：必须有返回值,且值类型为boolean。
        this.InputChkFuncSet.push(func);
        return this;
    };
    this.getNewestRegiFunc = function () {
        return this.InputChkFuncSet[this.InputChkFuncSet.length - 1];
    }
}


function InputChk($input, dfbordercolor, tipColor, undefined) {
    this.tag = $input;
    this.defaultBorderColor = dfbordercolor || "rgb(204, 204, 204)"; //初始默认输入框边框色
    this.tipColor = tipColor || "#c0191f";
    this.undefined = typeof undefined;
    this.regExp = {		//Regular expressions 
        "telNum": /^1[3|5|7|8][0-9]{9}$/, //手机号			
        "mail": /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/, 	//邮箱格式
        "telNumOrNull": /(^1[3|5|7|8][0-9]{9}$)|(^\s*$)/, 									//手机号或为空			
        "mailOrNull": /(^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$)|(^\s*$)/, //邮箱或为空				
        "notNull": /\S/, 				//非空		
        "letterNumber": /^[A-Za-z0-9]+$/, 	//字母或数字
        "6Number": /^\d{6}$/, 			//6位纯数字
        "certNum": /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
    };
    this.value = function () {
        if (typeof this.tag != this.undefined)
            return $.trim(this.tag.val()); //去空格	
        else
            return false;
    };
    //var test=[1,2,3,4]; //private  访问私有成员，需要通过”特权方法“
}
InputChk.prototype = {
    Regx: function () {  	//正则验证
        try {
            var boolVal, regObj, regx = arguments[0], isAutoTip, setTipFunc, iniTipFunc;
            //LG.log(typeof arguments[1]);	
            /*arguments为特殊对象，LG打印时为一个数组，可以直接.length获取长度，而对象.length是不能获取长度的*/
            for (var key = 0; key < arguments.length; key++) {
                if (typeof arguments[key] === "boolean")
                    isAutoTip = arguments[key];
                if (typeof arguments[key] === "function") {
                    setTipFunc = arguments[key];
                    if (typeof arguments[key + 1] === "function") {
                        iniTipFunc = arguments[key + 1];
                    }
                    break;
                }
            }
            if (typeof isAutoTip === this.undefined) isAutoTip = true;

            if (typeof regx === "object")
                regObj = regx;
            else {
                regObj = this.regExp[regx] || new RegExp(regx); //注:new RegExp('^\d{6}$','g') 相当于 /^\d{6}$/g
            }
            boolVal = regObj.test(this.value());

            if (boolVal) {
                if (isAutoTip) this.iniTip();
                if (typeof iniTipFunc !== this.undefined) iniTipFunc();
            } else {
                if (isAutoTip) this.setTip();
                if (typeof setTipFunc !== this.undefined) setTipFunc();
            }
            return boolVal;
        } catch (err) {
            var txt = "本页中存在错误。\n\n"
            txt += "错误描述：" + err.description + "\n\n"
            txt += "点击“确定”继续。\n\n"
            alert(txt);
            return false;
        }
    },
    CompareTo: function () {	//文本框比较
        try {
            var boolVal, comparedValue, isAutoTip, setTipFunc, iniTipFunc,
                comparedValue = typeof arguments[0] === "object" ? $.trim(arguments[0].val()) : arguments[0];
            var curInputVal = $.trim(this.tag.val());
            for (var key = 0; key < arguments.length; key++) {
                if (typeof arguments[key] === "boolean")
                    isAutoTip = arguments[key];
                if (typeof arguments[key] === "function") {
                    setTipFunc = arguments[key];
                    if (typeof arguments[key + 1] === "function") {
                        iniTipFunc = arguments[key + 1];
                    }
                    break;
                }
            }
            if (typeof isAutoTip === this.undefined) isAutoTip = true;

            if (curInputVal != "" && comparedValue != "" && curInputVal == comparedValue)
                boolVal = true;
            else
                boolVal = false;
            if (boolVal) {
                if (isAutoTip) this.iniTip();
                if (typeof iniTipFunc !== this.undefined) iniTipFunc();
            } else {
                if (curInputVal != "" && comparedValue != "") {			//special
                    if (isAutoTip) this.setTip();
                    if (typeof setTipFunc !== this.undefined) setTipFunc();
                }
            }
            return boolVal;
        } catch (err) {
            var txt = "本页中存在错误。\n\n"
            txt += "错误描述：" + err.description + "\n\n"
            txt += "点击“确定”继续。\n\n"
            alert(txt);
            return false;
        }
    },
    setTip: function () {
        this.tag.css({ "border-color": this.tipColor });
        this.tag.siblings("div.info-error").css("display", "inline");;
    },
    iniTip: function () {
        this.tag.css({ "border-color": this.defaultBorderColor });
        this.tag.siblings("div.info-error").css("display", "none");;
    }
}


//开始日期跟结束日期相差天数
function DateDiff(startDate, endDate) {
    var d1 = new Date(startDate.replace(/-/g, "/"));
    var d2 = new Date(endDate.replace(/-/g, "/"));
    var time = d2.getTime() - d1.getTime();
    return parseInt(time / (1000 * 60 * 60 * 24));
}
//新增发票信息，根据类别显示发票模块（普通，专用）
function showInvoice(type) {

    $(".mask4 .fillout .tab p").siblings().find(".btn i").removeClass("active")
    $(".mask4 .fillout .tab p").siblings().find("span").removeClass("active")
    $("#" + type).find("i").addClass("active");
    $("#" + type).siblings("span").addClass("active");
    if (type == "pt_invoice") {
        $(".li1").addClass("active");
        $(".li2").removeClass("active");
    } else {
        $(".li2").addClass("active");
        $(".li1").removeClass("active");
    }
}

//发票信息，取消按钮
function hide() {
    $(".mask4").hide();
}

//收藏酒店
function collect_add(obj, hotelCd, login_mk) {
    if (!login_mk) {
        $(".popup").height($(document).height());
        //alert("请先登录");
        $(".login_tk,.popup").show();
        $(".login_tk_buttonR").click(function () {
            $(".login_tk,.popup").hide();
        });
        return;
    }

    $(obj).children("strong").html("已收藏");
    $(obj).find("strong").css("color", "#C0191F")
    $(obj).find("span").css("color", "#C0191F")
    $(obj).find("span").html("&#xe60c;");

    $.ajax({
        type: "GET",
        url: "/Ajax/CollectHotel_Add",
        data: { hotelCd: hotelCd, ts: Math.random() },
        dataType: "json",
        success: function (result) {
            if (result != null && result.Code == "200") {
                $(obj).children("strong").html("已收藏");
                $(obj).find("strong").css("color", "#C0191F")
                $(obj).find("span").css("color", "#C0191F")
                $(obj).find("span").html("&#xe60c;");
            }
        }
    });
}

//取消收藏
function collect_cancel(obj, hotelCd, login_mk) {
    if (!login_mk) {
        alert("请先登录");
        return;
    }
    $(obj).children("strong").html("收藏");
    $(obj).find("span").html("&#xe60d;")
    $(obj).find("span").css("color", "#979797");
    $(obj).find("strong").css("color", "#979797");
    $.ajax({
        type: "GET",
        url: "/Ajax/CollectHotel_Cancel",
        data: { hotelCd: hotelCd, ts: Math.random() },
        dataType: "json",
        success: function (result) {
            if (result != null && result.Code == "200") {


                $(obj).children("strong").html("收藏");
                $(obj).find("span").html("&#xe60d;")
                $(obj).find("span").css("color", "#979797");
                $(obj).find("strong").css("color", "#979797");
            }
        }
    });



}


//使用方法 
//给对应tag添加onclick="gsqPush(参数)"  
//参数分别表示 
// 1(登录成功) 
// 2(注册成功)
// 3(预定成功)  
// 4(支付成功)
function gsqPush(num, type) {
    switch (num) {
        //登录成功
        case 1:
            _gsq.push(["T", "GWD-" + type, "track", "/targetpage/login"]);
            break;
        //注册成功
        case 2:
            _gsq.push(["T", "GWD-" + type, "track", "/targetpage/regok"]);
            break;
        //预定成功
        case 3:
            _gsq.push(["T", "GWD-" + type, "track", "/targetpage/appointmentok"]);
            break;
        //支付成功
        case 4:
            _gsq.push(["T", "GWD-" + type, "track", "/targetpage/finish_pay"]);
            break;
    }

};

//使用方法 
// num:表示对应的事情;
// eventClass:表示事件类别;
// event:表示事件;
// eventDetail:表示事件详情；
// 1:酒店搜索;
// 2:酒店预订;
// 3:协议用户预订;
// 4:搜索
//5:查询
//6:确认修改
//7:预订
//8:提交订单
//9：立即支付
//para2：表示动态的第五和第六参数


// demo
// 给对应tag添加onclick="publicFn(1)";

function publicFn(num, type, para2, para3) {
    //LG.log("调用统计代码 num=" + num + "&type=" + type + "&para2=" + para2 + "&para3=" + para3);
    switch (num) {
        //酒店搜索
        case 1:
            _gsq.push(["T", "GWD-" + type, "trackEvent", "首页", "酒店搜索", "酒店预订"]);
            break;
        //2:酒店预订;
        case 2:
            _gsq.push(["T", "GWD-" + type, "trackEvent", "首页", "酒店预订", "预订"]);
            break;
        //3:协议用户预订
        case 3:
            _gsq.push(["T", "GWD-" + type, "trackEvent", "首页", "协议预订", "预订"]);
            break;
        //4:搜索
        case 4:
            _gsq.push(["T", "GWD-" + type, "trackEvent", "首页", "酒店搜索", "搜索"]);
            break;
        //5:查询
        case 5:
            _gsq.push(["T", "GWD-" + type, "trackEvent", "酒店列表", "查询", para2]);
            break;
        //6:确认修改
        case 6:
            _gsq.push(["T", "GWD-" + type, "trackEvent", "酒店详情", "修改", "确认修改"]);
            break;
        //7:预订
        case 7:
            _gsq.push(["T", "GWD-" + type, "trackEvent", "预订", para2, para3]);
            break;
        //8:提交订单
        case 8:
            _gsq.push(["T", "GWD-" + type, "trackEvent", "提交订单", para2, para3]);
            break;
        //9：立即支付
        case 9:
            _gsq.push(["T", "GWD-" + type, "trackEvent", "立即支付", para2, para3]);
            break;
    }

}

