import React from 'react';
import { Link} from 'react-router-dom';
import { useFetchCategories } from './hooks/useFetchCategories';


const Category = () => {
    const { state: category, loading, error } = useFetchCategories();
    if(error) <p>Something is wrong...</p>;
    return (
    <>
        {/* <!--/category-products--> */}
        <h2>Category</h2>
        <div className="panel-group category-products" id="accordian">
            {/* <!--category-productsr--> */}
            {category && category.map((cate) => {
                return (
                    <div key={cate.toString()} className="panel panel-default">
                        <div className="panel-heading">
                            <h4 className="panel-title">
                                <Link to={`/shop/${cate}`}>{cate}</Link>
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