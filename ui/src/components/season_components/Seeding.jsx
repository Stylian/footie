import React, {Component} from 'react';
import {TableHead, TableRow, TableCell, TableBody, Grid, Paper, Box} from "@material-ui/core";
import {switchCase} from "@babel/types";

class Seeding extends Component {

    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            teams: {},
            toGroups: [],
        };

    }

    componentDidMount() {
        fetch("http://localhost:8080/rest/seasons/" + this.props.year + "/seeding")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState(state => {
                        return {
                            ...state,
                            isLoaded: true,
                            teams: result[0],
                            toGroups: result[1].toGroups
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
// this is crap, have to change the back end with TeamDTO ?
        let teamsColored = {};
        Object.keys(this.state.teams).map((key, index) => {
                teamsColored[key] = this.state.teams[key];
        });

        let firstTable = {};
        let secondTable = {};
        let length = Object.keys(teamsColored).length;
        Object.keys(teamsColored).map((key, index) => {
            if (index < length / 2) {
                firstTable[key] = teamsColored[key];
            } else {
                secondTable[key] = teamsColored[key];
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
                                            <TableRow
                                                style={{backgroundColor:'#3c763d'}}

                                            >
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

export default Seeding;
