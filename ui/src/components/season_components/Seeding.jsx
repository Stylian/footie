import React, {Component} from 'react';
import {TableHead, TableRow, TableCell, TableBody, Grid, Paper, Box} from "@material-ui/core";

class Seeding extends Component {

    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            teams: [],
        };

    }

    componentDidMount() {
        fetch("http://localhost:8080/rest/seasons/" + this.props.year + "/seeding")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState(state => {

                        let champion = [];
                        for (let objTeam of result[1].champion) {
                            champion.push(objTeam.name);
                        }
                        let toQuals1 = [];
                        for (let objTeam of result[1].toQuals1) {
                            toQuals1.push(objTeam.name);
                        }

                        let toQuals2 = [];
                        for (let objTeam of result[1].toQuals2) {
                            toQuals2.push(objTeam.name);
                        }

                        let toGroups = [];
                        for (let objTeam of result[1].toGroups) {
                            toGroups.push(objTeam.name);
                        }

                        let teams = [];
                        Object.keys(result[0]).map((key, index) => {
                            teams[index] = {"name": key, "coefficients": result[0][key]};
                            if (champion.find(obj => obj === key)) {
                                teams[index]["seed"] = "champion";
                            } else if (toQuals1.find(obj => obj === key)) {
                                teams[index]["seed"] = "toQuals1";
                            } else if (toQuals2.find(obj => obj === key)) {
                                teams[index]["seed"] = "toQuals2";
                            } else if (toGroups.find(obj => obj === key)) {
                                teams[index]["seed"] = "toGroups";
                            }
                        });

                        return {
                            ...state,
                            isLoaded: true,
                            teams: teams,
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

        let half_length = Math.ceil(this.state.teams.length / 2);
        let leftSide = this.state.teams.splice(0,half_length);
        let rightSide = this.state.teams;

        return (
            <Box width={800}>
                <Paper elevation={12} style={{margin: 20}}>

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
                                            <TableRow
                                                style={{backgroundColor:
                                                        (team.seed === "champion") ? '#3c763d' :
                                                            (team.seed === "toGroups") ? '#66b268' :
                                                                (team.seed === "toQuals2") ? '#aad4ab' :
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
                                            <TableRow
                                                style={{backgroundColor:
                                                        (team.seed === "champion") ? '#3c763d' :
                                                            (team.seed === "toGroups") ? '#66b268' :
                                                                (team.seed === "toQuals2") ? '#aad4ab' :
                                                                    ''}}
                                            >
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

export default Seeding;
