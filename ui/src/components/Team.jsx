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
import greenup from "../icons/green_up.png";
import reddown from "../icons/red_down.png";
import {Bar, Doughnut, HorizontalBar, Line, Radar} from "react-chartjs-2";
import dreamteam from "../icons/dreamteam.png";
import playeroftheyear from "../icons/playeroftheyear.png";

class Team extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            isLoaded2: false,
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
                            isLoaded2: true,
                            gameStats: result
                        }
                    });
                },
                (error) => {
                    this.setState(state => {
                        return {
                            ...state,
                            isLoaded2: true,
                            error
                        }
                    });
                }
            )
    }

    goToPlayer = (event, newValue) => {
        window.location.href = "/players/" + event.currentTarget.dataset.playerid;
    }

    goToSeason = (event, newValue) => {
        window.location.href = "/season/" + event.currentTarget.dataset.season;
    }

    goToTeam = (event, newValue) => {
        window.location.href = "/teams/" + event.currentTarget.dataset.teamid;
    }

    render() {

        let elos = [1200];
        let elosSeasons = ["0"];
        if (this.state.isLoaded && this.state.isLoaded2) {
            this.state.team.seasonsStats.map(function (v, k) {
                elos[elos.length] = v.elo;
                elosSeasons[elosSeasons.length] = "" + (k + 1);
            });
        }

        return (
            this.state.isLoaded && this.state.isLoaded2 ? (
                <Box>
                    <Paper style={{margin: 10}} elevation={20}>
                        <LeagueToolbar pageTitle={this.state.team.name}/>

                        <Box style={{margin: 10}}>
                            <Grid container spacing={1}>

                                <Grid item sm={3}>
                                    <Grid container spacing={1}>
                                        <Grid item sm={12}>
                                            <Card style={{margin: 10}}>
                                                <CardHeader title={"statistics"} align={"center"}
                                                            titleTypographyProps={{variant: 'h7'}}
                                                />
                                                <CardContent>
                                                    <Doughnut
                                                        data={{
                                                            labels: [
                                                                'Wins - ' + parseFloat(Math.round(100 * this.state.gameStats["wins_percent"] * 100) / 100).toFixed(0) + "%"
                                                                + " (" + parseFloat(Math.round(100 * this.state.gameStats["wins_percent_away"] * 100) / 100).toFixed(0) + "%)",
                                                                'Draws - ' + parseFloat(Math.round(100 * this.state.gameStats["draws_percent"] * 100) / 100).toFixed(0) + "%"
                                                                + " (" + parseFloat(Math.round(100 * this.state.gameStats["draws_percent_away"] * 100) / 100).toFixed(0) + "%)",
                                                                'Losses - ' + parseFloat(Math.round(100 * this.state.gameStats["losses_percent"] * 100) / 100).toFixed(0) + "%"
                                                                + " (" + parseFloat(Math.round(100 * this.state.gameStats["losses_percent_away"] * 100) / 100).toFixed(0) + "%)",
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
                                                            },
                                                                {
                                                                    data: [
                                                                        this.state.gameStats["winsAway"],
                                                                        this.state.gameStats["drawsAway"],
                                                                        this.state.gameStats["lossesAway"]
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
                                                            responsive: true,
                                                            title: {
                                                                display: true,
                                                                position: "top",
                                                                text: "results of " + this.state.gameStats["number of games played"]
                                                                    + " (" + this.state.gameStats["number of games played away"] + ") games",
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
                                                    <div style={{height: "120px"}}>
                                                        <HorizontalBar
                                                            data={{
                                                                labels: [
                                                                    'scored - ' + this.state.gameStats["avg goals scored"] + " (" + this.state.gameStats["avg goals scored away"] + ")",
                                                                    'conceded - ' + this.state.gameStats["avg goals conceded"] + " (" + this.state.gameStats["avg goals conceded away"] + ")"
                                                                ],
                                                                datasets: [{
                                                                    data: [
                                                                        this.state.gameStats["avg goals scored"],
                                                                        this.state.gameStats["avg goals conceded"],
                                                                    ],
                                                                    backgroundColor: [
                                                                        '#2d5cd2',
                                                                        '#da2525',
                                                                    ],
                                                                    hoverBackgroundColor: [
                                                                        '#2d5cd2',
                                                                        '#da2525',
                                                                    ]
                                                                },
                                                                    {
                                                                        data: [
                                                                            this.state.gameStats["avg goals scored away"],
                                                                            this.state.gameStats["avg goals conceded away"]
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
                                                                responsive: true,
                                                                maintainAspectRatio: false,
                                                                legend: {
                                                                    display: false,
                                                                },
                                                                title: {
                                                                    display: true,
                                                                    position: "top",
                                                                    text: "average goals",
                                                                    fontSize: 11,
                                                                    fontColor: "#111"
                                                                },
                                                                scales: {
                                                                    xAxes: [{
                                                                        ticks: {
                                                                            min: 0,
                                                                            max: 8,
                                                                            stepSize: 1,
                                                                        },
                                                                        barPercentage: 1
                                                                    }],
                                                                }
                                                            }}
                                                        />
                                                    </div>

                                                    <br/>
                                                    <div style={{width: 330}}>
                                                        <Bar
                                                            data={{
                                                                labels: [
                                                                    ...Object.keys(this.state.gameStats["home_goals_frequency"]),
                                                                ],
                                                                datasets: [{
                                                                    data: [
                                                                        ...Object.values(this.state.gameStats["home_goals_frequency"])
                                                                    ],
                                                                    backgroundColor: '#2d5cd2',
                                                                    hoverBackgroundColor: '#2d5cd2',
                                                                }],
                                                            }}
                                                            options={{
                                                                responsive: true,
                                                                maintainAspectRatio: false,
                                                                legend: {
                                                                    display: false,
                                                                },
                                                                title: {
                                                                    display: true,
                                                                    position: "top",
                                                                    text: "goals scored",
                                                                    fontSize: 11,
                                                                    fontColor: "#111"
                                                                },
                                                                scales: {
                                                                    xAxes: [{
                                                                        ticks: {
                                                                            min: 0,
                                                                        },
                                                                        barPercentage: 0.6
                                                                    }],
                                                                }
                                                            }}
                                                        />
                                                    </div>

                                                    <br/>
                                                    <div style={{width: 330}}>
                                                        <Bar
                                                            data={{
                                                                labels: [
                                                                    ...Object.keys(this.state.gameStats["away_goals_frequency"]),
                                                                ],
                                                                datasets: [{
                                                                    data: [
                                                                        ...Object.values(this.state.gameStats["away_goals_frequency"])
                                                                    ],
                                                                    backgroundColor: '#da2525',
                                                                    hoverBackgroundColor: '#da2525',
                                                                }],
                                                            }}
                                                            options={{
                                                                responsive: true,
                                                                maintainAspectRatio: false,
                                                                legend: {
                                                                    display: false,
                                                                },
                                                                title: {
                                                                    display: true,
                                                                    position: "top",
                                                                    text: "goals conceded",
                                                                    fontSize: 11,
                                                                    fontColor: "#111"
                                                                },
                                                                scales: {
                                                                    xAxes: [{
                                                                        ticks: {
                                                                            min: 0,
                                                                        },
                                                                        barPercentage: 0.6
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
                                <Grid item sm={3}>
                                    <Grid container>
                                        <Grid item sm={12}>
                                            <Card style={{margin: 10}}>
                                                <CardHeader title={"scores stats"} align={"center"}
                                                            titleTypographyProps={{variant: 'h7'}}
                                                />
                                                <CardContent>
                                                    <div
                                                        style={{height: (50 + 10 * Object.keys(this.state.gameStats["results_frequency"]).length)}}>
                                                        <HorizontalBar
                                                            data={{
                                                                labels: [
                                                                    ...Object.keys(this.state.gameStats["results_frequency"]),
                                                                ],
                                                                datasets: [{
                                                                    data: [
                                                                        ...Object.values(this.state.gameStats["results_frequency"])
                                                                    ],
                                                                    backgroundColor: '#2d5cd2',
                                                                    hoverBackgroundColor: '#2d5cd2',
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
                                                                            stepSize: 1,
                                                                        }
                                                                    }],
                                                                }
                                                            }}
                                                        />
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                        <Grid item sm={12}>
                                            <Card style={{margin: 10}}>
                                                <CardHeader title={"elo progression"} align={"center"}
                                                            titleTypographyProps={{variant: 'h7'}}
                                                />
                                                <CardContent
                                                    style={{minHeight: 90, maxHeight: 90, "padding-bottom": 50}}>
                                                    {(elos[elos.length - 1] == elos[elos.length - 2]) ? (null) : (
                                                        <img
                                                            src={(elos[elos.length - 1] > elos[elos.length - 2]) ? greenup : reddown}
                                                            style={{float: "left"}}/>)}
                                                    <div style={{
                                                        float: "left",
                                                        color: "#111",
                                                        "font-size": 18,
                                                        "margin-bottom": 10,
                                                        "font-weight": "bold"
                                                    }}
                                                    >{" " + elos[elos.length - 1]}</div>
                                                    <Line
                                                        data={{
                                                            labels: [
                                                                ...elosSeasons
                                                            ],
                                                            datasets: [{
                                                                data: [
                                                                    ...elos
                                                                ],
                                                                backgroundColor: '#2d5cd2',
                                                                hoverBackgroundColor: '#2d5cd2',
                                                            }],
                                                        }}
                                                        options={{
                                                            responsive: true,
                                                            maintainAspectRatio: false,
                                                            legend: {
                                                                display: false,
                                                            },
                                                            scales: {
                                                                yAxes: [{
                                                                    ticks: {
                                                                        min: 1100,
                                                                        maz: 1300,
                                                                        stepSize: 50,
                                                                    }
                                                                }],
                                                            },
                                                            elements: {
                                                                point: {
                                                                    radius: 0
                                                                }
                                                            }
                                                        }}
                                                    />
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                        <Grid item sm={12}>
                                            <Card style={{margin: 10}}>
                                                <CardHeader title={"last 5 games"} align={"center"}
                                                            titleTypographyProps={{variant: 'h7'}}
                                                />
                                                <CardContent style={{minHeight: 200, maxHeight: 200}}>
                                                    <Grid container spacing={1}>
                                                        <Grid item sm={6}>
                                                            <table className="table" align={"center"}>
                                                                <TableHead>
                                                                    <TableRow>
                                                                        <TableCell colSpan={2}
                                                                                   align={"center"}>Home</TableCell>
                                                                    </TableRow>
                                                                </TableHead>
                                                                {this.state.gameStats.games5Home.map((game, index) => {
                                                                    return (
                                                                        <TableRow>
                                                                            <TableCell
                                                                                style={{minWidth: 40, maxWidth: 40}}
                                                                            >{game.result.goalsMadeByHomeTeam + " - "
                                                                            + game.result.goalsMadeByAwayTeam} </TableCell>
                                                                            <TableCell align="left"
                                                                                       className={"teamClicker"}
                                                                                       data-teamid={game.awayTeam.id}
                                                                                       onClick={this.goToTeam}>
                                                                                {game.awayTeam.name}</TableCell>
                                                                        </TableRow>
                                                                    )
                                                                })}
                                                            </table>
                                                        </Grid>
                                                        <Grid item sm={6}>
                                                            <table className="table" align={"center"}>
                                                                <TableHead>
                                                                    <TableRow>
                                                                        <TableCell colSpan={2}
                                                                                   align={"center"}>Away</TableCell>
                                                                    </TableRow>
                                                                </TableHead>
                                                                {this.state.gameStats.games5Away.map((game, index) => {
                                                                    return (
                                                                        <TableRow>
                                                                            <TableCell
                                                                                style={{minWidth: 40, maxWidth: 40}}
                                                                            >{game.result.goalsMadeByAwayTeam + " - "
                                                                            + game.result.goalsMadeByHomeTeam} </TableCell>
                                                                            <TableCell align="left"
                                                                                       className={"teamClicker"}
                                                                                       data-teamid={game.homeTeam.id}
                                                                                       onClick={this.goToTeam}>
                                                                                {game.homeTeam.name}</TableCell>
                                                                        </TableRow>
                                                                    )
                                                                })}
                                                            </table>
                                                        </Grid>
                                                    </Grid>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    </Grid>

                                </Grid>
                                <Grid item sm={4}>
                                    <Grid container spacing={1}>
                                        <Grid item sm={12}>
                                            <Grid container spacing={1}>
                                                <Grid item sm={6}>
                                                    <Card style={{margin: 10}}>
                                                        <CardHeader title={"trophies"} align={"center"}
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
                                                                                        (<img src={goldmedal}
                                                                                              title={"1st place"}/>) :
                                                                                        (<img src={silvermedal}
                                                                                              title={"2nd place"}/>)}
                                                                                </TableCell>
                                                                                <TableCell
                                                                                    className={"teamClicker"}
                                                                                    onClick={this.goToSeason}
                                                                                    data-season={trophy.seasonNum}
                                                                                    align="right">{"Season " + trophy.seasonNum}</TableCell>
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
                                                <Grid item sm={6}>
                                                    <Card style={{margin: 10}}>
                                                        <CardHeader title={"team overview"} align={"center"}
                                                                    titleTypographyProps={{variant: 'h7'}}
                                                        />
                                                        <CardContent>
                                                            <Radar
                                                                data={{
                                                                    labels: [
                                                                        "Elo",
                                                                        "Away Attack",
                                                                        "Away Defence",
                                                                        "Defence",
                                                                        "Attack",
                                                                    ],
                                                                    datasets: [{
                                                                        data: [
                                                                            this.state.gameStats["radarElo"],
                                                                            this.state.gameStats["radarGoalsScoredAway"],
                                                                            this.state.gameStats["radarGoalsConcededAway"],
                                                                            this.state.gameStats["radarGoalsConceded"],
                                                                            this.state.gameStats["radarGoalsScored"],
                                                                        ],
                                                                        backgroundColor: '#2d5cd2',
                                                                        hoverBackgroundColor: '#2d5cd2',
                                                                    }],
                                                                }}
                                                                options={{
                                                                    responsive: true,
                                                                    maintainAspectRatio: false,
                                                                    legend: {
                                                                        display: false,
                                                                    },
                                                                    scale: {
                                                                        ticks: {
                                                                            beginAtZero: true,
                                                                            max: 100,
                                                                            min: 0,
                                                                            display: false,
                                                                            stepSize: 20
                                                                        },
                                                                    },
                                                                    elements: {
                                                                        point: {
                                                                            radius: 0
                                                                        }
                                                                    }
                                                                }}
                                                            />
                                                        </CardContent>
                                                    </Card>
                                                </Grid>
                                            </Grid>
                                            <Grid item sm={12}>
                                                <Card style={{margin: 10}}>
                                                    <CardHeader title={"season stats"} align={"center"}
                                                                titleTypographyProps={{variant: 'h7'}}
                                                    />
                                                    <CardContent>
                                                        <table className="table" align={"center"}>
                                                            <TableHead>
                                                                <TableRow>
                                                                    <TableCell>Season</TableCell>
                                                                    <TableCell>Coeffs</TableCell>
                                                                    <TableCell>Elo</TableCell>
                                                                    <TableCell>GP</TableCell>
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
                                                                        <TableRow className={"teamClicker"}
                                                                                  onClick={this.goToSeason}
                                                                                  data-season={index + 1}
                                                                        >
                                                                            <TableCell
                                                                                align="right">{"" + (index + 1)}</TableCell>
                                                                            <TableCell
                                                                                align="right">{seasonStats.points}</TableCell>
                                                                            <TableCell
                                                                                align="right">{seasonStats.elo}</TableCell>
                                                                            <TableCell
                                                                                align="right">{seasonStats.matchesPlayed}</TableCell>
                                                                            <TableCell
                                                                                align="right">{seasonStats.wins}</TableCell>
                                                                            <TableCell
                                                                                align="right">{seasonStats.draws}</TableCell>
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
                                                                        <TableRow className={"teamClicker"}
                                                                                  onClick={this.goToSeason}
                                                                                  data-season={index + 1}
                                                                        >
                                                                            <TableCell
                                                                                align="right">{"" + (index + 1)}</TableCell>
                                                                            <TableCell></TableCell>
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
                                                                               className={"points_td"}></TableCell>
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
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item sm={2}>
                                    <Card style={{margin: 10}}>
                                        <CardHeader title={"players"} align={"center"}
                                                    titleTypographyProps={{variant: 'h7'}}
                                        />
                                        <CardContent>
                                            <table className="table" align={"center"}>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell style={{ minWidth: 100, maxWidth: 100}}>Player</TableCell>
                                                        <TableCell><img src={playeroftheyear} title={"player of the year"}/></TableCell>
                                                        <TableCell> <img src={dreamteam} title={"selected in a dream team"}/></TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {this.state.team.players.map((player, index) => {
                                                        return (
                                                            <TableRow className={"teamClicker"}
                                                                      onClick={this.goToPlayer}
                                                                      data-playerid={player.id}
                                                            >
                                                                <TableCell
                                                                    align="right">{player.name}</TableCell>
                                                                <TableCell align={"center"}>{player.playerOfTheYearTrophies}</TableCell>
                                                                <TableCell align={"center"}>{player.dreamTeamTrophies}</TableCell>
                                                            </TableRow>
                                                            )})}
                                                </TableBody>
                                            </table>
                                        </CardContent>
                                    </Card>
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
