var mcFly = require('../dispatchers/mcfly')
,   _ = require('lodash');

var _posts = [];

var PostStore = mcFly.createStore({
  getPosts: function() {
    return _posts;
  },
  getPost: function(postId) {
    return _.find(_posts, '_id', postId);
  },
  deletePost: function(postId) {
    _.remove(_posts, function(post) {
      return post._id === postId;
    });
  },
  createPost: function(post) {
    _posts.push(post);
  },
  updatePost: function(post) {
    _.remove(_posts, function(oldPost) {
      return oldPost._id === post._id;
    });
    _posts.push(post);
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
    case "POST_DELETED":
      PostStore.deletePost(payload.data);
      PostStore.emitChange();
      break;
    case "POST_CREATED":
      PostStore.createPost(payload.data);
      PostStore.emitChange();
      break;
    case "POST_UPDATED":
      PostStore.updatePost(payload.data);
      PostStore.emitChange();
      break;
    case "POST_GET":
      PostStore.updatePost(payload.data);
      PostStore.emitChange();
      break;
  }
});

module.exports = PostStore;