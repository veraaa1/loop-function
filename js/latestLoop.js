;(function ($) {  
  $.fn.loop = function (options) {
      this.each(function () {
        var loop = new Loop($(this),options)
        loop.init()
        if(loop.settings.autoplay){
          loop.autoplay()
          loop.autoplayStop()
          loop.autoplayStart()
        }
      })
    }
    function Loop(ele,options) {
      this.dom = ele
      this.settings = $.extend({},Loop.prototype.defaultOptions, options)
      this.num = ele.find('a').length
      this.ind = 0
      this.loopAutoPlay = 0
    }
    Loop.prototype.init = function () {
      this.dom.addClass('loop')
      this.setSize()
      //分页器
      if (this.settings.pageNavigator) {
        //创建ul
        var ul = $('<ul class="list"></ul>')
        //给ul添加li,并把ul放到loop上
        for (var i = 0; i < this.num; i++) {
          ul.append($('<li>').html('<span></span>'))
        }
        this.dom.append(ul)
        this.pageNavigator()
      } 
      //左右变换按钮
      if(this.settings.changeBtn){
        var showBtn = $('<div class="change-btn"></div>').html('<a href="javascript:;" class="prev"><</a><a href = "javascript:;" class = "next" >></a>')
        this.dom.append(showBtn)
        this.changeBtn()
      }
    }
    Loop.prototype.setSize = function () {
      this.dom.width(this.settings.width)
      this.dom.height(this.settings.height)
    }
    Loop.prototype.pageNavigator = function () {  
      var that = this
      that.dom.find('.list>li>span').click(function () {
        //找到对应的按钮换图片
       that.ind = $(this).parent().index()
        that.dom.changeBtnCss(that.ind)
      })
    }
    Loop.prototype.changeBtn = function () { 
        var that = this 
        that.dom.find('.next').click(function () {
          console.log(that.ind);
          
          that.ind++
        if (that.ind >= that.num) {
          that.ind = 0
        }
          $(this).parent().parent().changeBtnCss(that.ind)
       
      })
      that.dom.find('.prev').click(function () {
        if (that.ind > 0) {
          that.ind--
        } else {
          that.ind = that.num - 1
        }
        $(this).parent().parent().changeBtnCss(that.ind)
      })
    }
    Loop.prototype.autoplay = function () {  
      var that = this
      that.loopAutoPlay = setInterval(function () {
        if (that.ind < that.num - 1) {
          that.ind++
        } else {
          that.ind = 0
        }
        that.dom.changeBtnCss(that.ind)
      }, that.settings.autoplaySeconds) 
    }
    Loop.prototype.autoplayStop = function () {
      var that = this
      that.dom.mouseenter(function () {
        if(that.settings.mouseenterStop){
          clearInterval(that.loopAutoPlay)
        }
      }) 
    }
    Loop.prototype.autoplayStart = function () {
      var that = this
      that.dom.mouseleave(function () {  
        if(that.settings.mouseleaveStart){
          that.autoplay()
        }
      })
      }
    Loop.prototype.defaultOptions = {
      pageNavigator: true,
      width: 240,
      height: 350,
      autoplay: true,
      autoplaySeconds: 1000,
      mouseenterStop: true,
      mouseleaveStart: true,
      changeBtn: true
    }
  $.fn.changeBtnCss=function(index) {
    this.find('a').eq(index).css({
      'z-index': 1,
      'opacity': 1
    }).siblings('a').css({
      'z-index': 0,
      'opacity': 0
    })
    this.find('.list>li>span').eq(index).css('opacity', 1).parent().siblings().children().css('opacity', 0)
    }
})($)