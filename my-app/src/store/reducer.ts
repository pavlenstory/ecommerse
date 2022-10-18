import { Action, MainReducerState } from "../interfaces";

const reducer = (state: MainReducerState, action: Action): MainReducerState => {
    const { type, payload } = action;
    switch (type) {
        case 'SET_MAIN_STATE':
            return { ...state, ...payload }
        default:
            return state
    }
}

export default reducer