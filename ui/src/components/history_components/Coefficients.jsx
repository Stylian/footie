import React, {Component} from 'react';
import {AppBar, Tabs, Tab, Typography, TableHead, TableRow, TableCell, TableBody} from "@material-ui/core";

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
                    this.setState( state => {
                        return {
                            ...state,
                            isLoaded: true,
                            teams: result
                        }
                    });
                },
                (error) => {
                    this.setState( state => {
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
            <table className = "table" >
                <TableHead>
                    <TableRow>
                        <TableCell>Pos</TableCell>
                        <TableCell>Team</TableCell>
                        <TableCell>Coefficients</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {Object.keys(this.state.teams).map((key, index) => {
                    return (
                        <TableRow >
                            <TableCell align="right" >{index+1}</TableCell >
                            <TableCell >{key}</TableCell >
                            <TableCell align="right" >{this.state.teams[key]}</TableCell >
                        </TableRow >)
                 })}
                </TableBody>
            </table>
        );
    }
}

export default Coefficients;
