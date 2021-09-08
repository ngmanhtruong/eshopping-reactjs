
import Header from './component/Header'
import Footer from './component/Footer';
import Homepage from './component/home';
import Slider from './component/Slider';
import ShopPage from './component/shop';
import Detail from './component/detail';
import {BrowserRouter as Router, Route, Switch, Link, useParams} from 'react-router-dom';
import NoMatch from './component/404Error';
import CheckOut from './component/checkOutPage';
import Cart from './component/cartPage';
import Login from './component/login';
import Contact from './component/contact-us';
import Blog from './component/blogList';
import BlogSingle from './component/blogSingle';
import Thankyou from './component/thankyou';
import React, { Component, useState,useEffect } from 'react';
import DetailHook from './component/detailHook';

function App() {
  return (
    <>
    <Router>
      {/* PAGE HEADER */}
      <Header />

        <Switch>
          <Route exact path = "/">
            <Slider />
            <Homepage />
          </Route>

          <Route path = "/shop/:category" children={<ShopPage />}>
          </Route>

          <Route path = "/shop">
            <ShopPage />
          </Route>

          <Route path = "/detail/:id" children={<Detail />}>
          </Route>

          <Route path = "/checkout">
            <CheckOut />
          </Route>

          <Route path = "/cart">
            <Cart />
          </Route>

          <Route path = "/login">
            <Login />
          </Route>

          <Route path = "/contact">
            <Contact />
          </Route>

          <Route path = "/blog-list">
            <Blog />
          </Route>

          <Route path = "/blog-single">
            <BlogSingle />
          </Route>
          
          {/* <Route path = "/thankyou">
            <Thankyou />
          </Route> */}

          {/* ERROR 404 */}
          <Route path = "*">
            <NoMatch />
          </Route>
        </Switch>
      {/* PAGE FOOTER */}
      <Footer />
    </Router>
    </>
  );
} 

export default App;
