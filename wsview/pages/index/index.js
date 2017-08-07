var app = getApp();
Page({
  data: {
    currentId: '1001',
    section: [
      { name: '推荐', id: '1001' },
      { name: '视频', id: '1002' },
      { name: '热点', id: '1003' },
      { name: '娱乐', id: '1004' },
      { name: '搞笑', id: '1005' },
      { name: '军事', id: '1006' },
      { name: '历史', id: '1007' },
    ],
    news: [
      {
        url: "/pages/details/index",
        content: "杀妻骗保！男子外有小三并欠债 为妻买400万保险后谋划车祸",
        id: '001'
      }
    ]
  },
  onReady: function () {
    var self=this;
    wx.showLoading({
      title: '加载中',
      mask:true
    });
    wx.request({
      url: 'https://ljm.jiangwei58.cn/getnews?p=1',
      data: {
      
      },
      success: function (res) {
        self.setData({ news: res.data.list.data });
        wx.hideLoading()
      }
    })
  },
  handleTap: function (e) {
    let id = e.currentTarget.id;
    if (id) {
      this.setData({ currentId: id })
      this.onLoad();
    }
  }
})
