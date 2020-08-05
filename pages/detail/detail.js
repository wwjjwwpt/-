// pages/about/about.js
const app = getApp()
Page({
      
  /**
   * 页面的初始数据
   */
  data: {
    resultflag: false,
    contents:[
      {
        usernickname : "wen",
        content:"运动运动" ,
        time:"01:38:29",
        date:"2020-05-17"
      },
      {
        usernickname: "wenjjw",
        content: "冲冲冲",
        time: "06:38:11",
        date: "2020-05-17"
      }
      
    ],
    sportArray: ['请选择运动', '篮球', '足球', '乒乓球', '羽毛球', '跑步', '爬山', '健身'],
    numArray: ['请选择人数', '2', '3', '4', '5', '6', '10', '11'],
    levelArray: ['请选择水平', '新手', '入门', '掌握', '精通'],
    genderArray: ['请选择性别', '同性', '不限'],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  contentInput: function (e) {
    this.setData({
      content: e.detail.value
    })
  },
  onGotUserInfo: function (e) {
    console.log("nickname=" + e.detail.userInfo.nickName);
    console.log(this.data.content)
     wx.request({
       url: 'https://www.nchusoftware.online:8888/getcontent',
       method: "POST",
       data: {
         openid: app.globalData.openid,
         order_id: this.data.order_id,
         name: e.detail.userInfo.nickName,
         content:this.data.content
       },
       success: res => {
         console.log(res.data)
         if (res.statusCode == 200) {
           this.getcontent()
           wx.showToast({
             title: '提交成功',
           })
         }
           else {
             wx.showToast({
               title: '发表失败',
               icon: "none"
             })
           }
         }
     })
  },
  bindfocus: function (e) {

    let that = this;

    let height = 0;

    let height_02 = 0;

    wx.getSystemInfo({
      success: function (res) {
        height_02 = res.windowHeight;
      }
    })
    height = e.detail.height;
    that.setData({
      height: height,
    })
    console.log('获得焦点的 e is', height);
    console.log('获得焦点的 e is', e);
  },
  //监听input失去焦点
  bindblur: function (e) {
    this.setData({
      height: 0,
      inputShow: false,
    });
    console.log('失去焦点的 e is', e);
  },
  getcontent: function () {
    console.log("dsad",11213)
    wx.request({
      url: 'https://www.nchusoftware.online:8888/content',
      method: "POST",
      data: {
        order_id: this.data.order_id
      },
      success: res => {
        console.log(res.data)
        if (res.statusCode == 200) {
          if (res.data.length == 0) { // "",[]
            console.log("为空");
          }
          else {
            console.log("123213",this.dataorder_id)
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
  },
  onLoad: function (options) {
    var list = JSON.parse(options.item)
    var date= list.P_createdatetime.split("T");
    this.setData({
      order_id: options.order_id,
      elist: list,
      date: date
    })
    console.log("tets",this.data.order_id)
    this.getcontent()
    
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
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.getcontent()
    //模拟加载
    wx.showToast({
      title: '刷新成功'
    })
    setTimeout(function () {

      // complete

      wx.hideNavigationBarLoading() //完成停止加载

      wx.stopPullDownRefresh() //停止下拉刷新

    }, 1500);
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