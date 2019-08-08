import React, {Component} from 'react';
import LeagueToolbar from "./LeagueToolbar";
import {Redirect} from "react-router";

class LandingPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            pageTitle: "Landing Page",
            currentDisplayedSeason: 0,
        };
    }

    componentDidMount() {
        fetch("/rest/seasons/")
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
        return this.state.isLoaded ?
            this.state.currentDisplayedSeason > 0 ? (
            <div>
                <LeagueToolbar pageTitle={this.state.pageTitle}/>
                    <Redirect to={"/season/"+this.state.currentDisplayedSeason} />
            </div>
            ) : (
                <div>
                    <LeagueToolbar pageTitle={this.state.pageTitle}/>
                    <Redirect to={"/admin"} />
                </div>
            )
            : (null)
    };
}

export default LandingPage;
