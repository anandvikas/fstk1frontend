import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useRequest from "../../hooks/useRequest";
import { useSelector } from "react-redux";

const AddReview = () => {
  const { userId } = useSelector((state) => state.reducer1.loggedIn);
  const { register, handleSubmit } = useForm();
  const { request, response } = useRequest();
  const [resMessage, setResMessage] = useState(<></>);
  const submitForm = (data) => {
    console.log(data);
  };
  useEffect(() => {
    if (response) {
      setResMessage(response.message);
    }
  }, [response]);
  return (
    <div>
      <form onSubmit={handleSubmit(submitForm)}>
        <h4>Add review</h4>
        <div>
          <input type="number" placeholder="rating" {...register("rating")} />
          <input type="text" placeholder="message" {...register("message")} />
        </div>
        <div>
          <input type="submit" value="submit" />
        </div>
      </form>
      <p>{resMessage}</p>
    </div>
  );
};

export default AddReview;
