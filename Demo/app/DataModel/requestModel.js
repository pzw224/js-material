module.exports = function(itemNumber){
	var postData ={
				data:{
			    "CompanyCode": 1003,
			    "CountryCode": "USA",
			    "Items": [
			    {
			        "ItemNumber": itemNumber,
			    }],
			    "NeedDetailInfo": true,
			    "PriceTypes": [],
			    "RegionCountrycode": null,
			    "RegionCurrecycode": "USD",
			    "RequestModel": "LandingPagePageProductDetail2015 ProductDetailServiceBL.GetItemInfoForLandingPage2011 for Group"
			}
		};

	return postData;
}