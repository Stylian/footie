import React, {Component} from 'react';
import LeagueToolbar from "./LeagueToolbar";
import {AppBar, Tab, Tabs} from "@material-ui/core";
import GameStats from "./admin_components/GameStats";
import Monitoring from "./admin_components/Monitoring";

class Admin extends Component {

    constructor(props) {
        super(props);

        this.state = {
            pageTitle: "Admin",
            tabActive: 0,
        };

    }

    handleChange = (event, newValue) => {
        this.setState(state => {
            return {
                ...state,
                tabActive: newValue,
            }
        });
    }

    render() {
        return (
            <div>
                <LeagueToolbar pageTitle={this.state.pageTitle} />
                <div>
                    <AppBar position="static">
                        <Tabs value={this.state.tabActive} onChange={this.handleChange}>
                            <Tab label="Game Stats" />
                            <Tab label="Monitoring" />
                        </Tabs>
                    </AppBar>
                    {this.state.tabActive === 0 && <GameStats />}
                    {this.state.tabActive === 1 && <Monitoring />}
                </div>
            </div>
        );
    }
}

export default Admin;
