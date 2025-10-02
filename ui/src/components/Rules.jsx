import React, {useEffect, useState} from 'react';
import LeagueToolbar from "./LeagueToolbar";
import {Box, Card, CardContent, CardHeader, Grid, Paper, TableBody, TableCell, TableRow} from "@material-ui/core";
import Button from "@material-ui/core/Button";

export default function Rules() {
    return (
        <Paper  elevation={20}>
            <LeagueToolbar pageTitle={"Rules"}/>
            <Grid container>

                <Grid item sm={8}>
                    <Card style={{margin: 20}}>
                        <CardHeader title={"Seeding"} align={"center"} titleTypographyProps={{variant: 'h7'}}
                        />
                        <CardContent style={{ display: "flex", justifyContent: "center" }}>
                            <table className="table">
                                <TableBody>
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
                                                <li>2 last year's semi-finalists start from at least the play-off
                                                    round
                                                </li>
                                                <li>3 following teams by coefficients start from the play-off
                                                    round
                                                </li>
                                                <li>bottom teams start from the preliminary round</li>
                                            </ul>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </table>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item sm={4}>
                    <Card style={{margin: 20}}>
                        <CardHeader title={"Preliminary Round"} align={"center"} titleTypographyProps={{variant: 'h7'}}/>
                        <CardContent style={{ display: "flex", justifyContent: "center" }}>
                            <table className="table">
                                <TableBody>
                                    <TableRow>
                                        <TableCell align={"right"}>Ties rules</TableCell>
                                        <TableCell>
                                            <ol>
                                                <li>highest coefficients</li>
                                                <li>highest elo</li>
                                                <li>random</li>
                                            </ol>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align={"right"}>Coeffs</TableCell>
                                        <TableCell>
                                            <ul>
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


                <Grid item sm={4}>
                    <Card style={{margin: 20}}>
                        <CardHeader title={"Qualifying Round"} align={"center"} titleTypographyProps={{variant: 'h7'}}/>
                        <CardContent style={{ display: "flex", justifyContent: "center" }}>
                            <table className="table">
                                <TableBody>
                                    <TableRow>
                                        <TableCell align={"right"}>Ties rules</TableCell>
                                        <TableCell>
                                            <ol>
                                                <li>highest coefficients</li>
                                                <li>the games are re-played</li>
                                            </ol>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align={"right"}>Coeffs</TableCell>
                                        <TableCell>
                                            <ul>
                                                <li>promotion: 0.500</li>
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

                <Grid item sm={4}>
                   <Card style={{margin: 20}}>
                       <CardHeader title={"Playoffs Round"} align={"center"} titleTypographyProps={{variant: 'h7'}}/>
                       <CardContent style={{ display: "flex", justifyContent: "center" }}>
                           <table className="table">
                                <TableBody>
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
                                    <TableRow>
                                        <TableCell align={"right"}>Coeffs</TableCell>
                                        <TableCell>
                                            <ul>
                                                <li>promotion: 0.700</li>
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


                <Grid item sm={4}>
                     <Card style={{margin: 20}}>
                        <CardHeader title={"Groups Round"} align={"center"} titleTypographyProps={{variant: 'h7'}}
                        />
                        <CardContent style={{ display: "flex", justifyContent: "center" }}>
                            <table className="table" style={{minWidth: 320, maxWidth: 320}}>
                                <TableBody>
                                    <TableRow>
                                        <TableCell align={"right"}>Format</TableCell>
                                        <TableCell>
                                            <ul>
                                                <li>4 groups, round robin</li>
                                            </ul>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align={"right"}>Coeffs</TableCell>
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

                <Grid item sm={4}>
                    <Card style={{margin: 20}}>
                        <CardHeader title={"¼ Finals"} align={"center"} titleTypographyProps={{variant: 'h7'}}
                        />
                        <CardContent style={{ display: "flex", justifyContent: "center" }}>
                            <table className="table">
                                <TableBody>
                                    <TableRow>
                                        <TableCell align={"right"}>Participation</TableCell>
                                        <TableCell>
                                            <ul>
                                                <li>2nd and 3rd teams from 2nd group stage</li>
                                            </ul>
                                        </TableCell>
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
                                        <TableCell align={"right"}>Ties rules</TableCell>
                                        <TableCell>
                                            <ol>
                                                <li>best 2nd stage group position</li>
                                            </ol>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align={"right"}>Coeffs</TableCell>
                                        <TableCell>
                                            <ul>
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

                <Grid item sm={4}>
                    <Card style={{margin: 20}}>
                        <CardHeader title={"½ Finals"} align={"center"} titleTypographyProps={{variant: 'h7'}}
                        />
                        <CardContent style={{ display: "flex", justifyContent: "center" }}>
                            <table className="table">
                                <TableBody>
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
                                        <TableCell align={"right"}>Ties rules</TableCell>
                                        <TableCell>
                                            <ol>
                                                <li>best 2nd stage group position</li>
                                            </ol>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align={"right"}>Coeffs</TableCell>
                                        <TableCell>
                                            <ul>
                                                <li>promotion: 1.000</li>
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

                <Grid item sm={4}>
                    <Card style={{margin: 20}}>
                        <CardHeader title={"Finals"} align={"center"} titleTypographyProps={{variant: 'h7'}}
                        />
                        <CardContent style={{ display: "flex", justifyContent: "center" }}>
                            <table className="table">
                                <TableBody>
                                    <TableRow>
                                        <TableCell align={"right"}>Ties rules</TableCell>
                                        <TableCell>
                                            <ol>
                                                <li>the games are re-played</li>
                                            </ol>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align={"right"}>Coeffs</TableCell>
                                        <TableCell>
                                            <ul>
                                                <li>win the championship: 2.000</li>
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

        </Paper>
    );
}

