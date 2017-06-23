
function pageB (ele,callback) {
       
     //*****************  男孩  ****************//
     /******************************************/
      //男孩
      var $boy = ele.find('.christmas-boy');

      var animationEnd = "animationend webkitAnimationEnd";

      /**
       *  男孩动作
       */
       var boyAction = {
       	//走路
       	walk:function(){
       		var dfd = $.Deferred();
       		$boy.transition({
       			'right':'4.5rem'
       		},4000,'linear',function(){
       			dfd.resolve()
       		});
       		return dfd;
       	},
       	//停止走路
       	stopWalk:function(){
       		$boy.removeClass('boy-walk');
       		$boy.addClass('boy-stand');
       	},
       	//继续走路
       	runWalk:function(){
       		$boy.addClass('walk-run');
       	},
       	//解开包裹
       	unwrapp:function(){
       		var dfd = $.Deferred();
       		$boy.addClass('boy-unwrapp');
       		$boy.removeClass('boy-stand');
       		$boy.one(animationEnd,function(){
       			dfd.resolve();
       		})
       		return dfd;
       	},
       	//脱衣动作
       	//1-3
       	strip:function(count){
       		$boy.addClass('boy-strip-'+count).removeClass('boy-unwrapp');
       	},
       	//任务拥抱
       	//重叠问题处理
       	hug:function(){
       		$boy.addClass('boy-hug').one(animationEnd,function(){
       			$('.christmas-boy-head').show()
       		})
       	}
       }


       //开始走路
       boyAction.walk()
         .then(function(){
         	//停止走路
         	boyAction.stopWalk();
         })
         .then(function(){
         	//解开包裹
         	return boyAction.unwrapp();
         })
         .then(function(){
         	//脱衣动作
         	setTimeout(function(){
         		boyAction.strip(1)
         	},1000)
         	setTimeout(function(){
         		boyAction.strip(2)
         	},2000)
         	setTimeout(function(){
         		boyAction.strip(3)
         	},3000)
         	//任务重叠问题
         	setTimeout(function(){
         		boyAction.hug();
         	},4000)
         })

       //********************** 女孩 **********************//
       /**************************************************/
         /**
          *  女孩
          */
          var $girl = ele.find('.girl');

          /**
           * 那还动作
           */
           var girlAction = {
           	//起立
           	standup:function(){
           		var dfd = $.Deferred();
           		setTimeout(function(){
           			$girl.addClass('girl-standUp');
           		},200)
           		setTimeout(function(){
           			$girl.addClass('girl-throwBook');
           			dfd.resolve()
           		},500)
           		return dfd;
           	},
           	//走路
           	walk:function(callback){
           		var dfd = $.Deferred();
           		$girl.addClass('girl-walk');
           		$girl.transition({
           			'left':'4.5rem'
           		},4000,'linear',function(){
           			dfd.resolve()
           		})
           		return dfd;
           	},
           	//停止走路
           	stopWalk:function(){
           		$girl.addClass('walk-stop')
           		     .removeClass('girl-standUp')
           		     .removeClass('girl-walk')
           		     .removeClass('girl-throwBook')
           		     .addClass('girl-stand')
           	},
           	//选择3d
           	choose:function(callback){
           		$girl.addClass('girl-choose')
           		     .removeClass('walk-stop');
           		$girl.one(animationEnd,function(){
           			callback();
           		})

           	},
           	weepWalk:function(callback){
           		$girl.addClass('girl-weep');
           		$girl.transition({
           			'left':'7rem'
           		},1000,'linear',function(){
           			$girl.addClass('walk-stop').removeClass('girl-weep');
           			callback();
           		})
           	},
           	//拥抱
           	hug:function(){
           		$girl.addClass('girl-hug').addClass('walk-run')
           	}

           }

           girlAction
                 .standup()
                 .then(function(){
                 	//停止走路
                 	return girlAction.stopWalk();
                 })
                 .then(function(){
                 	//走路
                 	return girlAction.walk();
                 })
                 .then(function(){
                 	//选择
                 	girlAction.choose(function(){
                 		//继续走路
                 		girlAction.weepWalk(function(){
                 			//拥抱
                 			girlAction.hug();
                 		})
                 	})
                 })

     //********************** 3d旋转 **********************//
       /**************************************************/
    //3d旋转节点
    var $carousel = ele.find('#carousel');

    //旋转木马对象
    var carousel = new Carousel($carousel,{
    	imgUrls: [
    	  "http://img.mukewang.com/5662e29a0001905a14410901.png",
            "http://img.mukewang.com/5662e2960001f16314410901.png",
            "http://img.mukewang.com/5662e26f00010dea14410901.png"
    	],
    	videoUrls:[
    	"http://www.imooc.com/upload/media/qx-one.mp4",
            "http://www.imooc.com/upload/media/qx-two.mp4",
            "http://www.imooc.com/upload/media/qx-three.mp4"
    	]

    });
     
     setTimeout(function(){
     	carousel.run(-1)
     },3000)
     setTimeout(function(){
     	carousel.run(0)
     },6000)
     setTimeout(function(){
     	carousel.run(1)
     },9000);






       setTimeout(function(){
       	callback()
       },20000)
}