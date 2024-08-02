import { Reducer_Action, State_ID } from "../../Types/reducer";

const initialState: State_ID = {
    DriverID: 0,
    OrderID: 0
};

export default function IDReducer(state = initialState, action: Reducer_Action) {
    switch (action.type) {
        case 'ADD_DRIVER_ID':
            return { ...state, DriverID: action.payload.id };
        case 'REMOVE_DRIVER_ID':
            return { ...state, DriverID: 0 };
            case 'ADD_ORDER_ID':
            return { ...state, OrderID: action.payload.id };
        case 'REMOVE_ORDER_ID':
            return { ...state, OrderID: 0 };
        default:
            return state;
    }
}