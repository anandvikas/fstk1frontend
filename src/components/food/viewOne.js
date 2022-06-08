import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useRequest from "../../hooks/useRequest";
import AddToCart from "../cart/add";
import AddToWishlist from "../wishlist/add";
import AddReview from "../reviews/add";
import ViewReviews from "../reviews/view";

const ViewOne = () => {
  const { id } = useParams();
  const { request, response } = useRequest();
  const [foodData, setFoodData] = useState(null);
  useEffect(() => {
    request("GET", `/food/getOne/${id}`);
  }, []);
  useEffect(() => {
    if (response) {
      setFoodData(response);
    }
  }, [response]);
  return (
    foodData && (
      <div>
        <h4>Name : {foodData.name}</h4>
        <h4>Catagory : {foodData.catagory}</h4>
        <h4>
          Ingredients :{" "}
          {foodData.ingredients.map((val, index) => {
            return <span key={index}> {val},</span>;
          })}
        </h4>
        <AddToCart itemId={foodData._id} />
        <AddToWishlist itemId={foodData._id} />
        <div>
          <h1>Reviews</h1>
          <ViewReviews itemId={foodData._id} />
          <AddReview itemId={foodData._id} />
        </div>
      </div>
    )
  );
};

export default ViewOne;
