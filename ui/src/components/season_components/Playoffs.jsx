import React, {Component} from 'react';
import {
    AppBar, Box,
    Card,
    CardContent,
    CardHeader,
    Grid,
    Tab,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Tabs
} from "@material-ui/core";
import QualsSeeding from "./quals_components/QualsSeeding";
import GroupsSeeding from "./groups_components/GroupsSeeding";
import GroupsMatches from "./groups_components/GroupsMatches";
import GroupsDisplay from "./groups_components/GroupsDisplay";

class Playoffs extends Component {

    constructor(props) {
        super(props);

        this.state = {
            structure: {},
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

    render() {
        return (
            <Box width={1200}>

                <Grid container spacing={1}>
                    <Grid item sm={7}>
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
                                            <TableCell className={"tree_team"} align="center"
                                                       style={{backgroundColor: '#fcf8e3'}}>
                                                {this.state.structure.gA3}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell class={"cancel"}></TableCell>
                                            <TableCell class={"cancel"}></TableCell>
                                            <TableCell className={"tree_team"} align="center"
                                                       style={{backgroundColor: '#d9edf7'}}>
                                                {this.state.structure.S1}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={"tree_team"} align="center"
                                                       style={{backgroundColor: '#fcf8e3'}}>
                                                {this.state.structure.gB2}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell class={"cancel"}></TableCell>
                                            <TableCell class={"cancel"}></TableCell>
                                            <TableCell class={"cancel"}></TableCell>
                                            <TableCell class={"cancel"}></TableCell>
                                            <TableCell className={"tree_team"} align="center"
                                                       style={{backgroundColor: '#e2e4ff'}}>
                                                {this.state.structure.F1}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell class={"tree_dist1"}></TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell class={"cancel"}></TableCell>
                                            <TableCell class={"cancel"}></TableCell>
                                            <TableCell className={"tree_team"} align="center"
                                                       style={{backgroundColor: '#d9edf7'}}>
                                                {this.state.structure.gA1}</TableCell>
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
                                            <TableCell className={"tree_team"} align="center"
                                                       style={{backgroundColor: '#b3b8ff'}}>
                                                {this.state.structure.W1}</TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell class={"tree_dist2"}></TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell class={"cancel"}></TableCell>
                                            <TableCell class={"cancel"}></TableCell>
                                            <TableCell className={"tree_team"} align="center"
                                                       style={{backgroundColor: '#d9edf7'}}>
                                                {this.state.structure.gB1}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell class={"tree_dist1"}></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell class={"cancel"}></TableCell>
                                            <TableCell class={"cancel"}></TableCell>
                                            <TableCell class={"cancel"}></TableCell>
                                            <TableCell class={"cancel"}></TableCell>
                                            <TableCell className={"tree_team"} align="center"
                                                       style={{backgroundColor: '#e2e4ff'}}>
                                                {this.state.structure.F2}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={"tree_team"} align="center"
                                                       style={{backgroundColor: '#fcf8e3'}}>
                                                {this.state.structure.gB3}</TableCell>
                                            <TableCell class={"cancel"}></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell class={"cancel"}></TableCell>
                                            <TableCell class={"cancel"}></TableCell>
                                            <TableCell className={"tree_team"} align="center"
                                                       style={{backgroundColor: '#d9edf7'}}>
                                                {this.state.structure.S2}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={"tree_team"} align="center"
                                                       style={{backgroundColor: '#fcf8e3'}}>
                                                {this.state.structure.gA2}</TableCell>
                                            <TableCell class={"cancel"}></TableCell>
                                            <TableCell class={"cancel"}></TableCell>
                                        </TableRow>
                                    </TableBody>
                                </table>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item sm={4}>
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
                                                return (
                                                    <TableRow>
                                                        <TableCell align="right">{game.homeTeam.name}</TableCell>
                                                        {game.result == null ? (
                                                            <TableCell></TableCell>
                                                        ) : (
                                                            <TableCell>{game.result.goalsMadeByHomeTeam + " - "
                                                            + game.result.goalsMadeByAwayTeam}  </TableCell>
                                                        )}
                                                        <TableCell align="left">{game.awayTeam.name}</TableCell>
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
                                                    return (
                                                        <TableRow>
                                                            <TableCell align="right">{game.homeTeam.name}</TableCell>
                                                            {game.result == null ? (
                                                                <TableCell></TableCell>
                                                            ) : (
                                                                <TableCell>{game.result.goalsMadeByHomeTeam + " - "
                                                                + game.result.goalsMadeByAwayTeam}  </TableCell>
                                                            )}
                                                            <TableCell align="left">{game.awayTeam.name}</TableCell>
                                                        </TableRow>)
                                                })}
                                            </TableBody>
                                        </table>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ) : ''}
                        {this.state.games.finals.length > 0 ? (
                            <Grid item sm={12}>
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
                                                    return (
                                                        <TableRow>
                                                            <TableCell align="right">{game.homeTeam.name}</TableCell>
                                                            {game.result == null ? (
                                                                <TableCell></TableCell>
                                                            ) : (
                                                                <TableCell>{game.result.goalsMadeByHomeTeam + " - "
                                                                + game.result.goalsMadeByAwayTeam}  </TableCell>
                                                            )}
                                                            <TableCell align="left">{game.awayTeam.name}</TableCell>
                                                        </TableRow>)
                                                })}
                                            </TableBody>
                                        </table>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ) : ''}
                    </Grid>

                </Grid>
            </Box>
        );
    }
}


export default Playoffs;
