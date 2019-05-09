import React, {Component} from "react";
import {Link} from "react-router-dom";


export default class TabNavItem extends Component{

    render = () =>{
        let classList = "";
        this.props.activeTab ?
            (classList = "nav-link position-relative p-2 py-lg-3 px-lg-0 active") :
            (classList = "nav-link position-relative p-2 py-lg-3 px-lg-0");
        return <li className="nav-item mb-3 mb-md-0">
            <Link className={classList} to={this.props.route} onClick={(idx)=>this.props.handleClick(idx)}>
                {this.props.navItemContent}
            </Link>
        </li>
    }

}
