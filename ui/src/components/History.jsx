import React, {Component} from 'react';
import LeagueToolbar from "./LeagueToolbar";

class History extends Component {

    constructor(props) {
        super(props);

        this.state = {
            pageTitle: "History",
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

export default History;
