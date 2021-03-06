// pages/list/list.js
'use strict';

// 获取全局应用程序实例对象
var app = getApp();

Page({
  data: {
    title: '',
    subtitle: '加载中...',
    type: 'in_theaters',
    loading: true,
    hasMore: true,
    page: 1,
    size: 20,
    movies: []
  },
  handleLoadMore: function handleLoadMore() {
    var _this = this;
    if (!this.data.hasMore) return;
    this.setData({ subtitle: '加载中...', loading: true });
    return app.douban.find(this.data.type, this.data.page++, this.data.size).then(function (d) {
      if (d.subjects.length) {
        _this.setData({ subtitle: d.title, movies: _this.data.movies.concat(d.subjects), loading: false });
      } else {
        _this.setData({ subtitle: d.title, hasMore: false, loading: false });
      }
    }).catch(function (e) {
      _this.setData({ subtitle: '获取数据异常', loading: false });
      console.error(e);
    })
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.data.title = options.title || this.data.title;
    // 类型： in_theaters  coming_soon  us_box
    this.data.type = options.type || this.data.type;
    this.handleLoadMore();
  },
   onPullDownRefresh: function onPullDownRefresh() {
    this.setData({ movies: [], page: 1, hasMore: true });
    this.handleLoadMore().then(function () {
      return app.wechat.original.stopPullDownRefresh();
    });
  },
  onReady: function () {
    // 页面渲染完成
    wx.setNavigationBarTitle({ title: this.data.title + ' < 电影 < 豆瓣' });
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})