import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { RegData } from "../../Types/register";
import instance from "../../base-axios/useAxios";
import toast from "react-hot-toast";
import { checkValidDate, emailValidationPattern, phoneValidationPattern } from "./Validations/registervalidation";


const Register: React.FC = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegData>();

  const enteredDate = watch("bd") || "string";
  const handleRegister = async (data: RegData) => {
    try {
      await instance({
        url: "register/",
        method: "POST",
        data: data,
      }).then((res) => {

        if (res.data.message === "user Created Successfully") {
          toast.success("Successfully Register");
          navigate("/login")
        } else if (res.data.message === "user already exist") {
          toast.error("user already exist");
        }
      });
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div className="w-11/12 max-w-2xl p-6 mx-auto border-4 border-blue-600 rounded-lg bg-white mt-20">
      <h2 className="text-center text-red-600 mb-6">Registration Page</h2>
      <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">
        <div className="flex space-x-4">
          <div className="flex-1">
            <label htmlFor="fname" className="block mb-1 font-medium">
              First Name:
            </label>
            <input
              type="text"
              id="fname"
              {...register("fname", {
                required: "First Name is Required!!",
              })}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.fname && (
              <p className="text-red-600 mt-1">{errors.fname.message}</p>
            )}
          </div>
          <div className="flex-1">
            <label htmlFor="lname" className="block mb-1 font-medium">
              Last Name:
            </label>
            <input
              type="text"
              id="lname"
              {...register("lname", {
                required: "Last Name is Required!!",
              })}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.lname && (
              <p className="text-red-600 mt-1">{errors.lname.message}</p>
            )}
          </div>
        </div>
        <div className="flex space-x-4">
          <div className="flex-1">
            <label htmlFor="email" className="block mb-1 font-medium">
              Email:
            </label>
            <input
              type="email"
              id="email"
              {...register("email", {
                required: "Email is Required!!",
                pattern: {
                  value: emailValidationPattern,
                  message: "Invalid email!!",
                },
              })}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.email && (
              <p className="text-red-600 mt-1">{errors.email.message}</p>
            )}
          </div>
          <div className="flex-1">
            <label htmlFor="phone" className="block mb-1 font-medium">
              Phone:
            </label>
            <input
              type="text"
              id="phone"
              {...register("phone", {
                required: "Mobile Number is Required!!",
                pattern: {
                  value: phoneValidationPattern,
                  message: "Enter Valid Mobile Number",
                },
              })}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.phone && (
              <p className="text-red-600 mt-1">{errors.phone.message}</p>
            )}
          </div>
        </div>
        <div className="flex space-x-4">
          <div className="flex-1">
            <label htmlFor="bd" className="block mb-1 font-medium">
              DOB:
            </label>
            <input
              type="date"
              id="bd"
              {...register("bd", {
                required: "Birthday Date is Required!!",
                validate: () =>
                  checkValidDate(enteredDate) || "Please Enter Valid Date!!",
              })}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.bd && (
              <p className="text-red-600 mt-1">{errors.bd.message}</p>
            )}
          </div>
          <div>
            <label className="font-medium">Gender:</label>
            <div className="flex mt-2">
              <div className="flex items-center me-4">
                <input type="radio"
                  id="male"
                  value="male"
                  {...register("gender", {
                    required: "Gender is Required!!",
                  })}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="male" className="ms-2 text-sm font-medium text-gray-500 ">Male</label>
              </div>
              <div className="flex items-center me-4">
                <input type="radio"
                  id="female"
                  value="female"
                  {...register("gender", {
                    required: "Gender is Required!!",
                  })}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="female" className="ms-2 text-sm font-medium text-gray-500 ">Female</label>
              </div>
              <div className="flex items-center me-4">
                <input type="radio"
                  id="other"
                  value="other"
                  {...register("gender", {
                    required: "Gender is Required!!",
                  })}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="other" className="ms-2 text-sm font-medium text-gray-500">Other</label>
              </div>
            </div>
            {errors.gender && (
              <p className="text-red-600 mt-1">{errors.gender.message}</p>
            )}
          </div>

        </div>
        <div className="flex space-x-4">
          <div className="flex-1">
            <label htmlFor="password" className="block mb-1 font-medium">
              Password:
            </label>
            <input
              type="password"
              id="password"
              {...register("password", {
                required: "Password is Required!!",
              })}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.password && (
              <p className="text-red-600 mt-1">{errors.password.message}</p>
            )}
          </div>
          <div className="flex-1">
            <label htmlFor="role_id" className="block mb-1 font-medium">
              Your Role:
            </label>
            <select
              id="role_id"
              {...register("role_id", {
                required: "Role is Required!!",
              })}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="4">User</option>
              <option value="2">Restaurant owner</option>
              <option value="3">Driver</option>
            </select>
            {errors.role_id && (
              <p className="text-red-600 mt-1">{errors.role_id.message}</p>
            )}
          </div>
        </div>
        <div className="flex space-x-4">
          <div className="flex-1">
            <label htmlFor="state" className="block mb-1 font-medium">
              State:
            </label>
            <input
              type="text"
              id="state"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="city" className="block mb-1 font-medium">
              City:
            </label>
            <input
              type="text"
              id="city"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="pincode" className="block mb-1 font-medium">
              Pincode:
            </label>
            <input
              type="text"
              id="pincode"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div className="flex">
          <div className="flex-1">
            <label htmlFor="street" className="block mb-1 font-medium">
              Street:
            </label>
            <input
              type="text"
              id="street"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <button
          type="submit"
          className="block w-full py-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          Register
        </button>
        <div className="flex justify-center mt-4">
          <p>
            Already Have an Account?{" "}
            <Link to="/login" className="text-blue-500 underline">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;