import React, {Component} from "react";
import Typography from "@material-ui/core/Typography";

class NextGame extends Component {

    constructor(props) {
        super(props);

        this.state = {
            game: {},
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
                <div>
                    {this.state.game.id == 0 ? ('') : (
                        <Typography variant="h7" >WTF {this.state.game.awayTeam.name}</Typography>


                    )}
                </div>
        );
    }

}


export default NextGame;