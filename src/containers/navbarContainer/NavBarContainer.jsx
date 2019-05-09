import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setSelectedTabIndex } from "../../actions/tabActions";
import TabNavItem from "../../genericComponents/tabNavBar/tabNavItem";
import { ReactComponent as LogoV } from "./lumino-v.svg";

class NavBarContainer extends Component {
  render = () => {
    return (
      <aside className="bg-dark shadow">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-0">
          <div className="collapse navbar-collapse" id="side-bar">
            <div className="navbar-nav flex-lg-column w-100 pt-5" aria-orientation="vertical">
              <TabNavItem
                navItemContent={
                  <div className="position-relative">
                    <i className="fal fa-tachometer-alt" />
                    <span className="d-block">Dashboard</span>
                  </div>
                }
                handleClick={() => this.setTabIndex(0)}
                activeTab={this.props.selectedTabIdx === 0}
                route={"/dashboard"}
              />
              <TabNavItem
                navItemContent={
                  <div className="position-relative">
                    <i className="fal fa-coins" />
                    <span className="d-block position-relative">Tokens</span>
                  </div>
                }
                handleClick={() => this.setTabIndex(1)}
                activeTab={this.props.selectedTabIdx === 1}
                route={"/tokens"}
              />

              <TabNavItem
                navItemContent={
                  <div className="position-relative">
                    <i className="fal fa-chart-network" />
                    <span className="d-block">Channels</span>
                  </div>
                }
                handleClick={() => this.setTabIndex(2)}
                activeTab={this.props.selectedTabIdx === 2}
                route={"/channels"}
              />

              <TabNavItem
                navItemContent={
                  <div className="position-relative">
                    <i className="fal fa-money-bill-alt" />
                    <span className="d-block position-relative">Payments</span>
                  </div>
                }
                handleClick={() => this.setTabIndex(3)}
                activeTab={this.props.selectedTabIdx === 3}
                route={"/payments"}
              />
            </div>
          </div>
        </nav>
        <div className="text-center lumino-version mt-auto position-absolute w-100">
          <LogoV />
          <span className="d-block mb-2">V 0.1</span>
          <span className="d-block"><a href="https://twitter.com/rif_os">@rif_os</a></span>
          <span className="d-block"><a href="https://www.rifos.org/">www.rifos.org</a></span>
        </div>
      </aside>
    );
  };

  setTabIndex = index => {
    this.props.setSelectedTabIndex(index);
  };
}

const mapStateToProps = state => {
  return {
    selectedTabIdx: state.tabReducer.selectedTabIdx
  };
};

const mapDispatchToProps = dispatch => {
  const actions = {
    setSelectedTabIndex: setSelectedTabIndex
  };
  return bindActionCreators(actions, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBarContainer);
