import React, {Component} from 'react';
import LeagueToolbar from "./LeagueToolbar";
import {AppBar, Tabs, Tab, Typography} from "@material-ui/core";

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
                            <Tab label="Item One" />
                            <Tab label="Item Two" />
                            <Tab label="Item Three" />
                        </Tabs>
                    </AppBar>
                    {this.state.tabActive === 0 && <Typography >Item One</Typography >}
                    {this.state.tabActive === 1 && <Typography >Item Two</Typography >}
                    {this.state.tabActive === 2 && <Typography >Item Three</Typography >}
                </div>
            </div>
        );
    }
}

export default History;
