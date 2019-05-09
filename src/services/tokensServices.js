import client from "../restClient";

export const getNetworkJoinable = tokens => {
  const addressList = tokens.map(token => token.address);
  return new Promise((resolve, reject) =>
    client
      .get("/api/v1/channelsLumino", {
        params: {
          token_addresses: addressList.join()
        }
      })
      .then(response => {
        for (let joinInfo of response.data) {
          const token = tokens.find(t => t.address === joinInfo.token_address);
          if (token) {
            token.joineable = joinInfo.can_join;
          }
        }
        return resolve(tokens);
      })
      .catch(error => {
        console.log(JSON.stringify(error));
        return reject(null);
      })
  );
};
