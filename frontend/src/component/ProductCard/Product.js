import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Rating from "@mui/material/Rating";
import "./product.css";
import { Link } from "react-router-dom";


export default function Product(props) {
  return (
    <>
      {props.product && (
        <Link className="link" to={`/product/${props.product._id}`}><Card sx={{ maxWidth: "calc(50vw - 1rem)" }}>
          <CardActionArea sx={{width:'15rem',maxWidth: "calc(50vw - 1rem)"}}>
            <CardMedia
              component="img"
              height="240"
              image={props.product.image[0].source}
              alt="green iguana"
            />
            <CardContent>
              <Typography className="cardProductName" gutterBottom variant="body1" component="div">
                {props.product.name.slice(0,20)}{props.product.name.length>20 && <span>...</span>}
              </Typography>
              <Typography className="cardProductPrice" gutterBottom variant="body1" component="div">
              ₹{props.product.price}
              </Typography>
              <Typography
                className="one-ratings"
                gutterBottom
                variant="h8"
                component="div"
              >
                <Rating
                  name="half-rating"
                  defaultValue={props.product.ratings}
                  precision={0.5}
                  readOnly
                  sx={{ mr: 1 }}
                  size="medium"
                />
                ({props.product.numOfReviews} Reviews)
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        </Link>
      )}
    </>
  );
}
