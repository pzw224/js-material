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