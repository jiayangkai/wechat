//index.js
//获取应用实例
//单号识别api
var url = "http://localhost:9527/api/express?expressNo="
//获取全局配置
var app = getApp();
Page({
  data: {
    inputVal: "",
    userInfo: {},
    expressList: [],
    inputShowed: false,
    searchLogList: [],
    showList: true
  },
  // 输入内容时 把当前内容赋值给 查询的关键字，并显示搜索记录  
  inputTyping: function (e) {
    var that = this;
    that.setData({
      inputShowed: true,
      inputVal: e.detail.value
    });
    that.getStorageLog();
  },

  // 显示搜索输入框和搜索历史记录  
  showInput: function (e) {
    var that = this;
    that.getStorageLog();
  },
  //查询数据
  searchData: function (e) {
    var that = this;
    var val = that.data.inputVal;
    //数据加载完成之前，显示加载中提示框
    wx.showToast({
      title: '加载中。。。',
      icon: 'loading',
      duration: 10000
    });
    //输入框是否为空
    if (val == "") {
      wx.hideToast();
      return;
    }
    //关键字加入缓存列表,并缓存
    var searchlist = that.data.searchLogList;
    var searchData = that.data.inputVal;
    //未缓存该关键字,则加入列表
    if (searchlist.indexOf(searchData) == -1) {
      searchlist.push(val);
    }
    wx.setStorage({
      key: 'searchLog',
      data: that.data.searchLogList,
    });
    that.httpRequest();
  },
  //点击叉叉icon 清除输入内容，同时清空关键字 
  clearInput: function () {
    var that = this;
    that.setData({
      expressList: [],
      inputVal: "",
      showList: true
    });
  },
  //清除缓存列表
  clearSearchLog: function (e) {
    var that = this;
    wx.removeStorage({
      key: 'searchLog',
      success: function (res) {
        that.setData({
          inputShowed: true,
          searchLogShowed: false
        });
      },
    })
  },
  //点击搜索记录关键词查询
  searchDataByLog: function (e) {
    var that = this;
    // 从view中获取值，在view标签中定义data-name(name自定义，比如view中是data-log="123" ; 那么e.target.dataset.log=123)
    var data = e.target.dataset.log;
    that.setData({
      inputVal: data,
    });
    that.searchData();
  },

  //公用函数
  //网络请求数据
  httpRequest: function (f) {
    var that = this;
    //发起请求，注意 wx.request发起的是 HTTPS 请求
    wx.request({
      url: url + that.data.inputVal,
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var data = res.data;
        //将数据从逻辑层发送到视图层，同时改变对应的 this.data 的值
        that.setData({
          expressList: data,
          showList: false,
          searchLogShowed: false
        });
        typeof f == "function" && f(data);
        //数据加载成功后隐藏加载中弹框
        wx.hideToast();
      }
    })
  },
  //获取缓存，并显示
  getStorageLog: function (e) {
    var that = this;
    if ("" != wx.getStorageSync('searchLog')) {
      that.setData({
        inputShowed: true,
        searchLogShowed: true,
        searchLogList: wx.getStorageSync('searchLog')
      });
    } else {
      that.setData({
        inputShowed: true,
        searchLogShowed: false
      });
    }
  },



  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  }
})
