var request = require('../../utils/request.js');
//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    list: [],
    hidden:false,
    hasMore: false,
    hasRefesh: false,
    page:0,
    activeIndex: 0,
    navList: [],
    indicatorDots: !0,
    autoplay: !1,
    current: 0,
    interval: 3000,
    duration: 1000,
    circular: !0,
    goods: {},
    images:[
'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
  },
  onLoad: function (e) {
    console.log('onLoad');
    var that = this;
    var url = 'https://v.juhe.cn/weixin/query?key=' + app.globalData.juheKey+'&pno=' + (++that.data.page) + '&ps=10';
    request._get(url,
      function (res) {
        console.log("onLoad url ",url);
        that.setData({
          list: that.data.list.concat(res.data.result.list),
          hidden: true
        });
      }, function (res) {
        console.log(res);
      })
  },
  loadMore: function () {
    var that = this;
    that.setData({
      hasMore:true,
    });
    console.log("loadMore page ",that.data.page);
    var url = 'https://v.juhe.cn/weixin/query?key=' + app.globalData.juheKey+'&pno=' + (++that.data.page) + '&ps=10';
    request._get(url,
      function (res) {
        console.log("loadMore url ", url);
        that.setData({
          list: that.data.list.concat(res.data.result.list),
          hasMore: false,
        });
      }, function (res) {
        console.log(res);
      })
  },
  refesh: function (e) {
    var that = this;
    that.setData({
      hasRefesh: true,
    });
    var url = 'https://v.juhe.cn/weixin/query?key=' + app.globalData.juheKey +'&pno=1&ps=10';
    request._get(url,
      function (res) {
        console.log("refesh url ", url);
        that.setData({
          list: res.data.result.list,
          page: 1,
          hasRefesh: false,
        });
      }, function (res) {
        console.log(res);
      })
  },
})
