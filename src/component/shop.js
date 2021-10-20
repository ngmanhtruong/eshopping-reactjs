import React, { useCallback, useEffect, useState } from 'react';
import Product from './product';
import FeaturesProducts from './features-product';
import LeftSideBar from './leftSideBar';
import { useParams} from 'react-router';
import { useFetchProducts } from './hooks/useFetchProducts';
import { useFetchCategory } from './hooks/useFetchCategory';
import { Spinner } from './Spinner/Spinner.styles';

const ShopPage = () => {
    const {category} = useParams();
    const { state, loading, error } = useFetchProducts();
    const { state: array, loading: arrLoading, error: arrError } = useFetchCategory(category);
    const [sort, setSort] = useState(false);
    const [filter, setFilter] = useState('');
    const [data, setData] = useState([]);
    const [arr, setArr] = useState([]);
    const [range, setRange] = useState('');
    const [sortTitle, setSortTitle] = useState('');

    const sortByTitle = (data) => {
        return data.slice().filter(item => item.title.toLowerCase().includes(sortTitle));
    }

    const sortRange = (data) => {
        switch(range){
            case 'UNDER-50': {
                return data.slice().filter(item => item.price <= 50);
            }
            case '50-100': {
                return data.slice().filter(item => item.price >= 50 && item.price <= 100);
            }
            case 'ABOVE-100': {
                return data.slice().filter(item => item.price >= 100);
            }
            default:
                return data;
        }
    }
    const sortProducts = (data) => {
        switch(filter){
            case 'PRICE-ASC':{
                return data.slice().sort((a,b)=> a.price - b.price);
            }
            case 'PRICE-DES':{
                return data.slice().sort((a,b)=> b.price - a.price);
            }
            case 'NAME-ASC': {
                return data.slice().sort((a,b)=>a.title.localeCompare(b.title));
            }
            case 'NAME-DES': {
                return data.slice().sort((a,b)=>b.title.localeCompare(a.title));
            }
            default: 
                return data;
        }
    }

    useEffect(()=>{
        setData(state);
        setArr(array);
    },[array, state])

    useEffect(()=>{
        // console.log(filter);
        if(category){
            let newArr = sortRange(array);
            setArr(sortProducts(newArr));
        }
        else{
            let newArr = sortRange(state);
            setData(sortProducts(newArr));
        }

        // console.log(data);
    },[filter, range])

    useEffect(()=>{
        if(category){
            setArr(sortByTitle(array));
        }
        else{
            setData(sortByTitle(state));
        }
    },[sortTitle])


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
                            <LeftSideBar data={category ? array : state} priceRange sort offAds setFilter={setFilter} setSort={setSort} setRange={setRange} setSortTitle={setSortTitle}/>
                        </div>
                        
                        <div className="col-sm-9 padding-right">
                            <div className="features_items">
                                {/* <!--features_items--> */}
                                <h2 className="title text-center">Features Items</h2>
                                {loading || arrLoading ? <Spinner /> :
                                <>
                                    {category !== undefined ? (
                                        // arr.map(product=>{
                                        //     return (
                                        //         <Product data = {product} key = {product.id} overlay choose col = {4}/>
                                        //     )
                                        // })
                                        <FeaturesProducts datas={arr} options={{overlay : true, col : 4, choose: true}} currentPage = {1} productPerPage = {6} customArr={false}/>
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