var path = require('path');

module.exports = {
	entry:'./App/render-client.js',
	output:{
		path:path.join(__dirname,'./build'),
		filename:'bundle.js'
	},
	resolve:{
		extensions:['','.js','.jsx']
	}
};