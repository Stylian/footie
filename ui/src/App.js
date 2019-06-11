import React, {Component} from 'react';
import LeagueToolbar from "./apps/LeagueToolbar";
import LeagueBody from "./apps/LeagueBody";

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            pageActive: 1,
        };

    }

    changePageActive = (newPage) => {
        this.setState( {pageActive: newPage});
    }

    render() {
        return (
            <div className="App">
                <LeagueToolbar pageActive={this.state.pageActive}/>
                <LeagueBody pageActive={this.state.pageActive}
                            changePageActive={this.changePageActive}/>
            </div>
        );
    }
}

export default App;
