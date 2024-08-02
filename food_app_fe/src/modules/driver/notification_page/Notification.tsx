/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/Header/Header";
import { addorderid, visible } from "../../../redux-toolkit/Reducers/actions";
import instance from "../../../base-axios/useAxios";
import { handleError } from "../../../utils/util";
import { State } from "../../../Types/reducer";
import { NotificationData } from "../../../Types/notification";
import Show from "../model/Show";

const Notification: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const driver_id = useSelector((state: State) => state.IDs.DriverID);
    const [oldnotification, setOldNotification] = useState<NotificationData[]>([]);
    const [newnotification, setNewNotification] = useState<NotificationData[]>([]);
    const [showmodal, setShowmodal] = useState<boolean>(false);

    const fetchnotification = async () => {
        await instance({
            url: `/notification/fetchnotification/${driver_id}`,
            method: "GET",
        }).then((res) => {
            const oldnotify = (res.data.data.driver_notification).filter((item: NotificationData) => {
                return item.isRead === true && item.isDeleted === true
            })
            const newnotify = (res.data.data.driver_notification).filter((item: NotificationData) => {
                return item.isRead === false && item.isDeleted === false
            })
            setOldNotification(oldnotify);
            setNewNotification(newnotify)
        }).catch((error) => {
            handleError(error, dispatch, navigate);
        });
    }

    useEffect(() => {
        fetchnotification();
    }, [])

    const [defaultComponent, setDefaultComponent] = useState("profile");
    const handleProfileClick = () => {
        dispatch(visible())
        setDefaultComponent("profile");
        navigate("/dashboard/profile");
    };

    const setOrderID = (id: number) => {
        dispatch(addorderid(id));
        setShowmodal(true);
    }

    const acceptorder = async (order_id: number) => {
        await instance({
            url: `/notification/acceptorder/${driver_id}/${order_id}`,
            method: "GET",
        }).then((res) => {
            if (res.data.data.message === "Successfully accepted") {
                navigate('/driver')
            }
        }).catch((error) => {
            handleError(error, dispatch, navigate);
        });
    }

    if (oldnotification.length === 0 && newnotification.length === 0) {
        return (
            <div className="">
                <Header onProfileClick={handleProfileClick} />
                <div className="min-h-screen">
                    <div className="flex flex-row pt-24 px-10 pb-4 justify-center">
                        <div className="w-9/12">
                            <div className="flex flex-row h-[calc(80vh-2rem)]">
                                <div className="bg-no-repeat bg-slate-100 border border-slate-100 rounded-xl w-full mr-2 p-6" >
                                    <p className="text-center text-4xl font-bold ... italic text-slate-600 ">Notifications</p>
                                    <div className="mt-24 flex justify-center">
                                        <img className="w-1/4 h-1/4 rounded-full" src={require(`./notify.jpg`)} alt="no image found" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
    return (
        <div className="">
            <Header onProfileClick={handleProfileClick} />
            <div className="min-h-screen">
                <div className="flex flex-row pt-24 px-10 pb-4 justify-center">
                    <div className="w-9/12">
                        <div className="flex flex-row h-[calc(80vh-2rem)]">
                            <div className="bg-no-repeat bg-slate-100 border border-slate-100 rounded-xl w-full mr-2 p-6" >
                                <p className="text-center text-4xl font-bold ... italic text-slate-600 ">Notifications</p>
                                <div className="flex justify-center overflow-y-scroll h-[600px]">
                                    <table className="table-auto mt-10 max-w-[1000px] w-[1000px]  border-collapse border border-slate-500 rounded">
                                        <thead>
                                            <tr className="bg-lightgray">
                                                <th className="w-1/4 py-4 px-6 text-center text-gray-600 font-bold border border-slate-600">
                                                    Index
                                                </th>
                                                <th className="w-1/4 py-4 px-6 text-center text-gray-600 font-bold border border-slate-600">
                                                    OrderID
                                                </th>
                                                <th className="w-2/4 py-4 px-6 text-center text-gray-600 font-bold border border-slate-600">
                                                    Address
                                                </th>
                                                <th className="w-1/4 py-4 px-6 text-center text-gray-600 font-bold border border-slate-600">
                                                    Phone
                                                </th>
                                                <th className="w-1/4 py-4 px-6 text-center text-gray-600 font-bold border border-slate-600">
                                                    More Detail About Order
                                                </th>
                                                <th className="w-1/4 py-4 px-6 text-center text-gray-600 font-bold border border-slate-600">
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {oldnotification && oldnotification.map((data: NotificationData, index) => (
                                                <tr key={index} className="p-4">
                                                    <td className="py-4 px-6 border border-slate-700 text-center">{index + 1}</td>
                                                    <td className="py-4 px-6 border border-slate-700 text-center">{data.order_id}</td>
                                                    <td className="py-4 px-6 border border-slate-700 text-center">{data.order.address}</td>
                                                    <td className="py-4 px-6 border border-slate-700 text-center">{data.order.phone}</td>
                                                    <td className="py-4 px-6 border border-slate-700 text-center"><button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={() => setOrderID(data.order_id)}>Show</button></td>
                                                    <td className="py-4 px-6 border border-slate-700 text-center"><p className=" text-white bg-green-700  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Accepted</p></td>

                                                </tr>
                                            ))}
                                            {newnotification && newnotification.map((data: NotificationData, index) => (
                                                <tr key={index} className="p-4">
                                                    <td className="py-4 px-6 border border-slate-700 text-center">{index + 1}</td>
                                                    <td className="py-4 px-6 border border-slate-700 text-center">{data.order_id}</td>
                                                    <td className="py-4 px-6 border border-slate-700 text-center">{data.order.address}</td>
                                                    <td className="py-4 px-6 border border-slate-700 text-center">{data.order.phone}</td>
                                                    <td className="py-4 px-6 border border-slate-700 text-center"><button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={() => setOrderID(data.order_id)}>Show</button></td>
                                                    <td className="py-4 px-6 border border-slate-700 text-center"><button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" onClick={() => acceptorder(data.order_id)}>Accept</button></td>

                                                </tr>
                                            ))}
                                            {showmodal && <Show show={showmodal} onHide={() => setShowmodal(false)} />}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Notification;