//index.js
//获取应用实例
const app = getApp()
const QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
Page({
  data: {
    tests:[1,2,3],
    resultflag:false,
    resultflag1:false,
    motto: 'Hello World',
    sportArray: ['请选择运动', '篮球', '足球', '乒乓球', '羽毛球', '跑步', '爬山', '健身'],
    numArray: ['请选择人数', '2', '3', '4', '5', '6', '10', '11'],
    levelArray: ['请选择水平', '新手', '入门', '掌握', '精通'],
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    background: "/images/simba.png",
    location_text: '北京',
    temperature: '30°',
    now_weather: '晴',
    now_air: '优',
    today: '2019-09-12',
    today_weather: '晴转多云'
  },
  pdirtodet: function (e) {
    var item = JSON.stringify(e.currentTarget.dataset.item.fields);
    var order_id = e.currentTarget.dataset.item.pk
    console.log(order_id)
    wx.navigateTo({
      url: '../pdetail/pdetail?item=' + item + '&order_id=' + order_id,
    })
  },
  dirtodet:function(e){
    var item = JSON.stringify(e.currentTarget.dataset.item.fields);
    var order_id = e.currentTarget.dataset.item.pk
    console.log(order_id)
    wx.navigateTo({
      url: '../detail/detail?item=' + item + '&order_id=' + order_id,
    })
  } ,
  getenlist: function () {
    console.log(app.globalData.openid)
    wx.request({
      url: 'https://www.nchusoftware.online:8888/findorder',
      method: "POST",
      data: {
        openid: app.globalData.openid
      },
      success: res => {
        console.log(res.data)
        if (res.statusCode == 200) {
          if (res.data.length == 0) { // "",[]
            console.log("为空");
            this.setData({
              resultflag: false,
            })
          }
          else {
            this.setData({
              resultflag: true,
            })
          }
          this.setData({
            result: res.data,

          })
        }
      }
    })
  }
  ,
  getsucenlist: function () {
    console.log(app.globalData.openid)
    wx.request({
      url: 'https://www.nchusoftware.online:8888/findsucorder',
      method: "POST",
      data: {
        openid: app.globalData.openid
      },
      success: res => {
        console.log(res.data)
        if (res.statusCode == 200) {
          if (res.data.length == 0) { // "",[]
            console.log("为空");
          }
          else {
            this.setData({
              resultflag1: true,
            })
          }
          this.setData({
            result1: res.data,

          })
        }
      }
    })
  },

  createorder: function (){
    wx.switchTab({
      url: '../pipei/pipei',
    })
  },
  onPullDownRefresh: function () {
    console.log('onPullDownRefresh')
    this.getenlist()
    this.getsucenlist()
    wx.showToast({
      title: '刷新成功',
    })
  },
  //图片转base64
  onLoad: function (options) {
    //设置背景图片
    let base64 = wx.getFileSystemManager().readFileSync(this.data.background, 'base64');
    this.setData({
      'background': 'data:image/png;base64,' + base64
    });
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    this.qqmapsdk = new QQMapWX({
      key: 'U7ZBZ-3P33I-KZ3GF-5LTVU-J6NCK-U4BHD'
    })
    this.getCityAndWeather()

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getCityAndWeather() {
    var that = this;
    wx.getLocation({
      success: res => {
        this.location_pin = res.longitude + ',' + res.latitude
        this.qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: res2 => {
            let city = res2.result.address_component.city
            that.setData({
              location_text: city,
            })
            that.getNowWeather()
          },
          fail: () =>{
          }
        })
      },
      fail: () => {
        console.log('未授权位置');
      }
    })
  },
  getNowWeather() {
    let that = this
    let hfkey = '98841c70ecbe40a19acbf5554322ab89'
    let url = 'https://free-api.heweather.net/s6/weather/now?key=' + hfkey + '&location=' + this.location_pin
    wx.request({
      url: url,
      success: function (res) {
        console.log('success')
        //获取用户信息
        console.log(app.globalData.openid)
        that.getenlist()
        that.getsucenlist()
        let nowData = res.data.HeWeather6[0].now;
        //温度数据
        let temperature = nowData.tmp
        //当前天气文字描述
        let now_weather = nowData.cond_txt
        // 今日日期
        var date = new Date()
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
        that.setData({
          temperature: temperature + '°',
          now_weather: now_weather,
          today: year + '-' + month + '-' + day
        })
      },
      fail: function (res) {
        console.log('asdsad')
      }
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
