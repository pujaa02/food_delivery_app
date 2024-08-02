/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import instance from "../../../base-axios/useAxios";
import { State_restaurant } from "../../../Types/reducer";
import { MenuAttributes } from "../../../Types/menu";
import toast from "react-hot-toast";
import { REACT_APP_IMAGEURL } from "../../../config";
import { handleError } from "../../../utils/util";
import { visible, addmenuid } from "../../../redux-toolkit/Reducers/actions";
import Header from "../../../components/Header/Header";
import UpdateMenu from "../updatemenu/UpdateMenu";

const Rest_Home: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const data = useSelector((state: State_restaurant) => state.restaurant);
    const [menuitem, setMenuItem] = useState<MenuAttributes[]>([]);
    const [defaultComponent, setDefaultComponent] = useState("profile");
    const [updatemenumodal, setupdatemenumodal] = React.useState<boolean>(false);


    const fetchallmenu = async () => {
        await instance({
            url: `menu/fetchmenubyrestaurant/${data.id}`,
            method: "GET",
        })
            .then((res) => {
                setMenuItem(res.data.result)
            })
            .catch((error) => {
                handleError(error, dispatch, navigate);
            })
    };
    useEffect(() => {
        fetchallmenu();
    }, []);
    const handleProfileClick = () => {
        dispatch(visible())
        setDefaultComponent("profile");
        navigate("/dashboard/profile");
    };
    const removeitem = async (id: number) => {
        await instance({
            url: `menu/removemenu/${id}`,
            method: "GET",
        })
            .then((res) => {
                if (res.data.message === 'success') {
                    toast.success("Item Removed Succesfully");
                    fetchallmenu();
                }
            })
            .catch((error) => {
                handleError(error, dispatch, navigate);
            })

    }
    const updatemenu = (id: number) => {
        dispatch(addmenuid(id))
        setupdatemenumodal(true)
    }
    return (
        <div>
            <Header onProfileClick={handleProfileClick} />
            <div className="my-5 mx-52" >
                <h1 className="text-4xl text-center text-slate-500 font-bold underline decoration-2 ">Your All Menu Items</h1>
                <div className="row_menu">
                    {menuitem.map((data: MenuAttributes) => (
                        <div className="col_menu mb-5" key={data.id}>
                            <div className="cart_img">
                                <img src={`${REACT_APP_IMAGEURL}` + data.image} alt="none" />
                            </div>
                            <div className="p-2 ml-7">
                                <p className="text-truncate text-xl text-center  text-slate-500">{data.item_name}</p>
                                <p className="text-truncate text-center text-slate-500">Rs.{data.price}</p>
                            </div>
                            <div className="flex align-middle justify-center gap-5">
                                <p className="bg-lime-700 p-2 rounded-lg font-bold" onClick={() => updatemenu(data.id)}>Update</p>
                                <p className="bg-red-400 p-2 rounded-lg font-bold" onClick={() => removeitem(data.id)}>Remove</p>
                            </div>
                        </div>
                    ))}
                    {updatemenumodal && <UpdateMenu show={updatemenumodal} onHide={() => setupdatemenumodal(false)} />}
                </div>
            </div>
        </div>
    );
};

export default Rest_Home;