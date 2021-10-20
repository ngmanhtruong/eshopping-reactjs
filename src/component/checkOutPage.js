import React, { Component } from 'react';
import { useSelector } from 'react-redux';
import {
    selectCarts
} from '../features/carts/cartsSlice';

const CheckOut = () => {
    const carts = useSelector(selectCarts);
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
                        <input className="cart_quantity_input" type="text" name="quantity" value={item.quantity} autoComplete="off" size="2"/>
                    </div>
                </td>
                <td className="cart_total">
                    <p className="cart_total_price">{(item.price * item.quantity).toFixed(2)}</p>
                </td>
            </tr>
        )
    }

    return (
    <section id="cart_items">
        <div className="container">
            <div className="breadcrumbs">
                <ol className="breadcrumb">
                    <li><a href="#">Home</a></li>
                    <li className="active">Check out</li>
                </ol>
            </div>      {/* <!--/breadcrums--> */}


            <div className="step-one">
                <h2 className="heading">Step1</h2>
            </div>
            <div className="checkout-options">
                <h3>New User</h3>
                <p>Checkout options</p>
                <ul className="nav">
                    <li>
                        <label><input type="checkbox"/> Register Account</label>
                    </li>
                    <li>
                        <label><input type="checkbox"/> Guest Checkout</label>
                    </li>
                    <li>
                        <a href=""><i className="fa fa-times"></i>Cancel</a>
                    </li>
                </ul>
            </div>
            {/* <!--/checkout-options--> */}

            <div className="register-req">
                <p>Please use Register And Checkout to easily get access to your order history, or use Checkout as Guest</p>
            </div>
            {/* <!--/register-req--> */}

            <div className="shopper-informations">
                <div className="row">
                    <div className="col-sm-3">
                        <div className="shopper-info">
                            <p>Shopper Information</p>
                            <form>
                                <input type="text" placeholder="Display Name"/>
                                <input type="text" placeholder="User Name"/>
                                <input type="password" placeholder="Password"/>
                                <input type="password" placeholder="Confirm password"/>
                            </form>
                            <a className="btn btn-primary" href="">Get Quotes</a>
                            <a className="btn btn-primary" href="">Continue</a>
                        </div>
                    </div>
                    <div className="col-sm-5 clearfix">
                        <div className="bill-to">
                            <p>Bill To</p>
                            <div className="form-one">
                                <form>
                                    <input type="text" placeholder="Company Name"/>
                                    <input type="text" placeholder="Email*"/>
                                    <input type="text" placeholder="Title"/>
                                    <input type="text" placeholder="First Name *"/>
                                    <input type="text" placeholder="Middle Name"/>
                                    <input type="text" placeholder="Last Name *"/>
                                    <input type="text" placeholder="Address 1 *"/>
                                    <input type="text" placeholder="Address 2"/>
                                </form>
                            </div>
                            <div className="form-two">
                                <form>
                                    <input type="text" placeholder="Zip / Postal Code *"/>
                                    <select>
                                        <option>-- Country --</option>
                                        <option>United States</option>
                                        <option>Bangladesh</option>
                                        <option>UK</option>
                                        <option>India</option>
                                        <option>Pakistan</option>
                                        <option>Ucrane</option>
                                        <option>Canada</option>
                                        <option>Dubai</option>
                                    </select>
                                    <select>
                                        <option>-- State / Province / Region --</option>
                                        <option>United States</option>
                                        <option>Bangladesh</option>
                                        <option>UK</option>
                                        <option>India</option>
                                        <option>Pakistan</option>
                                        <option>Ucrane</option>
                                        <option>Canada</option>
                                        <option>Dubai</option>
                                    </select>
                                    <input type="password" placeholder="Confirm password"/>
                                    <input type="text" placeholder="Phone *"/>
                                    <input type="text" placeholder="Mobile Phone"/>
                                    <input type="text" placeholder="Fax"/>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="order-message">
                            <p>Shipping Order</p>
                            <textarea name="message"  placeholder="Notes about your order, Special Notes for Delivery" rows="16"></textarea>
                            <label><input type="checkbox"/> Shipping to bill address</label>
                        </div>	
                    </div>					
                </div>
            </div>
            <div className="review-payment">
                <h2>Review & Payment</h2>
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
            <div className="col-sm-6">
                <div className="total_area">
                    <ul>
                        <li>Cart Sub Total <span>{carts && carts.total.toFixed(2)}</span></li>
                        <li>Eco Tax <span>$2</span></li>
                        <li>Shipping Cost <span>Free</span></li>
                        <li>Total <span>{carts && (carts.total + 2).toFixed(2)}</span></li>
                    </ul>
                        <a className="btn btn-default check_out" href="/thankyou">Check Out</a>
                </div>
            </div>
            <div className="payment-options col-sm-6">
                <span>
                    <label><input type="checkbox"/> Direct Bank Transfer</label>
                </span>
                <span>
                    <label><input type="checkbox"/> Check Payment</label>
                </span>
                <span>
                    <label><input type="checkbox"/> Paypal</label>
                </span>
            </div>
        </div>
    </section>
    );
}

export default CheckOut;