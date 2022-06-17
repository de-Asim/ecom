import React, { useEffect, useState } from 'react'
import {useSelector,useDispatch} from "react-redux"
import { clearErrors, getProduct } from '../../actions/productAction';
import Product from '../../component/ProductCard/Product'
import './home.css'
import Loader from '../../component/loader/loader'
import Pagination from "react-js-pagination"
import {useAlert} from "react-alert"
import SecondaryHeader from '../header/secondaryHeader/secondaryHeader';

const Home = () => {
    const alert = useAlert();
    const dispatch = useDispatch();

    const[currentPage,setCurrentPage]=useState(1)
    const setCurrentPageNo=(e)=>{
        setCurrentPage(e)
    }
    useEffect(()=>{
        if(error){
            return alert.error(error)
          }
        dispatch(getProduct(currentPage))
    },[dispatch,currentPage]);

    const {loading,error,products,productsCount,resultPerPage}=useSelector((state)=>state.products)

    return (
        <>
        <SecondaryHeader/>
        {loading ? (<Loader/>) :(<>
            <div className='productContainer'>{products && products.map((elem)=><Product product={elem}/>)}</div>

            {resultPerPage<productsCount && <div className="paginationContainer">
                <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={ productsCount }
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText={"First"}
                lastPageText="Last"
                itemClass='page-item'
                linkClass='page-link'
                activeClass='pageItemActive'
                activeLinkClass='pageLinkActive'
                />
            </div>}
        </>)}
        </>
    )
}

export default Home;
