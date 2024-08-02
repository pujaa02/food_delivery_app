import React from "react";
import { useForm } from "react-hook-form";
import { LoginData } from "../../Types/login";
import instance from "../../base-axios/useAxios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ForgetPass: React.FC = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit, formState: { errors }
    } = useForm<LoginData>();

    const updatepass = async (data: LoginData) => {
        try {
            await instance({
                url: "updatepass/",
                method: "POST",
                data: data,
            }).then((res) => {
                if (res.data.message === 'password updated successfully') {
                    toast.success("Password Updated Successfully");
                    navigate("/login");
                } else {
                    toast.error("Please Enter Valid Data");
                }
            });
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="container mx-auto p-6 max-w-md bg-white border-4 border-blue-600 rounded-lg">
                <form className="space-y-4" onSubmit={handleSubmit(updatepass)}>
                    <h2 className="text-2xl font-bold text-center text-red-600">Forgot Password</h2>
                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-2 font-bold">Email:</label>
                        <input
                            type="text"
                            id="email"
                            {...register("email", {
                                required: "Email is Required!!",
                            })}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                        {errors.email && <p className="mt-1 text-red-600">{errors.email.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block mb-2 font-bold">Enter new Password:</label>
                        <input
                            type="password"
                            id="password"
                            {...register("password", {
                                required: "Password is Required!!",
                            })}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                        {errors.password && <p className="mt-1 text-red-600">{errors.password.message}</p>}
                    </div>
                    <button
                        type="submit"
                        id="checkmail"
                        className="w-full p-2 text-center text-white bg-blue-500 rounded-md cursor-pointer hover:bg-blue-600"
                    >
                        Click Here
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgetPass;