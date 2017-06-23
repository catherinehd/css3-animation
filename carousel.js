//格式化字符串
var slice = Array.prototype.slice;

function toArray(a,i,j){
	return slice.call(a, i || 0, j || a.length);
}

/**
 *  返回true,如果传递的值不少未定义。
 */

 function isDefined(v){
 	return typeof v !=='undefined';
 }

 /**
  *  拷贝对象，跳过已存在的
  */
  function applyIf(o,c){
  	if(o){
  		for (var p in c) {
  			//跳过已存在
  			if (!isDefined(o[p])){
  				o[p] = c[p];
  			}
  		}
  	}
  	return o;
  }

  /**
   * 格式化字符串
   */
   applyIf(String,{
   	format:function(format){
   		var args = toArray(arguments,1);
   		return format.replace(/\{(\d+)\}/g,function(m,i){
   			return args[i];
   		});
   	}
   });


/**
 *  3d旋转木马
 */
 function Carousel(carousel,options){
 	//图片
 	var imgUrls = options.imgUrls;
 	//场景元素
 	var $carousel = carousel;
 	//容器元素
 	var $spinner = carousel.find('#spinner');
 	var angle = 0;
 	//图片数
 	var numpics = imgUrls.length;
 	//角度
 	var rotate = 360/numpics;
 	var start = 0;
 	var current = 1;
 	//子元素
 	var $contentElements;

 	//图片数量
 	this.numpics = numpics;

 	/**
 	 *  创建结构
 	 */
 	 function createStr(imgUrl) {
 	 	var str = '<figure style="transform:rotateY({0}deg) translateZ({1}) scaleY(.9);position:absolute;">'+
        '<img src="{2}" style="width:100%;height:100%;">'
 	 	+'</figure>';

 	   return String.format(str,
 	   	  start,
 	   	  '2.5rem',
 	   	  imgUrl
  
 	   	)
 	 }

 	 /**
 	  * 初始化样式
 	  */
 	  function initStyle(){
 	  	//场景元素
 	  	$carousel.css({
 	  		'-webkit-perspective':'500',
 	  		'-moz-perspective':'500px',
 	  		'position':'absolute',
 	  		'left':'6.8rem',
 	  		'top':'4.5rem'
 	  	})
 	  	//容器
 	  	$spinner.css ({
 	  		'width' :'4rem',
 	  		'transform-style':'preserve-3d'
 	  	})
 	  }

 	  /**
 	   *  绘制页面节点
 	   */

 	   function render (){
 	   	//创建内容
 	   	var contentStr = '';
 	   	$.each(imgUrls,function(index,url){
 	   		contentStr += createStr(url);
 	   		start = start + rotate;
 	   	})
 	   	$contentElements = $(contentStr);
 	   	$spinner.append($contentElements)
 	   }

 	   //样式
 	   initStyle();
 	   //绘制节点
 	   render();

 	   //旋转次数，游标，当前页码
 	   var currIndex;

 	   /**
 	    *  运行旋转
 	    */
 	    this.run = function (count,callback){
 	    	currIndex = count;
 	    	angle = (count - 1) * rotate +360;
 	    	$spinner
 	    	    .css({
 	    	    	'transform':'rotateY(-'+angle+'deg)',
 	    	    	"transition":'1s'
 	    	    })
 	    	    .css({
 	    	    	'-moz-transform':'rotateY(-'+angle+'deg)',
 	    	    	'-moz-transition':'1s'
 	    	    })
 	    	    .one('transitionend webkitTransitionEnd',function(){
 	    	    	//去掉transition保留在样式上
 	    	    	$spinner.css('transition',"")
 	    	    	$spinner.css('-moz-transition','');

 	    	    })
 	    }
/**
 *  视频播放
 */
 this.playVideo = function (){
 	//索引从0开始
 	var index =currIndex;
 	var element = element || $contentElements.eq(index);

 	/**
 	 *  video标签
 	 */
 	 var $video = $('<video preload="auto" class="bounceIn" style="width:50%;height:50%;position:absolute;left:30%;top:35%;"></video>');
 	 $video.css({
 	 	'position':'absolute',
 	 	'z-index':'999'
 	 })

 	 //地址
 	 $video.attr('src',options.videoUrls[index]);

 	 //播放
 	 $video.on('loadeddata',function(){
 	 	$video[0].play()
 	 })

 	 //停止
 	 $video.on('ended',function(){
 	 	$video[0].pause();
 	 	//退出效果
 	 	$video.addClass('bounceOut').one('animationend webkitAnimationEnd',function(){
 	 		$video.remove();
 	 	})
 	 })
 	 $carousel.after($video)
 }






 }   















