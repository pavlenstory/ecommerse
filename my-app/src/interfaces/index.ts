export type SortType = 'HIGH' | 'LOW'
export type CurrencyType = '$' | '€'
export type ActionType = 'SET_MAIN_STATE'

export interface Action {
    type: ActionType
    payload: MainReducerState
}

export interface CartElement {
    id: number
    quanity: number
}

export interface Product {
    readonly id: number
    readonly image: string
    readonly title: string
    readonly description: string
    readonly price: string
}

export interface MainReducerState {
    loading: boolean
    products: Product[]
    searchString: string
    sortBy: SortType
    currency: CurrencyType
    cart: CartElement[]
}

export { }