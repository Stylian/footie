import React, {useEffect, useState} from 'react'
import {
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    IconButton,
    TextField,
} from "@material-ui/core"
import DeleteIcon from "@material-ui/icons/Delete"
import CloseIcon from "@material-ui/icons/Close"
import plus from "../icons/plus.png"

export default function NewSeasonDialog({open, onClose}) {

    const [teams, setTeams] = useState([])
    const [selected, setSelected] = useState({})
    const [newTeamName, setNewTeamName] = useState("")
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    const loadData = (preselectId) => {
        Promise.all([
            fetch("/rest/teams/").then(res => res.json()),
            fetch("/rest/ops/season/previous_teams").then(res => res.json()),
        ]).then((result) => {
            const allTeams = result[0]
            const previousIds = result[1]

            const sel = {}
            allTeams.forEach(team => {
                sel[team.id] = previousIds.includes(team.id) || team.id === preselectId
            })

            setTeams(allTeams)
            setSelected(sel)
            setLoading(false)
        })
    }

    useEffect(() => {
        if (open) {
            setLoading(true)
            loadData()
        }
    }, [open])

    const toggleTeam = (teamId) => {
        setSelected(prev => ({...prev, [teamId]: !prev[teamId]}))
    }

    const handleAddTeam = () => {
        const name = newTeamName.trim()
        if (name === "") {
            return
        }
        fetch("/rest/teams/", {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: "team_name=" + encodeURIComponent(name)
        })
            .then(res => res.json())
            .then((result) => {
                setNewTeamName("")
                const newTeamId = result && result.teamId ? result.teamId : null
                loadData(newTeamId)
            })
    }

    const handleRemoveTeam = (team) => {
        if (!window.confirm("remove team '" + team.name + "' ?")) {
            return
        }
        fetch("/rest/teams/" + team.id, {method: 'DELETE'})
            .then(res => res.json())
            .then(() => loadData())
    }

    const handleStartSeason = () => {
        const teamIds = teams
            .filter(team => selected[team.id] && team.active)
            .map(team => team.id)

        if (teamIds.length === 0) {
            alert("select at least one team")
            return
        }

        setSaving(true)
        fetch("/rest/ops/season/create", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(teamIds)
        })
            .then(res => res.json())
            .then(() => window.location.reload(),
                (error) => {
                    setSaving(false)
                    console.error('Error:', error)
                })
    }

    const selectedCount = teams.filter(team => selected[team.id] && team.active).length

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Start new season</DialogTitle>
            <DialogContent>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <div>
                        <div style={{marginBottom: 8}}>
                            choose the teams for the new season ({selectedCount} selected)
                        </div>

                        <div style={{maxHeight: 320, overflowY: 'auto', border: '1px solid rgba(0,0,0,0.15)',
                            borderRadius: 4, padding: 8, marginBottom: 12}}>
                            {teams.map(team => (
                                <div key={team.id} style={{display: 'flex', alignItems: 'center'}}>
                                    <FormControlLabel
                                        style={{flex: 1}}
                                        control={
                                            <Checkbox
                                                checked={!!selected[team.id]}
                                                disabled={!team.active}
                                                onChange={() => toggleTeam(team.id)}
                                            />
                                        }
                                        label={team.active ? team.name : team.name + " (removed)"}
                                    />
                                    <IconButton size="small" onClick={() => handleRemoveTeam(team)} title="remove team">
                                        <DeleteIcon fontSize="small"/>
                                    </IconButton>
                                </div>
                            ))}
                        </div>

                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <TextField
                                style={{flex: 1}}
                                label="new team"
                                value={newTeamName}
                                onChange={(e) => setNewTeamName(e.target.value)}
                                margin="normal"/>
                            <IconButton onClick={handleAddTeam} title="add team">
                                <img src={plus} title="add"/>
                            </IconButton>
                        </div>
                    </div>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} startIcon={<CloseIcon/>}>Cancel</Button>
                <Button onClick={handleStartSeason} color="primary" variant="contained" disabled={saving || loading}>
                    Start new season
                </Button>
            </DialogActions>
        </Dialog>
    )
}
