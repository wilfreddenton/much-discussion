var mcFly = require('../dispatchers/mcfly');

var _mockTopics = [
  {
    _id: "aaa",
    name: "Anime/Manga"
  },
  {
    _id: "ccc",
    name: "Music"
  },
  {
    _id: "ddd",
    name: "Programming"
  },
  {
    _id: "bbb",
    name: "Technology/Science"
  }
];

var TopicActions = mcFly.createActions({
  loadTopics: function() {
    return {
      actionType: "TOPICS_LOAD",
      data: _mockTopics
    };
  }
});

module.exports = TopicActions;