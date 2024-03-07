import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Grid,
    Paper,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from "@material-ui/core"
import Button from "@material-ui/core/Button"
import Numeral from "numeral"
import {useDataLoader} from "../../../DataLoaderManager"

export default function QualsSeeding({year, round, haveToSetUpTeams}) {
    const data = useDataLoader("/rest/seasons/" + year + "/quals/" + round + "/seeding")
    const handleSettingUpButtonClick = () => {
        fetch("/rest/ops/quals/" + round + "/set", {
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
        const teamsWeak = data["WEAK"]
        return (
            <Box width={1600}>
                {haveToSetUpTeams ? (
                    <Button onClick={handleSettingUpButtonClick}>Set up Teams</Button>
                ) : ''}
                <Grid container spacing={1}>
                    <Grid item sm={3}>
                        <Card style={{margin: 20}}>
                            <CardHeader title={"Seeded"} align={"center"} titleTypographyProps={{variant: 'h7'}}/>
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
                                                        align="right">{Numeral(team.coefficients
                                                        / 1000).format('0.000')}</TableCell>
                                                </TableRow>)
                                        })}
                                    </TableBody>
                                </table>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item sm={3}>
                        <Card style={{margin: 20}}>
                            <CardHeader title={"Unseeded"} align={"center"} titleTypographyProps={{variant: 'h7'}}
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
                                                        align="right">{teamsStrong.length + index + 1}</TableCell>
                                                    <TableCell>{team.name}</TableCell>
                                                    <TableCell
                                                        align="right">{Numeral(team.coefficients
                                                        / 1000).format('0.000')}</TableCell>
                                                </TableRow>)
                                        })}
                                    </TableBody>
                                </table>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item sm={4}>
                        <Card style={{margin: 20}}>
                            <CardHeader title={"Rules"} align={"center"} titleTypographyProps={{variant: 'h7'}}/>
                            <CardContent>
                                <table className="table">
                                    {round == 0 ? (
                                        <TableBody>
                                            <TableRow>
                                                <TableCell align={"right"}>Teams</TableCell>
                                                <TableCell>
                                                    <ul>
                                                        <li>{teamsStrong.length * 2}</li>
                                                    </ul>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align={"right"}>Participation</TableCell>
                                                <TableCell>
                                                    <ul>
                                                        <li>bottom {teamsStrong.length * 2} teams by coefficients
                                                        </li>
                                                    </ul>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align={"right"}>Format</TableCell>
                                                <TableCell>
                                                    <ul>
                                                        <li>2 knockout games</li>
                                                    </ul>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align={"right"}>Winners</TableCell>
                                                <TableCell>
                                                    <ul>
                                                        <li>promote to Qualifying round</li>
                                                    </ul>
                                                </TableCell>
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

                                    ) : round == 1 ? (
                                        <TableBody>
                                            <TableRow>
                                                <TableCell align={"right"}>Teams</TableCell>
                                                <TableCell>
                                                    <ul>
                                                        <li>{teamsStrong.length * 2}</li>
                                                    </ul>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align={"right"}>Participation</TableCell>
                                                <TableCell>
                                                    <ul>
                                                        <li>middle teams by coefficients</li>
                                                        <li>winners from the preliminary round</li>
                                                    </ul>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align={"right"}>Format</TableCell>
                                                <TableCell>
                                                    <ul>
                                                        <li>2 knockout games</li>
                                                    </ul>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align={"right"}>Winners</TableCell>
                                                <TableCell>
                                                    <ul>
                                                        <li>promote to the Play-off round</li>
                                                    </ul>
                                                </TableCell>
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
                                            <TableRow>
                                                <TableCell align={"right"}>Coefficients granted</TableCell>
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
                                    ) : (
                                        <TableBody>
                                            <TableRow>
                                                <TableCell align={"right"}>Teams</TableCell>
                                                <TableCell>
                                                    <ul>
                                                        <li>{teamsStrong.length * 2}</li>
                                                    </ul>
                                                </TableCell>
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
                                                <TableCell>
                                                    <ul>
                                                        <li>2 knockout games</li>
                                                    </ul>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align={"right"}>Winners</TableCell>
                                                <TableCell>
                                                    <ul>
                                                        <li>promote to the 1st Group stage</li>
                                                    </ul>
                                                </TableCell>
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
                                            <TableRow>
                                                <TableCell align={"right"}>Coefficients granted</TableCell>
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
                                    )}
                                </table>
                            </CardContent>
                        </Card>
                    </Grid>

                </Grid>
            </Box>
        )
    }
}
