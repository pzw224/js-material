var React = require('react'),
	ProductContent = React.createFactory(require('../app/components/Product/Content.js'));

var container = document.getElementById("container");

React.render(ProductContent({}), container);