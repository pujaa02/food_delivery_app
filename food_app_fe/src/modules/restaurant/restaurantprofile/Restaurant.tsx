import React, { ChangeEvent, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import instance from "../../../base-axios/useAxios";
import { State_user } from "../../../Types/reducer";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Rest, RestaurantAttributes } from "../../../Types/restaurant";
import { useNavigate } from "react-router-dom";
import { handleError } from "../../../utils/util";
import { REACT_APP_IMAGEURL } from "../../../config";

const Restaurant: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state: State_user) => state.user);
    const [restaurantdata, setRestaurantData] = useState<RestaurantAttributes>();
    const [preview, setPreview] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<RestaurantAttributes>({ defaultValues: restaurantdata });

    const handlerestaurant: SubmitHandler<RestaurantAttributes> = async (data: RestaurantAttributes) => {
        const form_data = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            form_data.append(key, value as string | Blob);
        });

        if (selectedImage) {
            form_data.append('image', selectedImage);
        }

        const url = restaurantdata
            ? `restaurant/updaterestaurant/${restaurantdata.id}/${user.id}`
            : `restaurant/addrestaurant/${user.id}`;

        const method = restaurantdata ? 'POST' : 'POST';

        try {
            await instance({
                url,
                method,
                data: form_data,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }).then((res) => {
                if (res.data.message === "success" || res.data.message === "restaurant updated Successfully") {
                    toast.success("Successfully Updated");
                } else {
                    toast.error("Please Enter Valid Data");
                }
            });
        } catch (error) {
            handleError(error, dispatch, navigate);
        }
    };

    const fetchrestaurantdata = async () => {
        try {
            await instance({
                url: `restaurant/getrestaurantdata/${user.id}`,
                method: "GET",
            }).then((res) => {
                if (res.data.message === "success") {
                    setRestaurantData(res.data.result[0]);
                    const result_data: RestaurantAttributes = res.data.result[0];
                    setPreview(`${REACT_APP_IMAGEURL}` + result_data.image);
                    Object.entries(result_data).forEach(([key, value]) => setValue(key as keyof Rest, value));
                }
            });
        } catch (error) {
            handleError(error, dispatch, navigate);
        }
    };

    useEffect(() => {
        fetchrestaurantdata();
    }, [user]);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        if (file) {
            const fileSize = file.size / 1024 / 1024;
            const fileType = file.type.split("/")[0];
            if (fileType !== "image") {
                alert("Please select a valid image file.");
                return;
            }
            if (fileSize > 5) {
                alert("Image size should be less than 5MB.");
                return;
            }
            setSelectedImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    return (
        <div className="absolute top-56 right-96 mr-12  bg-slate-400 p-8 rounded-lg">
            <h2 className="text-center text-3xl font-bold mb-5">Restaurant Detail</h2>
            <form onSubmit={handleSubmit(handlerestaurant)} className="space-y-6">
                <div className="flex">
                    <div className="form-group">
                        {preview && (
                            <img
                                src={preview}
                                alt="Image Preview"
                                className="w-56 h-48 rounded-t-lg"
                            />
                        )}
                        <label
                            htmlFor="image"
                            className="text-center bg-red-600 w-56 p-2 block text-xl  text-slate-200 font-bold"
                        >
                            Upload Image
                        </label>
                        <input
                            type="file"
                            id="image"
                            className="hidden"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </div>
                    <div className="ml-28">
                        <div className="form-group">
                            <label
                                htmlFor="name"
                                className="block text-xl font-medium text-gray-700"
                            >
                                Restaurant Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                {...register("name", {
                                    required: "Restaurant Name is Required!!",
                                })}
                                className="my-2 form-control text-sm w-96 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 py-2 px-3"
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.name.message}
                                </p>
                            )}
                        </div>
                        <div className="form-group">
                            <label
                                htmlFor="phone"
                                className="block text-xl font-medium text-gray-700"
                            >
                                Mobile Number:
                            </label>
                            <input
                                type="text"
                                id="phone"
                                {...register("phone", {
                                    required: "Restaurant number is Required!!",
                                    pattern: {
                                        value: /^\d{10}$/,
                                        message: "Enter Valid Mobile Number",
                                    },
                                })}
                                className="my-2 form-control text-sm w-96 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 py-2 px-3"
                            />
                            {errors.phone && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.phone.message}
                                </p>
                            )}
                        </div>

                        <div className="form-group">
                            <label
                                htmlFor="address"
                                className="block text-xl font-medium text-gray-700"
                            >
                                Address:
                            </label>
                            <input
                                type="text"
                                id="address"
                                {...register("address", {
                                    required: "Restaurant address is Required!!",
                                })}
                                className="my-2 form-control text-sm w-96 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 py-2 px-3"
                            />
                            {errors.address && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.address.message}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
                <button
                    type="submit"
                    className="ml-56 btn btn-primary inline-flex justify-center py-3 px-10 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Restaurant;


