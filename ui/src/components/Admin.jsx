import React, {Component, useEffect, useState} from 'react';
import LeagueToolbar from "./LeagueToolbar";
import {Box, Card, CardContent, CardHeader, Grid, Paper, TableBody, TableCell, TableRow} from "@material-ui/core";
import Button from "@material-ui/core/Button";

function Admin() {

    const [pageTitle] = useState("Admin")
    const [tabActive] = useState(0)
    const [generalData, setGeneralData] = useState({
        databaseConnection: false,
        teamsLoaded: undefined
    })
    const [seasonsStages, setSeasonsStages] = useState({ seasonYear: 0 })
    const [seasonNum, setSeasonNum] = useState(0)
    const [canCreateLeague, setCanCreateLeague] = useState(false)
    const [lastRestorePoint, setLastRestorePoint] = useState("")
    const [isLoaded, setLoaded] = useState(false)

    useEffect(() => {

        fetch("/rest/admin/general_data")
            .then(res => res.json())
            .then(
                (result) => {
                    setLoaded(true)
                    setGeneralData(result)
                },
                (error) => {
                    setLoaded(true) //TODO
                }
            )

        fetch("/rest/admin/stages")
            .then(res => res.json())
            .then(
                (result) => {
                    setLoaded(true)
                    setSeasonsStages(result)
                },
                (error) => {
                    setLoaded(true) //TODO
                }
            )

        fetch("/rest/ops/league/can_create_season")
            .then(res => res.json())
            .then(
                (result) => {
                    setSeasonNum(result.seasonNum)
                    setCanCreateLeague(result[0])
                },
                (error) => {
                    setLoaded(true) //TODO
                }
            )

        fetch("/rest/admin/restore_point")
            .then(res => res.text())
            .then(
                (result) => {
                    setLastRestorePoint(result)
                },
                (error) => {
                    setLoaded(true) //TODO
                }
            )
    });

    const handleButtonClick = (event, newValue) => {
        fetch("/rest/ops/season/create", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
        })
            .then(res => res.json())
            .then(
                (result) => {
                    window.location.reload();
                    setCanCreateLeague(false)
                },
                (error) => {
                    setLoaded(true) //TODO
                }
            )
    }

    const handleRestorePointClick = (event, newValue) => {
        fetch("/rest/admin/restore_point", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
        })
            .then(res => res.text())
            .then(
                (result) => {
                    setLastRestorePoint(result)
                },
                (error) => {
                    setLoaded(true) //TODO
                }
            )
    }

    const handleRecalcCoeffs = (event, newValue) => {
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
                    setLoaded(true) //TODO
                }
            )
    }

    const handleRecalcElo = (event, newValue) => {
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
                    setLoaded(true) //TODO
                }
            )
    }

    const handleResetTabs = (event, newValue) => {
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
                    setLoaded(true) //TODO
                }
            )
    }

    return (
        <Paper style={{margin: 20}} elevation={20}>
            <LeagueToolbar pageTitle={pageTitle}/>
            <Box>
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
                                                align="right">{seasonsStages.seasonYear}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Stage</TableCell>
                                            <TableCell align="right">{seasonsStages.stage}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell colSpan-={2}>
                                                {canCreateLeague ? (
                                                    <Button onClick={handleButtonClick}>Create new
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
                                            <TableCell>{generalData.databaseConnection ? "active" : "none"}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>teams loaded</TableCell>
                                            <TableCell>{generalData.teamsLoaded}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>last save</TableCell>
                                            <TableCell align="right">{lastRestorePoint}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell colSpan-={2}>
                                                <Button onClick={handleRestorePointClick}>Create Restore
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
                                <Button onClick={handleRecalcCoeffs}>Recalculate current season's
                                    coeffs</Button>
                                <br/>
                                <Button onClick={handleRecalcElo}>Recalculate Elo from the beginning</Button>
                                <br/>
                                <Button onClick={handleResetTabs}>Reset tab numbers</Button>
                            </CardContent>
                        </Card>
                    </Grid>

                </Grid>
            </Box>
        </Paper>
    );
}

export default Admin;
