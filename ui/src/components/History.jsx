import React, {Component} from 'react';
import LeagueToolbar from "./LeagueToolbar";
import {AppBar, Tabs, Tab, Typography} from "@material-ui/core";
import Coefficients from "./history_components/Coefficients";
import Stats from "./history_components/Stats";

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
                            <Tab label="Coefficients" />
                            <Tab label="Stats" />
                        </Tabs>
                    </AppBar>
                    {this.state.tabActive === 0 && <Coefficients />}
                    {this.state.tabActive === 1 && <Stats />}
                </div>
            </div>
        );
    }
}

export default History;
