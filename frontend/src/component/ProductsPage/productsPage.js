import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { useAlert } from "react-alert"
import Product from '../../component/ProductCard/Product'
import { getProduct } from '../../actions/productAction';
import Pagination from "react-js-pagination"
import './productPage.css'
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { createTheme } from '@mui/material/styles';

function valuetext(value) {
    return `${value}°C`;
}


function ProductsPage() {
    const alert = useAlert();
    const dispatch = useDispatch();
    const params = useParams()

    const [currentPage, setCurrentPage] = useState(1)
    const setCurrentPageNo = (e) => {
        setCurrentPage(e)
    }
    const [priceRange, setPriceRange] = React.useState([0, 1000000]);
    const priceChange = (event, newValue) => {
        setPriceRange(newValue);
    };
    
    const [rating, setRating] = React.useState([0]);

    const ratingChange = (event, newValue) => {
        setRating(newValue);
    };
    
    const category = params.category
    const keyword = params.keyword

    useEffect(() => {
        if (error) {
            return alert.error(error)
        }
        dispatch(getProduct(currentPage, keyword, category,priceRange,rating))
    }, [dispatch, currentPage, keyword, category,priceRange,rating]);

    const { loading, error, products, productsCount, resultPerPage } = useSelector((state) => state.products)



    function callPriceFilterFun(){
        
    }
    function callRatingFilterFun(){
        console.log('object');
    }
    return (
        <>
            <div className='ProductPage'>
                <div className="productsPageLeft">
                    <div className="priceSlider">
                        Price
                        <Box>
                            <Slider
                                size="small"
                                getAriaLabel={() => 'Price range'}
                                value={priceRange}
                                onChange={priceChange}
                                onChangeCommitted={callPriceFilterFun()}
                                valueLabelDisplay="auto"
                                getAriaValueText={valuetext}
                                step={500}
                                min={0}
                                max={100000}
                                color="warning"
                                disableSwap
                            />
                        </Box>
                    </div>
                    <div className="ratingsSlider">
                        Minimum rating
                        <Box>
                            <Box>
                                <Slider
                                    size="small"
                                    aria-label="Temperature"
                                    value={rating}
                                    onChange={ratingChange}
                                    onChangeCommitted={callRatingFilterFun()}
                                    min={0}
                                    max={5}
                                    step={0.5}
                                    color="warning"
                                    valueLabelDisplay="auto"
                                    getAriaValueText={valuetext}
                                />
                            </Box>
                        </Box>
                    </div>
                </div>
                <div className="productsPageRight">
                    <div className='mobileHide'>Products</div>
                    <div>{products && <><div className='productsPageContainer'>{products && products.map((elem) => <Product product={elem} />)}</div>
                        {resultPerPage < productsCount && <div className="paginationContainer">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resultPerPage}
                                totalItemsCount={productsCount}
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
                    </>}</div>
                </div>
            </div>
        </>
    )
}

export default ProductsPage