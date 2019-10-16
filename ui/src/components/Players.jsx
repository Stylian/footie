import React, {Component} from 'react';
import LeagueToolbar from "./LeagueToolbar";
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
    TableRow, TextField,
    MenuItem
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import plus from "../icons/plus.png";

class Players extends Component {

    constructor(props) {
        super(props);

        this.state = {
            pageTitle: "Players",
            isLoaded: false,
            isLoaded2: false,
            teams: [],
            players: [],
            name: "",
            teamId: 0
        };

    }

    componentDidMount() {
        fetch("/rest/players/")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState(state => {

                        return {
                            ...state,
                            isLoaded: true,
                            players: result,
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

        fetch("/rest/teams/")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState(state => {
                        return {
                            ...state,
                            isLoaded2: true,
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


    handleChange = field => (event) => {
        let value = event.target.value;
        if (value < 0) {
            return;
        }

        if (field === "name") {
            this.setState(state => {
                return {
                    ...state,
                    name: value,
                }
            });
        } else {
            this.setState(state => {
                return {
                    ...state,
                    teamId: value,
                }
            });
        }

    }

    handleAdd = (event, newValue) => {

        fetch("/rest/players/", {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: "player_name=" + this.state.name + "&team_id=" + this.state.teamId
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

    goToTeam = (event, newValue) => {
        window.location.href = "/teams/" + event.currentTarget.dataset.teamid;
    }

    goToPlayer = (event, newValue) => {
        window.location.href = "/players/" + event.currentTarget.dataset.playerid;
    }

    render() {
        return (
            (this.state.isLoaded && this.state.isLoaded2) ? (

                <Paper style={{margin: 20}} elevation={20}>
                    <LeagueToolbar pageTitle={this.state.pageTitle}/>
                    <Box width={1200}>
                        <Grid container spacing={1}>
                            <Grid item sm={7}>
                                <Card style={{margin: 20}}>
                                    <CardHeader title={"Players"} align={"center"}
                                                titleTypographyProps={{variant: 'h7'}}
                                    />
                                    <CardContent>
                                        <Grid container spacing={1}>
                                            <Grid item sm={6}>
                                                <table className="table" align={"center"}>
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell>id</TableCell>
                                                            <TableCell>player</TableCell>
                                                            <TableCell>team</TableCell>
                                                            <TableCell></TableCell>
                                                        </TableRow>
                                                    </TableHead>

                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell></TableCell>
                                                            <TableCell>
                                                                <TextField
                                                                    style={{width: 200}}
                                                                    id="player-name"
                                                                    label="player"
                                                                    value={this.state.name}
                                                                    onChange={this.handleChange("name")}
                                                                    margin="normal"/>

                                                            </TableCell>
                                                            <TableCell>
                                                                <TextField
                                                                    style={{width: 200}}
                                                                    id="team"
                                                                    select
                                                                    label="team"
                                                                    value={this.state.teamId}
                                                                    onChange={this.handleChange("team")}
                                                                    margin="normal">
                                                                    {this.state.teams.map(team => (
                                                                        <MenuItem key={team.id} value={team.id}>
                                                                            {team.name}
                                                                        </MenuItem>
                                                                    ))}
                                                                </TextField>
                                                            </TableCell>
                                                            <TableCell>
                                                                <IconButton onClick={this.handleAdd}>
                                                                    <img src={plus} title={"add"}/>
                                                                </IconButton>
                                                            </TableCell>
                                                        </TableRow>

                                                        {this.state.players.map(player => (
                                                            <TableRow>
                                                                <TableCell>{player.id}</TableCell>
                                                                <TableCell
                                                                    className={"teamClicker"}
                                                                    data-playerid={player.id}
                                                                    onClick={this.goToPlayer}
                                                                >{player.name}</TableCell>
                                                                <TableCell
                                                                    className={"teamClicker"}
                                                                    data-teamid={player.team.id}
                                                                    onClick={this.goToTeam}
                                                                >{player.team.name}</TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </table>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            ) : (
                <span></span>
            )
        );
    }
}

export default Players;
