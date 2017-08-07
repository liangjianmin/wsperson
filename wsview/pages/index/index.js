var app = getApp();
Page({
  data: {
    current: 1,
    maxPage: 1,
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
    news: []
  },
  onReady: function () {
    var self = this;
    wx.showLoading({
      title: '加载中',
      mask: true
    });
    wx.request({
      url: 'https://ljm.jiangwei58.cn/getnews?p=' + self.data.current,
      success: function (res) {
        self.setData({ news: self.data.news.concat(res.data.list.data) });
        self.setData({ maxPage: res.data.maxPage });
        wx.hideLoading()
      }
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var self = this;
    var count = self.data.current++;
    if (count >= self.data.maxPage) {
      return false;
    }
    setTimeout(function () {
      self.onReady();
    }, 500)
  },
  handleTap: function (e) {
    let id = e.currentTarget.id;
    if (id) {
      this.setData({ currentId: id })
      this.onLoad();
    }
  }
})
