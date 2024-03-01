import React from 'react';
import {BrowserRouter} from "react-router-dom";
import Route from "react-router-dom/es/Route";
import LandingPage from "./components/LandingPage";
import Admin from "./components/Admin";
import Season from "./components/Season";
import Team from "./components/Team";
import Group from "./components/Group";
import Players from "./components/Players";
import Stats from "./components/history_components/Stats";
import Statistics from "./components/history_components/Statistics";
import Coefficients from "./components/history_components/Coefficients";
import Player from "./components/Player";

export default function App() {

    return (
        <BrowserRouter>
            <Route exact path='/' component={LandingPage}/>
            <Route exact path='/season/:seasonNum' component={Season}/>
            <Route exact path='/teams/:teamId' component={Team}/>
            <Route exact path='/groups/:groupId' component={Group}/>
            <Route path='/coefficients' component={Coefficients}/>
            <Route path='/league_stats' component={Statistics}/>
            <Route path='/teams_stats' component={Stats}/>
            <Route path='/players_edit' component={Players}/>
            <Route path='/players/:playerId' component={Player}/>
            <Route path='/admin' component={Admin}/>
        </BrowserRouter>
    );

}
