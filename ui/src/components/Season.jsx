import React, {Component} from "react";
import LeagueToolbar from "./LeagueToolbar";
import {AppBar, Box, Paper, Tab, TableBody, Tabs} from "@material-ui/core";
import Seeding from "./season_components/Seeding";
import Groups1 from "./season_components/Groups1";
import Quals from "./season_components/Quals";
import Groups2 from "./season_components/Groups2";
import Playoffs from "./season_components/Playoffs";

class Season extends Component {

    constructor(props) {
        super(props);

        this.state = {
            pageTitle: "Season " + props.match.params.seasonNum,
            tabActive: 0,
            stages: {},
            isLoaded: false
        };

    }

    componentDidMount() {
        fetch("/rest/seasons/" + this.props.match.params.seasonNum + "/status")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState(state => {
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

        fetch("/rest/persist/tabs/season/" + this.props.match.params.seasonNum)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState(state => {
                        return {
                            ...state,
                            tabActive: result,
                            isLoaded: true,
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


        fetch("/rest/persist/property/season_year", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: this.props.match.params.seasonNum
        })
            .then(res => res.json())
            .then(
                (result) => {
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

        fetch("/rest/persist/tabs/season/" + this.props.match.params.seasonNum, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: newValue
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState(state => {
                        return {
                            ...state,
                            tabActive: newValue,
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

    render() {
        return (
            this.state.isLoaded ? (
                <Paper style={{margin: 20}} elevation={20}>
                    <LeagueToolbar pageTitle={this.state.pageTitle} seasonNum={this.props.match.params.seasonNum}/>

                    <Box style={{margin: 20}}>
                        <AppBar position="static">
                            <Tabs value={this.state.tabActive} onChange={this.handleChange}>
                                <Tab label="Seeding"/>
                                <Tab label="1st Quals Round"/>
                                <Tab label="2nd Quals Round"/>
                                <Tab label="1st Round"/>
                                <Tab disabled={(this.state.stages.groups2 === "NOT_STARTED")} label="2nd Round"/>
                                <Tab disabled={(this.state.stages.playoffs === "NOT_STARTED")} label="Playoffs"/>
                            </Tabs>
                        </AppBar>
                        {this.state.tabActive === 0 && <Seeding year={this.props.match.params.seasonNum}/>}
                        {this.state.tabActive === 1 && <Quals year={this.props.match.params.seasonNum} round={1}
                                                              stage={this.state.stages.quals1}/>}
                        {this.state.tabActive === 2 && <Quals year={this.props.match.params.seasonNum} round={2}
                                                              stage={this.state.stages.quals2}/>}
                        {this.state.tabActive === 3 && <Groups1 year={this.props.match.params.seasonNum}
                                                                stage={this.state.stages.groups1}/>}
                        {this.state.tabActive === 4 && <Groups2 year={this.props.match.params.seasonNum}
                                                                stage={this.state.stages.groups1}/>}
                        {this.state.tabActive === 5 && <Playoffs year={this.props.match.params.seasonNum}/>}

                    </Box>

                </Paper>
            ) : (
                <span></span>
            )
        );
    }
}

export default Season;
