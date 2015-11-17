
var React = require('react/addons'),
    CommentList = require('./CommentList'),
    CommentForm = require('./CommentForm');
    
var CommentBox = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  loadCommentsFromServer:function(){
    //this.setState({data: authorInfo});
  },
  componentDidMount:function(){
    this.loadCommentsFromServer();
    //setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    
  },
  handleCommentSubmit:function(comment){
    //authorInfo.push(comment);
  },
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.props.data} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }
});


module.exports = CommentBox;