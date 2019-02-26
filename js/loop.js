jQuery.fn.extend({
  loop:function (options) {//options为配置选项
    var defaultOptions = {
      width:480,
      height:700,
      pageNavigator:true,
      autoplay:true,
      autoplaySeconds:1000,
      mouseenterStop:true,
      mouseleaveStart:true,
      changeBtn:true
    }
    var that = this
    var currentOptions = $.extend(defaultOptions,options)
    //高度，宽度配置
    that.width(currentOptions.width)
    that.height(currentOptions.height)
    that.addClass('loop')
    //分页器配置
    if(currentOptions.pageNavigator){
      //获取图片数量
      var num = that.find('a>img').length
      //创建ul
      var ul = $('<ul class="list"></ul>')
      //给ul添加li,并把ul放到loop上
      for (var i = 0; i < num; i++) {
        ul.append($('<li>').html('<span></span>'))
      }
      that.append(ul)
      //绑定事件
      var ind = 0
      that.find('.list>li>span').click(function () {
        //找到对应的按钮换图片
        ind = $(this).parent().index()
        that.find('a').eq(ind).css({ 'z-index': 1, 'opacity': 1 }).siblings('a').css({ 'z-index': 0, 'opacity': 0 })
        //换按钮样式
        $(this).css('opacity', 1).parent().siblings().children().css('opacity', 0)
      })
    }
    //自动播放设置
     var loopAutoPlay
    if(currentOptions.autoplay){
      loopAutoPlay = setInterval(function () {  
        
        if(ind<num-1){
          ind++
        }else{
          ind = 0 
        }
        that.find('a').eq(ind).css({
          'z-index': 1,
          'opacity': 1
        }).siblings('a').css({
          'z-index': 0,
          'opacity': 0
        })
        that.find('.list>li>span').eq(ind).css('opacity', 1).parent().siblings().children().css('opacity', 0)
      },currentOptions.autoplaySeconds)
    }
    //滑入是否停止自动播放设置
      that.mouseenter(function () {
        if (currentOptions.mouseenterStop && currentOptions.autoplay) {
        clearInterval(loopAutoPlay)
        }
        })
    //滑出是否开始自动播放
    that.mouseleave(function () {
      if (currentOptions.mouseleaveStart&&currentOptions.autoplay) {
        loopAutoPlay = setInterval(function () {
          if (ind < num-1) {
            ind++
          } else {
            ind = 0
          }
          that.find('a').eq(ind).css({
            'z-index': 1,
            'opacity': 1
          }).siblings('a').css({
            'z-index': 0,
            'opacity': 0
          })
          that.find('.list>li>span').eq(ind).css('opacity', 1).parent().siblings().children().css('opacity', 0)
        }, currentOptions.autoplaySeconds)
      }
      })
    //是否有左右箭头
      if(currentOptions.changeBtn){
        var showBtn = $('<div class="change-btn"></div>').html('<a href="javascript:;" class="prev"><</a><a href = "javascript:;" class = "next" >></a>')
        that.append(showBtn)
        $('.next').click(function () {
          if (ind < num-1) {
            ind++
          } else {
            ind = 0
          }
          $(this).parent().parent().find('a').eq(ind).css({
            'z-index': 1,
            'opacity': 1
          }).siblings('a').css({
            'z-index': 0,
            'opacity': 0
          })
           $(this).parent().parent().find('.list>li>span').eq(ind).css('opacity', 1).parent().siblings().children().css('opacity', 0)
        })
        $('.prev').click(function () {
          if (ind > 0) {
            ind--
          } else {
            ind = num-1
          }
          $(this).parent().parent().find('a').eq(ind).css({
            'z-index': 1,
            'opacity': 1
          }).siblings('a').css({
            'z-index': 0,
            'opacity': 0
          })
          $(this).parent().parent().find('.list>li>span').eq(ind).css('opacity', 1).parent().siblings().children().css('opacity', 0)
        })
      }
    
    }
})