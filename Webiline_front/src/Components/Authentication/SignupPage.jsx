import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import "./SignupPage.css";
import user from "../../assets/user.webp";
import { getUser, signup } from "../../services/userServices";
import { Navigate } from "react-router-dom";

const schema = z
    .object({
        username: z.string().min(3, { message: "Username must be at least 3 characters." }),
        name: z.string().min(3, { message: "Name should be at least 3 characters." }),
        email: z.string().email({ message: "Please enter a valid email." }),
        password: z.string().min(6, { message: "Password must be at least 8 characters." }),
        confirmPassword: z.string(),
        persianN: z.string().optional(),
        firstname: z.string().optional(),
        lastname: z.string().optional(),
        nationalCode: z.string().optional(),
        phoneNumber: z.string().min(10, { message: "Phone Number must be valid." }),
        whatsAppNumber: z.string().optional(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Confirm Password does not match Password.",
        path: ["confirmPassword"],
    });

const SignupPage = () => {
    const [profilePic, setProfilePic] = useState(null);
    const [formError, setFormError] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: zodResolver(schema) });

    const onSubmit = async (formData) => {
        try {
            await signup(formData, profilePic);

            window.location = "/login";
        } catch (err) {
            console.log(err);
            if (err.response && err.response.status === 400) {
                if (err.response.data.message){
                  setFormError(err.response.data.message);
                }else{
                  setFormError(err.code)
                }
                
            }
        }
    };

    if (getUser()) {
        return <Navigate to='/' />;
    }

    return (
        <section className='align_center form_page'>
            <form
                className='authentication_form signup_form'
                onSubmit={handleSubmit(onSubmit)}>
                <h2>SignUp Form</h2>

                <div className='image_input_section'>
                    <div className='image_preview'>
                        <img
                            src={profilePic ? URL.createObjectURL(profilePic) : user}
                            id='file-ip-1-preview'
                        />
                    </div>
                    <label htmlFor='file-ip-1' className='image_label'>
                        Upload Image
                    </label>
                    <input
                        type='file'
                        onChange={(e) => setProfilePic(e.target.files[0])}
                        id='file-ip-1'
                        className='image_input'
                    />
                </div>

                {/* Form Inputs */}
                <div className='form_inputs signup_form_input'>
                    <div>
                        <label htmlFor='username'>Username</label>
                        <input
                            id='username'
                            className='form_text_input'
                            type='text'
                            placeholder='Enter your username'
                            {...register("username")}
                        />
                        {errors.username && <em className='form_error'>{errors.username.message}</em>}
                    </div>

                    <div>
                        <label htmlFor='name'>Name</label>
                        <input
                            id='name'
                            className='form_text_input'
                            type='text'
                            placeholder='Enter your name'
                            {...register("name")}
                        />
                        {errors.name && <em className='form_error'>{errors.name.message}</em>}
                    </div>

                    <div>
                        <label htmlFor='email'>Email</label>
                        <input
                            id='email'
                            className='form_text_input'
                            type='email'
                            placeholder='Enter your email address'
                            {...register("email")}
                        />
                        {errors.email && <em className='form_error'>{errors.email.message}</em>}
                    </div>

                    <div>
                        <label htmlFor='password'>Password</label>
                        <input
                            id='password'
                            className='form_text_input'
                            type='password'
                            placeholder='Enter your password'
                            {...register("password")}
                        />
                        {errors.password && <em className='form_error'>{errors.password.message}</em>}
                    </div>

                    <div>
                        <label htmlFor='cpassword'>Confirm Password</label>
                        <input
                            id='cpassword'
                            className='form_text_input'
                            type='password'
                            placeholder='Enter confirm password'
                            {...register("confirmPassword")}
                        />
                        {errors.confirmPassword && <em className='form_error'>{errors.confirmPassword.message}</em>}
                    </div>

                    <div>
                        <label htmlFor='persianN'>Persian Name (optional)</label>
                        <input
                            id='persianN'
                            className='form_text_input'
                            type='text'
                            placeholder='Enter Persian Name'
                            {...register("persianN")}
                        />
                    </div>

                    <div>
                        <label htmlFor='firstname'>First Name (optional)</label>
                        <input
                            id='firstname'
                            className='form_text_input'
                            type='text'
                            placeholder='Enter First Name'
                            {...register("firstname")}
                        />
                    </div>

                    <div>
                        <label htmlFor='lastname'>Last Name (optional)</label>
                        <input
                            id='lastname'
                            className='form_text_input'
                            type='text'
                            placeholder='Enter Last Name'
                            {...register("lastname")}
                        />
                    </div>

                    <div>
                        <label htmlFor='nationalCode'>National Code (optional)</label>
                        <input
                            id='nationalCode'
                            className='form_text_input'
                            type='text'
                            placeholder='Enter National Code'
                            {...register("nationalCode")}
                        />
                        {errors.nationalCode && <em className='form_error'>{errors.nationalCode.message}</em>}
                    </div>

                    <div>
                        <label htmlFor='phoneNumber'>Phone Number</label>
                        <input
                            id='phoneNumber'
                            className='form_text_input'
                            type='text'
                            placeholder='Enter phone number with prefix'
                            {...register("phoneNumber")}
                        />
                        {errors.phoneNumber && <em className='form_error'>{errors.phoneNumber.message}</em>}
                    </div>

                    <div>
                        <label htmlFor='whatsAppNumber'>WhatsApp Number (optional)</label>
                        <input
                            id='whatsAppNumber'
                            className='form_text_input'
                            type='text'
                            placeholder='Enter WhatsApp number'
                            {...register("whatsAppNumber")}
                        />
                    </div>

                    {/* <div className='signup_textares_section'>
                        <label htmlFor='address'>Delivery Address</label>
                        <textarea
                            id='address'
                            className='input_textarea'
                            placeholder='Enter delivery address'
                            {...register("deliveryAddress")}
                        />
                        {errors.deliveryAddress && <em className='form_error'>{errors.deliveryAddress.message}</em>}
                    </div> */}
                </div>

                {formError && <em className='form_error'>{formError}</em>}

                <button className='search_button form_submit' type='submit'>
                    Submit
                </button>
            </form>
        </section>
    );
};

export default SignupPage;
