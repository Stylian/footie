import React, {Component} from 'react';
import {
    Box,
    Paper,
    Grid,
    TableHead,
    TableRow,
    TableCell,
    TableBody, CardHeader, CardContent, Card
} from "@material-ui/core";
import Numeral from "numeral";

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
        fetch("/rest/history/stats")
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

    goToTeam = (event, newValue) => {
        window.location.href = "/teams/" + event.currentTarget.dataset.teamid;
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
            <Box width={1300}>
                <Paper elevation={12} style={{margin: 20}}>
                    <Grid container spacing={1}>
                        <Grid item sm={12}>
                            <Card style={{margin: 20}}>
                                <CardHeader title={"Stats"} align={"center"}
                                            titleTypographyProps={{variant: 'h7'}}
                                />
                                <CardContent>

                                    <Grid container spacing={1}>
                                        <Grid item sm={6}>
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
                                                                <TableCell
                                                                    align="right">{this.state.teams[key].wins}</TableCell>
                                                                <TableCell
                                                                    align="right">{this.state.teams[key].draws}</TableCell>
                                                                <TableCell
                                                                    align="right">{this.state.teams[key].losses}</TableCell>
                                                                <TableCell
                                                                    align="right">{this.state.teams[key].goalsScored}</TableCell>
                                                                <TableCell
                                                                    align="right">{this.state.teams[key].goalsConceded}</TableCell>
                                                                <TableCell
                                                                    align="right">{this.state.teams[key].goalsScored - this.state.teams[key].goalsConceded}</TableCell>
                                                                <TableCell
                                                                    align="right">{Numeral(this.state.teams[key].points/1000).format('0.000')}</TableCell>
                                                            </TableRow>)
                                                    })}
                                                </TableBody>
                                            </table>
                                        </Grid>

                                        <Grid item sm={6}>
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
                                                                <TableCell
                                                                    align="right">{Object.keys(firstTable).length + index + 1}</TableCell>
                                                                <TableCell>{key}</TableCell>
                                                                <TableCell
                                                                    align="right">{this.state.teams[key].wins}</TableCell>
                                                                <TableCell
                                                                    align="right">{this.state.teams[key].draws}</TableCell>
                                                                <TableCell
                                                                    align="right">{this.state.teams[key].losses}</TableCell>
                                                                <TableCell
                                                                    align="right">{this.state.teams[key].goalsScored}</TableCell>
                                                                <TableCell
                                                                    align="right">{this.state.teams[key].goalsConceded}</TableCell>
                                                                <TableCell
                                                                    align="right">{this.state.teams[key].goalsScored - this.state.teams[key].goalsConceded}</TableCell>
                                                                <TableCell
                                                                    align="right">{Numeral(this.state.teams[key].points/1000).format('0.000')}</TableCell>
                                                            </TableRow>)
                                                    })}
                                                </TableBody>
                                            </table>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>

        );
    }
}

export default Stats;
