import React, { Component, useState } from 'react';
import CountingProducts from './countingProducts';
import Category from './category';
import { Link } from 'react-router-dom';
import { useFetchProducts } from './hooks/useFetchProducts';

const LeftSideBar = ({data, offAds, priceRange, sort, setFilter, setSort, setRange, setSortTitle }) => {
    const [state, setState] = useState(true);
    const onChangeFilter = (filter) => {
        setFilter(filter);
    }
    const handleChange = (e) => {
        let value = e.target.value;
        if (value == 0)
            setRange('default');
        if (value == 1)
            setRange('UNDER-50');
        if (value == 2)
            setRange('50-100');
        if (value == 3)
            setRange('ABOVE-100');
    }

    const handleChangeTitle = (event,title) => {
        event.preventDefault();
        setSortTitle(title.toLowerCase());
        setState(false);
    }
    return (
        <div className="left-sidebar">
            <Category setSort={setSort} setState={setState}/>
        
            <div className="brands_products">
                {/* <!--brands_products--> */}
                <h2>Brands</h2>
                <div className="brands-name">
                    <ul className="nav nav-pills nav-stacked">
                        {CountingProducts("WD",data) > 0 && <li><Link to="#" onClick = {e=>handleChangeTitle(e,'WD')}> <span className="pull-right">({CountingProducts("WD",data)})</span>Western Digital</Link></li>}
                        {CountingProducts("Silicon Power",data) > 0 && <li><Link to="#" onClick = {e=>handleChangeTitle(e,'Silicon Power')}> <span className="pull-right">({CountingProducts("Silicon Power",data)})</span>Silicon Power</Link></li>}
                        {CountingProducts("Acer",data) > 0 && <li><Link to="#" onClick = {e=>handleChangeTitle(e,'Acer')}> <span className="pull-right">({CountingProducts("Acer",data)})</span>Acer</Link></li>}
                        {CountingProducts("Samsung",data) > 0 && <li><Link to="#" onClick = {e=>handleChangeTitle(e,'Samsung')}> <span className="pull-right">({CountingProducts("Samsung",data)})</span>Samsung</Link></li>}
                        {CountingProducts("Fjallraven",data) > 0 && <li><Link to="#" onClick = {e=>handleChangeTitle(e,'Fjallraven')}> <span className="pull-right">({CountingProducts("Fjallraven",data)})</span>Fjallraven</Link></li>}
                        {CountingProducts("John Hardy",data) > 0 && <li><Link to="#" onClick = {e=>handleChangeTitle(e,'John Hardy')}> <span className="pull-right">({CountingProducts("John Hardy",data)})</span>John Hardy</Link></li>}
                        {CountingProducts("BIYLACLESEN",data) > 0 && <li><Link to="#" onClick = {e=>handleChangeTitle(e,'BIYLACLESEN')}> <span className="pull-right">({CountingProducts("BIYLACLESEN",data)})</span>BIYLACLESEN</Link></li>}
                        {CountingProducts("DANVOUY",data) > 0 && <li><Link to="#" onClick = {e=>handleChangeTitle(e,'DANVOUY')}> <span className="pull-right">({CountingProducts("DANVOUY",data)})</span>DANVOUY</Link></li>}
                    </ul>
                </div>
            </div>
            {/* <!--/brands_products--> */}
            {state && <>
            {sort &&
                <div className="sort-by">
                    <h2>Sort By Price</h2>
                    <div className = "sort sort-by-price">
                        <label><input name="sort" type="radio" id="priceAsc" onChange={()=>onChangeFilter('PRICE-ASC')}/> PRICE ASCENDING </label><br />
                        <label><input name="sort" type="radio" id="priceDes" onChange={()=>onChangeFilter('PRICE-DES')}/> PRICE DESCENDING </label><br />
                    </div>
                    <h2>Sort By Name</h2>
                    <div className = "sort sort-by-name">
                        <label><input name="sort" type="radio" id = "nameAsc" onChange={()=>onChangeFilter('NAME-ASC')}/> NAME ASCENDING </label><br />
                        <label><input name="sort" type="radio" id = "nameDes" onChange={()=>onChangeFilter('NAME-DES')}/> NAME DESCENDING </label><br />
                    </div>
                </div>
            }

            {priceRange &&
            <div className="price-range">{/* <!--price-range--> */}
                <h2>Price Range</h2>
                <div className="well">
                    <select id='price-range' onChange={(e)=> handleChange(e)}>
                        <option defaultValue = '0'>...</option>
                        <option value='1'>$0 - $50</option>
                        <option value='2'>$50 - $100</option>
                        <option value='3'>More than $100</option>
                    </select>
                </div>
            </div>
            }
            {offAds == false &&
            <div className="shipping text-center">
                {/* <!--shipping--> */}
                <img src="images/home/shipping.jpg" alt="" />
            </div>
            }
            </>}
        </div>
                    
    );
}

export default LeftSideBar;