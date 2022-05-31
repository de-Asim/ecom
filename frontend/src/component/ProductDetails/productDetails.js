import React, { useEffect } from 'react'
import Carousel from "react-material-ui-carousel"
import Product from '../Product/Product'
import { useSelector, useDispatch } from "react-redux"
import { getProductDetails } from '../../actions/productAction'
import { useParams } from "react-router-dom"
import './productDetails.css'
import Loader from '../loader/loader'
import Rating from "@mui/material/Rating";


function ProductDetails() {
  const dispatch = useDispatch()
  const params = useParams()
  const { loading, error, product } = useSelector((state) => state.productDetails)

  useEffect(() => {
    dispatch(getProductDetails(params.id))
  }, [dispatch, params.id])
  return (
    <>
      {loading ? Loader : <div className="productDetails">
        <div className='carouselCon'>
          <Carousel>
            {product.image &&
              product.image.map((item, i) => {
                return <img className='carouselImage' key={item.source} src={item.source} alt={`Slide ${i}`} />
              })}
          </Carousel>
        </div>
        <div className="detailCon">
          <div className="productName">{product.name}</div>
          <div className='productRating'>
          <Rating
                  name="half-rating"
                  defaultValue={product.ratings}
                  precision={0.5}
                  readOnly
                  sx={{ mr: 1 }}
                  size="medium"
                />
          </div>
          <div className="productPrice">₹{product.price}</div>
          <div className="productAddToCard">
            <button className='incDec'>-</button>
            <input type=" " value={1} />
            <button className='incDec'>+</button>
            <button className='addToCardBtn' type="submit">Add To Cart</button>
          </div>
          <div className="prductDesc">
            <div>Description:</div>
            <br />
            <div>{product.description}</div>
          </div>
        </div>
      </div>
      }
    </>
  )
}

export default ProductDetails