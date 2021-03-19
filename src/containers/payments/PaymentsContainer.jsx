import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getPayments} from "../../actions/paymentsActions";
import {DatePicker} from '@y0c/react-datepicker';
// import calendar style
// You can customize style by copying asset folder.
import '@y0c/react-datepicker/assets/styles/calendar.scss';
import {tableColumns} from "../../apiModels/tableModelPayments";
import {ALL_STATUSES} from "../../constants/uiConstants";
import {pollTokens} from "../../actions/tokensActions";
import PaymentTable from "../../components/tables/PaymentTable";

class PaymentsContainer extends Component{

    constructor(props) {
        super(props);
        const actualDate = new Date();
        let oneMonthBefore= new Date().setMonth(actualDate.getMonth()-1);
        const oneMonthBeforeDate = new Date(oneMonthBefore);
        this.state = {
            filterInitiator : undefined,
            filterTarget: undefined,
            filterFromDate: oneMonthBeforeDate,
            filterToDate: new Date(),
            filterStatus: undefined
        };
    }

    componentDidMount() {
        this.getData();
        this.props.pollTokens();
    }

    getData = () =>{
        this.props.getPayments(this.state.filterInitiator, this.state.filterTarget, this.state.filterFromDate, this.state.filterToDate, this.state.filterStatus);
    };


    render = () => {
        let mainTable = null;

        if (this.props.payments) {
            mainTable = <PaymentTable data={this.props.payments} columns={tableColumns} defaultPageSize={10} />
        }

        return <div>
            <div className="py-2 px-2 px-md-5 filters-bar row">
                <div className="col">
                    <input type="text" className="form-control text-white rounded-0 bg-transparent" placeholder="From" onChange={this.onInitiatorChange} />
                </div>
                <div className="col">
                    <input type="text" className="form-control text-white rounded-0 bg-transparent" placeholder="To" onChange={this.onTargetChange}/>
                </div>
                <div className="col-2">
                    <DatePicker onChange={this.onFromDateChange.bind(this)}  dateFormat="YYYY/MM/DD" initialDate={this.state.filterFromDate} selected={this.state.filterFromDate}/>
                </div>
                <div className="col-2">
                    <DatePicker onChange={this.onToDateChange.bind(this)}  dateFormat="YYYY/MM/DD" selected={this.state.filterToDate}/>
                </div>
                <div className="col-auto">
                    <select className="custom-select bg-transparent" onChange={this.onStatusChange}>
                        <option value={ALL_STATUSES} defaultValue>All </option>
                        <option value="1">Received</option>
                        <option value="2">Failed</option>
                        <option value="3">Sent</option>
                    </select>
                </div>
                <div className="col-auto ml-auto">
                    <button className="btn btn-green" onClick={async ()=>await this.applyFilters()}>Apply <i className="fal fa-sliders-v ml-3"></i></button>
                </div>
            </div>
            <div className="row no-gutters mt-5">
                <div className="col px-2 px-md-5">
                    {mainTable}
                </div>
            </div>
        </div>
    };

    onInitiatorChange = (event) => {
            this.setState({filterInitiator:event.target.value})
    };

    onTargetChange = (event) => {
        this.setState({filterTarget:event.target.value})
    };

    onStatusChange = (event) => {
        this.setState({filterStatus:event.target.value})
    };

    onFromDateChange(date) {
        this.setState({
            filterFromDate: new Date(date) // The DatePicker lib returns a string.
        });
    };

    onToDateChange(date) {
        this.setState({
            filterToDate:  new Date(date) // The DatePicker lib returns a string.
        });
    };

    applyFilters= async ()=>{
        await this.props.getPayments(this.state.filterInitiator, this.state.filterTarget, this.state.filterFromDate, this.state.filterToDate, this.state.filterStatus);
    };


}

const mapStateToProps = (state) => {
    return {
        payments: state.paymentReducer.payments
    }
};

const mapDispatchToProps = (dispatch) => {
    const actions = {
        getPayments: getPayments,
        pollTokens: pollTokens
    };
    return bindActionCreators(actions, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentsContainer);
