import React, { useEffect, useState } from "react";
import Header from "./component/header/header";
import "./App.css";
import Home from "./component/home/home";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Loader from "./component/loader/loader";
import Footer from "./component/footer/footer";
import ProductDetails from "./component/ProductDetails/productDetails";
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import ProductsPage from "./component/ProductsPage/productsPage";
import SignIn from "./component/SignIn/signIn";
import store from "./store"
import { userProfile } from "./actions/userAction";
import Profile from "./component/Profile/Profile";
import { useSelector } from "react-redux";
import ChangePassword from "./component/ChangePassword/ChangePassword";
import ForgetPassword from "./component/ChangePassword/ForgetPassword";
import ResetPassword from "./component/ChangePassword/ResetPassword";
import Cart from "./component/Cart/Cart";
import Shipping from "./component/Shipping/Shipping";
import axios from "axios";
import Payment from "./component/Shipping/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Order from "./component/Order/Order";
import OrderDetails from "./component/Order/orderDetails/OrderDetails";
import Dashboard from "./component/Dashboard/Dashboard";
import Admin from "./component/Dashboard/Admin";
import AllProduct from "./component/Dashboard/product/AllProduct";
import CreateProduct from "./component/Dashboard/product/CreateProduct";
import UpdateProduct from "./component/Dashboard/product/UpdateProduct";
import AllUser from "./component/Dashboard/user/AllUser";
import AllOrder from "./component/Dashboard/order/AllOrder";
import UpdateOrder from "./component/Dashboard/order/UpdateOrder";
import PageNotFound from "./component/pageNotFound/PageNotFound";

const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE
}

function App() {
  const { isAuthenticated, isAdmin, loading } = useSelector((state) => state.user)

  const [stripeApiKey, setStripeApiKey] = useState("")
  async function getStripeApiKey() {
    const { data } = await axios.get('/api/v1/payment/stripeapikey')
    setStripeApiKey(data.stripeApiKey)
  }

  useEffect(() => {
    store.dispatch(userProfile())
    getStripeApiKey()
  }, [])

  return (
    <>{loading === false ?
      <AlertProvider template={AlertTemplate} {...options}>
        <Router>
          <Header />
          {stripeApiKey && <Elements stripe={loadStripe(stripeApiKey)}>
            <Routes>
              <Route exact path="/payment" element={<Payment />} />
            </Routes>
          </Elements>}
          <Routes>
            <Route exact path="/profile" element=
              {!isAuthenticated ? <Navigate to="/signin" /> : <Profile />} />
            <Route exact path="/password/change" element=
              {!isAuthenticated ? <Navigate to="/signin" /> : <ChangePassword />} />
            <Route exact path="/" element={<Home />} />
            <Route exact path="/loader" element={<Loader />} />
            <Route exact path="/product/:id" element={<ProductDetails />} />
            <Route exact path="/category/:category" element={<ProductsPage />} />
            <Route exact path="/search/:keyword" element={<ProductsPage />} />
            <Route exact path="/signin" element={<SignIn />} />
            <Route exact path="/password/forgot" element={<ForgetPassword />} />
            <Route exact path="/password/reset/:resetToken" element={<ResetPassword />} />
            <Route exact path="/cart" element={<Cart />} />
            <Route exact path="/shipping" element={<Shipping />} />
            <Route exact path="/orders" element={<Order />} />
            <Route exact path="/order/details/:id" element={<OrderDetails />} />
            {/* admin */}
            <Route path="/admin" element={!isAuthenticated || !isAdmin ? <PageNotFound /> : <Admin />} >
              <Route index element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="product/all" element={<AllProduct />} />
              <Route path="product/new" element={<CreateProduct />} />
              <Route path="product/update/:id" element={<UpdateProduct />} />
              <Route path="user/all" element={<AllUser />} />
              <Route path="order" element={<AllOrder />} />
              <Route path="order/:id" element={<UpdateOrder />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          <Footer />
        </Router>
      </AlertProvider> : <Loader />}
    </>
  );
}

export default App;
