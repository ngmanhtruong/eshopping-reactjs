import React, { Component } from 'react';
import NoMatch from './404Error';
import Category from './category';
import CountingProducts from './countingProducts';
import LeftSideBar from './leftSideBar';
import Product from './product';

class Detail extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            category: [],
            product : [],
            recProduct: [],
            count: 0,
            productId: this.props.id,
            newCategory: '',
        }
    }
    removeFromArray = (arr,id)=>{
        return arr.filter(function(e){
            return (e.id != id);
        });
    }
    checkURL(){
        let queryString = window.location.search;
        let urlParams = new URLSearchParams(queryString);
        if (urlParams.has('category')){
            let category = urlParams.get('category');
            let id = urlParams.get('id');
            this.setState({productId: id,newCategory:category});
            this.getData(this.state.data,id);
        }
        else
            return false;
    }
    getData(data,id){
        data.map(product=>{
            if(product.id == id){
                this.setState({product: product});
                let category = product.category;
                fetch(`https://fakestoreapi.com/products/category/${category}`)
                    .then(res=>res.json())
                    .then(data=>{
                        this.setState({recProduct: data});
                        let temp = this.removeFromArray(this.state.recProduct,id);
                        this.setState({recProduct:temp});
                    });
            }
        })
    }
    componentDidMount(){
        fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(data=>{
                this.setState({data:data});
                this.getData(data,this.state.productId);
                fetch('https://fakestoreapi.com/products/categories')
                .then(res=>res.json())
                .then(data=>this.setState({category:data}));
            })
            .catch((err)=>console.log(err));
        this.checkURL();
    }
    countFunction(arr){
        let count = 0;
        arr.forEach(()=>{
            count++;
        })
        return count;
    }
    resetCount(){
        this.setState({count: 0})
    }
    render() {
        return (
            this.state.data == null && isNaN(id) ? <NoMatch />:
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-3">
                            <LeftSideBar data = {this.state.data} category = {this.state.category}/>
                        </div>
                            
                        <div className="col-sm-9 padding-right">
                            <div className="product-details">
                                {/* <!--product-details--> */}
                                <div className="col-sm-5">
                                    <div className="view-product">
                                        <img src={this.state.product.image} alt={this.state.product.title} />
                                        <h3>ZOOM</h3>
                                    </div>
                                    <div id="similar-product" className="carousel slide" data-ride="carousel">
                                        
                                        {/* <!-- Wrapper for slides --> */}
                                            <div className="carousel-inner">
                                                <div className="item active">
                                                    {this.state.recProduct.map((data,index)=>{
                                                        if(index <3){
                                                            return (
                                                                <a key= {data.id} href=""><img src={data.image} alt={data.title}/></a>
                                                            )
                                                        }
                                                    })}
                                                </div>
                                                <div className="item">
                                                    {this.state.recProduct.map((data,index)=>{
                                                        if(index >2 && index <6)
                                                            return (
                                                                <a key= {data.id} href=""><img src={data.image} alt={data.title}/></a>
                                                            )
                                                    })}	
                                                </div>
                                                {this.countFunction(this.state.recProduct)>6?
                                                <div className="item">
                                                    {this.state.recProduct.map((data,index)=>{
                                                        if(index >5 && index <9)
                                                            return (
                                                                <a key= {data.id} href=""><img src={data.image} alt={data.title}/></a>
                                                            )
                                                    })}	
                                                </div>:''}

                                            </div>

                                        {/* <!-- Controls --> */}
                                        <a className="left item-control" href="#similar-product" data-slide="prev">
                                            <i className="fa fa-angle-left"></i>
                                        </a>
                                        <a className="right item-control" href="#similar-product" data-slide="next">
                                            <i className="fa fa-angle-right"></i>
                                        </a>
                                    </div>

                                </div>
                                <div className="col-sm-7">
                                    <div className="product-information">
                                        {/* <!--/product-information--> */}
                                        <img src="images/product-details/new.jpg" className="newarrival" alt="" />
                                        <h2>{this.state.product.title}</h2>
                                        <p>Web ID: {this.state.product.id}</p>
                                        <img className="img-stars" src="images/product-details/rating.png" alt="" /><br />
                                        <span>
                                            <span>US ${this.state.product.price}</span>
                                        </span>
                                        <div>
                                            <label>Quantity:</label>
                                            <input type="text" value="3" />
                                            <button type="button" className="btn btn-fefault cart">
                                                <i className="fa fa-shopping-cart"></i>
                                                Add to cart
                                            </button>
                                        </div>
                                        <p><b>Availability:</b> In Stock</p>
                                        <p><b>Condition:</b> New</p>
                                        <p><b>Brand:</b> FAKESTOREAPI</p>
                                        <a href=""><img src="images/product-details/share.png" className="share img-responsive"  alt="" /></a>
                                    </div>
                                    {/* <!--/product-information--> */}
                                </div>
                            </div>
                            {/* <!--/product-details--> */}
                            
                            <div className="category-tab shop-details-tab">
                                {/* <!--category-tab--> */}
                                <div className="col-sm-12">
                                    <ul className="nav nav-tabs">
                                        <li><a href="#details" data-toggle="tab">Details</a></li>
                                        <li><a href="#tag" data-toggle="tab">Tag</a></li>
                                        <li className="active"><a href="#reviews" data-toggle="tab">Reviews (5)</a></li>
                                    </ul>
                                </div>
                                <div className="tab-content">
                                    <div className="tab-pane fade active in" id="details" >
                                        <p>{this.state.product.description}</p>
                                    </div>
                                    
                                    <div className="tab-pane fade" id="tag" >
                                        <p>{this.state.product.category}</p>
                                    </div>
                                    
                                    <div className="tab-pane fade" id="reviews" >
                                        <div className="col-sm-12">
                                            <ul>
                                                <li><a href=""><i className="fa fa-user"></i>MysticT</a></li>
                                                <li><a href=""><i className="fa fa-clock-o"></i>08:30 PM</a></li>
                                                <li><a href=""><i className="fa fa-calendar-o"></i>25 AUG 2021</a></li>
                                            </ul>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                                            <p><b>Write Your Review</b></p>
                                            
                                            <form action="#">
                                                <span>
                                                    <input type="text" placeholder="Your Name"/>
                                                    <input type="email" placeholder="Email Address"/>
                                                </span>
                                                <textarea name="" ></textarea>
                                                <b>Rating: </b> <img src="images/product-details/rating.png" alt="" />
                                                <button type="button" className="btn btn-default pull-right">
                                                    Submit
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                            {/* <!--/category-tab--> */}
                            
                            <div className="recommended_items">
                                {/* <!--recommended_items--> */}
                                <h2 className="title text-center">recommended items</h2>
                                
                                <div id="recommended-item-carousel" className="carousel slide" data-ride="carousel">
                                    <div className="carousel-inner">
                                        <div className="item active">
                                            {this.state.recProduct.map((value,index)=>{
                                                if([0,1,2].includes(index))
                                                    return (
                                                        <Product key= {value.id} data={value}/>
                                                    )
                                            })}	
                                        </div>
                                        <div className="item">
                                            {this.state.recProduct.map((value,index)=>{
                                                if(index > 2 && index < 6){
                                                    return (
                                                        <Product key= {value.id} data= {value}/>
                                                    )
                                                }
                                            })}
                                        </div>
                                    </div>
                                    <a className="left recommended-item-control" href="#recommended-item-carousel" data-slide="prev">
                                        <i className="fa fa-angle-left"></i>
                                    </a>
                                    <a className="right recommended-item-control" href="#recommended-item-carousel" data-slide="next">
                                        <i className="fa fa-angle-right"></i>
                                    </a>			
                                </div>
                            </div>
                            {/* <!--/recommended_items--> */}
                        
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Detail;