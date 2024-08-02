/* eslint-disable @typescript-eslint/no-var-requires */
import React, { ChangeEvent, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import instance from "../../../base-axios/useAxios";
import { State_user } from "../../../Types/reducer";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { MenuAttributes } from "../../../Types/menu";
import { RestaurantAttributes } from "../../../Types/restaurant";
import { useNavigate } from "react-router-dom";
import { handleError } from "../../../utils/util";

const Menu: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const user = useSelector((state: State_user) => state.user);
    const [restID, setRestID] = useState<number>();
    const [preview, setPreview] = useState<string | null>(require('./default.jpg'));
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const { register, handleSubmit, formState: { errors } } = useForm<MenuAttributes>();

    const fetchall = async () => {
        await instance({
            url: `restaurant/getrestaurantdata/${user.id}`,
            method: "GET",
        })
            .then((res) => {
                const result: RestaurantAttributes = res.data.result[0]
                setRestID(result.id)
            })
            .catch((error) => {
                handleError(error, dispatch, navigate);
            });
    };
    useEffect(() => {
        fetchall();
    }, []);

    const handlemenu: SubmitHandler<MenuAttributes> = async (data: MenuAttributes) => {
        const form_data = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            form_data.append(key, value as string | Blob);
        });

        if (selectedImage) {
            form_data.append('image', selectedImage);
        }
        await instance({
            url: `menu/addmenu/${restID}`,
            method: 'POST',
            data: form_data,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }).then((res) => {
            if (res.data.message === "success") {
                toast.success("Successfully Added");
            } else {
                toast.error("Please Enter Valid Data");
            }
        }).catch((error) => {
            handleError(error, dispatch, navigate);
        })
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        if (file) {
            const fileSize = file.size / 1024 / 1024; // Size in MB
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
        <div className="absolute top-56 right-96 mr-12 bg-slate-400 p-8 rounded-lg">
            <h2 className="text-center text-3xl font-bold mb-5">Add Menu Detail</h2>
            <form onSubmit={handleSubmit(handlemenu)} className="space-y-6">
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
                            {...register("image", {
                                required: "Image is Required!!",
                            })}
                            className="hidden"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                        {errors.image && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.image.message}
                            </p>
                        )}
                    </div>
                    <div className="ml-28 mt-4">
                        <div className="form-group">
                            <label
                                htmlFor="item_name"
                                className="block text-xl font-medium text-gray-700"
                            >
                                Item Name
                            </label>
                            <input
                                type="text"
                                id="item_name"
                                {...register("item_name", {
                                    required: "Menu Name is Required!!",
                                })}
                                className="my-2 form-control text-sm w-96 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 py-2 px-3"
                            />
                            {errors.item_name && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.item_name.message}
                                </p>
                            )}
                        </div>
                        <div className="form-group">
                            <label
                                htmlFor="price"
                                className="block text-xl font-medium text-gray-700"
                            >
                                Price:
                            </label>
                            <input
                                type="number"
                                id="price"
                                {...register("price", {
                                    required: "Price is Required!!",
                                })}
                                className="my-2 form-control text-sm w-96 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 py-2 px-3"
                            />
                            {errors.price && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.price.message}
                                </p>
                            )}
                        </div>

                    </div>
                </div>
                <button
                    type="submit"
                    className="ml-72 btn btn-primary inline-flex justify-center py-3 px-10 border border-transparent shadow-sm text-xl font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Menu;