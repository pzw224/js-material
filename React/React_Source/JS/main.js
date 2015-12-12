var  TextCount = require('./textcount.v3');

var textCounter = new TextCount();

$(function(){
	textCounter.init({input:$('#counter')});
	textCounter.on('warning',function(){
		console.log(arguments);
	})
})

