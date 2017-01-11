var postsData = require("../../../data/posts-data.js")
Page({
  data: {

  },
  onLoad: function (options) {
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
  },

  onCollectionTap: function (event) {

    console.log(event);

    //var s = wx.getStorageSync('key');  //同步获取缓存
    var postsCollected = wx.getStorageSync('posts-collected');

    var postCollected = postsCollected[this.data.currentPostId]; //获取到对应文章的id的缓存值值(有可能为空)
    postCollected = !postCollected;  //收藏变成未收藏   反之亦然
    postsCollected[this.data.currentPostId] = postCollected;
    wx.setStorageSync('posts-collected', postsCollected);//更新文章是否收藏的缓存体
    this.setData({
      collected: postCollected //更新数据绑定变量  从而实现收藏图片的切换
    })

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