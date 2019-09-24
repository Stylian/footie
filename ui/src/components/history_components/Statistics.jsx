import {Box, Card, CardContent, CardHeader, Grid, Paper, TableBody, TableCell, TableRow} from "@material-ui/core";
import LeagueToolbar from "../LeagueToolbar";
import React, {Component} from "react";
import {Bar, Doughnut, HorizontalBar} from "react-chartjs-2";

class Statistics extends Component {

    constructor(props) {
        super(props);

        this.state = {
            gameStats: {},
            isLoaded: false
        };

    }

    componentDidMount() {
        fetch("/rest/history/statistics")
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

    render() {
        return (
            this.state.isLoaded ? (
                <Paper style={{margin: 20}} elevation={20}>
                    <LeagueToolbar pageTitle={"League Stats"}/>
                    <Box width={1200}>
                        <Grid container spacing={1}>
                            <Grid item sm={4}>
                                <Card style={{margin: 20}}>
                                    <CardHeader title={"league stats"} align={"center"}
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
                                                    position: "top",
                                                    text: "results of " + this.state.gameStats["number of games played"] + " games",
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
                                        <div style={{width: 330}} >
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
                                        <div style={{width: 330}} >
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
                            <Grid item sm={4}>
                                <Card style={{margin: 20}}>
                                    <CardHeader title={"scores stats"} align={"center"}
                                                titleTypographyProps={{variant: 'h7'}}
                                    />
                                    <CardContent>
                                        <div style={{height: (50 + 15 * Object.keys(this.state.gameStats["results_frequency"]).length) }} >
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
                                                                stepSize: 10,
                                                            },
                                                        }],
                                                    }
                                                }}
                                            />
                                        </div>

                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            ) : (null)
        )
    }
}

export default Statistics;