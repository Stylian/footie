import {Box, Card, CardContent, CardHeader, Grid, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core"
import {useDataLoader} from "../../../DataLoaderManager"

export default function GroupsDisplay({year, round}) {
    const groups = useDataLoader("/rest/seasons/" + year + "/groups/" + round)
    const goToTeam = (event) => window.location.href = "/teams/" + event.currentTarget.dataset.teamid
    const goToGroup = (event) => window.location.href = "/groups/" + event.currentTarget.dataset.groupid

    if (groups === null) {
        return (<div>Loading...</div>)
    } else {
        return (
            <Box width={1400}>
                <Grid container spacing={1}>
                    {groups.map((group, index) => {

                        return (
                            <Grid item sm={6}>
                                <Card style={{margin: 20}}>
                                    <CardHeader title={group.name} align={"center"}
                                                titleTypographyProps={{variant: 'h7'}}
                                                className={"groupClicker"} data-groupid={group.id}
                                                onClick={goToGroup}
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
                                                {group.teams.map((team, index) => {
                                                    return (
                                                        <TableRow className={"teamClicker"} data-teamid={team.id}
                                                                  onClick={goToTeam}
                                                                  style={{
                                                                      backgroundColor:
                                                                          (round == 1 && index < 2) ? '#d9edf7' :
                                                                              (round == 2 && index < 1) ? '#d9edf7' :
                                                                                  (round == 2 && index < 3) ? '#fcf8e3' :
                                                                                      '#f2dede'
                                                                  }}
                                                        >
                                                            <TableCell align="right">{index + 1}</TableCell>
                                                            <TableCell style={{
                                                                minWidth: 100,
                                                                maxWidth: 100
                                                            }}>{team.name}</TableCell>
                                                            <TableCell
                                                                align="right">{team.stats.matchesPlayed}</TableCell>
                                                            <TableCell align="right"
                                                                       className={"points_td"}>{team.stats.points}</TableCell>
                                                            <TableCell align="right">{team.stats.wins}</TableCell>
                                                            <TableCell align="right">{team.stats.draws}</TableCell>
                                                            <TableCell align="right">{team.stats.losses}</TableCell>
                                                            <TableCell
                                                                align="right">{team.stats.goalsScored}</TableCell>
                                                            <TableCell
                                                                align="right">{team.stats.goalsConceded}</TableCell>
                                                            <TableCell
                                                                align="right">{team.stats.goalDifference}</TableCell>
                                                        </TableRow>
                                                    )
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
