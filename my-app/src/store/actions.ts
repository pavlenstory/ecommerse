import { Action, MainReducerState } from "../interfaces"

export const setMainState = (payload: MainReducerState): Action => ({
    type: 'SET_MAIN_STATE',
    payload
})