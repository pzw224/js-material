'use strict';
var React = require("react");

var BulletDescription = React.createClass({
  render: function() {

    return (
        <div id="bullet">
			<ul>
				<li>3GB 384-Bit GDDR5</li>
				<li>Core Clock 880 MHz</li>
				<li>Boost Clock 1030 MHz</li>
			</ul>

		</div>
      )
  }
})

module.exports = BulletDescription;