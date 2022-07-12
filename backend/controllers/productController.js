const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const asyncErr = require("../middleware/asyncErr");
const ApiFeature = require("../utils/apiFeatures");

// create product
exports.createProduct = asyncErr(async (req, res, next) => {
  req.body.createdBy = req.user._id;

  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

// get all product
exports.getAllProducts = asyncErr(async (req, res) => {
  const resultPerPage=10
  const apiFeature = new ApiFeature(Product.find(), req.query)
  .search()
  .filter()
  .category();
  let allProducts = await apiFeature.query;
  const productsCount=allProducts.length
  apiFeature.pagination(resultPerPage);
  allProducts = await apiFeature.query.clone();
  res.status(200).json({
    success: true,
    allProducts,
    productsCount,
    resultPerPage
  });
});

// update product
exports.updateProduct = asyncErr(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(201).json({
    success: true,
    product,
  });
});

// delete product
exports.deleteProduct = asyncErr(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }
  await product.remove();
  res.status(200).json({
    success: true,
    messege: "product deleted",
  });
});

// single product details
exports.getProduct = asyncErr(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }
  res.status(200).json({
    success: true,
    product,
  });
});

// product review & rating
exports.productReview = asyncErr(async (req, res, next) => {
  const { rating, message } = req.body;
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: rating,
    message: message
  };

  const productId = req.params.id;
  let product = await Product.findById(productId);
  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }
  
  let isReviewed = false;
  product.reviews.forEach((e)=>{
    user=e.user.toString()
    if (user === req.user._id.toString()){
      isReviewed = true;
    }
  })

  if (isReviewed) {
    product.reviews.forEach((e) => {
      if (e.user.toString() === req.user._id.toString())
        (e.rating = review.rating), (e.message = review.message);
    });
    await product.save({validateBeforeSave:false});
  } else {
    product.reviews.unshift(review);
    product.numOfReviews = product.reviews.length;
    await product.save({validateBeforeSave:false});
  }

  let ratingSum = 0;
  product.reviews.forEach((e)=>{
    ratingSum += Number(e.rating);
  })
  product.ratings = Math.round(ratingSum*10/product.numOfReviews)/10;
  await product.save({validateBeforeSave:false})

  res.status(201).json({
    success:true,
    product
  })
});

// get all reviews of a product
exports.getReviews = asyncErr(async(req,res,next)=>{
  const product = await Product.findById(req.query.id)
  if(!product){
    return next(new ErrorHandler("product not found",404))
  }
  const ratings = product.ratings;
  const numOfReviews = product.numOfReviews
  const reviews = product.reviews;

  res.status(200).json({
    success:true,
    ratings,
    numOfReviews,
    reviews
  })
})

// delete reviews
exports.deleteReviews=asyncErr(async(req,res,next)=>{
  const product = await Product.findById(req.query.id);
  if(!product){
    return next(new ErrorHandler("product not found"))
  }
  
  let reviews = product.reviews.filter((e)=>e._id.toString()!==req.query.revId.toString());
  console.log(reviews);
  const numOfReviews = reviews.length;
  let ratingSum = 0;
  reviews.forEach((e)=>{
    ratingSum += Number(e.rating);
  })
  const ratings = ratingSum/numOfReviews;

  const updatedProduct = await Product.findByIdAndUpdate(req.query.id,{reviews,numOfReviews,ratings},{
    new:true,
    runValidators:true,
    useFindAndModify:false
  })

  res.status(200).json({
    success:true,
    updatedProduct
  })

})
