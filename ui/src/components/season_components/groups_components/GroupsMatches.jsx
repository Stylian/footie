import {Box, Card, CardContent, CardHeader, Grid, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core"
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
                <Grid container spacing={1}>
                    {Object.keys(days).map((day, index) => {
                        return (
                            <Grid item sm={round == 1 ? 4 : 6}>
                                <Card style={{margin: 20}}>
                                    <CardHeader title={"Day " + day} align={"center"}
                                                titleTypographyProps={{variant: 'h7'}}
                                    />
                                    <CardContent>
                                        <table className="table" align={"center"}>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell align="right" style={{width: '45%'}}>Home</TableCell>
                                                    <TableCell style={{width: '10%'}}>score</TableCell>
                                                    <TableCell style={{width: '45%'}}>Away</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {days[day].map((game, index) => {
                                                    return (
                                                        <TableRow>
                                                            <TableCell align="right" className={"teamClicker"}
                                                                       data-teamid={game.homeTeam.id}
                                                                       onClick={goToTeam}>
                                                                {game.homeTeam.name}</TableCell>
                                                            {game.result == null ? (
                                                                <TableCell></TableCell>
                                                            ) : (
                                                                <TableCell>{game.result.goalsMadeByHomeTeam + " - "
                                                                    + game.result.goalsMadeByAwayTeam}  </TableCell>
                                                            )}
                                                            <TableCell align="left" className={"teamClicker"}
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