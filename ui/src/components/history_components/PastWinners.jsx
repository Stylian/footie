import React, {Component} from 'react';
import {Box, Grid, Paper, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";

class PastWinners extends Component {

    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            seasons: [],
        };

    }

    componentDidMount() {
        fetch("/rest/history/past_winners")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState(state => {
                        return {
                            ...state,
                            isLoaded: true,
                            seasons: result
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

    goToTeam = (event, newValue) => {
        window.location.href = "/teams/" + event.currentTarget.dataset.teamid;
    }

    render() {

        return (
            <Box width={500}>
                <Paper elevation={12} style={{margin: 20}}>
                    <Grid container spacing={1}>
                        <Grid item sm>
                            <table className="table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Season</TableCell>
                                        <TableCell>Winner</TableCell>
                                        <TableCell>Runner-up</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.seasons.map((item, index) =>
                                            <TableRow>
                                                <TableCell align="right">{item.seasonYear}</TableCell>
                                                <TableCell align="left" className={"teamClicker"}
                                                           data-teamid={item.winner.id}
                                                           onClick={this.goToTeam}>
                                                    {item.winner != null ? item.winner.name : ""}</TableCell>
                                                <TableCell align="left" className={"teamClicker"}
                                                           data-teamid={item.runnerUp.id}
                                                           onClick={this.goToTeam}>
                                                    {item.runnerUp != null ? item.runnerUp.name : ""}</TableCell>
                                            </TableRow>
                                    )}
                                </TableBody>
                            </table>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>

        );
    }
}

export default PastWinners;
