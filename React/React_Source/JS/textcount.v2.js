var util = {
	merge :function(a,b){
		if(typeof b === 'object'){
			for(var i in b){
				a[i] = b[i];
			}
		}
		return a;

	}
}

var Class = function(obj){

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

var TextCount = new Class({
	init:function(config){
		debugger;
		this.input = $(config.id);
		this._bind();
		this.render();
	},
	_bind:function(){
		var self = this;
		this.input.on('keyup',function(){
			self.render();
		})
	},
	render:function(){
		var num = this._getNum();

		if($("#counter_text").length==0){
			this.input.after('<span id="counter_text"></span>');
		}

		$("#counter_text").html(' '+num);
	},
	_getNum:function(){
		return this.input.val().length;
	}

});

var textCounter = new TextCount();

$(function(){
	textCounter.init({id:'#counter'});
})

