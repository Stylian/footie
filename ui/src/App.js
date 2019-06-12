import React, {Component} from 'react';
import LeagueToolbar from "./apps/LeagueToolbar";

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            pageTitle: "Landing Page",
        };

    }

    render() {
        return (
            <div className="App">
                <LeagueToolbar pageTitle={this.state.pageTitle} />
            </div>
        );
    }
}

export default App;
