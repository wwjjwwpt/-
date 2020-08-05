//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    markers:[],
    times:'请选择时间',
    dates:'请选择日期',
    address:'选择地址',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    Gender: 'female',
    plist: {0: {
      name: '你的年龄',
      sportArray: ['请选择年龄', '<10','10-15','15-20','20-25','25-35','35-45','45-60','>60'],
      sportIndex: 0
    },
    1:{
    name:'运动项目',
    sportArray: ['请选择运动','篮球', '足球', '乒乓球', '羽毛球', '跑步','爬山','健身'],
    sportIndex: 0},
      2:{
        name:'运动人数',
        sportArray: ['请选择人数', '2', '3', '4', '5', '6', '10', '11'],
        sportIndex: 0
      },
      3: {
        name: '运动水平',
        sportArray: ['请选择水平', '新手','入门','掌握','精通'],
        sportIndex: 0
      },
      4: {
        name: '伙伴性别',
        sportArray: ['请选择性别', '同性','不限'],
        sportIndex: 0
      }},
    items: [
      { name: 'male', value: '男' },
      { name: 'female', value: '女', checked: 'true' },
    ]
  },
  bindupset:function(){
    console.log('提交中,验证数据填写中')
    var flag =1;
    for(var i=0;i<4;i++){
    if (this.data.plist[i].sportIndex == 0) {
      flag = 0;
      wx.showToast({
        title: this.data.plist[i].sportArray[0],
        icon: "none",
        duration: 2000,
      })
      break;
    }}
    if (flag && this.data.dates == '请选择日期') {
      flag = 0;
      wx.showToast({
        title: this.data.dates,
        icon: "none",
        duration: 2000,
      })
    }
    if (flag && this.data.times == '请选择时间') {
      flag = 0;
      wx.showToast({
        title: this.data.times,
        icon: "none",
        duration: 2000,
      })
    }
    if (flag && this.data.address == '选择地址') {
      flag = 0;
      wx.showToast({
        title: this.data.address,
        icon: "none",
        duration: 2000,
      })
    }
    if(flag ==1){
      console.log('数据比对成功')
      console.log(this.data.dates,)
      wx.request({
        url: 'https://www.nchusoftware.online:8888/upset',
        method:"POST",
        data: {
          opid: app.globalData.openid,
          ugender:this.data.Gender,
          sportname: this.data.plist[1].sportIndex,
          sportnum: this.data.plist[2].sportIndex,
          sportlevel: this.data.plist[3].sportIndex,
          sportgender: this.data.plist[4].sportIndex,
          time: this.data.times,
          address: this.data.address,
          date: this.data.dates,
          longitude: this.data.longitudes,
          latitude: this.data.latitudes
        },
        success: res => {
          if (res.statusCode == 200) {
            wx.showToast({
              title: '提交成功',
              icon:'success',
              duration:2000
            })
            this.setData({
              result: res.data
            })
          }
        }
      })
      
      
    this.setData({

    })}
  },
  bindDateChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      dates: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      times: e.detail.value
    })
  },
  map: function () {
    var that = this
    wx.chooseLocation({
      success: function (res) {
        // success
        if (res.name == '') {
          that.setData({
            address: '选择位置',
          })
        } else {
          that.setData({
            latitudes: res.latitude,
            longitudes: res.longitude,
            address: res.name,
            markers: [{
              id: "0",
              latitude: res.latitude,
              longitude: res.longitude,
              iconPath: "/images/zuobiao.png",
              width: 20,
              height: 20,
}]
          })
        }
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })},
  bindCasPickerChange: function (e) {
    console.log('乔丹选的是', this.data.sportArray[e.detail.value])
    this.setData({
      sportIndex: e.detail.value
    })

  },
  radioChange: function (e) {
    console.log('值：', e.detail.value)
    this.setData({
      Gender: e.detail.value
    })
  },
  bindCasPickerChangelist: function (e) {
    let inkey = e.currentTarget.dataset.src
    let exp = this.data.plist
    exp[e.currentTarget.dataset.src].sportIndex = e.detail.value 
    console.log('乔丹选的是', this.data.plist[e.currentTarget.dataset.src])
    console.log('乔丹选的是', e.detail.value)
    this.setData({
      plist: exp
    })
    console.log('乔丹选的是', this.data.plist[e.currentTarget.dataset.src])

  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log(app.globalData.openid)
    console.log('mapload...');
    var that = this
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        console.log('纬度' + res.latitude);
        console.log('经度' + res.longitude);
        that.setData({
          latitudes: res.latitude,
          longitudes: res.longitude,
        })
      },})
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
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
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
},
)
