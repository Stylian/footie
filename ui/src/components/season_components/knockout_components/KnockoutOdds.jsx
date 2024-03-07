import {Box, Card, CardContent, CardHeader, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core"
import Numeral from "numeral"
import {useDataLoader} from "../../../DataLoaderManager"
import PageLoader from "../../../PageLoader";

export default function KnockoutOdds({year}) {
    const teams = useDataLoader("/rest/seasons/" + year + "/playoffs/odds")
    const goToTeam = (event) => window.location.href = "/teams/" + event.currentTarget.dataset.teamid

    if (teams === null) {
        return (<PageLoader />)
    } else {
        return (
            <Box style={{margin: 10, "margin-top": 10}}>
                <Card style={{margin: 20}}>
                    <CardHeader title={"winning odds"} align={"center"} titleTypographyProps={{variant: 'h7'}}/>
                    <CardContent>
                        <table className="table tree_table" align={"center"}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>team</TableCell>
                                    <TableCell>chances</TableCell>
                                    <TableCell>odds</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {teams.map((team) => {
                                    return (
                                        <TableRow>
                                            <TableCell className={"teamClicker"} align="center"
                                                       data-teamid={team.id}
                                                       onClick={goToTeam}>
                                                {team.name}</TableCell>
                                            <TableCell
                                                align={"right"}>{Numeral(team.chances * 100).format('0') + "%"}</TableCell>
                                            <TableCell align={"right"}>{team.odds}</TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </table>
                    </CardContent>
                </Card>
            </Box>
        )
    }
}