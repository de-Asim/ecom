import React from 'react'
import Pagination from 'react-js-pagination'
import './pagination.css'

function PaginationComp(props) {

  return (
    <>
    {props.resultPerPage<props.count && <div className="paginationContainer">
                <Pagination
                activePage={props.currentPage}
                itemsCountPerPage={props.resultPerPage}
                totalItemsCount={ props.count }
                onChange={props.setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText={"First"}
                lastPageText="Last"
                itemClass='page-item'
                linkClass='page-link'
                activeClass='pageItemActive'
                activeLinkClass='pageLinkActive'
                />
            </div>}
    </>
  )
}

export default PaginationComp