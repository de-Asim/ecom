import React, { useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import Loader from '../../loader/loader';
import { HiOutlineExternalLink } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { clearError, clearMsg, getAllOrder} from '../../../actions/adminAction';
import { useNavigate } from 'react-router-dom';

function AllOrder() {
    const dispatch = useDispatch()
    const alert = useAlert()
    const navigate= useNavigate()

    const { loading, error, msg, allOrder } = useSelector((state) => state.admin)

    // table headers
    const columns = [
        { field: 'id', headerName: 'ID', minWidth: 130, flex: 1 },
        { field: 'product', headerName: 'Product', minWidth: 130, flex: 1 },
        { field: 'quantity', headerName: 'Quantity', minWidth: 80, flex: .5 },
        { field: 'city', headerName: 'City', minWidth: 100, flex: .7 },
        { field: 'state', headerName: 'State', minWidth: 100, flex: .7 },
        { field: 'price', headerName: 'Price', minWidth: 80, flex: .5 },
        {
            field: 'status',
            headerName: 'Status',
            minWidth: 100,
            flex: .5,
        },
        {
            field: 'createdAt',
            type:'number',
            headerName: 'Ordered At',
            minWidth: 100,
            flex: .7
        },
        {
            field: 'actions',
            headerName: 'Actions',
            minWidth: 80,
            type: 'number',
            flex: .5,
            renderCell: (params) => {
                return (
                    <><div className='actionCon'>

                        <button className='editBtn' onClick={() => { navigate(`/admin/order/${params.row.id}`)}}>
                            < HiOutlineExternalLink size={'1.2rem'} />
                        </button>
                    </div>
                    </>
                );
            },
        },
    ];

    let rows = []
    // pushing user data to rows
    if (allOrder && allOrder.length > 0) {
        allOrder.map((e) => {
            rows.push({ id: e._id, product: e.productInfo.productName, quantity: e.productInfo.quantity, city: e.shipping.city, state: e.shipping.state, price:e.bill.total,status:e.status,createdAt: e.createdAt.slice(0, 10) })
        })
    }

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearError())
        }
        else if (msg) {
            alert.success(msg)
            dispatch(clearMsg())
        }
        else{
            dispatch(getAllOrder())
        }
    }, [dispatch, msg, error])


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
            </div>}
        </>
    )
}

export default AllOrder