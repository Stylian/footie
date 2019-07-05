import React, {Component} from "react";
import IconButton from '@material-ui/core/IconButton';
import save from '../../icons/save.svg';

class NextGame extends Component {

    constructor(props) {
        super(props);

        this.state = {
            game: {id: 0, homeTeam: {name: null}, awayTeam: {name: null}},
            homeScore: 0,
            awayScore: 0,
        };

    }

    componentDidMount() {
        fetch("/rest/next_game")
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

    handleChangeScore = field => (event) => {
        let value = event.target.value;
        if (value < 0) {
            return;
        }

        if (field === "homeScore") {
            this.setState(state => {
                return {
                    ...state,
                    homeScore: value,
                }
            });
        } else {
            this.setState(state => {
                return {
                    ...state,
                    awayScore: value,
                }
            });
        }

    }

    handleSave = (event, newValue) => {

        fetch("/rest/ops//add_game_result", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "goalsMadeByHomeTeam": this.state.homeScore,
                "goalsMadeByAwayTeam": this.state.awayScore
            })
        })
            .then(res => res.json())
            .then(
                (result) => {



                    // window.location.reload();
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

        if (this.state.game.id == 0) {
            return <div></div>
        } else {
            return (
                <table class="gameTable" align={"right"}>
                    <tbody>
                    <tr>
                        <td class="homeTeam" align={"right"}>{this.state.game.homeTeam.name}</td>
                        <td class="gameDiff"> -</td>
                        <td class="awayTeam" align={"left"}>{this.state.game.awayTeam.name}</td>
                    </tr>
                    <tr>
                        <td align={"right"}>
                            <input type={'number'}
                                   class="score_field"
                                   value={this.state.homeScore == 0 ? "" : this.state.homeScore}
                                   onChange={this.handleChangeScore('homeScore')}
                            />
                        </td>
                        <td class="gameDiff">
                            <IconButton onClick={this.handleSave}>
                                <img src={save} title={"save"}/>
                            </IconButton>
                        </td>
                        <td align={"left"}>
                            <input type={'number'}
                                   class="score_field"
                                   value={this.state.awayScore == 0 ? "" : this.state.awayScore}
                                   onChange={this.handleChangeScore('awayScore')}
                            />
                        </td>
                    </tr>
                    </tbody>

                </table>
            )
        }
    }

}


export default NextGame;