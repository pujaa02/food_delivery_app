import React from "react";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import StorefrontRoundedIcon from '@mui/icons-material/StorefrontRounded';
import RestaurantMenuRoundedIcon from '@mui/icons-material/RestaurantMenuRounded';
import StarsRoundedIcon from '@mui/icons-material/StarsRounded';
import { SidebarProps } from "../../../Types/props";


const Sidebar_Admin: React.FC<SidebarProps> = ({ onNavigate }) => {
    return (
        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 h-[calc(80vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
            <nav className="flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal text-gray-700">
                <div role="button" className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none" onClick={() => onNavigate("")}>
                    <div className="grid place-items-center mr-4">
                        <HomeRoundedIcon className="h-5 w-5" />
                    </div>
                    Home
                </div>
                <div role="button" className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none" onClick={() => onNavigate("users")}>
                    <div className="grid place-items-center mr-4">
                        <PersonRoundedIcon className="h-5 w-5" />
                    </div>List Of Users
                </div>
                <div role="button" className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none" onClick={() => onNavigate("restaurants")}>
                    <div className="grid place-items-center mr-4">
                        <StorefrontRoundedIcon className="h-5 w-5" />
                    </div>List Of Restaurants
                </div>
                <div role="button" className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none" onClick={() => onNavigate("menus")}>
                    <div className="grid place-items-center mr-4">
                        <RestaurantMenuRoundedIcon className="h-5 w-5" />
                    </div>List Of Menu
                </div>
                <div role="button" className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none" onClick={() => onNavigate("ratings")}>
                    <div className="grid place-items-center mr-4">
                        <StarsRoundedIcon className="h-5 w-5" />
                    </div>Ratings
                </div>
            </nav>
        </div>

    );
}

export default Sidebar_Admin;