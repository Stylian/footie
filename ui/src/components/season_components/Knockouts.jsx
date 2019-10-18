import React, {Component} from 'react';
import {AppBar, Box, Tab, Tabs} from "@material-ui/core";
import GroupsSeeding from "./groups_components/GroupsSeeding";
import GroupsMatches from "./groups_components/GroupsMatches";
import GroupsDisplay from "./groups_components/GroupsDisplay";
import Rules from "./knockout_components/Rules";
import Playoffs from "./Playoffs";
import KnockoutOdds from "./knockout_components/KnockoutOdds";

class Knockouts extends Component {

    constructor(props) {
        super(props);

        this.state = {
            tabActive: 0,
            isLoaded: false
        };

    }

    componentDidMount() {
        fetch("/rest/persist/tabs/knockouts/" + this.props.year)
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

        fetch("/rest/persist/tabs/knockouts/" + this.props.year, {
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
                            <Tab label="Brackets"/>
                            <Tab label="Rules"/>
                            <Tab label="Odds"/>
                        </Tabs>
                    </AppBar>

                    {this.state.tabActive === 0 && <Playoffs year={this.props.year} round={1}/>}
                    {this.state.tabActive === 1 && <Rules/>}
                    {this.state.tabActive === 2 && <KnockoutOdds year={this.props.year}/>}
                </Box>
            ) : (
                <span></span>
            )
        );
    }
}


export default Knockouts;
