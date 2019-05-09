import {RSK_RPC_ENDPOINT} from "../rsk/rskConstants";
import {isDevelopment} from "../../utils/utils";
let Resolver = require('@rnsdomains/rns-sdk-js');
let  Web3= require('web3');

export const RNS_PUBLIC_RESOLVER_ADDRESS = "0x4efd25e3d348f8f25a14fb7655fba6f72edfe93a";
export const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";

export const RSN_PUBLIC_RESOLVER_ABI = JSON.stringify([ { "inputs": [ { "name": "rnsAddr", "type": "address" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "payable": false, "stateMutability": "nonpayable", "type": "fallback" }, { "constant": true, "inputs": [ { "name": "node", "type": "bytes32" }, { "name": "kind", "type": "bytes32" } ], "name": "has", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "interfaceID", "type": "bytes4" } ], "name": "supportsInterface", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "pure", "type": "function" }, { "constant": true, "inputs": [ { "name": "node", "type": "bytes32" } ], "name": "addr", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "node", "type": "bytes32" }, { "name": "addrValue", "type": "address" } ], "name": "setAddr", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "node", "type": "bytes32" } ], "name": "content", "outputs": [ { "name": "", "type": "bytes32" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "node", "type": "bytes32" }, { "name": "hash", "type": "bytes32" } ], "name": "setContent", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" } ])

export default class RNS{

    static getRnsResolver = () =>{
        const web3provider=new Web3.providers.HttpProvider(RSK_RPC_ENDPOINT);
        return new Resolver(web3provider, RNS_PUBLIC_RESOLVER_ADDRESS, RSN_PUBLIC_RESOLVER_ABI);
    }

    static getRnsDomainValue = () =>{
        if(isDevelopment()){
            return process.env.REACT_APP_NODE_RNS_DOMAIN
        }else{
            return window.rnsDomain
        }
    }

}
