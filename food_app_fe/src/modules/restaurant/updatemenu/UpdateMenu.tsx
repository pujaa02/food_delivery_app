/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ChangeEvent, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import instance from "../../../base-axios/useAxios";
import { REACT_APP_IMAGEURL } from "../../../config";
import { MenuAttributes } from "../../../Types/menu";
import { Props } from "../../../Types/props";
import { State } from "../../../Types/reducer";
import { handleError } from "../../../utils/util";

const UpdateMenu: React.FC<Props> = (props: Props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const menuid = useSelector((state: State) => state.menu.menuID)
    const [preview, setPreview] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [menudata, setmenudata] = useState<MenuAttributes>();
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<MenuAttributes>();

    const fetchmenudata = async () => {
        await instance({
            url: `menu/fetchmenudata/${menuid}`,
            method: "GET",
        }).then((res) => {
            if (res.data.message === "success") {
                setmenudata(res.data.result);
                const result_data: MenuAttributes = res.data.result;
                setPreview(`${REACT_APP_IMAGEURL}` + result_data.image);
                Object.entries(result_data).forEach(([key, value]) => setValue(key as keyof MenuAttributes, value));
            }
        }).catch((error) => {
            handleError(error, dispatch, navigate);
        })
    };

    useEffect(() => {
        fetchmenudata();
    }, []);


    const handlemenu: SubmitHandler<MenuAttributes> = async (data: MenuAttributes) => {
        const formdata = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            formdata.append(key, value as string | Blob);
        });
        if (selectedImage) {
            formdata.append('image', selectedImage)
        }
        await instance({
            url: `menu/updatemenu/${menuid}`,
            method: "POST",
            data: formdata
        })
            .then((res) => {
                if (res.data.message === 'success') {
                    toast.success("Item Updated Succesfully");
                }
            })
            .catch((error) => {
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
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Update Menu
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
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
                                className="text-center bg-red-600 w-56 p-2 block text-xl text-slate-200 font-bold"
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
            </Modal.Body>
        </Modal>
    );
};

export default UpdateMenu;