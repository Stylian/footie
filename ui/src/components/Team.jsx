import React, {Component} from "react";
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Grid, ListItemIcon,
    Paper,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from "@material-ui/core";
import LeagueToolbar from "./LeagueToolbar";

import silvermedal from "../icons/silvermedal.png";
import goldmedal from "../icons/goldmedal.png";
import {Doughnut, HorizontalBar} from "react-chartjs-2";

class Team extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            team: {
                "id": -1,
                "name": "",
                "completeStats": {
                    "id": -1,
                    "points": 0,
                    "wins": 0,
                    "draws": 0,
                    "losses": 0,
                    "goalsScored": 0,
                    "goalsConceded": 0,
                    "matchesPlayed": 0,
                    "goalDifference": 0
                },
                "seasonsStats": [],
                "trophies": []
            },
            gameStats: {},
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

        fetch("/rest/history/statistics/teams/" + this.props.match.params.teamId)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState(state => {
                        return {
                            ...state,
                            isLoaded: true,
                            gameStats: result
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

    goToSeason = (event, newValue) => {
        window.location.href = "/season/" + event.currentTarget.dataset.season;
    }

    render() {
        return (
            this.state.isLoaded ? (
                <Box >
                    <Paper style={{margin: 20}} elevation={20}>
                        <LeagueToolbar pageTitle={this.state.team.name}/>

                        <Box width={1300} style={{margin: 20}}>
                            <Grid container spacing={1}>
                                <Grid item sm={8}>
                                    <Card style={{margin: 20}}>
                                        <CardHeader title={"All Stats"} align={"center"}
                                                    titleTypographyProps={{variant: 'h7'}}
                                        />
                                        <CardContent>
                                            <table className="table" align={"center"}>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell></TableCell>
                                                        <TableCell>Coefficients</TableCell>
                                                        <TableCell>Matches Played</TableCell>
                                                        <TableCell>W</TableCell>
                                                        <TableCell>D</TableCell>
                                                        <TableCell>L</TableCell>
                                                        <TableCell>GS</TableCell>
                                                        <TableCell>GC</TableCell>
                                                        <TableCell>+/-</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {this.state.team.seasonsStats.map((seasonStats, index) => {
                                                        return seasonStats.matchesPlayed > 0 ? (
                                                            <TableRow className={"teamClicker"} onClick={this.goToSeason}
                                                                      data-season={index+1}
                                                            >
                                                                <TableCell
                                                                    align="right">{"Season " + (index + 1)}</TableCell>
                                                                <TableCell
                                                                    align="right">{seasonStats.points}</TableCell>
                                                                <TableCell
                                                                    align="right">{seasonStats.matchesPlayed}</TableCell>
                                                                <TableCell align="right">{seasonStats.wins}</TableCell>
                                                                <TableCell align="right">{seasonStats.draws}</TableCell>
                                                                <TableCell
                                                                    align="right">{seasonStats.losses}</TableCell>
                                                                <TableCell
                                                                    align="right">{seasonStats.goalsScored}</TableCell>
                                                                <TableCell
                                                                    align="right">{seasonStats.goalsConceded}</TableCell>
                                                                <TableCell
                                                                    align="right">{seasonStats.goalDifference}</TableCell>
                                                            </TableRow>
                                                        ) : (
                                                            <TableRow className={"teamClicker"} onClick={this.goToSeason}
                                                                      data-season={index+1}
                                                            >
                                                                <TableCell
                                                                    align="right">{"Season " + (index + 1)}</TableCell>
                                                                <TableCell></TableCell>
                                                                <TableCell></TableCell>
                                                                <TableCell></TableCell>
                                                                <TableCell></TableCell>
                                                                <TableCell></TableCell>
                                                                <TableCell></TableCell>
                                                                <TableCell></TableCell>
                                                                <TableCell></TableCell>
                                                            </TableRow>
                                                        )
                                                    })}
                                                    <TableRow>
                                                        <TableCell align="right"
                                                                   className={"points_td"}>Total</TableCell>
                                                        <TableCell align="right"
                                                                   className={"points_td"}>{this.state.team.completeStats.points}</TableCell>
                                                        <TableCell align="right"
                                                                   className={"points_td"}>{this.state.team.completeStats.matchesPlayed}</TableCell>
                                                        <TableCell align="right"
                                                                   className={"points_td"}>{this.state.team.completeStats.wins}</TableCell>
                                                        <TableCell align="right"
                                                                   className={"points_td"}>{this.state.team.completeStats.draws}</TableCell>
                                                        <TableCell align="right"
                                                                   className={"points_td"}>{this.state.team.completeStats.losses}</TableCell>
                                                        <TableCell align="right"
                                                                   className={"points_td"}>{this.state.team.completeStats.goalsScored}</TableCell>
                                                        <TableCell align="right"
                                                                   className={"points_td"}>{this.state.team.completeStats.goalsConceded}</TableCell>
                                                        <TableCell align="right"
                                                                   className={"points_td"}>{this.state.team.completeStats.goalDifference}</TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </table>
                                        </CardContent>
                                    </Card>
                                </Grid>

                                <Grid item sm={4}>
                                    <Grid container spacing={1}>
                                        <Grid item sm={12}>
                                            <Card style={{margin: 20}}>
                                                <CardHeader title={"Trophies"} align={"center"}
                                                            titleTypographyProps={{variant: 'h7'}}
                                                />
                                                <CardContent>
                                                    {this.state.team.trophies.length > 0 ? (
                                                        <table className="table" align={"center"}>
                                                            {this.state.team.trophies.map((trophy, index) => {
                                                                return (
                                                                    <TableRow>
                                                                        <TableCell align="right">
                                                                            {trophy.type == "W" ?
                                                                                (<img src={goldmedal} title={"1st place"}/>) :
                                                                                (<img src={silvermedal} title={"2nd place"}/>)}
                                                                        </TableCell>
                                                                        <TableCell
                                                                            align="right">{"Season " + trophy.seasonNum}</TableCell>
                                                                        <TableCell align="right">
                                                                            {trophy.type == "W" ?
                                                                                "Winner" : "Runner-up"}</TableCell>
                                                                    </TableRow>
                                                                )
                                                            })}
                                                        </table>
                                                    ) : (
                                                        <i>nothing in the trophies case</i>
                                                    )}
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                        <Grid item sm={12}>
                                            <Card style={{margin: 20}}>
                                                <CardHeader title={"Statistics"} align={"center"}
                                                            titleTypographyProps={{variant: 'h7'}}
                                                />
                                                <CardContent>
                                                    <Doughnut
                                                        data={{
                                                            labels: [
                                                                'Wins - ' + parseFloat(Math.round(100 * this.state.gameStats["wins_percent"] * 100) / 100).toFixed(0) + "%",
                                                                'Draws - ' + parseFloat(Math.round(100 * this.state.gameStats["draws_percent"] * 100) / 100).toFixed(0) + "%",
                                                                'Losses - ' + parseFloat(Math.round(100 * this.state.gameStats["losses_percent"] * 100) / 100).toFixed(0) + "%",
                                                            ],
                                                            datasets: [{
                                                                data: [
                                                                    this.state.gameStats["wins"],
                                                                    this.state.gameStats["draws"],
                                                                    this.state.gameStats["losses"]
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
                                                            responsive: true,
                                                            title: {
                                                                display: true,
                                                                position: "bottom",
                                                                text: "" + this.state.gameStats["number of games played"] + " games",
                                                                fontSize: 11,
                                                                fontColor: "#111"
                                                            },
                                                            legend: {
                                                                display: true,
                                                                position: 'right'
                                                            },
                                                        }}
                                                    />

                                                    <br/>
                                                    <div style={{height: "80px"}}>
                                                        <HorizontalBar
                                                            data={{
                                                                labels: [
                                                                    'goals scored - ' + this.state.gameStats["avg goals scored"],
                                                                    'goals conceded - ' + this.state.gameStats["avg goals conceded"],
                                                                ],
                                                                datasets: [{
                                                                    data: [
                                                                        this.state.gameStats["avg goals scored"],
                                                                        this.state.gameStats["avg goals conceded"]
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
                                                                responsive: true,
                                                                maintainAspectRatio: false,
                                                                legend: {
                                                                    display: false,
                                                                },
                                                                scales: {
                                                                    xAxes: [{
                                                                        ticks: {
                                                                            min: 0,
                                                                            max: 8
                                                                        }
                                                                    }],
                                                                }
                                                            }}
                                                        />
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Paper>
                </Box>
            ) : (
                <span></span>
            )
        );
    }

}

export default Team;
