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
import Numeral from "numeral"
import {useDataLoader} from "../../../DataLoaderManager"
import PageLoader from "../../../PageLoader";

const phaseColor = (phaseSeed) => {
    if (phaseSeed === "CHAMPION" || phaseSeed === "TO_GROUPS") return '#d9edf7';
    if (phaseSeed === "TO_QUALS_2") return '#dff0d8';
    if (phaseSeed === "TO_QUALS_1") return '#fdf9e8';
    if (phaseSeed === "TO_PRELIMINARY") return '#f2dede';
    return undefined;
};

export default function QualsSeeding({year, round, haveToSetUpTeams}) {
    const data = useDataLoader("/rest/seasons/" + year + "/quals/" + round + "/seeding")
    const goToTeam = (event) => window.location.href = "/teams/" + event.currentTarget.dataset.teamid

    if (data === null) {
        return (<PageLoader />)
    } else {
        const teamsStrong = data["STRONG"]
        const teamsWeak = data["WEAK"]
        return (
            <Box>
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
                                                      onClick={goToTeam}
                                                      style={{backgroundColor: phaseColor(team.phaseSeed)}}>
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
                                                      onClick={goToTeam}
                                                      style={{backgroundColor: phaseColor(team.phaseSeed)}}>
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


