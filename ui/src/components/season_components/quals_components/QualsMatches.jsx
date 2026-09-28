import {Box, Card, CardContent, CardHeader, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core"
import {useDataLoader} from "../../../DataLoaderManager"
import PageLoader from "../../../PageLoader";

export default function QualsMatches({year, round}) {
    const days = useDataLoader("/rest/seasons/" + year + "/quals/" + round + "/matches")
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
                                    <CardHeader className="big_header"
                                                title={day > 0 ? "Main Matches" : "Match Replays"} align={"center"}
                                                titleTypographyProps={{variant: 'h7'}}
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
                                                    let winnerExists = game.winner != null
                                                    let homeWon = winnerExists && game.winner.id == game.homeTeam.id
                                                    let awayWon = winnerExists && game.winner.id == game.awayTeam.id
                                                    return (
                                                        <TableRow>
                                                            <TableCell align="right"
                                                                       className={"teamClicker team_name" + (homeWon ? " winner" : "")}
                                                                       data-teamid={game.homeTeam.id}
                                                                       onClick={goToTeam}>
                                                                {game.homeTeam.name}</TableCell>
                                                            {game.result == null ? (
                                                                <TableCell></TableCell>
                                                            ) : (
                                                                <TableCell>
                                                                    {game.result.goalsMadeByHomeTeam + " - "
                                                                        + game.result.goalsMadeByAwayTeam}  </TableCell>
                                                            )}
                                                            <TableCell align="left"
                                                                       className={"teamClicker team_name" + (awayWon ? " winner" : "")}
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
