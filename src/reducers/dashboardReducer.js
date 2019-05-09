import createReducer from './helpers/reducerHelper'
import {DASHBOAR_DATA_SUCCEED} from "../actions/types";

const initialState = {
    dashboardData: [],
    tokens:[]
};

const dashboardReducer = createReducer(initialState,
    {
        [DASHBOAR_DATA_SUCCEED](state, action) {
            return {
                ...state,
                dashboardData:  action.data.allData,
                tokens:  action.data.tokens,
            };
        },
    });


export default dashboardReducer;