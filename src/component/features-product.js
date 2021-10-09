import { useState, useEffect } from 'react';
import Product from './product';

//hooks
import { useFetchProducts } from './hooks/useFetchProducts';
import { Spinner } from './Spinner/Spinner.styles';


const FeaturesProducts = ({ arr, customArr, options, productPerPage = 6, currentPage = 1 }) => {
    const { state: datas, loading, error } = useFetchProducts();
    const [currentProducts, setCurrentProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [thisCurrentPage, setThisCurrentPage] = useState(currentPage);
    let numberPages = 1;                               //DEFAULT NUMBER OF PAGINATION
    
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
                    <a href="" onClick = {(ev)=> this.changePageHandler(i,ev)}>
                        {i}
                    </a>
                </li>
            )
        }
        return pages;
    }

    useEffect(()=>{
        let startIndex = productPerPage * (thisCurrentPage - 1);
        let endIndex = startIndex + productPerPage;//this.state.productPerPage*this.state.currentPage
        setProducts(datas.slice(startIndex,endIndex));
        
        //Update numberPages
        numberPages = Math.ceil(datas.length/productPerPage);
        setProducts(datas);

        if (customArr){
            setCurrentProducts(datas);
        } else{
            setCurrentProducts(products);
        }
    })

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
                <li><a href="">&raquo;</a></li>
            </ul>
            }
        </>
    );

}

export default FeaturesProducts;