import {BigNumber} from "bignumber.js";

export const toWei = (amount, decimals) => {
    if (isNaN(parseFloat(amount))) {
        return 0;
    }
    amount = new BigNumber(amount);
    return amount.multipliedBy(Math.pow(10, decimals)).toString(10);
};

export const fromWei = (amount, decimals) => {
    if (isNaN(parseFloat(amount))) {
        return 0;
    }
    amount = new BigNumber(amount);
    return amount.dividedBy(Math.pow(10, decimals)).toString(10);;
};
