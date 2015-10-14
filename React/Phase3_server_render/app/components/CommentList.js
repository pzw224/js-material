/** @jsx React.DOM */

var React = require('react/addons'),
    Comment = require('./Comment');

var CommentList = React.createClass({
  displayName:'CommentList',
  render: function() {
  	var commentNodes = this.props.data.map(function(comment){
  		return (
	        <Comment author={comment.author} text={comment.text}>
	        </Comment>
	    );
  	});

  	return (
  		<div className="commentList">
  			{commentNodes}
  		</div>
  		)
  }
});

module.exports = CommentList;