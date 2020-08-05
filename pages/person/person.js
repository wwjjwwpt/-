// pages/person/person.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:['运动小白','运动常客','运动健将'],
    userListInfo : [{
      icon:'/images/chenghao.jpg',
      text: '运动称号',
      content:'运动小白'
    },
    {
      icon:'/images/chenghao.jpg',
      text: '成功匹配数',
      content:'0'
    },{
      icon: "/images/uinfo.jpg",
      text: '身高',
      content:'请单击修改资料'
    },{
      icon:'/images/uinfo.jpg',
      text: '体重',
      content:'请单击修改资料'
  },{
    icon:'/images/uinfo.jpg',
    text: '年龄',
    content:'请单击修改资料'
},]
  },
  createorder: function (){
    wx.navigateTo({
      url: e.currentTarget.dataset.item.url,
    })
  },
getinfo:function(){
  console.log("++++++++++++++++")
  wx.request({
    url: 'https://www.nchusoftware.online:8888/getuinfo',
    method:"POST",
    data: {
      opid: app.globalData.openid,
    },
    success: res => {
      if (res.statusCode == 200) {
        if(res.data[0].fields.ordernum<10)
        {
          var a = this.data.title[0]
        }
        else if(res.data[0].fields.ordernum>=10&&res.data[0].fields.ordernum<50)
        {
          var a  = this.data.title[1]
        }
        else
        {
          var a = this.data.title[2]
        }
        this.setData({
          userListInfo : [{
            icon:'/images/chenghao.jpg',
            text: '运动称号',
            content:a
          },
          {
            icon:'/images/chenghao.jpg',
            text: '成功匹配数',
            content:res.data[0].fields.ordernum
          },{
            icon: "/images/uinfo.jpg",
            text: '身高',
            content:res.data[0].fields.height+'cm'
          },{
            icon:'/images/uinfo.jpg',
            text: '体重',
            content:res.data[0].fields.weight+'kg'
        },{
          icon:'/images/uinfo.jpg',
          text: '年龄',
          content:res.data[0].fields.age
      },],
          result: res.data
        })
      }
    }
  })},
  change:function (){
    wx.navigateTo({
      url: '../change/change'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getinfo()
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
    this.getinfo()
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