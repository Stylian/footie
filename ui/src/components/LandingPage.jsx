import React, {Component} from 'react';
import LeagueToolbar from "./LeagueToolbar";
import {Redirect} from "react-router";

class LandingPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            pageTitle: "Landing Page",
            currentDisplayedSeason: false,
        };
    }

    componentDidMount() {
        fetch("/rest/persist/property/season_year")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState(state => {
                        return {
                            ...state,
                            currentDisplayedSeason: result,
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

    render() {
        return (
            <div>
                <LeagueToolbar pageTitle={this.state.pageTitle}/>
                {this.state.currentDisplayedSeason > 0 ? (
                    <Redirect to={"/season/"+this.state.currentDisplayedSeason} />
                ) : ''}
            </div>
        );
    }
}

export default LandingPage;
