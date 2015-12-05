'use strict';
var React = require("react");

var ProductRating = React.createClass({
  render: function() {

  	var product = this.props.product;

	var className = "rating rating-" +product.rating;
	var ratingTitle = product.rating + " out of 5 eggs";
    return (
        <div id="rating">
			<i className={className} title={ratingTitle}></i>
		</div>
      )
  }
})

module.exports = ProductRating;