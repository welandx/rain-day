// 引用百度地图微信小程序JSAPI模块 
var bmap = require('../libs/bmap-wx.js');
Page({
  data: {
    weatherData: '',
    needmess:'',
      },
  onShow: function () {
    var that = this;
    // 新建百度地图对象 
    var BMap = new bmap.BMapWX({
      ak: 'NZE7pLzu89C8fr7ScTEsS9ML0Xb3wcP2'//bmapak
    });
    var fail = function (data) {
      console.log(data)
    };
    var success = function (data) {
      var weatherData = data.currentWeather[0];
      weatherData = '城市：' + weatherData.currentCity + '\n' + 'PM2.5：' + weatherData.pm25 + '\n' + '日期：' + weatherData.date + '\n' + '温度：' + weatherData.temperature + '\n' + '天气：' + weatherData.weatherDesc + '\n' + '风力：' + weatherData.wind + '\n';
      console.log("zec");
      var str = data.currentWeather[0].weatherDesc;
      console.log(str.indexOf("lei") != -1);
      if (str.indexOf("雪") != -1||str.indexOf("雨")!=-1){
        that.setData({
          needmess:"1",
          
        })
      }
      else {
        that.setData({
          needmess:"0",})
      };
    
      console.log(data.currentWeather[0].weatherDesc);
      that.setData({
        weatherData: weatherData,
        
      });
    }
    // 发起weather请求 
    BMap.weather({
      fail: fail,
      success: success
    });
  },
   
   onLoad: function () {
    var _this=this;
     setTimeout(function () { 
       console.log("Hello")
       wx.request({
         url: 'http://api.heclouds.com/devices/562203353/datapoints?type=3',
         header: {
           'content-type': 'application/json',
           'api-key': 'K6LyVQuXzSb19S7z026neCXxfAY=',
         },
         method: 'POST',
         data: {
           "datastreams": _this.data.needmess
         },
         success: function (res) {
           console.log(res.data);
           _this.setData(
             {
             
             });
         },
         fail: function () {
           console.log("fail");
           wx.showToast({
             title: '与服务器通信失败',
             icon: 'fail',

             duration: 2000
           })
         }
       }) }, 2000)

  },


})
