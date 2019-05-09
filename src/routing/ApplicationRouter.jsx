import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";

import MainContainer from "../containers/mainContainer/MainContainer";

export default class ApplicationRouter extends Component{

    render = () =>
        <BrowserRouter>
            <Switch>
                <Route path="/" component={MainContainer} />
            </Switch>
        </BrowserRouter>

}