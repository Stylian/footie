import React, {useEffect, useState} from 'react';
import Numeral from "numeral";
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
    TableRow
} from "@material-ui/core";
import goldmedal from "../../icons/goldmedal.png";
import silvermedal from "../../icons/silvermedal.png";
import LeagueToolbar from "../LeagueToolbar";

export default function Coefficients() {
    const [isLoaded, setLoaded] = useState(false);
    const [teams, setTeams] = useState([]);
    const [seasons, setSeasons] = useState([]);
    const [teamsWithTrophies, setTeamsWithTrophies] = useState([]);

    useEffect(() => {
        fetch("/rest/history/coefficients")
            .then(res => res.json())
            .then(
                (result) => {
                    setTeams(result);
                }, (error) => {
                    console.error('Error:', error);
                });

        fetch("/rest/history/past_winners")
            .then(res => res.json())
            .then(
                (result) => {
                    setSeasons(result);
                }, (error) => {
                    console.error('Error:', error);
                });

        fetch("/rest/history/teams/trophies")
            .then(res => res.json())
            .then(
                (result) => {
                    setTeamsWithTrophies(result);
                }, (error) => {
                    console.error('Error:', error);
                });
        setLoaded(true)
    }, []);

    const goToTeam = (event) => {
        window.location.href = "/teams/" + event.currentTarget.dataset.teamid;
    }

    const goToSeason = (event) => {
        window.location.href = "/season/" + event.currentTarget.dataset.season;
    }

    let teamsList = [...teams];
    let half_length = Math.ceil(teamsList.length / 2);
    let leftSide = teamsList.splice(0, half_length);
    let rightSide = teamsList;

    if (!isLoaded) {
        return (<div>Loading...</div>)
    } else {
        return (
            <Paper style={{margin: 20}} elevation={20}>
                <LeagueToolbar pageTitle={"Awards & Coefficients"}/>
                <Box>
                    <Paper elevation={12} style={{margin: 20}}>
                        <Grid container spacing={1}>
                            <Grid item sm={5}>
                                <Card style={{margin: 20}}>
                                    <CardHeader title={"Coefficients"} align={"center"}
                                                titleTypographyProps={{variant: 'h7'}}/>
                                    <CardContent>
                                        <Grid container spacing={1}>
                                            <Grid item sm={6}>
                                                <table className="table">
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell>Pos</TableCell>
                                                            <TableCell>Team</TableCell>
                                                            <TableCell>Coefficients</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {leftSide.map((team, index) => (
                                                            <TableRow className={"teamClicker"} data-teamid={team.id}
                                                                      onClick={goToTeam} style={{
                                                                backgroundColor:
                                                                    (team.seed === "CHAMPION") ? '#d9edf7' :
                                                                        (team.seed === "TO_GROUPS") ? '#d9edf7' :
                                                                            (team.seed === "TO_QUALS_2") ? '#dff0d8' :
                                                                                (team.seed === "TO_QUALS_1") ? '#fdf9e8' :
                                                                                    '#f2dede'
                                                            }}>
                                                                <TableCell align="right">{index + 1}</TableCell>
                                                                <TableCell style={{
                                                                    minWidth: 100,
                                                                    maxWidth: 100
                                                                }}>{team.name}</TableCell>
                                                                <TableCell
                                                                    align="right">{Numeral(team.coefficients / 1000).format('0.000')}
                                                                </TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </table>
                                            </Grid>
                                            <Grid item sm={6}>
                                                <table className="table">
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell>Pos</TableCell>
                                                            <TableCell>Team</TableCell>
                                                            <TableCell>Coefficients</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {rightSide.map((team, index) => (
                                                            <TableRow className={"teamClicker"} data-teamid={team.id}
                                                                      onClick={goToTeam} style={{
                                                                backgroundColor:
                                                                    (team.seed === "CHAMPION") ? '#d9edf7' :
                                                                        (team.seed === "TO_GROUPS") ? '#d9edf7' :
                                                                            (team.seed === "TO_QUALS_2") ? '#dff0d8' :
                                                                                (team.seed === "TO_QUALS_1") ? '#fdf9e8' :
                                                                                    '#f2dede'
                                                            }}>
                                                                <TableCell
                                                                    align="right">{leftSide.length + index + 1}</TableCell>
                                                                <TableCell style={{
                                                                    minWidth: 100,
                                                                    maxWidth: 100
                                                                }}>{team.name}</TableCell>
                                                                <TableCell
                                                                    align="right">{Numeral(team.coefficients / 1000).format('0.000')}
                                                                </TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </table>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item sm={4.5}>
                                <Card style={{margin: 20}}>
                                    <CardHeader title={"Past Finals"} align={"center"}
                                                titleTypographyProps={{variant: 'h7'}}
                                    />
                                    <CardContent>
                                        <table className="table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Season</TableCell>
                                                    <TableCell align={"center"}><img src={goldmedal}
                                                                                     title={"1st place"}/></TableCell>
                                                    <TableCell align={"center"}><img src={silvermedal}
                                                                                     title={"2nd place"}/></TableCell>
                                                    <TableCell align="center" colSpan={2}>Semifinalists</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {seasons.map((item, index) =>
                                                    <TableRow>
                                                        <TableCell align="right" className={"teamClicker"}
                                                                   onClick={goToSeason}
                                                                   data-season={item.seasonYear}>
                                                            {item.seasonYear}</TableCell>
                                                        <TableCell align="left" className={"teamClicker"}
                                                                   data-teamid={item.winner.id}
                                                                   onClick={goToTeam}>
                                                            {item.winner != null ? item.winner.name : ""}
                                                        </TableCell>
                                                        <TableCell align="left" className={"teamClicker"}
                                                                   data-teamid={item.runnerUp.id}
                                                                   onClick={goToTeam}>
                                                            {item.runnerUp != null ? item.runnerUp.name : ""}
                                                        </TableCell>
                                                        <TableCell align="left" className={"teamClicker"}
                                                                   data-teamid={item.semifinalist1.id}
                                                                   onClick={goToTeam}>
                                                            {item.semifinalist1 != null ? item.semifinalist1.name : ""}
                                                        </TableCell>
                                                        <TableCell align="left" className={"teamClicker"}
                                                                   data-teamid={item.semifinalist2.id}
                                                                   onClick={goToTeam}>
                                                            {item.semifinalist2 != null ? item.semifinalist2.name : ""}
                                                        </TableCell>
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                        </table>
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid item sm={2.5}>
                                <Card style={{margin: 20}}>
                                    <CardHeader title={"Best Performers"} align={"center"}
                                                titleTypographyProps={{variant: 'h7'}}
                                    />
                                    <CardContent>
                                        <table className="table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell><img src={goldmedal} title={"1st place"}/></TableCell>
                                                    <TableCell><img src={silvermedal} title={"2nd place"}/></TableCell>
                                                    <TableCell>Team</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {teamsWithTrophies.map((team, index) =>
                                                    <TableRow>
                                                        <TableCell align="center">{team.gold}</TableCell>
                                                        <TableCell align="center">{team.silver}</TableCell>
                                                        <TableCell align="left" className={"teamClicker"}
                                                                   data-teamid={team.id}
                                                                   onClick={goToTeam}>
                                                            {team.name}</TableCell>
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                        </table>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Paper>
                </Box>
            </Paper>
        )
    }
}
