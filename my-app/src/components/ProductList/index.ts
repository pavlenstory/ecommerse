import { connect } from "react-redux";
import { MainReducerState } from "../../interfaces";
import { Dispatch } from 'redux';
import { fetchProductList } from "../../store/actions";
import { ThunkDispatch } from "redux-thunk";
import { ProductList } from "./ProductList";

const mapStateToProps = (state: Partial<MainReducerState>): Partial<MainReducerState> => {
    const { products, sortBy } = state
    return {
        ...state,
        products: products?.sort((a, b) => sortBy === 'LOW' ? +a.price - +b.price : +b.price - +a.price)
    }
}
const mapDispatchToProps = (dispatch: Dispatch & ThunkDispatch<any, any, any>) => ({
    fetchProductList: () => dispatch(fetchProductList())
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)