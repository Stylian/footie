import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import {Box, Grid, ListItemIcon, ListItemText} from "@material-ui/core";
import list from "../icons/list.svg";
import build from "../icons/build.svg";
import up from "../icons/up.svg";
import down from "../icons/down.svg";
import players from "../icons/football-players.png";
import analytics from "../icons/analytics.png";
import barchart from "../icons/bar-chart.png";
import medal1 from "../icons/medal1.png";

class LeagueToolbar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            menuPosition: null,
            seasonsTotal: 0,
            currentDisplayedSeason: 1
        };

    }

    componentDidMount() {
        fetch("/rest/seasons/")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState(state => {

                        return {
                            ...state,
                            isLoaded: true,
                            seasonsTotal: result,
                        }
                    });
                },
                (error) => {
                    this.setState(state => {
                        return {
                            ...state,
                            isLoaded: true,
                            error
                        }
                    });
                }
            )

    }

    handleClick = (event) => {
        this.setState({menuPosition: event.currentTarget});
    }

    handleButtonSelection = (e) => {
        window.location = e.currentTarget.dataset.link;
    }

    handleClose = () => {
        this.setState({menuPosition: null});
    }

    handleUp = (event) => {
        window.location.href = parseInt(this.props.seasonNum) + 1;
    }

    handleDown = (event) => {
        window.location.href = parseInt(this.props.seasonNum) - 1;
    }

    render() {
        return (
            <div>
                <AppBar position="static">
                    <Grid container spacing={10}>
                        <Grid item xs={6}>
                            <Toolbar>
                                <IconButton edge="start" color="inherit" aria-label="Menu"
                                            onClick={this.handleClick}>
                                    <MenuIcon/>
                                </IconButton>
                                <Menu
                                    id="simple-menu"
                                    anchorEl={this.state.menuPosition}
                                    anchorOrigin={{vertical: "bottom", horizontal: "left"}}
                                    getContentAnchorEl={null}
                                    keepMounted
                                    open={Boolean(this.state.menuPosition)}
                                    onClose={this.handleClose}
                                >
                                    <MenuItem data-link="/" onClick={this.handleButtonSelection}>
                                        <ListItemIcon>
                                            <img src={list} title={"Seasons"}/>
                                        </ListItemIcon>
                                        <ListItemText primary="Seasons"/>
                                    </MenuItem>
                                    <MenuItem data-link="/coefficients" onClick={this.handleButtonSelection}>
                                        <ListItemIcon>
                                            <img src={medal1} title={"Awards & Coefficients"}/>
                                        </ListItemIcon>
                                        <ListItemText primary="Awards & Coefficients"/>
                                    </MenuItem>
                                    <MenuItem data-link="/league_stats" onClick={this.handleButtonSelection}>
                                        <ListItemIcon>
                                            <img src={analytics} title={"League Stats"}/>
                                        </ListItemIcon>
                                        <ListItemText primary="League Stats"/>
                                    </MenuItem>
                                    <MenuItem data-link="/teams_stats" onClick={this.handleButtonSelection}>
                                        <ListItemIcon>
                                            <img src={barchart} title={"Teams' Stats"}/>
                                        </ListItemIcon>
                                        <ListItemText primary="Teams' Stats"/>
                                    </MenuItem>
                                    <MenuItem data-link="/players_edit" onClick={this.handleButtonSelection}>
                                        <ListItemIcon>
                                            <img src={players} title={"players"}/>
                                        </ListItemIcon>
                                        <ListItemText primary="Players"/>
                                    </MenuItem>
                                    <MenuItem data-link="/admin" onClick={this.handleButtonSelection}>
                                        <ListItemIcon>
                                            <img src={build} title={"admin"}/>
                                        </ListItemIcon>
                                        <ListItemText primary="Admin"/>
                                    </MenuItem>
                                </Menu>

                                {this.props.seasonNum !== undefined ? (
                                    <Box>
                                        {this.props.seasonNum != this.state.seasonsTotal ? (
                                        <IconButton onClick={this.handleUp}>
                                            <img src={up} title={"next season"}/>
                                        </IconButton>
                                        ) : ('')}

                                        {this.props.seasonNum > 1 ? (
                                            <IconButton onClick={this.handleDown}>
                                                <img src={down} title={"previous season"}/>
                                            </IconButton>
                                        ) : ('')}
                                    </Box>
                                ) : ''}

                                <Typography variant="h6">{this.props.pageTitle}</Typography>
                            </Toolbar>
                        </Grid>
                    </Grid>
                </AppBar>
            </div>
        );
    }
}

export default LeagueToolbar;