import React, {Component} from 'react';
import {TableHead, TableRow, TableCell, TableBody, Grid, Paper, Box} from "@material-ui/core";

class Coefficients extends Component {

    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            teams: []
        };

    }

    componentDidMount() {
        fetch("/rest/history/coefficients")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState(state => {
                        return {
                            ...state,
                            isLoaded: true,
                            teams: result
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

        let teams = [...this.state.teams];
        let half_length = Math.ceil(teams.length / 2);
        let leftSide = teams.splice(0, half_length);
        let rightSide = teams;

        return (
            <Box width={800} >
            <Paper elevation={12}  style={{margin: 20}}>

                <Grid container spacing={1}>
                    <Grid item sm>
                        <table className="table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Pos</TableCell>
                                    <TableCell>Team</TableCell>
                                    <TableCell>Coefficients</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {leftSide.map((team, index) => {
                                    return (
                                        <TableRow className={"teamClicker"}
                                                  data-teamid={team.id}
                                                  onClick={this.goToTeam}
                                            style={{backgroundColor:
                                                    (index < 1) ? '#d9edf7' :
                                                            (index < 7) ? '#dff0d8' :
                                                                ''}}
                                        >
                                            <TableCell align="right">{index + 1}</TableCell>
                                            <TableCell>{team.name}</TableCell>
                                            <TableCell align="right">{team.coefficients}</TableCell>
                                        </TableRow>)
                                })}
                            </TableBody>
                        </table>
                    </Grid>

                    <Grid item sm>
                        <table className="table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Pos</TableCell>
                                    <TableCell>Team</TableCell>
                                    <TableCell>Coefficients</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rightSide.map((team, index) => {
                                    return (
                                        <TableRow className={"teamClicker"}
                                                  data-teamid={team.id}
                                                  onClick={this.goToTeam}>
                                            <TableCell align="right">{leftSide.length + index + 1}</TableCell>
                                            <TableCell>{team.name}</TableCell>
                                            <TableCell align="right">{team.coefficients}</TableCell>
                                        </TableRow>)
                                })}
                            </TableBody>
                        </table>
                    </Grid>
                </Grid>
            </Paper>
                </Box>

        );
    }
}

export default Coefficients;
