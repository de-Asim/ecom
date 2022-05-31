import React, { useEffect, useState } from 'react'
import {useSelector,useDispatch} from "react-redux"
import { getProduct } from '../../actions/productAction';
import Product from '../../component/Product/Product'
import './home.css'
import Loader from '../../component/loader/loader'
import Pagination from "react-js-pagination"
import {useParams} from "react-router-dom"

const Home = () => {
    const dispatch = useDispatch();
    const params=useParams()

    const[currentPage,setCurrentPage]=useState(1)
    const setCurrentPageNo=(e)=>{
        setCurrentPage(e)
    }
    const keyword=params.keyword
    useEffect(()=>{
        dispatch(getProduct(keyword,currentPage))
    },[dispatch,keyword,currentPage]);

    const {loading,error,products,productsCount,resultPerPage}=useSelector((state)=>state.products)

    return (
        <>
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
