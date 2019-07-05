import React, {Component} from 'react';
import LeagueToolbar from "./LeagueToolbar";
import Button from '@material-ui/core/Button';
import {Redirect} from "react-router";

class LandingPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            seasonNum: 0,
            canCreateLeague: false,
        };
    }

    componentDidMount() {
        fetch("/rest/ops/league/can_create_season")
            .then(res => res.json())
            .then(
                (result) => {

                    this.setState(state => {
                        return {
                            ...state,
                            seasonNum: result[1],
                            canCreateLeague: result[0],
                        }
                    });

                    this.setState(state => {
                        return {
                            ...state,
                            isLoaded: true,
                            seasonNum: result.seasonNum,
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

    handleButtonClick = (event, newValue) => {
        fetch("/rest/ops/season/create", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
        })
            .then(res => res.json())
            .then(
                (result) => {

                    window.location.reload();

                    this.setState(state => {
                        return {
                            ...state,
                            canCreateLeague: false,
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
            <div>
                <LeagueToolbar pageTitle={this.state.pageTitle}/>
                {this.state.canCreateLeague ? (
                    <Button onClick={this.handleButtonClick}>Create new Season</Button>
                ) : (
                    <span>a league is currently running</span>
                )}
                {/*{this.state.seasonNum > 0 ? ( // also TODO as above*/}
                {/*    <Redirect to={"/season/"+this.state.seasonNum} />*/}
                {/*) : ''}*/}
            </div>
        );
    }
}

export default LandingPage;
