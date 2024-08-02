/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar_Admin from "./Sidebar_Admin";
import { visible } from "../../../redux-toolkit/Reducers/actions";
import Header from "../../../components/Header/Header";
import instance from "../../../base-axios/useAxios";
import { State_user } from "../../../Types/reducer";


interface AdminHomeProps {
    defaultComponent: string;
}

const Admin_Home: React.FC = () => {
    const user = useSelector((state: State_user) => state.user);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getLoggedIn = async () => {
        await instance({
            url: `/auth/getLoggedIn`,
            method: "POST",
            data: user
        })
    }

    useEffect(() => {
        getLoggedIn()
    }, [])

    const handleNavigation = (path: string) => {
        navigate(`/admin/${path}`);
    };

    const [defaultComponent, setDefaultComponent] = useState("profile");
    const handleProfileClick = () => {
        dispatch(visible())
        setDefaultComponent("profile");
        navigate("/dashboard/profile");
    };

    return (
        <div className="">
            <Header onProfileClick={handleProfileClick} />
            <div className="min-h-screen">
                <div className="flex flex-row pt-24 px-10 pb-4">
                    <div className="w-2/12 ml-24 mr-6">
                        <Sidebar_Admin onNavigate={handleNavigation} />
                    </div>
                    <div className="w-8/12">
                        <div className="flex flex-row  h-[calc(80vh-2rem)]">
                            <div className="bg-no-repeat bg-slate-100 border border-slate-100 rounded-xl w-full mr-2 p-6" >
                                <Outlet />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Admin_Home;