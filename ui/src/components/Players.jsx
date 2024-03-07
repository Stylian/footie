import React, {useState} from 'react'
import LeagueToolbar from "./LeagueToolbar"
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Grid,
    MenuItem,
    Paper,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField
} from "@material-ui/core"
import IconButton from "@material-ui/core/IconButton"
import plus from "../icons/plus.png"
import {useDataLoader} from "../DataLoaderManager"

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

    if (teams === null || players === null) {
        return (<div>Loading...</div>)
    } else {
        return (
            <Paper style={{margin: 20}} elevation={20}>
                <LeagueToolbar pageTitle={"Players"}/>
                <Box width={1200}>
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
                                                        <TableRow>
                                                            <TableCell>{player.id}</TableCell>
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