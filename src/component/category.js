import React, { Component } from 'react';
import SubCategory from './subcategory';
import { Link, NavLink } from 'react-router-dom';
class Category extends Component {
    constructor(props){
        super(props);
        this.category = [];
    }
    componentDidMount(){
        fetch('https://fakestoreapi.com/products/categories')
            .then(res=>res.json())
            .then(data=>{
                this.category = data;
            });
    }
    render() {
        return (
        <>
            {/* <!--/category-products--> */}
            <h2>Category</h2>
            <div className="panel-group category-products" id="accordian">
                {/* <!--category-productsr--> */}
                {this.category.map((category) => {
                    return (
                        <div key={category.toString()} className="panel panel-default">
                            <div className="panel-heading">
                                <h4 className="panel-title">
                                    <Link to={`/shop/${category}`}>{category}</Link>
                                </h4>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
        );
    }
}

export default Category;