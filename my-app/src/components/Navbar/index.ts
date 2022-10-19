import { connect } from "react-redux";
import { MainReducerState } from "../../interfaces";
import { Dispatch } from 'redux';
import { setMainState } from "../../store/actions";
import { Navbar } from "./Navbar";

const mapStateToProps = (state: MainReducerState) => ({ ...state })
const mapDispatchToProps = (dispatch: Dispatch) => ({
    setMainState: (payload: Partial<MainReducerState>) => dispatch(setMainState(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)