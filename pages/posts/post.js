var postData = require('../../data/posts-data.js');  //只能用相对路径不能用绝对路径

Page({
    data: {
        post_key:[]
    },
    onLoad: function (options) {

    },
    onReady: function () {
        // 生命周期函数--监听页面初次渲染完成
        // var post_content = {
        //     date: "Sep 8 2014",
        //     title: "正是花好月圆夜",
        //     post_img: "/images/post/vr.png",
        //     content: "每个页面都应有明确的重点，以便于用户每进入一个新页面的时候都能快速地理解页面内容。在确定了重点的前提下，应尽量避免页面上出现其它与用户的决策和操作无关的干扰因素。",
        //     view_num: "64",
        //     collect_num: "1000",
        //     author_img: "../../images/avatar/1.png",
        // }

        // var post_contents = [
        //     {
        //         date: "Sep 8 2014",
        //         title: "正是花好月圆夜",
        //         imgSrc: "/images/post/vr.png",
        //         content: "每个页面都应有明确的重点，以便于用户每进入一个新页面的时候都能快速地理解页面内容。在确定了重点的前提下，应尽量避免页面上出现其它与用户的决策和操作无关的干扰因素。",
        //         reading: "64",
        //         collection: "1000",
        //         avatar: "../../images/avatar/1.png",
            
        //     },
        //     {
        //         date: "Sep 8 2016",
        //         title: "你是谁 你不是谁",
        //         imgSrc: "/images/post/vr.png",
        //         content: "每个页面都应有明确的重点，以便于用户每进入一个新页面的时候都能快速地理解页面内容。在确定了重点的前提下，应尽量避免页面上出现其它与用户的决策和操作无关的干扰因素。",
        //         reading: "634",
        //         collection: "10030",
        //         avatar: "../../images/avatar/2.png",
               
        //     }
        // ];
         this.setData({
             posts_key:postData.postList});

       // this.setData(post_content);
    },
   
})