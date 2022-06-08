import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useRequest from "../../hooks/useRequest";
import { useSelector } from "react-redux";

const AddReview = ({ itemId }) => {
  const { userId, userName } = useSelector((state) => state.reducer1.loggedIn);
  const { register, handleSubmit } = useForm();
  const { request, response } = useRequest();

  let isValidate = true;

  const frontEndvalidation = (data) => {
    if (data.rating === "") {
      isValidate = false;
      alert("rating can't be empty");
    }
    return;
  };
  const makePostBody = (data) => {
    return {
      userName: userName,
      userId: userId,
      itemId: itemId,
      rating: parseInt(data.rating),
      message: data.message,
    };
  };
  const submitForm = (data) => {
    isValidate = true;
    // console.log(data);
    frontEndvalidation(data);
    if (isValidate) {
      let postBody = makePostBody(data);
      // console.log(postBody);
      request("POST", "/reviews/addReview", postBody);
    }
  };
  useEffect(() => {
    if (response) {
      alert(response.message);
      window.location.reload();
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
    </div>
  );
};

export default AddReview;
