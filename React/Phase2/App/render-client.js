var React = require('react');
var ReactDOM = require('react-dom');

var Table =require('./table');

var table = React.createFactory(Table);

var datas = require('./datas');

ReactDOM.render(table({datas:datas}),document.body);

