import React, { useState } from 'react'
import './header.css'
import { Link, useNavigate } from "react-router-dom";
import { IoSearchSharp } from 'react-icons/io5'
import { FaShoppingCart } from 'react-icons/fa'
import { FiLogOut } from 'react-icons/fi'
import { CgLogIn } from 'react-icons/cg'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useAlert } from "react-alert";
import { logout } from '../../actions/userAction';


function Header() {
  const { isAuthenticated, user } = useSelector((state) => state.user)
  const navigate = useNavigate()
  const alert =useAlert()
  const dispatch = useDispatch()

  const [keyword, setKeyword] = useState("")
  const setKeywordFun = (e) => {
    setKeyword(e)
  }
  const searchFun = () => {
    if (keyword.trim()) {
      navigate(`/search/${keyword}`)
    }
    else {
      navigate('/')
    }
  }

  function logoutFun() {
    console.log('object');
    dispatch(logout());
    alert.success("Logout Successfully");
  }

  return (
    <>
      <div className="primaryNav">
        <div className="primaryNavContentBox">
          <div className="primaryNavContentBoxLeft">
            <div className="navLogo"><Link className='homeLink' to="/"><span>deKart</span>.com</Link></div>
            <div className="search" >
              <input onChange={(e) => { setKeywordFun(e.target.value) }} type="text" />
              <button onClick={() => { searchFun() }}><IoSearchSharp /></button>
            </div>
          </div>
          {isAuthenticated && user ? <>
            <div className="primaryNavContentBoxRight">
            <Link to={`/profile`} className='navLinkReset'><div className="userName">{user.name.split(" ")[0].slice(0,10)}</div></Link>
              <div>Orders</div>
              <Link to={`/cart`} className='navLinkReset'> <div><FaShoppingCart /><span className='mobileHide'>Cart</span></div></Link>
              <div onClick={()=>{logoutFun()}}><FiLogOut /><span className='mobileHide'>Log Out</span></div>
            </div>
          </> : <Link to={`/signin`} className='logInNavBtn'><div ><CgLogIn/>Log In</div></Link>}

        </div>
      </div>
      <div className="belowHeader"></div>
    </>
  )
}

export default Header