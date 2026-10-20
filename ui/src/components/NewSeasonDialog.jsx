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

const MIN_TEAMS = 24
const MAX_TEAMS = 48

export default function NewSeasonDialog({open, onClose}) {

    const [teams, setTeams] = useState([])
    const [selected, setSelected] = useState({})
    const [newTeamName, setNewTeamName] = useState("")
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    const loadData = (preselectId, preserveSelections = false) => {
        Promise.all([
            fetch("/rest/teams/").then(res => res.json()),
            fetch("/rest/ops/season/previous_teams").then(res => res.json()),
        ]).then((result) => {
            const allTeams = result[0]
            const previousIds = result[1]

            setTeams(allTeams)
            setSelected(prev => {
                const sel = {}
                allTeams.forEach(team => {
                    if (preserveSelections && Object.prototype.hasOwnProperty.call(prev, team.id)) {
                        sel[team.id] = prev[team.id] && team.active
                    } else {
                        sel[team.id] = team.active && (previousIds.includes(team.id) || team.id === preselectId)
                    }
                })
                return sel
            })
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
                loadData(newTeamId, true)
            })
    }

    const handleRemoveTeam = (team) => {
        if (!window.confirm("remove team '" + team.name + "' ?")) {
            return
        }
        fetch("/rest/teams/" + team.id, {method: 'DELETE'})
            .then(res => res.json())
            .then(() => loadData(null, true))
    }

    const handleStartSeason = () => {
        const teamIds = teams
            .filter(team => selected[team.id] && team.active)
            .map(team => team.id)

        if (teamIds.length < MIN_TEAMS || teamIds.length > MAX_TEAMS) {
            alert("select between " + MIN_TEAMS + " and " + MAX_TEAMS + " teams")
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
    const activeTeams = teams.filter(team => team.active)
    const allSelected = activeTeams.length > 0 && activeTeams.every(team => selected[team.id])
    const someSelected = !allSelected && activeTeams.some(team => selected[team.id])
    const canSelectMore = selectedCount < MAX_TEAMS
    const selectionValid = selectedCount >= MIN_TEAMS && selectedCount <= MAX_TEAMS

    const toggleAll = () => {
        setSelected(prev => {
            const next = {...prev}
            let count = 0
            activeTeams.forEach(team => {
                const check = !allSelected && count < MAX_TEAMS
                next[team.id] = check
                if (check) {
                    count++
                }
            })
            return next
        })
    }

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Start new season</DialogTitle>
            <DialogContent>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <div>
                        <div style={{marginBottom: 8, display: 'flex', alignItems: 'center',
                            justifyContent: 'space-between'}}>
                            <span>choose between {MIN_TEAMS} and {MAX_TEAMS} teams ({selectedCount} selected)</span>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={allSelected}
                                        indeterminate={someSelected}
                                        onChange={toggleAll}
                                    />
                                }
                                label="choose all"
                            />
                        </div>

                        {!selectionValid && (
                            <div style={{color: '#c62828', marginBottom: 8}}>
                                {selectedCount < MIN_TEAMS
                                    ? "select at least " + MIN_TEAMS + " teams"
                                    : "select at most " + MAX_TEAMS + " teams"}
                            </div>
                        )}

                        <div style={{maxHeight: 320, overflowY: 'auto', border: '1px solid rgba(0,0,0,0.15)',
                            borderRadius: 4, padding: 8, marginBottom: 12}}>
                            {teams.map(team => (
                                <div key={team.id} style={{display: 'flex', alignItems: 'center'}}>
                                    <FormControlLabel
                                        style={{flex: 1}}
                                        control={
                                            <Checkbox
                                                checked={!!selected[team.id]}
                                                disabled={!team.active || (!selected[team.id] && !canSelectMore)}
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
                <Button onClick={handleStartSeason} color="primary" variant="contained"
                    disabled={saving || loading || !selectionValid}>
                    Start new season
                </Button>
            </DialogActions>
        </Dialog>
    )
}
