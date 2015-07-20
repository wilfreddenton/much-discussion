var mcFly = require('../dispatchers/mcfly')
,   _ = require('lodash');

var _replies = [];

var ReplyStore = mcFly.createStore({
  getReplies: function(postId) {
    var replies = _.where(_replies, {postId: postId});
    return replies;
  },
  createReply: function(reply) {
    _replies.push(reply);
  },
  deleteReply: function(replyId) {
    _.remove(_replies, function(reply) {
      return reply._id === replyId;
    });
  },
  loadReplies: function(replies) {
    _replies = replies;
  }
}, function(payload) {
  switch(payload.actionType) {
    case "REPLIES_LOAD":
      ReplyStore.loadReplies(payload.data);
      ReplyStore.emitChange();
      break;
    case "REPLY_CREATED":
      ReplyStore.createReply(payload.data);
      ReplyStore.emitChange();
      break;
    case "REPLY_DELETED":
      ReplyStore.deleteReply(payload.data);
      ReplyStore.emitChange();
      break;
  }
});

module.exports = ReplyStore;