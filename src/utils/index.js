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

// export const lastChar = s => {
//     if (typeof s !== "string") {
//         throw "Not a string";
//     }
//     return s[s.length - 1];
// };

export const digitToDecimal = s => {
    return digits.indexOf(s);
};

export const radixToDecimal = (radixNumber, radix = 16) => {
    if (radix < 2 || radix > 36) {
        throw new Error(`Radix (${radix}) is out of range [2..36]`);
    }
    let result = 0;
    let s = "" + radixNumber;
    let i = s.length - 1;
    let p = 0;
    while (i >= 0) {
        let c = s[i];
        let v = digitToDecimal(c.toUpperCase());
        result += v * radix ** p;
        i -= 1;
        p += 1;
    }
    return result;
};

export const hasNotes = steps => {
    if (typeof steps !== "object") {
        throw new Error("Steps is not an object");
    }

    return (
        steps.reduce((acc, step) => {
            if (step.notes) {
                acc += 1;
            }
            return acc;
        }, 0) > 0
    );
};
