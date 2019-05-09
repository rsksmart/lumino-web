import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PollingContainer from "../../genericContainers/PollingContainer";
import { pollDashboard } from "../../actions/dashboardActions";
import PaymentTable from "../../components/tables/PaymentTable";
import TokenBar from "../../components/tokenbar/TokenBar";
import LastPaymentInfo from "../lastPaymentInfo/LastPaymentInfo";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { tableColumns } from "../../apiModels/tableModelDashboard";

class DashboardContainer extends Component {
  render = () => {
    return (
      <PollingContainer
        render={this.renderPolling}
        pollAction={this.pollDashboardContent}
        dueTim={0}
        periodOfScheduler={2000}
      />
    );
  };

  pollDashboardContent = () => {
    this.props.pollDashboard();
  };

  renderPolling = () => {
    let tableReceived = null;
    let tableSent = null;

    if (this.props.dashboardData.data_table) {
      tableReceived = (
        <PaymentTable
          data={this.props.dashboardData.data_table.payments_received}
          columns={tableColumns}
          defaultPageSize={5}
          showPagination={false}
          sortable={false}
        />
      );
      tableSent = (
        <PaymentTable
          data={this.props.dashboardData.data_table.payments_sent}
          columns={tableColumns}
          defaultPageSize={5}
          showPagination={false}
          sortable={false}
        />
      );
    }

    return (
      <div>
        <div className="py-2 px-4 filters-bar">
          <TokenBar tokenList={this.props.tokens} />
        </div>
        <div className="container-fluid mt-5">
          <div className="row align-items-center">
            <div className="col-sm-8 mx-auto">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={this.props.dashboardData.data_graph}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month_of_year_label" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Payment Received" fill="#14D944" />
                  <Bar dataKey="Payment Sent Success" fill="#149DD9" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="col-sm-auto ml-auto px-0 pl-sm-3 my-3 my-sm-0">
              <LastPaymentInfo
                paymentInfo={this.props.dashboardData.data_general_payments}
              />
            </div>
          </div>
        </div>
        <div className="row no-gutters mt-5">
          <div className="col-lg mb-3 mb-lg-0">
            <h3 className="bg-white text-center h4 m-0 py-3">
              Payments Received
            </h3>
            {tableReceived}
          </div>
          <div className="col-lg">
            <h3 className="bg-white text-center h4 m-0 py-3">Payments Sent</h3>
            {tableSent}
          </div>
        </div>
      </div>
    );
  };
}

const mapStateToProps = state => {
  return {
    dashboardData: state.dashboardReducer.dashboardData,
    tokens: state.dashboardReducer.tokens
  };
};

const mapDispatchToProps = dispatch => {
  const actions = {
    pollDashboard: pollDashboard
  };
  return bindActionCreators(actions, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardContainer);
