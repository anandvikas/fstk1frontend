import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useRequest from "../../hooks/useRequest";
import AddToCart from "../cart/add";
import AddToWishlist from "../wishlist/add";

const Home = () => {
  const { request, response } = useRequest();
  const [foodData, setFoodData] = useState(null);

  useEffect(() => {
    request("GET", `/food`);
  }, []);
  useEffect(() => {
    if (response) {
      // console.log(response);
      setFoodData(response);
    }
  }, [response]);
  return (
    foodData && (
      <div>
        {foodData.map((ele) => {
          return (
            <div key={ele._id}>
              <span>{ele.name}</span>
              <Link to={`/food/${ele._id}`}>View</Link>
              {/* <AddToCart itemId={ele._id} /> */}
              {/* <AddToWishlist itemId={ele._id} /> */}
            </div>
          );
        })}
        <Link to="/cart">View Cart</Link>
        <Link to="/wishlist">View Wishlist</Link>
      </div>
    )
  );
};

export default Home;
