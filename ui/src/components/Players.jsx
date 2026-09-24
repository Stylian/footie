import React, {useState} from 'react'
import LeagueToolbar from "./LeagueToolbar"
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Grid,
    IconButton,
    MenuItem,
    Paper,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField
} from "@material-ui/core"
import DeleteIcon from "@material-ui/icons/Delete"
import EditIcon from "@material-ui/icons/Edit"
import CloseIcon from "@material-ui/icons/Close"
import SaveIcon from "@material-ui/icons/Save"
import plus from "../icons/plus.png"
import {useDataLoader} from "../DataLoaderManager"
import PageLoader from "../PageLoader";

/**
 * not sure if this will run after refactoring
 * @returns {JSX.Element}
 * @constructor
 */
export default function Players() {

    const players = useDataLoader("/rest/players/")
    const teams = useDataLoader("/rest/teams/")

    const [name, setName] = useState("")
    const [teamId, setTeamId] = useState(0)
    const [editingId, setEditingId] = useState(null)
    const [editName, setEditName] = useState("")
    const [editTeamId, setEditTeamId] = useState(0)

    const handleChange = (field) => (event) => {
        let value = event.target.value
        if (value < 0) {
            return
        }

        if (field === "name") {
            setName(value)
        } else {
            setTeamId(value)
        }
    }
    const handleAdd = () => {
        fetch("/rest/players/", {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: "player_name=" + name + "&team_id=" + teamId
        })
            .then(res => res.json())
            .then(
                () => window.location.reload(),
                (error) => {
                    console.error('Error:', error)
                }
            )
    }
    const goToTeam = (event) => window.location.href = "/teams/" + event.currentTarget.dataset.teamid
    const goToPlayer = (event) => window.location.href = "/players/" + event.currentTarget.dataset.playerid

    const startEdit = (player) => {
        setEditingId(player.id)
        setEditName(player.name)
        setEditTeamId(player.team.id)
    }
    const editChange = (field) => (event) => {
        let value = event.target.value
        if (field === "name") {
            setEditName(value)
        } else {
            setEditTeamId(value)
        }
    }
    const saveEdit = () => {
        fetch("/rest/players/" + editingId, {
            method: 'PUT',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: "player_name=" + editName + "&team_id=" + editTeamId
        })
            .then(res => res.json())
            .then(
                () => window.location.reload(),
                (error) => {
                    console.error('Error:', error)
                }
            )
    }
    const cancelEdit = () => setEditingId(null)
    const deletePlayer = (player) => {
        if (window.confirm("delete player '" + player.name + "' ?")) {
            fetch("/rest/players/" + player.id, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(
                    () => window.location.reload(),
                    (error) => {
                        console.error('Error:', error)
                    }
                )
        }
    }

    if (teams === null || players === null) {
        return (<PageLoader />)
    } else {
        return (
            <Paper className="full-screen-paper" elevation={0}>
                <LeagueToolbar pageTitle={"Players"}/>
                <Box>
                    <Grid container spacing={1}>
                        <Grid item sm={7}>
                            <Card style={{margin: 20}}>
                                <CardHeader title={"Players"} align={"center"} titleTypographyProps={{variant: 'h7'}}/>
                                <CardContent>
                                    <Grid container spacing={1}>
                                        <Grid item sm={6}>
                                            <table className="table" align={"center"}>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>id</TableCell>
                                                        <TableCell>player</TableCell>
                                                        <TableCell>team</TableCell>
                                                        <TableCell></TableCell>
                                                    </TableRow>
                                                </TableHead>

                                                <TableBody>
                                                    <TableRow>
                                                        <TableCell></TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                style={{width: 200}}
                                                                id="player-name"
                                                                label="player"
                                                                value={name}
                                                                onChange={handleChange("name")}
                                                                margin="normal"/>

                                                        </TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                style={{width: 200}}
                                                                id="team"
                                                                select
                                                                label="team"
                                                                value={teamId}
                                                                onChange={handleChange("team")}
                                                                margin="normal">
                                                                {teams.map(team => (
                                                                    <MenuItem key={team.id} value={team.id}>
                                                                        {team.name}
                                                                    </MenuItem>
                                                                ))}
                                                            </TextField>
                                                        </TableCell>
                                                        <TableCell>
                                                            <IconButton onClick={handleAdd}>
                                                                <img src={plus} title={"add"}/>
                                                            </IconButton>
                                                        </TableCell>
                                                    </TableRow>

                                                    {players.map(player => (
                                                        <TableRow key={player.id}>
                                                            <TableCell>{player.id}</TableCell>
                                                            {editingId === player.id ? (
                                                                <>
                                                                    <TableCell>
                                                                        <TextField
                                                                            style={{width: 200}}
                                                                            id="edit-player-name"
                                                                            label="player"
                                                                            value={editName}
                                                                            onChange={editChange("name")}
                                                                            margin="normal"/>
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <TextField
                                                                            style={{width: 200}}
                                                                            id="edit-team"
                                                                            select
                                                                            label="team"
                                                                            value={editTeamId}
                                                                            onChange={editChange("team")}
                                                                            margin="normal">
                                                                            {teams.map(team => (
                                                                                <MenuItem key={team.id}
                                                                                          value={team.id}>
                                                                                    {team.name}
                                                                                </MenuItem>
                                                                            ))}
                                                                        </TextField>
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <IconButton onClick={saveEdit}>
                                                                            <SaveIcon title={"save"}/>
                                                                        </IconButton>
                                                                        <IconButton onClick={cancelEdit}>
                                                                            <CloseIcon title={"cancel"}/>
                                                                        </IconButton>
                                                                    </TableCell>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <TableCell
                                                                        className={"teamClicker"}
                                                                        data-playerid={player.id}
                                                                        onClick={goToPlayer}
                                                                    >{player.name}</TableCell>
                                                                    <TableCell
                                                                        className={"teamClicker"}
                                                                        data-teamid={player.team.id}
                                                                        onClick={goToTeam}
                                                                    >{player.team.name}</TableCell>
                                                                    <TableCell>
                                                                        <IconButton onClick={() => startEdit(player)}>
                                                                            <EditIcon title={"edit"}/>
                                                                        </IconButton>
                                                                        <IconButton onClick={() => deletePlayer(player)}>
                                                                            <DeleteIcon title={"delete"}/>
                                                                        </IconButton>
                                                                    </TableCell>
                                                                </>
                                                            )}
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </table>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        )
    }
}