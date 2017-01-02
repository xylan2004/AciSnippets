

var $masklayer = '<div class="ui-masklayer"></div>';
/**
 * 点击三级分类项跳转相应链接
 */
function goProduct(items){
	if(items.jumpType == 10){
		 var oDiv = '<div class="stay-tuned"><img src="../images/stay-tuned.png" alt=""/><div class="stay-tuned-close"></div></div>';
            $('body').append($masklayer);
            $('body').append(oDiv);
            $('.ui-masklayer').css('z-index','301');
	        //关闭按钮
	        $('.stay-tuned-close').live('click' , function() {
	            $('.stay-tuned').remove();
	            $('.ui-masklayer').remove();
	        });
	}else{
		var detail = comm.class3Redirect(JSON.stringify(items));
		if(detail.code==1){
			window.location.href=detail.URL;
		}else{
			comm.prompt.infoSmall(detail.msg, 1000);
		}
	}
	
}

function getClick(){
	//链接跳转分类页面携带分类码（分类定位）
	var categoryCode=$("#categoryCode").val();
	//从三级分类详情页返回上一级所存储的分类码（分类定位，用完就删）
	var ss=window.sessionStorage.getItem("category_position");
	window.sessionStorage.removeItem("category_position");
	if(categoryCode||ss){
		var val="#secondCode_"+(categoryCode?categoryCode:ss);
		$(val).click();

		var $wrapper = $('ul.service-nav');
		var $curr = $(val);
		var index = $curr.index();
		var h = (index+1)*50-$wrapper.height();
		$wrapper.scrollTop(h);
	}else{
		$(".service-nav li").eq(0).click();
	}
}
