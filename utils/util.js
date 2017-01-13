function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function convertToStarsArray(stars) {
  var num = stars.toString().substring(0, 1);
  var array = [];
  for (var i = 1; i <= 5; i++) {
    if (i <= num) {
      array.push(1);
    } else {
      array.push(0);
    }
  }
  return array;
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

 function http(url,callBack) {
    var that = this;

    wx.request({
      url: url,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "applicaption/xml"
      }, // 设置请求的 header
      success: function (res) {
      callBack(res.data);
    
      },
      fail: function (error) {
        // fail
        console.log(error);
      }
    })
  }

module.exports = {
 // formatTime: formatTime,
  convertToStarsArray:convertToStarsArray,
  http:http
}
