import React, {Component} from "react";
import LeagueToolbar from "./LeagueToolbar";
import {AppBar, Tab, Tabs} from "@material-ui/core";
import Stats from "./history_components/Stats";
import Coefficients from "./history_components/Coefficients";
import PastWinners from "./history_components/PastWinners";
import Seeding from "./season_components/Seeding";
import Quals1 from "./season_components/Quals1";

class Season extends Component {

    constructor(props) {
        super(props);

        this.state = {
            pageTitle: "Season " + props.year,
            tabActive: 1,
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
                <AppBar position="static">
                    <Tabs value={this.state.tabActive} onChange={this.handleChange}>
                        <Tab label="Seeding"/>
                        <Tab label="1st Quals Round"/>
                        <Tab label="2nd Quals Round"/>
                        <Tab label="1st Round"/>
                        <Tab label="2nd Round"/>
                        <Tab label="Playoffs"/>
                    </Tabs>
                </AppBar>
                {this.state.tabActive === 0 && <Seeding year={this.props.year}/>}
                {this.state.tabActive === 1 && <Quals1 year={this.props.year}/>}
            </div>
        );
    }
}

export default Season;
