$(document).ready(function(){
//	getInfo();
//	getCityInfo();
	$(".location-curr").click(function(){
		 //window.location.href=path+"/city/info";
		 void(0);
	});
 });


function getInfo(){
	var city=$("#city").val();
	var now = new Date();
    var year = now.getFullYear();       //年
    var month = now.getMonth() + 1;     //月
    if(month < 10)
    	month = "0"+month;
    var day = now.getDate();            //日
	var url="/json/"+city+year+month+day+"homePage.json";
//	existence(url,"/initPage",initPage,function(){alert("失败了!");});
	
}

function hy(){
	 window.location.href=path+"";
}
	
//
////广告位轮播图
//function adver(data){
//	var ggArray=data.content;
//	var objgg="";
//	var open="<div class='focus'><div class='swiper-wrapper'>";
//	var end="</div><div class='swiper-pagination'></div></div>";
//	
//	var focus=$("<div class='focus'></div>");
//	var swiper=$("<div class='swiper-wrapper'></div>");
//	var pagination=$("<div class='swiper-pagination'></div>");
//	
//	for(var i=0;i<ggArray.length;i++){
//		var thisDate=ggArray[i];
//		swiper.append("<div class=\"swiper-slide\"><a href=\"###\"><img src=\""+thisDate.image+"\" alt=\""+thisDate.title+"\"></a></div>");
//	}
//	focus.append(swiper);
//	focus.append(pagination);
//	$("#swiper-wrapper_1").append(focus);
//	
//}
////广告位下边的选项	
//function item(data){
//	 var dhDiv="<nav class=\"nav-wrap\" id=\"nav-wrap_2\"></nav>";
//	 $(".ui-container").append(dhDiv);
//	 var dhArray=data.content;
//		var objdh="";
//		for(var i=0;i<dhArray.length;i++){
//			var thisDate=dhArray[i];
//			objdh+="<a href=\"http://"+thisDate.jump.url+"\"><i class=\"icon-nav-member\" style=\"background: url("+thisDate.image+") center/0.853333rem no-repeat;\"></i><div class=\"nav-text\">"+thisDate.title+"</div></a>";
//		}
//		$("#nav-wrap_2").append(objdh);
//}
////管家帮头条
//function roll(data){
//	var ttDiv="<div id=\"headlines\"><div class=\"headline-text\"><ul id=\"headlines_ul_3\"></ul></div></div>";
//	 $(".ui-container").append(ttDiv);
//	 var ttArray=data.content;
//		var objtt="";
//		for(var i=0;i<ttArray.length;i++){
//			var thisDate=ttArray[i];
//			objtt+="<li><a href=\"http://"+thisDate.jump.url+"\">"+thisDate.title+"</a></li>";
//		}
//		$("#headlines_ul_3").append(objtt);
//}
////每周一约样式
//function bigpic(data){
	
//	var tjDiv="<div class=\"sales-wrap\"><div class=\"sales\"><div class=\"swiper-wrapper\" id=\"swiper-wrapper_4\"></div></div></div>";
//	$(".ui-container").append(tjDiv);
//	var tjArray=data.content;
//	var objtj="";
//	for(var i=0;i<tjArray.length;i++){
//		var thisDate=tjArray[i];
//		objtj+= "<div class=\"items swiper-slide\"><a href=\""+thisDate.jump.url+"\"><img src=\""+thisDate.image+"\" alt=\""+thisDate.jump.title+"\"></a></div>";
//	}
//	$("#swiper-wrapper_4").append(objtj);
//	$(".ui-container").append("<div class=\"spread-line\"></div>");
	 
//}
//促销样式 
//function scroll(data){
//	var tjDiv="<div class=\"sales-wrap\"><div class=\"sales\"><div class=\"swiper-wrapper\" id=\"swiper-wrapper_4\"></div></div></div>";
//	$(".ui-container").append(tjDiv);
//	var tjArray=data.content;
//	var objtj="";
//	for(var i=0;i<tjArray.length;i++){
//		var thisDate=tjArray[i];
//		objtj+= "<div class=\"items swiper-slide\"><a href=\""+thisDate.jump.url+"\"><img src=\""+thisDate.image+"\" alt=\""+thisDate.jump.title+"\"></a></div>";
//	}
//	$("#swiper-wrapper_4").append(objtj);
//	$(".ui-container").append("<div class=\"spread-line\"></div>");
//	
////	   var dzDiv="<div id=\"solution\">";
////	   dzDiv+="<div class=\"left smart-housekeeper\" ><a href=\"###\"><h4>智能管家</h4><p>健康生活</p><img src=\"images/zhinengguanjia.png\" alt=\"\"></div>"; 
////	   dzDiv+="<div class=\"right\">";
////	   dzDiv+="<div class=\"r-top rec-housekeeper\" onclick='gjtuijian()'><h4>管家推荐</h4><p>想你所想</p><img src=\"images/floor-item-img.jpg\" alt=\"\"></a></div>";
////	   dzDiv+=" <div class=\"r-bottom custom-housekeeper\" onclick='zxdingzhi()'><a href=\"###\"><h4>尊享定制</h4><p>个性定制&nbsp;细微服务</p><img src=\"images/floor-item-img.jpg\" alt=\"\"></a></div>";
////	   dzDiv+="</div>";
////	   dzDiv+="</div>";
////		$(".ui-container").append(dzDiv);
////		$(".ui-container").append("<div class=\"spread-line\"></div>");
//}
////解决方案/-单排单行样式
//function solution(data){
//	
//	
//   var dzDiv="<div id=\"solution\">";
//   dzDiv+="<div class=\"left smart-housekeeper\" ><a href=\"###\"><h4>智能管家</h4><p>健康生活</p><img src=\"images/zhinengguanjia.png\" alt=\"\"></div>"; 
//   dzDiv+="<div class=\"right\">";
//   dzDiv+="<div class=\"r-top rec-housekeeper\" onclick='gjtuijian()'><h4>管家推荐</h4><p>想你所想</p><img src=\"images/floor-item-img.jpg\" alt=\"\"></a></div>";
//   dzDiv+=" <div class=\"r-bottom custom-housekeeper\" onclick='zxdingzhi()'><a href=\"###\"><h4>尊享定制</h4><p>个性定制&nbsp;细微服务</p><img src=\"images/floor-item-img.jpg\" alt=\"\"></a></div>";
//   dzDiv+="</div>";
//   dzDiv+="</div>";
//	$(".ui-container").append(dzDiv);
//	$(".ui-container").append("<div class=\"spread-line\"></div>");
//	
////	var stDiv=" <div class=\"floor\">";
////	if(data.showTitle!=0){
////		stDiv+=" <div class=\"floor-title\"><img src=\""+data.image+"\" alt=\"\"><h2>"+data.title+"</h2><a href=\"###\" class=\"more\">查看全部</a></a></div>";
////	}
////	stDiv+="<div class=\"col-3\">";
////	var tjArray=data.content;
////	for(var i=0;i<tjArray.length;i++){
////		var thisDate=tjArray[i];
////		stDiv+=" <div class=\"col-3-items\"><a href=\""+thisDate.url+"\"><h4>"+thisDate.title+"</h4><p>"+thisDate.message+"</p><img src=\""+thisDate.image+"\" alt=\"\"></a></div>";
////	}
////	stDiv+="</div>";
////    stDiv+="</div>";
////    $(".ui-container").append(stDiv);
////	$(".ui-container").append("<div class=\"spread-line\"></div>");
//}
////家政服务/-双排多行样式
//function House(data){
//	 var hsDiv="<div class=\"floor\">";
//	 if(data.showTitle!=0){
//		 hsDiv+=" <div class=\"floor-title\"><img src=\""+data.image+"\" alt=\"\"><h2>"+data.title+"</h2><a href=\"###\" class=\"more\">查看全部</a></a></div>";
//	}
//	 hsDiv+=" <div class=\"col-2\">";
//	 var tjArray=data.content;
//		for(var i=0;i<tjArray.length;i++){
//			var thisDate=tjArray[i];
//			hsDiv+=" <div class=\"col-2-items\"><a href=\""+thisDate.url+"\"><h4>"+thisDate.title+"</h4><p>"+thisDate.message+"</p><img src=\""+thisDate.image+"\" alt=\"\"></a></div>";
//		}
//	
//	 hsDiv+=" </div>";
//	 hsDiv+=" </div>";
//	 $(".ui-container").append(hsDiv);
//	 $(".ui-container").append("<div class=\"spread-line\"></div>");
//}

function gjtuijian(){
	window.location.href=path+"/solutaion/list";
}
function zxdingzhi(){
	window.location.href=path+"/solutaion/customize";
}

/**
var swiper = new Swiper('.swiper-container-test', {
    pagination : '.swiper-pagination-test',
    autoplay : 3000,
    autoplayDisableOnInteraction: false,
});
**/