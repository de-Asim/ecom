import React, { useEffect, useState } from 'react'
import {useSelector,useDispatch} from "react-redux"
import { clearErrors, getProduct } from '../../actions/productAction';
import Product from '../../component/ProductCard/Product'
import './home.css'
import Loader from '../../component/loader/loader'
import Pagination from "react-js-pagination"
import {useAlert} from "react-alert"
import SecondaryHeader from '../header/secondaryHeader/secondaryHeader';
import PaginationComp from '../layout/PaginationComp';

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
            <PaginationComp currentPage={currentPage} resultPerPage={resultPerPage} count={productsCount} setCurrentPageNo={setCurrentPageNo}/>
        </>)}
        </>
    )
}

export default Home;
