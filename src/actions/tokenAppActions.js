import * as Cookies from 'js-cookie'
import client from "../restClient";

export const getTokenApp = async action => {
    return await client
        .post(`/api/v1/tokenAction`, {
                action: action
            }
        ).then(response => {
            console.log(response);
            Cookies.set('token', response.data.token);
        })
        .catch(error => {
            console.log(JSON.stringify(error));
        })
}
