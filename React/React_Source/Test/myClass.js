var assert = require('assert');
var should = require('should');

var Class = require('../JS/Lib/MyClass');


describe('Should have Framework',function(){
	it('[Step.1]should have class',function(){

		var jobs = new Class('jobs');
		var gates = new Class('gates');

		jobs.name.should.be.equal('jobs');
		jobs.should.be.ok;
	});

	it('[Step.2]should have method',function(){
		var Person = new Class({
			sayHello:function(){},
			show:function(){}
		});

		var Robot = new Class({
			sayHello:function(){},
			show:function(){}
		});

		var jobs = new Person();
		var bigBai = new Robot();

		// 知识点链接创造力
		jobs.should.be.have.properties(['sayHello','show']);
		bigBai.should.be.have.properties(['sayHello','show']);
	}); 	


	it('[Step.3]should have constructor',function(){
		var Person = new Class({
			initialize : function(name,sex){
				this.name = name;
				this.sex = sex;
			}
		});

		var jobs = new Person('jobs','male');

		jobs.name.should.eql('jobs');
		jobs.sex.should.eql('male');
	})

	it('[Step.4]should have inherits',function(){
		var Person = new Class({
			sayHello :function(){}
		});

		var Man = Person.extend({
			work:function(){}
		});

		var jobs = new Man();
		var hillary = new Person();
		jobs.should.have.properties(['sayHello','work']);
		hillary.should.not.have.property(['work']);

	})


	it('[Step.5]always have extend',function(){
		var Person = new Class({
			sayHello :function(){}
		});

		var Engineer = Person.extend({
			work:function(){}
		});

		var CTO = Engineer.extend({
			makePolicy :function(){

			}
		});

		var man  = new Person();
		var jobs = new Engineer();
		var gates = new CTO();

		gates.should.have.properties(['sayHello','work','makePolicy']);

		man.should.have.properties(['sayHello']);
		man.should.not.have.properties(['work']);
		man.should.not.have.properties(['makePolicy']);

		jobs.should.have.properties(['sayHello','work']);
		jobs.should.not.have.properties(['makePolicy']);
	})
});