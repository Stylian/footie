import React, {Component} from "react";
import LeagueToolbar from "./LeagueToolbar";
import {AppBar, Tab, TableBody, Tabs} from "@material-ui/core";
import Seeding from "./season_components/Seeding";
import Groups1 from "./season_components/Groups1";
import Quals from "./season_components/Quals";
import Groups2 from "./season_components/Groups2";

class Season extends Component {

    constructor(props) {
        super(props);

        this.state = {
            pageTitle: "Season " + props.year,
            tabActive: 5,
            stages: {},
        };

    }

    componentDidMount() {
        fetch("http://localhost:8080/rest/seasons/" + this.props.year + "/status")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState(state => {

                        // to test , also the render as well
                        let currentStage = 5;
                        Object.keys(result).map((key, index) => {
                            if(result[key] === "PLAYING") {
                                currentStage = index + 1;
                            }
                        });

                        return {
                            ...state,
                            isLoaded: true,
                            stages: result,
                        }
                    });
                },
                (error) => {
                    this.setState(state => {
                        return {
                            ...state,
                            isLoaded: true,
                            error
                        }
                    });
                }
            )
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
                        <Tab disabled={(this.state.stages.quals1 === "NOT_STARTED")} label="1st Quals Round"/>
                        <Tab disabled={(this.state.stages.quals2 === "NOT_STARTED")} label="2nd Quals Round"/>
                        <Tab disabled={(this.state.stages.qroups1 === "NOT_STARTED")} label="1st Round"/>
                        <Tab disabled={(this.state.stages.qroups2 === "NOT_STARTED")} label="2nd Round"/>
                        <Tab disabled={(this.state.stages.playoffs === "NOT_STARTED")} label="Playoffs"/>
                    </Tabs>
                </AppBar>
                {this.state.tabActive === 0 && <Seeding year={this.props.year}/>}
                {this.state.tabActive === 1 && <Quals year={this.props.year} round={1} />}
                {this.state.tabActive === 2 && <Quals year={this.props.year} round={2} />}
                {this.state.tabActive === 3 && <Groups1 year={this.props.year}/>}
                {this.state.tabActive === 4 && <Groups2 year={this.props.year}/>}
                {this.state.tabActive === 5 && <Groups2 year={this.props.year}/>}
            </div>
        );
    }
}

export default Season;
