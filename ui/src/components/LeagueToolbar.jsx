import React, {useState} from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import Tooltip from '@material-ui/core/Tooltip'
import {Box, Grid, ListItemIcon, ListItemText} from "@material-ui/core"
import list from "../icons/list.svg"
import build from "../icons/build.svg"
import arrowLeft from "../icons/arrow-left.svg"
import arrowRight from "../icons/arrow-right.svg"
import up from "../icons/up.svg"
import down from "../icons/down.svg"
import players from "../icons/football-players.png"
import analytics from "../icons/analytics.png"
import barchart from "../icons/bar-chart.png"
import medal1 from "../icons/medal1.png"
import exchange from "../icons/exchange.png"
import calendar from "../icons/calendar.png"
import {useDataLoader} from "../DataLoaderManager"

const buttonStyle = {
    border: '1px solid rgba(255,255,255,0.6)',
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.15)',
    padding: 32,
    marginRight: 16,
}

const menuItems = [
    {link: "/", icon: list, label: "Seasons"},
    {link: "/coefficients", icon: medal1, label: "Awards & Coefficients"},
    {link: "/league_stats", icon: analytics, label: "League Stats"},
    {link: "/teams_stats", icon: barchart, label: "Teams' Stats"},
    {link: "/players_edit", icon: players, label: "Players"},
    {link: "/rules", icon: list, label: "Rules"},
    {link: "/admin", icon: build, label: "Admin"},
]

export default function LeagueToolbar({ pageTitle, seasonNum, setUpTeams, showNextGame, onToggleNextGame }) {

    const [menuPosition, setMenuPosition] = useState(null)
    const seasonsTotal = useDataLoader("/rest/seasons/")
    const handleClick = (event) => setMenuPosition(event.currentTarget)
    const handleButtonSelection = (e) => window.location = e.currentTarget.dataset.link
    const handleClose = () => setMenuPosition(null)
    const handleSetUpTeams = () => {
        fetch("/rest/ops/" + setUpTeams.kind + "/" + setUpTeams.round + "/set", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
        })
            .then(res => res.json())
            .then(
                () => window.location.reload(),
                (error) => console.error('Error:', error)
            )
    }
    const handleUp = () => window.location.href = parseInt(seasonNum) + 1
    const handleDown = () => window.location.href = parseInt(seasonNum) - 1
    const handleBack = () => window.history.back()
    const handleForward = () => window.history.forward()

    return (
        <AppBar position="static" style={{ borderBottom: '1px solid rgba(0,0,0,0.25)' }}>
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="Menu" onClick={handleClick}
                            className="toolbar_button">
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
                    {menuItems.map((item) => (
                        <MenuItem key={item.link} data-link={item.link} onClick={handleButtonSelection}>
                            <ListItemIcon>
                                <img src={item.icon} title={item.label}/>
                            </ListItemIcon>
                            <ListItemText primary={item.label}/>
                        </MenuItem>
                    ))}
                </Menu>

                <Typography variant="h6" style={{ marginLeft: 15 }}>{pageTitle}</Typography>
            </Toolbar>
            <Toolbar style={{ minHeight: 44 }}>
                {seasonsTotal && (
                    <Box>
                        <Tooltip title="next season" arrow placement="top">
                            <span>
                                <IconButton onClick={handleUp} disabled={!seasonNum || seasonNum == seasonsTotal}
                                            className="toolbar_button"
                                            style={{...buttonStyle,
                                                opacity: (!seasonNum || seasonNum == seasonsTotal) ? 0.35 : 1}}>
                                    <img src={up} title={"next season"}
                                         style={{maxHeight: 24, width: 'auto',
                                             filter: 'brightness(0) invert(1)'}}/>
                                </IconButton>
                            </span>
                        </Tooltip>
                        <Tooltip title="previous season" arrow placement="top">
                            <span>
                                <IconButton onClick={handleDown} disabled={!seasonNum || seasonNum <= 1}
                                            className="toolbar_button"
                                            style={{...buttonStyle,
                                                opacity: (!seasonNum || seasonNum <= 1) ? 0.35 : 1}}>
                                    <img src={down} title={"previous season"}
                                         style={{maxHeight: 24, width: 'auto',
                                             filter: 'brightness(0) invert(1)'}}/>
                                </IconButton>
                            </span>
                        </Tooltip>
                    </Box>
                )}
                <Tooltip title="Back" arrow placement="top">
                    <IconButton color="inherit" aria-label="Back" onClick={handleBack}
                                className="toolbar_button"
                                style={buttonStyle}>
                        <img src={arrowLeft} title="back"
                             style={{maxHeight: 24, width: 'auto', filter: 'brightness(0) invert(1)'}}/>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Forward" arrow placement="top">
                    <IconButton color="inherit" aria-label="Forward" onClick={handleForward}
                                className="toolbar_button"
                                style={buttonStyle}>
                        <img src={arrowRight} title="forward"
                             style={{maxHeight: 24, width: 'auto', filter: 'brightness(0) invert(1)'}}/>
                    </IconButton>
                </Tooltip>

                <Box>
                    {menuItems.map((item) => (
                        <Tooltip key={item.link} title={item.label} arrow placement="top">
                            <IconButton data-link={item.link} onClick={handleButtonSelection}
                                        aria-label={item.label}
                                        className="toolbar_button"
                                        style={buttonStyle}>
                                <img src={item.icon} title={item.label}
                                     style={{maxHeight: 24, width: 'auto',
                                         filter: 'brightness(0) invert(1)'}}/>
                            </IconButton>
                        </Tooltip>
                    ))}
                    {onToggleNextGame && (
                        <Tooltip title={showNextGame ? "Hide upcoming game" : "Show upcoming game"}
                                 arrow placement="top">
                            <IconButton onClick={onToggleNextGame}
                                        aria-label="Toggle upcoming game"
                                        className="toolbar_button"
                                        style={buttonStyle}>
                                <img src={exchange}
                                     title={showNextGame ? "Hide upcoming game" : "Show upcoming game"}
                                     style={{maxHeight: 24, width: 'auto',
                                         filter: 'brightness(0) invert(1)'}}/>
                            </IconButton>
                        </Tooltip>
                    )}
                </Box>

                {setUpTeams && (
                    <Tooltip title="Set up Teams" arrow placement="top">
                        <IconButton onClick={handleSetUpTeams}
                                    aria-label="Set up Teams"
                                    className="toolbar_button"
                                    style={{...buttonStyle, marginLeft: 'auto'}}>
                            <img src={calendar} title="Set up Teams"
                                 style={{maxHeight: 24, width: 'auto',
                                     filter: 'brightness(0) invert(1)'}}/>
                        </IconButton>
                    </Tooltip>
                )}
            </Toolbar>
        </AppBar>
    )
}