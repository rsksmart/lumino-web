import React, {Component} from "react";
import {
    SORT_BY_BALANCE,
    SORT_BY_CHANNEL,
    SORT_BY_PARTNER,
    SORT_BY_SELECTED, SORT_BY_STATUS,
    SORT_BY_TOKEN
} from "../../constants/uiConstants";

export default class FiltersChannels extends Component {
    render =()=> {
        return  <div className="row align-items-center">
            <div className="col">
                <div className="form-group m-0">
                    <input type="email" className="form-control text-white rounded-0 bg-transparent" id="token-name" placeholder="Token name" onChange={this.props.onTokenFilterChange}/>
                </div>
            </div>
            <div className="col">
                <div className="form-group m-0">
                    <input type="email" className="form-control text-white  rounded-0 bg-transparent" id="partner-address" placeholder="Partner address"  onChange={this.props.onPartnerFilterChange}/>
                </div>
            </div>
            <div className="col-auto">
                <select className="custom-select bg-transparent" onChange={this.props.onSortByChange}>
                    <option defaultValue value={SORT_BY_SELECTED}>Sort by</option>
                    <option value={SORT_BY_CHANNEL}>Channel</option>
                    <option value={SORT_BY_PARTNER}>Partner</option>
                    <option value={SORT_BY_TOKEN}>Token</option>
                    <option value={SORT_BY_BALANCE}>Balance</option>
                    <option value={SORT_BY_STATUS}>Status</option>


                </select>
            </div>
        </div>
    }
}
