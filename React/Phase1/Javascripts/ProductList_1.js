/*UI 拆分成组件，静态的HTML*/
var PRODUCTS = [
	{category:'Sporting Goods',price:"$49.99",stocked:true,name:"Football"},
	{category:'Sporting Goods',price:"$9.99",stocked:false,name:"Baseball"},
	{category:'Sporting Goods',price:"$29.99",stocked:true,name:"Basketball"},
	{category:'Electronics',price:"$99.99",stocked:true,name:"Ipod Touch"},
	{category:'Electronics',price:"$299.99",stocked:false,name:"Iphone 5"},
	{category:'Electronics',price:"$499.99",stocked:true,name:"Iphone 6S"},
];


var SearchBar = React.createClass({
	render:function(){
		return (
				<form>
					<input type="text" placeholder = "Search here..." />
					<p>
						<input type="checkbox" />
						Only show products in stock
					</p>
				</form>
			);
	}
});

var ProductRow = React.createClass({
	render:function(){
		var name = this.props.product.stocked ? this.props.product.name:
					<span style={{color:'red'}}>
						{this.props.product.name}
					</span>
		return (
			<tr>
				<td>{name}</td>
				<td>{this.props.product.price}</td>
			</tr>
			);
	}
});

var ProductCategory = React.createClass({
	render:function(){
		return (<tr><th colSpan="2">{this.props.category}</th></tr>);
	}
});

var ProductCell =React.createClass({
	render:function(){
		var rows = [];
		var lastCategory=null;
		this.props.products.forEach(function(product){
			if(product.category!== lastCategory){
				rows.push(<ProductCategory category={product.category} key={product.category} />);
			}
			rows.push(<ProductRow product={product} key={product.name}/>);
			lastCategory = product.category;
		});

		return (
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Price</th>
					</tr>
				</thead>
				<tbody>{rows}</tbody>
			</table>				
			);
	}
});


var ProductContainer = React.createClass({
	render:function(){
		return(
			<div>
				<SearchBar />
				<ProductCell products = {this.props.products} />
			</div>
			);
	}
});

React.render(<ProductContainer products={PRODUCTS}  />,document.getElementById('container'));