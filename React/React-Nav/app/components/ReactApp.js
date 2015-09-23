
var React = require('react/addons');

var NavContainer = require('react-nav');


var ReactApp = React.createClass({
      render: function () {
        return (
          <NavContainer position={100}>
	        <a href="/"><i className="fa fa-home"></i>Home</a>
	        <a href="/"><i className="fa fa-home"></i>Services</a>
	     </NavContainer>
        )
      }
  });

/* Module.exports instead of normal dom mounting */
module.exports = ReactApp;