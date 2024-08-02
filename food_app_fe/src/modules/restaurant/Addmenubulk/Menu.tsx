/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import * as XLSX from 'xlsx';
import React, { ChangeEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import instance from "../../../base-axios/useAxios";
import restID from "../../../redux-toolkit/Reducers/restID";
import { handleError } from "../../../utils/util";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { State_user } from "../../../Types/reducer";
import { RestaurantAttributes } from "../../../Types/restaurant";

interface SheetData {
    item_name: string;
    description?: string;
    price: number;
}

const Menu: React.FC = () => {
    const user = useSelector((state: State_user) => state.user);
    const [restID, setRestID] = useState<number>();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [excelData, setExcelData] = useState<SheetData[]>([]);

    const fetchall = async () => {
        await instance({
            url: `restaurant/getrestaurantdata/${user.id}`,
            method: "GET",
        })
            .then((res) => {
                const result: RestaurantAttributes = res.data.result[0]
                setRestID(result.id)
            })
            .catch((error) => {
                handleError(error, dispatch, navigate);
            });
    };
    useEffect(() => {
        fetchall();
    }, []);


    const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const file: File | null = event.target.files?.[0] || null;
        const reader = new FileReader();

        reader.onload = (event) => {
            const workbook: XLSX.WorkBook = XLSX.read(event?.target?.result, { type: 'binary' });
            const sheetName: string = workbook.SheetNames[0];
            const sheet: XLSX.WorkSheet = workbook.Sheets[sheetName];
            const sheetData: SheetData[] = XLSX.utils.sheet_to_json(sheet);

            setExcelData(sheetData);
        };
        if (file) {
            reader.readAsBinaryString(file);
        }
    };

    const handleSubmit = async () => {

        await instance({
            url: `menu/addbulkdata/${restID}`,
            method: 'POST',
            data: excelData,
            headers: {
                "Content-Type": 'application/json',
            },
        }).then((res) => {
            if (res.data.message === "Successfully add all items") {
                toast.success("Successfully Added");
            } else {
                toast.error("Please Enter Valid Data");
            }
        }).catch((error) => {
            handleError(error, dispatch, navigate);
        })
    };
    return (
        <div className="absolute top-56 right-96  bg-slate-400 p-12 rounded-lg">

            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload file</label>
            <input onChange={handleFileUpload} className="block  text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" />

            <button onClick={handleSubmit} className="mt-4 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Upload Data</button>
        </div>
    );
}

export default Menu;