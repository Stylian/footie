import React, {useEffect, useState} from 'react';
import LeagueToolbar from "./LeagueToolbar";
import {Box, Card, CardContent, CardHeader, Grid, Paper, TableBody, TableCell, TableRow} from "@material-ui/core";
import Button from "@material-ui/core/Button";

export default function Admin() {

    const [pageTitle] = useState("Admin")
    const [generalData, setGeneralData] = useState({})
    const [canCreateLeague, setCanCreateLeague] = useState(false)
    const [lastRestorePoint, setLastRestorePoint] = useState("")

    useEffect(() => {

        fetch("/rest/admin/general_data")
            .then(res => res.json())
            .then(
                (result) => {
                    setGeneralData(result)
                },
            )

        fetch("/rest/ops/league/can_create_season")
            .then(res => res.json())
            .then(
                (result) => {
                    setCanCreateLeague(result[0])
                },
            )

        fetch("/rest/admin/restore_point")
            .then(res => res.text())
            .then(
                (result) => {
                    setLastRestorePoint(result)
                },
            )
    }, []);

    const handleButtonClick = () => {
        fetch("/rest/ops/season/create", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
        })
            .then(res => res.json())
            .then(
                () => {
                    window.location.reload();
                    setCanCreateLeague(false)
                },
            )
    }

    const handleRestorePointClick = () => {
        fetch("/rest/admin/restore_point", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
        })
            .then(res => res.text())
            .then(
                (result) => {
                    setLastRestorePoint(result)
                },
            )
    }

    const handleRecalcCoeffs = () => {
        fetch("/rest/admin/recalculate_coeffs", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
        })
            .then(res => res.text())
            .then(
                () => {
                    alert("done recalculation");
                },
            )
    }

    const handleRecalcElo = () => {
        fetch("/rest/admin/recalculate_elo", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
        })
            .then(res => res.text())
            .then(
                () => {
                    alert("done recalculation");
                },
            )
    }

    const handleResetTabs = () => {
        fetch("/rest/admin/reset_tabs", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
        })
            .then(res => res.text())
            .then(
                () => {
                    alert("done recalculation");
                },
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

