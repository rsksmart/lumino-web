import React, {Component} from "react";
import 'react-table/react-table.css'
import ReactTable from 'react-table'


export default class PaymentTable extends Component {
    render =()=> {
        return <ReactTable
            data={this.props.data}
            columns={this.props.columns}
            defaultPageSize={this.props.defaultPageSize}
            showPagination={this.props.showPagination}
            sortable={this.props.sortable}
        />
    }
}
