var fastOrderIntr = {};
$(function(){
	fastOrderIntr.personImgInfo();
	fastOrderIntr.personPriceInfo();
	//预加载滑动控制（防止页面闪动）
	TouchSlide({slideCell:"#intropage-tabbox"});
});
/**
 * 初始化图片介绍页
 */
fastOrderIntr.personImgInfo = function(){
	var msg = {"msg":"请求成功","code":"0","data":"<div><div>\n\t<div>\n\t\t<div>\n\t\t\t<img src=\"/static/images/pc_general_desc_0.jpg\" alt=\"\" /><img src=\"/static/images/pc_general_desc_3.png\" alt=\"\" /><img src=\"/static/images/pc_general_desc_4.jpg\" alt=\"\" /><img src=\"/static/images/pc_general_desc_6.jpg\" alt=\"\" /><br />\n\t\t<\/div>\n\t<\/div>\n<\/div><\/div>"};
	$("#imgItems").empty().append(msg.data);
	fastOrderIntr.slideControl();

	/**
	$.ajax({
		type : "post",
		url : path+"/proOrder/personnelImgInfo",
		data : {"categoryCode":categoryCode,
			"cityCode":cityCode,
			"productcode":productcode
			},
        dataType : "json",
		success : function(msg) {
			if(!msg.code||msg.code!=0){comm.prompt.infoSmall("数据异常",1000);return;};
			$("#imgItems").empty().append(msg.data);
			fastOrderIntr.slideControl();
		}
	});
    **/
}
/**
 * 初始化价格介绍页
 */
fastOrderIntr.personPriceInfo = function(){
	var msg = {"msg":"请求成功","code":"0","data":{"price":[{"unit":"人次","productName":"PC/笔记本系统维修","priceList":[{"remark":"50.00","value":"40.00"}]}],"isTwo":false}};
	var p1Html = '<table class="intro-table mb32"><tr><th width="50%">&nbsp;</th><th width="25%">市场价</th><th width="25%">会员价</th></tr>';
	var p2Html = '<table class="intro-table mb32"><th width="30%">&nbsp;</th><th width="20%">&nbsp;</th><th width="25%">市场价</th><th width="25%">会员价</th>'
	var html = "";
	//判断数据的价格是否是两条
	if(!msg.data.isTwo){
		$.each(msg.data.price,function(){
			p1Html +='<tr>\
						<td>'+this.productName+'</td>\
						<td>'+(parseFloat(this.priceList[0].remark))+'元'+(!this.unit?'':('/'+this.unit))+'</td>\
						<td>'+(parseFloat(this.priceList[0].value))+'元'+(!this.unit?'':('/'+this.unit))+'</td>\
					  </tr>'
		});
		html=p1Html+"</table>";
	}else{
		$.each(msg.data.price,function(i,v){
			$.each(v.priceList,function(i_i){
				if(i_i==0){
					p2Html +='<tr>\
						<td rowspan="2">'+v.productName+'</td>\
						<td>劳务费</td>\
						<td>'+(this.remark?(parseFloat(this.remark))+'元'+(!v.unit?'':('/'+v.unit)):'暂无')+'</td>\
						<td>'+(this.value?(parseFloat(this.value))+'元'+(!v.unit?'':('/'+v.unit)):'暂无')+'</td>\
					  </tr>'
				}else{
					p2Html +='<tr>\
						<td>服务费</td>\
						<td>'+(this.remark?(parseFloat(this.remark))+'元'+(!v.laborUnit?'':('/'+v.laborUnit)):'暂无')+'</td>\
						<td>'+(this.value?(parseFloat(this.value))+'元'+(!v.laborUnit?'':('/'+v.laborUnit)):'暂无')+'</td>\
					  </tr>'
				}
			});
		});
		html=p2Html+"</table>";
	}
	$("#priceItems").empty().append(html);

	/**
	$.ajax({
		type : "post",
		url : path+"/proOrder/personnelPriceInfo",
		data : {"categoryCode":categoryCode,
			"cityCode":cityCode,
			"productcode":productcode
			},
        dataType : "json",
		success : function(msg){
			if(!msg.code||msg.code!=0){comm.prompt.infoSmall("数据异常",1000);return;}
			var p1Html = '<table class="intro-table mb32"><tr><th width="50%">&nbsp;</th><th width="25%">市场价</th><th width="25%">会员价</th></tr>';
			var p2Html = '<table class="intro-table mb32"><th width="30%">&nbsp;</th><th width="20%">&nbsp;</th><th width="25%">市场价</th><th width="25%">会员价</th>'
			var html = "";
			//判断数据的价格是否是两条
			if(!msg.data.isTwo){
				$.each(msg.data.price,function(){
					p1Html +='<tr>\
								<td>'+this.productName+'</td>\
								<td>'+(parseFloat(this.priceList[0].remark))+'元'+(!this.unit?'':('/'+this.unit))+'</td>\
								<td>'+(parseFloat(this.priceList[0].value))+'元'+(!this.unit?'':('/'+this.unit))+'</td>\
							  </tr>'
				});
				html=p1Html+"</table>";
			}else{
				$.each(msg.data.price,function(i,v){
					$.each(v.priceList,function(i_i){
						if(i_i==0){
							p2Html +='<tr>\
								<td rowspan="2">'+v.productName+'</td>\
								<td>劳务费</td>\
								<td>'+(this.remark?(parseFloat(this.remark))+'元'+(!v.unit?'':('/'+v.unit)):'暂无')+'</td>\
								<td>'+(this.value?(parseFloat(this.value))+'元'+(!v.unit?'':('/'+v.unit)):'暂无')+'</td>\
							  </tr>'
						}else{
							p2Html +='<tr>\
								<td>服务费</td>\
								<td>'+(this.remark?(parseFloat(this.remark))+'元'+(!v.laborUnit?'':('/'+v.laborUnit)):'暂无')+'</td>\
								<td>'+(this.value?(parseFloat(this.value))+'元'+(!v.laborUnit?'':('/'+v.laborUnit)):'暂无')+'</td>\
							  </tr>'
						}
					});
				});
				html=p2Html+"</table>";
			}
			$("#priceItems").empty().append(html);
		}
	});
    **/
}

/**
 * 点击返回上一级，保存当前分类code,用来在分类页定位
 */
fastOrderIntr.callBack = function(){
	//退出之前保存分类码（分类页面定位使用）
	window.sessionStorage.setItem("category_position", categoryCode);
	window.history.go(-1);
}
/**
 * 滑动控制
 */
fastOrderIntr.slideControl = function(){
	var num = 0;
	//等待所有图片加载完成以后调用滑动控制
	$("img").load(function(){
		num++;
		if($("img").length==num){
			 //介绍页滑动
			 TouchSlide({slideCell:"#intropage-tabbox",
				  startFun:function(i){ //高度自适应
		              var bd = document.getElementById("intropage-tabbox-bd");
		              bd.parentNode.style.height = bd.children[i].children[0].offsetHeight + "px";
		              if(i > 0)bd.parentNode.style.transition = "200ms";//添加动画效果
		          }
			  });
		}
	});
}


/**
 * 预约按钮点击跳转
 */
$("#clickFastButton").click(function(){
//	sessionStorage.setItem("categoryCode", categoryCode);
	// lxk window.location.href=path+"/proOrder/init?categoryCode="+categoryCode;
})
