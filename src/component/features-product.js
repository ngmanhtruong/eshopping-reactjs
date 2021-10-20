import React ,{ useState, useEffect } from 'react';
import Product from './product';


const FeaturesProducts = ({ datas, arr, customArr, options, productPerPage = 6, currentPage = 1 }) => {
    const [currentProducts, setCurrentProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [thisCurrentPage, setThisCurrentPage] = useState(currentPage);
    const [numberPages, setNumberPages] = useState(1); //DEFAULT NUMBER OF PAGINATION
    // console.log(datas);

    //HANDLE CLICK EVENT WHEN CLICK TO VIEW PAGES
    const changePageHandler = (page,ev)=>{
        ev.preventDefault();
        let startIndex = productPerPage * (page - 1);
        let endIndex = startIndex + productPerPage;
        let currentProducts = products.slice(startIndex,endIndex);

        //UPDATE STATE
        setCurrentProducts(currentProducts);
        setThisCurrentPage(page)
    }
    //CREATE PAGINATION
    const createListPage = (numberPage) =>{
        let pages = [];
        for (let i = 1;i <= numberPage;i++){
            pages.push(
                <li key = {i} className={thisCurrentPage === i?'active':''}>
                    <a href="" onClick = {(ev)=> changePageHandler(i,ev)}>
                        {i}
                    </a>
                </li>
            )
        }
        if(pages.length > 1)
            return pages;
    }

    useEffect(()=>{
        if (datas){
            let startIndex = productPerPage * (thisCurrentPage - 1);
            let endIndex = startIndex + productPerPage;//this.state.productPerPage*this.state.currentPage
    
            //Update numberPages
            setNumberPages(Math.ceil(datas.length/productPerPage));
            setProducts(datas);
    
            if (customArr){
                setCurrentProducts(datas);
            } else{
                setCurrentProducts(datas.slice(startIndex,endIndex));
            }
        }
    },[numberPages, datas])



    return (
        <>
            <>
            {currentProducts && currentProducts.map((data) => {
                if (customArr){
                    if(arr.includes(data.id)){
                        return (
                            <Product 
                                data={data} 
                                key={data.id} 
                                overlay={options.overlay} 
                                choose={options.choose} 
                                col={options.col}
                            />
                        )
                    }
                }
                else
                    return (
                        <Product 
                            data={data} 
                            key={data.id} 
                            overlay={options.overlay} 
                            choose={options.choose} 
                            col={options.col}
                        />
                    )
            })}
            </>            
            {!customArr && currentProducts !== [] &&
            <ul className="pagination">
                {createListPage(numberPages)}
            </ul>
            }
        </>
    );
};

export default FeaturesProducts;