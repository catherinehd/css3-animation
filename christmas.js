/** 切换页面
 *  模拟镜头效果
 */
 function changePage(element,effect,callback){
 	element
 	    .addClass(effect)
 	    .one('animationend webkitAnimationEnd',function(){
 	    	callback && callback();
 	    })//one为执行一次，animationend为动画结束后执行，callback &&callback()写法等同于if(callback){callback()};
 }

/**
 *  背景音乐
 */
 function HTML5Audio(url,loop){
 	var audio = new Audio(url);
 	audio.autoplay = true;
 	audio.loop = loop || false;
 	audio.play();
 	return {
 		end:function(callback){
 			audio.addEventListener('ended',function(){
 				callback()
 			},false);
 		}
 	}
 }

 /**
  *  中间调用
  */
  var Christmas = function(){
  	//页面容器元素
  	var $pageA = $('.page-a');
  	var $pageB = $('.page-b');
  	var $pageC = $('.page-c');

  	//观察者
  	var observer = new Observer();

  	//A场景页面
  	new pageA($pageA,function(){
  		observer.publish('completeA');
  	})
  	//进入B场景
  	observer.subscribe('pageB',function(){
  		new pageB($pageB,function(){
  			observer.publish('completeB');
  		})
  	})
  	//进入C场景
  	observer.subscribe('pageC',function(){
  		new pageC($pageC)
  	})

  	//页面A-B场景切换
  	observer.subscribe('completeA',function(){
  		changePage($pageA,'effect-out',function(){
  			observer.publish('pageB');
  		})
  	})
  	//页面B-C场景切换
  	observer.subscribe('completeB',function(){
  		changePage($pageC,'effect-in',function(){
  			observer.publish('pageC')
  		})
  	})
  };


  $(function(){
  	//圣诞主题效果，开始
  	Christmas();
  	HTML5Audio('music/circulation.mp3',true)
  	




  })