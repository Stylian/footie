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
import Numeral from "numeral";
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
                        <Grid item sm={4}>
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
                                                                <TableCell>
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
                                                                <TableCell>
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
                                                                <TableCell>
                                                                    {this.state.data.semifinalist1.name}
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow className={"teamClicker"}
                                                                      data-teamid={this.state.data.semifinalist2.id}
                                                                      onClick={this.goToTeam}
                                                                      style={{backgroundColor: 'rgb(217, 237, 247)'}}>
                                                                <TableCell>
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
                                                                <TableCell>
                                                                    {this.state.data.quarterfinalist1.name}
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow className={"teamClicker"}
                                                                      data-teamid={this.state.data.quarterfinalist2.id}
                                                                      onClick={this.goToTeam}
                                                                      style={{backgroundColor: 'rgb(252, 248, 227)'}}>
                                                                <TableCell>
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
                                                                           data-teamid={this.state.data.highestScoringGame.homeTeam.id}
                                                                           onClick={this.goToTeam}>
                                                                    {this.state.data.highestScoringGame.homeTeam.name}</TableCell>
                                                                <TableCell>
                                                                    {this.state.data.highestScoringGame.result.goalsMadeByHomeTeam + " - "
                                                                    + this.state.data.highestScoringGame.result.goalsMadeByAwayTeam}  </TableCell>
                                                                <TableCell align="left"
                                                                           className={"teamClicker"}
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
                                                                           data-teamid={this.state.data.bestWin.homeTeam.id}
                                                                           onClick={this.goToTeam}>
                                                                    {this.state.data.bestWin.homeTeam.name}</TableCell>
                                                                <TableCell>
                                                                    {this.state.data.bestWin.result.goalsMadeByHomeTeam + " - "
                                                                    + this.state.data.bestWin.result.goalsMadeByAwayTeam}  </TableCell>
                                                                <TableCell align="left"
                                                                           className={"teamClicker"}
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
                                                                           data-teamid={this.state.data.worstResult.homeTeam.id}
                                                                           onClick={this.goToTeam}>
                                                                    {this.state.data.worstResult.homeTeam.name}</TableCell>
                                                                <TableCell>
                                                                    {this.state.data.worstResult.result.goalsMadeByHomeTeam + " - "
                                                                    + this.state.data.worstResult.result.goalsMadeByAwayTeam}  </TableCell>
                                                                <TableCell align="left"
                                                                           className={"teamClicker"}
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
                                                                    <TableCell>
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
                                                                    <TableCell>
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
                                                                       onClick={this.goToPlayer}>
                                                                <img src={goldmedal} title={"1st place"}/>
                                                                {this.state.data.player_of_the_year.name}
                                                            </TableCell>
                                                            <TableCell className={"teamClicker"}
                                                                       data-teamid={this.state.data.player_of_the_year.team.id}
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
                                                        <TableCell colSpan={3}>dream team</TableCell>
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
                                                                           onClick={this.goToTeam}>
                                                                    {this.state.data.gk.team.name}
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
                                                                        label="defender left"
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
                                                                style={{backgroundColor: '#b3e6ff'}}>
                                                                <TableCell>DL</TableCell>
                                                                <TableCell
                                                                    className={"playerClicker"}
                                                                    data-playerid={this.state.data.dl.id}
                                                                    onClick={this.goToPlayer}
                                                                >
                                                                    {this.state.data.dl.name}
                                                                </TableCell>
                                                                <TableCell className={"teamClicker"}
                                                                           data-teamid={this.state.data.dl.team.id}
                                                                           onClick={this.goToTeam}>
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
                                                                        label="defender right"
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
                                                                style={{backgroundColor: '#b3e6ff'}}>
                                                                <TableCell>DR</TableCell>
                                                                <TableCell
                                                                    className={"playerClicker"}
                                                                    data-playerid={this.state.data.dr.id}
                                                                    onClick={this.goToPlayer}
                                                                >
                                                                    {this.state.data.dr.name}
                                                                </TableCell>
                                                                <TableCell className={"teamClicker"}
                                                                           data-teamid={this.state.data.dr.team.id}
                                                                           onClick={this.goToTeam}>
                                                                    {this.state.data.dr.team.name}
                                                                </TableCell>
                                                            </TableRow>)}

                                                        {{ /*  TODO */ }}

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
