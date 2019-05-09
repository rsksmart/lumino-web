import React, { Component } from "react";
import ChannelItem from "./ChanneItem";
import { getDecimals } from "../../lib/tokens/tokensLogic";

export default class ChannelList extends Component {
  render = () => {
    const tokens = this.props.tokens;
    let channelsItemList = [];
    if (this.props.channelList) {
      channelsItemList = this.props.channelList.map(e => {
        const decimals = getDecimals(e.token_address, tokens);
        const tokenName = tokens.find(o => o.address === e.token_address);
        return (
          <ChannelItem
            key={e.channel_identifier}
            id={e.channel_identifier}
            networkId={e.token_network_identifier}
            state={e.state}
            balance={e.balance}
            token={e.token_address}
            tokenName={tokenName ? tokenName.name : null}
            partner={e.partner_address}
            closeChannel={this.props.closeChannel}
            depositChannel={this.props.depositChannel}
            payChannel={this.props.payChannel}
            tokenDecimals={decimals}
            incrementTaskPending={this.props.incrementTaskPending}
            selectedSuggestion={this.props.selectedSuggestion}
          />
        );
      });
    }

    return (
      <ul className="list-unstyled row channel-list">{channelsItemList}</ul>
    );
  };
}
