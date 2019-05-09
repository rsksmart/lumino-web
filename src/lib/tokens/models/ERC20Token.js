
export default class ERC20Token{

    constructor(address, name, symbol, decimals, balance){
        this.address = address;
        this.name = name;
        this.symbol = symbol;
        this.decimals = decimals;
        this.balance = balance;
    }
}
