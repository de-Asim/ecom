import React, { useEffect, useState } from 'react'
import Carousel from "react-material-ui-carousel"
import Product from '../ProductCard/Product'
import { useSelector, useDispatch } from "react-redux"
import { clearErrors, getProductDetails } from '../../actions/productAction'
import { useParams } from "react-router-dom"
import './productDetails.css'
import Loader from '../loader/loader'
import Rating from "@mui/material/Rating";
import ReviewCard from './ReviewCard/ReviewCard'
import { useAlert } from "react-alert"
import { addToCart } from '../../actions/cartAction'


function ProductDetails() {
  const dispatch = useDispatch()
  const params = useParams()
  const alert = useAlert()
  const { loading, error, product } = useSelector((state) => state.productDetails)

  const [quantity,setQuantity]=useState(1)

  
  const decQuantity=()=>{
    if (quantity !== 1){
      setQuantity(quantity-1)
    }
  }
  const incQuantity=()=>{
    if (quantity !== product.stock){
      setQuantity(quantity+1)
    }
  }
  if(loading===false && product.stock === 0){
    setQuantity(0)
  }

  const addToCartHandle =()=>{
    dispatch(addToCart(params.id,quantity))
    alert.success("Added to cart")
  }
  
  useEffect(() => {
    if (error) {
      return alert.error(error)
    }
    dispatch(getProductDetails(params.id))
  }, [dispatch, params.id, error, alert])
  return (
    <>
      {loading ? <Loader /> : <div className="productDetails">
        {product ? <>
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
              <button className='incDec' onClick={decQuantity}>-</button>
              <input type=" " value={quantity} />
              <button className='incDec' onClick={incQuantity}>+</button>
              <button className='addToCardBtn' onClick={addToCartHandle}>Add To Cart</button>
            </div>
            <div className="prductDesc">
              <div>Description:</div>
              <br />
              <div>{product.description}</div>
            </div>
          </div>
          {product.reviews && product.reviews[0] ?
            <div className='reviewCon'>
              <div className="reviewLeft">
                <div className='reviewHeading'>Customer Reviews:</div>
                <div>
                  <Rating
                    name="half-rating"
                    defaultValue={product.ratings}
                    precision={0.5}
                    readOnly
                    sx={{ mr: 1 }}
                    size="medium"
                  />
                  {product.ratings} out of 5
                </div>
                <div>
                  <div>Review This Product</div>
                  <div>Share your thoughts with other customers</div>
                  <button>Write a product review</button>
                </div>
              </div>
              <div className="reviewMid">
                <div className='reviewHeading'>Top Reviews:</div>
                <div className='reviewCardCon'>
                  {product.reviews && product.reviews.slice(0, 5).map((review) => <ReviewCard review={review} />)}
                </div>
              </div>
            </div> :
            <div className='noReviewFound'><div>No reviews found</div>
              <button>Write a product review</button>
            </div>

          }
        </> : <div>Product Not Found</div>}
      </div>
      }
    </>
  )
}

export default ProductDetails