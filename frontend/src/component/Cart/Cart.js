import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import CartItems from './CartItems'
import './cart.css'
import { useState } from 'react'
import { ImSad } from 'react-icons/im'
import { Link, useNavigate } from 'react-router-dom'


function Cart() {
    const navigate = useNavigate()
    const [total, setTotal] = useState(0)
    const { cartItems } = useSelector((state) => state.cart)
    const { isAuthenticated } = useSelector((state) => state.user)
    useEffect(() => {
        let sum = 0
        cartItems.forEach(element => {
            sum = sum + (element.price * element.quantity)
            setTotal(sum)
        });
    }, [cartItems])

    console.log(cartItems)
    return (
        <>
            <div className="cartCon">
                {cartItems.length != 0 ?
                    <div className="cartBox">
                        <table className='cartTable'>
                            <tr>
                                <th className='cartProductHead'>Product</th>
                                <th className='cartQuantityHead'>Quantity</th>
                                <th className='cartPriceHead'>Sub Total</th>
                            </tr>
                            {cartItems && cartItems.map((i) => <CartItems product={i} />)}
                        </table>
                        <div className='cartTotalParent'>
                            <div className='cartTotal'>
                                <div>
                                    <div>Gross Total</div>
                                    <div>₹{total}</div>
                                </div>
                                <button onClick={()=>{if(!isAuthenticated){navigate('/signin?redirect=shipping')}else{navigate('/shipping')}}}>Check Out</button>
                            </div>
                        </div>
                    </div> :<div className='emptyCartParent'>
                    <div className='emptyCartBox'>
                        <div className='emptyCartBoxSvg' ><ImSad/></div>
                        <div>Looks like you haven't added anything.</div>
                        <Link to={'/'}><button>Shop Now</button></Link>
                    </div>
                    </div>}
            </div>
        </>
    )
}

export default Cart