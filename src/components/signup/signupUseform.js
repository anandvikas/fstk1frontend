import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useRequest from "../../hooks/useRequest";
import SocialOauth from "../socialOauth/socialOauth";

const SignupUseform = () => {
    // --------------------------------------------------------------------------------------
    const { register, handleSubmit } = useForm();
    const { request, response } = useRequest();
    const navigate = useNavigate();
    let isValidate = true;
    // --------------------------------------------------------------------------------------
    const frontEndValidation = (data) => {
        console.log(data);
        if (data.password !== data.rpassword) {
            isValidate = false;
            alert("password do not match");
        }
        return isValidate;
    };
    // --------------------------------------------------------------------------------------
    const makePostBody = (data) => {
        return {
            userName: data.userName,
            email: data.email,
            password: data.password,
            gender: data.gender,
            sendMail: data.sendMail,
            sendText: data.sendText,
        };
    };
    // --------------------------------------------------------------------------------------
    const onFormSubmit = (data) => {
        frontEndValidation(data);
        if (isValidate) {
            let postBody = makePostBody(data);
            request("POST", `/user/signup`, postBody);
        }
    };
    // --------------------------------------------------------------------------------------
    useEffect(() => {
        if (response) {
            console.log(response);
            localStorage.setItem("userToken", JSON.stringify(response));
            alert("user added");
            navigate("/login");
        }
    }, [response]);
    // --------------------------------------------------------------------------------------
    return (
        <div className="formContainer">
            <div className="signupHolder">
                <form onSubmit={handleSubmit(onFormSubmit)}>
                    <h1 className="formTitle">Sign up</h1>
                    <p className="formPara">Please fill in this form to sign up.</p>
                    <hr />
                    <label htmlFor="userName" className="lsFormLabel">User name</label>
                    <input
                        className="formInput"
                        type="text"
                        placeholder="user name"
                        name='userName'
                        {...register("userName")}
                    />
                    <label htmlFor="email" className="lsFormLabel">Email</label>
                    <input className="formInput" type="email" placeholder="email" name='email' {...register("email")} />
                    <label htmlFor="password" className="lsFormLabel">Password</label>
                    <input
                        className="formInput"
                        type="password"
                        placeholder="password"
                        name='password'
                        {...register("password")}
                    />
                    <label htmlFor="rpassword" className="lsFormLabel">Repeat Password</label>
                    <input
                        className="formInput"
                        type="password"
                        placeholder="Repeat password"
                        name='rpassword'
                        {...register("rpassword")}
                    />
                    <div className="lsFormLabel">
                        <input type="radio" checked {...register("gender")} value="male" /> Male  
                        <input type="radio" {...register("gender")} value="female" /> Female  
                        <input type="radio" {...register("gender")} value="other" /> Other  
                    </div>
                    

                    <label className="lsFormLabel">
                        <input type="checkbox" name="remember" {...register("sendMail")} /> Subscribe for newsletter
                    </label>
                    <div className="formButtons">
                        <input type="submit" value="Sign up" id="formSignup" />
                    </div>
                </form>
                <Link className='loginSignupToggle' to='/login'>Already have an account</Link>
                <SocialOauth/>
            </div>
        </div>
    );
};

export default SignupUseform;
