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

class GroupsDisplay extends Component {

    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            groups: [],
        };

    }

    componentDidMount() {
        fetch("/rest/seasons/" + this.props.year + "/groups/" + this.props.round)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState(state => {

                        return {
                            ...state,
                            isLoaded: true,
                            groups: result,
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
            <Box width={1300}>

                <Grid container spacing={1}>
                    {this.state.groups.map((group, index) => {

                        return (
                            <Grid item sm={6}>
                                <Card style={{margin: 20}}>
                                    <CardHeader title={group.name} align={"center"}
                                                titleTypographyProps={{variant: 'h7'}}
                                    />
                                    <CardContent>
                                        <table className="table" align={"center"} >
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
                                                {group.teams.map((team, index) => {
                                                    return (
                                                        <TableRow
                                                            style={{
                                                                backgroundColor:
                                                                    (this.props.round == 1 && index < 2) ? '#d9edf7' :
                                                                        (this.props.round == 2 && index < 1) ? '#d9edf7' :
                                                                        (this.props.round == 2 && index < 3) ? '#fcf8e3' :
                                                                        '#f2dede'
                                                            }}
                                                        >
                                                            <TableCell align="right">{index + 1}</TableCell>
                                                            <TableCell>{team.name}</TableCell>
                                                            <TableCell align="right">{group.teamsStats[team.name].matchesPlayed}</TableCell>
                                                            <TableCell align="right" className={"points_td"}>{group.teamsStats[team.name].points}</TableCell>
                                                            <TableCell align="right">{group.teamsStats[team.name].wins}</TableCell>
                                                            <TableCell align="right">{group.teamsStats[team.name].draws}</TableCell>
                                                            <TableCell align="right">{group.teamsStats[team.name].losses}</TableCell>
                                                            <TableCell align="right">{group.teamsStats[team.name].goalsScored}</TableCell>
                                                            <TableCell align="right">{group.teamsStats[team.name].goalsConceded}</TableCell>
                                                            <TableCell align="right">{group.teamsStats[team.name].goalDifference}</TableCell>
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

        );
    }
}


export default GroupsDisplay;
