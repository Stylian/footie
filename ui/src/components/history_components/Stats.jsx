import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Grid,
    Paper,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from "@material-ui/core"
import Numeral from "numeral"
import {Doughnut, HorizontalBar} from "react-chartjs-2"
import LeagueToolbar from "../LeagueToolbar"
import {useDataLoader} from "../../DataLoaderManager"

const $ = require('jquery')
$.DataTable = require('datatables.net')
const leftDivider = {"border-left": "1px solid #ddd"}
export default function Stats() {
    const teams = useDataLoader("/rest/history/stats", () => {
        $(".table").DataTable({
            "paging": false,
            "searching": false,
            "bInfo": false,
        })
    })
    const goToTeam = (event) =>  window.location.href = "/teams/" + event.currentTarget.dataset.teamid

    if (teams === null) {
        return (<div>Loading...</div>)
    } else {
        return (
            <Paper style={{margin: 20}} elevation={20}>
                <LeagueToolbar pageTitle={"Teams' Stats"}/>
                <Box>
                    <Grid container spacing={1}>
                        <Grid item sm={12}>
                            <Card style={{margin: 20}}>
                                <CardHeader title={"Stats"} align={"center"} titleTypographyProps={{variant: 'h7'}}/>
                                <CardContent>
                                    <Grid container spacing={1}>
                                        <Grid item sm={6}>
                                            <table className="table">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell className={"reorder_tab"} colSpan={11}></TableCell>
                                                        <TableCell className={"reorder_tab"} colSpan={4}
                                                                   style={leftDivider}
                                                                   align={"center"}>home stats</TableCell>
                                                        <TableCell className={"reorder_tab"} colSpan={4}
                                                                   style={leftDivider}
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
                                                        <TableCell className={"reorder_tab"} style={leftDivider}>results
                                                            ratio</TableCell>
                                                        <TableCell className={"reorder_tab"}>avg gs</TableCell>
                                                        <TableCell className={"reorder_tab"}>avg gc</TableCell>
                                                        <TableCell className={"reorder_tab"}>goals per game</TableCell>
                                                        <TableCell className={"reorder_tab"} style={leftDivider}>results
                                                            ratio</TableCell>
                                                        <TableCell className={"reorder_tab"}>avg gs</TableCell>
                                                        <TableCell className={"reorder_tab"}>avg gc</TableCell>
                                                        <TableCell className={"reorder_tab"}>goals per game</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {Object.keys(teams).map((key, index) => {
                                                        return (
                                                            <TableRow
                                                                style={{backgroundColor: '#fff'}}
                                                                className={"teamClicker"}
                                                                data-teamid={teams[key]["teamObject"].id}
                                                                onClick={goToTeam}>
                                                                <TableCell align="right">{index + 1}</TableCell>
                                                                <TableCell
                                                                    style={{
                                                                        minWidth: 400,
                                                                        maxWidth: 400
                                                                    }}>{key}</TableCell>
                                                                <TableCell
                                                                    align="right">{teams[key]["number of games played"]}</TableCell>
                                                                <TableCell
                                                                    align="right">{teams[key].stats.wins}</TableCell>
                                                                <TableCell
                                                                    align="right">{teams[key].stats.draws}</TableCell>
                                                                <TableCell
                                                                    align="right">{teams[key].stats.losses}</TableCell>
                                                                <TableCell
                                                                    align="right">{teams[key].stats.goalsScored}</TableCell>
                                                                <TableCell
                                                                    align="right">{teams[key].stats.goalsConceded}</TableCell>
                                                                <TableCell
                                                                    align="right">{teams[key].stats.goalsScored - teams[key].stats.goalsConceded}</TableCell>
                                                                <TableCell
                                                                    align="right">{Numeral(teams[key].stats.points / 1000).format('0.000')}</TableCell>
                                                                <TableCell
                                                                    align="right">{teams[key].stats.elo}</TableCell>
                                                                <TableCell style={leftDivider}
                                                                           align="right" data-order={
                                                                    teams[key]["wins_percent"]
                                                                }>
                                                                    <div style={{height: "30px", width: "30px"}}>
                                                                        <Doughnut
                                                                            data={{
                                                                                labels: ["", "", ""
                                                                                ],
                                                                                datasets: [{
                                                                                    data: [
                                                                                        teams[key]["wins"],
                                                                                        teams[key]["draws"],
                                                                                        teams[key]["losses"]
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
                                                                    align="right">{teams[key]["avg goals scored"]}</TableCell>
                                                                <TableCell
                                                                    align="right">{teams[key]["avg goals conceded"]}</TableCell>
                                                                <TableCell align="right" data-order={
                                                                    teams[key]["avg goals scored"]
                                                                }>
                                                                    <div style={{height: "25px", width: "100px"}}>
                                                                        <HorizontalBar
                                                                            data={{
                                                                                labels: ["", ""
                                                                                ],
                                                                                datasets: [{
                                                                                    data: [
                                                                                        teams[key]["avg goals scored"],
                                                                                        teams[key]["avg goals conceded"]
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
                                                                    teams[key]["wins_percent_away"]
                                                                }>
                                                                    <div style={{height: "30px", width: "30px"}}>
                                                                        <Doughnut
                                                                            data={{
                                                                                labels: ["", "", ""
                                                                                ],
                                                                                datasets: [{
                                                                                    data: [
                                                                                        teams[key]["winsAway"],
                                                                                        teams[key]["drawsAway"],
                                                                                        teams[key]["lossesAway"]
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
                                                                <TableCell
                                                                    align="right">{teams[key]["avg goals scored away"]}</TableCell>
                                                                <TableCell
                                                                    align="right">{teams[key]["avg goals conceded away"]}</TableCell>
                                                                <TableCell align="right" data-order={
                                                                    teams[key]["avg goals scored away"]
                                                                }>
                                                                    <div style={{height: "25px", width: "100px"}}>
                                                                        <HorizontalBar
                                                                            data={{
                                                                                labels: ["", ""
                                                                                ],
                                                                                datasets: [{
                                                                                    data: [
                                                                                        teams[key]["avg goals scored away"],
                                                                                        teams[key]["avg goals conceded away"]
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
        )
    }
}

