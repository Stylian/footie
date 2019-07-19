import React, {Component} from 'react';
import {Box, Card, CardContent, CardHeader, Grid, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import goldmedal from "../../icons/goldmedal.png";
import silvermedal from "../../icons/silvermedal.png";

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
            <Box width={800}>
                <Card style={{margin: 20}}>
                    <CardHeader title={"Seeding"} align={"center"} titleTypographyProps={{variant: 'h7'}}
                    />
                    <CardContent>
                        <Grid container spacing={1}>
                            <Grid item sm>
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
                                                <TableRow className={"teamClicker"} data-teamid={team.id}
                                                          onClick={this.goToTeam}
                                                          style={{
                                                              backgroundColor:
                                                                  (team.seed === "CHAMPION") ? '#B3B8FF' :
                                                                      (team.seed === "TO_GROUPS") ? '#d9edf7' :
                                                                          (team.seed === "TO_QUALS_2") ? '#dff0d8' :
                                                                              ''
                                                          }}
                                                >
                                                    <TableCell align="right">{index + 1}</TableCell>
                                                    <TableCell>
                                                        {team.trophies.map((trophy, index) => {
                                                            if(trophy.seasonNum == (this.props.year-1)) {
                                                                return trophy.type == "W" ?
                                                                    (<img src={goldmedal} title={"1st place"}/>) :
                                                                    (<img src={silvermedal} title={"2nd place"}/>)
                                                            }
                                                        })}
                                                        {team.name}</TableCell>
                                                    <TableCell align="right">{team.coefficients}</TableCell>
                                                </TableRow>)
                                        })}
                                    </TableBody>
                                </table>
                            </Grid>

                            <Grid item sm>
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
                                                <TableRow className={"teamClicker"} data-teamid={team.id}
                                                          onClick={this.goToTeam}
                                                          style={{
                                                              backgroundColor:
                                                                  (team.seed === "CHAMPION") ? '#B3B8FF' :
                                                                      (team.seed === "TO_GROUPS") ? '#d9edf7' :
                                                                          (team.seed === "TO_QUALS_2") ? '#dff0d8' :
                                                                              ''
                                                          }}
                                                >
                                                    <TableCell
                                                        align="right">{leftSide.length + index + 1}</TableCell>
                                                    <TableCell>
                                                        {team.trophies.map((trophy, index) => {
                                                            if(trophy.seasonNum == (this.props.year-1)) {
                                                                return trophy.type == "W" ?
                                                                    (<img src={goldmedal} title={"1st place"}/>) :
                                                                    (<img src={silvermedal} title={"2nd place"}/>)
                                                            }
                                                        })}
                                                        {team.name}</TableCell>
                                                    <TableCell align="right">{team.coefficients}</TableCell>
                                                </TableRow>)
                                        })}
                                    </TableBody>
                                </table>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Box>

        );
    }
}

export default Seeding;
