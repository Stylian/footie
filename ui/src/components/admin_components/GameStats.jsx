import React, {Component} from 'react';
import {TableRow, TableCell, TableBody, Grid, Paper, Box} from "@material-ui/core";

class GameStats extends Component {

    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            data: {}
        };

    }

    componentDidMount() {
        fetch("http://localhost:8080/rest/admin/game_stats")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState(state => {
                        return {
                            ...state,
                            isLoaded: true,
                            data: result
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
            <Box width={350}>
                <Paper elevation={12} style={{margin: 20}}>
                    <Grid container spacing={1}>
                        <Grid item sm>
                            <table className="table">
                                <TableBody>
                                    {Object.keys(this.state.data).map((key, index) => {
                                        return (
                                            <TableRow>
                                                <TableCell>{key}</TableCell>
                                                <TableCell align="right">{this.state.data[key]}</TableCell>
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

export default GameStats;
