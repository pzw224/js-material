var util = require('./util'),
	Class = require('./MyClass');

var Event = new Class({
	on:function(key,fn){
		if(!this.__events){
			this.__events = {};
		}

		if(!this.__events[key]){
			this.__events[key]=[];
		}

		if(util.indexOf(this.__events,fn) === -1 && typeof(fn) ==='function'){
			this.__events[key].push(fn);
		};

		return this;
	},
	off:function(key, fn){
		if(!key && !fn){
			this.__events={};
		}

		if(key && !fn){
			delete this.__events[key];
		}

		if(key && fn){
			var fns = this.__events[key];
			var index = util.indexOf(fns,fn);

			(index>-1) && fns.splice(index,1);
		}

		return this;
	},
	fire:function(key){
		if(!this.__events || !this.__events[key]) return

		var args = Array.prototype.slice.call(arguments,1)||[];

		var fns = this.__events[key];

		var i = 0;

		var l = fns.length;

		for(i ; i<l;i++){
			fns[i].apply(this,args);
		}

		return this;
	}
});

module.exports = Event;
