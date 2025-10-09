import React, {useState} from "react";
import IconButton from '@material-ui/core/IconButton';
import save from '../icons/save.svg';
import {Card, CardContent, CardHeader, Grid, TableCell, TableHead, TableRow} from "@material-ui/core";
import {HorizontalBar, Radar} from "react-chartjs-2";
import {useDataLoader} from "../DataLoaderManager";
import PageLoader from "../PageLoader";

export default function NextGame() {

    const data = useDataLoader("/rest/next_game")
    const [homeScore, setHomeScore] = useState(0)
    const [awayScore, setAwayScore] = useState(0)
    const [editedHomeScore, setEditedHomeScore] = useState(false)
    const [editedAwayScore, setEditedAwayScore] = useState(false)

    const handleChangeScore = field => (event) => {
        let value = event.target.value;
        if (value < 0) {
            return;
        }

        if (field === "homeScore") {
            setHomeScore(value)
            setEditedHomeScore(true)
        } else {
            setAwayScore(value)
            setEditedAwayScore(true)
        }
    }
    const handleSave = (event, newValue) => {
        fetch("/rest/ops/add_game_result/" + data.game.id, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "goalsMadeByHomeTeam": homeScore,
                "goalsMadeByAwayTeam": awayScore
            })
        })
            .then(res => res.json())
            .then(
                () => window.location.reload(),
                (error) => console.error('Error:', error)
            )

    }
    const goToTeam = (event) => {
        window.location.href = "/teams/" + event.currentTarget.dataset.teamid;
    }

    if (data === null || data.game === null || data.game.id === 0) {
        return (<div></div>)
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
                                       value={editedHomeScore ? homeScore : ""}
                                       onChange={handleChangeScore('homeScore')}
                                />
                            </TableCell>
                            <TableCell align={"center"}>
                                <IconButton onClick={handleSave}>
                                    <img src={save} title={"save"}/>
                                </IconButton>
                            </TableCell>
                            <TableCell align="left">
                                <input type={'number'}
                                       className="score_field"
                                       value={editedAwayScore ? awayScore : ""}
                                       onChange={handleChangeScore('awayScore')}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="right"
                                       className={"teamClicker"}
                                       data-teamid={data.game.homeTeam.id}
                                       onClick={goToTeam}>
                                {data.game.homeTeam.name}</TableCell>
                            <TableCell></TableCell>
                            <TableCell align="left"
                                       className={"teamClicker"}
                                       data-teamid={data.game.awayTeam.id}
                                       onClick={goToTeam}>
                                {data.game.awayTeam.name}</TableCell>

                        </TableRow>
                        {data.winOdds < 0 ? null : (
                            <TableRow>
                                <TableCell align={"right"}>{data.decHomeOdds}</TableCell>
                                <TableCell align={"center"}>odds</TableCell>
                                <TableCell>{data.decAwayOdds}</TableCell>
                            </TableRow>
                        )}
                        {data.winOdds < 0 ? null : (
                            <TableRow>
                                <TableCell align={"right"}>{data.winOdds}%</TableCell>
                                <TableCell align={"center"}>chance</TableCell>
                                <TableCell>{100 - data.winOdds}%</TableCell>
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
                                                        data.homeData["radarElo"],
                                                        data.homeData["radarGoalsScoredAway"],
                                                        data.homeData["radarGoalsConcededAway"],
                                                        data.homeData["radarGoalsConceded"],
                                                        data.homeData["radarGoalsScored"],
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
                                                        data.awayData["radarElo"],
                                                        data.awayData["radarGoalsScoredAway"],
                                                        data.awayData["radarGoalsConcededAway"],
                                                        data.awayData["radarGoalsConceded"],
                                                        data.awayData["radarGoalsScored"],
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
                            <TableCell colSpan={3}>
                                <Grid container spacing={1}>
                                    <Grid item sm={6} style={{minHeight: 120, maxHeight: 120}}>
                                        <HorizontalBar
                                            data={{
                                                labels: ["", ""
                                                ],
                                                datasets: [{
                                                    data: [
                                                        data.homeData["avg goals scored"],
                                                        data.homeData["avg goals conceded"],
                                                    ],
                                                    backgroundColor: [
                                                        '#2d5cd2',
                                                        '#da2525',
                                                    ],
                                                },
                                                    {
                                                        data: [
                                                            data.homeData["avg goals scored away"],
                                                            data.homeData["avg goals conceded away"]
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
                                                    text: "" + data.homeData["avg goals scored"] + "(" +
                                                        data.homeData["avg goals scored away"] + ") - "
                                                        + data.homeData["avg goals conceded"] + "(" +
                                                        data.homeData["avg goals conceded away"] + ")",
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
                                    <Grid item sm={6} style={{minHeight: 120, maxHeight: 120}}>
                                        <HorizontalBar
                                            data={{
                                                labels: ["", ""
                                                ],
                                                datasets: [{
                                                    data: [
                                                        data.awayData["avg goals scored"],
                                                        data.awayData["avg goals conceded"],
                                                    ],
                                                    backgroundColor: [
                                                        '#abbeed',
                                                        '#f0a8a8'
                                                    ],
                                                },
                                                    {
                                                        data: [
                                                            data.awayData["avg goals scored away"],
                                                            data.awayData["avg goals conceded away"]
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
                                                    text: "" + data.awayData["avg goals scored"] + "(" +
                                                        data.awayData["avg goals scored away"] + ") - "
                                                        + data.awayData["avg goals conceded"] + "(" +
                                                        data.awayData["avg goals conceded away"] + ")",
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
                        {data.encounters.length < 1 ? null : (
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
                                                {data.encounters.map((game) => {
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
                                            {data.homeData.games5Home.map((game) => {
                                                return (
                                                    <TableRow>
                                                        <TableCell style={{minWidth: 40, maxWidth: 40}}
                                                        >{game.result.goalsMadeByHomeTeam + " - "
                                                            + game.result.goalsMadeByAwayTeam} </TableCell>
                                                        <TableCell align="left"
                                                                   className={"teamClicker"}
                                                                   data-teamid={game.awayTeam.id}
                                                                   onClick={goToTeam}>
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
                                            {data.awayData.games5Away.map((game) => {
                                                return (
                                                    <TableRow>
                                                        <TableCell style={{minWidth: 40, maxWidth: 40}}
                                                        >{game.result.goalsMadeByAwayTeam + " - "
                                                            + game.result.goalsMadeByHomeTeam} </TableCell>
                                                        <TableCell align="left"
                                                                   className={"teamClicker"}
                                                                   data-teamid={game.homeTeam.id}
                                                                   onClick={goToTeam}>
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
