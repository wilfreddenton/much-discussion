var mcFly = require('../dispatchers/mcfly')
,   promises = require('../promises')
,   _ = require('lodash');

var _mockPosts = [
  {
    _id: "111",
    topicId: "aaa",
    title: "BEST GIRL THREAD!",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In dapibus augue eu eleifend laoreet. Nulla mattis porttitor enim, aliquam pharetra neque lobortis a. Nam et volutpat dolor. In augue velit, bibendum at est vitae, consequat tristique purus. Cras turpis nibh, sodales vel dictum in, molestie sit amet neque. Suspendisse magna urna, lacinia in nunc non, mollis vehicula arcu. Nulla porttitor enim non nulla tempus, viverra placerat risus scelerisque. Vivamus scelerisque aliquam ullamcorper. Fusce sodales ultricies justo, eu tincidunt ipsum sodales lacinia."
  },
  {
    _id: "222",
    topicId: "aaa",
    title: "I ❤️ ASUKA",
    content: "In dapibus augue eu eleifend laoreet. Nulla mattis porttitor enim, aliquam pharetra neque lobortis a. Nam et volutpat dolor. In augue velit, bibendum at est vitae, consequat tristique purus. Cras turpis nibh, sodales vel dictum in, molestie sit amet neque. Suspendisse magna urna, lacinia in nunc non, mollis vehicula arcu. Nulla porttitor enim non nulla tempus, viverra placerat risus scelerisque. Vivamus scelerisque aliquam ullamcorper. Fusce sodales ultricies justo, eu tincidunt ipsum sodales lacinia."
  },
  {
    _id: "333",
    topicId: "aaa",
    title: "Prison School Episode 2 Torrent 720p",
    content: "Nulla mattis porttitor enim, aliquam pharetra neque lobortis a. Nam et volutpat dolor. In augue velit, bibendum at est vitae, consequat tristique purus. Cras turpis nibh, sodales vel dictum in, molestie sit amet neque. Suspendisse magna urna, lacinia in nunc non, mollis vehicula arcu. Nulla porttitor enim non nulla tempus, viverra placerat risus scelerisque. Vivamus scelerisque aliquam ullamcorper. Fusce sodales ultricies justo, eu tincidunt ipsum sodales lacinia."
  },
  {
    _id: "444",
    topicId: "aaa",
    title: "anime sucks.",
    content: "Nam et volutpat dolor. In augue velit, bibendum at est vitae, consequat tristique purus. Cras turpis nibh, sodales vel dictum in, molestie sit amet neque. Suspendisse magna urna, lacinia in nunc non, mollis vehicula arcu. Nulla porttitor enim non nulla tempus, viverra placerat risus scelerisque. Vivamus scelerisque aliquam ullamcorper. Fusce sodales ultricies justo, eu tincidunt ipsum sodales lacinia."
  }
];

var PostActions = mcFly.createActions({
  deletePost: function(_id) {
    var self = this;
    promises.deletePromise('posts/' + _id).then(function(result) {
      console.log(result);
      if (result.status === 'success') {
        self.dispatch({
          actionType: "POST_DELETED",
          data: _id
        });
      }
    }).catch(function(err) {
      console.err(err);
    });
  },
  createPost: function(data) {
    var self = this;
    promises.postPromise('posts', data).then(function(result) {
      self.dispatch({
        actionType: "POST_CREATED",
        data: result.post
      });
    }).catch(function(err) {
      console.err(err);
    });
  },
  loadPosts: function(topicId) {
    var self = this;
    promises.getPromise('topics/' + topicId).then(function(result) {
      self.dispatch({
        actionType: "POSTS_LOAD",
        data: result.topic
      });
    }).catch(function(err) {
      console.err(err);
    });
  }
});

module.exports = PostActions;