import React, { Component } from 'react';
import Product from './product';

class FeaturesProducts extends Component {
    constructor(props){
        super(props);
        this.state = { //all the products
            currentProducts: [],
            arr: this.props.arr,
            customArr: this.props.customArr,
            currentPage: this.props.currentPage,
        }
        this.productPerPage = this.props.productPerPage;    //HOW MANY PRODUCTS ON A PAGE
        this.numberPages = 1;                               //DEFAULT NUMBER OF PAGINATION
        this.products = [];                                 //THIS IS THE WHOLE PRODUCTS FETCH FROM API
    }
    //IF USER DONT PUT THE CURRENTPAGE AND PRODUCTPERPAGE,THIS WILL ASIGN IT AUTOMATICALLY
    propsCheck = () => {
        if(!this.props.currentPage){
            this.setState({currentPage:1});
        }
        if(!this.props.productPerPage){
            this.setState({productPerPage:6});
        }
    }
    //CHECK IF THIS CLASS IS USED TO CREATE CUSTOM PRODUCTS
    checkCustomArr = () =>{
        if(this.state.customArr)
            return true;
        else 
            return false;
    }
    //HANDLE CLICK EVENT WHEN CLICK TO VIEW PAGES
    changePageHandler = (page,ev)=>{
        ev.preventDefault();
        let startIndex = this.productPerPage * (page - 1);
        let endIndex = startIndex + this.productPerPage;
        let currentProducts = this.products.slice(startIndex,endIndex);
        //UPDATE STATE
        this.setState({
            currentProducts: currentProducts,
            currentPage: page,
        })
    }
    //CREATE PAGINATION
    createListPage = (numberPage) =>{
        let pages = [];
        for (let i = 1;i <= numberPage;i++){
            pages.push(
                <li key = {i} className={this.state.currentPage === i?'active':''}>
                    <a href="" onClick = {(ev)=> this.changePageHandler(i,ev)}>
                        {i}
                    </a>
                </li>
            )
        }
        return pages;
    }
    componentDidMount(){
        fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(data=>{
                this.propsCheck();
                let startIndex = this.productPerPage *(this.state.currentPage - 1);
                let endIndex = startIndex + this.productPerPage;//this.state.productPerPage*this.state.currentPage
                let currentProducts = data.slice(startIndex,endIndex);
                //Update numberPages
                this.numberPages = Math.ceil(data.length/this.productPerPage);
                this.products = data;
                if (this.checkCustomArr()){
                    this.setState({currentProducts:data}); 
                }else{
                    this.setState({currentProducts:currentProducts}); 
                }
                
            })
            .catch(err=>console.log(err));
    }
    render() {
        return (
            <>
                {this.state.currentProducts.map((data) => {
                    if (this.state.customArr){
                        if(this.state.arr.includes(data.id)){
                            return (
                                <Product data = {data} key = {data.id} overlay = {this.props.options.overlay} choose = {this.props.options.choose} col = {this.props.options.col}/>
                            )
                        }
                    }
                    else
                        return (
                            <Product data = {data} key = {data.id} overlay = {this.props.options.overlay} choose = {this.props.options.choose} col = {this.props.options.col}/>
                        )
                })}            
                {!this.checkCustomArr() &&
                <ul className="pagination">
                    {this.createListPage(this.numberPages)}
                    <li><a href="">&raquo;</a></li>
                </ul>
                }
            </>
        );
    }
}

export default FeaturesProducts;