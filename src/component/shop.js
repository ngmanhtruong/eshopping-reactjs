import React, { Component, useEffect, useState } from 'react';
import Product from './product';
import CountingProducts from './countingProducts';
import FeaturesProducts from './features-product';
import LeftSideBar from './leftSideBar';
import { useParams, withRouter } from 'react-router';

const ShopPage = ({setKeyword}) => {

    const[data,setData] = useState([]);
    const[arr,setArr] = useState([]);
    const {category} = useParams();
    
    useEffect(()=>{
        fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(data=>{
                setData(data);
                fetch(`https://fakestoreapi.com/products/category/${category}`)
                    .then(res=>res.json())
                    .then(data=>setArr(data));
            });
        console.log(category);
    },[category])

    return (
    <>
        <section id="advertisement">
            <div className="container">
                <img src="images/shop/advertisement.jpg" alt="advertisement" />
            </div>
        </section>
        <section>
            <div className="container">
                <div className="row">
                    <div className="col-sm-3">
                        <LeftSideBar data={data} priceRange sort offAds/>
                    </div>
                    
                    <div className="col-sm-9 padding-right">
                        <div className="features_items">
                            {/* <!--features_items--> */}
                            <h2 className="title text-center">Features Items</h2>
                            {typeof(category) != "undefined" &&
                                arr.map(product=>{
                                    return (
                                        <Product data = {product} key = {product.id} overlay choose col = {4}/>
                                    )
                                })
                            }
                            {typeof(category) == "undefined" &&
                                <FeaturesProducts datas={data} options={{overlay : true, col : 4, choose: true}} currentPage = {1} productPerPage = {6} customArr={false}/>
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

export default withRouter(ShopPage);