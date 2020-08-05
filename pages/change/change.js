// pages/change/change.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userListInfo : [{
      icon: "/images/uinfo.jpg",
      text: '身高',
      content:'请填写身高'
    },{
      icon:'/images/uinfo.jpg',
      text: '体重',
      content:'请填写体重'
  },{
    icon:'/images/uinfo.jpg',
    text: '年龄',
    content:'请填写年龄'
},]

  },
  contentInput: function (e) {
    this.setData({
      height: parseInt(e.detail.value)
    })
  },
  contentInput1: function (e) {
    this.setData({
      weight: parseInt(e.detail.value)
    })
  },
  contentInput2: function (e) {
    this.setData({
      age: parseInt(e.detail.value)
    })
  },
  setup:function()
  {
    if(isNaN(this.data.height)!=true&&isNaN(this.data.weight)!=true&&isNaN(this.data.age)!=true){
    wx.request({
      url: 'https://www.nchusoftware.online:8888/cuinfo',
      method: "POST",
      data: {
        opid: app.globalData.openid,
        height: this.data.height,
        weight: this.data.weight,
        age:this.data.age
      },
      success: res => {
        console.log(res.data)
        if (res.statusCode == 200) {
          wx.showToast({
            title: '提交成功',
          })
        }
          else {
            wx.showToast({
              title: '修改失败',
              icon: "none"
            })
          }
        }
      })}
      else{
          wx.showToast({
            title: '请输入数字',
            icon: "none"
          })
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