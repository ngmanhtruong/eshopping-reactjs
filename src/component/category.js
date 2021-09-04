import React, { Component } from 'react';
import SubCategory from './subcategory';
import { Link, NavLink } from 'react-router-dom';
class Category extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
        <>
            {/* <!--/category-products--> */}
            <h2>Category</h2>
            <div className="panel-group category-products" id="accordian">
                {/* <!--category-productsr--> */}
                {this.props.data.map((category) => {
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