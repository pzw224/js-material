'use strict';
var React = require("react");

var ProductRight = React.createClass({

	componentDidMount:function(){
		console.log("ProductRight_componentDidMount");
		this.setState({'cell':'loading'});

	},
	render: function() {
		if(!this.state){
			return (
			  <div id="right">
					<div className="loader"> 
						<img alt="ICON"  src='http://images10.newegg.com/WebResource/Themes/2005/Nest/loading16.gif'/> Loading...
					</div>
				</div>
			  )
		}
		else{
			console.log("i am state change")
			return (<div id="right" />);
		}
	}
})

module.exports = ProductRight;