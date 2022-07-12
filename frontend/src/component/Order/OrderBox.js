import React from "react";
import "./orderBox.css";
import { FaCircle } from 'react-icons/fa'
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function OrderBox(props) {
    const navigate = useNavigate()
    let statusColor='yellow'
    if(props.order.status==='Cancelled'){
        statusColor='red'
    }
    else if(props.order.status==='Delivered'){
        statusColor='#00c400'
    }
    else{
        statusColor='yellow'
    }
    const navHandler=()=>{
        navigate(`/order/details/${props.order._id}`)
    }
    return (
        <>
            <div className="orderBox" onClick={navHandler}>
                <div className="orderBoxLeft">
                    <img src={props.order.productInfo.productImg} alt="" />
                </div>
                <div className="orderBoxMid">
                    <span>
                        {props.order.productInfo.productName.length > 60 ? (
                            <>{props.order.productInfo.productName.slice(0, 60) + `...`}</>
                        ) : (
                            <>{props.order.productInfo.productName}</>
                        )}
                    </span>
                    <span >
                        <span>
                            ₹{props.order.bill.total}
                        </span>
                        <span className="orderBoxStatusMobile">
                        | <span><FaCircle color={statusColor} /></span> {props.order.status}
                        </span>
                    </span>
                </div>
                <div className="orderBoxStatusLaptop"><FaCircle color={statusColor} /> {props.order.status}</div>
            </div>
        </>
    );
}

export default OrderBox;
