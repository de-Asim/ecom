import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { addToCart, removeFromCart } from '../../actions/cartAction'
import './cart.css'

function CartItems(props) {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const decQty =()=>{
        if(props.product.quantity > 0){
            dispatch(addToCart(props.product.productId,props.product.quantity-1))
        }
    }
    const incQty =()=>{
        if(props.product.stock >= props.product.quantity){
            dispatch(addToCart(props.product.productId,props.product.quantity+1))
        }
    }

    const removeFromCartHandle =()=>{
        dispatch(removeFromCart(props.product.productId))
    }
    return (
        <>
            <tr>
                <td className='cartProduct'>
                    <div className="cartProductLeft">
                        <img src={props.product.image} alt="" />
                    </div>
                    <div className="cartProductRight">
                        <div className='cartProductRightName' onClick={()=>{navigate(`/product/${props.product.productId}`)}}>{props.product.name}</div>
                        <div className='cartProductRightPrice'>Price: ₹{props.product.price}</div>
                        <button className='cartProductRightBtn' type='button' onClick={removeFromCartHandle}>Remove</button>
                    </div>
                </td>
                <td className='cartQuantity'>
                    <button className='incDec' type='button' onClick={decQty}>-</button>
                    <span style={{padding:'0 .5rem'}}>{props.product.quantity}</span> 
                    <button className='incDec' type='button' onClick={incQty}>+</button>
                </td>
                <td className='cartSubTotal'>₹{props.product.price * props.product.quantity}</td>
            </tr>
        </>
    )
}

export default CartItems