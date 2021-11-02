import React from "react";
import GoogleLogin from "react-google-login";
import googleicn from "../../../../assets/googicon.png";
import { axiosInstanse } from "../../../../apiRequest";
import auth from "../authService";
import { toast, ToastContainer } from "react-toastify";
import "./googleAccount.css";

const googleComponent = () => {
  const responseGoogle = (response) => {
    axiosInstanse
      .post("auth/googleLogin", {
        token: response.tokenId,
      })
      .then(async (res) => {
        toast.success("SignIn Successful");
        await auth.logout();
        await auth.loginWithJWT(res.data.token);
        window.location = "/";
      })
      .catch((err) => {
        toast.error(
          `ERROR
          ${err?.response || "Something went wrong"}`
        );
      });
  };
  const errorGoogle = (googleError) => {
    googleError &&
      toast.error(
        `ERROR
      ${googleError || "Something went wrong"}`
      );
  };

  return (
    <>
      <div className="login-page">
        <GoogleLogin
          autoLoad={false}
          clientId={process.env.googleClientKey}
          onSuccess={responseGoogle}
          onFailure={errorGoogle}
          cookiePolicy={"single_host_origin"}
          className="btn btnGoogle"
          icon={false}
        >
          <div className="row align-items-center">
            <img src={googleicn} style={{ width: "40px" }} alt="" />
            <span style={{ fontSize: "16px", fontWeight: "600" }}>
              Use Google Account
            </span>
          </div>
        </GoogleLogin>
      </div>
      <ToastContainer />
    </>
  );
};

export default googleComponent;
