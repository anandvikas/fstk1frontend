import React, { useEffect, useState } from "react";
import useRequest from "../../hooks/useRequest";

const ViewReviews = ({ itemId }) => {
  const [reviewsArray, setReviewsArray] = useState(null);
  const { request, response } = useRequest();
  useEffect(() => {
    request("POST", "/reviews", { itemId: itemId });
  }, []);
  useEffect(() => {
    if (response) {
      if (response.success) {
        setReviewsArray(response.body.reviews);
      }
      //   console.log(response);
    }
  }, [response]);
  return (
    <div>
      {reviewsArray &&
        reviewsArray.map((val) => {
          return (
            <div key={val._id}>
              <h4>{val.userName}</h4>
              <p>Rating : {val.rating}</p>
              <p>{val.message}</p>
            </div>
          );
        })}
    </div>
  );
};

export default ViewReviews;
