var mcFly = require('../dispatchers/mcfly')
,   promises = require('../promises');

var TopicActions = mcFly.createActions({
  loadTopics: function(topics) {
    this.dispatch({
      actionType: "TOPICS_LOAD",
      data: topics
    });
    // var self = this;
    // promises.getPromise('topics').then(function(result) {
    //   self.dispatch({
    //     actionType: "TOPICS_LOAD",
    //     data: result.topics
    //   });
    // }).catch(function(err) {
    //   console.err(err);
    // });
  },
  createTopic: function(topic) {
    this.dispatch({
      actionType: "TOPIC_CREATED",
      data: topic
    });
    // var self = this;
    // data = {name: data}
    // promises.postPromise('topics', data).then(function(result) {
    //   self.dispatch({
    //     actionType: "TOPIC_CREATED",
    //     data: result.topic
    //   });
    // }).catch(function(err) {
    //   console.err(err);
    // });
  },
  deleteTopic: function(data) {
    var self = this;
    promises.deletePromise('topics/' + data).then(function(result) {
      if (result.status === 'success') {
        self.dispatch({
          actionType: "TOPIC_DELETED",
          data: data
        });
      } else {
        throw 'topic was not deleted';
      }
    }).catch(function(err) {
      console.err(err);
    });
  }
});

module.exports = TopicActions;