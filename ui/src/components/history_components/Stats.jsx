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
import {Bar, Doughnut, HorizontalBar} from "react-chartjs-2";

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
                                                        <TableCell>GP</TableCell>
                                                        <TableCell>W</TableCell>
                                                        <TableCell>D</TableCell>
                                                        <TableCell>L</TableCell>
                                                        <TableCell>GS</TableCell>
                                                        <TableCell>GC</TableCell>
                                                        <TableCell>+/-</TableCell>
                                                        <TableCell>Coefficients</TableCell>
                                                        <TableCell>results ratio</TableCell>
                                                        <TableCell>goals per game</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {Object.keys(this.state.teams).map((key, index) => {
                                                        return (
                                                            <TableRow>
                                                                <TableCell align="right">{index + 1}</TableCell>
                                                                <TableCell>{key}</TableCell>
                                                                <TableCell
                                                                    align="right">{this.state.teams[key]["number of games played"]}</TableCell>
                                                                <TableCell
                                                                    align="right">{this.state.teams[key].stats.wins}</TableCell>
                                                                <TableCell
                                                                    align="right">{this.state.teams[key].stats.draws}</TableCell>
                                                                <TableCell
                                                                    align="right">{this.state.teams[key].stats.losses}</TableCell>
                                                                <TableCell
                                                                    align="right">{this.state.teams[key].stats.goalsScored}</TableCell>
                                                                <TableCell
                                                                    align="right">{this.state.teams[key].stats.goalsConceded}</TableCell>
                                                                <TableCell
                                                                    align="right">{this.state.teams[key].stats.goalsScored - this.state.teams[key].stats.goalsConceded}</TableCell>
                                                                <TableCell
                                                                    align="right">{Numeral(this.state.teams[key].stats.points / 1000).format('0.000')}</TableCell>
                                                                <TableCell
                                                                    align="right">
                                                                    <div style={{height: "30px", width: "30px"}}>
                                                                        <Doughnut
                                                                            data={{
                                                                                labels: ["", "", ""
                                                                                ],
                                                                                datasets: [{
                                                                                    data: [
                                                                                        this.state.teams[key]["wins"],
                                                                                        this.state.teams[key]["draws"],
                                                                                        this.state.teams[key]["losses"]
                                                                                    ],
                                                                                    backgroundColor: [
                                                                                        '#1f4093',
                                                                                        '#919294',
                                                                                        '#ab1d1d'
                                                                                    ],
                                                                                    hoverBackgroundColor: [
                                                                                        '#1f4093',
                                                                                        '#919294',
                                                                                        '#ab1d1d'
                                                                                    ]
                                                                                }],
                                                                            }}
                                                                            options={{
                                                                                tooltips: {enabled: false},
                                                                                hover: {mode: null},
                                                                                responsive: true,
                                                                                maintainAspectRatio: false,
                                                                                legend: {
                                                                                    display: false,
                                                                                },
                                                                            }}
                                                                        />
                                                                    </div>
                                                                </TableCell>
                                                                <TableCell
                                                                    align="right">
                                                                    <div style={{height: "25px", width: "100px"}}>
                                                                        <HorizontalBar
                                                                            data={{
                                                                                labels: ["", ""
                                                                                ],
                                                                                datasets: [{
                                                                                    data: [
                                                                                        this.state.teams[key]["avg goals scored"],
                                                                                        this.state.teams[key]["avg goals conceded"]
                                                                                    ],
                                                                                    backgroundColor: [
                                                                                        '#2d5cd2',
                                                                                        '#da2525'
                                                                                    ],
                                                                                    hoverBackgroundColor: [
                                                                                        '#2d5cd2',
                                                                                        '#da2525'
                                                                                    ]
                                                                                }],
                                                                            }}
                                                                            options={{
                                                                                tooltips: {enabled: false},
                                                                                hover: {mode: null},
                                                                                responsive: true,
                                                                                maintainAspectRatio: false,
                                                                                legend: {
                                                                                    display: false,
                                                                                },
                                                                                scales: {
                                                                                    yAxes: [{
                                                                                        display: false
                                                                                    }],
                                                                                    xAxes: [{
                                                                                        display: false,
                                                                                    }],
                                                                                }
                                                                            }}
                                                                        />
                                                                    </div>
                                                                </TableCell>
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
