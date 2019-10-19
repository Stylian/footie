import React, {Component} from "react";
import IconButton from '@material-ui/core/IconButton';
import save from '../../icons/save.svg';
import {Card, CardContent, CardHeader, Grid, TableCell, TableHead, TableRow} from "@material-ui/core";
import {HorizontalBar, Radar} from "react-chartjs-2";

class NextGame extends Component {

    constructor(props) {
        super(props);

        this.state = {
            homeScore: 0,
            awayScore: 0,
            editedHome: false,
            editedAway: false,
        };

    }

    componentDidMount() {
        fetch("/rest/next_game")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState(state => {

                        return {
                            ...state,
                            data: result,
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
    }

    handleChangeScore = field => (event) => {
        let value = event.target.value;
        if (value < 0) {
            return;
        }

        if (field === "homeScore") {
            this.setState(state => {
                return {
                    ...state,
                    homeScore: value,
                    editedHome: true,
                }
            });
        } else {
            this.setState(state => {
                return {
                    ...state,
                    awayScore: value,
                    editedAway: true
                }
            });
        }

    }

    handleSave = (event, newValue) => {

        fetch("/rest/ops/add_game_result/" + this.state.data.game.id, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "goalsMadeByHomeTeam": this.state.homeScore,
                "goalsMadeByAwayTeam": this.state.awayScore
            })
        })
            .then(res => res.json())
            .then(
                (result) => {
                    window.location.reload();
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

        if (this.state.data == null || this.state.data.game == null || this.state.data.game.id == 0) {
            return <div></div>
        } else {
            return (
                <Card style={{margin: 5}}>
                    <CardHeader title={"upcoming game"} align={"center"}
                                titleTypographyProps={{variant: 'h7'}}
                    />
                    <CardContent>
                        <table className="table" align={"center"}>
                            <TableRow>
                                <TableCell align="right">
                                    <input type={'number'}
                                           className="score_field"
                                           value={this.state.editedHome ? this.state.homeScore : ""}
                                           onChange={this.handleChangeScore('homeScore')}
                                    />
                                </TableCell>
                                <TableCell align={"center"} >
                                    <IconButton onClick={this.handleSave} >
                                        <img src={save} title={"save"}/>
                                    </IconButton>
                                </TableCell>
                                <TableCell align="left">
                                    <input type={'number'}
                                           className="score_field"
                                           value={this.state.editedAway ? this.state.awayScore : ""}
                                           onChange={this.handleChangeScore('awayScore')}
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="right"
                                           className={"teamClicker"}
                                           data-teamid={this.state.data.game.homeTeam.id}
                                           onClick={this.goToTeam}>
                                    {this.state.data.game.homeTeam.name}</TableCell>
                                <TableCell></TableCell>
                                <TableCell align="left"
                                           className={"teamClicker"}
                                           data-teamid={this.state.data.game.awayTeam.id}
                                           onClick={this.goToTeam}>
                                    {this.state.data.game.awayTeam.name}</TableCell>

                            </TableRow>
                            {this.state.data.winOdds < 0 ? (null) : (
                                <TableRow>
                                    <TableCell align={"right"}>{this.state.data.decHomeOdds}</TableCell>
                                    <TableCell align={"center"}>odds</TableCell>
                                    <TableCell>{this.state.data.decAwayOdds}</TableCell>
                                </TableRow>
                            )}
                            {this.state.data.winOdds < 0 ? (null) : (
                                <TableRow>
                                    <TableCell align={"right"}>{this.state.data.winOdds}%</TableCell>
                                    <TableCell align={"center"}>promotion chance</TableCell>
                                    <TableCell>{100 - this.state.data.winOdds}%</TableCell>
                                </TableRow>
                            )}
                            <TableRow>
                                <TableCell colSpan={3}>
                                    <Grid container spacing={1}>
                                        <Grid item sm={6}>
                                            <Radar
                                                data={{
                                                    labels: [
                                                        "Elo",
                                                        "A. Att",
                                                        "A. Def",
                                                        "Def",
                                                        "Att",
                                                    ],
                                                    datasets: [{
                                                        data: [
                                                            this.state.data.homeData["radarElo"],
                                                            this.state.data.homeData["radarGoalsScoredAway"],
                                                            this.state.data.homeData["radarGoalsConcededAway"],
                                                            this.state.data.homeData["radarGoalsConceded"],
                                                            this.state.data.homeData["radarGoalsScored"],
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
                                                        pointLabels: {
                                                            fontSize: 9,
                                                        },
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
                                        </Grid>
                                        <Grid item sm={6}>
                                            <Radar
                                                data={{
                                                    labels: [
                                                        "Elo",
                                                        "A. Att",
                                                        "A. Def",
                                                        "Def",
                                                        "Att",
                                                    ],
                                                    datasets: [{
                                                        data: [
                                                            this.state.data.awayData["radarElo"],
                                                            this.state.data.awayData["radarGoalsScoredAway"],
                                                            this.state.data.awayData["radarGoalsConcededAway"],
                                                            this.state.data.awayData["radarGoalsConceded"],
                                                            this.state.data.awayData["radarGoalsScored"],
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
                                                        pointLabels: {
                                                            fontSize: 9,
                                                        },
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
                                        </Grid>
                                    </Grid>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan={3} >
                                    <Grid container spacing={1} >
                                        <Grid item sm={6} style={{ minHeight: 120, maxHeight: 120}}>
                                            <HorizontalBar
                                                data={{
                                                    labels: ["", ""
                                                    ],
                                                    datasets: [{
                                                        data: [
                                                            this.state.data.homeData["avg goals scored"],
                                                            this.state.data.homeData["avg goals conceded"],
                                                        ],
                                                        backgroundColor: [
                                                            '#2d5cd2',
                                                            '#da2525',
                                                        ],
                                                    },
                                                    {
                                                        data: [
                                                            this.state.data.homeData["avg goals scored away"],
                                                            this.state.data.homeData["avg goals conceded away"]
                                                        ],
                                                        backgroundColor: [
                                                            '#abbeed',
                                                            '#f0a8a8'
                                                        ],
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
                                                        position: "bottom",
                                                        text: "" + this.state.data.homeData["avg goals scored"] + "(" +
                                                            this.state.data.homeData["avg goals scored away"] + ") - "
                                                            + this.state.data.homeData["avg goals conceded"] + "(" +
                                                            this.state.data.homeData["avg goals conceded away"] + ")",
                                                        fontSize: 11,
                                                        fontColor: "#111"
                                                    },
                                                    scales: {
                                                        xAxes: [{
                                                            ticks: {
                                                                min: 0,
                                                                max: 6,
                                                                stepSize: 2,
                                                            },
                                                            barPercentage: 1
                                                        }],
                                                    }
                                                }}
                                            />
                                        </Grid>
                                        <Grid item sm={6} style={{ minHeight: 120, maxHeight: 120}}>
                                            <HorizontalBar
                                              data={{
                                                    labels: ["", ""
                                                    ],
                                                    datasets: [{
                                                        data: [
                                                            this.state.data.awayData["avg goals scored"],
                                                            this.state.data.awayData["avg goals conceded"],
                                                        ],
                                                        backgroundColor: [
                                                            '#abbeed',
                                                            '#f0a8a8'
                                                        ],
                                                    },
                                                    {
                                                        data: [
                                                            this.state.data.awayData["avg goals scored away"],
                                                            this.state.data.awayData["avg goals conceded away"]
                                                        ],
                                                        backgroundColor: [
                                                            '#2d5cd2',
                                                            '#da2525',
                                                        ],
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
                                                        position: "bottom",
                                                        text: "" + this.state.data.awayData["avg goals scored"] + "(" +
                                                            this.state.data.awayData["avg goals scored away"] + ") - "
                                                            + this.state.data.awayData["avg goals conceded"] + "(" +
                                                            this.state.data.awayData["avg goals conceded away"] + ")",
                                                        fontSize: 11,
                                                        fontColor: "#111"
                                                    },
                                                    scales: {
                                                        xAxes: [{
                                                            ticks: {
                                                                min: 0,
                                                                max: 6,
                                                                stepSize: 2,
                                                            },
                                                            barPercentage: 1
                                                        }],
                                                    }
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                </TableCell>
                            </TableRow>
                            {this.state.data.encounters.length < 1 ? (null) : (
                                <TableRow>
                                    <TableCell align={"center"} colSpan={3}>
                                        <table className="table" align={"center"}>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell
                                                        align={"center"}>past encounters</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableRow>
                                                <TableCell>
                                                    {this.state.data.encounters.map((game, index) => {
                                                        return game.result.goalsMadeByHomeTeam + " - "
                                                            + game.result.goalsMadeByAwayTeam
                                                    }).join(", ")}
                                                </TableCell>
                                            </TableRow>
                                        </table>
                                    </TableCell>
                                </TableRow>)}
                            <TableRow>
                                <TableCell colSpan={3}>
                                    <Grid container spacing={1}>
                                        <Grid item sm={6}>
                                            <table className="table" align={"center"}>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell colSpan={2}
                                                                   align={"center"}>last 5 games home</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                {this.state.data.homeData.games5Home.map((game, index) => {
                                                    return (
                                                        <TableRow>
                                                            <TableCell style={{minWidth: 40, maxWidth: 40}}
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
                                                                   align={"center"}>last 5 games away</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                {this.state.data.awayData.games5Away.map((game, index) => {
                                                    return (
                                                        <TableRow>
                                                            <TableCell style={{minWidth: 40, maxWidth: 40}}
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
                                </TableCell>
                            </TableRow>
                        </table>

                    </CardContent>
                </Card>
            )
        }
    }

}


export default NextGame;