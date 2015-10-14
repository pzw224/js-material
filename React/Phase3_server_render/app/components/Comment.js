/** @jsx React.DOM */

var React = require('react/addons');

var Comment = React.createClass({
  displayName:'Comment',
  render: function() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        <span>{this.props.text}</span>
      </div>
    );
  }
});

module.exports = Comment;