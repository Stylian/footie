import React, {Component} from 'react';
import {
    AppBar,
    Box,
    Card,
    CardContent,
    CardHeader,
    Grid,
    Tab,
    TableBody,
    TableCell,
    TableRow,
    Tabs
} from "@material-ui/core";
import GroupsMatches from "./groups_components/GroupsMatches";
import GroupsDisplay from "./groups_components/GroupsDisplay";

class Groups2 extends Component {

    constructor(props) {
        super(props);

        this.state = {
            tabActive: 0,
            isLoaded: false
        };

    }

    componentDidMount() {
        fetch("/rest/persist/tabs/groups2/" + this.props.year)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState(state => {
                        return {
                            ...state,
                            tabActive: result,
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

    handleChange = (event, newValue) => {

        fetch("/rest/persist/tabs/groups2/" + this.props.year, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: newValue
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState(state => {
                        return {
                            ...state,
                            tabActive: newValue,
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
                <Box style={{margin: 10, "margin-top": 10}}>
                    <AppBar position="static">
                        <Tabs value={this.state.tabActive} onChange={this.handleChange}>
                            <Tab label="Groups"/>
                            <Tab label="Matches"/>
                        </Tabs>
                    </AppBar>

                    {this.state.tabActive === 0 && <GroupsDisplay year={this.props.year} round={2}/>}
                    {this.state.tabActive === 1 && <GroupsMatches year={this.props.year} round={2}/>}
                </Box>
            ) : (
                <span></span>
            )
        );
    }
}


export default Groups2;
