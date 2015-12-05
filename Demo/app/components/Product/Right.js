'use strict';
var React = require("react");

var ProductRight = React.createClass({
  render: function() {

    return (
      <div id="right">
			
			<div className="loader"> 
				<img alt="ICON"  src='http://images10.newegg.com/WebResource/Themes/2005/Nest/loading16.gif'/> Loading...
			</div>


		</div>
      )
  }
})

module.exports = ProductRight;