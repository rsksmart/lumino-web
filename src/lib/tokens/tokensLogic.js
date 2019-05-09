import {RSK_RPC_ENDPOINT} from "../rsk/rskConstants";
import Web3 from "web3";
import {tokenAbi} from "./raidenERC20StandardAbi";
import ERC20Token from "./models/ERC20Token";
import {USER_ADDRESS} from "../../config/applicationConstants";


export const retrieveTokensData =async (tokenAddressses) => {
    const web3 = new Web3(new Web3.providers.HttpProvider(RSK_RPC_ENDPOINT));
    let tokensData= [];
    for (const address of tokenAddressses) {
        let tokenData =await retrieveTokenData(address,web3);
        tokensData.push(tokenData);
    }
    return tokensData;
};

export const retrieveTokenData = async (address, web3) =>{
    let contract = new web3.eth.Contract(tokenAbi, address);
    const name = await contract.methods.name.call({gasPrice: 21000});
    const symbol = await contract.methods.symbol.call({gasPrice: 21000});
    const decimals = await contract.methods.decimals.call({gasPrice: 21000});
    const balance = await contract.methods.balanceOf( USER_ADDRESS).call({gasPrice: 21000});

    return new ERC20Token(address, name,symbol,decimals, balance);
};

export const getDecimals = (address, tokens)=>{
    const token= tokens.find((t)=> t.address === address);
    if(token){
        return token.decimals;
    }else{
        return null;
    }
};

export const getName = (address, tokens)=>{
    const token= tokens.find((t)=> t.address === address);
    if(token){
        return token.name;
    }else{
        return null;
    }
};
