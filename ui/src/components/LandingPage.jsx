import React, {Component} from 'react';
import LeagueToolbar from "./LeagueToolbar";
import Season from "./Season";

class LandingPage extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Season year ={6} />
            </div>
        );
    }
}

export default LandingPage;
