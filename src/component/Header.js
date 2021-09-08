import React, { Component } from 'react';
import {Link, NavLink} from 'react-router-dom';

class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
            query: "",
            data: [],
            filteredData : [],
            searchValue: '',
            productState: '',
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(ev){
        let value = ev.target.value;
        this.setState({searchValue: value,filteredData:[]});
        if(value && value.trim().length > 0){
            value = value.trim().toLowerCase();
            let temp = this.state.data.filter(product=>{
                return product.title.trim().toLowerCase().includes(value);
            }).sort((a,b)=>{
                return this.getRelevancy(b.title,value) - this.getRelevancy(a.title,value);
            });
            this.setState({filteredData:temp});
        } else{
            this.setState({filteredData:[]});
        }
    }
    changeProductState = (id)=>{
        this.setState({productState:id});
    }
    getRelevancy(value, searchTerm){
        if (value === searchTerm){
            return 2;
        } else if (value.startsWith(searchTerm)){
            return 1;
        } else if (value.includes(searchTerm)){
            return 0;
        }
    }
    getData = () =>{
        fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(data=>this.setState({data:data}));
    }
    
    componentDidMount(){
        this.getData();
    }
    render() {
        return (
            <header id="header">{/*<!--header-->*/}
                <div className="header_top">{/*<!--header-top--> */}
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="contactinfo">
                                    <ul className="nav nav-pills">
                                        <li><Link to="#"><i className="fa fa-phone"></i> +84 934 686 272</Link></li>
                                        <li><a href="mailto:ng.manhtruong1996@gmail.com"><i className="fa fa-envelope"></i>ng.manhtruong1996@gmail.com</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="social-icons pull-right">
                                    <ul className="nav navbar-nav">
                                        <li><Link to="https://www.facebook.com/testarudo.nino" target="_blank"><i className="fa fa-facebook"></i></Link></li>
                                        <li><Link to="https://github.com/ngmanhtruong"><i className="fa fa-github"></i></Link></li>
                                        <li><Link to="https://www.linkedin.com/in/ngmanhtruong/" target="_blank"><i className="fa fa-linkedin"></i></Link></li>
                                        <li><Link to="https://truongnguyen.surge.sh/" target="_blank"><i className="fas fa-portrait"></i></Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="header-middle">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-4">
                                <div className="logo pull-left">
                                    <Link to="index.html"><img src="images/home/logo.png" alt="" /></Link>
                                </div>
                                <div className="btn-group pull-right">
                                    <div className="btn-group">
                                        <button type="button" className="btn btn-default dropdown-toggle usa" data-toggle="dropdown">
                                            USA
                                            <span className="caret"></span>
                                        </button>
                                        <ul className="dropdown-menu">
                                            <li><Link to="#">Canada</Link></li>
                                            <li><Link to="#">UK</Link></li>
                                        </ul>
                                    </div>
                                    
                                    <div className="btn-group">
                                        <button type="button" className="btn btn-default dropdown-toggle usa" data-toggle="dropdown">
                                            DOLLAR
                                            <span className="caret"></span>
                                        </button>
                                        <ul className="dropdown-menu">
                                            <li><Link to="#">Canadian Dollar</Link></li>
                                            <li><Link to="#">Pound</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-8">
                                <div className="shop-menu pull-right">
                                    <ul className="nav navbar-nav">
                                        <li><Link to="#"><i className="fa fa-user"></i> Account</Link></li>
                                        <li><Link to="#"><i className="fa fa-star"></i> Wishlist</Link></li>
                                        <li><NavLink to="/checkout" exact activeClassName="active"><i className="fa fa-crosshairs"></i>Checkout</NavLink></li> 
                                                <li><NavLink to="/cart" exact activeClassName="active"><i className="fa fa-shopping-cart"></i>Cart</NavLink></li> 
                                                <li><NavLink to="/login" exact activeClassName="active"><i className="fa fa-lock"></i> Login</NavLink></li> 
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            
                <div className="header-bottom">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-9">
                                <div className="navbar-header">
                                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                                        <span className="sr-only">Toggle navigation</span>
                                        <span className="icon-bar"></span>
                                        <span className="icon-bar"></span>
                                        <span className="icon-bar"></span>
                                    </button>
                                </div>
                                <div className="mainmenu pull-left">
                                    <ul className="nav navbar-nav collapse navbar-collapse">
                                        <li><NavLink to = "/" exact activeClassName="active">Home</NavLink></li>
                                        <li className="dropdown"><Link to = "#">Products<i className="fa fa-angle-down"></i></Link> 
                                            <ul role="menu" className="sub-menu">
                                                <li><NavLink to="/shop" exact activeClassName="active">All Products</NavLink> </li>
                                                <li><NavLink to="/detail/1" exact activeClassName="active">Product Details</NavLink></li> 
                                            </ul>
                                        </li> 
                                        <li className="dropdown"><NavLink to="/blog" exact activeClassName="active">Blog<i className="fa fa-angle-down"></i></NavLink>
                                            <ul role="menu" className="sub-menu">
                                                <li><NavLink to="/blog-list" exact activeClassName="active">Blog List</NavLink></li>
                                                <li><NavLink to="/blog-single" exact activeClassName="active">Blog Single</NavLink></li>
                                            </ul>
                                        </li> 
                                        <li><NavLink to="/contact" exact activeClassName="active">Contact</NavLink></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className="search_box pull-right">
                                    <input type="text" placeholder="Search" name = "search" id = "search" value = {this.state.searchValue} onChange = {this.handleChange}/>
                                    {/*value = {this.state.query}
                                    onChange = {this.handleInputChange}*/}
                                    <ul className = "list-group" id ="search-result">
                                        {this.state.filteredData.map(item=>{
                                            return(
                                                <li className="list-group-item" key={item.id}>
                                                    <Link to={`/detail/?category=${item.category}&id=${item.id}`}>{item.title}</Link> 
                                                    {/* onClick = {()=>this.changeProductState(item.id)} */}
                                                </li>
                                            )
                                        })}
                                    </ul>  
                                </div>                          
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;