import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import PollingContainer from "../../genericContainers/PollingContainer";
import {joinNetwork, leaveNetwork, pollTokens} from "../../actions/tokensActions";
import TokenList from "../../components/tokens/TokenList";
import FilterTokens from "../../components/filtersTokens/FilterTokens";
import {likeFilter} from "../../lib/filter/filters";
import {attributeToType, SORT_ASC, SORT_BY_NAME, SORT_DESC} from "../../constants/uiConstants";
import {basicSort} from "../../lib/sort/basicSorting";
import {incrementTaskPending} from "../../actions/taskActions";

class TokensContainer extends Component{

    constructor(props) {
        super(props);
        this.state = {
            filterName : undefined,
            sortBy: SORT_BY_NAME,
        };
    }

    handleFilterNameChange = (event) =>
        this.setState({filterName: event.target.value});

    handleSortByChange = (event) =>
        this.setState({sortBy: event.target.value});

    applyFiltersAndSorting = () =>{
        let filteredTokens = this.filterTokens();
        const attType = attributeToType[this.state.sortBy];
        if(attType === String){
           return basicSort(filteredTokens, this.state.sortBy, attributeToType[this.state.sortBy],  SORT_ASC);
        }else{
            return basicSort(filteredTokens, this.state.sortBy, attributeToType[this.state.sortBy],  SORT_DESC);
        }
    };

    filterTokens = () =>{
        if(this.props.tokens && this.props.tokens.length > 0 && this.state.filterName){
            return likeFilter(this.props.tokens, ['name','symbol'], this.state.filterName)
        }else{
            return this.props.tokens;
        }
    };


    render=()=>{
        return <PollingContainer
            render={this.renderPolling}
            pollAction={this.props.pollTokens}
            dueTim={0}
            periodOfScheduler={15000}
        />
    };


    renderPolling=()=>{
        return <div>
            <div className="py-2 px-2 px-md-5 filters-bar">
                <FilterTokens onFilterChange={this.handleFilterNameChange} onSortByChange={this.handleSortByChange}/>
            </div>
            <div className="container-fluid px-3 px-md-5 py-4 py-lg-0">
                <TokenList tokenList={this.applyFiltersAndSorting()}  leaveNetworkHandler={this.props.leaveNetwork} joinNetworkHandler={this.props.joinNetwork} incrementTaskPending={this.props.incrementTaskPending}/>
            </div>
        </div>
    };


}

const mapStateToProps = (state) => {
    return {
        tokens: state.tokenReducer.tokens
    }
};

const mapDispatchToProps = (dispatch) => {
    const actions = {
        pollTokens: pollTokens,
        leaveNetwork: leaveNetwork,
        joinNetwork: joinNetwork,
        incrementTaskPending:incrementTaskPending,
    };
    return bindActionCreators(actions, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(TokensContainer);
