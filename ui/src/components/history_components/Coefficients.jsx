import React, {Component} from 'react';
import {TableHead, TableRow, TableCell, TableBody, Grid, Paper, Box} from "@material-ui/core";

class Coefficients extends Component {

    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            teams: {}
        };

    }

    componentDidMount() {
        fetch("http://localhost:8080/rest/history/coefficients")
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

    render() {

        let firstTable = {};
        let secondTable = {};
        let length = Object.keys(this.state.teams).length;
        Object.keys(this.state.teams).map((key, index) => {
            if (index < length / 2) {
                firstTable[key] = this.state.teams[key];
            } else {
                secondTable[key] = this.state.teams[key];
            }
        });

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
                                {Object.keys(firstTable).map((key, index) => {
                                    return (
                                        <TableRow>
                                            <TableCell align="right">{index + 1}</TableCell>
                                            <TableCell>{key}</TableCell>
                                            <TableCell align="right">{this.state.teams[key]}</TableCell>
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
                                {Object.keys(secondTable).map((key, index) => {
                                    return (
                                        <TableRow>
                                            <TableCell align="right">{length / 2 + index + 1}</TableCell>
                                            <TableCell>{key}</TableCell>
                                            <TableCell align="right">{this.state.teams[key]}</TableCell>
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
