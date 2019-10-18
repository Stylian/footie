import React, {Component} from "react";
import {Box, Card, CardContent, CardHeader, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import Numeral from "numeral";

class KnockoutOdds extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            teams: []
        };
    }

    componentDidMount() {
        fetch("/rest/seasons/" + this.props.year + "/playoffs/odds")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState(state => {
                        return {
                            ...state,
                            teams: result,
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

    goToTeam = (event, newValue) => {
        window.location.href = "/teams/" + event.currentTarget.dataset.teamid;
    }

    render() {
        return (
            this.state.isLoaded ? (
                <Box style={{margin: 10, "margin-top": 10}}>
                    <Card style={{margin: 20}}>
                        <CardHeader title={"winning odds"} align={"center"}
                                    titleTypographyProps={{variant: 'h7'}}
                        />
                        <CardContent>
                            <table className="table tree_table" align={"center"}>

                                <TableHead>
                                    <TableRow>
                                        <TableCell>team</TableCell>
                                        <TableCell>chances</TableCell>
                                        <TableCell>odds</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {this.state.teams.map((team, index) => {
                                        return (
                                            <TableRow>
                                                <TableCell className={"teamClicker"} align="center"
                                                           data-teamid={team.id}
                                                           onClick={this.goToTeam}>
                                                    {team.name}</TableCell>
                                                <TableCell align={"right"}>{Numeral(team.chances*100).format('0') + "%"}</TableCell>
                                                <TableCell align={"right"}>{team.odds}</TableCell>
                                            </TableRow>
                                        )})}

                                </TableBody>
                            </table>
                        </CardContent>
                    </Card>
                </Box>
            ) : (
                <span></span>
            )
        );
    }
}

export default KnockoutOdds;
