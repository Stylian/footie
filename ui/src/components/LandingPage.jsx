import React, {Component} from 'react';
import Season from "./Season";

class LandingPage extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Season year ={1} />
            </div>
        );
    }
}

export default LandingPage;
