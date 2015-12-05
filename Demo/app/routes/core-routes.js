var React = require('react'),
	ReactDOMServer = require('react-dom/server'),
	ProductContent = React.createFactory(require('../components/Product/Content')),
	restfulClient = require('../frameWork/HttpClient');

module.exports = function(app) {

	app.get('/', function(req, res){
		var postData ={
				data:{
			    "CompanyCode": 1003,
			    "CountryCode": "USA",
			    "Items": [
			    {
			        "ItemNumber": req.param("item")
			    }],
			    "NeedDetailInfo": true,
			    "PriceTypes": [],
			    "RegionCountrycode": null,
			    "RegionCurrecycode": "USD",
			    "RequestModel": "LandingPagePageProductDetail2015 ProductDetailServiceBL.GetItemInfoForLandingPage2011 for Group"
			}
		}


		restfulClient.post(postData,function(data,response){
			if(data && data.productpage_realtime){
				var product = data.productpage_realtime[0];
				var reactHtml = ReactDOMServer.renderToString(ProductContent(product));
		    	res.render('product.ejs', {
		    		reactOutput: reactHtml,
		    		data:JSON.stringify(product)
		    	});	
			}
		});
	    
	});
};