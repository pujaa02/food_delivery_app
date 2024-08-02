import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { State_user } from "../../../Types/reducer";
import { useNavigate } from "react-router-dom";
import SendIcon from '@mui/icons-material/Send';
import instance from "../../../base-axios/useAxios";
import { handleError } from "../../../utils/util";
import { order } from "../../../Types/order";
import socket from "../../../utils/socket";

const Order: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state: State_user) => state.user);
    const [orderData, setOrderData] = useState<order[]>([])
    const getuserorderdetail = async () => {
        await instance({
            url: `order/getorderdetail/${user.id}`,
            method: "GET",
        }).then((res) => {
            if (res.data.message === "Successfully get order Data") {
                socket.emit('paymentMade', res.data.data.finalresult);
                setOrderData(res.data.data.finalresult);
            }
        }).catch((error) => {
            handleError(error, dispatch, navigate);
        })
    }
    useEffect(() => {
        getuserorderdetail();
    }, [])


    if (orderData.length === 0) {
        return (
            <div className="position">
                <div className="p-5 ">
                    <p className="text-center text-4xl font-bold ... italic text-slate-600">No Order Here at Now</p>
                </div>
                <div className="mt-10 ml-16 p-5">
                    <p className="text-xl"><SendIcon className="mr-2" />Please Order Some Item first!!</p>
                    <p className=" mt-5 ml-16 bg-slate-500 p-3 w-56 text-center text-xl text-slate-100 font-bold" onClick={() => navigate("/")}>Go for Order</p>
                </div>
            </div>
        )
    }
    return (
        <div className="position">
            <div className="p-5">
                <p className="text-center text-4xl font-bold ... italic text-slate-600">Your All Orders</p>
            </div>
            <div className="container  h-[700px] overflow-y-scroll ">
                <table className="table-auto mt-10 max-w-[1000px] w-[900px] border-collapse border border-slate-500 rounded">
                    <thead>
                        <tr className="bg-lightgray">
                            <th className="w-1/4 py-3 px-6 text-center text-gray-600 font-bold border border-slate-600">
                                OrderId
                            </th>
                            <th className="w-1/4 py-3 px-6 text-center text-gray-600 font-bold border border-slate-600">
                                Items
                            </th>
                            <th className="w-1/4 py-3 px-6 text-center text-gray-600 font-bold border border-slate-600">
                                Total Amount
                            </th>
                            <th className="w-1/4 py-3 px-6 text-center text-gray-600 font-bold border border-slate-600">
                                Date
                            </th>
                            <th className="w-1/4 py-3 px-6 text-center text-gray-600 font-bold border border-slate-600">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderData && orderData.map((data: order, index) => (
                            <tr key={data.order_id} className="p-4">
                                <td className="py-6 px-6 border border-slate-700 text-center">{index + 1}</td>
                                <td className="py-6 px-6 border border-slate-700 text-center">{data.item_name}</td>
                                <td className="py-6 px-6 border border-slate-700 text-center">{data.total_amount}</td>
                                <td className="py-4 px-6 border border-slate-700 text-center">{`${new Date(data.date).toLocaleDateString()}`}</td>
                                {data.delivery_status === "Success" ? <td className="py-4 px-6 border border-slate-700 text-center text-lime-700">{data.delivery_status}</td> : <td className="py-4 px-6 border border-slate-700 text-center  text-red-700 ">Pending</td>}
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Order;