import React, {Component} from 'react';
import LeagueToolbar from "./LeagueToolbar";
import {AppBar, Tabs, Tab, Typography} from "@material-ui/core";
import Coefficients from "./history_components/Coefficients";
import Stats from "./history_components/Stats";
import PastWinners from "./history_components/PastWinners";

class History extends Component {

    constructor(props) {
        super(props);

        this.state = {
            pageTitle: "History",
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
                            <Tab label="Stats" />
                            <Tab label="Coefficients" />
                            <Tab label="Past Winners" />
                        </Tabs>
                    </AppBar>
                    {this.state.tabActive === 0 && <Stats />}
                    {this.state.tabActive === 1 && <Coefficients />}
                    {this.state.tabActive === 2 && <PastWinners />}
                </div>
            </div>
        );
    }
}

export default History;
