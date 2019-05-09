import React, {Component} from "react";

export default class TokenBarItem extends Component {
    render =()=>
        <li className="text-white px-4">
            <span className="w-600 d-block">
                {this.props.name}
            </span>
            <span className="w-600 d-block">
                {this.props.balance}
                <small className="ml-1 op-3">{this.props.fiat}</small>
            </span>
        </li>
}