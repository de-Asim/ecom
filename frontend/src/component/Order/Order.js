import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOrders } from '../../actions/orderAction'
import PaginationComp from '../layout/PaginationComp'
import Loader from '../loader/loader'
import './order.css'
import OrderBox from './OrderBox'

function Order() {
  const dispatch=useDispatch()
  const {orders,ordersCount,loading,error}= useSelector((state)=>state.order)

  const[currentPage,setCurrentPage]=useState(1)
    const setCurrentPageNo=(e)=>{
        setCurrentPage(e)
    }


  useEffect(() => {
    dispatch(getOrders(currentPage))
  }, [currentPage])
  
  return (
    <>
    {loading ? <Loader/> : <>
    <div className="ordersConParent">
    <div className="orderCon">
      {orders && orders.map((e)=><OrderBox order={e}/>)}
    </div>
    <PaginationComp currentPage={currentPage} resultPerPage={10} count={ordersCount} setCurrentPageNo={setCurrentPageNo}/>
    </div>
    </>}
    </>
  )
}

export default Order