import { Action, MainReducerState } from "../interfaces";

const cart = localStorage.getItem('cart')

export const initState: MainReducerState = {
    loading: false,
    products: [],
    searchString: '',
    sortBy: 'LOW',
    currency: 'USD',
    cart: cart ? JSON.parse(cart) : []
}

const reducer = (state: MainReducerState = initState, action: Action): MainReducerState => {
    const { type, payload } = action;
    switch (type) {
        case 'SET_MAIN_STATE':
            return { ...state, ...payload }
        default:
            return state
    }
}

export default reducer