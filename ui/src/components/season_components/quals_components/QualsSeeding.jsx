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

class QualsSeeding extends Component {

    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            haveToSetUpTeams: props.haveToSetUpTeams,
            teamsStrong: [],
            teamsWeak: [],
        };

    }

    componentDidMount() {

        fetch("/rest/seasons/" + this.props.year + "/quals/" + this.props.round + "/seeding")
            .then(res => res.json())
            .then(
                (result) => {

                    let teamsStrong = result["STRONG"];
                    let teamsWeak = result["WEAK"];

                    this.setState(state => {
                        return {
                            ...state,
                            isLoaded: true,
                            teamsStrong: teamsStrong,
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
        fetch("/rest/ops/quals/" + this.props.round + "/set", {
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
                <Box width={1600}>
                    {this.state.haveToSetUpTeams ? (
                        <Button onClick={this.handleSettingUpButtonClick}>Set up Teams</Button>
                    ) : ''}
                    <Grid container spacing={1}>
                        <Grid item sm={3}>
                            <Card style={{margin: 20}}>
                                <CardHeader title={"Seeded"} align={"center"} titleTypographyProps={{variant: 'h7'}}
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
                                                        <TableCell align="right">{team.coefficients}</TableCell>
                                                    </TableRow>)
                                            })}
                                        </TableBody>
                                    </table>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item sm={3}>
                            <Card style={{margin: 20}}>
                                <CardHeader title={"Unseeded"} align={"center"} titleTypographyProps={{variant: 'h7'}}
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
                                                            align="right">{this.state.teamsStrong.length + index + 1}</TableCell>
                                                        <TableCell>{team.name}</TableCell>
                                                        <TableCell align="right">{team.coefficients}</TableCell>
                                                    </TableRow>)
                                            })}
                                        </TableBody>
                                    </table>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item sm={4}>
                            <Card style={{margin: 20}}>
                                <CardHeader title={"Rules"} align={"center"} titleTypographyProps={{variant: 'h7'}}
                                />
                                <CardContent>
                                    <table className="table">
                                        {this.props.round == 1 ? (
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell align={"right"}>Teams</TableCell>
                                                    <TableCell>
                                                        <ul>
                                                            <li>26</li>
                                                        </ul>
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell align={"right"}>Participation</TableCell>
                                                    <TableCell>
                                                        <ul>
                                                            <li>5th to as needed teams by coefficients</li>
                                                            <li>winners from the preliminary round</li>
                                                        </ul>
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell align={"right"}>Format</TableCell>
                                                    <TableCell>
                                                        <ul>
                                                            <li>2 knockout games</li>
                                                        </ul>
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell align={"right"}>Winners</TableCell>
                                                    <TableCell>
                                                        <ul>
                                                            <li>promote to the Play-off round</li>
                                                        </ul>
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell align={"right"}>Ties rules</TableCell>
                                                    <TableCell>
                                                        <ol>
                                                            <li>highest coefficients win</li>
                                                            <li>the games are re-played</li>
                                                        </ol>
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        ) : (
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell align={"right"}>Teams</TableCell>
                                                    <TableCell>
                                                        <ul>
                                                            <li>18</li>
                                                        </ul>
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell align={"right"}>Participation</TableCell>
                                                    <TableCell>
                                                        <ul>
                                                            <li>last season's 2 semifinalists</li>
                                                            <li>2nd to 4th teams by coefficients</li>
                                                            <li>13 winners from the qualifying round</li>
                                                        </ul>
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell align={"right"}>Format</TableCell>
                                                    <TableCell>
                                                        <ul>
                                                            <li>2 knockout games</li>
                                                        </ul>
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell align={"right"}>Winners</TableCell>
                                                    <TableCell>
                                                        <ul>
                                                            <li>promote to the 1st Group stage</li>
                                                        </ul>
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell align={"right"}>Ties rules</TableCell>
                                                    <TableCell>
                                                        <ol>
                                                            <li>the games are re-played</li>
                                                            <li>highest coefficients win</li>
                                                            <li>the games are re-played</li>
                                                        </ol>
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        )}
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


export default QualsSeeding;
