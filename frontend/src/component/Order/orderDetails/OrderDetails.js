import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Stepper from "react-stepper-horizontal";
import { getOrderDetails } from "../../../actions/orderAction";
import Loader from "../../loader/loader";
import "./orderDetails.css";

function OrderDetails() {
    const params = useParams();
    const dispatch = useDispatch();
    const navigate=useNavigate();

    const { orderDetails, loading, error } = useSelector((state) => state.order);

    const [activeColor, setActiveColor] = useState("#5096FF");
    const [step, setStep] = useState(0);
    const [steps, setSteps] = useState([
        { title: "Ordered" },
        { title: "Shipping" },
        { title: "Out for delivery" },
        { title: "Delivered" },
    ]);

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

    const navHandler =()=>{
        navigate(`/product/${orderDetails.productId}`)
    }

    useEffect(() => {
        dispatch(getOrderDetails(params.id));
    }, []);

    return (
        <>
            {loading ? (
                <Loader />
            ) : (<div className="orderDetailsCon">
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
                    {orderDetails && <><div className="addressCon">
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

export default OrderDetails;
