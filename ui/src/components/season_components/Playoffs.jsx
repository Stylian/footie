import React, {useEffect, useState} from 'react';
import {Box, Card, CardContent, CardHeader, Grid, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";

export default function Playoffs({year}) {
    const [structure, setStructure] = useState({
        gA1: {id: -1, name: ""},
        gA2: {id: -1, name: ""},
        gA3: {id: -1, name: ""},
        gB1: {id: -1, name: ""},
        gB2: {id: -1, name: ""},
        gB3: {id: -1, name: ""},
        S1: {id: -1, name: ""},
        S2: {id: -1, name: ""},
        F1: {id: -1, name: ""},
        F2: {id: -1, name: ""},
        W1: {id: -1, name: ""}
    })
    const [games, setGames] = useState({
        "quarters": [],
        "semis": [],
        "finals": []
    })
    const [isLoaded, setLoaded] = useState(false)

    useEffect(() => {
        fetch("/rest/seasons/" + year + "/playoffs/structure")
            .then(res => res.json())
            .then(
                (result) => {
                    setStructure(result)
                    setLoaded(true)
                },
                (error) => {
                    setLoaded(true);
                    console.error('Error:', error);
                }
            )

        fetch("/rest/seasons/" + year + "/playoffs/matches")
            .then(res => res.json())
            .then(
                (result) => {
                    setGames(result)
                    setLoaded(true)
                },
                (error) => {
                    setLoaded(true);
                    console.error('Error:', error);
                }
            )
    }, [])

    const goToTeam = (event) => {
        window.location.href = "/teams/" + event.currentTarget.dataset.teamid;
    }

    if (!isLoaded) {
        return (<div>Loading...</div>)
    } else {
        return (
            <Box>
                <Grid container spacing={1}>
                    <Grid item sm={6}>
                        <Card style={{margin: 20}}>
                            <CardHeader title={"tree view"} align={"center"}
                                        titleTypographyProps={{variant: 'h7'}}
                            />
                            <CardContent>
                                <table className="table tree_table" align={"center"}>

                                    <TableHead>
                                        <TableRow>
                                            <TableCell>¼ Finals</TableCell>
                                            <TableCell class={"tree_vert_dist"}></TableCell>
                                            <TableCell>½ Finals</TableCell>
                                            <TableCell class={"tree_vert_dist"}></TableCell>
                                            <TableCell>Finals</TableCell>
                                            <TableCell class={"tree_vert_dist"}></TableCell>
                                            <TableCell>Champion</TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        <TableRow>
                                            <TableCell class={"tree_dist2"}></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={"tree_team teamClicker"} align="center"
                                                       style={{backgroundColor: '#fcf8e3'}}
                                                       data-teamid={structure.gA3.id}
                                                       onClick={goToTeam}>
                                                {structure.gA3.name}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell class={"cancel"}></TableCell>
                                            <TableCell class={"cancel"}></TableCell>
                                            <TableCell className={"tree_team teamClicker"} align="center"
                                                       style={{backgroundColor: '#d9edf7'}}
                                                       data-teamid={structure.S1.id}
                                                       onClick={goToTeam}>
                                                {structure.S1.name}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={"tree_team teamClicker"} align="center"
                                                       style={{backgroundColor: '#fcf8e3'}}
                                                       data-teamid={structure.gB2.id}
                                                       onClick={goToTeam}>
                                                {structure.gB2.name}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell class={"cancel"}></TableCell>
                                            <TableCell class={"cancel"}></TableCell>
                                            <TableCell class={"cancel"}></TableCell>
                                            <TableCell class={"cancel"}></TableCell>
                                            <TableCell className={"tree_team teamClicker"} align="center"
                                                       style={{backgroundColor: '#e2e4ff'}}
                                                       data-teamid={structure.F1.id}
                                                       onClick={goToTeam}>
                                                {structure.F1.name}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell class={"tree_dist1"}></TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell class={"cancel"}></TableCell>
                                            <TableCell class={"cancel"}></TableCell>
                                            <TableCell className={"tree_team teamClicker"} align="center"
                                                       style={{backgroundColor: '#d9edf7'}}
                                                       data-teamid={structure.gA1.id}
                                                       onClick={goToTeam}>
                                                {structure.gA1.name}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell class={"tree_dist2"}></TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell class={"cancel"}></TableCell>
                                            <TableCell class={"cancel"}></TableCell>
                                            <TableCell class={"cancel"}></TableCell>
                                            <TableCell class={"cancel"}></TableCell>
                                            <TableCell class={"cancel"}></TableCell>
                                            <TableCell class={"cancel"}></TableCell>
                                            <TableCell className={"tree_team teamClicker"} align="center"
                                                       style={{backgroundColor: '#b3b8ff'}}
                                                       data-teamid={structure.W1.id}
                                                       onClick={goToTeam}>
                                                {structure.W1.name}</TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell class={"tree_dist2"}></TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell class={"cancel"}></TableCell>
                                            <TableCell class={"cancel"}></TableCell>
                                            <TableCell className={"tree_team teamClicker"} align="center"
                                                       style={{backgroundColor: '#d9edf7'}}
                                                       data-teamid={structure.gB1.id}
                                                       onClick={goToTeam}>
                                                {structure.gB1.name}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell class={"tree_dist1"}></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell class={"cancel"}></TableCell>
                                            <TableCell class={"cancel"}></TableCell>
                                            <TableCell class={"cancel"}></TableCell>
                                            <TableCell class={"cancel"}></TableCell>
                                            <TableCell className={"tree_team teamClicker"} align="center"
                                                       style={{backgroundColor: '#e2e4ff'}}
                                                       data-teamid={structure.F2.id}
                                                       onClick={goToTeam}>
                                                {structure.F2.name}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={"tree_team teamClicker"} align="center"
                                                       style={{backgroundColor: '#fcf8e3'}}
                                                       data-teamid={structure.gB3.id}
                                                       onClick={goToTeam}>
                                                {structure.gB3.name}</TableCell>
                                            <TableCell class={"cancel"}></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell class={"cancel"}></TableCell>
                                            <TableCell class={"cancel"}></TableCell>
                                            <TableCell className={"tree_team teamClicker"} align="center"
                                                       style={{backgroundColor: '#d9edf7'}}
                                                       data-teamid={structure.S2.id}
                                                       onClick={goToTeam}>
                                                {structure.S2.name}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={"tree_team teamClicker"} align="center"
                                                       style={{backgroundColor: '#fcf8e3'}}
                                                       data-teamid={structure.gA2.id}
                                                       onClick={goToTeam}>
                                                {structure.gA2.name}</TableCell>
                                            <TableCell class={"cancel"}></TableCell>
                                            <TableCell class={"cancel"}></TableCell>
                                        </TableRow>
                                    </TableBody>
                                </table>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item sm={3}>
                        <Grid item sm={12}>
                            <Card style={{margin: 20}}>
                                <CardHeader title={"¼ Finals"} align={"center"}
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
                                            {games.quarters.map((game, index) => {
                                                let winnerExists = game.winner != null;
                                                let homeWon = winnerExists && game.winner.id == game.homeTeam.id;
                                                let awayWon = winnerExists && game.winner.id == game.awayTeam.id;
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
                                                            <TableCell>{game.result.goalsMadeByHomeTeam + " - "
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

                        {games.semis.length > 0 ? (
                            <Grid item sm={12}>
                                <Card style={{margin: 20}}>
                                    <CardHeader title={"½ Finals"} align={"center"}
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
                                                {games.semis.map((game, index) => {
                                                    let winnerExists = game.winner != null;
                                                    let homeWon = winnerExists && game.winner.id == game.homeTeam.id;
                                                    let awayWon = winnerExists && game.winner.id == game.awayTeam.id;
                                                    return (
                                                        <TableRow>
                                                            <TableCell
                                                                align="right"
                                                                className={"teamClicker" + (homeWon ? " winner" : "")}
                                                                data-teamid={game.homeTeam.id}
                                                                onClick={goToTeam}>
                                                                {game.homeTeam.name}</TableCell>
                                                            {game.result == null ? (
                                                                <TableCell></TableCell>
                                                            ) : (
                                                                <TableCell>{game.result.goalsMadeByHomeTeam + " - "
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
                        ) : ''}
                    </Grid>

                    <Grid item sm={3}>
                        {games.finals.length > 0 ? (
                            <Card style={{margin: 20}}>
                                <CardHeader title={"Finals"} align={"center"}
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
                                            {games.finals.map((game, index) => {
                                                let winnerExists = game.winner != null;
                                                let homeWon = winnerExists && game.winner.id == game.homeTeam.id;
                                                let awayWon = winnerExists && game.winner.id == game.awayTeam.id;
                                                return (
                                                    <TableRow>
                                                        <TableCell
                                                            align="right"
                                                            className={"teamClicker" + (homeWon ? " winner" : "")}
                                                            data-teamid={game.homeTeam.id}
                                                            onClick={goToTeam}>
                                                            {game.homeTeam.name}</TableCell>
                                                        {game.result == null ? (
                                                            <TableCell></TableCell>
                                                        ) : (
                                                            <TableCell>{game.result.goalsMadeByHomeTeam + " - "
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
                        ) : ''}
                    </Grid>
                </Grid>
            </Box>
        )
    }
}
