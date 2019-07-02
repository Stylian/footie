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
            teamsStrong: [],
            teamsMedium: [],
            teamsWeak: [],
        };

    }

    componentDidMount() {
        fetch("http://localhost:8080/rest/seasons/" + this.props.year + "/groups/" + this.props.round + "/seeding")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState(state => {

                        let teamsStrong = [];
                        Object.keys(result["strong"]).map((key, index) => {
                            teamsStrong[index] = {"name": key, "coefficients": result["strong"][key]};
                        });

                        let teamsMedium = [];
                        Object.keys(result["medium"]).map((key, index) => {
                            teamsMedium[index] = {"name": key, "coefficients": result["medium"][key]};
                        });

                        let teamsWeak = [];
                        Object.keys(result["weak"]).map((key, index) => {
                            teamsWeak[index] = {"name": key, "coefficients": result["weak"][key]};
                        });

                        return {
                            ...state,
                            isLoaded: true,
                            teamsStrong: teamsStrong,
                            teamsMedium: teamsMedium,
                            teamsWeak: teamsWeak,
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
                    <Grid item sm>
                        <Card style={{margin: 20}}>
                            <CardHeader title={"Pot 1"} align={"center"} style={{backgroundColor: '#f5f5f5'}}
                                        titleTypographyProps={{variant:'h7' }}
                            />
                            <CardContent>
                                <table className="table" align={"center"} >
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Pos</TableCell>
                                            <TableCell>Team</TableCell>
                                            <TableCell>Coefficients</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.state.teamsStrong.map((team, index) => {
                                            return (
                                                <TableRow>
                                                    <TableCell align="right">{index + 1}</TableCell>
                                                    <TableCell>{team.name}</TableCell>
                                                    <TableCell align="right">{team.coefficients}</TableCell>
                                                </TableRow>)
                                        })}
                                    </TableBody>
                                </table>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item sm>
                        <Card style={{margin: 20}}>
                            <CardHeader title={"Pot 2"} align={"center"} style={{backgroundColor: '#f5f5f5'}}
                                        titleTypographyProps={{variant:'h7' }}
                            />
                            <CardContent>
                                <table className="table" align={"center"}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Pos</TableCell>
                                            <TableCell>Team</TableCell>
                                            <TableCell>Coefficients</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.state.teamsMedium.map((team, index) => {
                                            return (
                                                <TableRow>
                                                    <TableCell align="right">{this.state.teamsStrong.length + index + 1}</TableCell>
                                                    <TableCell>{team.name}</TableCell>
                                                    <TableCell align="right">{team.coefficients}</TableCell>
                                                </TableRow>)
                                        })}
                                    </TableBody>
                                </table>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item sm>
                        <Card style={{margin: 20}}>
                            <CardHeader title={"Pot 3"} align={"center"} style={{backgroundColor: '#f5f5f5'}}
                                        titleTypographyProps={{variant:'h7' }}
                            />
                            <CardContent>
                                <table className="table" align={"center"} >
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Pos</TableCell>
                                            <TableCell>Team</TableCell>
                                            <TableCell>Coefficients</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.state.teamsWeak.map((team, index) => {
                                            return (
                                                <TableRow>
                                                    <TableCell
                                                        align="right">{this.state.teamsStrong.length + this.state.teamsMedium.length + index + 1}</TableCell>
                                                    <TableCell>{team.name}</TableCell>
                                                    <TableCell align="right">{team.coefficients}</TableCell>
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


export default GroupsDisplay;
