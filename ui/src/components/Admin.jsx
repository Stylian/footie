import React, {Component} from 'react';
import LeagueToolbar from "./LeagueToolbar";

class Admin extends Component {

    constructor(props) {
        super(props);

        this.state = {
            pageTitle: "Admin",
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

export default Admin;
