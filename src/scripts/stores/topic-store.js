var mcFly = require('../dispatchers/mcfly')
,   _ = require('lodash');

var _topics = [];

var TopicStore = mcFly.createStore({
  getTopics: function() {
    return _topics;
  },
  getTopic: function(topicId) {
    return _.find(_topics, '_id', topicId);
  },
  createTopic: function(topic) {
    _topics.push(topic);
  },
  deleteTopic: function(topicId) {
    _.remove(_topics, function(topic) {
      return topic._id === topicId;
    });
  },
  loadTopics: function(topics) {
    _topics = topics;
  }
}, function(payload) {
  switch(payload.actionType) {
    case "TOPICS_LOAD":
      TopicStore.loadTopics(payload.data);
      TopicStore.emitChange();
      break;
    case "TOPIC_CREATED":
      TopicStore.createTopic(payload.data);
      TopicStore.emitChange();
      break;
    case "TOPIC_DELETED":
      TopicStore.deleteTopic(payload.data);
      TopicStore.emitChange();
      break;
  }
});

module.exports = TopicStore;