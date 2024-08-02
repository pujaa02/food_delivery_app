import React from "react";
import { LoginData } from "../../Types/login";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import instance from "../../base-axios/useAxios";
import { useDispatch } from "react-redux";
import { format } from "date-fns/format";
import { Menu } from "../../Types/menu";
import { RestaurantAttributes } from "../../Types/restaurant";
import { adduser, new_cart, addrest } from "../../redux-toolkit/Reducers/actions";
const Login: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginData>();

    const handlelogin = async (data: LoginData) => {
        await instance({
            url: "login/",
            method: "POST",
            data: data,
        }).then(async (res) => {
            if (res.data.msg === "Success") {
                const userdata = { ...res.data.user, bd: format(new Date(res.data.user.bd), 'yyyy-MM-dd') }
                dispatch(adduser(userdata))
                if (userdata.role_id === 4) {
                    await instance({
                        url: `cart/getcarddata/${userdata.id}`,
                        method: "GET",
                    }).then((res) => {
                        if (res.data.message === "success") {
                            (res.data.result).forEach((element: Menu) => {
                                dispatch(new_cart(element))
                            });
                        }
                    });
                }
                if (userdata.role_id === 2) {
                    await instance({
                        url: `restaurant/getrestaurantdata/${userdata.id}`,
                        method: "GET",
                    })
                        .then((res) => {
                            const result: RestaurantAttributes = res.data.result[0];
                            dispatch(addrest(result))

                        })
                        .catch((e) => {
                            console.log(e);
                        });
                }
                toast.success("Successfully Login");
                navigate("/");
            } else {
                toast.error("Please Enter Valid Data");
            }
        });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="container mx-auto p-6 max-w-md bg-white border-4 border-blue-600 rounded-lg">
                <form className="space-y-4" onSubmit={handleSubmit(handlelogin)}>
                    <h2 className="text-2xl font-bold text-center text-red-600">Login</h2>
                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-2 font-bold">
                            Email:
                        </label>
                        <input
                            type="text"
                            id="email"
                            {...register("email", {
                                required: "Email is Required!!",
                            })}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                        {errors.email && (
                            <p className="mt-1 text-red-600">{errors.email.message}</p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block mb-2 font-bold">
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
                            <p className="mt-1 text-red-600">{errors.password.message}</p>
                        )}
                    </div>
                    <div className="flex items-center justify-center mt-4 space-x-4">
                        <p
                            id="frgtpass"
                            onClick={() => navigate("/forgetpassword")}
                            className="w-40 p-2 text-center text-white bg-blue-500 rounded-md cursor-pointer hover:bg-blue-600"
                        >
                            Forget Password
                        </p>
                        <button
                            type="submit"
                            id="loginbtn"
                            className="w-20 p-2 text-center text-white bg-blue-500 rounded-md cursor-pointer hover:bg-blue-600"
                        >
                            Login
                        </button>
                    </div>
                    <div className="mt-4 text-center">
                        <p>
                            Don&apos;t  have an account?{" "}
                            <Link to="/register" className="text-blue-500 underline">
                                Register
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;