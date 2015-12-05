'use strict';
var React = require("react");
var	BulletDescription = React.createFactory(require("./BulletDescription")),
	  Rating = React.createFactory(require("./Rating"));

var ProductDescription = React.createClass({
  handleClick: function() {
    console.log("handleClick");
  },
  render: function() {
    
    var product = this.props.product;
    
    if(!product){
      return (<div></div>);
    }

    return (
        <div id="description">
        	<h1 id="grpDescrip_h"><span>{product.linedescription}</span></h1>
        	<Rating product={product} />
        	<BulletDescription product={product}/>
		    </div>
      )
  }
})

module.exports = ProductDescription;