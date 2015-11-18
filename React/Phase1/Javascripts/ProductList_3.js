/* 双向绑定数据，尽可能少的使用state 多使用props*/

var PRODUCTS = [
	{category:'Sporting Goods',price:"$49.99",stocked:true,name:"Football"},
	{category:'Sporting Goods',price:"$9.99",stocked:false,name:"Baseball"},
	{category:'Sporting Goods',price:"$29.99",stocked:true,name:"Basketball"},
	{category:'Electronics',price:"$99.99",stocked:true,name:"Ipod Touch"},
	{category:'Electronics',price:"$299.99",stocked:false,name:"Iphone 5"},
	{category:'Electronics',price:"$499.99",stocked:true,name:"Iphone 6S"},

	{category:'Food',price:"$0.99",stocked:true,name:"Pork"},
	{category:'Food',price:"$1.99",stocked:true,name:"Beef"},
	{category:'Food',price:"$2.99",stocked:true,name:"Fish"},
];


var SearchBar = React.createClass({
	handleChange:function(){
		this.props.onUserInput(React.findDOMNode( this.refs.filterTextInput).value,
								React.findDOMNode( this.refs.inStockOnlyInput).checked);
	},
	render:function(){
		return (
				<form>
					<div className="form-group">
						<input 
							className="form-control"
							type="text" 
							placeholder = "Search here..." 
							value={this.props.data.filterText} 
							ref="filterTextInput"
							onChange={this.handleChange}
							/>
						<p>
							<div className="checkbox">
								<label>
									<input 
										type="checkbox" 
										checked={this.props.data.inStockOnly} 
										ref="inStockOnlyInput"
										onChange={this.handleChange}
										/>
									Only show products in stock
								</label>
							</div>
						</p>
					</div>
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
			<table className="table table-bordered">
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
			filterText:'',
			inStockOnly:false
		}
	},
	handleUserInput:function(filterText,inStockOnly){
		this.setState({
			filterText:filterText,
			inStockOnly:inStockOnly
		});
	},
	render:function(){
		return(
			<div>
				<SearchBar data={this.state} onUserInput={this.handleUserInput}/>
				<ProductCell data={this.state} products={this.props.products} />
			</div>
			);
	}
});

React.render(<ProductContainer products={PRODUCTS}  />,document.getElementById('container'));