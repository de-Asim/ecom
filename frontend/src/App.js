import React, { useEffect } from "react";
import Header from "./component/header/header";
import "./App.css";
import Home from "./component/home/home";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate,Navigate } from "react-router-dom";
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

const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE
}

function App() {
  const { isAuthenticated, loading, user } = useSelector((state) => state.user)
  useEffect(() => {
    store.dispatch(userProfile())
  }, [])

  return (
    <>{loading===false ? 
      <AlertProvider template={AlertTemplate} {...options}>
        <Router>
          <Header />
          <Routes>
            <Route exact path="/profile" element=
              {!isAuthenticated ?<Navigate to="/signin" /> : <Profile />}/>
            <Route exact path="/password/change" element=
              {!isAuthenticated ?<Navigate to="/signin" /> : <ChangePassword />}/>
            <Route exact path="/" element={<Home />} />
            <Route path="/loader" element={<Loader />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/category/:category" element={<ProductsPage />} />
            <Route path="/search/:keyword" element={<ProductsPage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/password/forgot" element={<ForgetPassword />} />
            <Route path="/password/reset/:resetToken" element={<ResetPassword />} />
            <Route path="/cart" element={<Cart/>} />
          </Routes>
        </Router>
        <Footer />
      </AlertProvider> : <Loader/>}
    </>
  );
}

export default App;
