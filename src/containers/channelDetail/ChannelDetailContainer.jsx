import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getPayments } from "../../actions/paymentsActions";
import PollingContainer from "../../genericContainers/PollingContainer";
import { getChannel } from "../../services/channelServices";
import { USER_ADDRESS } from "../../config/applicationConstants";
import { getDecimals } from "../../lib/tokens/tokensLogic";
import { fromWei } from "../../lib/amounts/weiConversion";
import PaymentTable from "../../components/tables/PaymentTable";
import { tableColumns } from "../../apiModels/tableModelPayments";
import { DatePicker } from "@y0c/react-datepicker";
import { ALL_STATUSES } from "../../constants/uiConstants";

class ChannelDetailContainer extends Component {
  async componentDidMount() {
    const selectedSuggestion = this.getSelectedSuggestion();
    if (selectedSuggestion) {
      if (this.props.selectedSuggestion) {
        sessionStorage.setItem("tempSelectedSuggestion", JSON.stringify(this.props.selectedSuggestion));
      }
      const actualDate = new Date();
      let oneMonthBefore = new Date().setMonth(actualDate.getMonth() - 1);
      const oneMonthBeforeDate = new Date(oneMonthBefore);
      let channelData = await getChannel(
        this.getSelectedSuggestion().tokenAddress,
          this.getSelectedSuggestion().partnerAddress
      );
      this.setState({
        filterInitiator: USER_ADDRESS,
        filterTarget: channelData.partner_address,
        filterFromDate: oneMonthBeforeDate,
        filterToDate: new Date(),
        myBalance: channelData.balance,
        filterStatus: undefined
      });
    } else {
      this.props.history.push("/channels");
    }
  }

  getSelectedSuggestion() {
    // TODO: this should be treated as an url param in the future so we can avoid having to save this to session storage
    //  we should have an url like /channelDetail/<token_address>/<partner_address>
    if (this.props.selectedSuggestion) {
      return this.props.selectedSuggestion;
    } else {
      const selectedSuggestion = sessionStorage.getItem("tempSelectedSuggestion");
      if (selectedSuggestion) {
        return JSON.parse(selectedSuggestion);
      } else {
        return null;
      }
    }
  }

  onStatusChange = event => {
    this.setState({ filterStatus: event.target.value });
  };

  onFromDateChange(date) {
    this.setState({
      filterFromDate: new Date(date) // The DatePicker lib returns a string.
    });
  }

  onToDateChange(date) {
    const newDate = new Date(date);
    newDate.setHours(23, 59, 59);
    this.setState({
      filterToDate: newDate // The DatePicker lib returns a string.
    });
  }

  applyFilters = async () => {
    await this.getData();
  };

  constructor(props) {
    super(props);
    this.state = {
      filterInitiator: undefined,
      filterFromDate: undefined,
      filterToDate: undefined,
      filterStatus: undefined,
      myBalance: undefined,
      loading: true
    };
  }

  resolveRender = () => {
    return this.getSelectedSuggestion() ? (
      <PollingContainer
        render={this.renderPolling}
        pollAction={this.getData}
        dueTim={0}
        periodOfScheduler={2000}
      />
    ) : (
      <h5 className="m-5 text-center">
        Click on "View Details" on a channel to visualize the data
      </h5>
    );
  };

  render = () => {
    return this.resolveRender();
  };

  getData = () => {
    this.props.getPayments(
      this.state.filterInitiator,
      this.state.filterTarget,
      this.state.filterFromDate,
      this.state.filterToDate,
      this.state.filterStatus,
      this.getSelectedSuggestion().networkId
    );
  };
  renderPolling = () => {
    let mainTable = null;
    if (this.props.payments && this.state.loading) {
      mainTable = (
        <PaymentTable
          data={this.props.payments}
          columns={tableColumns}
          defaultPageSize={5}
        />
      );
    }
    let balanceInTokens = fromWei(
      this.state.myBalance,
      getDecimals(this.getSelectedSuggestion().tokenAddress, this.props.tokens)
    );
    return (
        <div className="container-fluid py-5 px-2 my-5">
          <div className="row mb-5 no-gutters">
            <div className="col-xl-10 mx-auto position-relative">
              <hr className="position-absolute channel-line" />
              <div className="row no-gutters align-items-center justify-content-between">
                <div className="col-xl-auto text-center">
                  <div className="channel-circle-item d-inline-block shadow-sm position-relative text-center">
                    <i className="fal fa-2x align-middle fa-fw fa-address-card text-white" />
                    <div className="channel-balance-item bg-white position-absolute rounded px-2 py-1 shadow-sm">
                      {balanceInTokens}
                    </div>
                  </div>
                  <p className="text-green overflow-mobile">{USER_ADDRESS}</p>
                </div>
                <div className="text-center token-info py-5 py-xl-0">
                  <ul className="list-unstyled mb-0">
                    <li><i className="text-blue fal fa-coins fa-2x"></i></li>
                    <li className="text-blue"><b>{this.getSelectedSuggestion().tokenName}</b></li>
                    <li className="text-blue overflow-mobile">{this.getSelectedSuggestion().tokenAddress}</li>
                    <li></li>
                  </ul>
                </div>
                <div className="col-xl-auto text-center">
                  <div className="channel-circle-item d-inline-block shadow-sm position-relative">
                    <i className="fal fa-2x align-middle fa-fw fa-address-card text-white" />
                    {/*<div className="channel-balance-item right-balance bg-white position-absolute rounded px-2 py-1 shadow-sm ">300</div>*/}
                  </div>
                  <p className="text-green overflow-mobile">
                    {this.getSelectedSuggestion().partnerAddress}
                  </p>
                </div>
              </div>
            </div>
          </div>

        <div className="row no-gutters justify-content-center mt-5">
          <div className="col-lg-10">
            <div className="card">
              <h3 className="bg-white text-center h4 m-0 py-3">
                Channel Payments
              </h3>
              <div className="py-2 px-2 px-md-5 filters-bar row mx-0">
                <div className="col-2">
                  <DatePicker
                    onChange={this.onFromDateChange.bind(this)}
                    dateFormat="YYYY/MM/DD"
                    initialDate={this.state.filterFromDate}
                    selected={this.state.filterFromDate}
                  />
                </div>
                <div className="col-2">
                  <DatePicker
                    onChange={this.onToDateChange.bind(this)}
                    dateFormat="YYYY/MM/DD"
                    selected={this.state.filterToDate}
                  />
                </div>
                <div className="col-auto">
                  <select
                    className="custom-select bg-transparent"
                    onChange={this.onStatusChange}
                  >
                    <option value={ALL_STATUSES} defaultValue>
                      All{" "}
                    </option>
                    <option value="1">Received</option>
                    <option value="2">Failed</option>
                    <option value="3">Sent</option>
                  </select>
                </div>
                <div className="col-auto ml-auto">
                  <button
                    className="btn btn-green"
                    onClick={async () => await this.applyFilters()}
                  >
                    Apply <i className="fal fa-sliders-v ml-3" />
                  </button>
                </div>
              </div>
            </div>

            {mainTable}
          </div>
        </div>
      </div>
    );
  };
}

const mapStateToProps = state => {
  return {
    selectedSuggestion: state.searchReducer.suggestion
      ? state.searchReducer.suggestion.value
      : null,
    payments: state.paymentReducer.payments,
    tokens: state.dashboardReducer.tokens
  };
};

const mapDispatchToProps = dispatch => {
  const actions = {
    getPayments: getPayments
  };
  return bindActionCreators(actions, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelDetailContainer);
