import React, {Component} from 'react';
import {AppBar, Tab, Tabs} from "@material-ui/core";
import QualsSeeding from "./quals_components/QualsSeeding";
import GroupsSeeding from "./groups_components/GroupsSeeding";
import GroupsMatches from "./groups_components/GroupsMatches";
import GroupsDisplay from "./groups_components/GroupsDisplay";

class Playoffs extends Component {

    constructor(props) {
        super(props);

        this.state = {
        };

    }


    render() {
        return (
            <div>
                AAAA {this.props.year}
            </div>
        );
    }
}


export default Playoffs;
