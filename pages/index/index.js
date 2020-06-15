const app = getApp()

Page({
  data: {
    update: '',
    basic:{},
    today:{},
    tomorrow:{},
    afterTomor:{},
    todayIcon:'../../img/999.png',
    tomorrowIcon:'../../img/999.png',
    afterTomorIcon:'../../img/999.png',
    now:{}
  },
  onShow: function () {
    this.getLocation();
  },
  //事件处理函数
  bindViewTap: function() {
    tt.navigateTo({
      url: '../logs/logs'
    })
  },
  getLocation:function(){
    var that = this;
    tt.getLocation({
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        that.getWeatherInfo(latitude, longitude);
        console.log("经度: " + longitude + "纬度: " + latitude);
      },
      fail(res){
        console.log("地理信息获取失败");
      }
    })
  },
  search: function(e){
    console.log(e.detail.value.longitude);
    this.getWeatherInfo(e.detail.value.latitude,e.detail.value.longitude);
  },
  getWeatherInfo: function (latitude, longitude){
    var _this = this;
    var key = 'a8626a43a7114490b80a510d48cea1aa';//和风天气key
    var url = 'https://free-api.heweather.com/s6/weather?key='+key+'&location=' + longitude + ',' + latitude;
    tt.request({
      url: url, 
      data: {},
      method: 'GET',
      success: function (res) {
        console.log(res.data.HeWeather6[0].daily_forecast);
        var daily_forecast_today = res.data.HeWeather6[0].daily_forecast[0];//今天预报
        var daily_forecast_tomorrow = res.data.HeWeather6[0].daily_forecast[1];//明天天预报
        var daily_forecast_afterTomor = res.data.HeWeather6[0].daily_forecast[2];//后天预报
        var basic = res.data.HeWeather6[0].basic;
        var now = res.data.HeWeather6[0].now;
        var update = res.data.HeWeather6[0].update.loc;//更新时间
        _this.setData({
          update:update,
          basic:basic,
          today: daily_forecast_today,
          tomorrow:daily_forecast_tomorrow,
          afterTomor: daily_forecast_afterTomor,
          todayIcon: '../../img/' + daily_forecast_today.cond_code_d+'.png', 
          tomorrowIcon: '../../img/' + daily_forecast_tomorrow.cond_code_d+'.png',
          afterTomorIcon: '../../img/' + daily_forecast_afterTomor.cond_code_d+'.png',
          now:now
        });
      }
    })
  }
})