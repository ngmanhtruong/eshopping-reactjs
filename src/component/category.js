import React from 'react';
import { Link} from 'react-router-dom';
import { useFetchCategories } from './hooks/useFetchCategories';
// import { useParams } from 'react-router';

const Category = ({ setSort, setState }) => {
    // const { cate } = useParams();
    const { state: category, loading, error } = useFetchCategories();
    if(error) <p>Something is wrong...</p>;
    
    const handleClick = () =>{
        setState(false);
        setTimeout(()=>{
            setState(true);
        },200)
    }

    return (
    <>
        {/* <!--/category-products--> */}
        <h2>Category</h2>
        <div className="panel-group category-products" id="accordian">
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h4 className="panel-title">
                        <Link to='/shop' onClick={()=>handleClick()}>All products</Link>
                    </h4>
                </div>
            </div>
            {/* <!--category-productsr--> */}
            {category && category.map((cate) => {
                return (
                    <div key={cate.toString()} className="panel panel-default">
                        <div className="panel-heading">
                            <h4 className="panel-title">
                                <Link to={`/shop/${cate}`} onClick={()=>handleClick()}>{cate}</Link>
                            </h4>
                        </div>
                    </div>
                )
            })}
        </div>
    </>
    );
}

export default Category;