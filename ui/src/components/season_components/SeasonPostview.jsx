import React, {Component} from 'react';
import {Box, Card, CardContent, CardHeader, Grid, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import goldmedal from "../../icons/goldmedal.png";
import silvermedal from "../../icons/silvermedal.png";
import Numeral from "numeral";

class SeasonPostview extends Component {

    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            data: {},
        };

    }

    componentDidMount() {
        fetch("/rest/seasons/" + this.props.year + "/overview")
            .then(res => res.json())
            .then(
                (result) => {

                    this.setState(state => {
                        return {
                            ...state,
                            isLoaded: true,
                            data: result,
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

        return (
            this.state.isLoaded ? (
                <Box>
                    <Grid container spacing={1}>
                        <Grid item sm={4}>
                            <Card style={{margin: 20}}>
                                <CardHeader title={"Team Awards"} align={"center"}
                                            titleTypographyProps={{variant: 'h7'}}
                                />
                                <CardContent>
                                    <Grid container spacing={1}>
                                        <Grid item sm={4}>
                                            <Grid container spacing={1}>
                                                <Grid item sm={12}>
                                                    <table className="table" align={"center"}>
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell>champion</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            <TableRow className={"teamClicker"}
                                                                      data-teamid={this.state.data.winner.id}
                                                                      onClick={this.goToTeam}
                                                                      style={{backgroundColor: 'rgb(179, 184, 255)'}}>
                                                                <TableCell>
                                                                    <img src={goldmedal} title={"1st place"}/>
                                                                    {this.state.data.winner.name}
                                                                </TableCell>
                                                            </TableRow>
                                                        </TableBody>
                                                    </table>
                                                </Grid>
                                                <Grid item sm={12}>
                                                    <table className="table" align={"center"}>
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell>runner-up</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            <TableRow className={"teamClicker"}
                                                                      data-teamid={this.state.data.runner_up.id}
                                                                      onClick={this.goToTeam}
                                                                      style={{backgroundColor: 'rgb(226, 228, 255)'}}>
                                                                <TableCell>
                                                                    <img src={silvermedal} title={"2nd place"}/>
                                                                    {this.state.data.runner_up.name}
                                                                </TableCell>
                                                            </TableRow>
                                                        </TableBody>
                                                    </table>
                                                </Grid>
                                                <Grid item sm={12}>
                                                    <table className="table" align={"center"}>
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell>positions 3rd-4th</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            <TableRow className={"teamClicker"}
                                                                      data-teamid={this.state.data.semifinalist1.id}
                                                                      onClick={this.goToTeam}
                                                                      style={{backgroundColor: 'rgb(217, 237, 247)'}}>
                                                                <TableCell>
                                                                    {this.state.data.semifinalist1.name}
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow className={"teamClicker"}
                                                                      data-teamid={this.state.data.semifinalist2.id}
                                                                      onClick={this.goToTeam}
                                                                      style={{backgroundColor: 'rgb(217, 237, 247)'}}>
                                                                <TableCell>
                                                                    {this.state.data.semifinalist2.name}
                                                                </TableCell>
                                                            </TableRow>
                                                        </TableBody>
                                                    </table>
                                                </Grid>
                                                <Grid item sm={12}>
                                                    <table className="table" align={"center"}>
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell>positions 5th-6th</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            <TableRow className={"teamClicker"}
                                                                      data-teamid={this.state.data.quarterfinalist1.id}
                                                                      onClick={this.goToTeam}
                                                                      style={{backgroundColor: 'rgb(252, 248, 227)'}}>
                                                                <TableCell>
                                                                    {this.state.data.quarterfinalist1.name}
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow className={"teamClicker"}
                                                                      data-teamid={this.state.data.quarterfinalist2.id}
                                                                      onClick={this.goToTeam}
                                                                      style={{backgroundColor: 'rgb(252, 248, 227)'}}>
                                                                <TableCell>
                                                                    {this.state.data.quarterfinalist2.name}
                                                                </TableCell>
                                                            </TableRow>
                                                        </TableBody>
                                                    </table>
                                                </Grid>
                                            </Grid>
                                        </Grid>

                                        <Grid item sm={8}>
                                            <Grid container spacing={1}>
                                                <Grid item sm={12}>
                                                    <table className="table" align={"left"}>
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell colSpan={3}>highest scoring game</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            <TableRow
                                                                style={{backgroundColor: '#e6ffe6'}}>
                                                                <TableCell align="right"
                                                                           className={"teamClicker"}
                                                                           data-teamid={this.state.data.highestScoringGame.homeTeam.id}
                                                                           onClick={this.goToTeam}>
                                                                    {this.state.data.highestScoringGame.homeTeam.name}</TableCell>
                                                                <TableCell>
                                                                    {this.state.data.highestScoringGame.result.goalsMadeByHomeTeam + " - "
                                                                    + this.state.data.highestScoringGame.result.goalsMadeByAwayTeam}  </TableCell>
                                                                <TableCell align="left"
                                                                           className={"teamClicker"}
                                                                           data-teamid={this.state.data.highestScoringGame.awayTeam.id}
                                                                           onClick={this.goToTeam}>
                                                                    {this.state.data.highestScoringGame.awayTeam.name}</TableCell>
                                                            </TableRow>
                                                        </TableBody>
                                                    </table>
                                                </Grid>
                                                <Grid item sm={12}>
                                                    <table className="table" align={"left"}>
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell colSpan={3}>best win</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            <TableRow
                                                                style={{backgroundColor: '#e6ffe6'}}>
                                                                <TableCell align="right"
                                                                           className={"teamClicker"}
                                                                           data-teamid={this.state.data.bestWin.homeTeam.id}
                                                                           onClick={this.goToTeam}>
                                                                    {this.state.data.bestWin.homeTeam.name}</TableCell>
                                                                <TableCell>
                                                                    {this.state.data.bestWin.result.goalsMadeByHomeTeam + " - "
                                                                    + this.state.data.bestWin.result.goalsMadeByAwayTeam}  </TableCell>
                                                                <TableCell align="left"
                                                                           className={"teamClicker"}
                                                                           data-teamid={this.state.data.bestWin.awayTeam.id}
                                                                           onClick={this.goToTeam}>
                                                                    {this.state.data.bestWin.awayTeam.name}</TableCell>
                                                            </TableRow>
                                                        </TableBody>
                                                    </table>
                                                </Grid>
                                                <Grid item sm={12}>
                                                    <table className="table" align={"left"}>
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell colSpan={3}>worst result</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            <TableRow
                                                                style={{backgroundColor: '#f2dede'}}>
                                                                <TableCell align="right"
                                                                           className={"teamClicker"}
                                                                           data-teamid={this.state.data.worstResult.homeTeam.id}
                                                                           onClick={this.goToTeam}>
                                                                    {this.state.data.worstResult.homeTeam.name}</TableCell>
                                                                <TableCell>
                                                                    {this.state.data.worstResult.result.goalsMadeByHomeTeam + " - "
                                                                    + this.state.data.worstResult.result.goalsMadeByAwayTeam}  </TableCell>
                                                                <TableCell align="left"
                                                                           className={"teamClicker"}
                                                                           data-teamid={this.state.data.worstResult.awayTeam.id}
                                                                           onClick={this.goToTeam}>
                                                                    {this.state.data.worstResult.awayTeam.name}</TableCell>
                                                            </TableRow>
                                                        </TableBody>
                                                    </table>
                                                </Grid>

                                                <Grid item sm={12}>
                                                    <table className="table" align={"left"}>
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell>overachievers</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            <TableRow className={"teamClicker"}
                                                                      data-teamid={this.state.data.overachievers.id}
                                                                      onClick={this.goToTeam}
                                                                      style={{backgroundColor: 'rgb(226, 228, 255)'}}>
                                                                <TableCell>
                                                                    {this.state.data.overachievers.name}
                                                                </TableCell>
                                                            </TableRow>
                                                        </TableBody>
                                                    </table>
                                                </Grid>
                                                <Grid item sm={12}>
                                                    <table className="table" align={"left"}>
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell>underperformers</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            <TableRow className={"teamClicker"}
                                                                      data-teamid={this.state.data.underperformers.id}
                                                                      onClick={this.goToTeam}
                                                                      style={{backgroundColor: '#f2dede'}}>
                                                                <TableCell>
                                                                    {this.state.data.underperformers.name}
                                                                </TableCell>
                                                            </TableRow>
                                                        </TableBody>
                                                    </table>
                                                </Grid>
                                            </Grid>
                                        </Grid>

                                    </Grid>
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

export default SeasonPostview;
