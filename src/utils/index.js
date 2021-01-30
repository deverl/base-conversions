import { digits } from "../constants";

export const decimalToRadix = (decimalNumber, radix = 16) => {
    if (radix < 2 || radix > 36) {
        return "";
    }
    let result = "";
    while (decimalNumber > 0) {
        let m = decimalNumber % radix;
        let c = digits[m];
        result = c + result;
        decimalNumber = (decimalNumber / radix) | 0;
    }
    return result;
};
