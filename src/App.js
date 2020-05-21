import React, { Component } from 'react';
import Provider from "react-redux/es/components/Provider";
import ApplicationRouter from "./routing/ApplicationRouter";
import {PersistGate} from "redux-persist/integration/react";


export default class App extends Component {
  render =() =>
      <Provider store={this.props.store}>
          <PersistGate loading={null} persistor={this.props.persistor}>
            <ApplicationRouter/>
          </PersistGate>
      </Provider>

}
