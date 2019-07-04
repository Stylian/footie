import React, {Component} from 'react';
import {
    AppBar,
    Card,
    CardContent,
    CardHeader,
    Grid,
    Tab,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Tabs
} from "@material-ui/core";
import QualsSeeding from "./quals_components/QualsSeeding";
import GroupsSeeding from "./groups_components/GroupsSeeding";
import GroupsMatches from "./groups_components/GroupsMatches";
import GroupsDisplay from "./groups_components/GroupsDisplay";

class Playoffs extends Component {

    constructor(props) {
        super(props);

        this.state = {
            structure: {},
            matches: {}
        };

    }


    componentDidMount() {
        fetch("http://localhost:8080/rest/seasons/" + this.props.year + "/playoffs/structure")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState(state => {

                        return {
                            ...state,
                            isLoaded: true,
                            structure: result,
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

        fetch("http://localhost:8080/rest/seasons/" + this.props.year + "/playoffs/matches")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState(state => {

                        return {
                            ...state,
                            isLoaded: true,
                            matches: result,
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
            <Grid item sm={6}>
                <Card style={{margin: 20}}>
                    <CardHeader title={"tree view"} align={"center"}
                                titleTypographyProps={{variant: 'h7'}}
                    />
                    <CardContent>
                        <table className="table" align={"center"}>
                            <TableBody>
                                <TableRow>
                                    <TableCell className={"tree_team"} align="center" style={{backgroundColor: '#fcf8e3'}}>
                                        {this.state.structure.gA3}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell class={"cancel"}></TableCell>
                                    <TableCell class={"cancel"}></TableCell>
                                    <TableCell className={"tree_team"} align="center" style={{backgroundColor: '#d9edf7'}}>
                                        {this.state.structure.S1}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className={"tree_team"} align="center" style={{backgroundColor: '#fcf8e3'}}>
                                        {this.state.structure.gB2}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell class={"cancel"}></TableCell>
                                    <TableCell class={"cancel"}></TableCell>
                                    <TableCell class={"cancel"}></TableCell>
                                    <TableCell class={"cancel"}></TableCell>
                                    <TableCell className={"tree_team"} align="center" style={{backgroundColor: '#e2e4ff'}}>
                                        {this.state.structure.F1}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell class={"cancel"}></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell class={"cancel"}></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell class={"cancel"}></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell class={"cancel"}></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell class={"cancel"}></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell class={"cancel"}></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell class={"cancel"}></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell class={"cancel"}></TableCell>
                                    <TableCell class={"cancel"}></TableCell>
                                    <TableCell className={"tree_team"} align="center" style={{backgroundColor: '#d9edf7'}}>
                                        {this.state.structure.gA1}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell class={"cancel"}></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell class={"cancel"}></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell class={"cancel"}></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell class={"cancel"}></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell class={"cancel"}></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell class={"cancel"}></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell class={"cancel"}></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell class={"cancel"}></TableCell>
                                    <TableCell class={"cancel"}></TableCell>
                                    <TableCell className={"tree_team"} align="center" style={{backgroundColor: '#d9edf7'}}>
                                        {this.state.structure.gB1}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell class={"cancel"}></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell class={"cancel"}></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell class={"cancel"}></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell class={"cancel"}></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell class={"cancel"}></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell class={"cancel"}></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell class={"cancel"}></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell class={"cancel"}></TableCell>
                                    <TableCell class={"cancel"}></TableCell>
                                    <TableCell class={"cancel"}></TableCell>
                                    <TableCell class={"cancel"}></TableCell>
                                    <TableCell className={"tree_team"} align="center" style={{backgroundColor: '#e2e4ff'}}>
                                        {this.state.structure.F2}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className={"tree_team"} align="center" style={{backgroundColor: '#fcf8e3'}}>
                                        {this.state.structure.gB3}</TableCell>
                                    <TableCell class={"cancel"}></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell class={"cancel"}></TableCell>
                                    <TableCell class={"cancel"}></TableCell>
                                    <TableCell className={"tree_team"} align="center" style={{backgroundColor: '#d9edf7'}}>
                                        {this.state.structure.S2}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className={"tree_team"} align="center" style={{backgroundColor: '#fcf8e3'}}>
                                        {this.state.structure.gA2}</TableCell>
                                    <TableCell class={"cancel"}></TableCell>
                                    <TableCell class={"cancel"}></TableCell>
                                </TableRow>
                            </TableBody>
                        </table>
                    </CardContent>
                </Card>
            </Grid>
        );
    }
}


export default Playoffs;
