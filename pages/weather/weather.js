// weather.js
var url = "http://localhost:9527/api/weather/GetWeatherByCity?cityName="
Page({
  /**
   * 页面的初始数据
   */
  data: {
    city: {},
    inputVal: "",
    currentCity: "",
    inputShow: false
  },
  //输入事件
  inputTyping: function (e) {
    var that = this;
    that.setData({
      inputVal: e.detail.value,
      inputShow: true
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

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