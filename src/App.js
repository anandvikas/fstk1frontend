import react, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { NonPrivateRoutes, Privateroutes } from "./utils/routes";
import { useDispatch, useSelector } from "react-redux";
import {
  loginAction,
  getCartAction,
  getWishlistAction,
} from "./store/actionCreators/actionCreator";
import Navbar from "./components/navbar/navbar";
import useRequest from "./hooks/useRequest";

const App = () => {
  const { loggedIn } = useSelector((state) => state.reducer1);
  const dispatch = useDispatch();
  const [userDetails, setUserDetails] = useState(null);
  const { request, response } = useRequest();
  //---------------------------------------------------------------------------
  let userToken = JSON.parse(localStorage.getItem("userToken"));
  useEffect(() => {
    if (userToken) {
      request("POST", "/user/varifyToken", { token: userToken.token });
    }
  }, []);
  useEffect(() => {
    if (response) {
      console.log(response);
      setUserDetails(response);
    }
  }, [response]);
  //---------------------------------------------------------------------------
  useEffect(() => {
    if (userDetails) {
      dispatch(loginAction(userDetails));
      dispatch(getCartAction({ userId: userDetails._id }));
      dispatch(getWishlistAction({ userId: userDetails._id }));
    }
  }, [userDetails]);
  //---------------------------------------------------------------------------
  return (
    <>
      {/* <Navbar /> */}
      <Routes>
        {loggedIn.status ? (
          <>
            {Privateroutes.map((element, index) => {
              return (
                <Route
                  key={index}
                  path={element.path}
                  element={<element.component />}
                />
              );
            })}
          </>
        ) : (
          <>
            {NonPrivateRoutes.map((element, index) => {
              return (
                <Route
                  key={index}
                  path={element.path}
                  element={<element.component />}
                />
              );
            })}
          </>
        )}
      </Routes>
    </>
  );
};

export default App;
