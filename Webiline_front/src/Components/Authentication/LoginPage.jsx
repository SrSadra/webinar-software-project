import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "./LoginPage.css";
import { login } from "../../services/authService";

const schema = z.object({
  email: z
    .string()
    .email({ message: "Please enter valid email address" }),
    password: z
    .string()
    .min(6, { message: "Password should be at least 6 characters" })
    .max(50, { message: "Password should not exceed 50 characters" }),
});

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });


  const [errors, setErrors] = useState({message: null});

  const onSubmit = async (formData) => {
    try{
      const res = await login(formData);
      if (res.msg == ""){
        console.log("Login successful:", data);
        //redirect dashboard
        return;
      }
    }
    catch(err){
        // console.error("Login failed:");
        console.log(err.response.data.msg);
        setErrors(() => ({
          message: err.response.data.msg
        }));
      }
  };


  return (
    <section className="align_center form_page">
      <form className="authentication_form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Login Form</h2>
        <div className="form_inputs">
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              //ref={nameRef}
              id="email"
              className="form_text_input"
              placeholder="Enter your email address"
              {...register("email")}
            />
            {errors.me && (
              <em className="form_error">{errors.message}</em>
            )}
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              //ref={phoneRef}
              id="password"
              className="form_text_input"
              placeholder="Enter your password"
              {...register("password")}
            />
            {errors && (
              <em className="form_error">{errors.message}</em>
            )}
          </div>
          <button type="submit" className="search_button form_submit">
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default LoginPage;
