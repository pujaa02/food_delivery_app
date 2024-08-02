/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import "./cart.css"
import Grid from "@mui/material/Grid";
import { State } from "../../../Types/reducer";
import Header from "../../../components/Header/Header";
import { visible, decrement, increment, remove_from_cart } from "../../../redux-toolkit/Reducers/actions";
import { Menu } from "../../../Types/menu";

const Cart: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [defaultComponent, setDefaultComponent] = useState("profile");
    const cart = useSelector((state: State) => state.cart);

    const handleProfileClick = () => {
        dispatch(visible())
        setDefaultComponent("profile");
        navigate("/dashboard/profile");
    };
    if (cart.cart.length === 0) {
        return (
            <Grid container sx={{ color: 'text.primary' }}>
                <div className="home_container">
                    <Header onProfileClick={handleProfileClick} />
                    <div className="empty_cart">
                        <p id="head_cart">Your Cart is Now Empty!!</p>
                        <img id="empty_cart" src={require(`./empty_cart.gif`)} alt="none" />
                    </div>
                </div>
            </Grid>
        )
    }
    return (
        <div>
            <Header onProfileClick={handleProfileClick} />
            <div className="w-full">
                <header>
                    <h2 className="mt-16 flex items-center justify-center font-bold text-3xl">Your Cart({cart.totalItems})</h2>
                </header>
                <div className="cart_container">
                    <table id="cart_item">
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(cart.cart).map((data: Menu, index: number) => (
                                <tr key={index}>
                                    <td className="flex">
                                        <img id="logo" src={`http://192.168.10.119:8000/` + data.image} alt="none" />
                                        <p className="ml-5">{data.item_name}</p>
                                    </td>
                                    <td>Rs.{data.price}</td>
                                    <td>
                                        <table className="minitable">
                                            <tbody>
                                                <tr>
                                                    <td className="minitable_td" onClick={() => dispatch(decrement(data.menu_id))}><RemoveIcon /></td>
                                                    <td className="minitable_td" width={50}>{data.count}</td>
                                                    <td className="minitable_td" onClick={() => dispatch(increment(data.menu_id))}><AddIcon /></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                    <td>Rs.{data.price * data.count}</td>
                                    <td onClick={() => dispatch(remove_from_cart(data.menu_id))}>
                                        <DeleteForeverIcon className="material_icon" />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="subtotal_container">
                        <p className="subtotal"><b >SubTotal : </b> Rs.{cart.total} </p>
                    </div>
                    <p className="checkout_btn" onClick={() => navigate("/payment")}>Proceed to Buy ({cart.totalItems} items) </p>
                </div>
            </div>
        </div>
    );
};

export default Cart;