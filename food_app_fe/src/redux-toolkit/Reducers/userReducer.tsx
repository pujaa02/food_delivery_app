import { State_user, Reducer_Action } from "../../Types/reducer";

const initialState: State_user = {
    user: { bd: new Date() },
}

export default function userReducer(state = initialState, action: Reducer_Action) {
    switch (action.type) {
        case 'ADD_USER':
            return state.user = action.payload.user;
        case 'REMOVE_USER':
            return state.user = { bd: new Date() };
        default:
            return state
    }
}

