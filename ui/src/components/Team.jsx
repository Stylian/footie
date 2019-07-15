import React, {Component} from "react";
import {Box, Paper} from "@material-ui/core";
import LeagueToolbar from "./LeagueToolbar";

class Team extends Component {

    constructor(props) {
        super(props);

        this.state = {
            team: {name: null},
        };

    }

    componentDidMount() {
        fetch("/rest/teams/" + this.props.match.params.teamId)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState(state => {

                        return {
                            ...state,
                            team: result,
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
            <Paper style={{margin: 20}} elevation={20}>
                <LeagueToolbar pageTitle={this.state.team.name} />

                <Box style={{margin: 20}} >

                </Box>
            </Paper>
        );
    }

}

export default Team;
