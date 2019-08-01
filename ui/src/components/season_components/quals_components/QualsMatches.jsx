import React, {Component} from 'react';
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

class QualsMatches extends Component {

    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            days: {},
        };

    }

    componentDidMount() {
        fetch("/rest/seasons/" + this.props.year + "/quals/" + this.props.round + "/matches")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState(state => {

                        return {
                            ...state,
                            isLoaded: true,
                            days: result,
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
                <Box width={1200}>
                    <Grid container spacing={1}>
                        {Object.keys(this.state.days).map((day, index) => {
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
                                                    {this.state.days[day].map((game, index) => {
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
                                                                    <TableCell>
                                                                        {game.result.goalsMadeByHomeTeam + " - "
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
                            )
                        })}
                    </Grid>
                </Box>
            ) : (
                <span></span>
            )
        );
    }
}


export default QualsMatches;
