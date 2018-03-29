// pages/order/food.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tableNO: 0,
    menu: [{ "typeName": "快餐类", "menuContent": [{ "name": "炸鸡", "src": "http://cp2.douguo.net/upload/caiku/3/d/8/600x400_3df24df78b407264a1e14ac03ca3ec28.jpg", "sales": 22, "rating": 3, "price": 15, "numb": 0 }, { "name": "汉堡", "src": "http://cp2.douguo.net/upload/caiku/3/d/8/600x400_3df24df78b407264a1e14ac03ca3ec28.jpg", "sales": 22, "rating": 3, "price": 10, "numb": 0 }, { "name": "鸡翅", "src": "http://cp2.douguo.net/upload/caiku/3/d/8/600x400_3df24df78b407264a1e14ac03ca3ec28.jpg", "sales": 22, "rating": 3, "price": 11, "numb": 0 }, { "name": "薯条", "src": "http://cp2.douguo.net/upload/caiku/3/d/8/600x400_3df24df78b407264a1e14ac03ca3ec28.jpg", "sales": 22, "rating": 3, "price": 32, "numb": 0 }] }, { "typeName": "盖浇饭类", "menuContent": [{ "name": "土豆牛肉盖浇饭", "src": "http://cp2.douguo.net/upload/caiku/3/d/8/600x400_3df24df78b407264a1e14ac03ca3ec28.jpg", "sales": 22, "rating": 3, "price": 9, "numb": 0 }, { "name": "肉末茄子盖浇饭", "src": "http://cp2.douguo.net/upload/caiku/3/d/8/600x400_3df24df78b407264a1e14ac03ca3ec28.jpg", "sales": 22, "rating": 3, "price": 21, "numb": 0 }, { "name": "番茄炒蛋盖浇饭", "src": "http://cp2.douguo.net/upload/caiku/3/d/8/600x400_3df24df78b407264a1e14ac03ca3ec28.jpg", "sales": 22, "rating": 3, "price": 50, "numb": 0 }] }, { "typeName": "养生粥类", "menuContent": [{ "name": "桂圆莲子粥", "src": "http://cp2.douguo.net/upload/caiku/3/d/8/600x400_3df24df78b407264a1e14ac03ca3ec28.jpg", "sales": 22, "rating": 3, "price": 15, "numb": 0 }, { "name": "皮蛋瘦肉粥", "src": "http://cp2.douguo.net/upload/caiku/3/d/8/600x400_3df24df78b407264a1e14ac03ca3ec28.jpg", "sales": 22, "rating": 3, "price": 12, "numb": 0 }] }, { "typeName": "小吃类", "menuContent": [{ "name": "肉夹馍", "src": "http://cp2.douguo.net/upload/caiku/3/d/8/600x400_3df24df78b407264a1e14ac03ca3ec28.jpg", "sales": 22, "rating": 3, "price": 4, "numb": 0 }] }],
    currentPage: 0,
    selected: 0,
    howMuch: 12,
    cost: 0,
    pullBar: false,
    swiperTitle: [{
      text: "点菜",
      id: 1
    }, {
      text: "小店简介",
      id: 2
    }],
  },

  pullBar: function (e) {
    var that = this;
    that.setData({
      pullBar: !this.data.pullBar
    })
  }
  ,

  addToTrolley: function (e) {
    var that = this;
    var info = that.data.menu;
    info[that.data.selected].menuContent[e.currentTarget.dataset.index].numb++;
    that.setData({
      cost: that.data.cost + that.data.menu[that.data.selected].menuContent[e.currentTarget.dataset.index].price,
      menu: info,
    })
  },
  removeFromTrolley: function (e) {
    var that = this;
    var info = that.data.menu;
    if (info[that.data.selected].menuContent[e.currentTarget.dataset.index].numb != 0) {
      info[that.data.selected].menuContent[e.currentTarget.dataset.index].numb--;
      that.setData({
        cost: that.data.cost - that.data.menu[that.data.selected].menuContent[e.currentTarget.dataset.index].price,
        menu: info,
      })
    }
  },

  turnPage: function (e) {
    var that = this;
    that.setData({
      currentPage: e.currentTarget.dataset.index
    })
  },
  turnTitle: function (e) {
    var that = this;
    if (e.detail.source == "touch") {
      that.setData({
        currentPage: e.detail.current
      })
    }
  },
  turnMenu: function (e) {
    var that = this;
    that.setData({
      selected: e.currentTarget.dataset.index
    })
  },

  //调取微信扫码
  scanCode: function (e) {
    var that = this;
    // 只允许从相机扫码
    wx.scanCode({
      //onlyFromCamera: true,
      success: (res) => {
        console.log(res.result);
        //扫码获取桌台号并更新缓存
        that.setData({
          tableNO: res.result,
        });
        //更新缓存桌台号
        wx.setStorage({
          key: 'tableNO',
          data: that.data.tableNO,
        });
      },
      fail: () => {
        console.log(0);
        //扫码失败则设置默认桌台
        that.setData({
          tableNO: 0,
        });
      }
    })
  },

  //获取缓存，并显示
  getStorageLog: function (e) {
    var that = this;
    //获取缓存桌台号
    if ("" != wx.getStorageSync('tableNO')) {
      //设置当前桌台为缓存桌台
      that.setData({
        tableNO: wx.getStorageSync('tableNO'),
      });
    } else {
      //无缓存桌台号则设置默认桌台
      that.setData({
        tableNO: 0,
      });
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})