;(function ($) {
  $.fn.loop = function (options) {  
    this.each(function () { 
      var loops = new LoopObj($(this), options)
      loops.init()
      var domC = loops.dom
      if(loops.settings.pageNavigator){
       domC.find('.list>li>span').click(function () {
          //找到对应的按钮换图片
          loops.ind = $(this).parent().index()
          console.log(loops.ind);
          $(this).parents('.list').parent().find('a').eq(loops.ind).css({ 'z-index': 1, 'opacity': 1 }).siblings('a').css({ 'z-index': 0, 'opacity': 0 })
          //换按钮样式
          $(this).css('opacity', 1).parent().siblings().children().css('opacity', 0)
        })
      }
      if(loops.settings.autoplay){
        loops.loopAutoPlay = setInterval(function () {
          if (loops.ind < loops.num - 1) {
            loops.ind++
          } else {
            loops.ind = 0
          }
          domC.find('a').eq(loops.ind).css({
            'z-index': 1,
            'opacity': 1
          }).siblings('a').css({
            'z-index': 0,
            'opacity': 0
          })
          domC.find('.list>li>span').eq(loops.ind).css('opacity', 1).parent().siblings().children().css('opacity', 0)
        }, loops.settings.autoplaySeconds) 
      }
      $(this).mouseenter(function () {
        if (loops.settings.mouseenterStop) {
          clearInterval(loops.loopAutoPlay)
        }
      }) 
      $(this).mouseleave(function () {
        if (loops.settings.mouseleaveStart && loops.settings.autoplay) {
          loops.loopAutoPlay = setInterval(function () {
            if (loops.ind < loops.num - 1) {
              loops.ind++
            } else {
              loops.ind = 0
            }
            domC.find('a').eq(loops.ind).css({
              'z-index': 1,
              'opacity': 1
            }).siblings('a').css({
              'z-index': 0,
              'opacity': 0
            })
            domC.find('.list>li>span').eq(loops.ind).css('opacity', 1).parent().siblings().children().css('opacity', 0)
          }, loops.settings.autoplaySeconds)
        }
      })
      //分页
      console.log($('.next'));
      
      domC.find('.next').click(function () {
        console.log(loops);
        
        if (loops.ind < loops.num - 1) {
          loops.ind++
        } else {
          loops.ind = 0
        }
        $(this).parent().parent().find('a').eq(loops.ind).css({
          'z-index': 1,
          'opacity': 1
        }).siblings('a').css({
          'z-index': 0,
          'opacity': 0
        })
        $(this).parent().parent().find('.list>li>span').eq(loops.ind).css('opacity', 1).parent().siblings().children().css('opacity', 0)
        console.log(loops.ind);
      })
      $('.prev').click(function () {
        console.log(loops.ind);
        
        if (loops.ind > 0) {
          loops.ind--
        } else {
          loops.ind = loops.num - 1
        }
        $(this).parent().parent().find('a').eq(loops.ind).css({
          'z-index': 1,
          'opacity': 1
        }).siblings('a').css({
          'z-index': 0,
          'opacity': 0
        })
        $(this).parent().parent().find('.list>li>span').eq(loops.ind).css('opacity', 1).parent().siblings().children().css('opacity', 0)
      })
    })
  }
  function LoopObj(ele, options) {
    this.dom =ele
    this.settings = $.extend(LoopObj.prototype.defaultOptions, options)
    this.ind = 0
    this.num = ele.find('a').length
    this.loopAutoPlay=0
     }
   LoopObj.prototype.init = function () {
    this.dom.addClass('loop') 
    //分页器
      if(this.settings.pageNavigator){
      //创建ul
      var ul = $('<ul class="list"></ul>')
      //给ul添加li,并把ul放到loop上
        for (var i = 0; i < this.num; i++) {
        ul.append($('<li>').html('<span></span>'))
      }
      this.dom.append(ul)
    } 
     //是否有左右箭头
     if (this.settings.changeBtn) {
       var showBtn = $('<div class="change-btn"></div>').html('<a href="javascript:;" class="prev"><</a><a href = "javascript:;" class = "next" >></a>')
       this.dom.append(showBtn)
     }
    //设置大小
    this.setSize()
  }
  LoopObj.prototype.setSize = function () {
    this.dom.width(this.settings.width)
    this.dom.height(this.settings.height)
  }
  LoopObj.prototype.defaultOptions = {
    width: 480,
    height: 700,
    pageNavigator: true,
    autoplay: true,
    autoplaySeconds: 1000,
    mouseenterStop: true,
    mouseleaveStart: true,
    changeBtn: true
  }
})($)