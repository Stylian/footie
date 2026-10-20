import React, {useState} from 'react'
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Grid,
    IconButton,
    MenuItem,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField
} from "@material-ui/core"
import EditIcon from "@material-ui/icons/Edit"
import SaveIcon from "@material-ui/icons/Save"
import CloseIcon from "@material-ui/icons/Close"
import goldmedal from "../../icons/goldmedal.png"
import silvermedal from "../../icons/silvermedal.png"
import playeroftheyear from "../../icons/playeroftheyear.png"
import dreamteam from "../../icons/dreamteam.png"
import {useDataLoader} from "../../DataLoaderManager"
import PageLoader from "../../PageLoader"

const dreamTeamSlots = [
    {field: "gk", cell: "GK", label: "goalkeeper", bg: "#d2a679"},
    {field: "dcl", cell: "DC", label: "central defender", bg: "rgb(217, 237, 247)"},
    {field: "dcr", cell: "DC", label: "central defender", bg: "rgb(217, 237, 247)"},
    {field: "dl", cell: "DL", label: "left defender", bg: "rgb(217, 237, 247)"},
    {field: "dr", cell: "DR", label: "right defender", bg: "rgb(217, 237, 247)"},
    {field: "cml", cell: "CM", label: "central midfielder", bg: "#dbf0db"},
    {field: "cmr", cell: "CM", label: "central midfielder", bg: "#dbf0db"},
    {field: "amc", cell: "AMC", label: "attacking midfielder centre", bg: "#dbf0db"},
    {field: "aml", cell: "LW", label: "left winger", bg: "#e2b6b6"},
    {field: "amr", cell: "LR", label: "right winger", bg: "#e2b6b6"},
    {field: "st", cell: "ST", label: "striker", bg: "#e2b6b6"},
]

export default function SeasonPostview({year}) {

    const seasonData = useDataLoader("/rest/seasons/" + year + "/overview")
    const players = useDataLoader("/rest/players/")
    const teams = useDataLoader("/rest/teams/")

    const [pageData, setPageData] = useState({
        overachievers: null,
        underperformers: null,
        playerOfTheYear: null,
        gk: null,
        dl: null,
        dr: null,
        dcl: null,
        dcr: null,
        cml: null,
        cmr: null,
        aml: null,
        amr: null,
        amc: null,
        st: null,
    })
    const [editingField, setEditingField] = useState(null)
    const goToTeam = (event) => window.location.href = "/teams/" + event.currentTarget.dataset.teamid
    const goToPlayer = (event) => window.location.href = "/players/" + event.currentTarget.dataset.playerid

    const handleChange = field => event => {
        let value = event.target.value;
        if (value < 0) {
            return;
        }

        setPageData(prevPageData => ({
            ...prevPageData,
            [field]: value
        }));
    };

    const startEdit = (field, currentId) => {
        setEditingField(field)
        setPageData(prevPageData => ({
            ...prevPageData,
            [field]: currentId
        }))
    };

    const cancelEdit = () => setEditingField(null)

    const saveField = (field) => {
        fetch("/rest/seasons/" + year + "/publish", {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: field + "=" + pageData[field]
        })
            .then(res => res.json())
            .then(
                () => window.location.reload(),
                (error) => console.error('Error:', error)
            )
    }

    if (seasonData === null || teams === null || players === null) {
        return (<PageLoader/>)
    }

    const playerOptions = players.map(player => (
        <MenuItem key={player.id} value={player.id}>{player.name}</MenuItem>
    ))
    const teamOptions = teams.map(team => (
        <MenuItem key={team.id} value={team.id}>{team.name}</MenuItem>
    ))

    const renderTeamAward = (field, bg) => {
        const current = seasonData[field]
        const isEditing = current == null || editingField === field
        return (
            <TableRow style={{backgroundColor: current != null ? bg : undefined}}>
                <TableCell
                    className={isEditing ? "" : "teamClicker team_name"}
                    data-teamid={current == null ? undefined : current.id}
                    onClick={isEditing ? undefined : goToTeam}>
                    {isEditing ? (
                        <Box display="flex" alignItems="center">
                            <TextField style={{width: 200}} id={field} select label={field}
                                       value={pageData[field]} onChange={handleChange(field)} margin="normal">
                                {teamOptions}
                            </TextField>
                            {current != null && (
                                <IconButton onClick={cancelEdit}><CloseIcon title={"cancel"}/></IconButton>
                            )}
                            <IconButton onClick={() => saveField(field)} disabled={pageData[field] == null}>
                                <SaveIcon title={"save"}/>
                            </IconButton>
                        </Box>
                    ) : (
                        <Box display="flex" alignItems="center">
                            {current.name}
                            <IconButton onClick={() => startEdit(field, current.id)}>
                                <EditIcon title={"edit"}/>
                            </IconButton>
                        </Box>
                    )}
                </TableCell>
            </TableRow>
        )
    }

    const renderPlayerOfTheYear = () => {
        const field = "playerOfTheYear"
        const current = seasonData.player_of_the_year
        const isEditing = current == null || editingField === field
        return (
            <TableRow style={{backgroundColor: current != null ? 'rgb(179, 184, 255)' : undefined}}>
                {isEditing ? (
                    <>
                        <TableCell>
                            <TextField style={{width: 200}} id={field} select label="player of the year"
                                       value={pageData[field]} onChange={handleChange(field)} margin="normal">
                                {playerOptions}
                            </TextField>
                        </TableCell>
                        <TableCell>
                            {current != null && (
                                <IconButton onClick={cancelEdit}><CloseIcon title={"cancel"}/></IconButton>
                            )}
                            <IconButton onClick={() => saveField(field)} disabled={pageData[field] == null}>
                                <SaveIcon title={"save"}/>
                            </IconButton>
                        </TableCell>
                    </>
                ) : (
                    <>
                        <TableCell className={"playerClicker"} data-playerid={current.id}
                                   style={{minWidth: 150, maxWidth: 150}} onClick={goToPlayer}>
                            <img src={playeroftheyear} title={"player of the year"}/>
                            {current.name}
                        </TableCell>
                        <TableCell className={"teamClicker team_name"} data-teamid={current.team.id}
                                   onClick={goToTeam}>
                            {current.team.name}
                            <IconButton onClick={(e) => {
                                e.stopPropagation();
                                startEdit(field, current.id)
                            }}>
                                <EditIcon title={"edit"}/>
                            </IconButton>
                        </TableCell>
                    </>
                )}
            </TableRow>
        )
    }

    const renderDreamTeamRow = (slot) => {
        const {field, cell, label, bg} = slot
        const current = seasonData[field]
        const isEditing = current == null || editingField === field
        return (
            <TableRow key={field} style={{backgroundColor: current != null ? bg : undefined}}>
                <TableCell>{cell}</TableCell>
                {isEditing ? (
                    <>
                        <TableCell>
                            <TextField style={{width: 200}} id={field} select label={label}
                                       value={pageData[field]} onChange={handleChange(field)} margin="normal">
                                {playerOptions}
                            </TextField>
                        </TableCell>
                        <TableCell>
                            {current != null && (
                                <IconButton onClick={cancelEdit}><CloseIcon title={"cancel"}/></IconButton>
                            )}
                            <IconButton onClick={() => saveField(field)} disabled={pageData[field] == null}>
                                <SaveIcon title={"save"}/>
                            </IconButton>
                        </TableCell>
                    </>
                ) : (
                    <>
                        <TableCell className={"playerClicker"} data-playerid={current.id}
                                   style={{minWidth: 150, maxWidth: 150}} onClick={goToPlayer}>
                            {current.name}
                        </TableCell>
                        <TableCell className={"teamClicker team_name"} data-teamid={current.team.id}
                                   onClick={goToTeam}>
                            {current.team.name}
                            <IconButton onClick={(e) => {
                                e.stopPropagation();
                                startEdit(field, current.id)
                            }}>
                                <EditIcon title={"edit"}/>
                            </IconButton>
                        </TableCell>
                    </>
                )}
            </TableRow>
        )
    }

    return (
            <Box>
                <Grid container spacing={1}>
                    <Grid item sm={7}>
                        <Card className="page_box" style={{boxShadow: 'none', backgroundColor: 'transparent'}} elevation={0}>
                            <CardHeader className="big_header" title={"Team Awards"} align={"center"} titleTypographyProps={{variant: 'h7'}}/>
                            <CardContent>
                                <Grid container spacing={1}>
                                    <Grid item sm={4}>
                                        <Grid container spacing={1}>
                                            <Grid item sm={12}>
                                                <table className="table" align={"center"}>
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell className="small_header">champion</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        <TableRow className={"teamClicker"}
                                                                  data-teamid={seasonData.winner.id}
                                                                  onClick={goToTeam}
                                                                  style={{backgroundColor: 'rgb(179, 184, 255)'}}>
                                                            <TableCell className="team_name">
                                                                <img src={goldmedal} title={"1st place"}/>
                                                                {seasonData.winner.name}
                                                            </TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </table>
                                            </Grid>
                                            <Grid item sm={12}>
                                                <table className="table" align={"center"}>
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell className="small_header">runner-up</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        <TableRow className={"teamClicker"}
                                                                  data-teamid={seasonData.runner_up.id}
                                                                  onClick={goToTeam}
                                                                  style={{backgroundColor: 'rgb(226, 228, 255)'}}>
                                                            <TableCell className="team_name">
                                                                <img src={silvermedal} title={"2nd place"}/>
                                                                {seasonData.runner_up.name}
                                                            </TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </table>
                                            </Grid>
                                            <Grid item sm={12}>
                                                <table className="table" align={"center"}>
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell className="small_header">positions 3rd-4th</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        <TableRow className={"teamClicker"}
                                                                  data-teamid={seasonData.semifinalist1.id}
                                                                  onClick={goToTeam}
                                                                  style={{backgroundColor: 'rgb(217, 237, 247)'}}>
                                                            <TableCell className="team_name">
                                                                {seasonData.semifinalist1.name}
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow className={"teamClicker"}
                                                                  data-teamid={seasonData.semifinalist2.id}
                                                                  onClick={goToTeam}
                                                                  style={{backgroundColor: 'rgb(217, 237, 247)'}}>
                                                            <TableCell className="team_name">
                                                                {seasonData.semifinalist2.name}
                                                            </TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </table>
                                            </Grid>
                                            <Grid item sm={12}>
                                                <table className="table" align={"center"}>
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell className="small_header">positions 5th-6th</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        <TableRow className={"teamClicker"}
                                                                  data-teamid={seasonData.quarterfinalist1.id}
                                                                  onClick={goToTeam}
                                                                  style={{backgroundColor: 'rgb(252, 248, 227)'}}>
                                                            <TableCell className="team_name">
                                                                {seasonData.quarterfinalist1.name}
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow className={"teamClicker"}
                                                                  data-teamid={seasonData.quarterfinalist2.id}
                                                                  onClick={goToTeam}
                                                                  style={{backgroundColor: 'rgb(252, 248, 227)'}}>
                                                            <TableCell className="team_name">
                                                                {seasonData.quarterfinalist2.name}
                                                            </TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </table>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid item sm={8}>
                                        <Grid container spacing={1}>
                                            <Grid item sm={12}>
                                                <table className="table" align={"left"}>
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell className="small_header" colSpan={3}>highest scoring game</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        <TableRow
                                                            style={{backgroundColor: '#e6ffe6'}}>
                                                            <TableCell align="right"
                                                                       className={"teamClicker team_name"}
                                                                       data-teamid={seasonData.highestScoringGame.homeTeam.id}
                                                                       onClick={goToTeam}>
                                                                {seasonData.highestScoringGame.homeTeam.name}</TableCell>
                                                            <TableCell style={{minWidth: 40, maxWidth: 40}}>
                                                                {seasonData.highestScoringGame.result.goalsMadeByHomeTeam + " - "
                                                                    + seasonData.highestScoringGame.result.goalsMadeByAwayTeam}  </TableCell>
                                                            <TableCell align="left"
                                                                       className={"teamClicker team_name"}
                                                                       data-teamid={seasonData.highestScoringGame.awayTeam.id}
                                                                       onClick={goToTeam}>
                                                                {seasonData.highestScoringGame.awayTeam.name}</TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </table>
                                            </Grid>
                                            <Grid item sm={12}>
                                                <table className="table" align={"left"}>
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell className="small_header" colSpan={3}>best win</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        <TableRow
                                                            style={{backgroundColor: '#e6ffe6'}}>
                                                            <TableCell align="right"
                                                                       className={"teamClicker team_name"}
                                                                       data-teamid={seasonData.bestWin.homeTeam.id}
                                                                       onClick={goToTeam}>
                                                                {seasonData.bestWin.homeTeam.name}</TableCell>
                                                            <TableCell style={{minWidth: 40, maxWidth: 40}}>
                                                                {seasonData.bestWin.result.goalsMadeByHomeTeam + " - "
                                                                    + seasonData.bestWin.result.goalsMadeByAwayTeam}  </TableCell>
                                                            <TableCell align="left"
                                                                       className={"teamClicker team_name"}
                                                                       data-teamid={seasonData.bestWin.awayTeam.id}
                                                                       onClick={goToTeam}>
                                                                {seasonData.bestWin.awayTeam.name}</TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </table>
                                            </Grid>
                                            <Grid item sm={12}>
                                                <table className="table" align={"left"}>
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell className="small_header" colSpan={3}>worst result</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        <TableRow
                                                            style={{backgroundColor: '#f2dede'}}>
                                                            <TableCell align="right"
                                                                       className={"teamClicker team_name"}
                                                                       data-teamid={seasonData.worstResult.homeTeam.id}
                                                                       onClick={goToTeam}>
                                                                {seasonData.worstResult.homeTeam.name}</TableCell>
                                                            <TableCell style={{minWidth: 40, maxWidth: 40}}>
                                                                {seasonData.worstResult.result.goalsMadeByHomeTeam + " - "
                                                                    + seasonData.worstResult.result.goalsMadeByAwayTeam}  </TableCell>
                                                            <TableCell align="left"
                                                                       className={"teamClicker team_name"}
                                                                       data-teamid={seasonData.worstResult.awayTeam.id}
                                                                       onClick={goToTeam}>
                                                                {seasonData.worstResult.awayTeam.name}</TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </table>
                                            </Grid>

                                            <Grid item sm={12}>
                                                <table className="table" align={"left"}>
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell className="small_header">overachievers</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {renderTeamAward("overachievers", 'rgb(226, 228, 255)')}
                                                    </TableBody>
                                                </table>
                                            </Grid>
                                            <Grid item sm={12}>
                                                <table className="table" align={"left"}>
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell className="small_header">underperformers</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {renderTeamAward("underperformers", '#f2dede')}
                                                    </TableBody>
                                                </table>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item sm={5}>
                        <Card className="page_box" style={{boxShadow: 'none', backgroundColor: 'transparent'}} elevation={0}>
                            <CardHeader className="big_header" title={"Player Awards"} align={"center"}
                                        titleTypographyProps={{variant: 'h7'}}
                            />
                            <CardContent>
                                <Grid container spacing={1}>
                                    <Grid item sm={12}>
                                        <table className="table" align={"center"}>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell className="small_header" colSpan={2}>player of the year</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {renderPlayerOfTheYear()}
                                            </TableBody>
                                        </table>
                                    </Grid>

                                    <Grid item sm={12}>
                                        <table className="table" align={"center"}>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell className="small_header" colSpan={3}>
                                                        <img src={dreamteam} title={"selected in a dream team"}/>
                                                        dream team</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {dreamTeamSlots.map(renderDreamTeamRow)}
                                            </TableBody>
                                        </table>
                                    </Grid>

                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>

                </Grid>
            </Box>
        )
}
