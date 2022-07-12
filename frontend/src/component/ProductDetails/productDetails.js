import React, { useEffect, useState } from 'react'
import Carousel from "react-material-ui-carousel"
import Product from '../ProductCard/Product'
import { useSelector, useDispatch } from "react-redux"
import { clearErrors, clearMsg, getProductDetails, reviewProduct } from '../../actions/productAction'
import { useParams } from "react-router-dom"
import './productDetails.css'
import Loader from '../loader/loader'
import Rating from "@mui/material/Rating";
import ReviewCard from './ReviewCard/ReviewCard'
import { useAlert } from "react-alert"
import { addToCart } from '../../actions/cartAction'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import TablePagination from '@mui/material/TablePagination';


function ProductDetails() {
  const dispatch = useDispatch()
  const params = useParams()
  const alert = useAlert()
  const { loading, error, msg, product } = useSelector((state) => state.productDetails)


  // Add to cart
  const [quantity, setQuantity] = useState(1)

  const decQuantity = () => {
    if (quantity !== 1) {
      setQuantity(quantity - 1)
    }
  }
  const incQuantity = () => {
    if (quantity !== product.stock) {
      setQuantity(quantity + 1)
    }
  }
  if (loading === false && product && product.stock === 0) {
    setQuantity(0)
  }

  const addToCartHandle = () => {
    dispatch(addToCart(params.id, quantity))
    alert.success("Added to cart")
  }

  // Review Pagination
  // const reviewPerPage=2
  // const [page, setPage] = React.useState(1);
  // const [pageStart,setPageStart]=useState(0)
  // const [pageEnd,setPageEnd]=useState(reviewPerPage)

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  //   console.log(page)
  //   setPageStart(newPage*reviewPerPage)
  //   setPageEnd(pageStart+(reviewPerPage))
  // };

  //  Review modal
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const labels = {
    0: ["", ""],
    0.5: ['Useless', 'red'],
    1: ['Useless+', 'red'],
    1.5: ['Poor', 'orange'],
    2: ['Poor+', 'orange'],
    2.5: ['Ok', '#00C400'],
    3: ['Ok+', '#00C400'],
    3.5: ['Good', '#00C400'],
    4: ['Good+', '#00C400'],
    4.5: ['Excellent', 'green'],
    5: ['Excellent+', 'green'],
  };

  function getLabelText(value) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
  }

  const [value, setValue] = React.useState(0);
  const [hover, setHover] = React.useState(-1);

  // review submit

  const [review, setReview] = useState("")
  const reviewSubmit = () => {
    if (value > 0 && value <= 5) {
      dispatch(reviewProduct(params.id, value, review))
      setOpen(false)
    }
    else {
      alert.error("Invalid rating")
    }
  }

  // load
  useEffect(() => {
    if (error) {
      return alert.error(error)
    }
    if (msg) {
      alert.success(msg)
      dispatch(clearMsg)
    }
    dispatch(getProductDetails(params.id))
  }, [dispatch, params.id, error, msg, alert])
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
                  <button className='reviewBtn' onClick={handleClickOpen}>Write a product review</button>
                </div>
              </div>
              <div className="reviewMid">
                <div className='reviewHeadingBox'>
                  <div className='reviewHeading'>Top Reviews:</div>
                  {/* <TablePagination
                    component="div"
                    count={100}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={reviewPerPage}
                    className="ratingPagination"
                  /> */}
                </div>
                <div className='reviewCardCon'>
                  {product.reviews && product.reviews.slice(pageStart, pageEnd).map((review) => <ReviewCard review={review} />)}
                </div>
              </div>
            </div> :
            <div className='noReviewFound'><div>No reviews found</div>
              <button className='reviewBtn' onClick={handleClickOpen}>Write a product review</button>

            </div>


          }
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Rate this product</DialogTitle>
            <DialogContent>
              <Box
                sx={{
                  width: 200,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Rating
                  name="hover-feedback"
                  value={value}
                  precision={0.5}
                  getLabelText={getLabelText}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                  onChangeActive={(event, newHover) => {
                    setHover(newHover);
                  }}
                  emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                />
                {value !== null && (
                  <Box sx={{ ml: 2, color: labels[hover !== -1 ? hover : value][1] }}>{labels[hover !== -1 ? hover : value][0]}</Box>
                )}
              </Box>
            </DialogContent>
            <DialogTitle>Review this product</DialogTitle>
            <DialogContent>
              <TextField
                margin="dense"
                id="reviewInput"
                label="Review"
                type="text"
                fullWidth
                variant="standard"
                multiline
                onChange={(e) => { setReview(e.target.value) }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={reviewSubmit}>Submit</Button>
            </DialogActions>
          </Dialog>
        </> : <div>Product Not Found</div>}
      </div>
      }
    </>
  )
}

export default ProductDetails