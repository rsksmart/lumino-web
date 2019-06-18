import React, {Component} from "react";
import TokenBarItem from "./TokenBarItem";
import {fromWei} from "../../lib/amounts/weiConversion";

export default class TokenBar extends Component {
    render =()=> {
        let tokenBarItemList = this.props.tokenList.map((e)=>{
            let balance = fromWei(e.balance, e.decimals);
            return <TokenBarItem name={e.name} key={e.name} balance={balance} unitPrice={e.unitPrice} unitPriceCurrency={e.unitPriceCurrency} dayAgoPercentageVariationPrice={e.dayAgoPercentageVariationPrice}/>
        });

        return <ul className="list-unstyled justify-content-center align-items-center token-list-container m-0 d-flex">
            <li className="mr-auto">
                <button type="button" className="btn btn-link text-green">
                    <i className="fal fa-arrow-left fa-lg"></i>
                </button>
            </li>
            {tokenBarItemList}
            <li className="ml-auto border-0">
                <button type="button" className="btn btn-link text-green">
                    <i className="fal fa-arrow-right fa-lg"></i>
                </button>
            </li>
        </ul>
    }
}
