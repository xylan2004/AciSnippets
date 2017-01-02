var ctx = $("#ctx").val();
var comm = {};
var weixin_debug = false;
comm.prompt = {};

/**
 * js公共方法列表
 * -------------
 * 消息提示框（带状态：1成功/2失败）：------comm.prompt.info(content, time, flag);
 * 消息提示框（不带状态）：---------------comm.prompt.infoSmall(content, time);
 * 消息弹窗（类似alert()）-------------comm.prompt.alert(content, title, callBack, callBackValue)
 * 确认提示框（确认/取消）：--------------comm.prompt.showDialog(title, content, okCallback, okCallbackValue, confirm, cancel, cancelCallback, cancelCallbackValue);
 * 购物车商品总数总价：------------------comm.cartCount(type);
 * 时间选择器：-----------------------comm.chooseTime(showType);
 * 默认收貨地址：----------------------comm.initAddress();
 * 重定向跳转（URL:自定义路径）：----------comm.redirectUrl(URL);
 * 返回上级(返回几级-1，-2)：------------comm.returnSupr(num);
 * 支付页面URL：----------------------comm.payPage(dataSource);
 * 生成结算单返回支付页面URL--------------comm.payment(dataSource);
 * 判断当前用户是否登录-------------------comm.isLogin();
 * 时段选择器--------------------------comm.choosePeriodOfTime($select, startTime, endTime, minHours, minInterval)
 *
 * ------------
 */

/*缓存 偏方*/
//if(window.name != "bencalie"){
//	location.reload();
//	window.name = "bencalie";
//}else{
//	window.name = "";
//} 

/**
 * 分页事件触发
 * 通过监听滚动条来判断分页
 * method:回调函数。此函数为 页面执行函数
 */
comm.createPage = function (method) {
    $(window).scroll(function () {
        //已经滚动到上面的页面高度
        var scrollTop = $(this).scrollTop();
        //页面高度
        var scrollHeight = $(document).height();
        //浏览器窗口高度
        var windowHeight = $(this).height();
        //此处是滚动条到底部时候触发的事件，在这里写要加载的数据，或者是拉动滚动条的操作
        if (scrollTop + windowHeight == scrollHeight) {
            method();
        }

    });
};


/**
 * ajax 拦截 判断是否需要登陆
 * 若需要登陆直接跳转至登录页
 */
try{
$(document).ajaxComplete(function (event, xhr, settings) {
    try {
        var rpText = JSON.parse(xhr.responseText);
        if (rpText.code == '-4') {
            comm.delCookie('__',  ctx);
        }
        if (rpText.status == 'notlogin') {
            var url = window.location.href;
            window.location.replace(ctx + "/user/toMobileLogin?returnUrl=" + encodeURI(url));
        }
    } catch (e) {
    }
});} catch (e) {}


/**
 * 消息提示框
 * @author Zhang Zhixin
 * @param content 提示消息
 * @param time 消息等待时间 ms
 * @param flag 1：成功 2：失败
 * @param callBack 回调函数
 * @param callBackValue 回调函数值
 * @param is_overlay 是否使用遮罩  默认不使用  使用传true
 * @use 页面引入：js/common/dialog.js,然后需要提示时调用:comm.prompt("请选择！！",2000);
 */
comm.prompt.info = function (content, time, flag, callBack, callBackValue, is_overlay) {
    var statusImg = (flag == 1 ? ctx + '/images/dialog-success.png' : ctx + '/images/dialog-failure.png');
    $.dialog({
        type: 'info',
        infoText: content,
        infoIcon: statusImg,
        autoClose: time,
        dialogClass: (is_overlay ? '' : 'overlay-hidden')
    });
    if (callBack) {
        setTimeout(function () {
            callBack(callBackValue);
        }, time);
    }
}
/**
 * 消息提示框（不带状态√，×）
 * @author Zhang Zhixin
 * @param content 提示内容
 * @param time 提示时间
 * @param callBack 回调函数
 * @param callBackValue 回调函数值
 * @param is_overlay 是否使用遮罩  默认不使用  使用传true
 */
comm.prompt.infoSmall = function (content, time, callBack, callBackValue, is_overlay) {
    $.dialog({
        type: 'info-small',
        contentHtml: content,
        autoClose: time,
        dialogClass: (is_overlay ? '' : 'overlay-hidden')
    });
    if (callBack) {
        setTimeout(function () {
            callBack(callBackValue);
        }, time);
    }
}
/**
 * 消息弹窗（类似alert()）
 * @param content 提示内容
 * @param title 提示标题
 * @param callBack 回调函数
 * @param callBackValue 回调函数值
 */
comm.prompt.alert = function (content, title, callBack, callBackValue) {
    var userFunc = (callBack ? callBack : $.dialog.close);
    var isShowTitle = (title ? true : false);
    $.dialog({
        type: 'alert',
        showTitle: isShowTitle,
        titleText: title,
        contentHtml: content,
        onClickOk: function () {
            userFunc(callBackValue);
        }
    });
};


/**
 * 确认提示框 确认/取消
 * @author Zhang Zhixin
 * @param title 提示标题
 * @param content 提示内容
 * @param okCallback 点击确定执行函数（直接传方法名称,不加()""）
 * @param okCallbackValue 确定执行函数参数值
 * @param confirm 确定按钮文字（自定义）
 * @param cancel 取消按钮文字（自定义）
 * @param cancelCallback 点击取消执行函数（直接传方法名称,不加()""）
 * @param cancelCallbackValue 取消执行函数参数值</br>
 * @use 引入：dialog.js</br>
 *        执行：comm.prompt.showDialog(title, content, okCallback, confirm, cancel, cancelCallback)
 */
comm.prompt.showDialog = function (title, content, okCallback, okCallbackValue, confirm, cancel, cancelCallback, cancelCallbackValue) {
    var ok = (!confirm || confirm == null ? "确定" : confirm);
    var no = (!cancel || cancel == null ? "取消" : cancel);
    var isShowTitle = (title ? true : false);
    var okCall = (!okCallback || okCallback == null ? $.dialog.close : okCallback);
    var cancelCall = (!cancelCallback || cancelCallback == null ? $.dialog.close : cancelCallback);
    $.dialog({
        type: 'confirm',
        titleText: '<span class=orange>' + title + '</span>',
        showTitle: isShowTitle,
        showContent: false,
        contentHtml: content,
        buttonText: {//设置按钮文字
            ok: ok,
            cancel: no
        },
        onClickOk: function () {//点击确定后执行
            okCall(okCallbackValue);
        },
        onClickCancel: function () {//点击取消后执行
            cancelCall(cancelCallbackValue);
        }
    });
}
/**
 * 购物车商品数量，总价
 * @author Zhang Zhixin
 * @returns items{</br>
 * 				totleNum 商品总数</br>
 * 				totlePrice 商品总价</br>
 * 				favorablePrice 优惠价格</br>
 * 			}</br>
 * @use comm.cartCount().totleNum 获取到购物车商品总数
 */
comm.cartCount = function () {
    var items = {totleNum: 0, totlePrice: 0, favorablePrice: 0}
    $.ajax({
        type: "post",
        url: ctx + "/cart/cartCount",
        dataType: "json",
        cache: false,
        async: false,
        success: function (msg) {
            if (!msg.code || msg.code != 0) {
                return items;
            }
            items.totleNum = msg.data.selectNum;
            items.totlePrice = msg.data.totalMoney;
            items.favorablePrice = msg.data.favorablePrice;
        }, error: function (e) {
            console.info(e);
        }
    });
    return items;
}


/**
 *  商品是否收藏
 *  @author HuoYunLei
 *
 *
 *
 *
 */
comm.isFavorites = function (dataSource) {
    var items = {};
    $.ajax({
        type: "post",
        url: ctx + "/product/init",
        dataType: "json",
        data: dataSource,
        cache: false,
        async: false,
        success: function (msg) {
            if (!msg.product.code || msg.product.code != 0) {
                return items;
            }
            items.code = msg.product.code;
            items.status = msg.product.data.isFavorites;
        }, error: function (e) {
            console.info(e);
        }
    });
    return items;
}

/**
 * 添加收藏
 *  @author HuoYunLei
 *
 *
 */
comm.Favorites = function (dataSource) {
    var items = "-1";
    $.ajax({
        type: "post",
        url: ctx + "/userFavorite/insertFavorites",
        dataType: "json",
        data: dataSource,
        cache: false,
        async: false,
        success: function (msg) {
            if (!msg.code || msg.code != 0) {
                return items;
            }
            items = msg.code;
        }, error: function (e) {
            console.info(e);
        }
    });
    return items;
};

/**
 *  删除收藏
 *  @author HuoYunLei
 *
 *
 *
 *
 */
comm.delFavorites = function (dataSource) {
    var items = "-1";
    $.ajax({
        type: "post",
        url: ctx + "/userFavorite/delFavorites",
        dataType: "json",
        data: dataSource,
        cache: false,
        async: false,
        success: function (msg) {
            if (!msg.code || msg.code != 0) {
                return items;
            }
            items = msg.code;
        }, error: function (e) {
            console.info(e);
        }
    });
    return items;
};


/**
 * 时间选择器
 * @author Zhang Zhixin
 * @param showType id名称数组</br>
 * @use
 *    引入：mobiscroll_date.css</br>
 *    mobiscroll_date.js</br>
 *    写一个input id='xxx_date' 注：id名称格式为：xxx_类型</br>
 *    页面加载时执行：</br>
 *    var type = ["xxx_date"];</br>
 *    comm.chooseTime(type);</br>
 * @type
 *    date：年/月/日</br>
 *    datetime：年/月/日 时:分:秒</br>
 *    time：时:分:秒</br>
 */
comm.chooseTime = function (showType,option) {
    if (!showType) {
        console.info("时间类型为空！！");
        return;
    }
//	var currYear = (new Date()).getFullYear();
//    var opt={};
//    opt.date = {preset : 'date'};
//    opt.datetime = {preset : 'datetime'};
//    opt.time = {preset : 'time'};
//    opt.custom = {
//        theme: 'android-ics light', //皮肤样式
//        display: 'modal', //显示方式
//        mode: 'scroller', //日期选择模式
//        dateFormat: 'yyyy-mm-dd',
//        lang: 'zh',
//        showNow: false,
//        nowText: "",
//        startYear: currYear - 10, //开始年份
//        endYear: currYear + 10 //结束年份
//    };
//	$('input[id='+this+""+']').mobiscroll($.extend(opt[type], opt['custom']));
    var date = new Date();
    date =  new Date(date.getFullYear()+"/"+(date.getMonth()+1)+"/"+(date.getDate()+1)+" 08:00:00");
    var currYear = date.getFullYear();
    var min = new Date().getTime()+ (date.getTime() - new Date().getTime());
    var max = date.getTime()+ 365 * 24 * 60 * 60 * 1000;
    $.each(showType, function () {
        var type = this.substring(this.indexOf('_') + 1, this.length);
        var defaultParam = {
        	theme: 'android-holo-light',
            mode: 'scroller',
            display: 'modal',
            lang: 'zh',
            startYear: currYear - 10, //开始年份
            endYear: currYear + 10, //结束年份
            minDate: new Date(min),
            maxDate: new Date(max)
        }
        if (type == 'date') {
            $('#' + this).mobiscroll().date($.extend({}, defaultParam, option));
        } else if (type == 'datetime') {
            $('#' + this).mobiscroll().datetime($.extend({}, defaultParam, option));
        } else if (type == 'time') {
            $('#' + this).mobiscroll().time($.extend({}, defaultParam, option));
        } else {
            console.info("时间控件类型错误！！");
        }
    });
};

comm.chooseTimeDialog = function ($selector, option) {
    option = option || {};

    var currYear = (new Date()).getFullYear();
    var defaultOption = {
        theme: 'android-holo-light', //皮肤样式
        display: 'modal', //显示方式
        mode: 'scroller', //日期选择模式
        dateFormat: 'yyyy-mm-dd',
        lang: 'zh',
        showNow: false,
        nowText: "",
        startYear: currYear - 10, //开始年份
        endYear: currYear + 10 //结束年份
    };
    if (!option.timeFormat) {
        $selector.mobiscroll().date($.extend({}, defaultOption, option));
    } else {
        $selector.mobiscroll().datetime($.extend({}, defaultOption, option));
    }

};

comm.chooseTimeDialogToDate = function ($selector, date, showType) {
    if (!showType) {
        console.info("时间类型为空！！");
        return;
    }
    var currYear = (new Date(date)).getFullYear();
//    var opt={};
//    opt.date = {preset : 'date'};
//    opt.datetime = {preset : 'datetime'};
//    opt.time = {preset : 'time'};
//    opt.custom = {
//        theme: 'android-ics light', //皮肤样式
//        display: 'modal', //显示方式
//        mode: 'scroller', //日期选择模式
//        dateFormat: 'yyyy-mm-dd',
//        lang: 'zh',
//        showNow: false,
//        nowText: "",
//        startYear: currYear - 10, //开始年份
//        endYear: currYear + 10 //结束年份
//    };
    if (showType == "date") {
        $selector.mobiscroll().date({
            theme: 'android-holo-light',
            mode: 'scroller',
            display: 'modal',
            lang: 'zh',
        });
    } else if (showType == "datetime") {
        $selector.mobiscroll().datetime({
            theme: 'android-holo-light',
            mode: 'scroller',
            display: 'modal',
            lang: 'zh',
        });

    }
};

/**
 * 时段选择器
 * @author Zhang Zhixin
 * @param $select div 选择
 * @param startTime 开始时间
 * @param endTime 结束时间
 * @param minHours 最小服务时间
 * @param minInterval 小时间隔
 * @param maxHours 最大服务时间
 * 
 */
comm.choosePeriodOfTime = function ($select, startTime, endTime, minHours, minInterval,maxHours) {
    var start_H = startTime.substring(0, startTime.indexOf(':'));
    var start_M = startTime.substring(startTime.indexOf(':') + 1, startTime.length);
    var end_H = endTime.substring(0, endTime.indexOf(':'));
    var end_M = endTime.substring(endTime.indexOf(':') + 1, endTime.length);
    var html = '<ul id="comm_service-timerange" style="display:none;">\n';
    var inter = parseInt(start_M);
    var i = parseInt(start_H);
    while (i <= parseInt(end_H) - minHours) {
        html += '<li>\n<span>' + i + ':' + (inter == 0 ? '00' : inter) + '</span>\n<ul>\n';
        var j = i + minHours;
        var inter2 = inter;
        var aa = (maxHours?((i+maxHours)<=parseInt(end_H)?(i+maxHours):parseInt(end_H)):parseInt(end_H));
        while (j <= parseInt(aa)) {
            html += '<li>' + j + ':' + (inter2 == 0 ? '00' : inter2) + '</li>\n';
            if (j == parseInt(end_H) && inter2 >= parseInt(end_M)) {
                j++;
                break;
            }
            if(maxHours&&(i+maxHours)==j&&inter==0){
            	j++;
                break;
            }
            inter2 += minInterval;
            if (inter2 >= 60) {
                inter2 = 0;
                j++;
            }
        }
        html += '</ul>\n</li>'
        if (i == parseInt(end_H) - minHours && inter >= parseInt(end_M)) {
            i++;
            break;
        }
        inter += minInterval;
        if (inter >= 60) {
            inter = 0;
            i++;
        }
    }
    $select.html(html + "\n</ul>");
    //时间范围选择
    $('#comm_service-timerange').mobiscroll().treelist({
        theme: 'android-holo-light',
        mode: 'scroller',
        display: 'modal',
        placeholder: '请选择服务时段',
        inputClass: 'orange',
        showLabel: true,
        lang: 'zh',
        selectedText: '我的',
        labels: ['开始时间', '结束时间'],
        formatResult: function (array) {
            var startTime = $('#comm_service-timerange>li').eq(array[0]).children('span');
            var endTime = $('#comm_service-timerange>li').eq(array[0]).find('ul li').eq(array[1]);
            return startTime.text() + ' - ' + endTime.text();
        }
    });

}

/**
 * 数量选择器
 * @param $select html文本追加div
 * @param InputId 自定义id 如果要获取选择器的value $("自定义_dummy")
 * @param minNum 最小值
 * @param maxNum 最大值
 * @param unit 单位
 * @param interval 间隔
 */
comm.chooseNum = function ($select, InputId, minNum, maxNum, unit, interval) {
    if (minNum > maxNum) {
        comm.prompt.infoSmall("暂未开放，请选择其余服务");
        return;
    }
    var html = '<ul id="' + InputId + '" style="display:none;">\n';
    for (var i = parseInt(minNum); i <= maxNum; i += interval) {
        html += '<li>' + i + (!unit ? "" : " " + unit) + '</li>\n'
    }
    $select.html("").html(html + "\n</ul>");
    //时间范围选择
    $('#' + InputId).mobiscroll().treelist({
        theme: 'android-holo-light',
        mode: 'scroller',
        display: 'modal',
        placeholder: '请选择数量',
        inputClass: 'orange',
        showLabel: true,
        lang: 'zh',
        selectedText: '我的',
        labels: ['数量'],
        formatResult: function (array) {
            var startTime = $('#' + InputId + '>li').eq(array[0]);
            return startTime.text();
        }
    });
}


/**
 * 日期格式化方法
 * 将js日期对象进行格式化的方法
 * @author huoyunlei
 */
Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(), //day
        "h+": this.getHours(), //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
        "S": this.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}
/**
 * 获取日期星期几
 * 入参：time 格式为 yyyy-mm-dd
 * @author huoyunlei
 */
function getDayStr(time) {
    if (time == undefined || time == "undefined" || time == "") {
        return "";
    } else {
        re = new RegExp('-', 'g');
        time = time.replace(re, "/");
        var day = new Date(time).getDay();
        var dayValue = ["日", "一", "二", "三", "四", "五", "六"];
        return dayValue[day];
    }


}

/**
 * 生成结算单及支付页面URL
 * @author YunLei.Huo
 * @return
 * dataSource：参数 例：{"id":"123456","type":"1"}
 * type:分类  1.账户类结算 ,2.订单类结算, 3.解决方案结算,4.卡卷类结算
 * source：1 微信  2支付宝
 * is_phone：1 移动端  2PC端
 *
 *  1.账户类结算
 *  money 金额、name充值账户
 *
 *  2.订单类结算||3.解决方案结算
 *  orderId  订单ID
 *
 *  4.卡卷类结算
 *  id 卡类型ID、amount 数量、mobile 电话号
 *
 * method:回调函数
 *
 *
 * 返回值
 * code : -1:失败 ，0：成功
 * url： 支付页面URL
 * msg: 描述信息
 */
comm.payment = function (dataSource) {
    var dataVal = {};
    $.ajax({
        type: "post",
        url: ctx + "/payment/account",
        dataType: "json",
        data: dataSource,
        async: false,
        cache: false,
        success: function (data) {
            dataVal = data;
        },
        error: function (e) {
            comm.prompt.infoSmall("生成结算单异常!", 3000);
        }
    });
    return dataVal;
};

/**
 * 支付页面URL
 * @author Zhang Zhixin
 * @param dataSource对象
 *
 * 对象参数说明：
 *        orderId：结算单ID
 *        source：1 微信 2支付宝
 *        is_phone：1 移动端 2PC端
 * 例：{orderId:xxx,source:1,is_phone:1}
 *
 * @returns {"url":"https://","code":"0"}
 */
comm.payPage = function (dataSource) {
    var dataVal = {}
    $.ajax({
        type: "post",
        url: ctx + "/payment/getUrl",
        dataType: "json",
        data: dataSource,
        async: false,
        cache: false,
        success: function (data) {
            dataVal = data;
        }
    });
    return dataVal;
};


/**
 * 初始化收貨地址
 * @author Zhang Zhixin
 * @param flag 1 屏蔽当前城市以外的收货地址【选填】
 * @return
 * {</br>
 * 	addressId</br>
 * 	addressName</br>
 * 	addressPhone</br>
 * 	addressDetail</br>
 * }</br>
 */
comm.initAddress = function (flag) {
    var address = {};
    $.ajax({
        type: "post",
        url: ctx + "/userAdress/queryAddressList",
        data: {flag: flag},
        dataType: "json",
        async: false,
        cache: false,
        success: function (msg) {
            if (!msg.userAdress.code || msg.userAdress.code != 0) {
                console.info(!msg.userAdress.msg ? msg : msg.userAdress.msg);
                return;
            }
            if (msg.userAdress.data.length > 0) {
                var add = msg.userAdress.data[0];
                address.addressId = add.id;
                address.addressName = add.contactName;
                address.addressPhone = add.contactPhone;
                address.addressDetail = (add.city + add.country + add.chooseAddress + add.addressDetail);
                address.flag = 1;
            } else {
                address.flag = 2;
            }
        },
        error: function (e) {
            console.info(e);
        }
    });
    return address;
};


/**
 * 更改url 的hash值
 * @param message
 */
comm.changeUrlHashValue = function (message) {
    window.location.hash = "#" + message;
};

comm.replaceUrlHashValue = function (value) {
    window.location.replace('#' + value);
};

/**
 * 获取url hash值
 * @returns {string}
 */
comm.getUrlHashValue = function () {
    var h = window.location.hash;
    if (h && h.indexOf("#") == 0) {
        return h.substring(1, h.length);
    }
    return h;
};

comm.getUrl = function(href){
    var h = href || window.location.href;
    if (h && h.indexOf("#") > 0) {
        return h.substring(0, h.indexOf('#'));
    }
    return h;
};

comm.getUrlAndHashPath = function(){
    return comm.getUrl() + '#' + comm.getUrlHashPath();
};

comm.getUrlHashPath = function(){
    var h = comm.getUrlHashValue();
    if (h.indexOf('!')>0) {
        h = h.substr(0, h.indexOf('!'));
    }
    return h;
};

comm.getUrlHashParam = function (key, url) {
    var v = comm.getUrlHashValue();

    if (url && url!=null) {
        v = url;
    }

    if (!v) {
        return {};
    }
    if (v.indexOf('!')>0) {
        v = v.substr(v.indexOf('!')+1);
    }

    var strs = v.split('&');
    if (!strs || strs.length <= 0) {
        return {};
    }
    var param = {};
    for (var s in strs) {
        var str = strs[s];
        var p = str.split('=');
        if (p.length == 2) {
            var name = decodeURIComponent(p[0]);
            var value = decodeURIComponent(p[1]);
            param[name] = value;
        }
    }
    if (key) {
        return param[key];
    }
    return param;
};

/**
 * 修改标题
 * @param title
 */
comm.updateTitle = function (title) {
    $('title').html(title);
    $('#title').html(title);
};

/**
 * 监听hash值变化事件
 * @param callback 回调函数
 */
comm.addHashChangeEventListener = function (callback) {
    $(window).on('hashchange', function () {
        callback(comm.getUrlHashValue());
    });
};
/**
 * 重定向跳转
 * @param URL:自定义跳转路径
 */
comm.redirectUrl = function (URL) {
    window.location.href = URL;
}
/**
 * 返回上级
 * @param num 返回上面多少级 -1 -2
 */
comm.returnSupr = function (num) {
    window.history.go(num)
};
/**
 * 判断当前用户是否登录
 * @returns true/false 注：返回的是字符串类型的
 */
comm.isLogin = function () {
    var address = "";
    $.ajax({
        type: "post",
        url: ctx + "/class/isLogin",
        dataType: "text",
        async: false,
        success: function (msg) {
            address = msg;
        }
    });
    return address;
};

comm.validator = function ($selector, options) {
    var methods = {
        'notEmpty': function (value) {
            return value && value != '';
        },
        'money': function (value) {
            var reg = new RegExp(/^\-{0,1}(\d)*(\.){0,1}(\d*)$/);
            return reg.test(value);
        },
        'digits': function (value) {
            var reg = new RegExp(/^(\d*)$/);
            return reg.test(value);
        },
        'maxLength': function (value) {
            var data = options['maxLength'];
            return value.length<=parseInt(data['value']);
        },
        'minLength': function(value) {
            var data = options['minLength'];
            return value.length>=parseInt(data['value']);
        },
        'gt': function (value) {
            var data = options['gt'];
            return parseFloat(value) > parseFloat(data['value']);
        },
        'gte': function (value) {
            var data = options['gte'];
            return parseFloat(value) >= parseFloat(data['value']);
        },
        'lt': function (value) {
            var data = options['lt'];
            return parseFloat(value) < parseFloat(data['value']);
        },
        'lte': function (value) {
            var data = options['lte'];
            return parseFloat(value) <= parseFloat(data['value']);
        },
        'gtTo': function (value) {
            var data = options['gtTo'];
            return parseFloat(value) > parseFloat(data['el'].val());
        },
        'gteTo': function (value) {
            var data = options['gteTo'];
            return parseFloat(value) >= parseFloat(data['el'].val());
        },
        'mobile': function(value) {
            return /^1[34578]\d{9}$/.test(value);
        }
    };

    var value = $selector.val();
    for (var k in options) {
        if (!methods[k](value)) {
            if (typeof options[k] == 'string') {
                comm.prompt.infoSmall(options[k], 1000);
            } else if (typeof options[k] == "object") {
                comm.prompt.infoSmall(options[k]['msg'], 1000);
            }
            return false;
        }
    }
    return true;
};

try {
    Handlebars.registerHelper('eq', function (p1, p2, options) {
        if (p1 == p2) {
            return options.fn(this);
        }
    });

    Handlebars.registerHelper('notEq', function (p1, p2, options) {
        if (p1 != p2) {
            return options.fn(this);
        }
    });

    Handlebars.registerHelper('gt', function (p1, p2, options) {
        if (p1 > p2) {
            return options.fn(this);
        }
    });

    Handlebars.registerHelper('lt', function (p1, p2, options) {
        if (p1 < p2) {
            return options.fn(this);
        }
    });

    Handlebars.registerHelper('add', function (p1, p2) {
        return p1 + p2;
    });

    Handlebars.registerHelper('multiply', function (p1, p2) {
        return p1 * p2;
    });

    Handlebars.registerHelper('moneySplitByPoint', function(context, options){
        var arr = String(context).split('.');
        var obj = {'integer': arr[0], 'decimal': arr[1]};
        return options.fn(obj);
    });
} catch (e) {
}

/**
 * 跳转链接
 * @author Zhang Zhixin
 * @param 字符串类型的json对象(JSON.stringify(jsonObject))
 * @returns {URL:"xxx",code:1/-1,msg:"xxx"}
 */
comm.class3Redirect = function (items) {
    var categoryItems = JSON.parse(items);
    var details = {URL: "", code: 1, msg: ""};
    switch (categoryItems.jumpType) {
        case 1:
            //productdetail:商品详情
            details.URL = ctx + "/product/loadById?productCode=" + categoryItems.params.skuCode;
            break;
        case 2:
            //category:分类
            details.URL = ctx + "/class/info?categoryCode=" + categoryItems.params.categoryCode;
            break;
        case 3:
            //httpurl:跳转连接
            details.URL = categoryItems.params.url;
            break;
        case 4:
            //recharge：充值
            details.URL = ctx + "/account/privilege";
            break;
        case 5:
            //bemember ：成为会员
            details.URL = ctx + "/html/1.html";
            break;
        case 6:
            //giftcard:礼品卡
            details.URL = ctx + "/card/init";
            break;
        case 7:

            break;
        case 8:
            //customized：定制解决方案
            details.URL = ctx + "/solutaion/custom";
            break;
        case 9:
            //recommend：推荐方案
            details.URL = ctx + "/solutaion/list";
            break;
        case 10:
            //intelli：智能方案
//		details.URL = ctx+"";

            break;
        case 11:
            //bemember ：资讯列表
            details.URL = ctx + "/jsp/article/articheList.jsp";
            break;
        case 12:
            //productList:商品列表
            details.URL = ctx + "/product/list?categoryCode=" + categoryItems.params.categoryCode;
            break;
        case 13:
            //personInfor：服务人员详情
            details.URL = ctx + "/proOrder/initItems?categoryCode=" + categoryItems.params.categoryCode + "&title=" + encodeURIComponent(encodeURIComponent(categoryItems.params.cateName))+"&productcode=" + comm.replaceStr(categoryItems.params.productcode,"");
            break;
        case 14:
            //fastorder ：快速预约
            details.URL = ctx + "/proOrder/initItems?categoryCode=" + categoryItems.params.categoryCode + "&title=" + encodeURIComponent(encodeURIComponent(categoryItems.params.cateName))+"&productcode=" + comm.replaceStr(categoryItems.params.productcode,"");
            break;
        case 0:
            details.code = -1;
            details.msg = "暂未开放";
            break;
        default:
            details.code = -1;
            details.msg = "数据异常";
            break;
    }
    //当前选项是否需要登录   !0 需要登录
    if (categoryItems.needLogin != 0) {
        var isLogin = comm.isLogin();
        if (isLogin == 'false') {
            details.URL = ctx + "/user/toMobileLogin";
        }
    }
    return details;
}

/**
 * 微信关注接口
 *
 * datasource.wechat_app_id, // 必填，公众号的唯一标识
 * dataSource.timestamp, // 必填，生成签名的时间戳
 * dataSource.noncestr, // 必填，生成签名的随机串
 * dataSource.signature,// 必填，签名，见附录1
 *
 *
 * dataSource.title, // 分享标题
 * dataSource.href, // 分享链接
 * dataSource.image, // 分享图标
 */

comm.fenxiang = function (dataSource) {
    wx.config({
        debug: weixin_debug, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: dataSource.wechat_app_id, // 必填，公众号的唯一标识
        timestamp: dataSource.timestamp, // 必填，生成签名的时间戳
        nonceStr: dataSource.noncestr, // 必填，生成签名的随机串
        signature: dataSource.signature,// 必填，签名，见附录1
        jsApiList: ['onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'onMenuShareQZone'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });
    wx.ready(function () {
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
        /*  $("#editHeadPhoto").click(function(){ */

        wx.onMenuShareTimeline({
            title: dataSource.title, // 分享标题
            link: dataSource.href, // 分享链接
            imgUrl: dataSource.image, // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
        /* }); */

        wx.onMenuShareQQ({
            title: dataSource.title, // 分享标题
            desc: dataSource.describ, // 分享描述
            link: dataSource.href, // 分享链接
            imgUrl: dataSource.image, // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
        wx.onMenuShareQZone({
            title: dataSource.title, // 分享标题
            desc: dataSource.describ, // 分享描述
            link: dataSource.href, // 分享链接
            imgUrl: dataSource.image, // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
        wx.onMenuShareAppMessage({
            title: dataSource.title, // 分享标题
            desc: dataSource.describ, // 分享描述
            link: dataSource.href, // 分享链接
            imgUrl: dataSource.image, // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });

        wx.onMenuShareWeibo({
            title: dataSource.title, // 分享标题
            desc: dataSource.describ, // 分享描述
            link: dataSource.href, // 分享链接
            imgUrl: dataSource.image, // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
    });
    wx.error(function (res) {
        console.log(res);
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。

    });
}

//发送验证码
function sendVerifcode(en, num, load, type) {
    var open = $(en);
    var mobile = $("#mobile").val();
    var re = /^1[3|4|5|7|8]\d{9}$/;
    if (mobile.trim().length == 0) {
        comm.prompt.infoSmall("手机号不能为空", 2000);
        return false;
    } else {
        if (re.test(mobile)) {
            if (!open.attr("disabled")) {
                if (sms(mobile, type)) {
                    var count = num; // 数据的 10
                    var timer = null; // 定时器的名字
                    clearInterval(timer); // 先清除掉原来的定时器
                    open.attr("disabled", true);

                    timer = setInterval(sendTextMessage, 1000);
                    function sendTextMessage() {
                        count--;
                        if (count >= 0) {
                            open.html(+count + "秒");
                        } else {
                            open.html(load);
                            open.attr("disabled", false);
                            clearInterval(timer); // 清除定时器
                            count = 5;
                        }
                    }
                }
            }
        } else {
            comm.prompt.infoSmall("手机号码格式错误", 2000);
            return false;
        }
    }


}

//发送验证码	
function sms(mobile, type) {
    var flag = true;
    $.ajax({
        type: "POST",
        url: ctx + "/user/getValidate",
        data: {
            "mobile": mobile,
            "type": type
        },
        dataType: "json",
        async: false,
        success: function (data) {
            if (data.code && data.code == 0) {
                comm.prompt.infoSmall("发送成功", 2000);
                flag = true;
            } else {
                comm.prompt.infoSmall("发送失败", 2000);
                flag = false;
            }
        }
    });
    return flag;
}

//检查验证码
function checkCode() {
    var code = $("#verifcode").val();
    if (code.trim().length == 0) {
        comm.prompt.infoSmall("验证码不能为空", 2000);
        return false;
    }
    return true;
}

/**
 * 本地时间转换 例：2015-01-01 上午12:00:00
 * @author Zhang Zhixin
 * @param date 待转换时间
 * @param y_m_d 年月日 默认为空 不返回传1
 * @param h_m_s 时分秒 默认为空 不返回传1
 * @returns {String}
 */
comm.format = function (date, y_m_d, h_m_s) {
    var y = "";
    var mo = "";
    var d = "";
    var h = "";
    var mi = "";
    var a_p = "";
    if (typeof date == "string" && date.indexOf("-") != -1) {
        re = new RegExp('-', 'g');
        date = date.replace(re, "/");
    }
    if (new Date(date) != "Invalid Date" && (typeof date == "string" || typeof date == "object")) {
        if (typeof date == "string") {
            if (date.indexOf("-") != -1) {
                re = new RegExp('-', 'g');
                date = date.replace(re, "/");
            }
            var simDate = new Date(date);
            y = simDate.getFullYear();
            mo = simDate.getMonth() + 1;
            d = simDate.getDate();
            h = simDate.getHours();
            mi = simDate.getMinutes();
            a_p = (h >= 12 && mi > 0 ? "下午" : "上午");
        } else if (typeof date == "object") {
            y = date.getFullYear();
            mo = date.getMonth() + 1;
            d = date.getDate();
            h = date.getHours();
            mi = date.getMinutes();
            a_p = (h >= 12 && mi > 0 ? "下午" : "上午");
        }
    } else {
        console.info("格式错误");
        return "格式错误";
    }
    mo = (mo < 10 ? "0" : "") + mo;
    d = (d < 10 ? "0" : "") + d;
    h = (h < 10 ? "0" : "") + h;
    mi = (mi < 10 ? "0" : "") + mi;

    var result = "";
    if (!y_m_d) {
        result += y + "-" + mo + "-" + d;
    }
    if (!h_m_s && h != "00") {
        result += " " + a_p + h + ":" + mi;
    }
    return result;
}

/**
 * 替换 undefined 为指定符号
 * YunLei.Huo
 */
comm.replaceStr = function (str, flag) {
    if (str == undefined || str == "undefined") {
        return "";
    } else {
        return str;
    }
};

/**
 * 创建公共的容器
 * @returns {*|jQuery|HTMLElement}
 */
comm.createCommonWrapper = function (title, html, style) {
    style = style || '';
    var $html = $('<div style="'+style+' -webkit-overflow-scrolling: touch;-webkit-transform: translate3d(0,0,0); position: fixed; left: 0; top: 0; width: 100%; min-height: 100%; background: #F2F3F5;">\
						<header class="header">\
							<div class="head-return" onclick="history.go(-1)"></div>\
							<div class="title">\
								<h1>' + title + '</h1>\
							</div>\
						</header>\
						<div class="wrapper" style="margin-top: 1.173333rem;"></div> \
					</div>');
    var maxZIndex = 2147483647;
    $html.css('z-index', maxZIndex);
    $html.find('.wrapper').append(html);
    $html.appendTo('body');
    return $html;
};

/**
 * 显示正在加载...
 */
comm.startLoading = function () {
    if ($('#loading-div').length==0) {
        var html = '<div class="row" style="position: fixed" id="loading-div"><div class="span"><div class="help"></div></div></div>';
        $('body').append(html);
    }
};

/**
 * 停止正在加载...
 */
comm.stopLoading = function (nowStop) {
    if (nowStop) {
        $('#loading-div').remove();
    } else {
        setTimeout(function(){
            $('#loading-div').remove();
        }, 500);
    }
};
/**
 * 同步执行ajax
 * @param url 链接
 * @param param 参数
 * @returns {*} 字符串
 */
comm.ajaxSync = function (url, param, type) {
    var d;
    $.ajax({
        type: "post",
        url: url,
        data: $.param(param),
        async: false,
        timeout: 30000,
        success: function (data) {
            d = data;
        }
    });
    if (type && type.toUpperCase()=='JSON') {
        d = JSON.parse(d);
    }
    return d;
};

comm.ajaxGet = function(url, param, callback, type) {
    type = type || 'JSON';
    $.get(url, param, function(data){
        if (type.toUpperCase() == 'JSON') {
            if (typeof data === 'string') {
                data = JSON.parse(data);
            }
            if (data.code=='-2') {
                comm.prompt.infoSmall('请求错误！', 1000);
                comm.stopLoading();
            } else {
                callback(data);
            }
        } else {
            callback(data);
        }
    }, type);
};

comm.ajaxPost = function(url, param, callback, type) {
    type = type || 'JSON';
    $.ajax({
        type: "post",
        url: url,
        data: $.param(param),
        timeout: 30000,
        success: function (data) {
            if (type.toUpperCase() == 'JSON') {
                data = JSON.parse(data);
                if (data.code=='-2') {
                    comm.prompt.infoSmall('请求错误！', 1000);
                    comm.stopLoading();
                } else {
                    callback(data);
                }
            } else {
                callback(data);
            }
        }
    });
};



/**
 * 首页底部选中效果
 */
comm.getActive = function (id) {
    $(".ui-footer a").removeClass("active");
    var idStr = "#" + id;
    $(idStr).addClass("active");
};

/**
 * 窗口大小改变时，处理底部按钮遮挡部分输入框的错误
 */
comm.windowResizeBottomHandle = function () {
    var oHeight = $(document).height();
    $(window).resize(function(){
        if($(document).height() < oHeight){
            $('.btn-wrap-botfixed').css({'position':'static', 'margin-top':'0.24rem'});
        }else{
            $('.btn-wrap-botfixed').css({'position':'', 'margin-top':''});
        }
    });
};

comm.getCookie = function(c_name){
    if (document.cookie.length>0){//先查询cookie是否为空，为空就return ""
        c_start=document.cookie.indexOf(c_name + "=")//通过String对象的indexOf()来检查这个cookie是否存在，不存在就为 -1　　
        if (c_start!=-1){
            c_start=c_start + c_name.length+1//最后这个+1其实就是表示"="号啦，这样就获取到了cookie值的开始位置
            c_end=document.cookie.indexOf(";",c_start)//其实我刚看见indexOf()第二个参数的时候猛然有点晕，后来想起来表示指定的开始索引的位置...这句是为了得到值的结束位置。因为需要考虑是否是最后一项，所以通过";"号是否存在来判断
            if (c_end==-1) c_end=document.cookie.length
            return decodeURIComponent(document.cookie.substring(c_start,c_end))//通过substring()得到了值。想了解unescape()得先知道escape()是做什么的，都是很重要的基础，想了解的可以搜索下，在文章结尾处也会进行讲解cookie编码细节
        }
    }
    return ""
};

comm.setCookie = function(c_name, value, expiredays, path){
    var exdate=new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie=c_name+ "=" + encodeURIComponent(value) + ((expiredays==null) ? "" : ";expires="+exdate.toGMTString()) + (path?(";path="+path):'');
};

comm.delCookie = function(c_name, path){
    var exdate = new Date();
    exdate.setTime(exdate.getTime()-1);
    document.cookie=c_name+"=;expires="+exdate.toGMTString() + ';path='+path;
};

/**
 * 根据小数点分割金额
 * @param money
 * @returns {Array}
 */
comm.moneySplitByPoint = function(money) {
    return String(money).split('.');
};

