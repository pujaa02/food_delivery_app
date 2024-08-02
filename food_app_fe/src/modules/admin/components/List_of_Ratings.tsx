import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import instance from "../../../base-axios/useAxios";
import { RatingData } from "../../../Types/admin";
import { handleError } from "../../../utils/util";

const Rating: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [rating, setRating] = useState<RatingData[]>([]);

    const [totalPages, setTotalPages] = useState(0);
    const [searchval, setSearchval] = useState("");
    const fetchUsers = async (page: number) => {
        const url: string = searchval ? `admin/getratings/${page}/${searchval}` : `admin/getratings/${page}/nothing`;
        const method: string = 'GET';
        await instance({
            url,
            method,
        }).then((res) => {
            setTotalPages(res.data.data.totalPages);
            setRating(res.data.data.rating);
        }).catch((error) => {
            handleError(error, dispatch, navigate);
        })
    };

    useEffect(() => {
        fetchUsers(currentPage);
    }, [currentPage, searchval]);


    const handlechange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchval(event.target.value)
    }
    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    }

    return (
        <div>
            <p className=" text-center font-bold text-3xl text-red-600 ">Ratings</p>
            <div className="mt-5 flex justify-center">
                <input type="text" className="p-2 w-96 border rounded-md" onChange={handlechange} />
            </div>
            <div className="flex justify-center">
                <table className=" table-auto mt-10 max-w-[1000px] w-[700px] border-collapse border border-slate-500 rounded">
                    <thead>
                        <tr className="bg-lightgray">
                            <th className="w-1/4 py-4 px-6 text-center text-gray-600 font-bold border border-slate-600">
                                Id
                            </th>
                            <th className="w-1/4 py-4 px-6 text-center text-gray-600 font-bold border border-slate-600">
                                UserID
                            </th>
                            <th className="w-1/4 py-4 px-6 text-center text-gray-600 font-bold border border-slate-600">
                                MenuID
                            </th>
                            <th className="w-1/4 py-4 px-24 text-center text-gray-600 font-bold border border-slate-600">
                                Content
                            </th>
                            <th className="w-1/4 py-4 px-6 text-center text-gray-600 font-bold border border-slate-600">
                                Rating
                            </th>
                            {/* <th className="w-1/4 py-4 px-6 text-center text-gray-600 font-bold border border-slate-600">
                            Delete
                        </th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {rating && rating.map((data: RatingData) => (
                            <tr key={data.id} className="p-4">
                                <td className="py-6 px-6 border border-slate-700 text-center">{data.id}</td>
                                <td className="py-6 px-6 border border-slate-700 text-center">{data.user_id}</td>
                                <td className="py-6 px-6 border border-slate-700 text-center">{data.menu_id}</td>
                                <td className="py-4 px-6 border border-slate-700 text-center">{data.content}</td>
                                <td className="py-4 px-6 border border-slate-700 text-center">{data.rating}</td>
                                {/* <td className="py-4 px-6 border border-slate-700 text-center"><DeleteRoundedIcon className="text-red-600" /></td> */}
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>

            <div className="flex justify-center mt-5">
                <button onClick={handlePrevPage} disabled={currentPage === 1} className="text-3xl">&lt;</button>
                <p className="text-2xl mt-0.5 mx-2">{currentPage}</p>
                <button onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="text-3xl">&gt;</button>
            </div>
        </div>
    );
}

export default Rating;