import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useRequest from "../../hooks/useRequest";

const ForgotPass = () => {
  const { register, handleSubmit } = useForm();
  const { request, response } = useRequest();
  const [resMessage, setResMessage] = useState(<></>);
  const submitForm = (data) => {
    console.log(data);
    request("POST", "/user/sendResetPassLink", data);
  };
  useEffect(() => {
    if (response) {
      setResMessage(response.message);
    }
  }, [response]);
  return (
    <div>
      <form onSubmit={handleSubmit(submitForm)}>
        <div>
          <input
            type="email"
            placeholder="Registered Email ID"
            {...register("email")}
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

export default ForgotPass;
