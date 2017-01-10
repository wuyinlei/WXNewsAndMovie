//welcome.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: '开启小程序之旅',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.redirectTo({
      url: '../posts/post'
    });

    // wx.redirectTo({
    //   url: 'String',
    //   success: function(res){
    //     // success
    //   },
    //   fail: function() {
    //     // fail
    //   },
    //   complete: function() {
    //     // complete
    //   }
    // })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
