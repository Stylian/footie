import React, {Component} from "react";
import {TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";

class NextGame extends Component {

    constructor(props) {
        super(props);

        this.state = {
            game: {id: 0, homeTeam: {name: null}, awayTeam: {name: null}},
        };

    }

    componentDidMount() {
        fetch("http://localhost:8080/rest/next_game")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState(state => {

                        return {
                            ...state,
                            game: result,
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
            <table className="table" align={"center"}>
                <TableBody>
                    {this.state.game.id == 0 ? ('') : (
                        <TableRow>
                            <TableCell class="cancelcss" align={"left"}>{this.state.game.homeTeam.name}</TableCell>
                            <TableCell class="cancelcss" ></TableCell>
                            <TableCell class="cancelcss" align={"center"}> - </TableCell>
                            <TableCell class="cancelcss" ></TableCell>
                            <TableCell class="cancelcss" align={"right"}>{this.state.game.awayTeam.name}</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </table>
        );
    }

}


export default NextGame;