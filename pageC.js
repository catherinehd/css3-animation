
function pageC (argument) {
    
    this.$window = $('.page-c .window');
    this.$leftWin = this.$window.find('.window-left');
    this.$rightWin = this.$window.find('.window-right');
    this.$sceneBg = this.$window.find('.window-scene-bg');
    this.$closeBg = this.$window.find('.window-close-bg');

    //背景切换
    this.$sceneBg.transition({
    	opacity:0,
    },3000);
    this.$closeBg.css('transform','translateZ(0)');
    this.$closeBg.transition({
    	opacity:1
    },5000);

    //关窗
    this.closeWindow();
}


/**
 *  关窗
 */
 pageC.prototype.closeWindow = function(){
 	var bind = function(ele){
 		ele.addClass('close');
 	}
 	bind(this.$leftWin);
 	bind(this.$rightWin);
 }