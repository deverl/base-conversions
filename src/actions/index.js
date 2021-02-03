import * as actionTypes from "./types";

export const setRadix = radix => dispatch => {
    // console.log("setRadixNumber: radix = " + JSON.stringify(radix));
    dispatch({ type: actionTypes.SET_RADIX, payload: radix });
};

export const setDecimalNumber = number => dispatch => {
    // console.log("setRadixNumber: number = " + JSON.stringify(number));
    dispatch({ type: actionTypes.SET_DECIMAL_NUMBER, payload: number });
};

export const setRadixNumber = number => dispatch => {
    dispatch({ type: actionTypes.SET_RADIX_NUMBER, payload: number });
};
