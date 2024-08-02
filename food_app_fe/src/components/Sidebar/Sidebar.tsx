import React from "react";
import { useSelector } from "react-redux";
import { State_user } from "../../Types/reducer";
import { SidebarProps } from "../../Types/props";
import PersonIcon from '@mui/icons-material/Person';
import StorefrontIcon from '@mui/icons-material/Storefront';
import ShopIcon from '@mui/icons-material/Shop';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import ChatIcon from '@mui/icons-material/Chat';

const Sidebar: React.FC<SidebarProps> = ({ onNavigate }) => {
    const data = useSelector((state: State_user) => state.user);
    return (
        <div className="sidebar_container w-96 h-lvh bg-zinc-100">
            <div className="pt-4">
                <h1 className="ml-32 text-3xl font-bold">{data.fname}</h1>
                <div className="ml-5 flex items-center mt-3 middleheader">
                    <h3 className="pr-5 text-xl">{data.email}</h3>
                    <h3 className="text-xl">{data.phone}</h3>
                </div>
            </div>
            <ul className="mt-20 ml-32 content-heading">
                <li className="text-xl mt-3 cursor-pointer text-gray-700 hover:text-black" onClick={() => onNavigate("profile")}><PersonIcon />Profile</li>
                {data.role_id === 4 && <li className="text-xl mt-3 cursor-pointer text-gray-700 hover:text-black" onClick={() => onNavigate("order")}><ShopIcon />Order</li>}
                {data.role_id === 2 && <li className="text-xl mt-3 cursor-pointer text-gray-700 hover:text-black" onClick={() => onNavigate("restaurant")}><StorefrontIcon />Restaurant</li>}
                {data.role_id === 2 && <li className="text-xl mt-3 cursor-pointer text-gray-700 hover:text-black" onClick={() => onNavigate("menu")}><RestaurantMenuIcon />Add Menu</li>}
                {data.role_id === 2 && <li className="text-xl mt-3 cursor-pointer text-gray-700 hover:text-black" onClick={() => onNavigate("menubulk")}><RestaurantMenuIcon />Import Menu items data</li>}

                {(data.role_id === 2 || data.role_id === 1) && <li className="text-xl mt-3 cursor-pointer text-gray-700 hover:text-black" onClick={() => onNavigate("chat")}><ChatIcon />Chat</li>}

            </ul>
        </div>
    );
};

export default Sidebar;