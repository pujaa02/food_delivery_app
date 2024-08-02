/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import "./home.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import StarIcon from '@mui/icons-material/Star';
import instance from "../../../base-axios/useAxios";
import Header from "../../../components/Header/Header";
import { REACT_APP_IMAGEURL } from "../../../config";
import { visible, add_to_cart, remove_menu, add_menu } from "../../../redux-toolkit/Reducers/actions";
import { Menu } from "../../../Types/menu";
import { RestaurantAverage } from "../../../Types/restaurant";

const Home: React.FC = () => {
    const [menu, setMenu] = useState<Menu[]>([]);
    const [restaurant, setRestaurant] = useState<RestaurantAverage[]>([]);
    const dispatch = useDispatch();
    const [defaultComponent, setDefaultComponent] = useState("profile");
    const navigate = useNavigate();

    const fetchall = async () => {
        await instance({
            url: "home/findmenuall",
            method: "GET",
        })
            .then((res) => {
                setMenu(res.data.result);
            })
            .catch((e) => {
                console.log(e);
            });
        await instance({
            url: "/home/toprestaurant",
            method: "GET",
        })
            .then((res) => {
                setRestaurant(res.data.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };
    useEffect(() => {
        fetchall();
    }, []);

    const handleProfileClick = () => {
        dispatch(visible())
        setDefaultComponent("profile");
        navigate("/dashboard/profile");
    };

    const additem = async (data: Menu) => {
        dispatch(add_to_cart(data));
    }

    const getsameproduct = async (str: string, name: string | number) => {
        const url = (str === "menu") ? `/home/fetchmenuitems/${name}` : `/home/getrestaurantallmenu/${name}`;
        await instance({
            url,
            method: "GET",
        })
            .then((res) => {
                dispatch(remove_menu());
                const result: Menu[] = res.data.result;
                result.map((obj) => dispatch(add_menu(obj)))
                navigate("/data")
            })
            .catch((e) => {
                console.log(e);
            });
    }

    return (
        <div className="h-[calc(100vh-2rem)] overflow-y-scroll">
            <Header onProfileClick={handleProfileClick} />
            <div className="menu_container">
                <div className="main_container_home">
                    <div className="row_menu">
                        <h2 className="text-green-600 text-2xl underline underline-offset-8 mt-6 ml-28">
                            What&apos;s on your mind?
                        </h2>
                    </div>
                    <div className="product_row ml-24">
                        {menu.map((data: Menu) => (
                            <div className="product_col" key={data.menu_id} onClick={() => getsameproduct("menu", data.item_name)}>
                                <div className="product_card">
                                    <div className="cart_img">
                                        <img src={`${REACT_APP_IMAGEURL}` + data.image} alt="none" />
                                    </div>
                                    <div>
                                        <p className="text-truncate title ml-20 ">{data.item_name}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="mt-8 ml-24">
                <div className="row_menu">
                    <h2 className="text-green-600 text-2xl underline underline-offset-8 mt-6 ms-24">
                        Top Restaurant
                    </h2>
                </div>
                <div className="main_container_home">
                    <div className="product_row">
                        {restaurant.map((data: RestaurantAverage) => (
                            <div className="product_col" key={data.restaurant_id} onClick={() => getsameproduct("restaurant", data.restaurant_id)}>
                                <div className="product_card">
                                    <div className="cart_img">
                                        <img src={`${REACT_APP_IMAGEURL}` + data.restaurant_image} alt="none" />
                                    </div>
                                    <div className="mt-2 ml-5">
                                        {data.average_rating ? <p className="rate font-bold">{(data.average_rating)?.toFixed(1)}<StarIcon className="rateicon" /></p> : <p className="mt-4"></p>}
                                        <p className="text-truncate title">{data.restaurant_name}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-8 ml-24">
                <div className="row_menu">
                    <h2 className="text-green-600 text-2xl underline underline-offset-8 mt-6 ms-24">
                        All items
                    </h2>
                </div>
                <div className="container_menu ml-16">
                    <div className="row_menu">
                        {menu.map((data: Menu) => (
                            <div className="col_menu mb-5" key={data.menu_id}>
                                <div className="">
                                    <div className="cart_img_all_menu">
                                        <img className="" src={`${REACT_APP_IMAGEURL}` + data.image} alt="none" />
                                    </div>
                                    <div className="content">
                                        {data.avgrate && <p className="rate">{data.avgrate}<StarIcon className="rateicon" /></p>}
                                        <p className="text-truncate title">{data.item_name}</p>
                                        <p className="font-bold text-red-400">{data.name}</p>
                                        <p className="price">
                                            Price : <span className="spantag">Rs.{data.price}</span>
                                        </p>
                                    </div>
                                    <div className="flex_bottom">
                                        <p className="overlay" onClick={() => additem(data)}>Add item</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;