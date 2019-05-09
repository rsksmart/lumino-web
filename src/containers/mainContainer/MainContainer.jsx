import React, { Component } from "react";
import { connect } from "react-redux";
import UserTabNavigatorContainer from "../navbarContainer/NavBarContainer";
import { Route, Switch } from "react-router-dom";
import ChannelsContainer from "../userChannels/ChannelsContainer";
import TokensContainer from "../tokens/TokensContainer";
import DashboardContainer from "../dashboard/DashboardContainer";
import NodeDetailContainer from "../nodeDetail/NodeDetailContainer";
import PaymentsContainer from "../payments/PaymentsContainer";
import LuminoHeader from "../headers/HeaderContainer";
import ChannelDetailContainer from "../channelDetail/ChannelDetailContainer";
import TokenDetailContainer from "../tokenDetail/TokenDetailContainer";
import { ToastContainer } from "react-toastify";
import { pollDashboard } from "../../actions/dashboardActions";

class MainContainer extends Component {
  componentDidMount() {
    this.props.pollDashboard();
  }

  render = () => (
    <div className="">
      <ToastContainer
        autoClose={false}
        style={{
          width: "400px",
          wordBreak: "break-all"
        }}
      />
      <LuminoHeader />
      <UserTabNavigatorContainer />
      <main>
        <Switch>
          <Route exact path="/" component={DashboardContainer} />
          <Route exact path="/dashboard" component={DashboardContainer} />
          <Route exact path="/tokens" component={TokensContainer} />
          <Route exact path="/channels" component={ChannelsContainer} />
          <Route exact path="/payments" component={PaymentsContainer} />
          <Route exact path="/nodeDetail" component={NodeDetailContainer} />
          <Route
            exact
            path="/channelDetail"
            component={ChannelDetailContainer}
          />
          <Route exact path="/tokenDetail" component={TokenDetailContainer} />
        </Switch>
      </main>
    </div>
  );
}

const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  { pollDashboard }
)(MainContainer);
