import createReducer from "./helpers/reducerHelper";
import { GET_PAYMENTS, PAYMENT_SUCCEED, POLL_PAYMENTS } from "../actions/types";

const initialState = {
  payments: []
};

const paymentReducer = createReducer(initialState, {
  [GET_PAYMENTS](state, action) {
    return {
      ...state,
      payments: action.data.payments
    };
  },
  [POLL_PAYMENTS](state, action) {
    return {
      ...state,
      payments: action.data.payments
    };
  },
  [PAYMENT_SUCCEED](state, action) {
    return {
      ...state,
      payments: [...state.payments, action.data.payments]
    };
  }
});

export default paymentReducer;
