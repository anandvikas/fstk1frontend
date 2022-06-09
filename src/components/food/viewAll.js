import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useRequest from "../../hooks/useRequest";
import { useForm } from "react-hook-form";

const ViewAll = () => {
    const { request, response } = useRequest();
    const [foodData, setFoodData] = useState(null);
    const { register, handleSubmit } = useForm();
   const[filterquery, setFilterquery] = useState(null)

    const submitForm = (data) => {
        request("GET", `/food?catagory=${data.catagory}&sort=${data.sort}`)
    }

    useEffect(() => {
        request("GET", `/food?&sort=addedOnDesc`);
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
          <div>
              <form onSubmit={handleSubmit(submitForm)}>
                  <div>
                  <select {...register('catagory')}>
                  <option value=''>All</option>
                      <option value='meal'>Meal</option>
                      <option value='snack'>Snack</option>
                      <option value='drink'>Drink</option>
                  </select>
                  </div>
                  <div>
                  <select {...register('sort')}>                      
                      <option value='addedOnAsc'>Newest</option>
                      <option value='addedOnDesc'>Oldest</option>
                      <option value='ratingDesc'>Most Popular</option>
                      <option value='ratingAsc'>Least Popular</option>
                      <option value='priceDesc'>Expensive</option>
                      <option value='priceAsc'>Cheap</option>
                  </select>
                  </div> 
                  <div>
                  <input type='submit' value='apply'/>
                  </div>                  
              </form>
          </div>
        {foodData.map((ele) => {
          return (
            <div key={ele._id}>
              <div style={{width:'150px'}}>
                <img src={ele.images[0].src} alt={ele.images[0].alt} style={{width:'100%'}}/>
              </div>
              <span>{ele.name}</span>
              <Link to={`/food/${ele._id}`}>View</Link>              
            </div>
          );
        })}
        <Link to="/cart">View Cart</Link>
        <Link to="/wishlist">View Wishlist</Link>
      </div>
    )
    )

}

export default ViewAll;