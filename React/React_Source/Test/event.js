var assert = require('assert');
var should = require('should');

var Event = require('../JS/Lib/event');

describe('Should be a class',function(){
	it('Test function',function(){
		var a = new Event();
		var testData = {};

		a.on('test',function(msg){
			testData[msg] = msg;
		});

		testData.should.not.have.properties(['dd']);
		a.fire('test','dd');
		testData.should.have.properties(['dd']);

		a.off();

		a.fire('test','bb');

		testData.should.not.have.properties(['bb']);

	});

});