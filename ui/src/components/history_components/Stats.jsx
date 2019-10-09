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
import LeagueToolbar from "../LeagueToolbar";

const $ = require('jquery');
$.DataTable = require('datatables.net');

const leftDivider = {"border-left" : "1px solid #ddd"};

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

                    $(".table").DataTable({
                        "paging": false,
                        "searching": false,
                        "bInfo": false,
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
            <Paper style={{margin: 20}} elevation={20}>
                <LeagueToolbar pageTitle={"Teams' Stats"}/>
                <Box >
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
                                                        <TableCell className={"reorder_tab"} colSpan={10}></TableCell>
                                                        <TableCell className={"reorder_tab"} colSpan={4} style={leftDivider}
                                                            align={"center"}>home stats</TableCell>
                                                        <TableCell className={"reorder_tab"} colSpan={4} style={leftDivider}
                                                            align={"center"}>away stats</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell className={"reorder_tab"}>Pos</TableCell>
                                                        <TableCell className={"reorder_tab"}>Team</TableCell>
                                                        <TableCell className={"reorder_tab"}>GP</TableCell>
                                                        <TableCell className={"reorder_tab"}>W</TableCell>
                                                        <TableCell className={"reorder_tab"}>D</TableCell>
                                                        <TableCell className={"reorder_tab"}>L</TableCell>
                                                        <TableCell className={"reorder_tab"}>GS</TableCell>
                                                        <TableCell className={"reorder_tab"}>GC</TableCell>
                                                        <TableCell className={"reorder_tab"}>+/-</TableCell>
                                                        <TableCell className={"reorder_tab"}>Coefficients</TableCell>
                                                        <TableCell className={"reorder_tab"}>Elo</TableCell>
                                                        <TableCell className={"reorder_tab"} style={leftDivider}>results ratio</TableCell>
                                                        <TableCell className={"reorder_tab"}>avg gs</TableCell>
                                                        <TableCell className={"reorder_tab"}>avg gc</TableCell>
                                                        <TableCell className={"reorder_tab"}>goals per game</TableCell>
                                                        <TableCell className={"reorder_tab"} style={leftDivider}>results ratio</TableCell>
                                                        <TableCell className={"reorder_tab"}>avg gs</TableCell>
                                                        <TableCell className={"reorder_tab"}>avg gc</TableCell>
                                                        <TableCell className={"reorder_tab"}>goals per game</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {Object.keys(this.state.teams).map((key, index) => {
                                                        return (
                                                            <TableRow
                                                                style={{backgroundColor: '#fff'}}
                                                                className={"teamClicker"}
                                                                data-teamid={this.state.teams[key]["teamObject"].id}
                                                                onClick={this.goToTeam}>
                                                                <TableCell align="right">{index + 1}</TableCell>
                                                                <TableCell style={{minWidth:400, maxWidth:400}} >{key}</TableCell>
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
                                                                    align="right">{this.state.teams[key].stats.elo}</TableCell>
                                                                <TableCell style={leftDivider}
                                                                    align="right" data-order={
                                                                    this.state.teams[key]["wins_percent"]
                                                                }>
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
                                                                    align="right">{this.state.teams[key]["avg goals scored"]}</TableCell>
                                                                <TableCell
                                                                    align="right">{this.state.teams[key]["avg goals conceded"]}</TableCell>
                                                                <TableCell align="right" data-order={
                                                                    this.state.teams[key]["avg goals scored"]
                                                                }>
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
                                                                                        ticks: {
                                                                                            min: 0,
                                                                                            max: 6
                                                                                        },
                                                                                    }],
                                                                                }
                                                                            }}
                                                                        />
                                                                    </div>
                                                                </TableCell>
                                                                <TableCell style={leftDivider}
                                                                    align="right" data-order={
                                                                    this.state.teams[key]["wins_percent_away"]
                                                                }>
                                                                    <div style={{height: "30px", width: "30px"}}>
                                                                        <Doughnut
                                                                            data={{
                                                                                labels: ["", "", ""
                                                                                ],
                                                                                datasets: [{
                                                                                    data: [
                                                                                        this.state.teams[key]["winsAway"],
                                                                                        this.state.teams[key]["drawsAway"],
                                                                                        this.state.teams[key]["lossesAway"]
                                                                                    ],
                                                                                    backgroundColor: [
                                                                                        '#6c8de0',
                                                                                        '#d8d9d9',
                                                                                        '#e56666'
                                                                                    ],
                                                                                    hoverBackgroundColor: [
                                                                                        '#6c8de0',
                                                                                        '#d8d9d9',
                                                                                        '#e56666'
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
                                                                <TableCell align="right">{this.state.teams[key]["avg goals scored away"]}</TableCell>
                                                                <TableCell align="right">{this.state.teams[key]["avg goals conceded away"]}</TableCell>
                                                                <TableCell align="right" data-order={
                                                                    this.state.teams[key]["avg goals scored away"]
                                                                }>
                                                                    <div style={{height: "25px", width: "100px"}}>
                                                                        <HorizontalBar
                                                                            data={{
                                                                                labels: ["", ""
                                                                                ],
                                                                                datasets: [{
                                                                                    data: [
                                                                                        this.state.teams[key]["avg goals scored away"],
                                                                                        this.state.teams[key]["avg goals conceded away"]
                                                                                    ],
                                                                                    backgroundColor: [
                                                                                        '#abbeed',
                                                                                        '#f0a8a8'
                                                                                    ],
                                                                                    hoverBackgroundColor: [
                                                                                        '#abbeed',
                                                                                        '#f0a8a8'
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
                                                                                        ticks: {
                                                                                            min: 0,
                                                                                            max: 6
                                                                                        },
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
                </Box>
            </Paper>
        );
    }
}

export default Stats;
