import LeagueToolbar from "./LeagueToolbar"
import {Box, Card, CardContent, CardHeader, Grid, Paper, TableBody, TableCell, TableRow} from "@material-ui/core"
import Button from "@material-ui/core/Button"
import {useDataLoader} from "../DataLoaderManager"

/**
 * not sure if the operations will work, used let to assign them although they are coming from const
 * @returns {JSX.Element}
 * @constructor
 */
export default function Admin() {

    const generalData = useDataLoader("/rest/seasons/")
    const seasonsStages = useDataLoader("/rest/seasons/")
    let canCreateLeague = useDataLoader("/rest/seasons/")
    let lastRestorePoint = useDataLoader("/rest/seasons/")
    const handleButtonClick = () => {
        fetch("/rest/ops/season/create", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
        })
            .then(res => res.json())
            .then(
                () => {
                    window.location.reload()
                    canCreateLeague = false
                },
            )
    }

    let handleRestorePointClick = () => {
        fetch("/rest/admin/restore_point", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
        })
            .then(res => res.text())
            .then(
                (result) => {
                    lastRestorePoint = result
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
                    alert("done recalculation")
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
                    alert("done recalculation")
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
                    alert("done recalculation")
                },
            )
    }

    if (seasonsStages === null || generalData == null) {
        return (<div>Loading...</div>)
    } else {
        return (
            <Paper style={{margin: 20}} elevation={20}>
                <LeagueToolbar pageTitle={"Admin"}/>
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
                                                <TableCell align="right">{seasonsStages.seasonYear}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Stage</TableCell>
                                                <TableCell align="right">{seasonsStages.stage}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell colSpan-={2}>
                                                    {canCreateLeague ? (
                                                        <Button onClick={handleButtonClick}>Create new Season</Button>
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
                                <CardHeader title={"Database"} align={"center"} titleTypographyProps={{variant: 'h7'}}
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
                                            titleTypographyProps={{variant: 'h7'}}/>
                                <CardContent>
                                    <Button onClick={handleRecalcCoeffs}>Recalculate current season's coeffs</Button>
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
        )
    }
}

