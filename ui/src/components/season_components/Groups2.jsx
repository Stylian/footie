import React, {Component} from 'react';
import {AppBar, Tab, Tabs} from "@material-ui/core";
import GroupsMatches from "./groups_components/GroupsMatches";
import GroupsDisplay from "./groups_components/GroupsDisplay";

class Groups2 extends Component {

    constructor(props) {
        super(props);

        this.state = {
            tabActive: 1,
        };

    }

    handleChange = (event, newValue) => {
        this.setState(state => {
            return {
                ...state,
                tabActive: newValue,
            }
        });
    }

    render() {
        return (
            <div>
                <AppBar position="static">
                    <Tabs value={this.state.tabActive} onChange={this.handleChange}>
                        <Tab label="Groups"/>
                        <Tab label="Matches"/>
                    </Tabs>
                </AppBar>
                {this.state.tabActive === 0 && <GroupsDisplay year={this.props.year} round={2} />}
                {this.state.tabActive === 1 && <GroupsMatches year={this.props.year} round={2} />}
            </div>
        );
    }
}


export default Groups2;
