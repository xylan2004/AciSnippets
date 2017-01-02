var ctx = $("#ctx").val();
var cart = {};
$(function(){
	cart.cartList();
	comm.getActive("foot_cart");
})
/**
 * 商品列表
 */
cart.cartList = function(){
	    var msg = {"msg":"请求成功","code":"0","data":{"selectNum":0,"categroy":[],"totalMoney":"0.00","deliver":"0.00","cartNum":0,"priceShow":"0.00","favorablePrice":"0.00","isSelectAll":true}};
		//显示空页面
		$("#failureGoods").empty();
		$("#cartIsNull").show();
		$("#cart_foot").hide();
		$("#cart_editor").hide();
		$(".ui-badge").hide();
		$("#failureTitle").hide();
		/**
		$.ajax({
			type: "post",
	  		url: ctx+"/cart/cartList",
			dataType : "json",
			data:{date:new Date().getTime()},
	  		success: function(msg){
	    		if(msg&&msg.code=="0"){
	    			if(msg.data.categroy.length>0){
	    				cart.dataNum = 0;
		    			var ohtml="";//失效商品0
		    			var phtml="";//普通商品1
		    			var categroy = msg.data.categroy;//价格
		    			var totalMoney = msg.data.totalMoney;//价格
		    			var deliver = msg.data.deliver;//价格
		    			$.each(categroy,function(){//循环商品类型
		    				if(this.productType==1){
			    				$.each(this.sorts,function(){//循环每个普通商品
			    					cart.dataNum++;
			    					phtml+=cart.initData(1,this);	
			    				});
		    				}
		    				if(this.productType==0){
			    				$.each(this.sorts,function(){//循环每个失效商品
			    					ohtml+=cart.initData(2,this);	
			    				});
		    				}
		    			});
		    			//商品列表
		    			if(phtml.length>0){
		    				$("#goodsItems").empty().append($("#cartTitle").html()).append(phtml);
		    				$(".allCheck").prop("checked", (msg.data.isSelectAll));//全选状态
		    			}
		    			//失效商品列表
		    			if(ohtml.length>0){
		    				ohtml+='<div class="ui-success-change-links bgwhite pb40"><a href="javascript:cart.showDialog()">清空失效</a></div>';
		    				$("#failureTitle").show();
		    				$("#failureGoods").empty().append(ohtml);
		    				//如果只有失效商品隐藏编辑按钮，和小计显示栏
		    				if(phtml.length<1){
		    				$("#cart_foot").hide();
			    			$("#cart_editor").hide();
		    				}
		    			}else{
		    				$("#failureGoods").empty();
		    				$("#failureTitle").hide();
		    			}
		    			//脚部购物车导航数量(只显示选中的商品数量)
		    			if(msg.data.selectNum>0){
		    				$(".ui-badge").show();
		    				$(".ui-badge").html("").html(msg.data.selectNum);
		    			}else{
		    				$(".ui-badge").hide();
		    			}
		    			//商品价格总计小数点前
		    			$("#f_b").html(totalMoney.substring(0,totalMoney.indexOf('.')));
		    			//商品价格总计小数点后
		    			$("#f_s").html(totalMoney.substring(totalMoney.indexOf('.'),totalMoney.length));
		    			//商品运费总计小数点前
		    			$("#y_b").html(deliver.substring(0,deliver.indexOf('.')));
		    			//商品运费总计小数点后
		    			$("#y_s").html(deliver.substring(deliver.indexOf('.'),deliver.length));
	    			}else{
	    				//显示空页面
	    				$("#failureGoods").empty();
	    				$("#cartIsNull").show();
	    				$("#cart_foot").hide();
	    				$("#cart_editor").hide();
	    				$(".ui-badge").hide();
	    				$("#failureTitle").hide();
	    			}
	    		}else{
	    			//显示错误页面
	    			$("#cartItems").hide();
	    			$("#cart_editor").hide();
	    			$("#requestFailed").show();
	    			$("#cart_foot").hide();
	    			$(".ui-badge").hide();
	    			$("#failureTitle").hide();
	    		}
	  		}
		});
        **/
}
/**
 * 数据列表初始化
 * @param type 1普通商品；2失效商品
 * @param data 
 */
cart.initData = function(type,data){
	var spec = "";
	if(data.spec.length>0){
		$.each(data.spec,function(){
			spec+=this.typeSpecValue+"  ";
		})
	}
	var html="";
	if(type==1){
		html+='<div class="ui-product-wrap">\
			    <ul>\
			        <li class="ui-pro-item ui-border-b">\
			            <div class="pro-select"><label class="ui-checkbox"><input type="checkbox" '+(data.isselect==2?checked="checked":"")+'  value="'+data.id+'"  onclick="checkStart(this.value,null,this.checked)" class="cartCheck" /></label></div>\
			            <div class="pro-img position-r" onclick="comm.redirectUrl(\''+ctx+'/product/loadById?productCode='+data.productCode+'\')">\
			                <img src="'+data.image+'" alt="图片加载失败...">\
			                '+(data.surpNum!=null&&data.surpNum==0?'<div class="repertory-insuf bgred">库存不足</div>':'')+'\
			            </div>\
			            <div class="pro-text" onclick="comm.redirectUrl(\''+ctx+'/product/loadById?productCode='+data.productCode+'\')">\
			                <h4>'+data.name+'</h4>\
			                '+(spec.length>0?'<h4>'+spec+'</h4>':'<h4>&nbsp;</h4>')+'\
			                    <div class="pro-price">\
			                    	'+(!data.memberPrice?"":'<div class="title orange">'+data.memberName+'</div>')+'\
			                        <span class="orange">&yen;'+(!data.memberPrice?data.price:data.memberPrice)+'</span>'+(!data.memberPrice?'':'<span class="original-price pl18 gray">&yen;'+data.price)+'</span>'+'\
			                    </div>\
			            </div>\
			            <div class="pro-num">\
				            <input class="btn-add" type="button" onclick="cart.numUpdate('+data.id+','+type+','+(data.amount+1)+')" />\
				            <input class="input-text ta-c" type="text" value="'+data.amount+'" onchange="cart.numUpdate('+data.id+','+type+',this.value)" />\
				            '+(data.amount==1?'<input class="btn-subtraction" type="button" />':'<input class="btn-subtraction" type="button" onclick="cart.numUpdate('+data.id+','+type+','+(data.amount-1)+')" />')+'\
			            </div>\
			        </li>\
			    </ul>\
			</div>'	
	}else if(type==2){
		html+='<div class="ui-product-wrap">\
		        <ul>\
		            <li class="ui-pro-item ui-border-b product-gray" onclick="comm.redirectUrl(\''+ctx+'/product/loadById?productCode='+data.productCode+'\')">\
		                <div class="pro-img position-r" onclick="comm.redirectUrl(\''+ctx+'/product/loadById?productCode='+data.productCode+'\')">\
							<input type="hidden" value="'+data.id+'" class="oldGoods" / >\
		                    <img src="'+data.image+'" alt="图片加载失败...">\
		                    <div class="repertory-insuf bggray">'+data.unvalidReason+'</div>\
		                </div>\
		                <div class="pro-text" onclick="comm.redirectUrl(\''+ctx+'/product/loadById?productCode='+data.productCode+'\')">\
		                    <h4>'+data.name+'</h4>\
		                    '+(spec.length>0?'<h4>'+spec+'</h4>':'<h4>&nbsp;</h4>')+'\
		                        <div class="pro-price">\
		                        '+(!data.memberPrice?"":'<div class="title orange">'+data.memberName+'</div>')+'\
		                    		<span class="orange">&yen;'+(!data.memberPrice?data.price:data.memberPrice)+'</span>\
		                    		'+(!data.memberPrice?'':'<span class="original-price pl18 gray">&yen;'+data.price)+'</span>\
		                        </div>\
		                </div>\
		                <div class="pro-num">\
	                        <input class="btn-add" type="button" name="" value="">\
	                        <input class="input-text ta-c" type="text" id="" name="" value="'+data.amount+'">\
	                        <input class="btn-subtraction" type="button" name="" value="">\
                    	</div>\
		            </li>\
		        </ul>\
		    </div>'
	}
	return html;
}

/**
 * 商品选择状态修改（数据库字段：isselect；1未选中，2选中）
 * @param id
 * @param checkType 选择类型，1全选，2单选
 * @param ischeck 是否选中
 */
function checkStart(id,checkType,ischeck){
	$.ajax({
		type: "post",
  		url: ctx+"/cart/cartCheckStart",
		data: {id:(!id?"":id),productType:(checkType==null?"":checkType),isselect:(ischeck==true?2:1)},
		dataType : "json",
  		success: function(msg){
  			if(!msg||msg.code!=0){return;}
  			cart.cartList();
  		}
	});
}

/**
 * 商品数量修改
 * @param id 购物车主键id
 * @param type 购物车商品类型
 * @param amount 商品数量
 */
cart.numUpdate = function (id,type,amount){
		$.ajax({
			type: "post",
	  		url: ctx+"/cart/cartNumUpdate",
			data: {id:id,productType:type,amount:amount},
			dataType : "json",
	  		success: function(msg){
	  			if(!msg||msg.code!=0){comm.prompt.infoSmall("程序异常,请刷新页面重新操作！", 1000);return;}
	  			cart.cartList();
	  		}
		});
}

/**
 * 购物车清空失效
 */
cart.cartDelInfo = function (){
	var id=[];
	var oldGoods = $("#failureGoods").find(".oldGoods");
	$.each(oldGoods,function(){
		id.push(this.value);
	})	
	$.ajax({
		type: "post",
  		url: ctx+"/cart/cartDelInfo",
		data: {parms:JSON.stringify(id)},
		dataType : "json", 
		cache:false,
  		success: function(msg){
  			if(!msg||msg.code!=0){comm.prompt.infoSmall("程序异常,请刷新页面重新操作！", 1000);return;}
  			cart.cartList();
  		},error:function(e){
  			console.info(e);
  		}
	});
}
/**
 * 提示弹出框
 */
cart.showDialog = function(){
	comm.prompt.showDialog("确认移除购物车吗？", "<span style=\"display:block;text-align:center;\">移除购物车不可恢复</span>", cart.cartDelInfo)
//	$.dialog({
//		type : 'confirm',
//		titleText : '<span class=orange>确定删除订单？</span>',
//		contentHtml : '取消订单不可恢复',
//		onClickOk:function(){//点击确定后执行
//			cart.cartDelInfo();
//		}
//	});
}
/**
 * 提示弹出框
 */
cart.showEditor = function(){
	if(cart.dataNum){
		window.location.href=ctx+"/jsp/cart/cart_editor.jsp";
	}else{
		comm.prompt.infoSmall("购物车是空的呦", 1000);return;
	}
}

/**
 * 进入确认订单页
 */
cart.showSett = function(){
	var check = $(".cartCheck:checked");
	if(check.length==0){
		comm.prompt.infoSmall("您还没有选择商品哦！", 1000);return;
	}
	window.location.href=ctx+"/jsp/cart/sure_order.jsp";
}
