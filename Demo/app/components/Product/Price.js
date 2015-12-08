'use strict';
var React = require("react");

var ProductPrice = React.createClass({
	render: function() {
		var priceInfo = this.props.priceInfo;
		return (
			<div>
				<li>
					price:{priceInfo.unitPrice}
			    </li>
			    <li>
					qty:{priceInfo.qty}
			    </li>
		    </div>
	    )
	}
})

module.exports = ProductPrice;