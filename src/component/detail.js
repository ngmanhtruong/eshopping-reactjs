import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import NoMatch from './404Error';
import LeftSideBar from './leftSideBar';
import Product from './product';
import { Link } from 'react-router-dom';
import { Spinner } from './Spinner/Spinner.styles';
import { useDispatch, useSelector } from 'react-redux';


//redux state
import { 
    selectCarts,
    addCart
} from '../features/carts/cartsSlice';

function Detail(props){

    const [data, setData] = useState([]);
    const [product, setProduct] = useState([]);
    const [recProduct, setrecProduct] = useState([]);
    const [loading, setLoading] = useState(false);
    const {id} = useParams();

    const carts = useSelector(selectCarts);
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(0);

    const onAddCart = (item) => {
        dispatch(addCart(item));
    }

    function getData(data,id){
        data.map(product=>{
            if(product.id == id){
                setProduct(product);
            }
        })
    }
    useEffect(()=>{
        carts.Carts.filter(item=>{
            if (item.id == id){
                setQuantity(item.quantity);
            }
        })
    },[carts])

    useEffect(()=>{
        setLoading(true);
        fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(data=>{
                setData(data);
                getData(data,id);
                let cat = "";
                data.map(product=>{
                    if (product.id == id){
                        cat = product.category;
                    }
                })
                fetch(`https://fakestoreapi.com/products/category/${cat}`)
                    .then(res=>res.json())
                    .then(data=>{
                        let temp = data.filter(function(e){
                            return (e.id != id);
                        });
                        setrecProduct(temp);
                    });
                setLoading(false);
            })
            .catch((err)=>console.log(err));
    },[id]);

    return (
        data == null && isNaN(id) ? <NoMatch />:
        <section>
            <div className="container">
                <div className="row">
                    <div className="col-sm-3">
                        <LeftSideBar data = {data}/>
                    </div>
                    {loading ? <Spinner /> :   
                    <div className="col-sm-9 padding-right">
                        <div className="product-details">
                            {/* <!--product-details--> */}
                            <div className="col-sm-5">
                                <div className="view-product">
                                    <img src={product.image} alt={product.title} data-fancybox="product" data-src={product.image}/>
                                    <h3>ZOOM</h3>
                                </div>
                                <div id="similar-product" className="carousel slide" data-ride="carousel">
                                    {/* <!-- Wrapper for slides --> */}
                                    <div className="carousel-inner">
                                        <div className="item active">
                                        {recProduct.map((data,index)=>{
                                            if(index <3){
                                                return (
                                                    <Link to={`/detail/${data.id}`} key= {data.id}><img src={data.image} alt={data.title}/></Link>
                                                )
                                            }
                                        })}
                                        </div>
                                        {recProduct.length > 3 &&
                                        <div className="item">
                                            {recProduct.map((data,index)=>{
                                                if(index >2 && index <6)
                                                    return (
                                                        <Link to={`/detail/${data.id}`} key= {data.id}><img src={data.image} alt={data.title}/></Link>
                                                    )
                                            })}	
                                        </div>
                                        }
                                        {recProduct.length > 6 &&
                                        <div className="item">
                                            {recProduct.map((data,index)=>{
                                                if(index >5 && index <9)
                                                    return (
                                                        <Link to={`/detail/${data.id}`} key= {data.id}><img src={data.image} alt={data.title}/></Link>
                                                    )
                                            })}	
                                        </div>}

                                    </div>

                                    {/* <!-- Controls --> */}
                                    {recProduct.length >3 &&
                                    <>
                                        <a className="left item-control" href="#similar-product" data-slide="prev">
                                            <i className="fa fa-angle-left"></i>
                                        </a>
                                        <a className="right item-control" href="#similar-product" data-slide="next">
                                            <i className="fa fa-angle-right"></i>
                                        </a>
                                    </>
                                    }
                                </div>

                            </div>
                            <div className="col-sm-7">
                                <div className="product-information">
                                    {/* <!--/product-information--> */}
                                    <img src="images/product-details/new.jpg" className="newarrival" alt="" />
                                    <h2>{product.title}</h2>
                                    <p>Web ID: {product.id}</p>
                                    <img className="img-stars" src="images/product-details/rating.png" alt="" /><br />
                                    <span>
                                        <span>US ${product.price}</span>
                                    </span>
                                    <div>
                                        <label>Quantity in Cart:</label>
                                        <input type="text" value={quantity} />
                                        <button type="button" className="btn btn-fefault cart" onClick={()=>onAddCart(product)}>
                                            <i className="fa fa-shopping-cart"></i>
                                            Add more
                                        </button>
                                    </div>
                                    <p><b>Availability:</b> In Stock</p>
                                    <p><b>Condition:</b> New</p>
                                    <p><b>Brand:</b> FAKESTOREAPI</p>
                                    <a href=""><img src="images/product-details/share.png" className="share img-responsive"  alt="" /></a>
                                </div>
                                {/* <!--/product-information--> */}
                            </div>
                        </div>
                        {/* <!--/product-details--> */}
                        
                        <div className="category-tab shop-details-tab">
                            {/* <!--category-tab--> */}
                            <div className="col-sm-12">
                                <ul className="nav nav-tabs">
                                    <li className="active"><a href="#details" data-toggle="tab">Details</a></li>
                                    <li><a href="#tag" data-toggle="tab">Tag</a></li>
                                    <li><a href="#reviews" data-toggle="tab">Reviews (5)</a></li>
                                </ul>
                            </div>
                            <div className="tab-content">
                                <div className="tab-pane fade active in" id="details" >
                                    <p>{product.description}</p>
                                </div>
                                
                                <div className="tab-pane fade" id="tag" >
                                    <p>{product.category}</p>
                                </div>
                                
                                <div className="tab-pane fade" id="reviews" >
                                    <div className="col-sm-12">
                                        <ul>
                                            <li><a href=""><i className="fa fa-user"></i>MysticT</a></li>
                                            <li><a href=""><i className="fa fa-clock-o"></i>08:30 PM</a></li>
                                            <li><a href=""><i className="fa fa-calendar-o"></i>25 AUG 2021</a></li>
                                        </ul>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                                        <p><b>Write Your Review</b></p>
                                        
                                        <form action="#">
                                            <span>
                                                <input type="text" placeholder="Your Name"/>
                                                <input type="email" placeholder="Email Address"/>
                                            </span>
                                            <textarea name="" ></textarea>
                                            <b>Rating: </b> <img src="images/product-details/rating.png" alt="" />
                                            <button type="button" className="btn btn-default pull-right">
                                                Submit
                                            </button>
                                        </form>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        {/* <!--/category-tab--> */}
                        
                        <div className="recommended_items">
                            {/* <!--recommended_items--> */}
                            <h2 className="title text-center">recommended items</h2>
                            
                            <div id="recommended-item-carousel" className="carousel slide" data-ride="carousel">
                                <div className="carousel-inner">
                                    <div className="item active">
                                        {recProduct.map((value,index)=>{
                                            if([0,1,2].includes(index))
                                                return (
                                                    <Product key= {value.id} data={value} choose/>
                                                )
                                        })}	
                                    </div>
                                    {recProduct.length > 3 &&
                                    <div className="item">
                                        {recProduct.map((value,index)=>{
                                            if(index > 2 && index < 6){
                                                return (
                                                    <Product key= {value.id} data= {value} choose/>
                                                )
                                            }
                                        })}
                                    </div>
                                    }
                                </div>
                                {recProduct.length > 3 &&
                                <>
                                <a className="left recommended-item-control" href="#recommended-item-carousel" data-slide="prev">
                                    <i className="fa fa-angle-left"></i>
                                </a>
                                <a className="right recommended-item-control" href="#recommended-item-carousel" data-slide="next">
                                    <i className="fa fa-angle-right"></i>
                                </a>		
                                </>
                                }	
                            </div>
                        </div>
                        {/* <!--/recommended_items--> */}
                    
                    </div>
                    }
                </div>
            </div>
        </section>
    );
}

export default Detail;