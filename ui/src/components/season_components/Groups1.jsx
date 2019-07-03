import React, {Component} from 'react';
import {AppBar, Tab, Tabs} from "@material-ui/core";
import QualsSeeding from "./quals_components/QualsSeeding";
import GroupsSeeding from "./groups_components/GroupsSeeding";
import GroupsMatches from "./groups_components/GroupsMatches";
import GroupsDisplay from "./groups_components/GroupsDisplay";

class Groups1 extends Component {

    constructor(props) {
        super(props);

        this.state = {
            tabActive: this.props.stage === "ON_PREVIEW" ? 0 :
                (this.props.stage === "NOT_STARTED" ? 0 : 1),
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
                        <Tab label="Seeding"/>
                        <Tab disabled={(this.props.stage === "ON_PREVIEW" || this.props.stage === "NOT_STARTED")} label="Groups"/>
                        <Tab disabled={(this.props.stage === "ON_PREVIEW" || this.props.stage === "NOT_STARTED")} label="Matches"/>
                    </Tabs>
                </AppBar>
                {this.state.tabActive === 0 && <GroupsSeeding year={this.props.year} round={1}
                                                              haveToSetUpTeams={this.props.stage === "ON_PREVIEW"} />}
                {this.state.tabActive === 1 && <GroupsDisplay year={this.props.year} round={1} />}
                {this.state.tabActive === 2 && <GroupsMatches year={this.props.year} round={1} />}
            </div>
        );
    }
}


export default Groups1;
