import {Box, Card, CardContent, CardHeader, Grid, Paper, TableBody, TableCell, TableRow} from "@material-ui/core";
import LeagueToolbar from "../LeagueToolbar";
import React, {Component} from "react";
import {Doughnut, HorizontalBar} from "react-chartjs-2";

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
                    <Box width={1100}>
                        <Grid container spacing={1}>
                            <Grid item sm={4}>
                                <Card style={{margin: 20}}>
                                    <CardHeader title={"League Stats"} align={"center"}
                                                titleTypographyProps={{variant: 'h7'}}
                                    />
                                    <CardContent>
                                        <Doughnut
                                            data={{
                                                labels: [
                                                    'Wins - ' + 100 * this.state.gameStats["wins_percent"] + "%",
                                                    'Draws - ' + 100 * this.state.gameStats["draws_percent"] + "%",
                                                    'Losses - ' + 100 * this.state.gameStats["losses_percent"] + "%",
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