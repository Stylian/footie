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
import Button from "@material-ui/core/Button";

class QualsSeeding extends Component {

    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            haveToSetUpTeams: props.haveToSetUpTeams,
            teamsStrong: [],
            teamsWeak: [],
        };

    }

    componentDidMount() {

        fetch("/rest/seasons/" + this.props.year + "/quals/" + this.props.round + "/seeding")
            .then(res => res.json())
            .then(
                (result) => {

                    let teamsStrong = result["STRONG"];
                    let teamsWeak = result["WEAK"];

                    this.setState(state => {
                        return {
                            ...state,
                            isLoaded: true,
                            teamsStrong: teamsStrong,
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

    handleSettingUpButtonClick = (event, newValue) => {
        fetch("/rest/ops//quals/" + this.props.round + "/set", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
        })
            .then(res => res.json())
            .then(
                (result) => {
                    window.location.reload();
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
            <Box width={800}>
                {this.state.haveToSetUpTeams ? (
                    <Button onClick={this.handleSettingUpButtonClick}>Set up Teams</Button>
                ) : ''}
                <Grid container spacing={1}>
                    <Grid item sm>
                        <Card style={{margin: 20}}>
                            <CardHeader title={"Seeded"} align={"center"} titleTypographyProps={{variant: 'h7'}}
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
                            <CardHeader title={"Unseeded"} align={"center"} titleTypographyProps={{variant: 'h7'}}
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
                                        {this.state.teamsWeak.map((team, index) => {
                                            return (
                                                <TableRow>
                                                    <TableCell
                                                        align="right">{this.state.teamsStrong.length + index + 1}</TableCell>
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


export default QualsSeeding;
