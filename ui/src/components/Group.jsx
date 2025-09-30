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
import LeagueToolbar from "./LeagueToolbar"
import {useParams} from "react-router"
import {useDataLoader} from "../DataLoaderManager"
import PageLoader from "../PageLoader";

export default function Group() {

    const {groupId} = useParams()
    const group = useDataLoader("/rest/groups/" + groupId)
    const goToTeam = (event) => {
        window.location.href = "/teams/" + event.currentTarget.dataset.teamid
    }
    const isOdd = n => !(isNaN(n) && ((n % 1) !== 0) && (n === 0)) && ((n % 2) !== 0) ? true : false

    if (group === null) {
        return (<PageLoader />)
    } else {
        return (
            <Paper style={{margin: 20}} elevation={20}>
                <LeagueToolbar pageTitle={"Season " + group.seasonNum + " - " + group.name}/>

                <Box style={{margin: 20}}>
                    <Grid container spacing={1}>
                        <Grid item sm={7}>
                            <Card style={{margin: 20}}>
                                <CardHeader title={group.name} align={"center"}
                                            titleTypographyProps={{variant: 'h7'}}
                                />
                                <CardContent>
                                    <table className="table" align={"center"}>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell className={"reorder_tab"}>Pos</TableCell>
                                                <TableCell className={"reorder_tab"}>Team</TableCell>
                                                <TableCell className={"reorder_tab"}>Played</TableCell>
                                                <TableCell className={"reorder_tab"}>Points</TableCell>
                                                <TableCell className={"reorder_tab"}>W</TableCell>
                                                <TableCell className={"reorder_tab"}>D</TableCell>
                                                <TableCell className={"reorder_tab"}>L</TableCell>
                                                <TableCell className={"reorder_tab"}>GS</TableCell>
                                                <TableCell className={"reorder_tab"}>GC</TableCell>
                                                <TableCell className={"reorder_tab"}>+/-</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {group.teams.map((team, index) => (
                                                <TableRow className={"teamClicker"} data-teamid={team.id}
                                                          onClick={goToTeam}
                                                          style={{
                                                              backgroundColor:
                                                                  (group.round === 1 && index < 2) ? '#d9edf7' :
                                                                      (group.round === 2 && index < 1) ? '#d9edf7' :
                                                                          (group.round === 2 && index < 3) ? '#fcf8e3' :
                                                                              '#f2dede'
                                                          }}
                                                >
                                                    <TableCell align="right">{index + 1}</TableCell>
                                                    <TableCell>{team.name}</TableCell>
                                                    <TableCell align="right">{team.stats.matchesPlayed}</TableCell>
                                                    <TableCell align="right"
                                                               className={"points_td"}>{team.stats.points}</TableCell>
                                                    <TableCell align="right">{team.stats.wins}</TableCell>
                                                    <TableCell align="right">{team.stats.draws}</TableCell>
                                                    <TableCell align="right">{team.stats.losses}</TableCell>
                                                    <TableCell align="right">{team.stats.goalsScored}</TableCell>
                                                    <TableCell align="right">{team.stats.goalsConceded}</TableCell>
                                                    <TableCell align="right">{team.stats.goalDifference}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </table>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item sm={5}>
                            <Card style={{margin: 20}}>
                                <CardHeader title={"Games"} align={"center"}
                                            titleTypographyProps={{variant: 'h7'}}
                                />
                                <CardContent>
                                    <table className="table1" align={"center"}>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Day</TableCell>
                                                <TableCell>Home</TableCell>
                                                <TableCell>score</TableCell>
                                                <TableCell>Away</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {group.games.map((game, index) => (
                                                <TableRow key={index}>
                                                    {isOdd(index + 1) && (
                                                        <TableCell rowspan={2}>{game.day}</TableCell>
                                                    )}
                                                    <TableCell align="right" className={"teamClicker"}
                                                               data-teamid={game.homeTeam.id}
                                                               onClick={goToTeam}>
                                                        {game.homeTeam.name}
                                                    </TableCell>
                                                    {game.result === null ? (
                                                        <TableCell></TableCell>
                                                    ) : (
                                                        <TableCell>{game.result.goalsMadeByHomeTeam + " - "
                                                            + game.result.goalsMadeByAwayTeam}</TableCell>
                                                    )}
                                                    <TableCell align="left" className={"teamClicker"}
                                                               data-teamid={game.awayTeam.id}
                                                               onClick={goToTeam}>
                                                        {game.awayTeam.name}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </table>
                                </CardContent>
                            </Card>
                        </Grid>

{/*                         <Grid item sm={4}> */}
{/*                             <Card style={{margin: 20}}> */}
{/*                                 <CardHeader title={"Rules"} align={"center"} titleTypographyProps={{variant: 'h7'}} */}
{/*                                 /> */}
{/*                                 <CardContent> */}
{/*                                     {group.round === 1 ? ( */}
{/*                                         <table className="table1"> */}
{/*                                             <TableBody> */}
{/*                                                 <TableRow> */}
{/*                                                     <TableCell align={"right"}>Winners</TableCell> */}
{/*                                                     <TableCell> */}
{/*                                                         <ul> */}
{/*                                                             <li>top 2 promote to the 2nd Group stage</li> */}
{/*                                                         </ul> */}
{/*                                                     </TableCell> */}
{/*                                                 </TableRow> */}
{/*                                                 <TableRow> */}
{/*                                                     <TableCell align={"right"}>Order rules</TableCell> */}
{/*                                                     <TableCell> */}
{/*                                                         <ol> */}
{/*                                                             <li>most points</li> */}
{/*                                                             <li>best goal difference</li> */}
{/*                                                             <li>most goals scored</li> */}
{/*                                                             <li>most wins</li> */}
{/*                                                             <li>highest coefficients</li> */}
{/*                                                             <li>alphabetical</li> */}
{/*                                                         </ol> */}
{/*                                                     </TableCell> */}
{/*                                                 </TableRow> */}
{/*                                                 <TableRow> */}
{/*                                                     <TableCell align={"right"}>Coefficients granted</TableCell> */}
{/*                                                     <TableCell> */}
{/*                                                         <ul> */}
{/*                                                             <li>1st place: 0.600</li> */}
{/*                                                             <li>2nd place: 0.300</li> */}
{/*                                                             <li>win: 1.000</li> */}
{/*                                                             <li>draw: 0.500</li> */}
{/*                                                             <li>each goal scored: 0.100</li> */}
{/*                                                         </ul> */}
{/*                                                     </TableCell> */}
{/*                                                 </TableRow> */}
{/*                                             </TableBody> */}
{/*                                         </table> */}
{/*                                     ) : ( */}
{/*                                         <table className="table1"> */}
{/*                                             <TableBody> */}
{/*                                                 <TableRow> */}
{/*                                                     <TableCell align={"right"}>Format</TableCell> */}
{/*                                                     <TableCell> */}
{/*                                                         <ul> */}
{/*                                                             <li>round robin</li> */}
{/*                                                             <li>same games excluded</li> */}
{/*                                                             <li>1st group stage points are carried over</li> */}
{/*                                                         </ul> */}
{/*                                                     </TableCell> */}
{/*                                                 </TableRow> */}
{/*                                                 <TableRow> */}
{/*                                                     <TableCell align={"right"}>Winners</TableCell> */}
{/*                                                     <TableCell> */}
{/*                                                         <ul> */}
{/*                                                             <li>1st team promotes to ½ finals</li> */}
{/*                                                             <li>2nd and 3rd teams promote to ¼ finals</li> */}
{/*                                                         </ul> */}
{/*                                                     </TableCell> */}
{/*                                                 </TableRow> */}
{/*                                                 <TableRow> */}
{/*                                                     <TableCell align={"right"}>Order rules</TableCell> */}
{/*                                                     <TableCell> */}
{/*                                                         <ol> */}
{/*                                                             <li>most points</li> */}
{/*                                                             <li>best goal difference</li> */}
{/*                                                             <li>most goals scored</li> */}
{/*                                                             <li>most wins</li> */}
{/*                                                             <li>highest coefficients</li> */}
{/*                                                             <li>alphabetical</li> */}
{/*                                                         </ol> */}
{/*                                                     </TableCell> */}
{/*                                                 </TableRow> */}
{/*                                                 <TableRow> */}
{/*                                                     <TableCell align={"right"}>Coefficients granted</TableCell> */}
{/*                                                     <TableCell> */}
{/*                                                         <ul> */}
{/*                                                             <li>1st place: 2.000</li> */}
{/*                                                             <li>2nd place: 0.600</li> */}
{/*                                                             <li>3rd place: 0.300</li> */}
{/*                                                             <li>win: 1.000</li> */}
{/*                                                             <li>draw: 0.500</li> */}
{/*                                                             <li>each goal scored: 0.100</li> */}
{/*                                                         </ul> */}
{/*                                                     </TableCell> */}
{/*                                                 </TableRow> */}
{/*                                             </TableBody> */}
{/*                                         </table> */}
{/*                                     )} */}
{/*                                 </CardContent> */}
{/*                             </Card> */}
{/*                         </Grid> */}

                    </Grid>
                </Box>
            </Paper>
        )
    }
}
