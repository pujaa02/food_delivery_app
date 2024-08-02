/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch } from 'redux';
import Cookies from "js-cookie";
import { NavigateFunction } from 'react-router-dom';
import { removeuser, unvisible, removerestid, emptycart, removedriverid } from '../redux-toolkit/Reducers/actions';

export const handleError = (error: any, dispatch: Dispatch, navigate: NavigateFunction) => {
    if (error.message === "Request failed with status code 404") {
        dispatch(removeuser());
        dispatch(unvisible());
        dispatch(emptycart());
        dispatch(removerestid());
        dispatch(removedriverid())
        Cookies.remove("token")
        navigate("/login");
    } else {
        console.error("Unhandled error:", error);
    }
};
