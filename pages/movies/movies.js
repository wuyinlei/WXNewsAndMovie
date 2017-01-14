var utils = require('../../utils/util.js');
var app = getApp();
Page({
    data: {
        inTheaters: [],
        comingSoon: [],
        top250: [],
        containerShow: true,
        searchPanelShow: false
    },

    onMoreTap: function (event) {
        var category = event.currentTarget.dataset.category;
        wx.navigateTo({
            url: 'more-movie/more-movie?category=' + category,
            success: function (res) {
                // success
            },
            fail: function () {
                // fail
            },
            complete: function () {
                // complete
            }
        })
    },


    onLoad: function (options) {

        //正在热映
        var inTheaterUrl = app.globalData.doubanBase + "/v2/movie/in_theaters" + "?start=0&count=3";
        //即将上映
        var comingSoonUrl = app.globalData.doubanBase + "/v2/movie/coming_soon" + "?start=0&count=3";
        //top250
        var top250Url = app.globalData.doubanBase + "/v2/movie/top250" + "?start=0&count=3";

        this.getMovieListData(inTheaterUrl, "inTheaters", "正在热映");
        this.getMovieListData(comingSoonUrl, "comingSoon", "即将上映");
        this.getMovieListData(top250Url, "top250", "豆瓣Top250");

    },

    getMovieListData: function (url, settedkey, categoryTitle) {
        var that = this;

        wx.request({
            url: url,
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: {
                "Content-Type": "applicaption/xml"
            }, // 设置请求的 header
            success: function (res) {
                // success
                console.log(res);
                that.proccessDoubanData(res.data, settedkey, categoryTitle);
            },
            fail: function () {
                // fail
            }
        })
    },

    proccessDoubanData: function (movieDouban, settedkey, categoryTitle) {
        var movies = [];
        for (var idx in movieDouban.subjects) {
            var subject = movieDouban.subjects[idx];
            var title = subject.title;
            if (title.length > 6) {
                title = title.substring(0, 6) + "...";
            }

            var temp = {
                stars: utils.convertToStarsArray(subject.rating.stars),
                title: title,
                average: subject.rating.average,
                coverageUrl: subject.images.large,
                movieId: subject.id,
            }
            movies.push(temp);
        }
        var readyData = {};
        readyData[settedkey] = {
            movies: movies,
            categoryTitle: categoryTitle
        }
        this.setData(readyData);

    },

    onBindFocus: function (event) {
        //   console.log("获取焦点")
        // this.data.containerShow = false;
        // this.data.searchPanelShow = true;
        this.setData({
            containerShow: false,
            searchPanelShow: true
        })
    },

    onCancelImageTap: function (event) {
        this.setData({
            containerShow: true,
            searchPanelShow: false
        })
    },

    onBindConfirm: function () {

    },

    onShareAppMessage: function () {
        // 用户点击右上角分享
        return {
            title: 'title', // 分享标题
            desc: 'desc', // 分享描述
            path: 'path' // 分享路径
        }
    }
})