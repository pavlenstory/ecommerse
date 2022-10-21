export type SortType = 'HIGH' | 'LOW'
export type ActionType = 'SET_MAIN_STATE'

export interface Action {
    type: ActionType
    payload: Partial<MainReducerState>
}

export interface CartElement {
    id: number
    quantity: number
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
    cart: CartElement[]
}

export type cartBodyElement = CartElement & Product