import { combineReducers } from "redux";

import * as actionTypes from "../actions/types";

const radixReducer = (state = 16, action) => {
    switch (action.type) {
        case actionTypes.SET_RADIX:
            return action.payload;
        default:
            return state;
    }
};

const decimalNumberReducer = (state = "", action) => {
    switch (action.type) {
        case actionTypes.SET_DECIMAL_NUMBER:
            return action.payload;
        default:
            return state;
    }
};

const radixNumberReducer = (state = "", action) => {
    switch (action.type) {
        case actionTypes.SET_RADIX_NUMBER:
            return action.payload;
        default:
            return state;
    }
};

export default combineReducers({
    radix: radixReducer,
    decimalNumber: decimalNumberReducer,
    radixNumber: radixNumberReducer,
});
