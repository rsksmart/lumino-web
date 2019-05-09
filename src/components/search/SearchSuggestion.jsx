import React, { Component } from "react";
import Autosuggest from "react-autosuggest";
import { ADDRESS, CHANNEL, TOKEN } from "../../lib/search/searchConstants";
import Link from "react-router-dom/es/Link";
import AddChannelModal from "../../containers/userChannels/AddChannelModal";
export default class SearchSuggestion extends Component {
  state = {
    show: false,
    partner: ""
  };
  getSuggestionValue = suggestion => suggestion.name;

  handleClick = (suggestion, openNewChannel) => {
    this.props.selectedSuggestion(suggestion);
    if (openNewChannel) {
      this.setState({
        show: true,
        partner: suggestion.value
      });
    }
  };

  handleClose = () => {
    this.setState({ show: false, partner: "" });
  };

  renderSuggestion = suggestion => {
    let searchType = "fal mr-2 fa-lg align-middle fa-fw";
    let routeLink = "";
    let openNewChannel = false;
    switch (suggestion.type) {
      case TOKEN:
        searchType += " fa-coins";
        routeLink = "/tokenDetail";
        break;
      case CHANNEL:
        searchType += " fa-chart-network";
        routeLink = "/channelDetail";
        break;
      case ADDRESS:
        searchType += " fa-address-card";
        openNewChannel = true;
        break;
      default:
        searchType += "";
        break;
    }

    let suggestionItem;

    if (this.props.redirect) {
      if (suggestion.type === "channel") {
        suggestionItem = (
          <Link
            className="btn btn-block text-left"
            to={routeLink}
            onClick={() => this.handleClick(suggestion)}
          >
            <i className={searchType} />
            {suggestion.value.id} - {suggestion.value.tokenAddress}
          </Link>
        );
      } else if (suggestion.type === "address") {
        suggestionItem = (
          <span
            className="btn btn-block text-left"
            onClick={() => this.handleClick(suggestion, openNewChannel)}
          >
            <i className={searchType} />
            {suggestion.value}
          </span>
        );
        // suggestionItem = <button type="button" name="button" className="btn btn-block text-left" onClick={this.handleShowNodeDetail}>
        //     <i className={searchType}>
        //     </i>
        //     {suggestion.value}
        // </button>;
      } else {
        suggestionItem = (
          <Link
            className="btn btn-block text-left"
            to={routeLink}
            onClick={() => this.handleClick(suggestion, openNewChannel)}
          >
            <i className={searchType} />
            {suggestion.value}
          </Link>
        );
      }
    } else {
      if (suggestion.type === "token") {
        suggestionItem = (
          <div className="btn btn-block text-left">
            <i className={searchType} />
            {suggestion.label}
          </div>
        );
      } else {
        suggestionItem = (
          <div className="btn btn-block text-left">
            <i className={searchType} />
            {suggestion.value}
          </div>
        );
      }
    }

    return <div>{suggestionItem}</div>;
  };

  onSuggestionsFetchRequested = ({ value }) => {
    if (this.props.loadSuggestionsBegin) {
      // Only if present, maybe you dont want to inform that the loading started.
      this.props.loadSuggestionsBegin();
    }
    if (value) {
      this.props.onSuggestionsFetchRequested(value.trim().toLowerCase());
    }
  };

  render() {
    const {
      value,
      suggestions,
      onChange,
      onSuggestionsClearRequested
    } = this.props;
    const inputProps = {
      placeholder: this.props.placeholder,
      value,
      onChange
    };
    return (
      <>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          inputProps={inputProps}
          onSuggestionSelected={this.props.onSuggestionSelected}
        />
        <AddChannelModal
          show={this.state.show}
          partner={this.state.partner}
          handleClose={this.handleClose}
        />
      </>
    );
  }
}
