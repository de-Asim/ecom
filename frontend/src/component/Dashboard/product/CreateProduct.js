import { TextField } from '@mui/material'
import React, { useEffect } from 'react'
import './createProduct.css'
import MenuItem from '@mui/material/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { getAllCategories } from '../../../actions/categoryAction';
import { useState } from 'react';
import Loader from '../../loader/loader';
import { clearError, clearMsg, createNewProduct } from '../../../actions/adminAction';
import { RiDeleteBin6Line } from 'react-icons/ri';


function CreateProduct() {
    const dispatch = useDispatch()
    const alert = useAlert()

    // fetch categories
    const { AllCategories } = useSelector((state) => state.AllCategories)
    const adminState = useSelector((state) => state.admin)
    const [selectedCategory, setSelectedCaptegory] = useState('')
    const handleChange = (event) => {
        setSelectedCaptegory(event.target.value);
    };

    // form validation
    const productValidation = () => {
        if (!product.name) {
            alert.error("Enter product name")
            return false
        }
        if (!selectedCategory) {
            alert.error("Select a category")
            return false
        }
        if (!product.price) {
            alert.error("Enter product price")
            return false
        }
        if (!product.stock) {
            alert.error("Enter stock")
            return false
        }
        if (!product.description) {
            alert.error("Enter product description")
            return false
        }
        if (!productImg || productImg.length === 0) {
            alert.error("Upload product image")
            return false
        }
        return true

    }
    // form submit
    const [product, setProduct] = useState({})
    const [productImg, setProductImg] = useState([])

    const createProductSubmit = (e) => {
        e.preventDefault()
        const valid = productValidation()
        if (valid) {

            const myForm = new FormData();
            myForm.set("name", product.name);
            myForm.set("category", selectedCategory);
            myForm.set("price", product.price);
            myForm.set("stock", product.stock);
            myForm.set("description", product.description);
            productImg.forEach((e) => {
                myForm.append("images", e);

            })
            dispatch(createNewProduct(myForm));
            setProductImg([])
        }
    }


    //product data
    const productDataChange = (e) => {
        if (e.target.name === 'images') {
            const images = Array.from(e.target.files)
            if (images.length + productImg.length > 4) {
                alert.error('Image quantity limit 4 ')
                return
            }
            images.forEach((i) => {
                const reader = new FileReader();
                reader.onload = () => {
                    if (reader.readyState === 2) {
                        setProductImg((old) => [...old, reader.result]);
                    }
                };
                reader.readAsDataURL(i);
            })
        }
        else {
            setProduct({ ...product, [e.target.name]: e.target.value })
        }
    }

    // load
    useEffect(() => {
        if (adminState.error) {
            alert.error(adminState.error)
            dispatch(clearError())
        }
        if (adminState.msg) {
            alert.success(adminState.msg)
            setProduct({})
            setProductImg([])
            setSelectedCaptegory('')
            dispatch(clearMsg())
        }
        else{
            dispatch(getAllCategories())
        }
    }, [dispatch, adminState.error, adminState.msg])

    return (
        <>{adminState.loading ? <Loader /> :
            <div className='createProductParent'>
                <form onSubmit={createProductSubmit}>
                    <p><span>Create Product</span></p>
                    <div><TextField id="outlined-basic" label="Product name" name='name' variant="outlined" onChange={productDataChange} />
                        <TextField
                            select
                            label="Category"
                            value={selectedCategory}
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
                        <TextField id="outlined-basic" label="Price" type="number" name='price' InputProps={{ inputProps: { min: 0 } }} variant="outlined" onChange={productDataChange} />
                        <TextField id="outlined-basic" label="Stock" type="number" name='stock' InputProps={{ inputProps: { min: 1 } }} variant="outlined" onChange={productDataChange} />
                    </div>
                    <div>
                        <TextField id="outlined-basic" label="Description" name='description' variant="outlined" multiline minRows={2} maxRows={4} onChange={productDataChange} />
                    </div>
                    <div className='imageUploadDiv'>{productImg && productImg.length < 4 ? <>
                        <label className='createProductImgInput' for="myfile">Select images</label>
                        <input type="file" id="myfile" name="images" accept="image/*" multiple onChange={productDataChange} /></> :
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
                    }
                        <div className='imagePreviewCon'>
                            {productImg && productImg.map((e) => <>
                                <div className="productImgPreview">
                                    <img src={e} alt="" />
                                    <div
                                        onClick={() => {
                                            setProductImg(
                                                productImg.filter((image) => image !== e)
                                            );
                                        }}
                                    >
                                        <RiDeleteBin6Line color="white" size={"1.3rem"} />
                                    </div>
                                </div>
                            </>)}
                        </div>
                    </div>

                    <button>submit</button>
                </form>
            </div>}
        </>
    )
}

export default CreateProduct