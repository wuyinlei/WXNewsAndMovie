var postData = require('../../data/posts-data.js');  //只能用相对路径不能用绝对路径

Page({
    data: {
    //小程序总是会读取data对象来进行数据绑定，这个动作我们称为动作A
    //而这个动作A的执行，是在onLoad方法事件执行之后进行的
    },

    onLoad: function () {
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

        //在这里直接引用就行了是不是很简单
         this.setData({
             posts_key:postData.postList});

       // this.setData(post_content);
    },

    onPostTap:function(event){
        //这里的postid虽然在定义的时候是postId  但是在断点的时候显示的确实postid，所以要用postid去接受，要不然就是得不到数据  未定义   还有一般的应该是首字母小写，以后的单词拼接在一起  首字母大写(连字符 如果是一个单词  那么就是小写)
        var postId = event.currentTarget.dataset.postid;
        wx.navigateTo({
          url: 'post-detail/post-detail'
        })
    }
   
})