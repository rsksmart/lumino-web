import React, { Component } from "react";
import {
  SORT_BY_BALANCE,
  SORT_BY_NAME,
  SORT_BY_SELECTED,
  SORT_BY_SYMBOL
} from "../../constants/uiConstants";

export default class ooFilterTokens extends Component {
  render = () => {
    return (
      <div className="row align-items-center">
        <div className="col-6">
          <div className="input-group m-0">
            <input
              type="text"
              className="form-control text-white rounded-0 bg-transparent"
              id="inlineFormInputGroup"
              placeholder="Token name"
              onChange={this.props.onFilterChange}
            />
            <div className="input-group-prepend">
              <button className="input-group-text bg-transparent text-green btn-filter-search">
                <i className="fal fa-search" />
              </button>
            </div>
          </div>
        </div>

        <div className="col-auto ml-auto">
          <select
            className="custom-select bg-transparent"
            onChange={this.props.onSortByChange}
          >
            <option defaultValue value={SORT_BY_SELECTED}>
              Sort by
            </option>
            <option value={SORT_BY_NAME}>Name</option>
            <option value={SORT_BY_SYMBOL}>Symbol</option>
            <option value={SORT_BY_BALANCE}>Balance</option>
          </select>
        </div>
      </div>
    );
  };
}
