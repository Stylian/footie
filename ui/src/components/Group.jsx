import React, {Component} from "react";
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
} from "@material-ui/core";
import LeagueToolbar from "./LeagueToolbar";

class Group extends Component {

    constructor(props) {
        super(props);

        this.state = {
            group: {name: null},
            isLoaded: false
        };

    }

    componentDidMount() {
        fetch("/rest/groups/" + this.props.match.params.groupId)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState(state => {

                        return {
                            ...state,
                            isLoaded: true,
                            group: result,
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
        const isOdd = n => !(isNaN(n) && ((n % 1) !== 0) && (n === 0)) && ((n % 2) !== 0) ? true : false;

        return (
            this.state.isLoaded ? (
                <Paper style={{margin: 20}} elevation={20}>
                    <LeagueToolbar pageTitle={this.state.group.name}/>

                    <Box width={1200} style={{margin: 20}}>
                        <Grid container spacing={1}>
                            <Grid item sm={7}>
                                <Card style={{margin: 20}}>
                                    <CardHeader title={this.state.group.name} align={"center"}
                                                titleTypographyProps={{variant: 'h7'}}
                                    />
                                    <CardContent>
                                        <table className="table" align={"center"}>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Pos</TableCell>
                                                    <TableCell>Team</TableCell>
                                                    <TableCell>Played</TableCell>
                                                    <TableCell>Points</TableCell>
                                                    <TableCell>W</TableCell>
                                                    <TableCell>D</TableCell>
                                                    <TableCell>L</TableCell>
                                                    <TableCell>GS</TableCell>
                                                    <TableCell>GC</TableCell>
                                                    <TableCell>+/-</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {this.state.group.teams.map((team, index) => {
                                                    return (
                                                        <TableRow className={"teamClicker"} data-teamid={team.id}
                                                                  onClick={this.goToTeam}
                                                                  style={{
                                                                      backgroundColor:
                                                                          (this.state.group.round == 1 && index < 2) ? '#d9edf7' :
                                                                              (this.state.group.round == 2 && index < 1) ? '#d9edf7' :
                                                                                  (this.state.group.round == 2 && index < 3) ? '#fcf8e3' :
                                                                                      '#f2dede'
                                                                  }}
                                                        >
                                                            <TableCell align="right">{index + 1}</TableCell>
                                                            <TableCell>{team.name}</TableCell>
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

                            <Grid item sm={5}>
                                <Card style={{margin: 20}}>
                                    <CardHeader title={"Games"} align={"center"}
                                                titleTypographyProps={{variant: 'h7'}}
                                    />
                                    <CardContent>
                                        <table className="table" align={"center"}>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Day</TableCell>
                                                    <TableCell>Home</TableCell>
                                                    <TableCell>score</TableCell>
                                                    <TableCell>Away</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {this.state.group.games.map((game, index) => {
                                                    return (
                                                        <TableRow>
                                                            {isOdd(index+1) ? (
                                                                <TableCell rowspan={2}>{game.day}</TableCell>
                                                            ) : (null)}

                                                            <TableCell align="right" className={"teamClicker"}
                                                                       data-teamid={game.homeTeam.id}
                                                                       onClick={this.goToTeam}>
                                                                {game.homeTeam.name}</TableCell>
                                                            {game.result == null ? (
                                                                <TableCell></TableCell>
                                                            ) : (
                                                                <TableCell>{game.result.goalsMadeByHomeTeam + " - "
                                                                + game.result.goalsMadeByAwayTeam}  </TableCell>
                                                            )}
                                                            <TableCell align="left" className={"teamClicker"}
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
                        </Grid>
                    </Box>
                </Paper>
            ) : (
                <span></span>
            )
        );
    }

}

export default Group;
