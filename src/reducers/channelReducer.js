import createReducer from './helpers/reducerHelper'
import {
    CLOSE_CHANNELS_SUCCEED,
    DEPOSIT_CHANNELS_SUCCEED,
    POLL_CHANNELS,
    INIT_CHANNELS,
    PUT_CHANNELS_SUCCEED
} from "../actions/types";

const initialState = {
    channels: [],
    channelsChanged: false
};

const channelReducer = createReducer(initialState,
    {
        [INIT_CHANNELS](state, action) {
            //console.log("dispatched poll")
            return {
                ...state,
                channels:  action.data.channels,
                channelsChanged: false
            };
        },
        [POLL_CHANNELS](state, action) {
            //console.log("dispatched poll")
            return {
                ...state,
                channels:  action.data.channels,
                channelsChanged: false
            };
        },
        [CLOSE_CHANNELS_SUCCEED](state, action) {
            console.log("Closed");
            return {
                ...state,
                channels:  action.data.channels,
                channelsChanged: false
            };
        },
        [PUT_CHANNELS_SUCCEED](state, action) {
            return {
                ...state,
                channels: [ ...state.channels, action.data.channels],
                channelsChanged: true
            };
        },
        [DEPOSIT_CHANNELS_SUCCEED](state, action) {
            console.log("Closed");
            return {
                ...state,
                channels:  action.data.channels,
                channelsChanged: false
            };
        },


    });


export default channelReducer;
