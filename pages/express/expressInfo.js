
var WxParse = require('../../utils/wxParse/wxParse.js');
var url = "http://localhost:9527/api/express/GetExpressLineByNoAndCode?";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    express: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var expressNo = options.expressNo;
    var expressCode = options.expressCode;

    wx.request({
      url: url + "expressNo=" + expressNo + "&" + "expressCode=" + expressCode,
      data: {},
      success: function (res) {
        var data = res.data;
        that.setData({
          express: data
        });
        var expressList = that.data.express;
        var htmlItem = ``;
        for (var index in expressList) {
          var liItem = index == '0' ? `<li class="first">` : `<li>`;
          htmlItem += liItem + `<p>`+ expressList[index].AcceptTime + `</p>
                                <p>`+ expressList[index].AcceptStation + `</p>
                                <span class="before"></span><span class="after"></span><i class="mh-icon mh-icon-new"></i></li>`;
        }

        var article = `
                    <div data-mohe-type="kuaidi_new" class="g-mohe " id="mohe-kuaidi_new">
                    <div id="mohe-kuaidi_new_nucom">
                    <div class="mohe-wrap mh-wrap">
                    <div class="mh-cont mh-list-wrap mh-unfold">
                    <div class="mh-list">
                        <ul>
                            `+ htmlItem + `
                        </ul>
                    </div>
                    </div>
                    </div>
                    </div>
                    </div>`;
        WxParse.wxParse('article', 'html', article, that, 5);
      }
    });
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