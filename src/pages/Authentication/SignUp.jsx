

import { Link, useNavigate, useLocation } from "react-router-dom";
import Swal from 'sweetalert2'
import { useContext } from "react";
import { ToastContainer, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../Provider/AuthProvider";
import useAxiosPublic from "../../Hook/AxiosPublic/useAxiosPublic";

const SignUp = () => {
    const Navigate = useNavigate();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { Creatuser, updatedUserProfile } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
    const Location = useLocation();
    console.log("Location in the register page", Location);


    const onSubmit = async (data) => {
        console.log(data);
        const imageFile = { image: data.photoURL[0] }
        const resImageUpload = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });

        const uploadedImage = resImageUpload.data.data.display_url;

        //

        try {
            const result = await Creatuser(data.email, data.password);
            const loggedUser = result.user;
            console.log(loggedUser);

            await updatedUserProfile(data.name, uploadedImage);

            // create user entry in the database
            const userInfo = {
                name: data.name,
                email: data.email,
              
            };

            const res = await axiosPublic.post('/users', userInfo);

            if (res.data.insertedId) {
                console.log('user added to the database');
                reset();
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'User created successfully.',
                    showConfirmButton: false,
                    timer: 1500
                });
                Navigate('/');
            }
        }
        catch (error) {
            //   console.error(error);
            //   setError(error.message)
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something Wrong! please try again",
            })
        }


    };
    return (
        <div className="mt-5    hero  " >


            {/* <Helmet>
                <title>Sign Up || ShopSort</title>
            </Helmet> */}
            <div className=" my-10  lg:flex  " >



                <div className="mx-auto rounded-r-xl  px-2 py-2  lg:w-[700px]  md:px-8 mt-8  bg-base-200  ">
                    <h1 className="lg:text-4xl font-bold text-center  border-b-4 border-y-indigo-600 pb-1 "  >  Create A  Account</h1>

                    <form onSubmit={handleSubmit(onSubmit)} className="card-body   ">

                        {/* name */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text"  {...register("name", { required: true })} name="name" placeholder="Name" className="input input-bordered" />
                            {errors.name && <span className="text-red-600">Name is required</span>}
                        </div>
                        {/* PHOTO UPLOAD */}
                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text">Upload Your Photo</span>
                            </label>
                            <input {...register("photoURL", { required: true })} type="file" className="file-input w-full " />
                            {errors.photoURL && <span className="text-red-600">Upload your Photo Url</span>}
                        </div>
                        {/*  */}

                        {/* role */}
                        {/* <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Role</span>
                            </label>
                            <select defaultValue=""   {...register('role', { required: true })}
                                className="select select-bordered w-full">
                                <option disabled value="">Select a category</option>
                                <option value="user">user</option>
                                <option value="seller">seller</option>
                            </select>
                            {errors.select && <span className="text-red-600" > Select Your role </span>}
                        </div> */}
                        {/* email */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email"  {...register("email", { required: true })} name="email" placeholder="email" className="input input-bordered" />
                            {errors.email && <span className="text-red-600">Please Enter your Email Address</span>}
                        </div>
                        {/* password */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password"  {...register("password", {
                                required: true,
                                minLength: 6,
                                maxLength: 20,
                                // pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                            })} placeholder="password" className="input input-bordered" />
                            {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
                            {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 6 characters</p>}

                        </div>
                        <div className="form-control ">
                            <button className="btn text-2xl mt-2 font-semibold text-white bg-gradient-to-r from-sky-500 to-indigo-500">Register</button>
                        </div>
                    </form>
                    <h1 className="text-center text-xl  "  >Already have an Account ? < Link to='/login' className=" font-bold text-green-700 text-2xl  " >Login</Link></h1>
                </div>


            </div>

            <ToastContainer />
        </div>
    );
};

export default SignUp;