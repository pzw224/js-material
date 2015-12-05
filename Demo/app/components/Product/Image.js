'use strict';
var React = require("react");

var ProductImage = React.createClass({
  render: function() {
  	var product = this.props.product;
  	var imageSrc = product ? "http://images10.newegg.com/ProductImage/"+ product.imageName.split(',')[0]:"";
    return (
        <div id="image">
			<img src={imageSrc}/> 
		</div>
      )
  }
})

module.exports = ProductImage;