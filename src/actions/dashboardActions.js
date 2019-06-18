import client from "../restClient";
import { DASHBOAR_DATA_SUCCEED } from "./types";
import { retrieveTokensData } from "../lib/tokens/tokensLogic";
import {setPriceInfo} from "../services/external/exchangeServices";

export const pollDashboard =  () => async (dispatch, getState) => {
    //var response = await getTokenApp();
    new Promise((resolve, reject) =>
        client
            .get(`/api/v1/dashboardLumino`)
            .then(async response => {
                let tokens = await retrieveTokensData(response.data.data_token);
                tokens = await setPriceInfo(tokens);
                return resolve(dispatch(pollSucceed(response.data, tokens)));
            })
            .catch(error => {
                console.log(JSON.stringify(error));
            })
    );

}

const pollSucceed = (allData, tokens) => ({
    type: DASHBOAR_DATA_SUCCEED,
    data: {
        allData: allData,
        tokens: tokens
    }
});
