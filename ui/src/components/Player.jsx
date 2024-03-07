import {Box, Card, CardContent, CardHeader, Grid, Paper, TableCell, TableRow} from "@material-ui/core"
import LeagueToolbar from "./LeagueToolbar"
import playeroftheyear from "../icons/playeroftheyear.png"
import dreamteam from "../icons/dreamteam.png"
import silvermedal from "../icons/silvermedal.png"
import goldmedal from "../icons/goldmedal.png"
import {useParams} from "react-router"
import {useDataLoader} from "../DataLoaderManager"
import PageLoader from "../PageLoader";

export default function Player() {
    const {playerId} = useParams()

    const player = useDataLoader("/rest/players/" + playerId)

    if (player === null) {
        return (<PageLoader />)
    } else {
        return (
            <Box>
                <Paper style={{margin: 20}} elevation={20}>
                    <LeagueToolbar pageTitle={player.name}/>

                    <Box width={1700} style={{margin: 20}}>
                        <Grid container spacing={1}>
                            <Grid item sm={4}>
                                <Card style={{margin: 20}}>
                                    <CardHeader title={"trophies"} align={"center"}
                                                titleTypographyProps={{variant: 'h7'}}/>
                                    <CardContent>
                                        {player.trophies.length > 0 ? (
                                            <table className="table" align={"center"}>
                                                {player.trophies.map((trophy, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell align="right">
                                                            {trophy.type === "W" ? (
                                                                <img src={goldmedal} title={"championship"}
                                                                     alt="Gold Medal"/>
                                                            ) : trophy.type === "R" ? (
                                                                <img src={silvermedal} title={"finalists"}
                                                                     alt="Silver Medal"/>
                                                            ) : trophy.type === "PL" ? (
                                                                <img src={playeroftheyear} title={"player of the year"}
                                                                     alt="Player of the Year"/>
                                                            ) : (
                                                                <img src={dreamteam} title={"dream team"}
                                                                     alt="Dream Team"/>
                                                            )}
                                                        </TableCell>
                                                        <TableCell
                                                            align="right">{"Season " + trophy.seasonNum}</TableCell>
                                                        <TableCell align="left">
                                                            {trophy.type === "W" ? "Championship" : (
                                                                trophy.type === "R" ? "Finalists" : (
                                                                    trophy.type === "PL" ? "Player of the year" : "Dream Team"
                                                                )
                                                            )}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </table>
                                        ) : (
                                            <i>nothing in the trophies case</i>
                                        )}
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </Box>
        )
    }
}
