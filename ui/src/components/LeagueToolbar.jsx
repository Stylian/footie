import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import {Box, Grid} from "@material-ui/core";
import NextGame from "./season_components/NextGame";

class LeagueToolbar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            menuPosition: null,
        };

    }

    handleClick = (event) => {
        this.setState({ menuPosition: event.currentTarget });
    }

    handleButtonSelection = (e) => {
        window.location = e.currentTarget.dataset.link;
    }

    handleClose = () => {
        this.setState({ menuPosition: null });
    }

    render() {
        return (
            <div >
                <AppBar position="static">
                    <Grid container spacing={10}>
                    <Grid item xs={6}>
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
                            <MenuItem data-link="/" onClick={this.handleButtonSelection}>Main Page</MenuItem>
                            <MenuItem data-link="/history" onClick={this.handleButtonSelection}>History</MenuItem>
                            <MenuItem data-link="/admin" onClick={this.handleButtonSelection}>Admin</MenuItem>
                        </Menu>

                        <Typography variant="h6" >{this.props.pageTitle}</Typography>

                    </Toolbar>

                </Grid>
                    <Grid item xs={6}>
                        <NextGame />
                    </Grid>
                    </Grid>
                </AppBar>
            </div>
        );
    }
}

export default LeagueToolbar;