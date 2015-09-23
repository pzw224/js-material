var CommentBox = React.createClass({
	render:function(){
		return (
			<div className="commentBox">
				<h1>Comments</h1>
				<CommentList />
				<CommentForm />
			</div>
			)
	}
});



/*
var CommentBox = React.createClass({
	render:function(){
		return (
			<div className="commentBox">
	            Hello, world! I am a CommentBox.
	        </div>
			)
	};
});

React.render(
	<CommentBox />
	document.getElementById('content');
	);
*/