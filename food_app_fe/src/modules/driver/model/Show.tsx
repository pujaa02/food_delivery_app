import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Props } from "../../../Types/props";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../../Types/reducer";
import instance from "../../../base-axios/useAxios";
import { handleError } from "../../../utils/util";
import { useNavigate } from "react-router-dom";
import { Ordermodal } from "../../../Types/order";

const Show: React.FC<Props> = (props: Props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const order_id = useSelector((state: State) => state.IDs.OrderID);
    const [orderdata, setOrderData] = useState<Ordermodal[]>([])

    const fetchorderData = async () => {
        await instance({
            url: `/notification/showorderdata/${order_id}`,
            method: "GET",
        })
            .then((res) => {
                setOrderData(res.data.data.result)
            })
            .catch((error) => {
                handleError(error, dispatch, navigate);
            });
    }

    useEffect(() => {
        fetchorderData();
    }, [])
    return (
        <Modal
            {...props}
            size="xl"
            aria-labelledby="example-custom-modal-styling-title"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-custom-modal-styling-title">
                    Order Details
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="flex justify-center">
                    <table className="mt-10  border-collapse border border-slate-500 rounded">
                        <thead>
                            <tr className="bg-lightgray">
                                <th className="w-1/4 py-4 px-6 text-center text-gray-600 font-bold border border-slate-600">
                                    Index
                                </th>
                                <th className="w-1/4 py-4 px-6 text-center text-gray-600 font-bold border border-slate-600">
                                    Item Name
                                </th>
                                <th className="w-1/4 py-4 px-6 text-center text-gray-600 font-bold border border-slate-600">
                                    Quantity
                                </th>
                                <th className="w-1/4 py-4 px-6 text-center text-gray-600 font-bold border border-slate-600">
                                    Restaurant
                                </th>
                                <th className="w-1/4 py-4 px-6 text-center text-gray-600 font-bold border border-slate-600">
                                    Address
                                </th>
                                <th className="w-1/4 py-4 px-6 text-center text-gray-600 font-bold border border-slate-600">
                                    Phone
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderdata.map((data: Ordermodal, index) => (
                                <tr key={index} className="p-4">
                                    <td className="py-4 px-6 border border-slate-700 text-center">{index + 1}</td>
                                    <td className="py-4 px-6 border border-slate-700 text-center">{data.item_name}</td>
                                    <td className="py-4 px-6 border border-slate-700 text-center">{data.count}</td>
                                    <td className="py-4 px-6 border border-slate-700 text-center">{data.restaurant}</td>
                                    <td className="py-4 px-6 border border-slate-700 text-center">{data.restaurant_address}</td>
                                    <td className="py-4 px-6 border border-slate-700 text-center">{data.restaurant_phone}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default Show;