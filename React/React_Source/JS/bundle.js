/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!********************!*\
  !*** ./JS/main.js ***!
  \********************/
/***/ function(module, exports, __webpack_require__) {

	var  TextCount = __webpack_require__(/*! ./textcount.v3 */ 1);
	
	var textCounter = new TextCount();
	
	$(function(){
		textCounter.init({input:$('#counter')});
		textCounter.on('warning',function(){
			console.log(arguments);
		})
	})
	


/***/ },
/* 1 */
/*!****************************!*\
  !*** ./JS/textcount.v3.js ***!
  \****************************/
/***/ function(module, exports, __webpack_require__) {

	var util = __webpack_require__(/*! ./Lib/util */ 2),
		Class = __webpack_require__(/*! ./Lib/MyClass */ 3),
		BaseControl = __webpack_require__(/*! ./BaseControl */ 4)
	
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


/***/ },
/* 2 */
/*!************************!*\
  !*** ./JS/Lib/util.js ***!
  \************************/
/***/ function(module, exports) {

	var util = {
		merge :function(a,b){
			if(typeof b === 'object'){
				for(var i in b){
					a[i] = b[i];
				}
			}
			return a;
		},
		indexOf:function(array,key){
		  if (array === null) return -1
		  var i = 0, length = array.length
		  for (; i < length; i++) if (array[i] === item) return i
		  return -1
		}
	}
	
	module.exports = util;

/***/ },
/* 3 */
/*!***************************!*\
  !*** ./JS/Lib/MyClass.js ***!
  \***************************/
/***/ function(module, exports, __webpack_require__) {

	var util = __webpack_require__(/*! ./util */ 2);
	
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

/***/ },
/* 4 */
/*!***************************!*\
  !*** ./JS/BaseControl.js ***!
  \***************************/
/***/ function(module, exports, __webpack_require__) {

	var util = __webpack_require__(/*! ./Lib/util */ 2),
		Class = __webpack_require__(/*! ./Lib/MyClass */ 3),
		Event = __webpack_require__(/*! ./Lib/Event */ 5);
	
	
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

/***/ },
/* 5 */
/*!*************************!*\
  !*** ./JS/Lib/Event.js ***!
  \*************************/
/***/ function(module, exports, __webpack_require__) {

	var util = __webpack_require__(/*! ./util */ 2),
		Class = __webpack_require__(/*! ./MyClass */ 3);
	
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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map