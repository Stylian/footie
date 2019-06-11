import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

class LeagueToolbar extends Component {

    state = {
        menuPosition: null,
    };

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClick(event) {
        this.setState({ menuPosition: event.currentTarget });
    }

    handleClose() {
        this.setState({ menuPosition: null });
    }

    render() {
        return (
            <div >
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="Menu"
                                    onClick={this.handleClick} >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="simple-menu"
                            anchorEl={this.state.menuPosition}
                            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                            getContentAnchorEl={null}
                            keepMounted
                            open={Boolean(this.state.menuPosition)}
                            onClose={this.handleClose}
                        >
                            <MenuItem onClick={this.handleClose}>Dashboard</MenuItem>
                            <MenuItem onClick={this.handleClose}>History</MenuItem>
                            <MenuItem onClick={this.handleClose}>Admin</MenuItem>
                        </Menu>

                        <Typography variant="h6" >
                            League Summary
                        </Typography>

                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default LeagueToolbar;