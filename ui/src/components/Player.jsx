import React, {Component} from "react";
import {Box, Card, CardContent, CardHeader, Grid, Paper, TableCell, TableRow} from "@material-ui/core";
import LeagueToolbar from "./LeagueToolbar";
import playeroftheyear from "../icons/playeroftheyear.png";
import dreamteam from "../icons/dreamteam.png";
import silvermedal from "../icons/silvermedal.png";
import goldmedal from "../icons/goldmedal.png";

class Player extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            player: {},
        };

    }

    componentDidMount() {
        fetch("/rest/players/" + this.props.match.params.playerId)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState(state => {

                        return {
                            ...state,
                            player: result,
                            isLoaded: true,
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
            this.state.isLoaded ? (
                <Box>
                    <Paper style={{margin: 20}} elevation={20}>
                        <LeagueToolbar pageTitle={this.state.player.name}/>

                        <Box width={1700} style={{margin: 20}}>
                            <Grid container spacing={1}>
                                <Grid item sm={4}>
                                    <Card style={{margin: 20}}>
                                        <CardHeader title={"trophies"} align={"center"}
                                                    titleTypographyProps={{variant: 'h7'}}
                                        />
                                        <CardContent>
                                            {this.state.player.trophies.length > 0 ? (
                                                <table className="table" align={"center"}>
                                                    {this.state.player.trophies.map((trophy, index) => {
                                                        return (
                                                            <TableRow>
                                                                <TableCell align="right">
                                                                    {trophy.type == "W" ?
                                                                        (<img src={goldmedal}
                                                                              title={"championship"}/>) :
                                                                        (trophy.type == "R" ?
                                                                        (<img src={silvermedal}
                                                                              title={"finalists"}/>) :
                                                                        (trophy.type == "PL" ?
                                                                        (<img src={playeroftheyear}
                                                                              title={"player of the year"}/>) :
                                                                        (<img src={dreamteam}
                                                                              title={"dream team"}/>)))}
                                                                </TableCell>
                                                                <TableCell
                                                                    align="right">{"Season " + trophy.seasonNum}</TableCell>
                                                                <TableCell align="left">
                                                                    {trophy.type == "W" ? "Championship" : (
                                                                        (trophy.type == "R" ? "Finalists" :
                                                                            (trophy.type == "PL" ?
                                                                        "Player of the year" : "Dream Team")))}</TableCell>
                                                            </TableRow>
                                                        )
                                                    })}
                                                </table>
                                            ) : (
                                                <i>nothing in the trophies case</i>
                                            )}
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Box>
                    </Paper>
                </Box>
            ) : (
                <span></span>
            )
        );
    }
}

export default Player;
