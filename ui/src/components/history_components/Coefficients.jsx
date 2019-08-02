import React, {Component} from 'react';
import {
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Grid,
    Paper,
    Box,
    Card,
    CardHeader,
    CardContent
} from "@material-ui/core";
import goldmedal from "../../icons/goldmedal.png";
import silvermedal from "../../icons/silvermedal.png";

class Coefficients extends Component {

    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            teams: [],
            seasons: [],
            teamsWithTrophies: []
        };

    }

    componentDidMount() {
        fetch("/rest/history/coefficients")
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

        fetch("/rest/history/past_winners")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState(state => {
                        return {
                            ...state,
                            isLoaded: true,
                            seasons: result
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

        fetch("/rest/history/teams/trophies")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState(state => {
                        return {
                            ...state,
                            isLoaded: true,
                            teamsWithTrophies: result
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

        let teams = [...this.state.teams];
        let half_length = Math.ceil(teams.length / 2);
        let leftSide = teams.splice(0, half_length);
        let rightSide = teams;

        return (
            <Box width={1700}>
                <Paper elevation={12} style={{margin: 20}}>

                    <Grid container spacing={1}>
                        <Grid item sm={5}>
                            <Card style={{margin: 20}}>
                                <CardHeader title={"Coefficients"} align={"center"}
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
                                                        <TableCell>Coefficients</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {leftSide.map((team, index) => {
                                                        return (
                                                            <TableRow className={"teamClicker"}
                                                                      data-teamid={team.id}
                                                                      onClick={this.goToTeam}
                                                                      style={{
                                                                          backgroundColor:
                                                                              (index < 1) ? '#d9edf7' :
                                                                                  (index < 6) ? '#dff0d8' :
                                                                                      ''
                                                                      }}
                                                            >
                                                                <TableCell align="right">{index + 1}</TableCell>
                                                                <TableCell>{team.name}</TableCell>
                                                                <TableCell align="right">{team.coefficients}</TableCell>
                                                            </TableRow>)
                                                    })}
                                                </TableBody>
                                            </table>
                                        </Grid>

                                        <Grid item sm={6}>
                                            <table className="table">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>Pos</TableCell>
                                                        <TableCell>Team</TableCell>
                                                        <TableCell>Coefficients</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {rightSide.map((team, index) => {
                                                        return (
                                                            <TableRow className={"teamClicker"}
                                                                      data-teamid={team.id}
                                                                      onClick={this.goToTeam}>
                                                                <TableCell
                                                                    align="right">{leftSide.length + index + 1}</TableCell>
                                                                <TableCell>{team.name}</TableCell>
                                                                <TableCell align="right">{team.coefficients}</TableCell>
                                                            </TableRow>)
                                                    })}
                                                </TableBody>
                                            </table>
                                        </Grid>

                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item sm={4.5}>
                            <Card style={{margin: 20}}>
                                <CardHeader title={"Past Finals"} align={"center"}
                                            titleTypographyProps={{variant: 'h7'}}
                                />
                                <CardContent>
                                    <table className="table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Season</TableCell>
                                                <TableCell>Winner</TableCell>
                                                <TableCell>Runner-up</TableCell>
                                                <TableCell align="center" colSpan={2}>Semifinalists</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {this.state.seasons.map((item, index) =>
                                                <TableRow>
                                                    <TableCell align="right">{item.seasonYear}</TableCell>
                                                    <TableCell align="left" className={"teamClicker"}
                                                               data-teamid={item.winner.id}
                                                               onClick={this.goToTeam}>
                                                        {item.winner != null ? item.winner.name : ""}</TableCell>
                                                    <TableCell align="left" className={"teamClicker"}
                                                               data-teamid={item.runnerUp.id}
                                                               onClick={this.goToTeam}>
                                                        {item.runnerUp != null ? item.runnerUp.name : ""}</TableCell>
                                                    <TableCell>Netherlands</TableCell>
                                                    <TableCell>Argentina</TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </table>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item sm={2.5}>
                            <Card style={{margin: 20}}>
                                <CardHeader title={"Best Performers"} align={"center"}
                                            titleTypographyProps={{variant: 'h7'}}
                                />
                                <CardContent>
                                    <table className="table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell><img src={goldmedal} title={"1st place"} /></TableCell>
                                                <TableCell><img src={silvermedal} title={"2nd place"} /></TableCell>
                                                <TableCell>Team</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {this.state.teamsWithTrophies.map((team, index) =>
                                                <TableRow>
                                                    <TableCell align="center">{team.gold}</TableCell>
                                                    <TableCell align="center">{team.silver}</TableCell>
                                                    <TableCell align="left" className={"teamClicker"}
                                                               data-teamid={team.id}
                                                               onClick={this.goToTeam}>
                                                        {team.name}</TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </table>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>

        );
    }
}

export default Coefficients;
