import React from 'react'
import { Link } from 'react-router-dom'

function CategoryCard(props) {
  return (
    <Link to={`/category/${props.category.category}`}>
      <div>
        <img src={props.category.img} alt="" />
        <div>{props.category.category}</div>
      </div>
    </Link>
  )
}

export default CategoryCard