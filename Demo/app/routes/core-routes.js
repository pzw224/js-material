var React = require('react'),
	ReactDOMServer = require('react-dom/server'),
	ProductContent = React.createFactory(require('../components/Product/Content')),
	restfulClient = require('../frameWork/Server/HttpClient');

var fakeData ={
	productpage_realtime:[{
		item:"11-111-111",
		linedescription:"ben Test",
		imageName:'A7AH_130928616909917281FvjokdcO7K.jpg',
		rating:4
	}]
};

var RequestModel = require("../DataModel/requestModel.js");

module.exports = function(app) {
	

	app.get("/api",function(req,res){

		var itemNumber = req.param("item");
		var model = new RequestModel(itemNumber);

		restfulClient.post(model,function(data,response){
			res.json(data);
		});
	});

	app.get('/product', function(req, res){

		var isDebugger = req.param("debug");

		var model = new RequestModel(req.param("item"));

		var callBack = function(data,response){
			if(data && data.productpage_realtime){
				var product = data.productpage_realtime[0];
				var reactHtml = ReactDOMServer.renderToString(ProductContent(product));
		    	res.render('product.ejs', {
		    		reactOutput: reactHtml,
		    		data:JSON.stringify(product)
		    	});	
			}
		};

		if(!isDebugger){
			restfulClient.post(model,callBack);
		}
		else{
			callBack(fakeData,res);
		}
	    
	});
};