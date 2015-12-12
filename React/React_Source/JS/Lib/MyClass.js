var util = require('./util');

var myClass = function(obj){
	if(typeof obj ==='string'){
		this.name = obj;
	}
	else if(typeof obj === 'object'){
		var parent = function(attr){
			if(obj && obj['initialize']){
				obj['initialize'].apply(this,arguments);
			}
		};

		util.merge(parent.prototype, obj);
		var child = function(){};
		var extend = function(attr){
			child = function(){};
			child.prototype = new this;
			util.merge( child.prototype, attr);
			child.extend = extend;
			return child;
		}
		parent.extend = extend ;
		return parent;
	}
}


module.exports = myClass;