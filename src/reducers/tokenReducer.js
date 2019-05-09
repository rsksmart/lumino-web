import createReducer from './helpers/reducerHelper'
import {JOIN_SUCCEED, LEAVE_SUCCEED, POLL_TOKENS} from "../actions/types";

const initialState = {
    tokens: [],
    tokensChanged: false,
    recentlyLeftAddress: "",
    recentlyJoinedAddress: "",
    leavingNetwork: {},
    joiningNetwork: {}
};

const tokenReducer = createReducer(initialState,
    {
        [POLL_TOKENS](state, action) {
            return {
                ...state,
                 tokens:  action.data.tokens,
                tokensChanged: action.data.tokensChanged
            };
        },
        [LEAVE_SUCCEED](state, action){
            // TODO this should make something with the address, i.e delete it from the leaving ones
            return {
                ...state,
                recentlyLeftAddress:  action.data.tokenAddress,
            };
        },
        [JOIN_SUCCEED](state, action){
            // TODO this should make something with the address, i.e delete it from the joining ones
            return {
                ...state,
                recentlyJoinedAddress:  action.data.tokenAddress,
            };
        }
    });


export default tokenReducer;
