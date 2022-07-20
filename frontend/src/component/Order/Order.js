import React, { useEffect, useState } from 'react'
import { ImSad } from 'react-icons/im'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getOrders } from '../../actions/orderAction'
import PaginationComp from '../layout/PaginationComp'
import Loader from '../loader/loader'
import './order.css'
import OrderBox from './OrderBox'

function Order() {
  const dispatch = useDispatch()
  const { orders, ordersCount, loading, error } = useSelector((state) => state.order)

  const [currentPage, setCurrentPage] = useState(1)
  const setCurrentPageNo = (e) => {
    setCurrentPage(e)
  }


  useEffect(() => {
    dispatch(getOrders(currentPage))
  }, [currentPage])

  return (
    <>
      {loading ? <Loader /> : <>
        <div className="ordersConParent">
        {orders && orders.length > 0 ?
          <div className="orderCon">
             {orders.map((e) => <OrderBox order={e} />)}
            <PaginationComp currentPage={currentPage} resultPerPage={10} count={ordersCount} setCurrentPageNo={setCurrentPageNo} />
          </div> : <div className='emptyCartParent'>
              <div className='emptyCartBox'>
                <div className='emptyCartBoxSvg' ><ImSad /></div>
                <div>Looks like you haven't ordered anything.</div>
                <Link to={'/'}><button>Shop Now</button></Link>
              </div>
            </div>}
        </div>
      </>}
    </>
  )
}

export default Order