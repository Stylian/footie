import React, {Component} from 'react';
import {AppBar, Box, Paper, Tab, Tabs} from "@material-ui/core";
import QualsSeeding from "./quals_components/QualsSeeding";
import QualsMatches from "./quals_components/QualsMatches";

class Quals extends Component {

    constructor(props) {
        super(props);

        this.state = {
            tabActive: 0,
            isLoaded: false
        };

    }

    componentDidMount() {
        fetch("/rest/persist/tabs/quals" + this.props.round + "/" + this.props.year)
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
    }


    handleChange = (event, newValue) => {

        fetch("/rest/persist/tabs/quals" + this.props.round + "/" + this.props.year, {
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
                <Box style={{margin: 10, "margin-top": 10}}>
                    <AppBar position="static">
                        <Tabs value={this.state.tabActive} onChange={this.handleChange}>
                            <Tab label="Seeding"/>
                            <Tab disabled={(this.props.stage === "ON_PREVIEW" || this.props.stage === "NOT_STARTED")}
                                 label="Matches"/>
                        </Tabs>
                    </AppBar>
                    {this.state.tabActive === 0 && <QualsSeeding year={this.props.year} round={this.props.round}
                                                                 haveToSetUpTeams={this.props.stage === "ON_PREVIEW"}/>}
                    {this.state.tabActive === 1 && <QualsMatches year={this.props.year} round={this.props.round}/>}
                </Box>
            ) : (
                <span></span>
            )
        );
    }
}


export default Quals;
