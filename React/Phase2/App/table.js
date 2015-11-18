var React = require('react');

var DOM = React.DOM;

var table = DOM.table, tr = DOM.tr, td= DOM.td;

module.exports = React.createClass({
	return table({
		children:this.props.datas.map(function(data){
			return tr(null,
				td(null,data.name),
				td(null,data.age),
				td(null,data.gender)
				);
		})
	});
});