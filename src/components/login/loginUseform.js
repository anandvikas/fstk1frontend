import { useEffect, useState } from "react";
import useRequest from "../../hooks/useRequest";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getCartAction,
  getWishlistAction,
  loginAction,
} from "../../store/actionCreators/actionCreator";

const LoginUseform = () => {
  const { register, handleSubmit } = useForm();
  let isValidate = true;
  const navigate = useNavigate();
  const { loggedIn } = useSelector((state) => state.reducer1);
  const dispatch = useDispatch();
  const { request, response } = useRequest();
  const [resMessage, setResMessage] = useState(<></>);
  // --------------------------------------------------------------------------------------
  useEffect(() => {
    if (loggedIn) {
      navigate("/");
    }
  }, []);
  // --------------------------------------------------------------------------------------
  const frontEndValidation = () => {
    return;
  };
  // --------------------------------------------------------------------------------------
  const makePostBody = (body) => {
    return {
      userName: body.userName,
      password: body.password,
    };
  };
  // --------------------------------------------------------------------------------------
  const submitForm = (body) => {
    frontEndValidation();
    if (isValidate) {
      let postBody = makePostBody(body);
      request("POST", `/user/login`, postBody);
    }
  };
  // --------------------------------------------------------------------------------------
  useEffect(() => {
    if (response) {
      if (response.success) {
        console.log(response);
        localStorage.setItem(
          "userToken",
          JSON.stringify({ token: response.token })
        );
        dispatch(loginAction(response));
        dispatch(getCartAction({ userId: response._id }));
        dispatch(getWishlistAction({ userId: response._id }));
        navigate("/");
      } else {
        setResMessage(response.message);
      }
    }
  }, [response]);
  // --------------------------------------------------------------------------------------
  return (
    <>
      <div>
        <h3>User Login</h3>
        <form onSubmit={handleSubmit(submitForm)}>
          <div>
            <input
              type="text"
              placeholder="User Name"
              {...register("userName")}
            />
            <input
              type="password"
              placeholder="Password"
              {...register("password")}
            />
          </div>
          <div>
            <input type="submit" value="Login" />
          </div>
        </form>
        <p>{resMessage}</p>
        <Link to="/forgotPassword">Forgot Password</Link>
      </div>
    </>
  );
};
export default LoginUseform;
