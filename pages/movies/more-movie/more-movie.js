// pages/movies/more-movie/more-movie.js
var util = require('../../../utils/util.js');
var app = getApp();
Page({
  data: {
    movies: {},
    navigationTitle: "",
    requestUrl: "",
    totalCount: 0,
    isEmpty: true,
  },
  onLoad: function (options) {
    var category = options.category;
    // console.log(category);
    //定义一个中间变量   用来保存 值  然后在不同方法中传递参数
    this.data.navigationTitle = category;

    var dataUrl = "";

    switch (category) {
      case "正在热映":
        dataUrl = app.globalData.doubanBase + "/v2/movie/in_theaters";
        break;
      case "即将上映":
        dataUrl = app.globalData.doubanBase + "/v2/movie/coming_soon";
        break;
      case "豆瓣Top250":
        dataUrl = app.globalData.doubanBase + "/v2/movie/top250";
        break;
    }
    this.data.requestUrl = dataUrl; //保存值
    util.http(dataUrl, this.proccessDoubanData);

  },

  onPullDownRefresh: function (event) {
    // console.log("加载更多");
    var nextUrl = this.data.requestUrl + "?start=0&count=20";
    this.data.movies = {};  //把数据置空  要不然就会有很多数据
    this.data.isEmpty=true; //把标志置为 true  
    util.http(nextUrl, this.proccessDoubanData);
    wx.showNavigationBarLoading();
  },

  

  proccessDoubanData: function (data) {
    // console.log(data);
    var movies = [];
    for (var idx in data.subjects) {
      var subject = data.subjects[idx];
      var title = subject.title;
      if (title.length > 6) {
        title = title.substring(0, 6) + "...";
      }

      var temp = {
        stars: util.convertToStarsArray(subject.rating.stars),
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id,
      }
      movies.push(temp);
    }
    var totalMovies = {};  //用于保存链接数组集合  在安卓中  我们请求更多的数据之后  可以直接add
    //Data(data);数据 然后就可以在数组中添加更新的数据了了  但是这个地方却是达不到的的，所以我们在这里定义一个总的数据  用来接收或者拼接所有数据
    //当然这个地方要设置一个标志  也就是 我们是否追加的数据数据  还是怎么的的 如果是追加的数据   就
    if (!this.data.isEmpty) {
      totalMovies = this.data.movies.concat(movies); //连接数组
    } else {
      totalMovies = movies;  //如果是首次添加数据   这个地方就可以直接赋值
      this.data.isEmpty = false;  //设置标志位为false
    }
    this.setData({
      movies: totalMovies
    });
    this.data.totalCount += 20;  //在这里 也就是数据绑定成功之后  这个时候才能记录数据
    wx.hideNavigationBarLoading();
  },

  /**
   * 滑动到底部触发加载更多的逻辑方法
   */
  onReachBottom: function (event) {
    // console.log("加载更多");
    var nextUrl = this.data.requestUrl + "?start=" + this.data.totalCount + "&count=20";
    util.http(nextUrl, this.proccessDoubanData);
    wx.showNavigationBarLoading();
  },

  onCancelImageTap:function(event){

  },

  //   onReachBottom: function (event) {
  //   var nextUrl = this.data.requestUrl +
  //     "?start=" + this.data.totalCount + "&count=20";
  //   util.http(nextUrl, this.processDoubanData)
  //   wx.showNavigationBarLoading()
  // },


  //在这个生命周期方法中设置title可以
  onReady: function (event) {

    //  console.log(event);

    wx.setNavigationBarTitle({
      title: this.data.navigationTitle,
      success: function (res) {
        // success
      }
    })
  },

})