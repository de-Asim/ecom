import React from "react";
import Header from "./component/header/header";
import "./App.css";
import Home from "./component/home/home";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Loader from "./component/loader/loader";
import Footer from "./component/footer/footer";
import ProductDetails from "./component/ProductDetails/productDetails";

function App() {
  return (
    <>
      <Router>
      <Header />
      <div className="belowHeader">
        <Routes>
        <Route exact path="/" element={<Home />}/>
        <Route path="/:keyword" element={<Home />}/>
        <Route path="/loader" element={<Loader />}/>
        <Route path="/product/:id" element={<ProductDetails />}/>
        </Routes>
      </div>
      </Router>
      <Footer/>
    </>
  );
}

export default App;
