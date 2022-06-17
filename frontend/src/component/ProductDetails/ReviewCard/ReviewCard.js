import React from 'react'
import Rating from "@mui/material/Rating";
import "./reviewCard.css"

function ReviewCard(props) {
    return (
        <>
        <div className='reviewCard'>
            <div className="reviewUserName">
                {props.review.name}
            </div>
            <div className='reviewCardRating'>
                <Rating
                    name="half-rating"
                    defaultValue={props.review.rating}
                    precision={0.5}
                    readOnly
                    sx={{ mr: 1 }}
                    size="medium"
                />
                {props.review.rating}
            </div>
            <div className='reviewText'>{props.review.message}</div>
            </div>
        </>
    )
}

export default ReviewCard