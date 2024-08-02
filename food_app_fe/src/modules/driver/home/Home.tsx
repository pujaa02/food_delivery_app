/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";
import Header from "../../../components/Header/Header";
import { adddriverid, visible } from "../../../redux-toolkit/Reducers/actions";
import instance from "../../../base-axios/useAxios";
import { handleError } from "../../../utils/util";
import { State, State_user } from "../../../Types/reducer";
import { DashboardData } from "../../../Types/driver";
import socket from "../../../utils/socket";

const Home: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state: State_user) => state.user);
    const driver_id = useSelector((state: State) => state.IDs.DriverID);
    const [dashboarddata, setDashboardData] = useState<DashboardData[]>([]);

    useEffect(() => {
        if (user.role_id === 3) {
            socket.emit("joinRoom", "drivers");
        }
        return () => {
            socket.emit("leaveRoom", "drivers");
        };
    }, [user.role_id]);

    useEffect(() => {
        fetchdashboardData();
        setdriver();
    })

    const setdriver = async () => {
        await instance({
            url: `/driver/fetchdriver/${user.id}`,
            method: "GET",
        }).then((res) => {
            dispatch(adddriverid(res.data.data.result.id))
        }).catch((error) => {
            handleError(error, dispatch, navigate);
        });
    }

    const fetchdashboardData = async () => {
        await instance({
            url: `/driver/fetchdashboarddata/${driver_id}`,
            method: "GET",
        }).then((res) => {
            setDashboardData(res.data.data.result)
        }).catch((error) => {
            handleError(error, dispatch, navigate);
        });
    }

    const deliveredorder = async (order_id: number) => {
        await instance({
            url: `/order/updateorderstatus/${order_id}`,
            method: "GET",
        }).then((res) => {
            if (res.data.message === "Successfully updated status") {
                fetchdashboardData()
            }
        }).catch((error) => {
            handleError(error, dispatch, navigate);
        });
    }


    const [defaultComponent, setDefaultComponent] = useState("profile");
    const handleProfileClick = () => {
        dispatch(visible())
        setDefaultComponent("profile");
        navigate("/dashboard/profile");
    };

    if (dashboarddata.length === 0) {
        return (
            <div className="">
                <Header onProfileClick={handleProfileClick} />
                <div className="min-h-screen">
                    <div className="flex flex-row pt-24 px-10 pb-4 justify-center">
                        <div className="w-9/12">
                            <div className="flex flex-row h-[calc(80vh-2rem)]">
                                <div className="bg-no-repeat bg-slate-100 border border-slate-100 rounded-xl w-full mr-2 p-6" >
                                    <p className="text-center text-4xl font-bold ... italic text-slate-600 ">Welcome to Dashboard</p>
                                    <div className="mt-24 flex justify-center">
                                        <img className="w-1/4 h-1/4 rounded-full" src={require(`./dashboard.png`)} alt="no image found" />
                                    </div>
                                    <p className="text-center text-xl text-red-600">No any Data Found</p>
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
                                <p className="text-center text-4xl font-bold ... italic text-slate-600 ">Welcome to Dashboard</p>

                                <div className="flex justify-center overflow-y-scroll h-[600px]">
                                    <table className=" mt-10 max-w-[1000px] w-[900px]  border-collapse border border-slate-500 rounded">
                                        <thead>
                                            <tr className="bg-lightgray">
                                                <th className="w-1/4 py-4 px-6 text-center text-gray-600 font-bold border border-slate-600">
                                                    Index
                                                </th>
                                                <th className="w-1/4 py-4 px-6 text-center text-gray-600 font-bold border border-slate-600">
                                                    OrderID
                                                </th>
                                                <th className="w-1/4 py-4 px-6 text-center text-gray-600 font-bold border border-slate-600">
                                                    Status
                                                </th>
                                                <th className="w-2/4 py-4 px-6 text-center text-gray-600 font-bold border border-slate-600">
                                                    Action(Delivered?)
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {dashboarddata.map((data: DashboardData, index) => (
                                                <tr key={index} className="p-4">
                                                    <td className="py-4 px-6 border border-slate-700 text-center">{index + 1}</td>
                                                    <td className="py-4 px-6 border border-slate-700 text-center">{data.order_id}</td>
                                                    {data.delivery_status === "Pending" ? <td className="py-4 px-6 border border-slate-700 text-center text-red-500">Pending</td> : <td className="py-4 px-6 border border-slate-700 text-center  text-lime-700">Delivered</td>}
                                                    {data.delivery_status === "Pending" && <td className=" border border-slate-700 text-center "><button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={() => deliveredorder(data.order_id)}>Order Delivered</button></td>}
                                                </tr>
                                            ))}
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

export default Home;