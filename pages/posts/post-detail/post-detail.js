var postsData = require("../../../data/posts-data.js")
Page({
  data:{
    
  },
  onLoad:function(options){
    var postId = options.id;

    var postData = postsData.postList[postId];
    //console.log(postData);
    //console.log(postId);
    this.setData(postData);
  },
  
  onShareAppMessage: function() {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  }
})