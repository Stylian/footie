import React, {Component} from 'react';
import LeagueToolbar from "./LeagueToolbar";

class LandingPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            pageTitle: "Landing Page",
        };

    }

    render() {
        return (

            <div>
                <LeagueToolbar pageTitle={this.state.pageTitle} />
            </div>
        );
    }
}

export default LandingPage;
