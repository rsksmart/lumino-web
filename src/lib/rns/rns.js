import {RSK_RPC_ENDPOINT} from "../rsk/rskConstants";
import {isDevelopment} from "../../utils/utils";

let Resolver = require('@rnsdomains/rns-sdk-js');
let Web3 = require('web3');

export const RNS_PUBLIC_RESOLVER_ADDRESS = "0x4efd25e3d348f8f25a14fb7655fba6f72edfe93a";
export const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";

export const RSN_PUBLIC_RESOLVER_ABI = JSON.stringify([{
    "inputs": [{
        "name": "_rns",
        "type": "address"
    }, {"name": "_publicResolver", "type": "address"}],
    "payable": "false",
    "stateMutability": "nonpayable",
    "type": "constructor",
    "signature": "constructor"
}, {"payable": "false", "stateMutability": "nonpayable", "type": "fallback"}, {
    "anonymous": "false",
    "inputs": [{"indexed": "false", "name": "node", "type": "bytes32"}, {
        "indexed": "false",
        "name": "content",
        "type": "bytes32"
    }],
    "name": "ContentChanged",
    "type": "event",
    "signature": "0x0424b6fe0d9c3bdbece0e7879dc241bb0c22e900be8b6c168b4ee08bd9bf83bc"
}, {
    "anonymous": "false",
    "inputs": [{"indexed": "false", "name": "node", "type": "bytes32"}, {
        "indexed": "false",
        "name": "chain",
        "type": "bytes4"
    }, {"indexed": "false", "name": "metadata", "type": "bytes32"}],
    "name": "ChainMetadataChanged",
    "type": "event",
    "signature": "0x92c52f77ad49286096555eb922ca7a09249e8dd525cf58cd162fb1165686fad4"
}, {
    "anonymous": "false",
    "inputs": [{"indexed": true, "name": "node", "type": "bytes32"}, {
        "indexed": "false",
        "name": "chain",
        "type": "bytes4"
    }, {"indexed": "false", "name": "addr", "type": "string"}],
    "name": "ChainAddrChanged",
    "type": "event",
    "signature": "0x6a3e28813f2e2e5bcd0436779f8c5cb179ceadf0379291a818b9078e772b178d"
}, {
    "anonymous": "false",
    "inputs": [{"indexed": true, "name": "node", "type": "bytes32"}, {
        "indexed": "false",
        "name": "addr",
        "type": "address"
    }],
    "name": "AddrChanged",
    "type": "event",
    "signature": "0x52d7d861f09ab3d26239d492e8968629f95e9e318cf0b73bfddc441522a15fd2"
}, {
    "constant": true,
    "inputs": [{"name": "interfaceId", "type": "bytes4"}],
    "name": "supportsInterface",
    "outputs": [{"name": "", "type": "bool"}],
    "payable": "false",
    "stateMutability": "pure",
    "type": "function",
    "signature": "0x01ffc9a7"
}, {
    "constant": true,
    "inputs": [{"name": "node", "type": "bytes32"}],
    "name": "addr",
    "outputs": [{"name": "", "type": "address"}],
    "payable": "false",
    "stateMutability": "view",
    "type": "function",
    "signature": "0x3b3b57de"
}, {
    "constant": "false",
    "inputs": [{"name": "node", "type": "bytes32"}, {"name": "addrValue", "type": "address"}],
    "name": "setAddr",
    "outputs": [],
    "payable": "false",
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0xd5fa2b00"
}, {
    "constant": true,
    "inputs": [{"name": "node", "type": "bytes32"}],
    "name": "content",
    "outputs": [{"name": "", "type": "bytes32"}],
    "payable": "false",
    "stateMutability": "view",
    "type": "function",
    "signature": "0x2dff6941"
}, {
    "constant": "false",
    "inputs": [{"name": "node", "type": "bytes32"}, {"name": "contentValue", "type": "bytes32"}],
    "name": "setContent",
    "outputs": [],
    "payable": "false",
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0xc3d014d6"
}, {
    "constant": true,
    "inputs": [{"name": "node", "type": "bytes32"}, {"name": "chain", "type": "bytes4"}],
    "name": "chainAddr",
    "outputs": [{"name": "", "type": "string"}],
    "payable": "false",
    "stateMutability": "view",
    "type": "function",
    "signature": "0x8be4b5f6"
}, {
    "constant": "false",
    "inputs": [{"name": "node", "type": "bytes32"}, {"name": "chain", "type": "bytes4"}, {
        "name": "addrValue",
        "type": "string"
    }],
    "name": "setChainAddr",
    "outputs": [],
    "payable": "false",
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0xd278b400"
}, {
    "constant": true,
    "inputs": [{"name": "node", "type": "bytes32"}, {"name": "chain", "type": "bytes4"}],
    "name": "chainMetadata",
    "outputs": [{"name": "", "type": "bytes32"}],
    "payable": "false",
    "stateMutability": "view",
    "type": "function",
    "signature": "0xb34e8cd6"
}, {
    "constant": "false",
    "inputs": [{"name": "node", "type": "bytes32"}, {"name": "chain", "type": "bytes4"}, {
        "name": "metadataValue",
        "type": "bytes32"
    }],
    "name": "setChainMetadata",
    "outputs": [],
    "payable": "false",
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x245d4d9a"
}, {
    "constant": true,
    "inputs": [{"name": "node", "type": "bytes32"}, {"name": "chain", "type": "bytes4"}],
    "name": "chainAddrAndMetadata",
    "outputs": [{"name": "", "type": "string"}, {"name": "", "type": "bytes32"}],
    "payable": "false",
    "stateMutability": "view",
    "type": "function",
    "signature": "0x82e3bee6"
}, {
    "constant": "false",
    "inputs": [{"name": "node", "type": "bytes32"}, {"name": "chain", "type": "bytes4"}, {
        "name": "addrValue",
        "type": "string"
    }, {"name": "metadataValue", "type": "bytes32"}],
    "name": "setChainAddrWithMetadata",
    "outputs": [],
    "payable": "false",
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0xe335bee4"
}])

export default class RNS {

    static getRnsResolver = () => {
        const web3provider = new Web3.providers.HttpProvider(RSK_RPC_ENDPOINT);
        return new Resolver(web3provider, RNS_PUBLIC_RESOLVER_ADDRESS, RSN_PUBLIC_RESOLVER_ABI);
    }

    static getRnsDomainValue = () => {
        return isDevelopment() ? process.env.REACT_APP_NODE_RNS_DOMAIN : window.rnsDomain;
    }

}
