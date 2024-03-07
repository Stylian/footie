import {Box, Card, CardContent, CardHeader, Grid, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core"
import {useDataLoader} from "../../../DataLoaderManager"
import PageLoader from "../../../PageLoader";

export default function QualsMatches({year, round}) {
    const days = useDataLoader("/rest/seasons/" + year + "/quals/" + round + "/matches")
    const goToTeam = (event) => window.location.href = "/teams/" + event.currentTarget.dataset.teamid

    if (days === null) {
        return (<PageLoader />)
    } else {
        return (
            <Box width={1200}>
                <Grid container spacing={1}>
                    {Object.keys(days).map((day, index) => {
                        return (
                            <Grid item sm={4}>
                                <Card style={{margin: 20}}>
                                    <CardHeader title={day > 0 ? "Main Matches" : "Match Replays"} align={"center"}
                                                titleTypographyProps={{variant: 'h7'}}
                                    />
                                    <CardContent>
                                        <table className="table" align={"center"}>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Home</TableCell>
                                                    <TableCell>score</TableCell>
                                                    <TableCell>Away</TableCell>
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
                                                                       className={"teamClicker" + (homeWon ? " winner" : "")}
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
                                                                       className={"teamClicker" + (awayWon ? " winner" : "")}
                                                                       data-teamid={game.awayTeam.id}
                                                                       onClick={goToTeam}>
                                                                {game.awayTeam.name}</TableCell>
                                                        </TableRow>)
                                                })}
                                            </TableBody>
                                        </table>
                                    </CardContent>
                                </Card>
                            </Grid>
                        )
                    })}
                </Grid>
            </Box>
        )
    }
}
