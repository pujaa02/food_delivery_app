import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ChatAttributes, ChatData } from "../../../Types/chat";
import "./chat.css";
import instance from "../../../base-axios/useAxios";
import { RestaurantAverage } from "../../../Types/restaurant";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleError } from "../../../utils/util";
import { State } from "../../../Types/reducer";
import { addrestid } from "../../../redux-toolkit/Reducers/actions";
import socket from "../../../utils/socket";

const AdminChat: React.FC = () => {
    const receiverID = useSelector((state: State) => state.restID.receiverID);
    const [restaurant, setRestaurant] = useState<RestaurantAverage[]>([]);
    const [chat, setChat] = useState<ChatAttributes[]>([])
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit, reset } = useForm<ChatData>();

    const fetchallchat = async (id: number) => {
        await instance({
            url: "/chat/getchatdata",
            method: "GET",
        })
            .then((res) => {
                const result = res.data.result.filter((obj: ChatAttributes) => obj.sender_id === id || obj.receiver_id === id);
                setChat(result);
            })
            .catch((error) => {
                handleError(error, dispatch, navigate);
            });
    }

    const fetchall = async () => {
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

    useEffect(() => {
        if (receiverID) {
            fetchallchat(receiverID);
        }
    }, [receiverID]);

    useEffect(() => {
        socket.on('message', (msg: ChatAttributes) => {
            setChat((prevChat) => [...prevChat, msg]);
        });
        return () => {
            socket.off('message');
        };
    }, []);

    const changeID = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const item = restaurant.find(obj => obj.restaurant_id === Number(event.target.value));
        if (item) {
            dispatch(addrestid(item.user_id));
        }
    }

    const handleinput: SubmitHandler<ChatData> = async (data: ChatData) => {
        if (data.message.trim()) {
            const newMessage: ChatAttributes = {
                sender_id: 1,
                receiver_id: receiverID,
                message: data.message,
                timestamp: new Date().toISOString(),
            };
            socket.emit('message', newMessage);
            await instance({
                url: `chat/addchatdata`,
                method: 'POST',
                data: newMessage,
            }).then(() => {
                // setChat((prevChat) => [...prevChat, newMessage]);
                reset();
            }).catch((error) => {
                handleError(error, dispatch, navigate);
            });
        }
    }

    return (
        <div>
            <div className="absolute ml-3 top-44">
                <label htmlFor="restaurant_id" className="text-xl font-bold text-slate-600">Select Restaurant to open the Chat</label>
                <div className="form-group flex">
                    <select id="restaurant_id" className="form-control" {...register("restaurant_id", {
                        required: true,
                        onChange: (e) => { changeID(e) }
                    })}>
                        <option value="">Select Restaurant</option>
                        {restaurant.map((data: RestaurantAverage) => (
                            <option key={data.restaurant_id} value={data.restaurant_id}>{data.restaurant_name}</option>
                        ))}
                    </select>
                </div>
            </div>
            {receiverID && (
                <div className="chat_container">
                    <div className="upper_container">
                        <div className="p-3">
                            {chat.map((obj: ChatAttributes) => (
                                <div key={obj.id}>
                                    <p className={`${(obj.sender_id === 1) ? "sendermsg" : "receivermsg"}`}>{obj.message}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bottom_container">
                        <form onSubmit={handleSubmit(handleinput)} className="space-y-6">
                            <div className="form-group flex">
                                <input
                                    type="text"
                                    placeholder="message..."
                                    id="message"
                                    {...register("message", {})}
                                    className="ml-2 mt-2 py-2 px-2"
                                />
                                <button className="sendbtn" type="submit">Send</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminChat;