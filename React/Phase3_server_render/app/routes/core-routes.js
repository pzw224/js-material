var React = require('react'),
	ReactDom = require('react-dom/server'),
	 CommentBox = React.createFactory(require('../components/CommentBox'));

module.exports = function(app) {

	app.get('/', function(req, res){
		var reactHtml = React.renderToString(CommentBox({
			data:[
				{'author':'ben','text':'ben answer'},
				{'author':'celine','text':'celine comments'}
			]
		}));
		
	    res.render('index.ejs', {reactOutput: reactHtml});
	    
	});
};