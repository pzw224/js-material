'use strict';
var React = require("react");

var	ProductLeft = React.createFactory(require('./Left')),
	  ProductRight = React.createFactory(require('./Right'));

var Content = React.createClass({
  componentDidMount:function(){
    console.log("Content_componentDidMount");
    console.log(this.state);
  },

  render: function() {

    var product = this.props;
    console.log(this.props);

    return (
      <div id="content" >
      	<ProductLeft product={product} />
      	<ProductRight product={product} />
      </div>
      )
  }
})

module.exports = Content;