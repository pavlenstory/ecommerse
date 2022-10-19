export type SortType = 'HIGH' | 'LOW'
export type CurrencyType = 'USD' | 'EUR'
export type ActionType = 'SET_MAIN_STATE'

export interface Action {
    type: ActionType
    payload: Partial<MainReducerState>
}

export interface CartElement {
    id: number
    quanity: number
}

export interface Product {
    readonly id: number
    readonly category: string
    readonly image: string
    readonly title: string
    readonly description: string
    readonly price: string
    readonly rating: { count: number, rate: number }
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