import React, {Component} from "react";
import { timer } from 'rxjs';

/*
    props:
    - pollAction
    - onDataChanged
    - checkDataChanged
    - dueTime
    - periodOfScheduler
 */
export default class PollingContainer extends Component{

    componentDidMount() {
        this.timmer = timer(this.props.dueTime,this.props.periodOfScheduler);
        this.subscription = this.timmer.subscribe(async (val)=> {
            //console.log("Polling ..."+val);
            await this.props.pollAction();
            if(this.props.dataChanged){
                await this.props.onDataChanged();
            }
        })
    }

    componentWillUnmount() {
        this.subscription.unsubscribe();
        this.timmer = null;
    }

    render=()=>{
        return <div>
            {this.props.render()}
        </div>
    }







}
