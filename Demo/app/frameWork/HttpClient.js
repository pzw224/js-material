var Client = require('node-rest-client').Client,
	Merge = require('merge');

var nodeClient = new Client();
var serviceUrl = 'http://172.16.22.119:6361/itemservice/specialprice'

module.exports = {
	post:function(args, callBack){

		var baseArgs = {
			headers:{
				"Content-Type": "application/json",
				"Accept":"*/*",
				"user-agent":"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36",
				"Cookie":"somthing=anything",
				"Connection":"keep-alive"
			}
		}

		combineArgs = Merge(args,baseArgs);

		nodeClient.post(serviceUrl,combineArgs,callBack);
	}
}