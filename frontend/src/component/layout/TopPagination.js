import React from "react";
import './topPagination.css'
import { AiOutlineLeft } from "react-icons/ai";
import { AiOutlineRight } from "react-icons/ai";

function TopPagination(props) {
    const incPage=()=>{
        if((props.page+1)<(props.total/props.reviewPerPage)){
            props.handleChangePage(props.page+1)
        }
    }
    const decPage=()=>{
        if(props.page>0){
            props.handleChangePage(props.page-1)
        }
    }
  return (
    <>
      <div className="topPagination">
        <p>{props.pageStart+1}-{props.pageEnd>props.total ?props.total :props.pageEnd} of {props.total}</p>
        <div>
          <button onClick={decPage}>
            {props.page>0 ? <AiOutlineLeft /> : <AiOutlineLeft color="silver"/>}
            
          </button>
          <button onClick={incPage}>
            {(props.page+1)<(props.total/props.reviewPerPage) ?<AiOutlineRight /> :<AiOutlineRight color="silver"/>}
            
          </button>
        </div>
      </div>
    </>
  );
}

export default TopPagination;
