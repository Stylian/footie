import React, {Component} from "react";
import {Box, Card, CardContent, CardHeader, Grid, TableBody, TableCell, TableRow, Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";

class Rules extends Component {

    render() {
        return (
            <Box width={1600}>
                <Grid container spacing={1}>
                    <Grid item sm={4}>
                        <Card style={{margin: 20}}>
                            <CardHeader title={"Preliminary round"} align={"center"} titleTypographyProps={{variant: 'h7'}}
                            />
                            <CardContent>
                                <table className="table">
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align={"right"}>Teams</TableCell>
                                            <TableCell>as needed</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align={"right"}>Participation</TableCell>
                                            <TableCell>bottom teams by coefficients as needed</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align={"right"}>Format</TableCell>
                                            <TableCell>2 knockout games</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align={"right"}>Winners</TableCell>
                                            <TableCell>promote to Qualifying round</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align={"right"}>Ties rules</TableCell>
                                            <TableCell>
                                                <ol>
                                                    <li>highest coefficients win</li>
                                                    <li>the winner is picked at random</li>
                                                </ol>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </table>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item sm={4}>
                        <Card style={{margin: 20}}>
                            <CardHeader title={"Qualifying round"} align={"center"} titleTypographyProps={{variant: 'h7'}}
                            />
                            <CardContent>
                                <table className="table">
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align={"right"}>Teams</TableCell>
                                            <TableCell>26</TableCell>
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
                                            <TableCell>2 knockout games</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align={"right"}>Winners</TableCell>
                                            <TableCell>promote to the Play-off round</TableCell>
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
                                </table>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item sm={4}>
                        <Card style={{margin: 20}}>
                            <CardHeader title={"Play-off round"} align={"center"} titleTypographyProps={{variant: 'h7'}}
                            />
                            <CardContent>
                                <table className="table">
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align={"right"}>Teams</TableCell>
                                            <TableCell>18</TableCell>
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
                                            <TableCell>2 knockout games</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align={"right"}>Winners</TableCell>
                                            <TableCell>promote to the 1st Group stage</TableCell>
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
                                </table>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item sm={4}>
                        <Card style={{margin: 20}}>
                            <CardHeader title={"1st Group stage"} align={"center"} titleTypographyProps={{variant: 'h7'}}
                            />
                            <CardContent>
                                <table className="table">
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align={"right"}>Teams</TableCell>
                                            <TableCell>12</TableCell>
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
                                            <TableCell>4 groups, round robin</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align={"right"}>Winners</TableCell>
                                            <TableCell>top 2 promote to the 2nd Group stage</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align={"right"}>Order rules</TableCell>
                                            <TableCell>
                                                <ol>
                                                    <li>most points</li>
                                                    <li>best goal difference</li>
                                                    <li>most goals scored</li>
                                                    <li>most wins</li>
                                                    <li>alphabetical?</li>
                                                </ol>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </table>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item sm={4}>
                        <Card style={{margin: 20}}>
                            <CardHeader title={"2nd Group stage"} align={"center"} titleTypographyProps={{variant: 'h7'}}
                            />
                            <CardContent>
                                <table className="table">
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align={"right"}>Teams</TableCell>
                                            <TableCell>8</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align={"right"}>Participation</TableCell>
                                            <TableCell>top 2 teams from each 1st stage's groups</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align={"right"}>Format</TableCell>
                                            <TableCell>
                                                <ul>
                                                    <li>2 groups, round robin</li>
                                                    <li>same games excluded</li>
                                                    <li>1st group stage points are carried over</li>
                                                </ul>
                                                </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align={"right"}>Winners</TableCell>
                                            <TableCell>
                                                <ul>
                                                    <li>1st team promotes to ½ finals</li>
                                                    <li>2nd and 3rd teams promote to ¼ finals</li>
                                                </ul>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align={"right"}>Order rules</TableCell>
                                            <TableCell>
                                                <ol>
                                                    <li>most points</li>
                                                    <li>best goal difference</li>
                                                    <li>most goals scored</li>
                                                    <li>most wins</li>
                                                    <li>alphabetical?</li>
                                                </ol>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </table>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item sm={4}>
                        <Card style={{margin: 20}}>
                            <CardHeader title={"¼ finals"} align={"center"} titleTypographyProps={{variant: 'h7'}}
                            />
                            <CardContent>
                                <table className="table">
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align={"right"}>Teams</TableCell>
                                            <TableCell>4</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align={"right"}>Participation</TableCell>
                                            <TableCell>2nd and 3rd teams from 2nd group stage</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align={"right"}>Format</TableCell>
                                            <TableCell>
                                                <ul>
                                                    <li>2nd matches 3rd of other group</li>
                                                    <li>2 knockout games</li>
                                                </ul>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align={"right"}>Winners</TableCell>
                                            <TableCell>promote to ½ finals</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align={"right"}>Ties rules</TableCell>
                                            <TableCell>
                                                <ol>
                                                    <li>best 2nd stage group position</li>
                                                </ol>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </table>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item sm={4}>
                        <Card style={{margin: 20}}>
                            <CardHeader title={"½ finals"} align={"center"} titleTypographyProps={{variant: 'h7'}}
                            />
                            <CardContent>
                                <table className="table">
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align={"right"}>Teams</TableCell>
                                            <TableCell>4</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align={"right"}>Participation</TableCell>
                                            <TableCell>
                                                <ul>
                                                    <li>1st teams from 2nd group stage</li>
                                                    <li>winners from ¼ finals</li>
                                                </ul>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align={"right"}>Format</TableCell>
                                            <TableCell>
                                                <ul>
                                                    <li>1st matches winners from ¼ finals</li>
                                                    <li>4 knockout games</li>
                                                </ul>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align={"right"}>Winners</TableCell>
                                            <TableCell>promote to finals</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align={"right"}>Ties rules</TableCell>
                                            <TableCell>
                                                <ol>
                                                    <li>best 2nd stage group position</li>
                                                </ol>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </table>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item sm={4}>
                        <Card style={{margin: 20}}>
                            <CardHeader title={"finals"} align={"center"} titleTypographyProps={{variant: 'h7'}}
                            />
                            <CardContent>
                                <table className="table">
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align={"right"}>Teams</TableCell>
                                            <TableCell>2</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align={"right"}>Participation</TableCell>
                                            <TableCell>winners from ½ finals</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align={"right"}>Format</TableCell>
                                            <TableCell>4 knockout games</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align={"right"}>Winner</TableCell>
                                            <TableCell>wins the championship</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align={"right"}>Ties rules</TableCell>
                                            <TableCell>
                                                <ol>
                                                    <li>the games are re-played</li>
                                                </ol>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </table>
                            </CardContent>
                        </Card>
                    </Grid>

                </Grid>
            </Box>
        );
    }
}


export default Rules;
