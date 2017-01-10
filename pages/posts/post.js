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

        var post_contents = [
            {
                date: "Sep 8 2014",
                title: "正是花好月圆夜",
                post_img: "/images/post/vr.png",
                content: "每个页面都应有明确的重点，以便于用户每进入一个新页面的时候都能快速地理解页面内容。在确定了重点的前提下，应尽量避免页面上出现其它与用户的决策和操作无关的干扰因素。",
                view_num: "64",
                collect_num: "1000",
                author_img: "../../images/avatar/1.png",
                collect_img:"/images/icon/view.png",
                view_img:"/images/icon/chat.png",
            },
            {
                date: "Sep 8 2016",
                title: "你是谁 你不是谁",
                post_img: "/images/post/vr.png",
                content: "每个页面都应有明确的重点，以便于用户每进入一个新页面的时候都能快速地理解页面内容。在确定了重点的前提下，应尽量避免页面上出现其它与用户的决策和操作无关的干扰因素。",
                view_num: "634",
                collect_num: "10030",
                author_img: "../../images/avatar/2.png",
                 collect_img:"/images/icon/view.png",
                view_img:"/images/icon/chat.png",
            }
        ];
        this.setData({
            posts_key:post_contents});

       // this.setData(post_content);
    },
    onShow: function () {
        // 生命周期函数--监听页面显示

    },
    onHide: function () {
        // 生命周期函数--监听页面隐藏

    },
    onUnload: function () {
        // 生命周期函数--监听页面卸载

    },
    onPullDownRefresh: function () {
        // 页面相关事件处理函数--监听用户下拉动作

    },
    onReachBottom: function () {
        // 页面上拉触底事件的处理函数

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