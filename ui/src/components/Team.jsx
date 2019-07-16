import React, {Component} from "react";
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
} from "@material-ui/core";
import LeagueToolbar from "./LeagueToolbar";

class Team extends Component {

    constructor(props) {
        super(props);

        this.state = {
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
                "seasonsStats": []
            }
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
            <Paper style={{margin: 20}} elevation={20}>
                <LeagueToolbar pageTitle={this.state.team.name}/>

                <Box style={{margin: 20}}>
                    <Grid container spacing={1}>
                        <Grid item sm={9}>
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
                                            return (
                                                <TableRow>
                                                    <TableCell align="right" >{"Season " + (index+1)}</TableCell>
                                                    <TableCell align="right" >{seasonStats.points}</TableCell>
                                                    <TableCell align="right" >{seasonStats.matchesPlayed}</TableCell>
                                                    <TableCell align="right" >{seasonStats.wins}</TableCell>
                                                    <TableCell align="right" >{seasonStats.draws}</TableCell>
                                                    <TableCell align="right" >{seasonStats.losses}</TableCell>
                                                    <TableCell align="right" >{seasonStats.goalsScored}</TableCell>
                                                    <TableCell align="right" >{seasonStats.goalsConceded}</TableCell>
                                                    <TableCell align="right" >{seasonStats.goalDifference}</TableCell>
                                                </TableRow>
                                            )
                                        })}
                                            <TableRow>
                                                <TableCell align="right" className={"points_td"}>Total</TableCell>
                                                <TableCell align="right" className={"points_td"}>{this.state.team.completeStats.points}</TableCell>
                                                <TableCell align="right" className={"points_td"}>{this.state.team.completeStats.matchesPlayed}</TableCell>
                                                <TableCell align="right" className={"points_td"}>{this.state.team.completeStats.wins}</TableCell>
                                                <TableCell align="right" className={"points_td"}>{this.state.team.completeStats.draws}</TableCell>
                                                <TableCell align="right" className={"points_td"}>{this.state.team.completeStats.losses}</TableCell>
                                                <TableCell align="right" className={"points_td"}>{this.state.team.completeStats.goalsScored}</TableCell>
                                                <TableCell align="right" className={"points_td"}>{this.state.team.completeStats.goalsConceded}</TableCell>
                                                <TableCell align="right" className={"points_td"}>{this.state.team.completeStats.goalDifference}</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </table>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        );
    }

}

export default Team;
