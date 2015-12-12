var util = require('./Lib/util'),
	Class = require('./Lib/MyClass'),
	Event = require('./Lib/Event');


var BaseControl =  Event.extend({
	init:function(config){
		this.__config = config;
		this.bind();
		this.render();
	},
	getConfig:function(key){
		return this.__config[key];
	},
	setConfig :function(key,value){
		this.__config[key] = value;
	},
	bind:function(){},
	render:function(){},
	destory:function(){}
});

module.exports = BaseControl;