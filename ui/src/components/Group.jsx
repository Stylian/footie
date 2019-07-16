import React, {Component} from "react";
import {Box, Paper} from "@material-ui/core";
import LeagueToolbar from "./LeagueToolbar";

class Group extends Component {

    constructor(props) {
        super(props);

        this.state = {
            group: {name: null},
        };

    }

    componentDidMount() {
        fetch("/rest/groups/" + this.props.match.params.groupId)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState(state => {

                        return {
                            ...state,
                            group: result,
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
                <LeagueToolbar pageTitle={this.state.group.name} />

                <Box style={{margin: 20}} >

                </Box>
            </Paper>
        );
    }

}

export default Group;
