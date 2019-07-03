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
        fetch("http://localhost:8080/rest/ops/league", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
        })
            .then(res => res.json())
            .then(
                (result) => {

                    // TODO more like if previous season finished!
                    if (result.seasonNum == 0) {
                        this.setState(state => {
                            return {
                                ...state,
                                canCreateLeague: true,
                            }
                        });
                    }

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
        fetch("http://localhost:8080/rest/ops/season/create", {
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
                Seasons number: {this.state.seasonNum}
                <br/>
                {this.state.canCreateLeague ? (
                    <Button onClick={this.handleButtonClick}>Create new Season</Button>
                ) : ''}
                {this.state.seasonNum > 0 ? ( // also TODO as above
                    <Redirect to={"/season/"+this.state.seasonNum} />
                ) : ''}
            </div>
        );
    }
}

export default LandingPage;
