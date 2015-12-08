'use strict';
var React = require("react"),
	ProductPrice = require("./Price");

var ProductRight = React.createClass({

	componentDidMount:function(){
		
		var url = "http://localhost:9013/api?item="+this.props.product.itemNumber;
		$.ajax({
			url:url,
			context:document.body
		}).done(function(data){

			if(data && data.productpage_realtime && data.productpage_realtime[0]){
				this.setState({'loadingProduct': data.productpage_realtime[0]});
			}
			
		}.bind(this));
	},
	render: function() {
		if(!(this.state && this.state.loadingProduct)){
			return (
			  <div id="right">
					<div className="loader"> 
						<img alt="ICON"  src='http://images10.newegg.com/WebResource/Themes/2005/Nest/loading16.gif'/> Loading...
					</div>
				</div>
			  )
		}
		else{
			
			return (
				<div id="right">
					<ProductPrice priceInfo={this.state.loadingProduct}/>
				</div>
				);
		}
	}
})

module.exports = ProductRight;