import {Box, Card, CardContent, CardHeader, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core"
import Button from "@material-ui/core/Button"
import Numeral from "numeral"
import {useDataLoader} from "../../../DataLoaderManager"
import PageLoader from "../../../PageLoader";

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
        return (<PageLoader />)
    } else {
        const teamsStrong = data["STRONG"]
        const teamsMedium = data["MEDIUM"]
        const teamsWeak = data["WEAK"]
return (
            <Box>
                {haveToSetUpTeams ? (
                    <Button onClick={handleSettingUpButtonClick}>Set up Teams</Button>
                ) : ''}
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                    <Card style={{margin: 20, width: 'fit-content', minWidth: 280, boxShadow: 'none'}} elevation={0}>
                        <CardHeader title={"Pot 1"} align={"center"} className="match-card-header" titleTypographyProps={{variant: 'h7'}}
                        />
                        <CardContent>
                            <table className="table" align={"center"}>
                                <TableHead className="match-table-head">
                                    <TableRow>
                                        <TableCell align="right">Pos</TableCell>
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

                    <Card style={{margin: 20, width: 'fit-content', minWidth: 280, boxShadow: 'none'}} elevation={0}>
                        <CardHeader title={"Pot 2"} align={"center"} className="match-card-header" titleTypographyProps={{variant: 'h7'}}
                        />
                        <CardContent>
                            <table className="table" align={"center"}>
                                <TableHead className="match-table-head">
                                    <TableRow>
                                        <TableCell align="right">Pos</TableCell>
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

                    <Card style={{margin: 20, width: 'fit-content', minWidth: 280, boxShadow: 'none'}} elevation={0}>
                        <CardHeader title={"Pot 3"} align={"center"} className="match-card-header" titleTypographyProps={{variant: 'h7'}}
                        />
                        <CardContent>
                            <table className="table" align={"center"}>
                                <TableHead className="match-table-head">
                                    <TableRow>
                                        <TableCell align="right">Pos</TableCell>
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
                </div>
            </Box>
)
    }
}

