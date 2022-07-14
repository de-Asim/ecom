import React, { useState } from 'react'
import './admin.css'
import { Outlet } from 'react-router-dom'
import Sidebar from './sidebar/Sidebar'
import {BiMenuAltLeft} from 'react-icons/bi'

function Admin() {
    const [open,setOpen] = useState(true)
    const [width,setWidth] = useState('15rem')
    const [overflow,setOverflow] = useState('visible')
    
    const sidebarStyle=()=>{
        if(!open){
            setWidth('15rem')
            setOverflow('visible')
        }
        else{
            setWidth('0')
            setOverflow('hidden')
        }
    }
    const sidebarHandler = () => {
        setOpen(!open)
        sidebarStyle()
    }
    return (
        <>
            <div className='adminCon'>
                <div style={{width:width,overflow:overflow}}>
                    <Sidebar />
                </div>
                <button className='sideBarHandlerBtn' onClick={sidebarHandler} style={{left:width}}><BiMenuAltLeft/></button>
                <div>
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default Admin