/*设置初始值 props的使用*/

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
					<input type="text" placeholder = "Search here..." value={this.props.data.filterText} />
					<p>
						<input type="checkbox" checked={this.props.data.inStockOnly} />
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
		var data =this.props.data;
		this.props.products.forEach(function(product){
			if(product.name.indexOf(data.filterText)===-1 || (!product.stocked && data.inStockOnly)){
				return ;
			}

			if(product.category !== lastCategory){
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
	getInitialState:function(){
		return {
			filterText:'o',
			inStockOnly:false
		}
	},
	render:function(){
		return(
			<div>
				<SearchBar data={this.state} />
				<ProductCell data={this.state} products = {this.props.products} />
			</div>
			);
	}
});

React.render(<ProductContainer products={PRODUCTS}  />,document.getElementById('container'));