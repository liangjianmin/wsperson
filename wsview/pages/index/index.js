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
        url:"/pages/details/index",
        content: "杀妻骗保！男子外有小三并欠债 为妻买400万保险后谋划车祸",
        id: '001'
      },
      {
        url:"/pages/details/index",
        content: "广西桂林发现珍稀古老物种雄王声猛蚁",
        id: '002'
      },
      {
        url: "/pages/details/index",
        content: "习近平：绝不允许任何人把任何一块中国领土从中国分裂出去",
        id: '003'
      },
      {
        url: "/pages/details/index",
        content: "杀妻骗保！男子外有小三并欠债 为妻买400万保险后谋划车祸",
        id: '001'
      },
      {
        url: "/pages/details/index",
        content: "广西桂林发现珍稀古老物种雄王声猛蚁",
        id: '002'
      },
      {
        url: "/pages/details/index",
        content: "习近平：绝不允许任何人把任何一块中国领土从中国分裂出去",
        id: '003'
      },
      {
        url: "/pages/details/index",
        content: "杀妻骗保！男子外有小三并欠债 为妻买400万保险后谋划车祸",
        id: '001'
      },
      {
        url: "/pages/details/index",
        content: "广西桂林发现珍稀古老物种雄王声猛蚁",
        id: '002'
      },
      {
        url: "/pages/details/index",
        content: "习近平：绝不允许任何人把任何一块中国领土从中国分裂出去",
        id: '003'
      }
    ]
  },
  onLoad: function () {

  },
  handleTap: function (e) {
    let id = e.currentTarget.id;
    if (id) {
      this.setData({ currentId: id })
      this.onLoad();
    }
  }
})
