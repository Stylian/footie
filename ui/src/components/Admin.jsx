import React, {Component} from 'react';
import LeagueToolbar from "./LeagueToolbar";
import {Box, Card, CardContent, CardHeader, Grid, Paper, TableBody, TableCell, TableRow} from "@material-ui/core";
import Button from "@material-ui/core/Button";

class Admin extends Component {

    constructor(props) {
        super(props);

        this.state = {
            pageTitle: "Admin",
            tabActive: 0,
            generalData: {},
            seasonsStages: {},
            seasonNum: 0,
            canCreateLeague: false,
            lastRestorePoint: "",
            isLoaded: false
        };

    }

    componentDidMount() {

        fetch("/rest/admin/general_data")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState(state => {
                        return {
                            ...state,
                            isLoaded: true,
                            generalData: result
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

        fetch("/rest/admin/stages")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState(state => {
                        return {
                            ...state,
                            isLoaded: true,
                            seasonsStages: result
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

        fetch("/rest/ops/league/can_create_season")
            .then(res => res.json())
            .then(
                (result) => {

                    this.setState(state => {
                        return {
                            ...state,
                            seasonNum: result.seasonNum,
                            canCreateLeague: result[0],
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

        fetch("/rest/admin/restore_point")
            .then(res => res.text())
            .then(
                (result) => {

                    this.setState(state => {
                        return {
                            ...state,
                            lastRestorePoint: result,
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

    handleButtonClick = (event, newValue) => {
        fetch("/rest/ops/season/create", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
        })
            .then(res => res.json())
            .then(
                (result) => {

                    window.location.reload();

                    this.setState(state => {
                        return {
                            ...state,
                            canCreateLeague: false,
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

    handleRestorePointClick = (event, newValue) => {
        fetch("/rest/admin/restore_point", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
        })
            .then(res => res.text())
            .then(
                (result) => {

                    this.setState(state => {
                        return {
                            ...state,
                            lastRestorePoint: result,
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

    handleRecalcCoeffs = (event, newValue) => {
        fetch("/rest/admin/recalculate_coeffs", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
        })
            .then(res => res.text())
            .then(
                (result) => {

                    alert("done recalculation");

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

    handleRecalcElo = (event, newValue) => {
        fetch("/rest/admin/recalculate_elo", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
        })
            .then(res => res.text())
            .then(
                (result) => {

                    alert("done recalculation");

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

    handleResetTabs = (event, newValue) => {
        fetch("/rest/admin/reset_tabs", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
        })
            .then(res => res.text())
            .then(
                (result) => {

                    alert("done recalculation");

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
                <LeagueToolbar pageTitle={this.state.pageTitle}/>
                <Box >
                    <Grid container spacing={1}>

                        <Grid item sm={4}>
                            <Card style={{margin: 20}}>
                                <CardHeader title={"Seasons Stage"} align={"center"}
                                            titleTypographyProps={{variant: 'h7'}}
                                />
                                <CardContent>
                                    <table className="table">
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>Season Year</TableCell>
                                                <TableCell
                                                    align="right">{this.state.seasonsStages.seasonYear}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Stage</TableCell>
                                                <TableCell align="right">{this.state.seasonsStages.stage}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell colSpan-={2}>
                                                    {this.state.canCreateLeague ? (
                                                        <Button onClick={this.handleButtonClick}>Create new
                                                            Season</Button>
                                                    ) : (
                                                        <span>a league is currently running</span>
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </table>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item sm={4}>
                            <Card style={{margin: 20}}>
                                <CardHeader title={"Database"} align={"center"}
                                            titleTypographyProps={{variant: 'h7'}}
                                />
                                <CardContent>
                                    <table className="table">
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>database connection</TableCell>
                                                <TableCell>{this.state.generalData.databaseConnection ? "active" : "none"}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>teams loaded</TableCell>
                                                <TableCell>{this.state.generalData.teamsLoaded}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>last save</TableCell>
                                                <TableCell align="right">{this.state.lastRestorePoint}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell colSpan-={2}>
                                                    <Button onClick={this.handleRestorePointClick}>Create Restore
                                                        Point</Button>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </table>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item sm={4}>
                            <Card style={{margin: 20}}>
                                <CardHeader title={"Engine Tools"} align={"center"}
                                            titleTypographyProps={{variant: 'h7'}}
                                />
                                <CardContent>
                                    <Button onClick={this.handleRecalcCoeffs}>Recalculate current season's coeffs</Button>
                                    <br/>
                                    <Button onClick={this.handleRecalcElo}>Recalculate Elo from the beginning</Button>
                                    <br/>
                                    <Button onClick={this.handleResetTabs}>Reset tab numbers</Button>
                                </CardContent>
                            </Card>
                        </Grid>

                    </Grid>
                </Box>
            </Paper>
        );
    }
}

export default Admin;
