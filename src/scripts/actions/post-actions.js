var mcFly = require('../dispatchers/mcfly')
,   promises = require('../promises')
,   _ = require('lodash');

var PostActions = mcFly.createActions({
  deletePost: function(_id) {
    this.dispatch({
      actionType: "POST_DELETED",
      data: _id
    });
    // var self = this;
    // promises.deletePromise('posts/' + _id).then(function(result) {
    //   console.log(result);
    //   if (result.status === 'success') {
    //     self.dispatch({
    //       actionType: "POST_DELETED",
    //       data: _id
    //     });
    //   }
    // }).catch(function(err) {
    //   console.err(err);
    // });
  },
  createPost: function(post) {
    this.dispatch({
      actionType: "POST_CREATED",
      data: post
    });
    // var self = this;
    // promises.postPromise('posts', data).then(function(result) {
    //   self.dispatch({
    //     actionType: "POST_CREATED",
    //     data: result.post
    //   });
    // }).catch(function(err) {
    //   console.err(err);
    // });
  },
  updatePost: function(post) {
    this.dispatch({
      actionType: "POST_UPDATED",
      data: post
    });
  },
  loadPosts: function(topic) {
    this.dispatch({
      actionType: "POSTS_LOAD",
      data: topic
    });
    // var self = this;
    // promises.getPromise('topics/' + topicId).then(function(result) {
    //   self.dispatch({
    //     actionType: "POSTS_LOAD",
    //     data: result.topic
    //   });
    // }).catch(function(err) {
    //   console.err(err);
    // });
  }
});

module.exports = PostActions;