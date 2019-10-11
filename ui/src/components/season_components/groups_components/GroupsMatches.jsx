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

class GroupsMatches extends Component {

    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            days: {},
        };

    }

    componentDidMount() {
        fetch("/rest/seasons/" + this.props.year + "/groups/"
            + this.props.round + "/matches")
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
                <Box >

                    <Grid container spacing={1}>
                        {Object.keys(this.state.days).map((day, index) => {
                            return (
                                <Grid item sm={this.props.round == 1 ? 4 : 3}>
                                    <Card style={{margin: 20}}>
                                        <CardHeader title={"Day " + day} align={"center"}
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
                                                        return (
                                                            <TableRow>
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


export default GroupsMatches;
