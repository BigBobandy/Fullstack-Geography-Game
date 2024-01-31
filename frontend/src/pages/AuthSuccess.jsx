import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUserProfile } from "../store/slices/authSlice";

const AuthSuccess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
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
  }, [dispatch, navigate]);

  return (
    <div className="h-full w-full flex justify-center items-center">
      <span class="loading loading-infinity loading-lg"></span>
    </div>
  );
};

export default AuthSuccess;
