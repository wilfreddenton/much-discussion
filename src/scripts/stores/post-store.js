var mcFly = require('../dispatchers/mcfly')
,   Dispatcher = mcFly.dispatcher
,   _ = require('lodash');

var _posts = [];

var PostStore = mcFly.createStore({
  getPosts: function() {
    return _posts;
  },
  getPost: function(postId) {
    return _.find(_posts, 'postId', postId);
  },
  updatePost: function(post) {
    var oldPost = this.getPost(post.postId);
    oldPost = post;
  },
  loadPosts: function(posts) {
    _posts = posts;
  }
}, function(payload) {
  switch(payload.actionType) {
    case "POSTS_LOAD":
      PostStore.loadPosts(payload.data);
      PostStore.emitChange();
      break;
    case "POST_GET":
      PostStore.updatePost(payload.data);
      PostStore.emitChange();
  }
});

module.exports = PostStore;