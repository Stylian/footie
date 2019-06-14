import React, {Component} from 'react';
import {AppBar, Tabs, Tab, Typography} from "@material-ui/core";

class Coefficients extends Component {

    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            teams: {}
        };

    }

    componentDidMount() {
        fetch("http://localhost:8080/rest/history/coefficients")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState( state => {
                        return {
                            ...state,
                            isLoaded: true,
                            teams: result
                        }
                    });
                },
                (error) => {
                    this.setState( state => {
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
            <table className = "table" >
                <thead>
                    <tr>
                        <th>Pos</th>
                        <th>Team</th>
                        <th>Coefficients</th>
                    </tr>
                </thead>
                <tbody>
                // does not work
                // change to array?
                // add Mapstruct to back end ? a lot of work there
                {Object.entries(this.state.teams).forEach(entry => {
                    console.log(entry[0])
                    return (
                        <tr>
                            <td>1</td>
                            <td>{entry[0]}</td>
                            <td>{entry[1]}</td>
                        </tr>)
                 })}
                </tbody>
            </table>
        );
    }
}

export default Coefficients;
