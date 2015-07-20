var mcFly = require('../dispatchers/mcfly')
,   promises = require('../promises')
,   _ = require('lodash');

var ReplyActions = mcFly.createActions({
  createReply: function(reply) {
    this.dispatch({
      actionType: "REPLY_CREATED",
      data: reply
    });
    // var self = this;
    // promises.postPromise('replies', reply).then(function(result) {
    //   self.dispatch({
    //     actionType: "REPLY_CREATED",
    //     data: result.reply
    //   });
    // }).catch(function(err) {
    //   console.error(err);
    // });
  },
  deleteReply: function(data) {
    this.dispatch({
      actionType: "REPLY_DELETED",
      data: data
    });
  },
  loadReplies: function(replies) {
    this.dispatch({
      actionType: "REPLIES_LOAD",
      data: replies
    });
    // var self = this;
    // promises.getPromise('replies/' + data).then(function(result) {
    //   self.dispatch({
    //     actionType: "REPLIES_LOAD",
    //     data: result.replies
    //   });
    // }).catch(function(err) {
    //   console.error(err);
    // });
  }
});

module.exports = ReplyActions;