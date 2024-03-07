import React from 'react'
import {Box, Card, CardContent, CardHeader, Grid, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core"
import Button from "@material-ui/core/Button"
import Numeral from "numeral"
import {useDataLoader} from "../../../DataLoaderManager"

export default function GroupsSeeding({year, round, haveToSetUpTeams}) {
    const data = useDataLoader("/rest/seasons/" + year + "/groups/" + round + "/seeding")
    const handleSettingUpButtonClick = () => {
        fetch("/rest/ops//groups/" + round + "/set", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
        })
            .then(res => res.json())
            .then(
                () => window.location.reload(),
                (error) => console.error('Error:', error)
            )
    }
    const goToTeam = (event) => window.location.href = "/teams/" + event.currentTarget.dataset.teamid

    if (data === null) {
        return (<div>Loading...</div>)
    } else {
        const teamsStrong = data["STRONG"]
        const teamsMedium = data["MEDIUM"]
        const teamsWeak = data["WEAK"]
        return (
            <Box>
                {haveToSetUpTeams ? (
                    <Button onClick={handleSettingUpButtonClick}>Set up Teams</Button>
                ) : ''}
                <Grid container spacing={1}>
                    <Grid item sm={2.5}>
                        <Card style={{margin: 20}}>
                            <CardHeader title={"Pot 1"} align={"center"} titleTypographyProps={{variant: 'h7'}}
                            />
                            <CardContent>
                                <table className="table" align={"center"}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Pos</TableCell>
                                            <TableCell>Team</TableCell>
                                            <TableCell>Coefficients</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {teamsStrong.map((team, index) => {
                                            return (
                                                <TableRow className={"teamClicker"} data-teamid={team.id}
                                                          onClick={goToTeam}>
                                                    <TableCell align="right">{index + 1}</TableCell>
                                                    <TableCell>{team.name}</TableCell>
                                                    <TableCell
                                                        align="right">{Numeral(team.coefficients / 1000).format('0.000')}</TableCell>
                                                </TableRow>)
                                        })}
                                    </TableBody>
                                </table>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item sm={2.5}>
                        <Card style={{margin: 20}}>
                            <CardHeader title={"Pot 2"} align={"center"} titleTypographyProps={{variant: 'h7'}}
                            />
                            <CardContent>
                                <table className="table" align={"center"}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Pos</TableCell>
                                            <TableCell>Team</TableCell>
                                            <TableCell>Coefficients</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {teamsMedium.map((team, index) => {
                                            return (
                                                <TableRow className={"teamClicker"} data-teamid={team.id}
                                                          onClick={goToTeam}>
                                                    <TableCell
                                                        align="right">{teamsStrong.length + index + 1}</TableCell>
                                                    <TableCell>{team.name}</TableCell>
                                                    <TableCell
                                                        align="right">{Numeral(team.coefficients / 1000).format('0.000')}</TableCell>
                                                </TableRow>)
                                        })}
                                    </TableBody>
                                </table>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item sm={2.5}>
                        <Card style={{margin: 20}}>
                            <CardHeader title={"Pot 3"} align={"center"} titleTypographyProps={{variant: 'h7'}}
                            />
                            <CardContent>
                                <table className="table" align={"center"}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Pos</TableCell>
                                            <TableCell>Team</TableCell>
                                            <TableCell>Coefficients</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {teamsWeak.map((team, index) => {
                                            return (
                                                <TableRow className={"teamClicker"} data-teamid={team.id}
                                                          onClick={goToTeam}>
                                                    <TableCell
                                                        align="right">{teamsStrong.length + teamsMedium.length + index + 1}</TableCell>
                                                    <TableCell>{team.name}</TableCell>
                                                    <TableCell
                                                        align="right">{Numeral(team.coefficients / 1000).format('0.000')}</TableCell>
                                                </TableRow>)
                                        })}
                                    </TableBody>
                                </table>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item sm={4.5}>
                        <Card style={{margin: 20}}>
                            <CardHeader title={"Rules"} align={"center"} titleTypographyProps={{variant: 'h7'}}
                            />
                            <CardContent>
                                <table className="table" style={{minWidth: 320, maxWidth: 320}}>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align={"right"}>Teams</TableCell>
                                            <TableCell>
                                                <ul>
                                                    <li>12</li>
                                                </ul>
                                            </TableCell>
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
                                            <TableCell>
                                                <ul>
                                                    <li>4 groups, round robin</li>
                                                </ul>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align={"right"}>Coefficients granted</TableCell>
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

                </Grid>
            </Box>
        )
    }
}