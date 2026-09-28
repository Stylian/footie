import {
    Box,
    Card,
    CardContent,
    CardHeader,
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
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                    <Card className="page_box" style={{width: 'fit-content', minWidth: 320, boxShadow: 'none'}} elevation={0}>
                        <CardHeader title={"Seeded"} align={"center"} className="big_header" titleTypographyProps={{variant: 'h7'}}/>
                        <CardContent style={{padding: 0}}>
                            <table className="table" align={"center"}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell className="small_header" align="right" style={{width: '15%'}}>Pos</TableCell>
                                        <TableCell className="small_header" style={{width: '60%'}}>Team</TableCell>
                                        <TableCell className="small_header" style={{width: '25%'}}>Coefficients</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {teamsStrong.map((team, index) => {
                                        return (
                                            <TableRow className={"teamClicker"} data-teamid={team.id}
                                                      onClick={goToTeam}>
                                                <TableCell align="right">{index + 1}</TableCell>
                                                <TableCell className="team_name">{team.name}</TableCell>
                                                <TableCell
                                                    align="right">{Numeral(team.coefficients
                                                    / 1000).format('0.000')}</TableCell>
                                            </TableRow>)
                                    })}
                                </TableBody>
                            </table>
                        </CardContent>
                    </Card>

                    <Card className="page_box" style={{width: 'fit-content', minWidth: 320, boxShadow: 'none'}} elevation={0}>
                        <CardHeader title={"Unseeded"} align={"center"} className="big_header" titleTypographyProps={{variant: 'h7'}}
                        />
                        <CardContent style={{padding: 0}}>
                            <table className="table" align={"center"}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell className="small_header" align="right" style={{width: '15%'}}>Pos</TableCell>
                                        <TableCell className="small_header" style={{width: '60%'}}>Team</TableCell>
                                        <TableCell className="small_header" style={{width: '25%'}}>Coefficients</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {teamsWeak.map((team, index) => {
                                        return (
                                            <TableRow className={"teamClicker"} data-teamid={team.id}
                                                      onClick={goToTeam}>
                                                <TableCell
                                                    align="right">{teamsStrong.length + index + 1}</TableCell>
                                                <TableCell className="team_name">{team.name}</TableCell>
                                                <TableCell
                                                    align="right">{Numeral(team.coefficients
                                                    / 1000).format('0.000')}</TableCell>
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


