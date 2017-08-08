// weather.js
var WxParse = require('../../utils/wxParse/wxParse.js');
var url = "http://192.168.1.31:9009/api/weather/GetWeatherByCity?cityName=";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //城市天气
    cityWeather: {},
    inputVal: "",
    //定位城市
    currentCity: "",
    inputShow: false,
    //定位区
    district: "",
    weatherSrc: ""
  },
  //输入事件
  inputTyping: function (e) {
    var that = this;
    that.setData({
      inputVal: e.detail.value,
      inputShow: true
    })
  },
  //根据城市获取天气信息
  getWeatherData: function (city) {
    var that = this;
    wx.request({
      url: url + city,
      data: {},
      header: { 'content-type': 'application/json' },
      success: function (res) {
        var data = res.data;
        for (var index in data.HeWeather5[0].daily_forecast) {
          data.HeWeather5[0].daily_forecast[index].cond.src = "../images/" + data.HeWeather5[0].daily_forecast[index].cond.txt_d + ".png";
        }
        
        that.setData({
          cityWeather: data,
        });
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //定位地理位置
    wx.getLocation({
      success: function (res) {
        //获取经纬度
        var latitude = res.latitude;
        var longitude = res.longitude;
        //根据经纬度逆解析出地址
        var locationurl = "http://apis.map.qq.com/ws/geocoder/v1/?location=" + latitude + "," + longitude + "&key=GPPBZ-RFNHO-VLRWL-SA4TR-CL5G6-42F6N";
        wx.request({
          url: locationurl,
          data: {},
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            //得到详细地址
            var data = res.data;
            that.setData({
              inputVal: data.result.address_component.city,
              currentCity: data.result.address_component.city,
              district: data.result.address_component.district
            });
            //区不为空则查询区天气，为空则查当前城市天气
            //that.getWeatherData(that.data.district == "" ? that.data.currentCity : that.data.district);
            that.getWeatherData(that.data.currentCity);
          },
          //获取地址失败，则手动输入
          fail: function (res) {
            that.setData({
              inputShow: true,
              inputVal: "",
              currentCity: "定位失败，请手动输入"
            });
          }
        });
      },
      //获取经纬度失败，则手动输入
      fail: function (res) {
        that.setData({
          inputShow: true,
          inputVal: "",
          currentCity: "定位失败，请手动输入"
        });
      }
    })
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