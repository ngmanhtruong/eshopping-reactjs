import React, { Component, useEffect, useState, useRef } from 'react';
import Product from './product';
import CountingProducts from './countingProducts';
import FeaturesProducts from './features-product';
import LeftSideBar from './leftSideBar';
import { useParams, withRouter } from 'react-router';
import { useFetchProducts } from './hooks/useFetchProducts';
import { useFetchCategory } from './hooks/useFetchCategory';
import { Spinner } from './Spinner/Spinner.styles';

const ShopPage = () => {
    const {category} = useParams();
    const { state: data, loading, error } = useFetchProducts();
    const { state: arr, loading: arrLoading, error: arrError } = useFetchCategory(category);

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
                            {loading || arrLoading ? <Spinner /> :
                            <>
                                {typeof(category) != "undefined" ? (
                                    arr.map(product=>{
                                        return (
                                            <Product data = {product} key = {product.id} overlay choose col = {4}/>
                                        )
                                    })
                                ):(
                                    <FeaturesProducts datas={data} options={{overlay : true, col : 4, choose: true}} currentPage = {1} productPerPage = {6} customArr={false}/>
                                )
                                }
                            </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
    );

}

export default ShopPage;