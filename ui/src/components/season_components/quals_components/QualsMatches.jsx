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
            games: [],
        };

    }

    componentDidMount() {
        fetch("http://localhost:8080/rest/seasons/" + this.props.year + "/quals/" + this.props.round
            + "/matches/" + this.props.day)
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

    render() {

        return (
            <Box width={500}>

                <Grid container spacing={1}>
                    <Grid item sm>
                        <Card style={{margin: 20}}>
                            <CardHeader title={"Games"} align={"center"} titleTypographyProps={{variant: 'h7'}}
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
                                        {this.state.games.map((game, index) => {
                                            return (
                                                <TableRow>
                                                    <TableCell align="left">{game.homeTeam.name}</TableCell>
                                                    <TableCell>{game.result.goalsMadeByHomeTeam + " - "
                                                    + game.result.goalsMadeByAwayTeam}  </TableCell>
                                                    <TableCell align="right">{game.awayTeam.name}</TableCell>
                                                </TableRow>)
                                        })}
                                    </TableBody>
                                </table>
                            </CardContent>
                        </Card>
                    </Grid>

                </Grid>
            </Box>

        );
    }
}


export default QualsMatches;
