import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import {
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import "./payment.css";
import { clearErrors, clearMsg, getAddress, newOrder } from "../../actions/orderAction";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BsCreditCard } from 'react-icons/bs'
import { CgCalendarDates } from 'react-icons/cg'
import { RiKeyFill } from 'react-icons/ri'
import { removeFromCart } from "../../actions/cartAction";

function Payment() {

    const dispatch = useDispatch();
    const navigate= useNavigate()
    const alert = useAlert();
    const stripe = useStripe();
    const elements = useElements();
    const payBtn = useRef(null);
    const [search] = useSearchParams()

    const { shippingAddress, error, msg } = useSelector((state) => state.order);
    const { cartItems, total } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);

    const paymentData = {
        amount: total+Math.floor(total*18/100)*100,
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        // payBtn.current.disabled = true;

        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const { data } = await axios.post(
                "/api/v1/payment/process",
                paymentData,
                config
            );

            const client_secret = data.client_secret;

            if (!stripe || !elements) return;

            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email,
                        address: {
                            line1: shippingAddress.address,
                            city: shippingAddress.city,
                            state: shippingAddress.state,
                            postal_code: shippingAddress.PIN,
                            country: shippingAddress.country,
                        },
                    },
                },
            });

            if (result.error) {
                payBtn.current.disabled = false;

                alert.error(result.error.message);
            }
            else {
                if (result.paymentIntent.status === "succeeded") {
                    cartItems.forEach((item) => {
                        let myForm = new FormData();
                        myForm.set("id", item.productId);
                        myForm.set("name", shippingAddress.name);
                        myForm.set("address", shippingAddress.address);
                        myForm.set("city", shippingAddress.city);
                        myForm.set("state", shippingAddress.state);
                        myForm.set("country", shippingAddress.country);
                        myForm.set("PIN", shippingAddress.PIN);
                        myForm.set("mobile", shippingAddress.mobile);
                        myForm.set("type", shippingAddress.type);
                        myForm.set("productName", item.name);
                        myForm.set("category", item.category);
                        myForm.set("productImg", item.image);
                        myForm.set("quantity", item.quantity);
                        myForm.set("unitPrice", item.price);
                        myForm.set("price", item.price*item.quantity);
                        myForm.set("tax", item.price*item.quantity*18/100);
                        myForm.set("total", (item.price*item.quantity*18/100)+(item.price*item.quantity));
                        dispatch(newOrder(myForm))
                    })
                } else {
                    alert.error("There's some issue while processing payment ");
                }
            }
        } catch (error) {
            payBtn.current.disabled = false;
            alert.error(error.response.data.message);
        }
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if(msg==="Ordered placed successfully"){
            cartItems.forEach((item)=>{
                console.log('remove');
                dispatch(removeFromCart(item.productId))
            })
            alert.success(msg);
            navigate('/')
            dispatch(clearMsg());
        }
    }, [dispatch, shippingAddress, error, msg, alert]);

    useEffect(() => {
        dispatch(getAddress(search.get('address')))
    }, [])


    return (

        <><div className="paymentCon">{shippingAddress &&
            <form className="paymentBox" onSubmit={submitHandler}>
                <div className='paymentFormHeader'><span>Payment Details</span></div>
                <div className="paymentBoxInput">
                    <span><BsCreditCard /></span>
                    <CardNumberElement />

                </div>
                <div className="paymentBoxInput">
                    <span><CgCalendarDates /></span>
                    <CardExpiryElement />

                </div>
                <div className="paymentBoxInput">
                    <span><RiKeyFill /></span>
                    <CardCvcElement />
                </div>
                <button type="submit" ref={payBtn}>Pay - ₹{total+Math.floor(total*18/100)}</button>
            </form>}
        </div>

        </>
    )
}

export default Payment