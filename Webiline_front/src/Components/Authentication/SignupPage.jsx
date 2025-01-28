import "./SignupPage.css";
import user from "../../assets/user.webp";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { signup } from "../../services/userServices";

const schema = z
  .object({
    // name: z
    //   .string()
    //   .min(3, { message: "Name shoud be more than 3 characters" }),
    email: z.string().email({ message: "Please enter valid email address" }),
    password: z
      .string()
      .min(5, { message: "The password must be at least 8 characters" }),
    confirmPassword: z.string(),
    phoneNumber: z.string(),
    username: z.string(),
    firstname: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Confirm password does not match the Password.",
    path: ["confirmPassword"],
  });

const SignupPage = () => {
  const [profilePic, setprofilePic] = useState(null);
  const [formError, setFormError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });
  const onSubmit = async (FormData) => {
    try {
      await signup(FormData, profilePic);

      window.location = "/login"; // make a placeholder for login
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setFormError(err.response.data.message);
      }
    }
  };
  return (
    <section className="align_center form_page">
      <form
        className="authentication_form signup_form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2>SignUp Form</h2>

        <div className="image_input_section">
          <div className="image_preview">
            <img
              src={profilePic ? URL.createObjectURL(profilePic) : user}
              id="file-ip-1-preview"
            />
          </div>
          <label htmlFor="file-ip-1" className="image_label">
            Upload Image
          </label>
          <input
            type="file"
            id="file-ip-1"
            onChange={(e) => setprofilePic(e.target.files[0])}
            className="image_input"
          />
        </div>

        {/* Form Inputs */}
        <div className="form_inputs signup_form_input">
          <div>
            <label htmlFor="firstname">Firstame</label>
            <input
              id="firstname"
              className="form_text_input"
              type="text"
              placeholder="Enter your name"
              {...register("firstname")}
            />
            {errors.name && (
              <em className="form_error">{errors.firstname.message}</em>
            )}
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              className="form_text_input"
              type="email"
              placeholder="Enter your email address"
              {...register("email")}
            />
            {errors.email && (
              <em className="form_error">{errors.email.message}</em>
            )}
          </div>

          <div>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              className="form_text_input"
              type="text"
              placeholder="Enter your username"
              {...register("username")}
            />
            {errors.username && (
              <em className="form_error">{errors.username.message}</em>
            )}
          </div>


          <div>
            <label htmlFor="phonenumber">Phonenumber</label>
            <input
              id="phonenumber"
              className="form_text_input"
              type="text"
              placeholder="Enter your phonenumber"
              {...register("phoneNumber")}
            />
            {errors.email && (
              <em className="form_error">{errors.phoneNumber.message}</em>
            )}
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              className="form_text_input"
              type="password"
              placeholder="Enter your password"
              {...register("password")}
            />
            {errors.password && (
              <em className="form_error">{errors.password.message}</em>
            )}
          </div>

          <div>
            <label htmlFor="cpassword">Confirm Password</label>
            <input
              id="cpassword"
              className="form_text_input"
              type="password"
              placeholder="Enter confirm password"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <em className="form_error">{errors.confirmPassword.message}</em>
            )}
          </div>
        </div>

        {formError && <em className="form_error">{formError}</em>}

        <button className="search_button form_submit" type="submit">
          Submit
        </button>
      </form>
    </section>
  );
};

export default SignupPage;

// name - Name should be at least 3 characters.
// email - Please enter valid email
// password - Password must be at least 8 characters.
// confirmPassword - Confirm Password does not match Password
// deliveryAddress - Address must be at least 15 characters.
