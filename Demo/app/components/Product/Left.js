'use strict';
var React = require("react");
var ProductImage= React.createFactory(require('./Image')),
    ProductDescription = React.createFactory(require("./Description"));

var ProductLeft = React.createClass({
  render: function() {
    
    var product = this.props.product;

    return (
        <div id="left">
          <ProductImage product={product}/>
          <ProductDescription product={product}/>
        </div>
      )
  }
})

module.exports = ProductLeft;