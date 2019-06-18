import React, {Component} from "react";

export default class fiatTokenBarItem extends Component {
    render =()=>
        <li className="text-white px-4">
            <span className="w-600 d-block">
                {this.props.name}
            </span>
            <span className="w-600 d-block">
                {this.props.balance}
            </span>
            <span className="w-600 d-block">
                {this.props.unitPrice}
                <small className="ml-1 op-3">{this.props.unitPriceCurrency}</small>
            </span>
            <span className="w-600 d-block">
                ({this.props.dayAgoPercentageVariationPrice}%)
            </span>
        </li>
}
