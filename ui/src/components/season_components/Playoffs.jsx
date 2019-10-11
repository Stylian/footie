import React, {Component} from 'react';
import {Box, Card, CardContent, CardHeader, Grid, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";

class Playoffs extends Component {

    constructor(props) {
        super(props);

        let nullTeam = {id: -1, name: ""};
        this.state = {
            isLoaded: false,
            structure: {
                gA1: nullTeam,
                gA2: nullTeam,
                gA3: nullTeam,
                gB1: nullTeam,
                gB2: nullTeam,
                gB3: nullTeam,
                S1: nullTeam,
                S2: nullTeam,
                F1: nullTeam,
                F2: nullTeam,
                W1: nullTeam,
            },
            games: {
                "quarters": [],
                "semis": [],
                "finals": []
            },
        };

    }


    componentDidMount() {
        fetch("/rest/seasons/" + this.props.year + "/playoffs/structure")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState(state => {

                        return {
                            ...state,
                            isLoaded: true,
                            structure: result,
                        }
                    });
                },
                (error) => {
                    this.setState(state => {
                        return {
                            ...state,
                            isLoaded: true,
                            error
                        }
                    });
                }
            )

        fetch("/rest/seasons/" + this.props.year + "/playoffs/matches")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState(state => {

                        return {
                            ...state,
                            isLoaded: true,
                            games: result,
                        }
                    });
                },
                (error) => {
                    this.setState(state => {
                        return {
                            ...state,
                            isLoaded: true,
                            error
                        }
                    });
                }
            )
    }

    goToTeam = (event, newValue) => {
        window.location.href = "/teams/" + event.currentTarget.dataset.teamid;
    }

    render() {
        return (
            this.state.isLoaded ? (
                <Box >
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
                                                           data-teamid={this.state.structure.gA3.id}
                                                           onClick={this.goToTeam}>
                                                    {this.state.structure.gA3.name}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell class={"cancel"}></TableCell>
                                                <TableCell class={"cancel"}></TableCell>
                                                <TableCell className={"tree_team teamClicker"} align="center"
                                                           style={{backgroundColor: '#d9edf7'}}
                                                           data-teamid={this.state.structure.S1.id}
                                                           onClick={this.goToTeam}>
                                                    {this.state.structure.S1.name}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className={"tree_team teamClicker"} align="center"
                                                           style={{backgroundColor: '#fcf8e3'}}
                                                           data-teamid={this.state.structure.gB2.id}
                                                           onClick={this.goToTeam}>
                                                    {this.state.structure.gB2.name}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell class={"cancel"}></TableCell>
                                                <TableCell class={"cancel"}></TableCell>
                                                <TableCell class={"cancel"}></TableCell>
                                                <TableCell class={"cancel"}></TableCell>
                                                <TableCell className={"tree_team teamClicker"} align="center"
                                                           style={{backgroundColor: '#e2e4ff'}}
                                                           data-teamid={this.state.structure.F1.id}
                                                           onClick={this.goToTeam}>
                                                    {this.state.structure.F1.name}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell class={"tree_dist1"}></TableCell>
                                            </TableRow>

                                            <TableRow>
                                                <TableCell class={"cancel"}></TableCell>
                                                <TableCell class={"cancel"}></TableCell>
                                                <TableCell className={"tree_team teamClicker"} align="center"
                                                           style={{backgroundColor: '#d9edf7'}}
                                                           data-teamid={this.state.structure.gA1.id}
                                                           onClick={this.goToTeam}>
                                                    {this.state.structure.gA1.name}</TableCell>
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
                                                           data-teamid={this.state.structure.W1.id}
                                                           onClick={this.goToTeam}>
                                                    {this.state.structure.W1.name}</TableCell>
                                            </TableRow>

                                            <TableRow>
                                                <TableCell class={"tree_dist2"}></TableCell>
                                            </TableRow>

                                            <TableRow>
                                                <TableCell class={"cancel"}></TableCell>
                                                <TableCell class={"cancel"}></TableCell>
                                                <TableCell className={"tree_team teamClicker"} align="center"
                                                           style={{backgroundColor: '#d9edf7'}}
                                                           data-teamid={this.state.structure.gB1.id}
                                                           onClick={this.goToTeam}>
                                                    {this.state.structure.gB1.name}</TableCell>
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
                                                           data-teamid={this.state.structure.F2.id}
                                                           onClick={this.goToTeam}>
                                                    {this.state.structure.F2.name}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className={"tree_team teamClicker"} align="center"
                                                           style={{backgroundColor: '#fcf8e3'}}
                                                           data-teamid={this.state.structure.gB3.id}
                                                           onClick={this.goToTeam}>
                                                    {this.state.structure.gB3.name}</TableCell>
                                                <TableCell class={"cancel"}></TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell class={"cancel"}></TableCell>
                                                <TableCell class={"cancel"}></TableCell>
                                                <TableCell className={"tree_team teamClicker"} align="center"
                                                           style={{backgroundColor: '#d9edf7'}}
                                                           data-teamid={this.state.structure.S2.id}
                                                           onClick={this.goToTeam}>
                                                    {this.state.structure.S2.name}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className={"tree_team teamClicker"} align="center"
                                                           style={{backgroundColor: '#fcf8e3'}}
                                                           data-teamid={this.state.structure.gA2.id}
                                                           onClick={this.goToTeam}>
                                                    {this.state.structure.gA2.name}</TableCell>
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
                                                {this.state.games.quarters.map((game, index) => {
                                                    let winnerExists = game.winner != null;
                                                    let homeWon = winnerExists && game.winner.id == game.homeTeam.id;
                                                    let awayWon = winnerExists && game.winner.id == game.awayTeam.id;
                                                    return (
                                                        <TableRow>
                                                            <TableCell align="right" className={"teamClicker" + (homeWon ? " winner" : "")}
                                                                       data-teamid={game.homeTeam.id}
                                                                       onClick={this.goToTeam}>
                                                                {game.homeTeam.name}</TableCell>
                                                            {game.result == null ? (
                                                                <TableCell></TableCell>
                                                            ) : (
                                                                <TableCell>{game.result.goalsMadeByHomeTeam + " - "
                                                                + game.result.goalsMadeByAwayTeam}  </TableCell>
                                                            )}
                                                            <TableCell align="left" className={"teamClicker" + (awayWon ? " winner" : "")}
                                                                       data-teamid={game.awayTeam.id}
                                                                       onClick={this.goToTeam}>
                                                                {game.awayTeam.name}</TableCell>
                                                        </TableRow>)
                                                })}
                                            </TableBody>
                                        </table>
                                    </CardContent>
                                </Card>
                            </Grid>

                            {this.state.games.semis.length > 0 ? (
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
                                                    {this.state.games.semis.map((game, index) => {
                                                        let winnerExists = game.winner != null;
                                                        let homeWon = winnerExists && game.winner.id == game.homeTeam.id;
                                                        let awayWon = winnerExists && game.winner.id == game.awayTeam.id;
                                                        return (
                                                            <TableRow>
                                                                <TableCell
                                                                    align="right" className={"teamClicker" + (homeWon ? " winner" : "")}
                                                                    data-teamid={game.homeTeam.id}
                                                                    onClick={this.goToTeam}>
                                                                    {game.homeTeam.name}</TableCell>
                                                                {game.result == null ? (
                                                                    <TableCell></TableCell>
                                                                ) : (
                                                                    <TableCell>{game.result.goalsMadeByHomeTeam + " - "
                                                                    + game.result.goalsMadeByAwayTeam}  </TableCell>
                                                                )}
                                                                <TableCell align="left" className={"teamClicker" + (awayWon ? " winner" : "")}
                                                                           data-teamid={game.awayTeam.id}
                                                                           onClick={this.goToTeam}>
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
                            {this.state.games.finals.length > 0 ? (
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
                                                {this.state.games.finals.map((game, index) => {
                                                    let winnerExists = game.winner != null;
                                                    let homeWon = winnerExists && game.winner.id == game.homeTeam.id;
                                                    let awayWon = winnerExists && game.winner.id == game.awayTeam.id;
                                                    return (
                                                        <TableRow>
                                                            <TableCell
                                                                align="right"
                                                                className={"teamClicker" + (homeWon ? " winner" : "")}
                                                                data-teamid={game.homeTeam.id}
                                                                onClick={this.goToTeam}>
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
                                                                       onClick={this.goToTeam}>
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
            ) : (
                <span></span>
            )
        );
    }
}

export default Playoffs;
