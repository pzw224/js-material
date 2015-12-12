var util = require('./Lib/util'),
	Class = require('./Lib/MyClass'),
	BaseControl = require('./BaseControl')

var TextCount = BaseControl.extend({
	bind:function(){
		var self = this;
		var $input = this.getConfig('input');
		$input.on('keyup',function(){
			self.fire('warning', self._getNum());
			self.render();
		});
	},
	render:function(){
		var num = this._getNum();
		var $input = this.getConfig('input');
		if($("#counter_text").length==0){
			$input.after('<span id="counter_text"></span>');
		}

		$("#counter_text").html(' '+num);
	},
	_getNum:function(){
		return this.getConfig('input').val().length;
	},
	destroy:function(){
		this.off();
	}
});


module.exports = TextCount;
