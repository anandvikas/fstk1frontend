import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useRequest from "../../hooks/useRequest";
import { useForm } from "react-hook-form";
import Pagination from "../pagination/pagination";
import "./viewAll.css"
import Button from '@mui/material/Button';

const ViewAll = () => {
  const { request, response } = useRequest();
  const [foodData, setFoodData] = useState(null);
  const { register, handleSubmit } = useForm();
  const [pageControl, setPageControl] = useState({ page: 1, perPage: 6, results: null })

  const submitForm = (data) => {
    request("GET", `/food?catagory=${data.catagory}&sort=${data.sort}&perPage=${pageControl.perPage}&page=${pageControl.page}`)
  }

  useEffect(() => {
    request("GET", `/food?&sort=addedOnDesc&perPage=${pageControl.perPage}&page=${pageControl.page}`);
  }, [pageControl.page]);

  useEffect(() => {
    if (response) {
      // console.log(response);
      setFoodData(response.data);
      setPageControl({ ...pageControl, results: response.results })
    }
  }, [response]);

  return (
    foodData && (
      <div>
        <div>
          <form onSubmit={handleSubmit(submitForm)} className='sfCon'>
            <div className='fCon'>
              <label htmlFor='catagory' className='flabel'>Select Catagory</label>
              <select name="catagory" {...register('catagory')}>
                <option value=''>All</option>
                <option value='meal'>Meal</option>
                <option value='snack'>Snack</option>
                <option value='drink'>Drink</option>
              </select>
            </div>
            <div className='sCon'>
              <label htmlFor='sort' className='flabel'>Select Catagory</label>
              <select name='sort' {...register('sort')}>
                <option value='addedOnAsc'>Newest</option>
                <option value='addedOnDesc'>Oldest</option>
                <option value='ratingDesc'>Most Popular</option>
                <option value='ratingAsc'>Least Popular</option>
                <option value='priceDesc'>Expensive</option>
                <option value='priceAsc'>Cheap</option>
              </select>
            </div>
            <div className='bCon'>
              {/* <input type='submit' value='apply' /> */}
              <Button variant="contained" style={{ backgroundColor: '#233a3e' }} type='submit'>Filter</Button>
            </div>
          </form>
        </div>
        <div className="cCon">
          {foodData.map((ele) => {
            return (
              <>
                <div className="cCardSpace" key={ele.id}>
                  <Link to={`/food/${ele._id}`}>
                    <div className="cCard">
                      <img src={ele.images[0].src} alt={ele.images[0].alt} className={ele.id} />
                      <h3 className={ele.id}>{ele.name}</h3>
                    </div>
                  </Link>
                </div>
              </>
            );
          })}
        </div>
        <Pagination setPageControl={setPageControl} pageControl={pageControl} />
      </div>
    )
  )
}

export default ViewAll;