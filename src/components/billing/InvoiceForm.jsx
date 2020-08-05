import React, {Component} from "react";

export default class InvoiceForm extends Component {
    constructor(props) {
        super(props);
    }

    render = () => {

        let textAreaStyle = "invoice-form-textarea";

        if (this.props.quickPayment){
            textAreaStyle = "invoice-form-textarea-quick-payment";
        }

        return (
            <div className="form-group">
                <textarea
                    className={textAreaStyle}
                    placeholder={"Place your invoice here"}
                    value={this.props.value}
                    onChange={e => this.props.handleValueInvoiceChange(e)}>
                </textarea>
            </div>
        )
    }
}
