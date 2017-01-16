// pages/movies/movie-detail/movie-detail.js
var util = require('../../../utils/util.js');
var app = getApp();
Page({
  data: {
    movie: {},
      navigationTitle: "",
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var movieId = options.id;
    var movieTitle = options.title;

     //定义一个中间变量   用来保存 值  然后在不同方法中传递参数
    this.data.navigationTitle = movieTitle;
    var movieItemDetailUrl = app.globalData.doubanBase
      + "/v2/movie/subject/" + movieId;
    // console.log(movieId);

    util.http(movieItemDetailUrl, this.processDoubanData);
  },


   /*查看图片*/
  viewMoviePostImg: function (e) {
    var src = e.currentTarget.dataset.src;
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: [src] // 需要预览的图片http链接列表
    })
  },

  processDoubanData: function (data) {
    // console.log(data);
    var director = {
      avatar: '',
      name: '',
      id: ''
    };

    if (data.directors[0] != null) {
      if (data.directors[0].avatars != null) {
        director.avatar = data.directors[0].avatars.large;
      }
      director.name = data.directors[0].name;
      director.id = data.directors[0].id;
    }



    var movie = {
      movieImg: data.images ? data.images.large : "",
      country: data.countries[0],
      title: data.title,
      originalTitle: data.original_title,
      wishCount: data.wish_count,
      commentsCount: data.comments_count,
      year: data.year,
      genres: data.genres.join("、"),
      stars: util.convertToStarsArray(data.rating.stars),
      score: data.rating.average,
      director: director,
      casts: util.convertToCastString(data.casts),
      castsInfo: util.convertToCastsInfo(data.casts),
      summary: data.summary
    }
    console.log(movie);
    this.setData({
      movie: movie
    })
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