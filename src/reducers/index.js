import { combineReducers } from 'redux';
import channelReducer from "./channelReducer.js";
import tabReducer from "./tabReducer.js";
import tokenReducer from "./tokenReducer";
import paymentReducer from "./paymentsReducer";
import dashboardReducer from "./dashboardReducer";
import searchReducer from "./searchReducer";
import taskStatusReducer from "./taskStatusReducer";

const rootReducer = combineReducers({
    state: (state = {}) => state,
    channelReducer: channelReducer,
    tabReducer: tabReducer,
    tokenReducer: tokenReducer,
    paymentReducer: paymentReducer,
    dashboardReducer: dashboardReducer,
    searchReducer: searchReducer,
    taskStatusReducer: taskStatusReducer
});

export default rootReducer;
