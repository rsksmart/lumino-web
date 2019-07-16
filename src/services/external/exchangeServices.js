import axios from "axios";
import { fromWei } from "../../lib/amounts/weiConversion";
import {BigNumber} from "bignumber.js";

const client = axios.create({
    baseURL: "https://demo4277690.mockable.io"
});

export const setPriceInfo = async (tokens) => {
    const nameList = tokens.map(token => token.name);
    const prices = await getPriceInfo(nameList.join(","), 'usd');

    tokens.forEach((token) => {
        prices.forEach((price) => {
            if (token.name === price.id){
                token['unitPrice'] = price.usd;
                if (price['usd']) {
                    token['unitPriceCurrency'] = 'USD';
                    let decimalBalance = fromWei(token.balance.toString(), token.decimals);
                    let bigNumberBalanceDecimal = new BigNumber(decimalBalance);
                    let totalWithCurrency = bigNumberBalanceDecimal.multipliedBy(Number(price.usd));
                    token['totalWithCurrency'] = totalWithCurrency.toString();
                    token['dayAgoPercentageVariationPrice'] = '2.36';
                }

            }
        })
    });

    return tokens;
};

const  getPriceInfo = async (tokenNames, vs_currencies) => {
    return new Promise((resolve, reject) =>
        client
            .get(`/price` , {
                params: {
                    ids: tokenNames,
                    vs_currencies: vs_currencies
                }
            })
            .then(response => {
                return resolve(response.data);
            })
            .catch(error => {
                console.log(JSON.stringify(error));
                return reject(null);
            })
    );
}
