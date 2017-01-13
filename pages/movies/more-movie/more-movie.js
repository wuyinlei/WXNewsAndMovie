// pages/movies/more-movie/more-movie.js
var util = require('../../../utils/util.js');
var app = getApp();
Page({
  data: {
    movies:{},
    navigationTitle: null
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

    util.http(dataUrl, this.proccessDoubanData);
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

    this.setData({
      movies: movies
    });
  },

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