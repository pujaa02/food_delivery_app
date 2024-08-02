import React, { useEffect, useState } from "react";
import instance from "../../../base-axios/useAxios";
import { handleError } from "../../../utils/util";
import { Menu } from "../../../Types/menu";
import { RegData } from "../../../Types/register";
import { RestaurantAttributes } from "../../../Types/restaurant";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [users, setUsers] = useState<RegData[]>([]);
    const [restaurants, setRestaurants] = useState<RestaurantAttributes[]>([]);
    const [menus, setMenus] = useState<Menu[]>([])

    const fetchdata = async () => {
        await instance({
            url: `user/getalldata`,
            method: "GET",
        }).then((res) => {
            setUsers(res.data.users);
            setRestaurants(res.data.restaurants);
            setMenus(res.data.menus)
        }).catch((error) => {
            handleError(error, dispatch, navigate);
        })
    }
    useEffect(() => {
        fetchdata();
    }, []);
    return (
        <div>
            <div className="flex flex-row h-44 justify-center gap-10 mt-28">
                <div className="bg-white rounded-xl shadow-lg px-6 py-4 w-4/12">
                    <p className="relative text-sky-600 text-3xl text-center">Total Users <span className="absolute top-16 right-36 text-red-600 font-bold text-5xl">{users.length}</span></p>
                </div>
                <div className="bg-white rounded-xl shadow-lg mx-6 px-6 py-4 w-4/12">
                    <p className="relative text-sky-600 text-3xl text-center"> Total Restaurants <span className="absolute top-16 right-36 text-red-600 font-bold text-5xl">{restaurants.length}</span></p>
                </div>
            </div>
            <div className="flex flex-row h-44 justify-center gap-10 mt-14">
                <div className="bg-white rounded-xl shadow-lg px-6 py-4 w-4/12">
                    <p className="relative text-sky-600 text-3xl text-center">Total MenuItems <span className="absolute top-16 right-36 text-red-600 font-bold text-5xl">{menus.length}</span></p>
                </div>
            </div>
        </div>
    );
}

export default Home;