import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ChatAttributes, ChatData } from "../../../Types/chat";
import "../../admin/chat/chat.css"
import instance from "../../../base-axios/useAxios";
import { handleError } from "../../../utils/util";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { State_user } from "../../../Types/reducer";
import { RegData } from "../../../Types/register";
import socket from "../../../utils/socket";

const Chat: React.FC = () => {
    const user: RegData = useSelector((state: State_user) => state.user);
    const [chat, setChat] = useState<ChatAttributes[]>([])
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit, reset } = useForm<ChatData>();

    const fetchallchat = async () => {
        await instance({
            url: "/chat/getchatdata",
            method: "GET",
        })
            .then((res) => {
                const result: ChatAttributes[] = (res.data.result).filter((obj: ChatAttributes) => {
                    return (obj.receiver_id === user.id || obj.sender_id === user.id)
                })
                setChat(result)
            })
            .catch((error) => {
                handleError(error, dispatch, navigate);
            });
    }
    useEffect(() => {
        fetchallchat();
    }, []);

    useEffect(() => {
        socket.on('message', (msg: ChatAttributes) => {
            setChat((prevChat) => [...prevChat, msg]);
        })
        return () => {
            socket.off('message')
        }
    }, [])

    const handleinput: SubmitHandler<ChatData> = async (data: ChatData) => {
        if (data.message.trim()) {
            const newMessage: ChatAttributes = {
                sender_id: user.id,
                receiver_id: 1,
                message: data.message,
                timestamp: new Date().toISOString(),
            }
            socket.emit('message', newMessage);
            await instance({
                url: `chat/addchatdata`,
                method: 'POST',
                data: newMessage,
            }).then(() => {
                reset();
            })
                .catch((error) => {
                    handleError(error, dispatch, navigate);
                });
        }
    }
    return (
        <div className="chat_container">
            <div className="upper_container">
                <div className="p-3">
                    {chat.map((obj: ChatAttributes) => (
                        <div key={obj.id}>
                            <p className={`${(obj.sender_id === user.id) ? "sendermsg" : "receivermsg"}`}>{obj.message}</p>
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
                            id="name"
                            {...register("message", {
                            })}
                            className="ml-2 mt-2 py-2 px-2"
                        />
                        <button className="sendbtn" type="submit">Send</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Chat;