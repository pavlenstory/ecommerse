import { connect } from "react-redux";
import { MainReducerState } from "../../interfaces";
import { Dispatch } from 'redux';
import ProductList from "./ProductList";

const mapStateToProps = (state: MainReducerState): Partial<MainReducerState> => ({ ...state })
const mapDispatchToProps = (dispatch: Dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)