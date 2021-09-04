import React, { Component } from 'react';
import Category from './category';
import Product from './product';
import CountingProducts from './countingProducts';
import FeaturesProducts from './features-product';
import LeftSideBar from './leftSideBar';

class ShopPage extends Component {
    constructor(props){
        super(props)
        this.state = {
            data: [],
            category: [],
            customArr: [],
            whichCategory: this.props.category
        }
    }
    getItemsInCategory(arr, condition){
        let newArr = [];
        arr.map(item =>{
            if(item.category == condition)
                newArr.push(item.id)
        })
        return newArr;
    }
    componentDidMount(){
        fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(data=>{
                let arr = this.getItemsInCategory(data,this.state.whichCategory);
                console.log(arr);
                this.setState({data:data,customArr:arr});

                fetch('https://fakestoreapi.com/products/categories')
                .then(res=>res.json())
                .then(data=>this.setState({category:data}));
            });
    }
    // componentDidUpdate(){
    //     let arr = this.getItemsInCategory(data,this.state.whichCategory);
    //     this.setState({data:data,customArr:arr});
    // }
    render() {
        return (
        <>
            <section id="advertisement">
                <div className="container">
                    <img src="images/shop/advertisement.jpg" alt="" />
                </div>
            </section>
            
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-3">
                            <LeftSideBar data={this.state.data} priceRange sort category={this.state.category}/>
                        </div>
                        
                        <div className="col-sm-9 padding-right">
                            <div className="features_items">
                                {/* <!--features_items--> */}
                                <h2 className="title text-center">Features Items</h2>
                                {/* {this.state.data.map(data=>{
                                    return (
                                        <Product key = {data.id} data = {data} col = {4} overlay/>
                                    )
                                })} */}
                                {!this.state.whichCategory?
                                <FeaturesProducts options = {{overlay : true, col : 4, choose: true}} currentPage = {1} productPerPage = {6}/>      
                                :
                                <FeaturesProducts options = {{overlay : true, col : 4, choose: true}} currentPage = {1} productPerPage = {6} customArr arr = {this.customArr}/>
                                }
                                                         
                            </div>
                            {/* <ul className="pagination">
                                <li className="active"><a href="">1</a></li>
                                <li><a href="">2</a></li>
                                <li><a href="">3</a></li>
                                <li><a href="">&raquo;</a></li>
                            </ul> */}
                            {/* <!--features_items--> */}
                        </div>
                    </div>
                </div>
            </section>
        </>
        );
    }
}

export default ShopPage;