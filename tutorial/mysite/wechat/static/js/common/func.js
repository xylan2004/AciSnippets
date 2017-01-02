$(document).ready(function(){
  //首页轮播图
  var indexFocus = new Swiper('.focus', {
    pagination : '.swiper-pagination',
    autoplay : 3000,
    autoplayDisableOnInteraction: false,
    loop: true
  });
  //商品轮播图
  var productFocus = new Swiper('.product-info-img', {
    pagination : '.swiper-pagination',
    autoplay : 3000
  });
  //礼品卡滑动
  var giftCardSlide = new Swiper('.gift-card-container',{
    initialSlide : 2,
    effect : 'coverflow',
    grabCursor : true,
    centeredSlides : true,
    slidesPerView : 'auto',
    coverflow : {
      rotate : 50,
      stretch : 0,
      depth : 100,
      modifier : 1,
      slideShadows : true
    },
    onSlideChangeStart: function(swiper){
    	var id=$(".swiper-slide-active").attr("id");
    	var objKey="input[name='"+id+"']";
    	var str=$(objKey).val();
    	$(".giftcard-details").html(str);
       
    },	
    paginationClickable: true
  });
  var giftcardprice = new Swiper('.gift-card-price', {
    initialSlide : 2,
    spaceBetween : 0,
    centeredSlides : true,
    slidesPerView : 'auto',
    touchRatio : 0.2,
    onSlideChangeStart: function(swiper){
    	var id=$(".swiper-slide-active").attr("id");
    	var objKey="input[name='"+id+"']";
    	var str=$(objKey).val();
    	$(".giftcard-details").html(str);
       
    },
    slideToClickedSlide : true
  });
  giftcardprice.params.control = giftCardSlide;
  giftCardSlide.params.control = giftcardprice;
  //执行滚动
  setInterval('autoScroll(".headline-text")',5000);
  //产品推荐
  var sales = new Swiper('.sales', {
    slidesPerView : 'auto',
    paginationClickable : true,
    spaceBetween : 8
  });
  // 列表页类别选择
  $('.prolist-category').toggle(function() {
        $('.prolist-category-change').show();
        $('.prolist-category').addClass('active');
        $('body').append($masklayer);
      },function() {
        $('.prolist-category-change').hide();
        $('.prolist-category').removeClass('active');
        $('.ui-masklayer').remove();
      }
  );
  //产品弹出购买
  var $masklayer = '<div class="ui-masklayer"></div>';
  $('#product-selectnum,.product-buy-btn').on('click' , function() {
    $('body').append($masklayer);
    $('.product-buy').show();
    $('.header').css('z-index','5');
    $('.ui-footer').css('z-index','201');
    $('.product-buy-btn').html('确定');
  });
  //关闭按钮
  $('.product-buy-close').on('click',function() {
    $('.product-buy').hide();
    $('.header').css('z-index','');
    $('.ui-footer').css('z-index','');
    $('.ui-masklayer').remove();
    $('.product-buy-btn').html('加入购物车');
  });

    //敬请期待
    function stayTuned(element){
        var oDiv = '<div class="stay-tuned"><img src="/static/images/stay-tuned.png" alt=""/><div class="stay-tuned-close"></div></div>';
        $(element).on('click' , function() {
            $('body').append($masklayer);
            $('body').append(oDiv);
            $('.ui-masklayer').css('z-index','301');
        });
        //关闭按钮
        $('.stay-tuned-close').live('click' , function() {
            $('.stay-tuned').remove();
            $('.ui-masklayer').remove();
        });
    }
    //首页智能管家 敬请期待
    stayTuned('.smart-housekeeper');

  //分类、规格选择
  selectStyleAdd('.select-guige');
  selectStyleAdd('.select-service');
  selectStyleAdd('.select-package');
  selectStyleAdd('.quick-pro');
	//退换货条款
	$('.tk-click').on('click' , function(){
		$('.order-pop').show();
        $('body').append($masklayer);
		$('.header').css('z-index','5');
	});
	//关闭退换货条款
	$('.order-pop .close').on('click',function() {
    $('.order-pop').hide();
    $('.ui-masklayer').remove();
    $('.header').css('z-index','');
  });
  //消息展开
  $(document).on('click','.message-title',function(){
    $(this).parent().toggleClass('active');
  });
  //尊享定制
  var mysldt = $('.mysl-custom dt'),
      mysldd = $('.mysl-custom dd');
      mysldd.first().addClass('current').show();
  mysldt.click(function(){
  mysldt.removeClass('current');
  mysldd.stop().slideUp(300);
  $(this).addClass('current').next(mysldd).stop().slideDown(300);
});



})
    window.onload = function(){
        //订单滑动
        //var orderFirst = 0;
        TouchSlide({slideCell:"#order-tabbox",defaultIndex:getCode('state'),
            endFun:function(i){
                location.replace('#state=' + i);
            }
        });
        //收藏滑动
        TouchSlide({slideCell:"#favorites-tabbox",defaultIndex:getCode('state')-1,
            endFun:function(i){
                location.replace('#state=' + (i+1));
            }
        });
        //售后滑动
        TouchSlide({slideCell:"#aftersale-tabbox",defaultIndex:getCode('state'),
            endFun:function(i){
                location.replace('#state=' + i);
            }
        });
        /*//介绍页滑动
        TouchSlide({slideCell:"#intropage-tabbox",
        	endFun:function(i){ //高度自适应
                var bd = document.getElementById("intropage-tabbox-bd");
                bd.parentNode.style.height = bd.children[i].children[0].offsetHeight + "px";
                if(i > 0)bd.parentNode.style.transition = "200ms";//添加动画效果
            }
        });*/
    }
    //获取状态码
    function getCode(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.hash.substr(1).match(reg);
        if(r!=null)return unescape(r[2]); return null;
    }
  //load
  function loadHtml(url){
    var $container = $('<div id="load-container"></div>');
    $('body').append($container);
    $('#load-container').load(url);
  }
  //首页文字滚动
  function autoScroll(obj){
        $(obj).find("ul").animate({
          marginTop : "-1rem"
        },500,function(){
          $(this).css({marginTop : "0"}).find("li:first").appendTo(this);
        })
      }
  // 点击选择
  function selectStyleAdd(obj){
    $(obj).find('li').live('click',function() {
      $(obj).find('li').removeClass('active');
      $(this).addClass('active');
    });
  }
    //支付密码
    function payPassword(width){
        var payPassword = $("#payPassword_container"),
            _this = payPassword.find('i'),
            k=0,j=0,
            password = '' ,
            _cardwrap = $('#cardwrap');
        payPassword.on('focus',"input#payPassword_rsainput",function(){

            var _this = payPassword.find('i');
            if(payPassword.attr('data-busy') === '0'){
                _this.eq(k).addClass("active");
                _cardwrap.css('visibility','visible');
                payPassword.attr('data-busy','1');
            }

        });
        payPassword.on('change',"input#payPassword_rsainput",function(){
            _cardwrap.css('visibility','hidden');
            _this.eq(k).removeClass("active");
            payPassword.attr('data-busy','0');
        }).on('blur',"input#payPassword_rsainput",function(){

            _cardwrap.css('visibility','hidden');
            _this.eq(k).removeClass("active");
            payPassword.attr('data-busy','0');

        });

        payPassword.on('keyup',"input#payPassword_rsainput",function(e){

            var  e = (e) ? e : window.event;

            if(e.keyCode == 8 || (e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105)){
                k = this.value.length;
                l = _this.size();

                for(;l--;){

                    if(l === k){
                        _this.eq(l).addClass("active");
                        _this.eq(l).find('b').css('visibility','hidden');

                    }else{
                        _this.eq(l).removeClass("active");
                        _this.eq(l).find('b').css('visibility', l < k ? 'visible' : 'hidden');

                    }

                    if(k === 6){
                        j = 5;
                    }else{
                        j = k;
                    }
                    $('#cardwrap').css('left',j * width + 'rem');

                }
            }else{
                var _val = this.value;
                this.value = _val.replace(/\D/g,'');
            }
        });
    }

function menu(h,u){
  var h = document.getElementById(h);
  var u = document.getElementById(u);
  $(h).on('click' , function() {
    $(u).toggle();
    $(h).toggleClass('active');
  });
}
menu("list_content_privilege4","privilege_list4");
menu("pay_privilege_head","pay_head_menu");
function comment(starall){
  var wjx_sel = "★",
      wjx_none = "☆";
  $(starall).on('mouseenter',"li",function(){
    $(this)
        .text(wjx_sel)
        .prevAll()
        .text(wjx_sel)
        .end()
        .nextAll()
        .text(wjx_none);
  }).on('click',"li",function(){
    $(this)
        .addClass("checked")
        .siblings()
        .removeClass("checked")
  }).on('mouseleave',function(){
    $(starall+"li").text(wjx_none);
    $(".checked")
        .text(wjx_sel)
        .prevAll()
        .text(wjx_sel)
        .end()
        .nextAll()
        .text(wjx_none);
  });
}
$(function(){
  comment(".yuesao-comment-star");

})