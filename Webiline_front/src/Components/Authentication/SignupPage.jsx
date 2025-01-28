import "./SignupPage.css";
import user from "../../assets/user.webp";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUp } from "../../services/authService";

const schema = z
  .object({
    username: z
      .string()
      .min(3, { message: "username shoud be more than 3 characters" }),
    email: z.string().email({ message: "Please enter valid email address" }),
    password: z
      .string()
      .min(8, { message: "The password must be at least 8 characters" }),
    confirmPassword: z.string(),
    phoneNumber: z.string().min(5),
    // deliveryAddress: z
    //   .string()
    //   .min(15, { message: "Address must be at least 15 characters." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Confirm password does not match the Password.",
    path: ["confirmPassword"],
  });

const SignupPage = () => {
  const [profilePic, setprofilePic] = useState(null);
  const [signupMessage, setSignupMessage] = useState({msg: null});
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  // const [errors, setErrors] = useState({msg: null});
  // const [signupMessage, setSignupMessage] = useState({msg: null});

  const onSubmit = async (formData) => {
    try{
      const res = await signUp(formData);
      setSignupMessage(() => ({msg: res.msg}));
    }
    catch (err){
      console.log("errors" ,err);
    }
  }


  return (
    <section className="align_center form_page">
      <form
        className="authentication_form signup_form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2>SignUp Form</h2>

        {/* <div className="image_input_section">
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
        </div> */}

        {/* Form Inputs */}
        <div className="form_inputs signup_form_input">

          {signupMessage.msg && <div className="signup-message">{signupMessage.msg}</div>}

          <div>
            <label htmlFor="username">Username*</label>
            <input
              id="username"
              className="form_text_input"
              type="text"
              placeholder="Enter your username"
              {...register("username")}
            />
            {errors.name && (
              <em className="form_error">{errors.name.message}</em>
            )}
          </div>

          <div>
            <label htmlFor="email">Email*</label>
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
            <label htmlFor="persianName">Persian Name</label>
            <input
              id="persianName"
              className="form_text_input"
              type="text"
              placeholder="اسم ایرانی"
              // {...register("email")}
            />
            {errors.persianName && (
              <em className="form_error">{errors.persianName.message}</em>
            )}
          </div>

          <div>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              className="form_text_input"
              type="text"
              placeholder="Enter your name"
              // {...register("email")}
            />
            {errors.name && (
              <em className="form_error">{errors.name.message}</em>
            )}
          </div>

          <div>
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              className="form_text_input"
              type="text"
              placeholder="Enter your lastname"
              // {...register("email")}
            />
            {errors.lastName && (
              <em className="form_error">{errors.lastName.message}</em>
            )}
          </div>

          <div>
            <label htmlFor="phoneNumber">Phonenumber*</label>
            <input
              id="phoneNumber"
              className="form_text_input"
              type="text"
              placeholder="9123456444"
              {...register("phoneNumber")}
            />
            {errors.phoneNumber && (
              <em className="form_error">{errors.phoneNumber.message}</em>
            )}
          </div>

          <div>
            <label htmlFor="password">Password*</label>
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
            <label htmlFor="cpassword">Confirm Password*</label>
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

          <div className="signup_textares_section">
            <label htmlFor="nationalCode">National Code</label>
            <textarea
              id="nationalCode"
              className="input_textarea"
              placeholder="Enter your national code"
              // {...register("deliveryAddress")}
            />
            {errors.nationalCode && (
              <em className="form_error">{errors.nationalCode.message}</em>
            )}
          </div>
        </div>

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
