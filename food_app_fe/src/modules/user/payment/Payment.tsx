/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { State, State_user, } from "../../../Types/reducer";
import { Menu } from "../../../Types/menu";
import { useNavigate } from "react-router-dom";
import SendIcon from '@mui/icons-material/Send';
import Header from "../../../components/Header/Header";
import { visible } from "../../../redux-toolkit/Reducers/actions";
import toast from "react-hot-toast";
import { handleError } from "../../../utils/util";
import instance from "../../../base-axios/useAxios";
import "./payment.css";

const Payment: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [defaultComponent, setDefaultComponent] = useState("profile");
    const user = useSelector((state: State_user) => state.user);
    const cart = useSelector((state: State) => state.cart);
    const [address, setAddress] = useState<string>("");
    const [phone, setPhone] = useState<string>("");

    const changeaddress = (event: ChangeEvent<HTMLInputElement>) => {
        setAddress(event.target.value);
    }

    const changenumber = (event: ChangeEvent<HTMLInputElement>) => {
        setPhone(event.target.value);
    }

    const payment = async () => {
        if (address && phone) {
            await instance({
                url: `order/addorder/${user.id}`,
                method: "POST",
                data: { cart, address, phone }
            }).then((res) => {
                if (res.data.message === "Successfully Order placed") {
                    navigate("/dashboard/order");
                }
            }).catch((error) => {
                handleError(error, dispatch, navigate);
            })
        } else {
            toast.error("Please fill the data First!!")
        }
    }
    const handleProfileClick = () => {
        dispatch(visible())
        setDefaultComponent("profile");
        navigate("/dashboard/profile");
    };
    if (cart.cart.length === 0) {
        return (
            <div className="order-container">
                <div className="p-5 ">
                    <p className="text-center text-4xl font-bold ... italic text-slate-600">No Order Here at Now</p>
                </div>
                <div className="mt-10 ml-16 p-5">
                    <p className="text-xl"><SendIcon className="mr-2" />Please Select Item first!!</p>
                    <p className=" mt-5 ml-16 bg-slate-500 p-3 w-36 text-center text-xl text-slate-100 font-bold" onClick={() => navigate("/")}>Add Item</p>
                </div>
            </div>
        )
    }
    return (
        <div>
            <Header onProfileClick={handleProfileClick} />
            <div className="order-container">
                <div className="p-5">
                    <p className="text-center text-4xl font-bold ... italic text-slate-600">Order Now</p>
                </div>
                <div className="wishlist_container">
                    <div className="h-[calc(50vh-2rem)] overflow-y-scroll">
                        {cart.cart.map((data: Menu, index: number) => (
                            <div className="cart_wishlist" key={index}>
                                <div className="flex justify-center items-center gap-x-9 mt-4">
                                    <img className="h-32 w-40 rounded-xl" src={`http://192.168.10.119:8000/` + data.image} alt="none" />
                                    <div className="">
                                        <p className="text-slate-600 font-bold text-xl">{data.item_name}</p>
                                        <div className="">
                                            <p className=""><b>Price : </b>${data.price}</p>
                                            <p className=""><b>Total Items : </b>{data.count}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <hr className="mt-5  ml-28 w-4/5 h-1.5 bg-black" />
                    <div className="mt-3 float-right mr-28">
                        <p className="text-xl"><b>Price : </b> ${cart.total}</p>
                        <p className="text-xl"><b>Delivery : </b> ${(cart.totalItems) * 15}</p>
                        <p className="text-xl"><b>Total : </b> ${(cart.total) + ((cart.totalItems) * 15)}</p>
                    </div>
                    <div className="mt-28 ml-32">
                        <label htmlFor="large-input" className="block mt-2 text-sm font-medium text-red-500">Add Address</label>
                        <input type="text" id="large-input" className="mt-2 block w-4/4 p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-5000 dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={changeaddress} />
                        <label htmlFor="large-input" className="block mt-2 text-sm font-medium text-red-500">Mobile Number</label>
                        <input type="text" id="large-input" className="mt-2 block w-4/4 p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-5000 dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={changenumber} />
                    </div>
                    <div className="back_home">
                        <p onClick={() => navigate("/cart")}>Back to Cart</p>
                    </div>
                    <div className="payment_btn">
                        <p onClick={() => payment()}>Go to Payment</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;