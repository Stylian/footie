import React, {Component} from 'react';
import {TableRow, TableCell, TableBody, Grid, Paper, Box} from "@material-ui/core";

class Monitoring extends Component {

    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            data: {}
        };

    }

    componentDidMount() {
        fetch("http://localhost:8080/rest/admin/stages")
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
                                    <TableRow>
                                        <TableCell>Season Year</TableCell>
                                        <TableCell align="right">{this.state.data.seasonYear}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Stage</TableCell>
                                        <TableCell align="right">{this.state.data.stage}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </table>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
        );
    }

}

export default Monitoring;
