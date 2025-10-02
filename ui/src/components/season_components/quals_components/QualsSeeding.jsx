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
import PageLoader from "../../../PageLoader";

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
        return (<PageLoader />)
    } else {
        const teamsStrong = data["STRONG"]
        const teamsWeak = data["WEAK"]
        return (
            <Box>
                {haveToSetUpTeams ? (
                    <Button onClick={handleSettingUpButtonClick}>Set up Teams</Button>
                ) : ''}
                <Grid container spacing={1}>
                    <Grid item sm={6}>
                        <Card style={{margin: 20}}>
                            <CardHeader title={"Seeded"} align={"center"} titleTypographyProps={{variant: 'h7'}}/>
                            <CardContent>
                                <table className="table" align={"center"}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell style={{width: '15%'}}>Pos</TableCell>
                                            <TableCell style={{width: '60%'}}>Team</TableCell>
                                            <TableCell style={{width: '25%'}}>Coefficients</TableCell>
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

                    <Grid item sm={6}>
                        <Card style={{margin: 20}}>
                            <CardHeader title={"Unseeded"} align={"center"} titleTypographyProps={{variant: 'h7'}}
                            />
                            <CardContent>
                                <table className="table" align={"center"}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell style={{width: '15%'}}>Pos</TableCell>
                                            <TableCell style={{width: '60%'}}>Team</TableCell>
                                            <TableCell style={{width: '25%'}}>Coefficients</TableCell>
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
                </Grid>
            </Box>
        )
    }
}
