import React, { Component, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { 
    selectCarts, 
    addCart,
    decreaseCart,
    removeFromCart,
    loadData
} from '../features/carts/cartsSlice';

//helpers
import { isPersistedState } from '../helpers';

const Cart = () => {
    const dispatch = useDispatch();
    const carts = useSelector(selectCarts);

    const onFirstRender = () => {
        dispatch(loadData());
    }
    const onAddCart = (item) => {
        dispatch(addCart(item));
    }
    const onDecreaseCart = (index)=> {
        dispatch(decreaseCart(index));
    }
    const onRemoveCart = (index) => {
        dispatch(removeFromCart(index));
    }

    //create cart
    function createCart(item, index){
        return (
            <tr key={item.id}>
                <td className="cart_product">
                    <a href=""><img src={item.image} alt=""/></a>
                </td>
                <td className="cart_description">
                    <h4><a href="">{item.name}</a></h4>
                    <p>Web ID: {item.id}</p>
                </td>
                <td className="cart_price">
                    <p>${item.price}</p>
                </td>
                <td className="cart_quantity">
                    <div className="cart_quantity_button">
                        <a className="cart_quantity_up" onClick={()=>onAddCart(item)}> + </a>
                        <input className="cart_quantity_input" type="text" name="quantity" value={item.quantity} autoComplete="off" size="2"/>
                        <a className="cart_quantity_down" onClick={()=>onDecreaseCart(index)}> - </a>
                    </div>
                </td>
                <td className="cart_total">
                    <p className="cart_total_price">{(item.price * item.quantity).toFixed(2)}</p>
                </td>
                <td className="cart_delete">
                    <a className="cart_quantity_delete" onClick={()=>onRemoveCart(index)}><i className="fa fa-times"></i></a>
                </td>
            </tr>
        )
    }

    return (
    <>
    <section id="cart_items">
        <div className="container">
            <div className="breadcrumbs">
                <ol className="breadcrumb">
                    <li><a href="#">Home</a></li>
                    <li className="active">Shopping Cart</li>
                </ol>
            </div>
            <div className="table-responsive cart_info">
                <table className="table table-condensed">
                    <thead>
                        <tr className="cart_menu">
                            <td className="image">Item</td>
                            <td className="description"></td>
                            <td className="price">Price</td>
                            <td className="quantity">Quantity</td>
                            <td className="total">Total</td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {carts.Carts.length > 0 
                        ? carts.Carts.map(createCart) 
                        :
                            <tr>
                                <td>It's seem like you don't have any items in your cart yet!</td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    </section> 
    {/* <!--/#cart_items--> */}

    <section id="do_action">
        <div className="container">
            <div className="heading">
                <h3>What would you like to do next?</h3>
                <p>Choose if you have a discount code or reward points you want to use or would like to estimate your delivery cost.</p>
            </div>
            <div className="row">
                <div className="col-sm-6">
                    <div className="chose_area">
                        <ul className="user_option">
                            <li>
                                <input type="checkbox"/>
                                <label>Use Coupon Code</label>
                            </li>
                            <li>
                                <input type="checkbox"/>
                                <label>Use Gift Voucher</label>
                            </li>
                            <li>
                                <input type="checkbox"/>
                                <label>Estimate Shipping & Taxes</label>
                            </li>
                        </ul>
                        <ul className="user_info">
                            <li className="single_field">
                                <label>Country:</label>
                                <select>
                                    <option>United States</option>
                                    <option>Bangladesh</option>
                                    <option>UK</option>
                                    <option>India</option>
                                    <option>Pakistan</option>
                                    <option>Ucrane</option>
                                    <option>Canada</option>
                                    <option>Dubai</option>
                                </select>
                                
                            </li>
                            <li className="single_field">
                                <label>Region / State:</label>
                                <select>
                                    <option>Select</option>
                                    <option>Dhaka</option>
                                    <option>London</option>
                                    <option>Dillih</option>
                                    <option>Lahore</option>
                                    <option>Alaska</option>
                                    <option>Canada</option>
                                    <option>Dubai</option>
                                </select>
                            
                            </li>
                            <li className="single_field zip-field">
                                <label>Zip Code:</label>
                                <input type="text"/>
                            </li>
                        </ul>
                        <a className="btn btn-default update" href="">Get Quotes</a>
                        <a className="btn btn-default check_out" href="">Continue</a>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="total_area">
                        <ul>
                            <li>Cart Sub Total <span>{carts && carts.total.toFixed(2)}</span></li>
                            <li>Eco Tax <span>$2</span></li>
                            <li>Shipping Cost <span>Free</span></li>
                            <li>Total <span>{carts && (carts.total + 2).toFixed(2)}</span></li>
                        </ul>
                            <a className="btn btn-default update" href="">Update</a>
                            <a className="btn btn-default check_out" href="">Check Out</a>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </>
    );
}

export default Cart;