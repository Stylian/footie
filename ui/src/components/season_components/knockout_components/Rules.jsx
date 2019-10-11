import React, {Component} from "react";
import {Box, Card, CardContent, CardHeader, Grid, TableBody, TableCell, TableRow, Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";

class Rules extends Component {

    render() {
        return (
            <Box >
                <Grid container spacing={1}>

                    <Grid item sm={4}>
                        <Card style={{margin: 20}}>
                            <CardHeader title={"¼ finals"} align={"center"} titleTypographyProps={{variant: 'h7'}}
                            />
                            <CardContent>
                                <table className="table">
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align={"right"}>Teams</TableCell>
                                            <TableCell>
                                                <ul>
                                                    <li>4</li>
                                                </ul>
                                            </TableCell>
                                        </TableRow>
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
                                            <TableCell align={"right"}>Winners</TableCell>
                                            <TableCell>
                                                <ul>
                                                    <li>promote to ½ finals</li>
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
                                            <TableCell align={"right"}>Coefficients granted</TableCell>
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
                            <CardHeader title={"½ finals"} align={"center"} titleTypographyProps={{variant: 'h7'}}
                            />
                            <CardContent>
                                <table className="table">
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align={"right"}>Teams</TableCell>
                                            <TableCell>
                                                <ul>
                                                    <li>4</li>
                                                </ul>
                                            </TableCell>
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
                                            <TableCell>
                                                <ul>
                                                    <li>promote to finals</li>
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
                                            <TableCell align={"right"}>Coefficients granted</TableCell>
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
                            <CardHeader title={"finals"} align={"center"} titleTypographyProps={{variant: 'h7'}}
                            />
                            <CardContent>
                                <table className="table">
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align={"right"}>Teams</TableCell>
                                            <TableCell>
                                                <ul>
                                                    <li>2</li>
                                                </ul>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align={"right"}>Participation</TableCell>
                                            <TableCell>
                                                <ul>
                                                    <li>winners from ½ finals</li>
                                                </ul>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align={"right"}>Format</TableCell>
                                            <TableCell>
                                                <ul>
                                                    <li>4 knockout games</li>
                                                </ul>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align={"right"}>Winner</TableCell>
                                            <TableCell>
                                                <ul>
                                                    <li>wins the championship</li>
                                                </ul>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align={"right"}>Ties rules</TableCell>
                                            <TableCell>
                                                <ol>
                                                    <li>the games are re-played</li>
                                                </ol>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align={"right"}>Coefficients granted</TableCell>
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
            </Box>
        );
    }
}


export default Rules;
