// pages/movies/movie-detail/movie-detail.js
var util = require('../../../utils/util.js');
var app = getApp();
Page({
  data: {
    movie: {}
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var movieId = options.id;
    var movieItemDetailUrl = app.globalData.doubanBase
      + "/v2/movie/subject/" + movieId;
    // console.log(movieId);

    util.http(movieItemDetailUrl, this.processDoubanData);
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
  }
})