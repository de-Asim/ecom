import React, { useEffect, useState } from "react";
import './updateOrder.css'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Stepper from "react-stepper-horizontal";
import { getOrderDetails } from "../../../actions/orderAction";
import Loader from "../../loader/loader";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { clearError, clearMsg, updateOrderStatus } from "../../../actions/adminAction";
import { clearErrors } from "../../../actions/productAction";
import { useAlert } from "react-alert";

function UpdateOrder() {
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert()

    const { orderDetails, loading, error } = useSelector((state) => state.order);

    const adminState = useSelector((state) => state.admin);

    const [activeColor, setActiveColor] = useState("#5096FF");
    const [step, setStep] = useState(0);
    const [steps, setSteps] = useState([
        { title: "Ordered" },
        { title: "Shipping" },
        { title: "Out for delivery" },
        { title: "Delivered" },
    ]);

    // update status
    const handleChange=(e)=>{
        dispatch(updateOrderStatus(params.id,e.target.value))
    }

    // navigate to product
    const navHandler = () => {
        navigate(`/product/${orderDetails.productId}`)
    }

    useEffect(() => {
        if (!loading && orderDetails != '') {
            if (orderDetails.status === "Cancelled") {
                setSteps([{ title: "Ordered" }, { title: "Cancelled" }]);
                setStep(1);
                setActiveColor("red");
            } else if (orderDetails.status === "Shipping") {
                setSteps([
                    { title: "Ordered" },
                    { title: "Shipping" },
                    { title: "Out for delivery" },
                    { title: "Delivered" },
                ]);
                setStep(1);
                setActiveColor("#5096FF");
            } else if (orderDetails.status === "Out for delivery") {
                setStep(2);
                setSteps([
                    { title: "Ordered" },
                    { title: "Shipping" },
                    { title: "Out for delivery" },
                    { title: "Delivered" },
                ]);
                setActiveColor("#5096FF");
            } else if (orderDetails.status === "Delivered") {
                setStep(3);
                setSteps([
                    { title: "Ordered" },
                    { title: "Shipping" },
                    { title: "Out for delivery" },
                    { title: "Delivered" },
                ]);
                setActiveColor("#00C400");
            }
        }
    }, [orderDetails]);


    useEffect(() => {
        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }
        else if(adminState.error){
            alert.error(adminState.error)
            dispatch(clearError())
        }
        else if(adminState.msg){
            alert.success(adminState.msg)
            dispatch(clearMsg())
            dispatch(getOrderDetails(params.id));
        }
        else{
            dispatch(getOrderDetails(params.id));
        }
    }, [dispatch,error,adminState.error,adminState.msg]);

    return (
        <>
            {loading  || adminState.loading ? (
                <Loader />
            ) : (<div className="orderDetailsCon" style={{ paddingTop: '3rem' }}>
                <div className="stepperBox">
                    <Stepper
                        steps={steps}
                        activeStep={step}
                        activeColor={activeColor}
                        size={25}
                        circleFontSize={10}
                        titleFontSize={'1rem'}
                        completeBarColor={"#5096FF"}
                    />
                </div>
                {orderDetails && <>
                    <div className="addressConParent">
                        <div className="addressCon">
                            <div className="addressConBold">Delivery Address</div>
                            <div className="addressConBold">{orderDetails.shipping.name}</div>
                            <div >
                                <div className="shippingAddress">
                                    <div>
                                        {orderDetails.shipping.address}, {orderDetails.shipping.city}
                                    </div>
                                    <div>
                                        {orderDetails.shipping.state} - {orderDetails.shipping.PIN} ,{" "}
                                        {orderDetails.shipping.country}
                                    </div>
                                </div>
                                <div className="shippingMobile">
                                    <div className="addressConBold">Phone Number</div>
                                    <div>{orderDetails.shipping.mobile}</div>
                                </div>
                            </div>
                        </div>
                        {orderDetails.status !== 'Delivered' && orderDetails.status !== 'Cancelled' &&
                            <div className="addressCon">
                                <div className="addressConBold">Order Status </div>
                                <div className="editOrderStatusCon">
                                    <FormControl sx={{ m: 1, width: 300 }}>
                                        <TextField
                                            select
                                            id="demo-simple-select-autowidth"
                                            onChange={handleChange}
                                            autoWidth
                                            label="Status"
                                        >
                                            {orderDetails.status === 'Processing' && <MenuItem key='Shipping' value='Shipping' sx={{ width: '100%' }}>Shipping</MenuItem>}
                                            {orderDetails.status === 'Shipping' && <MenuItem value={'Out for delivery'} sx={{ width: '100%' }}>Out for delivery</MenuItem>}
                                            {orderDetails.status === 'Out for delivery' && <MenuItem value={'Delivered'} sx={{ width: '100%' }}>Delivered</MenuItem>}
                                            <MenuItem value={'Cancelled'} sx={{ width: '100%' }}>Cancel Order</MenuItem>
                                        </TextField>
                                    </FormControl>
                                </div>
                            </div>}
                    </div>
                    <div className="detailsCon" onClick={navHandler}>
                        <div className="detailsConLeft">
                            <img src={orderDetails.productInfo.productImg} alt="" />
                        </div>
                        <div className="detailsConMid">
                            <div>{orderDetails.productInfo.productName}</div>
                            <div>₹{orderDetails.productInfo.unitPrice}</div>
                            <div>Ordered on: {orderDetails.createdAt.slice(0, 10)}</div>
                            {orderDetails.status === "Delivered" && <div>Deliverd on: {orderDetails.createdAt.slice(0, 10)}</div>}
                        </div>
                        <div className="detailsConRight">
                            <div>Quantity: {orderDetails.productInfo.quantity}</div>
                            <div>Tax: ₹{orderDetails.bill.tax}</div>
                            <div>Total: ₹{orderDetails.bill.total}</div>
                        </div>
                    </div></>}
            </div>
            )}
        </>
    );
}

export default UpdateOrder;
