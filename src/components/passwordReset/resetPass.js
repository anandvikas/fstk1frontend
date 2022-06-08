import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useRequest from "../../hooks/useRequest";
import { useLocation, Link } from "react-router-dom";
import queryString from "query-string";

const ResetPass = () => {
  const { register, handleSubmit } = useForm();
  const { request, response } = useRequest();
  const [resMessage, setResMessage] = useState(<></>);
  const { search } = useLocation();
  const queriesInObject = queryString.parse(search);
  let isValidate = true;

  const frontEndValidation = (data) => {
    if (data.password !== data.rpassword) {
      isValidate = false;
    }
  };

  const makePostBody = (data) => {
    return {
      password: data.password,
      token: queriesInObject.token,
      email: queriesInObject.email,
    };
  };
  const submitForm = (data) => {
    console.log(data);
    frontEndValidation(data);
    if (isValidate) {
      let postBody = makePostBody(data);
      request("POST", "/user/resetPass", postBody);
    }
  };
  useEffect(() => {
    if (response) {
      setResMessage(response.message);
      if (response.success) {
        setResMessage(
          <>
            {response.message} <Link to="/">Login</Link>
          </>
        );
      } else {
        setResMessage(response.message);
      }
    }
  }, [response]);
  return (
    <div>
      <form onSubmit={handleSubmit(submitForm)}>
        <div>
          <input
            type="text"
            placeholder="New Password"
            {...register("password")}
          />
          <br />
          <input
            type="password"
            placeholder="Repeat New Password"
            {...register("rpassword")}
          />
        </div>
        <div>
          <input type="submit" value="submit" />
        </div>
      </form>
      <p>{resMessage}</p>
    </div>
  );
};

export default ResetPass;
