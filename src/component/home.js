import React, { useState, useEffect } from 'react';
//components
import FeaturesProducts from './features-product';
import Product from './product';
import LeftSideBar from './leftSideBar';
import Spinner from './Spinner/Spinner';
//hooks
import { useFetchProducts } from './hooks/useFetchProducts';
import { useFetchCategories } from './hooks/useFetchCategories';


const Homepage = () => {
    const {state : data, loading, error } = useFetchProducts();
    const {state : category, loading: categoryLoading, error: categoryError} = useFetchCategories();
    
    if (error) <p> Something is wrong...</p>;
    
    return (
        <section>
            <div className="container">
                <div className="row">
                    <div className="col-sm-3">
                        <LeftSideBar data = {data}/>
                    </div>
                    <div className="col-sm-9 padding-right">
                        {loading ? <Spinner /> :
                        <>
                        <div className="features_items">
                            {/* <!--features_items--> */}
                            <h2 className="title text-center">Features Items</h2>
                            {data &&
                                <FeaturesProducts arr = {[1,3,5,17,18,19]} customArr = {true} options = {{overlay : true, col : 4, choose: true}}/>
                            }
                        </div>
                        {/* <!--features_items--> */}

                        <div className="category-tab">
                            {/* <!--category-tab--> */}
                            <div className="col-sm-12">
                                <ul className="nav nav-tabs">
                                    {categoryLoading && <Spinner />}
                                    {category && category.map((category) => {
                                        if (category == "electronics"){
                                            return (
                                                <li key = {category} className="active"><a href={"#" + category} data-toggle="tab">{category}</a></li>
                                            )
                                        }
                                        else if (category == "women's clothing"){
                                            return (
                                                <li key = {category}><a href={"#womenclothing"} data-toggle="tab">{category}</a></li>
                                            )
                                        }
                                        else if (category == "men's clothing"){
                                            return (
                                                <li key = {category}><a href={"#menclothing"} data-toggle="tab">{category}</a></li>
                                            )
                                        }
                                        else{
                                            return (
                                                <li key = {category}><a href={"#" + category} data-toggle="tab">{category}</a></li>
                                            )
                                        }
                                    })}
                                </ul>
                            </div>
                            <div className="tab-content">
                                {category && category.map(cate=>{
                                    if(cate == "electronics"){
                                        return (
                                            <div className="tab-pane fade active in" id={cate} key={cate}>
                                                {data.map(data=>{
                                                    if (data.category == "electronics")
                                                    return (
                                                        <Product col = {4} data = {data} key= {data.id} choose/>
                                                    )
                                                })}
                                            </div>
                                        )
                                    }
                                    else if (cate == "women's clothing"){
                                        return (
                                            <div className="tab-pane fade" id="womenclothing" key={cate}>
                                                {data.map(data=>{
                                                    if (data.category == "women's clothing")
                                                    return (
                                                        <Product col = {4} data = {data} key= {data.id} choose/>
                                                    )
                                                })}
                                            </div>
                                        )
                                    }
                                    else if (cate == "men's clothing"){
                                        return (
                                            <div className="tab-pane fade" id="menclothing" key={cate}>
                                                {data.map(data=>{
                                                    if (data.category == "men's clothing")
                                                    return (
                                                        <Product col = {4} data = {data} key= {data.id} choose/>
                                                    )
                                                })}
                                            </div>
                                        )
                                    }
                                    else{
                                        return (
                                            <div className="tab-pane fade" id={cate} key={cate}>
                                                {data.map(data=>{
                                                    if (data.category == "jewelery")
                                                    return (
                                                        <Product col = {3} data = {data} key= {data.id} choose/>
                                                    )
                                                })}
                                            </div>
                                        )
                                    }
                                })}
                            </div>
                        </div>
                        {/* <!--/category-tab--> */}

                        <div className="recommended_items">
                            {/* <!--recommended_items--> */}
                            <h2 className="title text-center">recommended items</h2>

                            <div id="recommended-item-carousel" className="carousel slide" data-ride="carousel">
                                <div className="carousel-inner">
                                    <div className="item active">
                                        {data &&
                                            <FeaturesProducts 
                                                arr={[2,4,6]} 
                                                customArr={true} 
                                                options={{overlay:false,
                                                        col:4, 
                                                        choose:false}
                                                }
                                            />
                                        }           
                                    </div>
                                    <div className="item">
                                        {data && 
                                            <FeaturesProducts 
                                                arr={[8,16,20]} 
                                                customArr={true} 
                                                options={{  overlay:false,
                                                            col:4, 
                                                            choose:false}
                                                }
                                            />
                                            }
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
                        </>
                        }   
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Homepage;