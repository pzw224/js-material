var React = require('react'),
	ReactDOM = require('react-dom'),
	ProductContent = React.createFactory(require('./components/Product/Content'));

var container = document.getElementById("container");

ReactDOM.render(ProductContent(window.PRODUCT), container);