//welcome.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: '开启小程序之旅',
    userInfo: {}
  },
  //事件处理函数
  onTap: function(event) {
    // wx.redirectTo({
    //   url:"../posts/post"
    // });

    //新版改版之后   如果是进入tab  标签页面(可以选择的页面的时候) 需要使用wx.switchTab  而不是wx.redirectTo 或者是wx.navigateTo方法来进入的了
     wx.switchTab({
            url: "../posts/post"
        });
        
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
