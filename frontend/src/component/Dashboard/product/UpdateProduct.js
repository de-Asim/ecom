import { TextField } from "@mui/material";
import React, { useEffect } from "react";
import "./createProduct.css";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { getAllCategories } from "../../../actions/categoryAction";
import { useState } from "react";
import Loader from "../../loader/loader";
import {
  clearError,
  clearMsg,
  updateProduct,
} from "../../../actions/adminAction";
import {
  clearErrors as productClearError,
  getProductDetails,
} from "../../../actions/productAction";
import { useParams } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";

function UpdateProduct() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const params = useParams();

  // fetch product details
  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );

  // fetch categories
  const { AllCategories } = useSelector((state) => state.AllCategories);
  const adminState = useSelector((state) => state.admin);
  const [selectedCategory, setSelectedCaptegory] = useState("");
  const handleChange = (event) => {
    setSelectedCaptegory(event.target.value);
  };

  // form validation
  const productValidation = () => {
    if (productData.name && productData.name === "") {
      alert.error("Enter product name");
      return false;
    }
    if (selectedCategory && selectedCategory === "") {
      alert.error("Select a category");
      return false;
    }
    if (productData.price && productData.price === "") {
      alert.error("Enter product price");
      return false;
    }
    if (productData.stock && productData.stock === "") {
      alert.error("Enter stock");
      return false;
    }
    if (productData.description && productData.description === "") {
      alert.error("Enter product description");
      return false;
    }
    if (oldProductImg.length + newProductImg.length === 0) {
      alert.error("Upload product image");
      return false;
    }
    return true;
  };
  // form submit
  const [productData, setProductData] = useState({});
  const [oldProductImg, setOldProductImg] = useState([]);
  const [deleteProductImg, setDeleteProductImg] = useState([]);
  const [newProductImg, setNewProductImg] = useState([]);

  const updateProductSubmit = (e) => {
    e.preventDefault();
    const valid = productValidation();
    if (valid) {
      const myForm = new FormData();
      if (productData.name) {
        console.log(productData.name);
        myForm.set("name", productData.name);
      }
      if (selectedCategory) {
        myForm.set("category", selectedCategory);
      }
      if (productData.price) {
        myForm.set("price", productData.price);
      }
      if (productData.stock) {
        myForm.set("stock", productData.stock);
      }
      if (productData.description) {
        myForm.set("description", productData.description);
      }
      if (newProductImg && newProductImg.length > 0) {
        newProductImg.forEach((e) => {
          myForm.append("newImages", e);
        });
      }
      if (
        deleteProductImg &&
        deleteProductImg.length > 0 &&
        deleteProductImg.length <= 4
      ) {
        deleteProductImg.forEach((e) => {
          myForm.append("deleteImages", e.public_id);
        });
      }
      dispatch(updateProduct(params.id, myForm));
    }
  };

  //product data
  const productDataChange = (e) => {
    if (e.target.name === "images") {
      const images = Array.from(e.target.files);
      if (images.length + oldProductImg.length > 4) {
        alert.error("Image quantity limit 4 ");
        return;
      }
      images.forEach((i) => {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            setNewProductImg((old) => [...old, reader.result]);
          }
        };
        reader.readAsDataURL(i);
      });
    } else {
      setProductData({ ...productData, [e.target.name]: e.target.value });
    }
  };

  useEffect(() => {
    if (product && product.image) {
      setOldProductImg(product.image);
    }
  }, [product]);

  // load
  useEffect(() => {
    if (adminState.error) {
      alert.error(adminState.error);
      dispatch(clearError());
    } else if (error) {
      alert.error(error);
      dispatch(productClearError());
    } else if (adminState.msg) {
      alert.success(adminState.msg);
      setProductData({});
      setNewProductImg([]);
      setOldProductImg([]);
      setSelectedCaptegory("");
      setDeleteProductImg([]);
      dispatch(clearMsg());
      // navigate("/admin/product/all");
    } else {
      dispatch(getAllCategories());
      dispatch(getProductDetails(params.id));
    }
  }, [dispatch, adminState.error, adminState.msg]);

  return (
    <>
      {loading || adminState.loading ? (
        <Loader />
      ) : (
        <div className="createProductParent">
          <form onSubmit={updateProductSubmit}>
            <p>
              <span>Update Product</span>
            </p>
            <div>
              <TextField
                id="outlined-basic"
                label="Product name"
                defaultValue={product.name}
                name="name"
                variant="outlined"
                onChange={productDataChange}
              />
              <TextField
                select
                label="Category"
                defaultValue={product.category}
                onChange={handleChange}
              >
                {AllCategories.map((e) => (
                  <MenuItem key={e.category} value={e.category}>
                    {e.category}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div>
              <TextField
                id="outlined-basic"
                defaultValue={product.price}
                label="Price"
                type="number"
                name="price"
                InputProps={{ inputProps: { min: 0 } }}
                variant="outlined"
                onChange={productDataChange}
              />
              <TextField
                id="outlined-basic"
                defaultValue={product.stock}
                label="Stock"
                type="number"
                name="stock"
                InputProps={{ inputProps: { min: 1 } }}
                variant="outlined"
                onChange={productDataChange}
              />
            </div>
            <div>
              <TextField
                id="outlined-basic"
                defaultValue={product.description}
                label="Description"
                name="description"
                variant="outlined"
                multiline
                minRows={2}
                maxRows={4}
                onChange={productDataChange}
              />
            </div>
            <div className="imageUploadDiv">
              {oldProductImg &&
              oldProductImg.length + newProductImg.length < 4 ? (
                <>
                  <label className="createProductImgInput" for="myfile">
                    Select images
                  </label>
                  <input
                    type="file"
                    id="myfile"
                    name="images"
                    accept="image/*"
                    multiple
                    onChange={productDataChange}
                  />
                </>
              ) : (
                <>
                  <label
                    className="createProductImgInput"
                    onClick={() => alert.error("image quantity limit 4")}
                    for="myfile"
                  >
                    Select images
                  </label>
                  <input
                    type="file"
                    id="myfile"
                    name="images"
                    accept="image/*"
                    disabled
                    multiple
                    onChange={productDataChange}
                  />
                </>
              )}
              <div className="imagePreviewCon">
                {oldProductImg &&
                  oldProductImg.map((e) => (
                    <>
                      <div className="productImgPreview">
                        <img src={e.source} alt="" />
                        <div
                          onClick={() => {
                            setOldProductImg(
                              oldProductImg.filter((image) => image !== e)
                            );
                            setDeleteProductImg((old) => [...old, e]);
                          }}
                        >
                          <RiDeleteBin6Line color="white" size={"1.3rem"} />
                        </div>
                      </div>
                    </>
                  ))}
                {newProductImg &&
                  newProductImg.map((e) => (
                    <>
                      <div className="productImgPreview">
                        <img src={e} alt="" />
                        <div
                          onClick={() => {
                            setNewProductImg(
                              newProductImg.filter((image) => image !== e)
                            );
                          }}
                        >
                          <RiDeleteBin6Line color="white" size={"1.3rem"} />
                        </div>
                      </div>
                    </>
                  ))}
              </div>
            </div>

            <button>submit</button>
          </form>
        </div>
      )}
    </>
  );
}

export default UpdateProduct;
