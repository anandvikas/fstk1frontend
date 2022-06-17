import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useRequest from "../../hooks/useRequest";
import AddToCart from "../cart/add";
import AddToWishlist from "../wishlist/add";
import AddReview from "../reviews/add";
import ViewReviews from "../reviews/view";
import { useSelector } from "react-redux";
import "./viewOne.css"

const ViewOne = () => {
  const { status } = useSelector((state) => state.reducer1.loggedIn);
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
      <>
        <div className='lpConBackground'>
          <div className='lpCon'>
            <div className='lpImgCon'>
              <img src={foodData.images[0].src} alt={foodData.images[0].alt} style={{ width: '100%' }} />
            </div>
            <div className='lpTextCon'>
              <h1>{foodData.name}</h1>
              <h3>Catagory : {foodData.catagory}</h3>
              <h4>
                Ingredients :{" "}
                {foodData.ingredients.map((val, index) => {
                  return <span key={index}> {val},</span>;
                })}
              </h4>
              <h2 className='price'>₹ {foodData.price}</h2>
              <p className='rating'><strong>Average Rating : {foodData.avgRating}</strong></p>
              <AddToCart itemId={foodData._id} />
              <AddToWishlist itemId={foodData._id} />
            </div>
          </div>

        </div>
        <div className='rvCon'>
          {status && <AddReview itemId={foodData._id} />}
          <hr />
          <h2>Reviews</h2>
          <ViewReviews itemId={foodData._id} />
        </div>
      </>

    )
  );
};

export default ViewOne;
