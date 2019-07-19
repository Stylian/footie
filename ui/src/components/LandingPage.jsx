import React, {Component} from 'react';
import LeagueToolbar from "./LeagueToolbar";
import {Redirect} from "react-router";

class LandingPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            pageTitle: "Landing Page",
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

    render() {
        return (
            <div>
                <LeagueToolbar pageTitle={this.state.pageTitle}/>
                {this.state.seasonNum > 0 ? (
                    <Redirect to={"/season/"+this.state.seasonNum} />
                ) : ''}
            </div>
        );
    }
}

export default LandingPage;
