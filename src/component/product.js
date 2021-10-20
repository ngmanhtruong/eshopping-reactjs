import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
    selectCarts, 
    addCart
} from '../features/carts/cartsSlice';

import {
    selectFavorites,
    addFavorite
} from '../features/favorites/favoritesSlice';

const Product = ({ data, col, overlay, choose }) => {
    const [product, setProduct] = useState([]);
    const dispatch = useDispatch();
    const thisCol = "col-sm-4";

    useEffect(()=>{
        setProduct(data);
    },[])

    const onAddCart = (item) => {
        // console.log("dispatchAddCart");
        dispatch(addCart(item));
    }

    const onAddFavorites = (item) => {
        // console.log("dispatchAddFavorites");
        dispatch(addFavorite(item));
    }
    
    return (
        <div className={col?`col-sm-${col}`: thisCol}>
            <div className="product-image-wrapper">
                <div  key={product.id} className="single-products">
                    <div className="productinfo text-center">
                        <img src={product.image} alt={product.title} data-fancybox={"product"+ product.id} data-src={product.image}/>
                        <h2>{"$" + product.price}</h2>
                        <p>{product.title}</p>
                    </div>
                    {overlay &&
                    <div className="product-overlay">
                        <div className="overlay-content">
                            <h2>{"$" + product.price}</h2>
                            <p>{product.title}</p>
                            <a onClick={() => onAddCart(product)} className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</a>
                            <Link to={`/detail/${product.id}`} className="btn btn-default see-detail"><i className="fas fa-info-circle"></i>See Detail</Link>
                        </div>
                    </div>
                    }
                </div>
                {choose &&
                <div className="choose">
                    <ul className="nav nav-pills nav-justified">
                        <li><a onClick={()=> onAddFavorites(product)}><i className="fa fa-plus-square"></i>Add to wishlist</a></li>
                        <li><a onClick={() => onAddCart(product)}><i className="fa fa-plus-square"></i>Add to cart</a></li>
                    </ul>
                </div>
                }
            </div>
        </div>
    );
}

export default Product;