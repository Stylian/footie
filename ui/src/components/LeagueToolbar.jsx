import React, {Component, useEffect, useState} from 'react';
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
import {useParams} from "react-router";

function LeagueToolbar({ pageTitle, seasonNum }) {

    const [menuPosition, setMenuPosition] = useState(null);
    const [seasonsTotal, setSeasonsTotal] = useState(0);

    useEffect(() => {
        fetch("/rest/seasons/")
            .then(res => res.json())
            .then(
                (result) => {
                    setSeasonsTotal(result);
                },
                (error) => {
                    console.error('Error fetching seasons:', error);
                }
            );
    }, []);

    const handleClick = (event) => {
        setMenuPosition(event.currentTarget);
    }

    const handleButtonSelection = (e) => {
        window.location = e.currentTarget.dataset.link;
    }

    const handleClose = () => {
        setMenuPosition(null);
    }

    const handleUp = () => {
        window.location.href = parseInt(seasonNum) + 1;
    }

    const handleDown = () => {
        window.location.href = parseInt(seasonNum) - 1;
    }

    return (
        <div>
            <AppBar position="static">
                <Grid container spacing={10}>
                    <Grid item xs={6}>
                        <Toolbar>
                            <IconButton edge="start" color="inherit" aria-label="Menu" onClick={handleClick}>
                                <MenuIcon/>
                            </IconButton>
                            <Menu
                                id="simple-menu"
                                anchorEl={menuPosition}
                                anchorOrigin={{vertical: "bottom", horizontal: "left"}}
                                getContentAnchorEl={null}
                                keepMounted
                                open={Boolean(menuPosition)}
                                onClose={handleClose}
                            >
                                <MenuItem data-link="/" onClick={handleButtonSelection}>
                                    <ListItemIcon>
                                        <img src={list} title={"Seasons"}/>
                                    </ListItemIcon>
                                    <ListItemText primary="Seasons"/>
                                </MenuItem>
                                <MenuItem data-link="/coefficients" onClick={handleButtonSelection}>
                                    <ListItemIcon>
                                        <img src={medal1} title={"Awards & Coefficients"}/>
                                    </ListItemIcon>
                                    <ListItemText primary="Awards & Coefficients"/>
                                </MenuItem>
                                <MenuItem data-link="/league_stats" onClick={handleButtonSelection}>
                                    <ListItemIcon>
                                        <img src={analytics} title={"League Stats"}/>
                                    </ListItemIcon>
                                    <ListItemText primary="League Stats"/>
                                </MenuItem>
                                <MenuItem data-link="/teams_stats" onClick={handleButtonSelection}>
                                    <ListItemIcon>
                                        <img src={barchart} title={"Teams' Stats"}/>
                                    </ListItemIcon>
                                    <ListItemText primary="Teams' Stats"/>
                                </MenuItem>
                                <MenuItem data-link="/players_edit" onClick={handleButtonSelection}>
                                    <ListItemIcon>
                                        <img src={players} title={"players"}/>
                                    </ListItemIcon>
                                    <ListItemText primary="Players"/>
                                </MenuItem>
                                <MenuItem data-link="/admin" onClick={handleButtonSelection}>
                                    <ListItemIcon>
                                        <img src={build} title={"admin"}/>
                                    </ListItemIcon>
                                    <ListItemText primary="Admin"/>
                                </MenuItem>
                            </Menu>

                            {seasonNum !== undefined && (
                                <Box>
                                    {seasonNum !== seasonsTotal && (
                                        <IconButton onClick={handleUp}>
                                            <img src={up} title={"next season"} />
                                        </IconButton>
                                    )}
                                    {seasonNum > 1 && (
                                        <IconButton onClick={handleDown}>
                                            <img src={down} title={"previous season"} />
                                        </IconButton>
                                    )}
                                </Box>
                            )}

                            <Typography variant="h6">{pageTitle}</Typography>
                        </Toolbar>
                    </Grid>
                </Grid>
            </AppBar>
        </div>
    );
}

export default LeagueToolbar;