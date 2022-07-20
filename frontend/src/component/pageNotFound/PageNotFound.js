import React from 'react'
import { useNavigate } from 'react-router-dom'
import './pageNotFound.css'

function PageNotFound() {
    const navigate=useNavigate()
  return (
    <>
    <div className='pageNotFounCon'>
        <div>Page Not Found</div>
        <button onClick={()=>navigate('/')}>Home</button>
    </div>
    </>
  )
}

export default PageNotFound