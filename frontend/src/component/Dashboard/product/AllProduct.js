import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import './allproduct.css'
import { useAlert } from 'react-alert';
import { clearError, clearMsg, deleteProduct, getAllProductsAdmin } from '../../../actions/adminAction';
import Loader from '../../loader/loader';
import { FiEdit } from 'react-icons/fi'
import { MdDelete } from 'react-icons/md'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { useState } from 'react';


//  export function started
function AllProduct() {
    const dispatch = useDispatch()
    const alert = useAlert()

    const { loading, error, allProducts, msg } = useSelector((state) => state.admin) //getting products from redux

    // delete product 
    const [deleteId, setDeleteId] = useState('')

    const deleteProductHandler = () => {
        handleClose()
        dispatch(deleteProduct(deleteId))
    }

    // modal handle
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = (id) => {
        setDeleteId(id)
        setOpen(true);
    };
    
    const handleClose = () => {
        setDeleteId('')
        setOpen(false);
    };

    // set table columns
    const columns = [
        { field: 'id', headerName: 'ID', minWidth: 90, flex: 1 },
        { field: 'productName', headerName: 'Product name', minWidth: 110, flex: 1 },
        { field: 'productCategory', headerName: 'Category', minWidth: 80, flex: .7 },
        {
            field: 'stock',
            headerName: 'Stock',
            type: 'number',
            minWidth: 80,
            flex: .5
        },
        {
            field: 'ordered',
            headerName: 'Ordered',
            type: 'number',
            minWidth: 80,
            flex: .5
        },
        {
            field: 'delivered',
            headerName: 'Delivered',
            type: 'number',
            minWidth: 80,
            flex: .5
        },
        {
            field: 'price',
            headerName: 'Price',
            type: 'number',
            minWidth: 90,
            flex: .5
        },
        {
            field: 'actions',
            headerName: 'Actions',
            minWidth: 90,
            type: 'number',
            flex: .5,
            renderCell: (params) => {
                return (
                    <><div className='actionCon'>
                        <Link className='editBtn' to={`/admin/product/update/${params.getValue(params.id, "id")}`}>
                            < FiEdit />
                        </Link>

                        <button
                            onClick={() =>
                                handleClickOpen(params.getValue(params.id, "id"))
                            }
                        >
                            <MdDelete />
                        </button>
                        </div>
                    </>
                );
            },
        },
    ];

    let rows = []
    //pushing product data to rows
    if (!loading && allProducts && allProducts.length !== 0) {
        allProducts.map((e) => {
            rows.push({ id: e._id, productName: e.name, productCategory: e.category, stock: e.stock, ordered: e.ordered, delivered: e.delivered, price: e.price })
        })
    }
    // load
    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearError())
        }
        if (msg) {
            alert.error(msg)
            dispatch(clearMsg())
        }
        dispatch(getAllProductsAdmin())
    }, [dispatch, error, msg])



    return (
        <>{loading ? <Loader /> :
            <div className='allProductsParent'>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    disableSelectionOnClick
                    autoHeight
                    disableColumnMenu
                />
                <div>
                    {/* modal to delete */}
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {"Confirm delete ?"}
                        </DialogTitle>
                        <DialogActions>
                            <Button sx={{color:"#08CC8E"}}  onClick={handleClose}>Cancel</Button>
                            <Button sx={{color:'orangered'}} onClick={deleteProductHandler} autoFocus>
                                Delete
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>}
        </>
    )
}

export default AllProduct