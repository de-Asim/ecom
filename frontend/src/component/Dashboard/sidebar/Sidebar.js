import React, { useState } from 'react'
import './sidebar.css'
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {MdSpaceDashboard} from 'react-icons/md'
import {FaUserFriends} from 'react-icons/fa'
import {FaUserEdit} from 'react-icons/fa'
import {FaUserTimes} from 'react-icons/fa'
import {RiShoppingCart2Fill} from 'react-icons/ri'
import {MdReviews} from 'react-icons/md'
import {HiViewGrid} from 'react-icons/hi'
import {HiOutlineViewGridAdd} from 'react-icons/hi'
import {FaTshirt} from 'react-icons/fa'
import TreeItem from '@mui/lab/TreeItem';
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <>
    <div className='sidebar'>
      <Link className='linkReset' to='/admin/dashboard'><p><MdSpaceDashboard/><span>Dashboard</span></p></Link>
          <TreeView defaultExpandIcon={<ExpandMoreIcon/>} defaultCollapseIcon={<ChevronRightIcon/>}>
            <TreeItem nodeId="1" label="Products">
                <Link className='linkReset' to='/admin/product/all'><TreeItem nodeId="2" label="All Products" icon={<HiViewGrid/>}/></Link>
                <Link className='linkReset' to='/admin/product/new'><TreeItem nodeId="3" label="Create New" icon={<HiOutlineViewGridAdd/>}/></Link>
                {/* <Link className='linkReset' to='/admin/product'><TreeItem nodeId="4" label="Search Product" icon={<FaTshirt/>}/></Link> */}
            </TreeItem>
        </TreeView>
        <Link className='linkReset' to='/admin/user/all'><p><FaUserFriends/><span>Users</span></p></Link>
        <Link className='linkReset' to='/admin/order'><p><RiShoppingCart2Fill/><span>Orders</span></p></Link>
        {/* <Link className='linkReset' to='/admin/review'><p><MdReviews/><span>Reviews</span></p></Link> */}
    </div>
    </>
  )
}

export default Sidebar