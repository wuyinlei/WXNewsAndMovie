var postsData = require("../../../data/posts-data.js")
var app = getApp();
Page({
  data: {
    isPlayingMusic: false,
  },
  onLoad: function (options) {
    var globalData = app.globalData;
    // console.log(globalData);

    if(globalData.g_isPlayingMusic){  //全局变量如果为真   
      //this.data.isPlayingMusic = true;
        this.setData({
        isPlayingMusic: true,
      })
    }

    var postId = options.id;
    this.data.currentPostId = postId;
    var postData = postsData.postList[postId];
    //console.log(postData);
    //console.log(postId);
    //在onLoad方法，不是异步的去执行一个数据绑定
    //则不需要使用this.setData()方法
    //只需对this.data进行赋值即可实现数据绑定(但是这个时候需要在你的数据源的地方加入postData.)  this.data.postData = postData;
    this.setData(postData);
    // this.data.postData = postData;
    // var postsCollected= {
    //   1:"true",
    //   2:"false",
    //   3:"true"
    // }

    var postsCollected = wx.getStorageSync('posts-collected');
    if (postsCollected) {  //逻辑解释  这里首先会去缓存中获取这个键所对应的值(可能获取为空)
      //当有数据的时候
      var postCollected = postsCollected[postId]; //获取到对应文章的id的缓存值值(有可能为空)
      this.setData({
        collected: postCollected,  //如果为空比如  id = 2的时候，没有2所对应的值值，这个时赋值也会是默认的false
        //所以这个地方没有或者false   在动态绑定的时候都是false   显示为收藏的图片图片   如果是true  显示已经的图片
      })
    } else {  //如果没有缓存
      var postsCollected = {};  //定义一个变量  
      postsCollected[postId] = false;  //把当前变量设置成false   也就是填充这个位置的值值  设置为false
      wx.setStorageSync('posts-collected', postsCollected);  //然后放入缓存  也就是更新
    }
    //wx.setStorageSync('key', "你好");  //同步设置缓存

    this.setAudioMonitor();

  },

  /**
   * 音乐播放控制
   */
  setAudioMonitor:function(){
    var that = this;
    //监听音乐播放。
    wx.onBackgroundAudioPlay(function () {
      // callback
      that.setData({
        isPlayingMusic: true,
      })
      //音乐播放    改变全局变量(是否处于播放状态)
      app.globalData.g_isPlayingMusic = true;
      // that.isPlayingMusic = true;
    })

    //监听音乐暂停
    wx.onBackgroundAudioPause(function () {
      // callback
      that.setData({
        isPlayingMusic: false,
      })
      //音乐暂停    改变全局变量(是否处于播放状态)
       app.globalData.g_isPlayingMusic = false;
    })
  },

  onCollectionTap: function (event) {

    console.log(event);

    //var s = wx.getStorageSync('key');  //同步获取缓存
    var postsCollected = wx.getStorageSync('posts-collected');

    var postCollected = postsCollected[this.data.currentPostId]; //获取到对应文章的id的缓存值值(有可能为空)
    postCollected = !postCollected;  //收藏变成未收藏   反之亦然
    postsCollected[this.data.currentPostId] = postCollected;
    this.showToast(postsCollected, postCollected);

  },

  /**
   * 自定义的toast
   */
  showToast: function (postsCollected, postCollected) {
    wx.setStorageSync('posts-collected', postsCollected);//更新文章是否收藏的缓存体
    this.setData({
      collected: postCollected //更新数据绑定变量  从而实现收藏图片的切换
    })

    //给予用户提示   显示消息提示框
    wx.showToast({
      title: postCollected ? "收藏成功" : "取消成功",
      duration: 1000,

    })
  },

  /**
   * 自定义的对话框
   */
  showModal: function (postsCollected, postCollected) {
    //显示模态弹窗
    wx.showModal({
      title: '收藏',
      content: postCollected ? '收藏该文章?' : "取消收藏该文章",
      cancelColor: "#333",
      confirmColor: "#405f80",
      success: function (res) {
        if (res.confirm) {
          wx.setStorageSync('posts-collected', postsCollected);//更新文章是否收藏的缓存体
          this.setData({
            collected: postCollected //更新数据绑定变量  从而实现收藏图片的切换
          })
        }
      }
    })
  },


  /**
   * 自定义底部弹框列表
   */
  showActionSheet: function () {
    wx.showActionSheet({
      //按钮的文字数组，数组长度最大为6个
      itemList: ['A', 'B', 'C'],
      itemColor: "#405f80",   //按钮的文字颜色，默认为"#000000"
      success: function (res) {  //接口调用成功的回调函数
        console.log(res.tapIndex)
        //res.tapIndex  数组元素的下表   从0开始
        //res.errMsg  
        //res.cancel  用户是否点击了取消按钮
      },
      fail: function (res) {  //接口调用失败的回调函数
        console.log(res.errMsg)
      },
      complete: function (res) {  //接口调用结束的回调函数（调用成功、失败都会执行）

      }
    })
  },


  /**
   * 播放音乐的逻辑
   */
  onMusicTap: function (event) {

    var currentPostId = this.data.currentPostId;  //当前id

    var isPlayingMusic = this.data.isPlayingMusic;

    var postData = postsData.postList[currentPostId];  //当前item点击进入的数据

    if (isPlayingMusic) {  //当前正在播放  点击之后响应暂停按钮
      wx.pauseBackgroundAudio();  //暂停播放音乐

      this.setData({  //用于通知更新ui
        isPlayingMusic: false,
      })
      // this.data.isPlayingMusic = false; //这样做是不能进行成功赋值的
    } else {  //没有播放   点击之后要播放

      wx.playBackgroundAudio({
        dataUrl: postData.music.url,
        title: postData.music.title,
        coverImg: postData.coverImg,
        // success: function(res){
        //   // success
        // },
        // fail: function() {
        //   // fail
        // },
        // complete: function() {
        //   // complete
        // }
      })
      this.setData({
        isPlayingMusic: true,
      })
      // this.data.isPlayingMusic = true;
    }
  },

  // onShareTap: function (event) {
  //   // wx.removeStorageSync('key');  //同步删除缓存
  //   // wx.clearStorageSync(); //删除所有缓存   缓存的上限不超过10MB
  // },

  onShareAppMessage: function () {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  }
})