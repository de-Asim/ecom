import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addNewAddress, clearErrors, clearMsg, getAllAddresses, removeAddress } from '../../actions/orderAction'
import './shipping.css'
import { useAlert } from "react-alert";
import { useNavigate } from 'react-router-dom';
import { Country, State } from 'country-state-city'

function Shipping() {
    const dispatch = useDispatch()
    const alert = useAlert()
    const navigate = useNavigate()

    const [isNewAddress, setIsNewAddress] = useState('none')
    const { loading, error, msg, address } = useSelector((state) => state.order)
    const { cartItems, total } = useSelector((state) => state.cart)
    const [addressChecked, setAddressChecked] = useState()
    let isCheckedTemp = []
    if (address) {
        address.map((e) => { isCheckedTemp.push(false) })
    }
    const [isChecked, setIsChecked] = useState(isCheckedTemp)

    const checkBoxHandle = (e) => {
        if (addressChecked === e) {
            setAddressChecked(undefined)
        }
        setAddressChecked(e)
    }
    useEffect(() => {
        isCheckedTemp[addressChecked] = true
        setIsChecked(isCheckedTemp)
    }, [addressChecked])

    const [newAddress, setNewAddress] = useState({
        name: "",
        mobile: "",
        country: "",
        state: "",
        city: "",
        PIN: "",
        address: "",
        type: ""
    })
    const addAddressFormHandle = (e) => {
        e.preventDefault()
        const myForm = new FormData();
        myForm.set("name", newAddress.name);
        myForm.set("mobile", newAddress.mobile);
        myForm.set("country", newAddress.country);
        myForm.set("state", newAddress.state);
        myForm.set("city", newAddress.city);
        myForm.set("PIN", newAddress.PIN);
        myForm.set("address", newAddress.address);
        myForm.set("type", newAddress.type);
        dispatch(addNewAddress(myForm));
    }
    const addressDataChanger = (e) => {
        setNewAddress({ ...newAddress, [e.target.name]: e.target.value })
    }

    const removeAddressHandle = (id) => {
        dispatch(removeAddress(id))
    }

    const shippingSubmitHandle = () => {
        if (addressChecked === undefined) {
            alert.error('Please select an address')
        }
        else {
            navigate(`/signin?redirect=payment?address=${address[addressChecked]._id}`)
        }
    }



    const Address = (props) => {
        return (
            <>
                <div className='shipingAddress'>
                    <div>
                        <div><span className='shipingAddressName'>{props.address.name}</span> <span className='shipingAddressType'>{props.address.type}</span><span className='shipingAddressMobile'>{props.address.mobile}</span> <button className='removeAddressBtn' type='button' onClick={() => { removeAddressHandle(props.address._id) }}>Remove</button></div>
                        <div>
                            <span>{props.address.address}, {props.address.city}, {props.address.state}, {props.address.country} - <span className='shipingAddressPIN'>{props.address.PIN}</span></span>
                        </div>
                    </div>
                    <div class="round">
                        <input type="checkbox" name="selectedAddress" value={props.index} checked={isChecked[props.index]} id={'checkbox' + props.index} onClick={() => { checkBoxHandle(props.index); setIsNewAddress('none') }} />
                        <label for={'checkbox' + props.index}></label>
                    </div>
                </div>
            </>
        )
    }

    const OrderItem = (props) => {
        return (
            <div className='orderItem'>
                <span>{props.product.name.length > 20 ? <>{props.product.name.slice(0, 20) + '...'}</> : <>{props.product.name}</>}</span>
                <span>₹{props.product.price}*{props.product.quantity}</span>
            </div>
        )
    }

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        else if (msg) {
            alert.success(msg)
            dispatch(clearMsg())
            dispatch(getAllAddresses())
            setNewAddress({
                name: "",
                mobile: "",
                country: "",
                state: "",
                city: "",
                PIN: "",
                address: "",
            })
        }
    }, [dispatch, error, msg, alert])

    useEffect(() => {
        if (address.length === 0) {
            setIsNewAddress('block')
        }
        else {
            setIsNewAddress('none')
        }
    }, [address])


    useEffect(() => {
        dispatch(getAllAddresses())
    }, [])


    return (
        <>
            <div className="shippingCon">
                <div className="shippingBox">
                    <div className="shippingBoxLeft">
                        <div className='shippingBoxLeftTop'>
                            <div>Login</div>
                            <div><span>Asim Kumar De</span> info.asimde01@gmail.com</div>
                        </div>
                        <div className='shippingBoxLeftAddress'>
                            <div className='shippingBoxHeader'>Shipping Addresses</div>
                            <div>{!loading && address && address.map((e, index) => <Address address={e} index={index} />)}</div>
                        </div>
                        <div className="addAdress">
                            <div className='shippingBoxHeader' style={{ cursor: 'pointer' }} onClick={() => { setIsNewAddress('block') }}>Add new Address</div>
                            <div className='addAddressBox' style={{ display: isNewAddress }}>
                                <form className='addAddressForm' onSubmit={addAddressFormHandle}>
                                    <div>
                                        <input type="text" name='name' placeholder='Full Name' value={newAddress.name} onChange={addressDataChanger} />
                                        <input type="text" name='mobile' placeholder='Mobile' value={newAddress.mobile} onChange={addressDataChanger} />
                                    </div>
                                    <div>
                                        <select type="text" name='country' placeholder='Country' value={newAddress.country} onChange={addressDataChanger} >
                                            <option value="">Country</option>
                                            {Country && Country.getAllCountries().map((e) => <option value={e.isoCode}>{e.name}</option>)}
                                        </select>
                                        <select type="text" name='state' placeholder='State' value={newAddress.state} onChange={addressDataChanger} >
                                            <option value="">State</option>
                                            {newAddress.country && State && State.getStatesOfCountry(newAddress.country).map((e) => <option value={e.name}>{e.name}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <input type="text" name='city' placeholder='City' value={newAddress.city} onChange={addressDataChanger} />
                                        <input type="text" name='PIN' placeholder='PIN' value={newAddress.PIN} onChange={addressDataChanger} />
                                    </div>
                                    <textarea name="address" cols="30" rows="3" placeholder="Address (Area & Street)" value={newAddress.address} onChange={addressDataChanger}></textarea>
                                    <div className='selectAddressType'>
                                        <span>Address type:</span>
                                        <div>
                                            <div>
                                                <input type="radio" id="home" name="type" value="Home" onChange={addressDataChanger} />
                                                <label for="home">Home (All day delivery)</label>
                                            </div>
                                            <div>
                                                <input type="radio" id="work" name="type" value="Work" onChange={addressDataChanger} />
                                                <label for="work">Work (Delivery between 10AM-5PM)</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div><button className='saveAddBtn' type='submit'>Save Address</button>
                                        <button className='cancelBtn' type='button' onClick={() => { setIsNewAddress('none') }}>Cancel</button></div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="shippingBoxRight">
                        <div className='shippingBoxHeader'>Order Summary</div>
                        <div className='orderItems'>
                            {cartItems.map((e) => <OrderItem product={e} />)}
                            <div className='orderItem'>
                                <span>GST (18%)</span>
                                <span>₹{Math.floor(total*18/100)}</span>
                            </div>
                        </div>
                        <div className='shippingBoxRightTotal'><span>Total</span><span>₹ {total+Math.floor(total*18/100)}</span></div>
                        <button className='shippingProceedBtn' onClick={shippingSubmitHandle}>Proceed</button>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Shipping