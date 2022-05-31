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
        <Link className="link" to={`/product/${props.product._id}`}><Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="240"
              image="/img/product.jpg"
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {props.product.name}
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
