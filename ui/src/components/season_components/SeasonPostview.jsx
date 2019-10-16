import React, {Component} from 'react';
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Grid, MenuItem,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField
} from "@material-ui/core";
import goldmedal from "../../icons/goldmedal.png";
import silvermedal from "../../icons/silvermedal.png";
import playeroftheyear from "../../icons/playeroftheyear.png";
import dreamteam from "../../icons/dreamteam.png";
import Button from "@material-ui/core/Button";

class SeasonPostview extends Component {

    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            isLoaded2: false,
            isLoaded3: false,
            data: {},
            overachievers: null,
            underperformers: null,
            playerOfTheYear: null,
            gk: null,
            dl: null,
            dr: null,
            dcl: null,
            dcr: null,
            cml: null,
            cmr: null,
            aml: null,
            amr: null,
            amc: null,
            st: null,
        };

    }

    componentDidMount() {
        fetch("/rest/seasons/" + this.props.year + "/overview")
            .then(res => res.json())
            .then(
                (result) => {

                    this.setState(state => {
                        return {
                            ...state,
                            isLoaded: true,
                            data: result,
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
        fetch("/rest/players/")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState(state => {

                        return {
                            ...state,
                            isLoaded3: true,
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

    goToTeam = (event, newValue) => {
        window.location.href = "/teams/" + event.currentTarget.dataset.teamid;
    }

    goToPlayer = (event, newValue) => {
        window.location.href = "/players/" + event.currentTarget.dataset.playerid;
    }

    handleChange = field => (event) => {
        let value = event.target.value;
        if (value < 0) {
            return;
        }

        if (field === "overachievers") {
            this.setState(state => {
                return {
                    ...state,
                    overachievers: value,
                }
            });
        } else if (field === "underperformers") {
            this.setState(state => {
                return {
                    ...state,
                    underperformers: value,
                }
            });

        } else if (field === "playerOfTheYear") {
            this.setState(state => {
                return {
                    ...state,
                    playerOfTheYear: value,
                }
            });

        } else if (field === "gk") {
            this.setState(state => {
                return {
                    ...state,
                    gk: value,
                }
            });

        } else if (field === "dl") {
            this.setState(state => {
                return {
                    ...state,
                    dl: value,
                }
            });

        } else if (field === "dr") {
            this.setState(state => {
                return {
                    ...state,
                    dr: value,
                }
            });

        } else if (field === "dcl") {
            this.setState(state => {
                return {
                    ...state,
                    dcl: value,
                }
            });

        } else if (field === "dcr") {
            this.setState(state => {
                return {
                    ...state,
                    dcr: value,
                }
            });

        } else if (field === "cml") {
            this.setState(state => {
                return {
                    ...state,
                    cml: value,
                }
            });

        } else if (field === "cmr") {
            this.setState(state => {
                return {
                    ...state,
                    cmr: value,
                }
            });

        } else if (field === "amr") {
            this.setState(state => {
                return {
                    ...state,
                    amr: value,
                }
            });

        } else if (field === "aml") {
            this.setState(state => {
                return {
                    ...state,
                    aml: value,
                }
            });

        } else if (field === "amc") {
            this.setState(state => {
                return {
                    ...state,
                    amc: value,
                }
            });

        } else if (field === "st") {
            this.setState(state => {
                return {
                    ...state,
                    st: value,
                }
            });

        } else {
        }

    }

    handlePublish = (event, newValue) => {
        fetch("/rest/seasons/" + this.props.year + "/publish", {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: "overachievers=" + this.state.overachievers
                + "&underperformers=" + this.state.underperformers
                + "&playerOfTheYear=" + this.state.playerOfTheYear
                + "&gk=" + this.state.gk
                + "&dl=" + this.state.dl
                + "&dr=" + this.state.dr
                + "&dcl=" + this.state.dcl
                + "&dcr=" + this.state.dcr
                + "&cml=" + this.state.cml
                + "&cmr=" + this.state.cmr
                + "&amr=" + this.state.amr
                + "&aml=" + this.state.aml
                + "&amc=" + this.state.amc
                + "&st=" + this.state.st
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
                            error
                        }
                    });
                }
            )
    }


    render() {

        return (
            (this.state.isLoaded && this.state.isLoaded2 && this.state.isLoaded3) ? (
                <Box>
                    {this.state.data.haveToPublish ? (
                        <Button onClick={this.handlePublish}>Publish</Button>
                    ) : ''}
                    <Grid container spacing={1}>
                        <Grid item sm={6}>
                            <Card style={{margin: 20}}>
                                <CardHeader title={"Team Awards"} align={"center"}
                                            titleTypographyProps={{variant: 'h7'}}
                                />
                                <CardContent>
                                    <Grid container spacing={1}>
                                        <Grid item sm={4}>
                                            <Grid container spacing={1}>
                                                <Grid item sm={12}>
                                                    <table className="table" align={"center"}>
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell>champion</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            <TableRow className={"teamClicker"}
                                                                      data-teamid={this.state.data.winner.id}
                                                                      onClick={this.goToTeam}
                                                                      style={{backgroundColor: 'rgb(179, 184, 255)'}}>
                                                                <TableCell style={{minWidth:100, maxWidth:100}}>
                                                                    <img src={goldmedal} title={"1st place"}/>
                                                                    {this.state.data.winner.name}
                                                                </TableCell>
                                                            </TableRow>
                                                        </TableBody>
                                                    </table>
                                                </Grid>
                                                <Grid item sm={12}>
                                                    <table className="table" align={"center"}>
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell>runner-up</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            <TableRow className={"teamClicker"}
                                                                      data-teamid={this.state.data.runner_up.id}
                                                                      onClick={this.goToTeam}
                                                                      style={{backgroundColor: 'rgb(226, 228, 255)'}}>
                                                                <TableCell style={{minWidth:100, maxWidth:100}} >
                                                                    <img src={silvermedal} title={"2nd place"}/>
                                                                    {this.state.data.runner_up.name}
                                                                </TableCell>
                                                            </TableRow>
                                                        </TableBody>
                                                    </table>
                                                </Grid>
                                                <Grid item sm={12}>
                                                    <table className="table" align={"center"}>
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell>positions 3rd-4th</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            <TableRow className={"teamClicker"}
                                                                      data-teamid={this.state.data.semifinalist1.id}
                                                                      onClick={this.goToTeam}
                                                                      style={{backgroundColor: 'rgb(217, 237, 247)'}}>
                                                                <TableCell style={{minWidth:100, maxWidth:100}}>
                                                                    {this.state.data.semifinalist1.name}
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow className={"teamClicker"}
                                                                      data-teamid={this.state.data.semifinalist2.id}
                                                                      onClick={this.goToTeam}
                                                                      style={{backgroundColor: 'rgb(217, 237, 247)'}}>
                                                                <TableCell style={{minWidth:100, maxWidth:100}}>
                                                                    {this.state.data.semifinalist2.name}
                                                                </TableCell>
                                                            </TableRow>
                                                        </TableBody>
                                                    </table>
                                                </Grid>
                                                <Grid item sm={12}>
                                                    <table className="table" align={"center"}>
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell>positions 5th-6th</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            <TableRow className={"teamClicker"}
                                                                      data-teamid={this.state.data.quarterfinalist1.id}
                                                                      onClick={this.goToTeam}
                                                                      style={{backgroundColor: 'rgb(252, 248, 227)'}}>
                                                                <TableCell style={{minWidth:100, maxWidth:100}}>
                                                                    {this.state.data.quarterfinalist1.name}
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow className={"teamClicker"}
                                                                      data-teamid={this.state.data.quarterfinalist2.id}
                                                                      onClick={this.goToTeam}
                                                                      style={{backgroundColor: 'rgb(252, 248, 227)'}}>
                                                                <TableCell style={{minWidth:100, maxWidth:100}}>
                                                                    {this.state.data.quarterfinalist2.name}
                                                                </TableCell>
                                                            </TableRow>
                                                        </TableBody>
                                                    </table>
                                                </Grid>
                                            </Grid>
                                        </Grid>

                                        <Grid item sm={8}>
                                            <Grid container spacing={1}>
                                                <Grid item sm={12}>
                                                    <table className="table" align={"left"}>
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell colSpan={3}>highest scoring game</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            <TableRow
                                                                style={{backgroundColor: '#e6ffe6'}}>
                                                                <TableCell align="right"
                                                                           className={"teamClicker"}
                                                                           style={{minWidth:100, maxWidth:100}}
                                                                           data-teamid={this.state.data.highestScoringGame.homeTeam.id}
                                                                           onClick={this.goToTeam}>
                                                                    {this.state.data.highestScoringGame.homeTeam.name}</TableCell>
                                                                <TableCell style={{minWidth:40, maxWidth:40}}>
                                                                    {this.state.data.highestScoringGame.result.goalsMadeByHomeTeam + " - "
                                                                    + this.state.data.highestScoringGame.result.goalsMadeByAwayTeam}  </TableCell>
                                                                <TableCell align="left"
                                                                           className={"teamClicker"}
                                                                           style={{minWidth:100, maxWidth:100}}
                                                                           data-teamid={this.state.data.highestScoringGame.awayTeam.id}
                                                                           onClick={this.goToTeam}>
                                                                    {this.state.data.highestScoringGame.awayTeam.name}</TableCell>
                                                            </TableRow>
                                                        </TableBody>
                                                    </table>
                                                </Grid>
                                                <Grid item sm={12}>
                                                    <table className="table" align={"left"}>
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell colSpan={3}>best win</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            <TableRow
                                                                style={{backgroundColor: '#e6ffe6'}}>
                                                                <TableCell align="right"
                                                                           className={"teamClicker"}
                                                                           style={{minWidth:100, maxWidth:100}}
                                                                           data-teamid={this.state.data.bestWin.homeTeam.id}
                                                                           onClick={this.goToTeam}>
                                                                    {this.state.data.bestWin.homeTeam.name}</TableCell>
                                                                <TableCell style={{minWidth:40, maxWidth:40}}>
                                                                    {this.state.data.bestWin.result.goalsMadeByHomeTeam + " - "
                                                                    + this.state.data.bestWin.result.goalsMadeByAwayTeam}  </TableCell>
                                                                <TableCell align="left"
                                                                           className={"teamClicker"}
                                                                           style={{minWidth:100, maxWidth:100}}
                                                                           data-teamid={this.state.data.bestWin.awayTeam.id}
                                                                           onClick={this.goToTeam}>
                                                                    {this.state.data.bestWin.awayTeam.name}</TableCell>
                                                            </TableRow>
                                                        </TableBody>
                                                    </table>
                                                </Grid>
                                                <Grid item sm={12}>
                                                    <table className="table" align={"left"}>
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell colSpan={3}>worst result</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            <TableRow
                                                                style={{backgroundColor: '#f2dede'}}>
                                                                <TableCell align="right"
                                                                           className={"teamClicker"}
                                                                           style={{minWidth:100, maxWidth:100}}
                                                                           data-teamid={this.state.data.worstResult.homeTeam.id}
                                                                           onClick={this.goToTeam}>
                                                                    {this.state.data.worstResult.homeTeam.name}</TableCell>
                                                                <TableCell style={{minWidth:40, maxWidth:40}}>
                                                                    {this.state.data.worstResult.result.goalsMadeByHomeTeam + " - "
                                                                    + this.state.data.worstResult.result.goalsMadeByAwayTeam}  </TableCell>
                                                                <TableCell align="left"
                                                                           className={"teamClicker"}
                                                                           style={{minWidth:100, maxWidth:100}}
                                                                           data-teamid={this.state.data.worstResult.awayTeam.id}
                                                                           onClick={this.goToTeam}>
                                                                    {this.state.data.worstResult.awayTeam.name}</TableCell>
                                                            </TableRow>
                                                        </TableBody>
                                                    </table>
                                                </Grid>

                                                <Grid item sm={12}>
                                                    <table className="table" align={"left"}>
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell>overachievers</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {this.state.data.overachievers == null ? (
                                                                <TableRow>
                                                                    <TableCell>
                                                                        <TextField
                                                                            style={{width: 200}}
                                                                            id="overachievers"
                                                                            select
                                                                            label="overachievers"
                                                                            value={this.state.overachievers}
                                                                            onChange={this.handleChange("overachievers")}
                                                                            margin="normal">
                                                                            {this.state.teams.map(team => (
                                                                                <MenuItem key={team.id} value={team.id}>
                                                                                    {team.name}
                                                                                </MenuItem>
                                                                            ))}
                                                                        </TextField>
                                                                    </TableCell>
                                                                </TableRow>
                                                            ) : (
                                                                <TableRow className={"teamClicker"}
                                                                          data-teamid={this.state.data.overachievers.id}
                                                                          onClick={this.goToTeam}
                                                                          style={{backgroundColor: 'rgb(226, 228, 255)'}}>
                                                                    <TableCell  style={{minWidth:100, maxWidth:100}}>
                                                                        {this.state.data.overachievers.name}
                                                                    </TableCell>
                                                                </TableRow>)}

                                                        </TableBody>
                                                    </table>
                                                </Grid>
                                                <Grid item sm={12}>
                                                    <table className="table" align={"left"}>
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell>underperformers</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {this.state.data.underperformers == null ? (
                                                                <TableRow>
                                                                    <TableCell>
                                                                        <TextField
                                                                            style={{width: 200}}
                                                                            id="underperformers"
                                                                            select
                                                                            label="underperformers"
                                                                            value={this.state.underperformers}
                                                                            onChange={this.handleChange("underperformers")}
                                                                            margin="normal">
                                                                            {this.state.teams.map(team => (
                                                                                <MenuItem key={team.id} value={team.id}>
                                                                                    {team.name}
                                                                                </MenuItem>
                                                                            ))}
                                                                        </TextField>
                                                                    </TableCell>
                                                                </TableRow>
                                                            ) : (
                                                                <TableRow className={"teamClicker"}
                                                                          data-teamid={this.state.data.underperformers.id}
                                                                          onClick={this.goToTeam}
                                                                          style={{backgroundColor: '#f2dede'}}>
                                                                    <TableCell  style={{minWidth:100, maxWidth:100}}>
                                                                        {this.state.data.underperformers.name}
                                                                    </TableCell>
                                                                </TableRow>)}
                                                        </TableBody>
                                                    </table>
                                                </Grid>
                                            </Grid>
                                        </Grid>

                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item sm={4}>
                            <Card style={{margin: 20}}>
                                <CardHeader title={"Player Awards"} align={"center"}
                                            titleTypographyProps={{variant: 'h7'}}
                                />
                                <CardContent>
                                    <Grid container spacing={1}>
                                        <Grid item sm={12}>
                                            <table className="table" align={"center"}>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell colSpan={2}>player of the year</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {this.state.data.player_of_the_year == null ? (
                                                        <TableRow>
                                                            <TableCell>
                                                                <TextField
                                                                    style={{width: 200}}
                                                                    id="playerOfTheYear"
                                                                    select
                                                                    label="player of the year"
                                                                    value={this.state.playerOfTheYear}
                                                                    onChange={this.handleChange("playerOfTheYear")}
                                                                    margin="normal">
                                                                    {this.state.players.map(player => (
                                                                        <MenuItem key={player.id} value={player.id}>
                                                                            {player.name}
                                                                        </MenuItem>
                                                                    ))}
                                                                </TextField>
                                                            </TableCell>
                                                        </TableRow>
                                                    ) : (
                                                        <TableRow
                                                                  style={{backgroundColor: 'rgb(179, 184, 255)'}}>
                                                            <TableCell className={"playerClicker"}
                                                                       data-playerid={this.state.data.player_of_the_year.id}
                                                                       style={{minWidth:150, maxWidth:150}}
                                                                       onClick={this.goToPlayer}>
                                                                <img src={playeroftheyear} title={"player of the year"}/>
                                                                {this.state.data.player_of_the_year.name}
                                                            </TableCell>
                                                            <TableCell className={"teamClicker"}
                                                                       data-teamid={this.state.data.player_of_the_year.team.id}
                                                                       style={{minWidth:100, maxWidth:100}}
                                                                       onClick={this.goToTeam}>
                                                                {this.state.data.player_of_the_year.team.name}
                                                            </TableCell>
                                                        </TableRow>)}

                                                </TableBody>
                                            </table>
                                        </Grid>

                                        <Grid item sm={12}>
                                            <table className="table" align={"center"}>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell colSpan={3}>
                                                            <img src={dreamteam} title={"selected in a dream team"}/>
                                                            dream team</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    <TableBody>
                                                        {this.state.data.gk == null ? (
                                                            <TableRow>
                                                                <TableCell>GK</TableCell>
                                                                <TableCell>
                                                                    <TextField
                                                                        style={{width: 200}}
                                                                        id="gk"
                                                                        select
                                                                        label="goalkeeper"
                                                                        value={this.state.gk}
                                                                        onChange={this.handleChange("gk")}
                                                                        margin="normal">
                                                                        {this.state.players.map(player => (
                                                                            <MenuItem key={player.id} value={player.id}>
                                                                                {player.name}
                                                                            </MenuItem>
                                                                        ))}
                                                                    </TextField>
                                                                </TableCell>
                                                                <TableCell></TableCell>
                                                            </TableRow>
                                                        ) : (
                                                            <TableRow
                                                                      style={{backgroundColor: '#d2a679'}}>
                                                                <TableCell>GK</TableCell>
                                                                <TableCell
                                                                    className={"playerClicker"}
                                                                    data-playerid={this.state.data.gk.id}
                                                                    onClick={this.goToPlayer}
                                                                >
                                                                    {this.state.data.gk.name}
                                                                </TableCell>
                                                                <TableCell className={"teamClicker"}
                                                                           data-teamid={this.state.data.gk.team.id}
                                                                            style={{minWidth:100, maxWidth:100}} onClick={this.goToTeam}>
                                                                    {this.state.data.gk.team.name}
                                                                </TableCell>
                                                            </TableRow>)}

                                                        {this.state.data.dcl == null ? (
                                                            <TableRow>
                                                                <TableCell>DC</TableCell>
                                                                <TableCell>
                                                                    <TextField
                                                                        style={{width: 200}}
                                                                        id="dcl"
                                                                        select
                                                                        label="central defender"
                                                                        value={this.state.dcl}
                                                                        onChange={this.handleChange("dcl")}
                                                                        margin="normal">
                                                                        {this.state.players.map(player => (
                                                                            <MenuItem key={player.id} value={player.id}>
                                                                                {player.name}
                                                                            </MenuItem>
                                                                        ))}
                                                                    </TextField>
                                                                </TableCell>
                                                                <TableCell></TableCell>
                                                            </TableRow>
                                                        ) : (
                                                            <TableRow
                                                                style={{backgroundColor: 'rgb(217, 237, 247)'}}>
                                                                <TableCell>DC</TableCell>
                                                                <TableCell
                                                                    className={"playerClicker"}
                                                                    data-playerid={this.state.data.dcl.id}
                                                                      style={{minWidth:150, maxWidth:150}}  onClick={this.goToPlayer}
                                                                >
                                                                    {this.state.data.dcl.name}
                                                                </TableCell>
                                                                <TableCell className={"teamClicker"}
                                                                           data-teamid={this.state.data.dcl.team.id}
                                                                            style={{minWidth:100, maxWidth:100}} onClick={this.goToTeam}>
                                                                    {this.state.data.dcl.team.name}
                                                                </TableCell>
                                                            </TableRow>)}

                                                        {this.state.data.dcr == null ? (
                                                            <TableRow>
                                                                <TableCell>DC</TableCell>
                                                                <TableCell>
                                                                    <TextField
                                                                        style={{width: 200}}
                                                                        id="dcr"
                                                                        select
                                                                        label="central defender"
                                                                        value={this.state.dcr}
                                                                        onChange={this.handleChange("dcr")}
                                                                        margin="normal">
                                                                        {this.state.players.map(player => (
                                                                            <MenuItem key={player.id} value={player.id}>
                                                                                {player.name}
                                                                            </MenuItem>
                                                                        ))}
                                                                    </TextField>
                                                                </TableCell>
                                                                <TableCell></TableCell>
                                                            </TableRow>
                                                        ) : (
                                                            <TableRow
                                                                style={{backgroundColor: 'rgb(217, 237, 247)'}}>
                                                                <TableCell>DC</TableCell>
                                                                <TableCell
                                                                    className={"playerClicker"}
                                                                    data-playerid={this.state.data.dcr.id}
                                                                      style={{minWidth:150, maxWidth:150}}  onClick={this.goToPlayer}
                                                                >
                                                                    {this.state.data.dcr.name}
                                                                </TableCell>
                                                                <TableCell className={"teamClicker"}
                                                                           data-teamid={this.state.data.dcr.team.id}
                                                                            style={{minWidth:100, maxWidth:100}} onClick={this.goToTeam}>
                                                                    {this.state.data.dcr.team.name}
                                                                </TableCell>
                                                            </TableRow>)}

                                                        {this.state.data.dl == null ? (
                                                            <TableRow>
                                                                <TableCell>DL</TableCell>
                                                                <TableCell>
                                                                    <TextField
                                                                        style={{width: 200}}
                                                                        id="dl"
                                                                        select
                                                                        label="left defender"
                                                                        value={this.state.dl}
                                                                        onChange={this.handleChange("dl")}
                                                                        margin="normal">
                                                                        {this.state.players.map(player => (
                                                                            <MenuItem key={player.id} value={player.id}>
                                                                                {player.name}
                                                                            </MenuItem>
                                                                        ))}
                                                                    </TextField>
                                                                </TableCell>
                                                                <TableCell></TableCell>
                                                            </TableRow>
                                                        ) : (
                                                            <TableRow
                                                                style={{backgroundColor: 'rgb(217, 237, 247)'}}>
                                                                <TableCell>DL</TableCell>
                                                                <TableCell
                                                                    className={"playerClicker"}
                                                                    data-playerid={this.state.data.dl.id}
                                                                      style={{minWidth:150, maxWidth:150}}  onClick={this.goToPlayer}
                                                                >
                                                                    {this.state.data.dl.name}
                                                                </TableCell>
                                                                <TableCell className={"teamClicker"}
                                                                           data-teamid={this.state.data.dl.team.id}
                                                                            style={{minWidth:100, maxWidth:100}} onClick={this.goToTeam}>
                                                                    {this.state.data.dl.team.name}
                                                                </TableCell>
                                                            </TableRow>)}

                                                        {this.state.data.dr == null ? (
                                                            <TableRow>
                                                                <TableCell>DR</TableCell>
                                                                <TableCell>
                                                                    <TextField
                                                                        style={{width: 200}}
                                                                        id="dr"
                                                                        select
                                                                        label="right defender"
                                                                        value={this.state.dr}
                                                                        onChange={this.handleChange("dr")}
                                                                        margin="normal">
                                                                        {this.state.players.map(player => (
                                                                            <MenuItem key={player.id} value={player.id}>
                                                                                {player.name}
                                                                            </MenuItem>
                                                                        ))}
                                                                    </TextField>
                                                                </TableCell>
                                                                <TableCell></TableCell>
                                                            </TableRow>
                                                        ) : (
                                                            <TableRow
                                                                style={{backgroundColor: 'rgb(217, 237, 247)'}}>
                                                                <TableCell>DR</TableCell>
                                                                <TableCell
                                                                    className={"playerClicker"}
                                                                    data-playerid={this.state.data.dr.id}
                                                                      style={{minWidth:150, maxWidth:150}}  onClick={this.goToPlayer}
                                                                >
                                                                    {this.state.data.dr.name}
                                                                </TableCell>
                                                                <TableCell className={"teamClicker"}
                                                                           data-teamid={this.state.data.dr.team.id}
                                                                            style={{minWidth:100, maxWidth:100}} onClick={this.goToTeam}>
                                                                    {this.state.data.dr.team.name}
                                                                </TableCell>
                                                            </TableRow>)}

                                                        {this.state.data.cml == null ? (
                                                            <TableRow>
                                                                <TableCell>CM</TableCell>
                                                                <TableCell>
                                                                    <TextField
                                                                        style={{width: 200}}
                                                                        id="cml"
                                                                        select
                                                                        label="central midfielder"
                                                                        value={this.state.cml}
                                                                        onChange={this.handleChange("cml")}
                                                                        margin="normal">
                                                                        {this.state.players.map(player => (
                                                                            <MenuItem key={player.id} value={player.id}>
                                                                                {player.name}
                                                                            </MenuItem>
                                                                        ))}
                                                                    </TextField>
                                                                </TableCell>
                                                                <TableCell></TableCell>
                                                            </TableRow>
                                                        ) : (
                                                            <TableRow
                                                                style={{backgroundColor: '#dbf0db'}}>
                                                                <TableCell>CM</TableCell>
                                                                <TableCell
                                                                    className={"playerClicker"}
                                                                    data-playerid={this.state.data.cml.id}
                                                                      style={{minWidth:150, maxWidth:150}}  onClick={this.goToPlayer}
                                                                >
                                                                    {this.state.data.cml.name}
                                                                </TableCell>
                                                                <TableCell className={"teamClicker"}
                                                                           data-teamid={this.state.data.cml.team.id}
                                                                            style={{minWidth:100, maxWidth:100}} onClick={this.goToTeam}>
                                                                    {this.state.data.cml.team.name}
                                                                </TableCell>
                                                            </TableRow>)}

                                                        {this.state.data.cmr == null ? (
                                                            <TableRow>
                                                                <TableCell>CM</TableCell>
                                                                <TableCell>
                                                                    <TextField
                                                                        style={{width: 200}}
                                                                        id="cmr"
                                                                        select
                                                                        label="central midfielder"
                                                                        value={this.state.cmr}
                                                                        onChange={this.handleChange("cmr")}
                                                                        margin="normal">
                                                                        {this.state.players.map(player => (
                                                                            <MenuItem key={player.id} value={player.id}>
                                                                                {player.name}
                                                                            </MenuItem>
                                                                        ))}
                                                                    </TextField>
                                                                </TableCell>
                                                                <TableCell></TableCell>
                                                            </TableRow>
                                                        ) : (
                                                            <TableRow
                                                                style={{backgroundColor: '#dbf0db'}}>
                                                                <TableCell>CM</TableCell>
                                                                <TableCell
                                                                    className={"playerClicker"}
                                                                    data-playerid={this.state.data.cmr.id}
                                                                      style={{minWidth:150, maxWidth:150}}  onClick={this.goToPlayer}
                                                                >
                                                                    {this.state.data.cmr.name}
                                                                </TableCell>
                                                                <TableCell className={"teamClicker"}
                                                                           data-teamid={this.state.data.cmr.team.id}
                                                                            style={{minWidth:100, maxWidth:100}} onClick={this.goToTeam}>
                                                                    {this.state.data.cmr.team.name}
                                                                </TableCell>
                                                            </TableRow>)}


                                                        {this.state.data.amc == null ? (
                                                            <TableRow>
                                                                <TableCell>AMC</TableCell>
                                                                <TableCell>
                                                                    <TextField
                                                                        style={{width: 200}}
                                                                        id="amc"
                                                                        select
                                                                        label="attacking midfielder centre"
                                                                        value={this.state.amc}
                                                                        onChange={this.handleChange("amc")}
                                                                        margin="normal">
                                                                        {this.state.players.map(player => (
                                                                            <MenuItem key={player.id} value={player.id}>
                                                                                {player.name}
                                                                            </MenuItem>
                                                                        ))}
                                                                    </TextField>
                                                                </TableCell>
                                                                <TableCell></TableCell>
                                                            </TableRow>
                                                        ) : (
                                                            <TableRow
                                                                style={{backgroundColor: '#dbf0db'}}>
                                                                <TableCell>AMC</TableCell>
                                                                <TableCell
                                                                    className={"playerClicker"}
                                                                    data-playerid={this.state.data.amc.id}
                                                                      style={{minWidth:150, maxWidth:150}}  onClick={this.goToPlayer}
                                                                >
                                                                    {this.state.data.amc.name}
                                                                </TableCell>
                                                                <TableCell className={"teamClicker"}
                                                                           data-teamid={this.state.data.amc.team.id}
                                                                            style={{minWidth:100, maxWidth:100}} onClick={this.goToTeam}>
                                                                    {this.state.data.amc.team.name}
                                                                </TableCell>
                                                            </TableRow>)}

                                                        {this.state.data.aml == null ? (
                                                            <TableRow>
                                                                <TableCell>LW</TableCell>
                                                                <TableCell>
                                                                    <TextField
                                                                        style={{width: 200}}
                                                                        id="aml"
                                                                        select
                                                                        label="left winger"
                                                                        value={this.state.aml}
                                                                        onChange={this.handleChange("aml")}
                                                                        margin="normal">
                                                                        {this.state.players.map(player => (
                                                                            <MenuItem key={player.id} value={player.id}>
                                                                                {player.name}
                                                                            </MenuItem>
                                                                        ))}
                                                                    </TextField>
                                                                </TableCell>
                                                                <TableCell></TableCell>
                                                            </TableRow>
                                                        ) : (
                                                            <TableRow
                                                                style={{backgroundColor: '#e2b6b6'}}>
                                                                <TableCell>LW</TableCell>
                                                                <TableCell
                                                                    className={"playerClicker"}
                                                                    data-playerid={this.state.data.aml.id}
                                                                      style={{minWidth:150, maxWidth:150}}  onClick={this.goToPlayer}
                                                                >
                                                                    {this.state.data.aml.name}
                                                                </TableCell>
                                                                <TableCell className={"teamClicker"}
                                                                           data-teamid={this.state.data.aml.team.id}
                                                                            style={{minWidth:100, maxWidth:100}} onClick={this.goToTeam}>
                                                                    {this.state.data.aml.team.name}
                                                                </TableCell>
                                                            </TableRow>)}

                                                        {this.state.data.amr == null ? (
                                                            <TableRow>
                                                                <TableCell>RW</TableCell>
                                                                <TableCell>
                                                                    <TextField
                                                                        style={{width: 200}}
                                                                        id="amr"
                                                                        select
                                                                        label="right winger"
                                                                        value={this.state.amr}
                                                                        onChange={this.handleChange("amr")}
                                                                        margin="normal">
                                                                        {this.state.players.map(player => (
                                                                            <MenuItem key={player.id} value={player.id}>
                                                                                {player.name}
                                                                            </MenuItem>
                                                                        ))}
                                                                    </TextField>
                                                                </TableCell>
                                                                <TableCell></TableCell>
                                                            </TableRow>
                                                        ) : (
                                                            <TableRow
                                                                style={{backgroundColor: '#e2b6b6'}}>
                                                                <TableCell>LR</TableCell>
                                                                <TableCell
                                                                    className={"playerClicker"}
                                                                    data-playerid={this.state.data.amr.id}
                                                                      style={{minWidth:150, maxWidth:150}}  onClick={this.goToPlayer}
                                                                >
                                                                    {this.state.data.amr.name}
                                                                </TableCell>
                                                                <TableCell className={"teamClicker"}
                                                                           data-teamid={this.state.data.amr.team.id}
                                                                            style={{minWidth:100, maxWidth:100}} onClick={this.goToTeam}>
                                                                    {this.state.data.amr.team.name}
                                                                </TableCell>
                                                            </TableRow>)}

                                                        {this.state.data.st == null ? (
                                                            <TableRow>
                                                                <TableCell>ST</TableCell>
                                                                <TableCell>
                                                                    <TextField
                                                                        style={{width: 200}}
                                                                        id="st"
                                                                        select
                                                                        label="striker"
                                                                        value={this.state.st}
                                                                        onChange={this.handleChange("st")}
                                                                        margin="normal">
                                                                        {this.state.players.map(player => (
                                                                            <MenuItem key={player.id} value={player.id}>
                                                                                {player.name}
                                                                            </MenuItem>
                                                                        ))}
                                                                    </TextField>
                                                                </TableCell>
                                                                <TableCell></TableCell>
                                                            </TableRow>
                                                        ) : (
                                                            <TableRow
                                                                style={{backgroundColor: '#e2b6b6'}}>
                                                                <TableCell>ST</TableCell>
                                                                <TableCell
                                                                    className={"playerClicker"}
                                                                    data-playerid={this.state.data.st.id}
                                                                      style={{minWidth:150, maxWidth:150}}  onClick={this.goToPlayer}
                                                                >
                                                                    {this.state.data.st.name}
                                                                </TableCell>
                                                                <TableCell className={"teamClicker"}
                                                                           data-teamid={this.state.data.st.team.id}
                                                                            style={{minWidth:100, maxWidth:100}} onClick={this.goToTeam}>
                                                                    {this.state.data.st.team.name}
                                                                </TableCell>
                                                            </TableRow>)}

                                                    </TableBody>
                                                </TableBody>
                                            </table>
                                        </Grid>

                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>

                    </Grid>
                </Box>
            ) : (
                <span></span>
            )
        );
    }
}

export default SeasonPostview;
