import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import instance from "../../base-axios/useAxios";
import Cookies from "js-cookie";
import NotificationsIcon from '@mui/icons-material/Notifications';
import { removeuser, unvisible, emptycart, removerestid, removedriverid } from "../../redux-toolkit/Reducers/actions";
import { State_user, State } from "../../Types/reducer";
import { NotificationData } from "../../Types/notification";
import { handleError } from "../../utils/util";
import socket from "../../utils/socket";

interface HeaderProps {
    onProfileClick: () => void;
}
const Header: React.FC<HeaderProps> = ({ onProfileClick }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const data = useSelector((state: State_user) => state.user);
    const cart = useSelector((state: State) => state.cart);
    const driver_id = useSelector((state: State) => state.IDs.DriverID);
    const [notification, setNotification] = useState<NotificationData[]>([])
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const res = await instance.get(`/notification/fetchnotification/${driver_id}`);
                const newNotifications = res.data.data.driver_notification.filter(
                    (item: NotificationData) => !item.isRead && !item.isDeleted
                );
                setNotification(newNotifications);
            } catch (error) {
                handleError(error, dispatch, navigate);
            }
        };

        fetchNotifications();
    }, [driver_id, dispatch, navigate]);


    useEffect(() => {
        socket.on('newNotification', (data) => {
            setNotification((prev) => [...prev, data]);
        });

        return () => {
            socket.off('newNotification');
        };
    }, []);

    const handleLogout = async () => {
        if ((cart.cart).length !== 0) {
            await instance({
                url: `cart/addtocart/${data.id}`,
                method: "POST",
                data: cart.cart,
            });
        }
        dispatch(removeuser());
        dispatch(unvisible());
        dispatch(emptycart());
        dispatch(removerestid());
        dispatch(removedriverid())
        Cookies.remove("token")
        navigate("/")
    };
    return (
        <div className="w-full mx-auto rounded-lg text-primary relative top-0 left-0">
            <div className="bg-red-600 p-7">
                <p className="text-white text-xl font-bold flex items-center space-x-2 ml-40 -mt-6">
                    <Link to="/">
                        <img
                            id="miimg"
                            src={require("./logo.png")}
                            alt="none"
                            className="w-16 h-12 rounded-full"
                        />
                        Foodies
                    </Link>
                </p>
                <ul className="flex items-center justify-end space-x-8 mt-[-50px] font-bold text-lg text-white mr-32">
                    {(data.role_id === 3) && <li className="relative" >
                        <Link to="/notifications">
                            <NotificationsIcon className="text-white text-3xl" />
                            <p className="absolute top-[-8px] left-[10px] rounded-full  bg-gray-950 px-2 text-sm">{notification.length}</p>
                        </Link>
                    </li>}
                    {data.id ? (
                        <li onClick={handleLogout}>
                            <Link to="">
                                <LogoutIcon className="text-white text-3xl" /> Logout
                            </Link>
                        </li>
                    ) : (
                        <li>
                            <Link to="/login">
                                <LoginIcon className="text-white text-3xl" /> Login
                            </Link>
                        </li>
                    )}
                    {((!data.id) || data.role_id === 4) && <li className="relative" >
                        <Link to="/cart">
                            <ShoppingCartIcon className="text-white text-3xl" />
                            <p className="absolute top-[-10px] left-[20px]">{cart.totalItems || 0}</p>
                        </Link>
                    </li>}

                    {data.id && (
                        <li className="relative" onClick={onProfileClick}>
                            <Link to="">
                                <AccountCircleIcon className="text-white text-3xl" />
                                <p className="absolute top-0 left-6">{data.fname}</p>
                            </Link>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Header;