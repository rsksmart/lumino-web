import { fromWei } from "../../lib/amounts/weiConversion";
import {BigNumber} from "bignumber.js";
import client from '../../restClient/coingecko';

export const setPriceInfo = async (tokens) => {
    const coinIds = await getCoinIds();
    const tokensById = tokens.filter(token => coinIds[token.symbol.toLowerCase()] )
        .reduce((result, token) => {
            result[coinIds[token.symbol.toLowerCase()]] = token;
            return result;
        }, {});
    const tokenIds = Object.keys(tokensById);
    const prices = await getPriceInfos(tokenIds, ['usd']);
    tokenIds.forEach((tokenId) => {
        const price = prices[tokenId];
        const token = tokensById[tokenId];
        if (price.usd) {
            token.unitPrice = price.usd;
            token.unitPriceCurrency = 'USD';
            let decimalBalance = fromWei(token.balance.toString(), token.decimals);
            let bigNumberBalanceDecimal = new BigNumber(decimalBalance);
            let totalWithCurrency = bigNumberBalanceDecimal.multipliedBy(Number(price.usd));
            token.totalWithCurrency = totalWithCurrency.toString();
        }
    });
    return tokens;
};

const getCoinIds = async () => {
    try {
        const response = await client.get("/coins/list");
        return response.data.reduce((result, coin) => {
            result[coin.symbol] = coin.id
            return result;
        }, {});
    } catch(error) {
        console.log(JSON.stringify(error));
        return {};
    }
}

const getPriceInfos = async (tokenIds, vsCurrencies) => {
    const priceInfos = await Promise.all(tokenIds.map((tokenId) => getPriceInfo(tokenId, vsCurrencies)));
    const mergedPriceInfos = {}
    for (let i = 0; i < tokenIds.length; i++) {
        mergedPriceInfos[tokenIds[i]] = priceInfos[i];
    }
    return mergedPriceInfos;
}

const getPriceInfo = async (tokenId, vsCurrencies) => {
    try {
        const {data} = await client.get(`/coins/${tokenId}/tickers`);
        if (data.tickers && data.tickers.length > 0) {
            // The first entry is the most trustworthy
            const priceInfo = {}
            vsCurrencies.forEach(currency => {
                const currencyPrice = data.tickers[0].converted_last[currency];
                if (currencyPrice) {
                    priceInfo[currency] = currencyPrice;
                }
            });
            return priceInfo;
        }
        return {};
    } catch(error) {
        console.log(JSON.stringify(error));
        return {};
    }
}
