import React, { Component } from "react";
import { connect } from "react-redux";
import RNS from "../../lib/rns/rns";

class TokenDetailContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nodeAddress: undefined
    };
  }


  render = () => {
    return (
      <div className="container-fluid p-5">
        <div className="row mb-4">
          <div className="col text-center">
            <h5 className="name text-green w-600 m-0">
              {RNS.getRnsDomainValue()}
            </h5>
          </div>
        </div>
        <div className="row mb-4">
          <div className="col text-center" />
        </div>
      </div>
    );
  };
}

const mapStateToProps = state => {
  return {
    selectedSuggestion: state.searchReducer.suggestion.value
  };
};

export default connect(mapStateToProps)(TokenDetailContainer);
