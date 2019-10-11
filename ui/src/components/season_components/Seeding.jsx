import React, {Component} from 'react';
import {Box, Card, CardContent, CardHeader, Grid, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import goldmedal from "../../icons/goldmedal.png";
import silvermedal from "../../icons/silvermedal.png";
import Numeral from "numeral";

class Seeding extends Component {

    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            teams: [],
        };

    }

    componentDidMount() {
        fetch("/rest/seasons/" + this.props.year + "/seeding")
            .then(res => res.json())
            .then(
                (result) => {

                    this.setState(state => {
                        return {
                            ...state,
                            isLoaded: true,
                            teams: result,
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
            this.state.isLoaded ? (
                <Box >
                    <Grid container spacing={1}>
                        <Grid item sm={8}>
                            <Card style={{margin: 20}}>
                                <CardHeader title={"Coefficients"} align={"center"}
                                            titleTypographyProps={{variant: 'h7'}}
                                />
                                <CardContent  >
                                    <Grid container >

                                        <Grid item sm={9}>
                                            <Grid container spacing={1}>
                                                <Grid item sm={6}>
                                                    <table className="table" align={"center"}>
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
                                                                              style={this.props.year == 1 ? {} : {
                                                                                  backgroundColor:
                                                                                      (team.seed === "CHAMPION") ? '#d9edf7' :
                                                                                          (team.seed === "TO_GROUPS") ? '#d9edf7' :
                                                                                              (team.seed === "TO_QUALS_2") ? '#dff0d8' :
                                                                                                  (team.seed === "TO_QUALS_1") ? '#fdf9e8' :
                                                                                                      '#f2dede'
                                                                              }}
                                                                    >
                                                                        <TableCell align="right">{index + 1}</TableCell>
                                                                        <TableCell style={{minWidth:100, maxWidth:100}} >
                                                                            {team.trophies.map((trophy, index) => {
                                                                                if (trophy.seasonNum == (this.props.year - 1)) {
                                                                                    return trophy.type == "W" ?
                                                                                        (<img src={goldmedal}
                                                                                              title={"1st place"}/>) :
                                                                                        (<img src={silvermedal}
                                                                                              title={"2nd place"}/>)
                                                                                }
                                                                            })}
                                                                            {team.name}</TableCell>
                                                                        <TableCell align="right">{Numeral(team.coefficients/1000).format('0.000')}</TableCell>
                                                                    </TableRow>)
                                                            })}
                                                        </TableBody>
                                                    </table>
                                                </Grid>

                                                <Grid item sm={6}>
                                                    <table className="table" align={"center"}>
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
                                                                              onClick={this.goToTeam}
                                                                              style={this.props.year == 1 ? {} : {
                                                                                  backgroundColor:
                                                                                      (team.seed === "CHAMPION") ? '#d9edf7' :
                                                                                          (team.seed === "TO_GROUPS") ? '#d9edf7' :
                                                                                              (team.seed === "TO_QUALS_2") ? '#dff0d8' :
                                                                                                  (team.seed === "TO_QUALS_1") ? '#fdf9e8' :
                                                                                                      '#f2dede'
                                                                              }}
                                                                    >
                                                                        <TableCell
                                                                            align="right">{leftSide.length + index + 1}</TableCell>
                                                                        <TableCell>
                                                                            {team.trophies.map((trophy, index) => {
                                                                                if (trophy.seasonNum == (this.props.year - 1)) {
                                                                                    return trophy.type == "W" ?
                                                                                        (<img src={goldmedal}
                                                                                              title={"1st place"}/>) :
                                                                                        (<img src={silvermedal}
                                                                                              title={"2nd place"}/>)
                                                                                }
                                                                            })}
                                                                            {team.name}</TableCell>
                                                                        <TableCell align="right">{Numeral(team.coefficients/1000).format('0.000')}</TableCell>
                                                                    </TableRow>)
                                                            })}
                                                        </TableBody>
                                                    </table>
                                                </Grid>
                                            </Grid>
                                        </Grid>

                                        <Grid item sm={3}>
                                            <table className="table" align={"center"}>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>Seeding</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    <TableRow style={{backgroundColor: '#d9edf7'}}>
                                                        <TableCell>group stage</TableCell>
                                                    </TableRow>
                                                    <TableRow style={{backgroundColor: '#dff0d8'}}>
                                                        <TableCell>play-off round</TableCell>
                                                    </TableRow>
                                                    <TableRow style={{backgroundColor: '#fdf9e8'}}>
                                                        <TableCell>qualifying round</TableCell>
                                                    </TableRow>
                                                    <TableRow style={{backgroundColor: '#f2dede'}}>
                                                        <TableCell>preliminary round</TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </table>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item sm={4}>
                            <Card style={{margin: 20}}>
                                <CardHeader title={"Rules"} align={"center"} titleTypographyProps={{variant: 'h7'}}
                                />
                                <CardContent>
                                    <table className="table">
                                        <TableBody>
                                            <TableRow>
                                                <TableCell align={"right"}>Teams</TableCell>
                                                <TableCell>
                                                    <ul>
                                                        <li>{this.state.teams.length}</li>
                                                    </ul>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align={"right"}>Participation rules</TableCell>
                                                <TableCell>
                                                    <ul>
                                                        <li>3 teams to 1st group stage</li>
                                                        <li>5 teams to the play-off round</li>
                                                        <li>26 teams to the qualifying round</li>
                                                        <li>remaining teams to the preliminary round</li>
                                                    </ul>
                                                </TableCell>
                                            </TableRow>

                                            <TableRow>
                                                <TableCell align={"right"}>Participation breakout</TableCell>
                                                <TableCell>
                                                    <ul>
                                                        <li>2 last year's finalists start from 1st group stage</li>
                                                        <li>1st team by coefficients starts from 1st group stage</li>
                                                        <li>2 last year's semi-finalists start from at least the play-off round</li>
                                                        <li>3 following teams by coefficients start from the play-off round</li>
                                                        <li>bottom teams start from the preliminary round</li>
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

export default Seeding;
