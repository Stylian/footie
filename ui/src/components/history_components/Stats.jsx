import React, {Component} from 'react';
import {
    Box,
    Paper,
    Grid,
    TableHead,
    TableRow,
    TableCell,
    TableBody
} from "@material-ui/core";

class Stats extends Component {

    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            teams: {}
        };

    }

    componentDidMount() {
        fetch("http://localhost:8080/rest/history/stats")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState(state => {
                        return {
                            ...state,
                            isLoaded: true,
                            teams: result
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

        let firstTable = {};
        let secondTable = {};
        let length = Object.keys(this.state.teams).length;
        Object.keys(this.state.teams).map((key, index) => {
            if (index < length / 2) {
                firstTable[key] = this.state.teams[key];
            } else {
                secondTable[key] = this.state.teams[key];
            }
        });

        return (
            <Box width={1800}>
                <Paper elevation={12} style={{margin: 20}}>

                    <Grid container spacing={1}>
                        <Grid item sm>
                            <table className="table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Pos</TableCell>
                                        <TableCell>Team</TableCell>
                                        <TableCell>W</TableCell>
                                        <TableCell>D</TableCell>
                                        <TableCell>L</TableCell>
                                        <TableCell>GS</TableCell>
                                        <TableCell>GC</TableCell>
                                        <TableCell>+/-</TableCell>
                                        <TableCell>Coefficients</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {Object.keys(firstTable).map((key, index) => {
                                        return (
                                            <TableRow>
                                                <TableCell align="right">{index + 1}</TableCell>
                                                <TableCell>{key}</TableCell>
                                                <TableCell align="right">{this.state.teams[key].wins}</TableCell>
                                                <TableCell align="right">{this.state.teams[key].draws}</TableCell>
                                                <TableCell align="right">{this.state.teams[key].losses}</TableCell>
                                                <TableCell align="right">{this.state.teams[key].goalsScored}</TableCell>
                                                <TableCell align="right">{this.state.teams[key].goalsConceded}</TableCell>
                                                <TableCell align="right">{this.state.teams[key].goalsScored - this.state.teams[key].goalsConceded}</TableCell>
                                                <TableCell align="right">{this.state.teams[key].points}</TableCell>
                                            </TableRow>)
                                    })}
                                </TableBody>
                            </table>
                        </Grid>

                        <Grid item sm>
                            <table className="table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Pos</TableCell>
                                        <TableCell>Team</TableCell>
                                        <TableCell>W</TableCell>
                                        <TableCell>D</TableCell>
                                        <TableCell>L</TableCell>
                                        <TableCell>GS</TableCell>
                                        <TableCell>GC</TableCell>
                                        <TableCell>+/-</TableCell>
                                        <TableCell>Coefficients</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {Object.keys(secondTable).map((key, index) => {
                                        return (
                                            <TableRow>
                                                <TableCell align="right">{length / 2 + index + 1}</TableCell>
                                                <TableCell>{key}</TableCell>
                                                <TableCell align="right">{this.state.teams[key].wins}</TableCell>
                                                <TableCell align="right">{this.state.teams[key].draws}</TableCell>
                                                <TableCell align="right">{this.state.teams[key].losses}</TableCell>
                                                <TableCell align="right">{this.state.teams[key].goalsScored}</TableCell>
                                                <TableCell align="right">{this.state.teams[key].goalsConceded}</TableCell>
                                                <TableCell align="right">{this.state.teams[key].goalsScored - this.state.teams[key].goalsConceded}</TableCell>
                                                <TableCell align="right">{this.state.teams[key].points}</TableCell>
                                            </TableRow>)
                                    })}
                                </TableBody>
                            </table>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>

        );
    }
}

export default Stats;
