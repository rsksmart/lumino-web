//  View filter and sorts values
export const ALL_STATUSES = 'ALL_STATUSES';
export const SORT_BY_SELECTED = 'SORT_BY_SELECTED';
export const SORT_BY_SYMBOL = 'symbol';
export const SORT_BY_NAME = 'name';
export const SORT_BY_BALANCE = 'balance';
export const SORT_BY_CHANNEL = 'channel_identifier';
export const SORT_BY_PARTNER = 'partner_address';
export const SORT_BY_TOKEN = 'token_address';
export const SORT_BY_STATUS = 'state';

export const SORT_DESC = 'SORT_DESC';
export const SORT_ASC = 'SORT_ASC';

export const  attributeToType = {
    name: String,
    symbol: String,
    balance: Number,
    channel_identifier: Number,
    partner_address: String,
    token_address: String,
    state: String
}