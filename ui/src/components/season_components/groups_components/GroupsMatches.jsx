import {Box, Card, CardContent, CardHeader, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core"
import {useDataLoader} from "../../../DataLoaderManager"
import PageLoader from "../../../PageLoader";

export default function GroupsMatches({year, round}) {
    const days = useDataLoader("/rest/seasons/" + year + "/groups/" + round + "/matches")
    const goToTeam = (event) => window.location.href = "/teams/" + event.currentTarget.dataset.teamid

    if (days === null) {
        return (<PageLoader />)
    } else {
        return (
            <Box>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                    {Object.keys(days).map((day, index) => {
                        return (
                            <div style={{ margin: 10 }}>
                                <Card style={{width: 'fit-content', minWidth: 280, boxShadow: 'none'}} elevation={0}>
<CardHeader title={"Day " + day} align={"center"} className="big_header" titleTypographyProps={{variant: 'h7'}}
                                    />
                                    <CardContent style={{padding: 0}}>
                                        <table className="table" align={"center"}>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell className="small_header" align="right" style={{width: '45%'}}>Home</TableCell>
                                                    <TableCell className="small_header" style={{width: '10%'}}>score</TableCell>
                                                    <TableCell className="small_header" style={{width: '45%'}}>Away</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {days[day].map((game, index) => {
                                                    return (
                                                        <TableRow>
                                                            <TableCell align="right" className={"teamClicker team_name"}
                                                                       data-teamid={game.homeTeam.id}
                                                                       onClick={goToTeam}>
                                                                {game.homeTeam.name}</TableCell>
                                                            {game.result == null ? (
                                                                <TableCell></TableCell>
                                                            ) : (
                                                                <TableCell>{game.result.goalsMadeByHomeTeam + " - "
                                                                    + game.result.goalsMadeByAwayTeam}  </TableCell>
                                                            )}
                                                            <TableCell align="left" className={"teamClicker team_name"}
                                                                       data-teamid={game.awayTeam.id}
                                                                       onClick={goToTeam}>
                                                                {game.awayTeam.name}</TableCell>
                                                        </TableRow>)
                                                })}
                                            </TableBody>
                                        </table>
                                    </CardContent>
                                </Card>
                            </div>
                        )
                    })}
                </div>
            </Box>
        )
    }
}
