import { ThunkDispatch } from "redux-thunk"
import axios from "axios";
import { Action, MainReducerState } from "../interfaces"

export const setMainState = (payload: Partial<MainReducerState>): Action => ({
    type: 'SET_MAIN_STATE',
    payload
})

export const fetchProductList = () => async (
    dispatch: ThunkDispatch<MainReducerState, any, Action>,
    getState: () => MainReducerState): Promise<void> => {
    try {
        dispatch(setMainState({ loading: true }))
        const result = await axios.get(`https://fakestoreapi.com/products`);
        dispatch(setMainState({ products: result.data }))
    } catch (e) {
        console.error(e)
    } finally {
        dispatch(setMainState({ loading: false }))
    }
}