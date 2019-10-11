import React, {Component} from 'react';
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
import Button from "@material-ui/core/Button";
import Numeral from "numeral";

class GroupsSeeding extends Component {

    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            haveToSetUpTeams: props.haveToSetUpTeams,
            teamsStrong: [],
            teamsMedium: [],
            teamsWeak: [],
        };

    }

    componentDidMount() {
        fetch("/rest/seasons/" + this.props.year + "/groups/" + this.props.round + "/seeding")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState(state => {

                        let teamsStrong = result["STRONG"];
                        let teamsMedium = result["MEDIUM"];
                        let teamsWeak = result["WEAK"];

                        return {
                            ...state,
                            isLoaded: true,
                            teamsStrong: teamsStrong,
                            teamsMedium: teamsMedium,
                            teamsWeak: teamsWeak,
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

    handleSettingUpButtonClick = (event, newValue) => {
        fetch("/rest/ops//groups/" + this.props.round + "/set", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
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
        return (
            this.state.isLoaded ? (
                <Box >
                    {this.state.haveToSetUpTeams ? (
                        <Button onClick={this.handleSettingUpButtonClick}>Set up Teams</Button>
                    ) : ''}
                    <Grid container spacing={1}>
                        <Grid item sm={2.5}>
                            <Card style={{margin: 20}}>
                                <CardHeader title={"Pot 1"} align={"center"} titleTypographyProps={{variant: 'h7'}}
                                />
                                <CardContent>
                                    <table className="table" align={"center"}>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Pos</TableCell>
                                                <TableCell>Team</TableCell>
                                                <TableCell>Coefficients</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {this.state.teamsStrong.map((team, index) => {
                                                return (
                                                    <TableRow className={"teamClicker"} data-teamid={team.id}
                                                              onClick={this.goToTeam}>
                                                        <TableCell align="right">{index + 1}</TableCell>
                                                        <TableCell>{team.name}</TableCell>
                                                        <TableCell align="right">{Numeral(team.coefficients/1000).format('0.000')}</TableCell>
                                                    </TableRow>)
                                            })}
                                        </TableBody>
                                    </table>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item sm={2.5}>
                            <Card style={{margin: 20}}>
                                <CardHeader title={"Pot 2"} align={"center"} titleTypographyProps={{variant: 'h7'}}
                                />
                                <CardContent>
                                    <table className="table" align={"center"}>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Pos</TableCell>
                                                <TableCell>Team</TableCell>
                                                <TableCell>Coefficients</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {this.state.teamsMedium.map((team, index) => {
                                                return (
                                                    <TableRow className={"teamClicker"} data-teamid={team.id}
                                                              onClick={this.goToTeam}>
                                                        <TableCell
                                                            align="right">{this.state.teamsStrong.length + index + 1}</TableCell>
                                                        <TableCell>{team.name}</TableCell>
                                                        <TableCell align="right">{Numeral(team.coefficients/1000).format('0.000')}</TableCell>
                                                    </TableRow>)
                                            })}
                                        </TableBody>
                                    </table>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item sm={2.5}>
                            <Card style={{margin: 20}}>
                                <CardHeader title={"Pot 3"} align={"center"} titleTypographyProps={{variant: 'h7'}}
                                />
                                <CardContent>
                                    <table className="table" align={"center"}>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Pos</TableCell>
                                                <TableCell>Team</TableCell>
                                                <TableCell>Coefficients</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {this.state.teamsWeak.map((team, index) => {
                                                return (
                                                    <TableRow className={"teamClicker"} data-teamid={team.id}
                                                              onClick={this.goToTeam}>
                                                        <TableCell
                                                            align="right">{this.state.teamsStrong.length + this.state.teamsMedium.length + index + 1}</TableCell>
                                                        <TableCell>{team.name}</TableCell>
                                                        <TableCell align="right">{Numeral(team.coefficients/1000).format('0.000')}</TableCell>
                                                    </TableRow>)
                                            })}
                                        </TableBody>
                                    </table>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item sm={4.5}>
                            <Card style={{margin: 20}}>
                                <CardHeader title={"Rules"} align={"center"} titleTypographyProps={{variant: 'h7'}}
                                />
                                <CardContent>
                                    <table className="table" style={{minWidth:320, maxWidth:320}}>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell align={"right"}>Teams</TableCell>
                                                <TableCell>
                                                    <ul>
                                                        <li>12</li>
                                                    </ul>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align={"right"}>Participation</TableCell>
                                                <TableCell>
                                                    <ul>
                                                        <li>last season's 2 finalists</li>
                                                        <li>1st team by coefficients</li>
                                                        <li>9 winners from the play-off round</li>
                                                    </ul>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align={"right"}>Format</TableCell>
                                                <TableCell>
                                                    <ul>
                                                        <li>4 groups, round robin</li>
                                                    </ul>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align={"right"}>Coefficients granted</TableCell>
                                                <TableCell>
                                                    <ul>
                                                        <li>1st place: 0.600</li>
                                                        <li>2nd place: 0.300</li>
                                                        <li>win: 1.000</li>
                                                        <li>draw: 0.500</li>
                                                        <li>each goal scored: 0.100</li>
                                                    </ul>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </table>
                                </CardContent>
                            </Card>
                        </Grid>

                    </Grid>
                </Box>
            ) : (
                <span></span>
            )
        );
    }
}


export default GroupsSeeding;
