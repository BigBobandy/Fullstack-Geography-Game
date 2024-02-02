import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUserProfile } from "../../store/slices/authSlice";

const AuthSuccess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    // check if user is already logged in
    if (!user) {
      dispatch(fetchUserProfile())
        .unwrap()
        .then(() => {
          // redirect to home page upon successful fetch
          navigate("/");
        })
        .catch(() => {
          console.error(error);
          // Display error message to user...
          navigate("/login");
        });
    } else {
      // user data is already available in the store, redirect to home page
      navigate("/");
    }
  }, [dispatch, navigate, user]);

  return (
    <div className="h-full w-full flex justify-center items-center">
      <span className="loading loading-infinity loading-lg"></span>
    </div>
  );
};

export default AuthSuccess;
