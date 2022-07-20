const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const asyncErr = require("../middleware/asyncErr");
const ApiFeature = require("../utils/apiFeatures");
const cloudinary = require('cloudinary')

// create product
exports.createProduct = asyncErr(async (req, res, next) => {
  let myCloud
  let image = []
  if (!req.body.images) {
    return next(new ErrorHandler("Please upload image", 400))
  }
  if (typeof (req.body.images) === 'string') {
    myCloud = await cloudinary.v2.uploader.upload(req.body.images, {
      folder: "product-image",
      width: 500,
      crop: "scale"
    })
    image.push({
      public_id: myCloud.public_id,
      source: myCloud.secure_url,
    })
  }
  else {
    for (i = 0; i < req.body.images.length; i++) {
      myCloud = await cloudinary.v2.uploader.upload(req.body.images[i], {
        folder: "product-image",
        width: 500,
        crop: "scale"
      })
      image.push({
        public_id: myCloud.public_id,
        source: myCloud.secure_url,
      })
    }
  }

  const { name, description, price, stock, category } = req.body
  await Product.create({
    name,
    description,
    price,
    stock,
    category,
    image,
    createdBy: req.user._id
  });

  res.status(201).json({
    success: true,
  });
});

// get all product
exports.getAllProducts = asyncErr(async (req, res) => {
  const resultPerPage = 10
  const apiFeature = new ApiFeature(Product.find(), req.query)
    .search()
    .filter()
    .category();
  let allProducts = await apiFeature.query;
  const productsCount = allProducts.length
  apiFeature.pagination(resultPerPage);
  allProducts = await apiFeature.query.clone();
  res.status(200).json({
    success: true,
    allProducts,
    productsCount,
    resultPerPage
  });
});
// get all product --admin
exports.getAllProductsAdmin = asyncErr(async (req, res) => {
  const apiFeature = new ApiFeature(Product.find(), req.query)
    .search()
    .filter()
    .category();
  let allProducts = await apiFeature.query;
  const productsCount = allProducts.length
  allProducts = await apiFeature.query.clone();
  res.status(200).json({
    success: true,
    allProducts,
    productsCount,
  });
});

// update product
exports.updateProduct = asyncErr(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  let myCloud
  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }
  console.log(req.body.deleteImages);
  if(req.body.deleteImages && typeof(req.body.deleteImages)==='string'){
    await cloudinary.uploader.destroy(req.body.deleteImages)
    product.image = product.image.filter((image)=>image.public_id!=req.body.deleteImages)
  }
  else if(req.body.deleteImages){
    for(i=0;i<req.body.deleteImages.length;i++){
      await cloudinary.uploader.destroy(req.body.deleteImages[i])
      product.image = product.image.filter((image)=>image.public_id!==req.body.deleteImages[i]) 
    }
  }

  if(req.body.newImages && typeof(req.body.newImages)==='string'){
    myCloud= await cloudinary.uploader.upload(req.body.newImages,{
      folder: "product-image",
      width: 500,
      crop: "scale"
    })
    product.image.push({
      public_id: myCloud.public_id,
      source: myCloud.secure_url,
    })
  }
  else if(req.body.newImages){
    for(i=0;i<req.body.newImages.length;i++){
      myCloud = await cloudinary.uploader.upload(req.body.newImages[i],{
        folder: "product-image",
        width: 500,
        crop: "scale"
      })
      product.image.push({
        public_id: myCloud.public_id,
        source: myCloud.secure_url,
      })
    }
  }
  await product.save()
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
  product.reviews.forEach((e) => {
    user = e.user.toString()
    if (user === req.user._id.toString()) {
      isReviewed = true;
    }
  })

  if (isReviewed) {
    product.reviews.forEach((e) => {
      if (e.user.toString() === req.user._id.toString())
        (e.rating = review.rating), (e.message = review.message);
    });
    await product.save({ validateBeforeSave: false });
  } else {
    product.reviews.unshift(review);
    product.numOfReviews = product.reviews.length;
    await product.save({ validateBeforeSave: false });
  }

  let ratingSum = 0;
  product.reviews.forEach((e) => {
    ratingSum += Number(e.rating);
  })
  product.ratings = Math.round(ratingSum * 10 / product.numOfReviews) / 10;
  await product.save({ validateBeforeSave: false })

  res.status(201).json({
    success: true,
    product
  })
});

// get all reviews of a product
exports.getReviews = asyncErr(async (req, res, next) => {
  const product = await Product.findById(req.query.id)
  if (!product) {
    return next(new ErrorHandler("product not found", 404))
  }
  const ratings = product.ratings;
  const numOfReviews = product.numOfReviews
  const reviews = product.reviews;

  res.status(200).json({
    success: true,
    ratings,
    numOfReviews,
    reviews
  })
})

// delete reviews
exports.deleteReviews = asyncErr(async (req, res, next) => {
  const product = await Product.findById(req.query.id);
  if (!product) {
    return next(new ErrorHandler("product not found"))
  }

  let reviews = product.reviews.filter((e) => e._id.toString() !== req.query.revId.toString());
  console.log(reviews);
  const numOfReviews = reviews.length;
  let ratingSum = 0;
  reviews.forEach((e) => {
    ratingSum += Number(e.rating);
  })
  const ratings = ratingSum / numOfReviews;

  const updatedProduct = await Product.findByIdAndUpdate(req.query.id, { reviews, numOfReviews, ratings }, {
    new: true,
    runValidators: true,
    useFindAndModify: false
  })

  res.status(200).json({
    success: true,
    updatedProduct
  })

})
