var mcFly = require('../dispatchers/mcfly')
,   _ = require('lodash');

var _mockPosts = [
  {
    postId: "111",
    topicId: "aaa",
    title: "BEST GIRL THREAD!",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In dapibus augue eu eleifend laoreet. Nulla mattis porttitor enim, aliquam pharetra neque lobortis a. Nam et volutpat dolor. In augue velit, bibendum at est vitae, consequat tristique purus. Cras turpis nibh, sodales vel dictum in, molestie sit amet neque. Suspendisse magna urna, lacinia in nunc non, mollis vehicula arcu. Nulla porttitor enim non nulla tempus, viverra placerat risus scelerisque. Vivamus scelerisque aliquam ullamcorper. Fusce sodales ultricies justo, eu tincidunt ipsum sodales lacinia."
  },
  {
    postId: "222",
    topicId: "aaa",
    title: "I ❤️ ASUKA",
    content: "In dapibus augue eu eleifend laoreet. Nulla mattis porttitor enim, aliquam pharetra neque lobortis a. Nam et volutpat dolor. In augue velit, bibendum at est vitae, consequat tristique purus. Cras turpis nibh, sodales vel dictum in, molestie sit amet neque. Suspendisse magna urna, lacinia in nunc non, mollis vehicula arcu. Nulla porttitor enim non nulla tempus, viverra placerat risus scelerisque. Vivamus scelerisque aliquam ullamcorper. Fusce sodales ultricies justo, eu tincidunt ipsum sodales lacinia."
  },
  {
    postId: "333",
    topicId: "aaa",
    title: "Prison School Episode 2 Torrent 720p",
    content: "Nulla mattis porttitor enim, aliquam pharetra neque lobortis a. Nam et volutpat dolor. In augue velit, bibendum at est vitae, consequat tristique purus. Cras turpis nibh, sodales vel dictum in, molestie sit amet neque. Suspendisse magna urna, lacinia in nunc non, mollis vehicula arcu. Nulla porttitor enim non nulla tempus, viverra placerat risus scelerisque. Vivamus scelerisque aliquam ullamcorper. Fusce sodales ultricies justo, eu tincidunt ipsum sodales lacinia."
  },
  {
    postId: "444",
    topicId: "aaa",
    title: "anime sucks.",
    content: "Nam et volutpat dolor. In augue velit, bibendum at est vitae, consequat tristique purus. Cras turpis nibh, sodales vel dictum in, molestie sit amet neque. Suspendisse magna urna, lacinia in nunc non, mollis vehicula arcu. Nulla porttitor enim non nulla tempus, viverra placerat risus scelerisque. Vivamus scelerisque aliquam ullamcorper. Fusce sodales ultricies justo, eu tincidunt ipsum sodales lacinia."
  }
];

var PostActions = mcFly.createActions({
  getPost: function(postId) {
    var data = _.find(_mockPosts, 'postId', postId);
    return {
      actionType: "POST_GET",
      data: data
    };
  },
  loadPosts: function(topicId) {
    var data = _.where(_mockPosts, {topicId: topicId});
    return {
      actionType: "POSTS_LOAD",
      data: data
    };
  }
});

module.exports = PostActions;