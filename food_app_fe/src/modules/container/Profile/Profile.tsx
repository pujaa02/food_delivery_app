import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { RegData } from "../../../Types/register";
import { useDispatch, useSelector } from "react-redux";
import { State_user } from "../../../Types/reducer";
import instance from "../../../base-axios/useAxios";
import toast from "react-hot-toast";
import "./profile.css";
import { handleError } from "../../../utils/util";
import { useNavigate } from "react-router-dom";
import { adduser } from "../../../redux-toolkit/Reducers/actions";
import { emailValidationPattern, phoneValidationPattern, checkValidDate } from "../../../modules/Register/Validations/registervalidation";

const Profile: React.FC = () => {
    const user = useSelector((state: State_user) => state.user);
    const [formdata, setFormdata] = useState<RegData>();
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<RegData>({
        defaultValues: formdata,
    });

    useEffect(() => {
        if (user) {
            setFormdata(user);
            Object.entries(user).forEach(([key, value]) => {
                setValue(key as keyof RegData, value);
            });
        }
    }, [user, setValue]);

    const handleupdate = async (data: RegData) => {
        await instance({
            url: `user/update/${user.id}`,
            method: "POST",
            data: data,
        }).then((res) => {
            if (res.data.message === "user updated Successfully") {
                dispatch(adduser(data));
                toast.success("Successfully Updated");
            } else {
                toast.error("Please Enter Valid Data");
            }
        }).catch((error) => {
            handleError(error, dispatch, navigate);
        })

    };

    return (
        <div className="container_of_sidebar mt-20  bg-slate-400 p-8 rounded-lg">
            <h2 className="text-center text-3xl font-bold mb-5">User Profile</h2>
            <form onSubmit={handleSubmit(handleupdate)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="form-group">
                        <label
                            htmlFor="fname"
                            className="block text-xl font-medium text-gray-700"
                        >
                            First Name:
                        </label>
                        <input
                            type="text"
                            id="fname"
                            {...register("fname", {
                                required: "First Name is Required!!",
                            })}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {errors.fname && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.fname.message}
                            </p>
                        )}
                    </div>
                    <div className="form-group">
                        <label
                            htmlFor="lname"
                            className="block text-xl font-medium text-gray-700"
                        >
                            Last Name:
                        </label>
                        <input
                            type="text"
                            id="lname"
                            {...register("lname", {
                                required: "Last Name is Required!!",
                            })}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {errors.lname && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.lname.message}
                            </p>
                        )}
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="form-group">
                        <label
                            htmlFor="email"
                            className="block text-xl font-medium text-gray-700"
                        >
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
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>
                    <div className="form-group">
                        <label
                            htmlFor="phone"
                            className="block text-xl font-medium text-gray-700"
                        >
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
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {errors.phone && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.phone.message}
                            </p>
                        )}
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="form-group">
                        <label
                            htmlFor="bd"
                            className="block text-xl font-medium text-gray-700"
                        >
                            DOB:
                        </label>
                        <input
                            type="date"
                            id="bd"
                            {...register("bd", {
                                required: "Birthday Date is Required!!",
                                validate: () =>
                                    checkValidDate(watch("bd")) || "Please Enter Valid Date!!",
                            })}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {errors.bd && (
                            <p className="text-red-500 text-sm mt-1">{errors.bd.message}</p>
                        )}
                    </div>
                    <div className="form-group">
                        <label className="block text-xl font-medium text-gray-700">
                            Gender:
                        </label>
                        <div className="flex items-center mt-2">
                            <div className="flex items-center mr-4">
                                <input
                                    type="radio"
                                    id="male"
                                    value="male"
                                    {...register("gender", {
                                        required: "Gender is Required!!",
                                    })}
                                    className="form-check-input mr-2"
                                />
                                <label htmlFor="male" className="text-sm">
                                    Male
                                </label>
                            </div>
                            <div className="flex items-center mr-4">
                                <input
                                    type="radio"
                                    id="female"
                                    value="female"
                                    {...register("gender", {
                                        required: "Gender is Required!!",
                                    })}
                                    className="form-check-input mr-2"
                                />
                                <label htmlFor="female" className="text-sm">
                                    Female
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    id="other"
                                    value="other"
                                    {...register("gender", {
                                        required: "Gender is Required!!",
                                    })}
                                    className="form-check-input mr-2"
                                />
                                <label htmlFor="other" className="text-sm">
                                    Other
                                </label>
                            </div>
                        </div>
                        {errors.gender && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.gender.message}
                            </p>
                        )}
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="form-group">
                        <label
                            htmlFor="role_id"
                            className="block text-xl font-medium text-gray-700"
                        >
                            Your Role:
                        </label>
                        <select
                            id="role_id"
                            {...register("role_id", {
                                required: "Role is Required!!",
                            })}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="4">User</option>
                            <option value="2">Restaurant owner</option>
                            <option value="3">Driver</option>
                        </select>
                        {errors.role_id && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.role_id.message}
                            </p>
                        )}
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <div className="form-group">
                        <label
                            htmlFor="state"
                            className="block text-xl font-medium text-gray-700"
                        >
                            State:
                        </label>
                        <input
                            type="text"
                            id="state"
                            {...register("state")}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="form-group">
                        <label
                            htmlFor="city"
                            className="block text-xl font-medium text-gray-700"
                        >
                            City:
                        </label>
                        <input
                            type="text"
                            id="city"
                            {...register("city")}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="form-group">
                        <label
                            htmlFor="pincode"
                            className="block text-xl font-medium text-gray-700"
                        >
                            Pincode:
                        </label>
                        <input
                            type="text"
                            id="pincode"
                            {...register("pincode")}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-4">
                    <div className="form-group">
                        <label
                            htmlFor="street"
                            className="block text-xl font-medium text-gray-700"
                        >
                            Street:
                        </label>
                        <input
                            type="text"
                            id="street"
                            {...register("street")}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="ml-64 btn btn-primary inline-flex justify-center py-3 px-10 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Update
                </button>
            </form>
        </div>
    );
};

export default Profile;