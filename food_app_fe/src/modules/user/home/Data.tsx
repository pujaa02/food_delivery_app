/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import StarIcon from '@mui/icons-material/Star';
import Header from "../../../components/Header/Header";
import { visible, add_to_cart } from "../../../redux-toolkit/Reducers/actions";
import { Menu } from "../../../Types/menu";
import { State } from "../../../Types/reducer";

const Data: React.FC = () => {
    const dispatch = useDispatch();
    const data = useSelector((state: State) => state.menu.menu);
    const [defaultComponent, setDefaultComponent] = useState("profile");
    const navigate = useNavigate();
    const handleProfileClick = () => {
        dispatch(visible())
        setDefaultComponent("profile");
        navigate("/dashboard/profile");
    };

    return (
        <div>
            <Header onProfileClick={handleProfileClick} />
            <div className="container_menu ml-16">
                <div className="row_menu">
                    {data.map((data: Menu) => (
                        <div className="col_menu mb-5" key={data.menu_id}>
                            <div className="">
                                <div className="cart_img_all_menu">
                                    <img className="relative " src={`${process.env.REACT_APP_IMAGEURL}` + data.image} alt="none" />
                                </div>
                                <div className="content">
                                    {data.avgrate && <p className="rate">{data.avgrate}<StarIcon className="rateicon" /></p>}
                                    <p className="text-truncate title">{data.item_name}</p>
                                    <p className="font-bold text-red-400">{data.name}</p>
                                    <p className="price">
                                        Price : <span className="spantag">Rs.{data.price}</span>
                                    </p>
                                </div>
                            </div>
                            <div className="absolute -bottom-6 flex_bottom">
                                <p className="ml-32 text-center font-bold w-20 bg-slate-300 p-2 text-teal-600 rounded-lg" onClick={() => dispatch(add_to_cart(data))}>Add</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Data;
