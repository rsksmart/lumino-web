import client from "../restClient/index";

export const getChannel = (tokenAddress, partnerAddress) => {
    return new Promise((resolve, reject) =>
        client
            .get(`/api/v1/channels/` + tokenAddress + "/" + partnerAddress)
            .then(response => {
                return resolve(response.data);
            })
            .catch(error => {
                console.log(JSON.stringify(error));
                return reject(null);
            })
    );
};
