import React, { Component } from 'react';
import CountingProducts from './countingProducts';
import Category from './category';

class LeftSideBar extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div className="left-sidebar">
                <Category data = {this.props.category}/>
            
                <div className="brands_products">
                    {/* <!--brands_products--> */}
                    <h2>Brands</h2>
                    <div className="brands-name">
                        <ul className="nav nav-pills nav-stacked">
                            <li><a href="#"> <span className="pull-right">({CountingProducts("WD",this.props.data)})</span>Western Digital</a></li>
                            <li><a href="#"> <span className="pull-right">({CountingProducts("Silicon Power",this.props.data)})</span>Silicon Power</a></li>
                            <li><a href="#"> <span className="pull-right">({CountingProducts("Acer",this.props.data)})</span>Acer</a></li>
                            <li><a href="#"> <span className="pull-right">({CountingProducts("Samsung",this.props.data)})</span>Samsung</a></li>
                            <li><a href="#"> <span className="pull-right">({CountingProducts("Fjallraven",this.props.data)})</span>Fjallraven</a></li>
                            <li><a href="#"> <span className="pull-right">({CountingProducts("John Hardy",this.props.data)})</span>John Hardy</a></li>
                            <li><a href="#"> <span className="pull-right">({CountingProducts("BIYLACLESEN",this.props.data)})</span>BIYLACLESEN</a></li>
                            <li><a href="#"> <span className="pull-right">({CountingProducts("DANVOUY",this.props.data)})</span>DANVOUY</a></li>
                        </ul>
                    </div>
                </div>
                {/* <!--/brands_products--> */}
                {this.props.sort &&
                    <div className="sort-by">
                        <h2>Sort By Price</h2>
                        <div className = "sort sort-by-price">
                            <label><input name="sort" value="1" className="sort" type="checkbox" id = "priceAsc"/> PRICE ASCENDING </label><br />
                            <label><input name="sort" value="2" className="sort" type="checkbox" id = "priceDes"/> PRICE DESCENDING </label><br />
                        </div>
                        <h2>Sort By Name</h2>
                        <div className = "sort sort-by-name">
                            <label><input name="sort" value="1" className="sort" type="checkbox" id = "nameAsc"/> NAME ASCENDING </label><br />
                            <label><input name="sort" value="2" className="sort" type="checkbox" id = "nameDes"/> NAME DESCENDING </label><br />
                        </div>
                    </div>
                }

                {this.props.priceRange &&
                <div className="price-range">{/* <!--price-range--> */}
                    <h2>Price Range</h2>
                    <div className="well">
                        <input type="text" className="span2" value="" data-slider-min="0" data-slider-max="600" data-slider-step="5" data-slider-value="[250,450]" id="sl2" /><br />
                        <b>$ 0</b> <b className="pull-right">$ 600</b>
                    </div>
                </div>
                }
                
                <div className="shipping text-center">
                    {/* <!--shipping--> */}
                    <img src="images/home/shipping.jpg" alt="" />
                </div>
                {/* <!--/shipping--> */}
            </div>
                        
        );
    }
}

export default LeftSideBar;