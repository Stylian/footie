import React, {Component} from 'react';
import {BrowserRouter, Switch} from "react-router-dom";
import Route from "react-router-dom/es/Route";
import LandingPage from "./components/LandingPage";
import History from "./components/History";
import Admin from "./components/Admin";

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            pageTitle: "Landing Page",
        };

    }

    render() {
        return (
            <BrowserRouter>
                <Route path='/' component={LandingPage}/>
                <Route path='/history' component={History}/>
                <Route path='/admin' component={Admin}/>
            </BrowserRouter>
        );
    }
}

export default App;
