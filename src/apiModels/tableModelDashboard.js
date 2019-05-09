import React from "react";
import { USER_ADDRESS } from "../config/applicationConstants";
import { BigNumber } from "bignumber.js";
import { format } from "date-fns";

export const tableColumns = [
  {
    Header: "ID",
    accessor: "identifier"
  },
  {
    Header: "Date",
    accessor: "log_time",
    Cell: props => (
      <span>
        <i className="fal fa-calendar-day text-blue mr-1" />
        {format(props.value, "MM-DD-YYYY HH:mm")}
      </span>
    )
  },
  {
    Header: "Amount ",
    accessor: "amount",
    Cell: props => {
      if (props.value === undefined) {
        return <span className="text-center d-block">{props.value}</span>;
      }
      let amount = new BigNumber(props.value);
      let tokenAmount = amount.dividedBy(Math.pow(10, 18)).toString(10);
      return <span className="text-center d-block">{tokenAmount}</span>;
    }
  },
  {
    Header: "From ",
    accessor: "initiator",
    Cell: props => {
      if (props.value === "") {
        return USER_ADDRESS;
      } else {
        return props.value;
      }
    }
  },
  {
    Header: "To",
    accessor: "target",
    Cell: props => {
      if (props.value === "") {
        return USER_ADDRESS;
      } else {
        return props.value;
      }
    }
  }
];
