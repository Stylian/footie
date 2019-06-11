import React, {Component} from 'react';

class LeagueBody extends Component {

    state = {
        pageActive: 1,
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="LeagueBody">
                {(function(){
                    switch(this.state.pageActive) {
                        case 1:
                            return <div>option1</div>;
                        case 2:
                            return <div>option2</div>;
                    }
                })}
            </div>
        );
    }
}

export default LeagueBody;
