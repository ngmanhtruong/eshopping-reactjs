import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Product extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: this.props.data,
        }
    }
    render() {
        let col = "col-sm-4";
        return (
        <div className={this.props.col?`col-sm-${this.props.col}`:col}>
            <div className="product-image-wrapper">
                <div  key={this.state.data.id} className="single-products">
                    <div className="productinfo text-center">
                        <img src={this.state.data.image} alt={this.state.data.title} data-fancybox={"product"+this.state.data.id} data-src={this.state.data.image}/>
                        <h2>{"$" + this.state.data.price}</h2>
                        <p>{this.state.data.title}</p>
                        <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</a>
                    </div>
                    {this.props.overlay &&
                    <div className="product-overlay">
                        <div className="overlay-content">
                            <h2>{"$" + this.state.data.price}</h2>
                            <p>{this.state.data.title}</p>
                            <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</a>
                            <Link to={`/detail/${this.state.data.id}`} className="btn btn-default see-detail"><i className="fas fa-info-circle"></i>See Detail</Link>
                        </div>
                    </div>
                    }
                </div>
                {this.props.choose &&
                <div className="choose">
                    <ul className="nav nav-pills nav-justified">
                        <li><a href="#"><i className="fa fa-plus-square"></i>Add to wishlist</a></li>
                        <li><a href="#"><i className="fa fa-plus-square"></i>Add to compare</a></li>
                    </ul>
                </div>
                }
            </div>
        </div>
        );
    }
}

export default Product;