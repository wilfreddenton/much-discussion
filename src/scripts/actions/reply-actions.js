var mcFly = require('../dispatchers/mcfly')
,   promises = require('../promises')
,   _ = require('lodash');

var _mockReplies = [
  {
    _id: "424334",
    postId: "111",
    time: 1437314011397,
    text: "Asuna from Sword Art Online no doubt."
  },
  {
    _id: "848758",
    postId: "111",
    time: 1437314059191,
    text: "Holo, obviously."
  },
  {
    _id: "476589",
    postId: "111",
    time: 1437314111162,
    text: "Your mom hahaha"
  },
  {
    _id: "585876",
    postId: "222",
    time: 1437321472237,
    text: "Asuka is awesome!"
  },
  {
    _id: "847595",
    postId: "333",
    time: 1437321528070,
    text: "This show really is weird."
  },
  {
    _id: "485509",
    postId: "444",
    time: 1437321560855,
    text: "RAGE RAGE RAGE RAGE!!!"
  }
];

var ReplyActions = mcFly.createActions({
  createReply: function(reply) {
    var self = this;
    promises.postPromise('replies', reply).then(function(result) {
      self.dispatch({
        actionType: "REPLY_CREATED",
        data: result.reply
      });
    }).catch(function(err) {
      console.err(err);
    });
  },
  deleteReply: function(data) {
    this.dispatch({
      actionType: "REPLY_DELETED",
      data: data
    });
  },
  loadReplies: function(data) {
    var self = this;
    promises.getPromise('replies/' + data).then(function(result) {
      self.dispatch({
        actionType: "REPLIES_LOAD",
        data: result.replies
      });
    }).catch(function(err) {
      console.err(err);
    });
  }
});

module.exports = ReplyActions;