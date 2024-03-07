import React, {useState} from 'react'
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Grid,
    MenuItem,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField
} from "@material-ui/core"
import goldmedal from "../../icons/goldmedal.png"
import silvermedal from "../../icons/silvermedal.png"
import playeroftheyear from "../../icons/playeroftheyear.png"
import dreamteam from "../../icons/dreamteam.png"
import Button from "@material-ui/core/Button"
import {useDataLoader} from "../../DataLoaderManager"
import PageLoader from "../../PageLoader"

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
    const goToTeam = (event) => window.location.href = "/teams/" + event.currentTarget.dataset.teamid
    const goToPlayer = (event) => window.location.href = "/players/" + event.currentTarget.dataset.groupid

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

    const handlePublish = () => {
        fetch("/rest/seasons/" + year + "/publish", {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: "overachievers=" + pageData.overachievers
                + "&underperformers=" + pageData.underperformers
                + "&playerOfTheYear=" + pageData.playerOfTheYear
                + "&gk=" + pageData.gk
                + "&dl=" + pageData.dl
                + "&dr=" + pageData.dr
                + "&dcl=" + pageData.dcl
                + "&dcr=" + pageData.dcr
                + "&cml=" + pageData.cml
                + "&cmr=" + pageData.cmr
                + "&amr=" + pageData.amr
                + "&aml=" + pageData.aml
                + "&amc=" + pageData.amc
                + "&st=" + pageData.st
        })
            .then(res => res.json())
            .then(
                () => window.location.reload(),
                (error) => console.error('Error:', error)
            )
    }

    if (seasonData === null || teams === null || players === null) {
        return (<PageLoader/>)
    } else {
        return (
            <Box>
                {seasonData.haveToPublish ? (<Button onClick={handlePublish}>Publish</Button>) : ''}
                <Grid container spacing={1}>
                    <Grid item sm={6}>
                        <Card style={{margin: 20}}>
                            <CardHeader title={"Team Awards"} align={"center"} titleTypographyProps={{variant: 'h7'}}/>
                            <CardContent>
                                <Grid container spacing={1}>
                                    <Grid item sm={4}>
                                        <Grid container spacing={1}>
                                            <Grid item sm={12}>
                                                <table className="table" align={"center"}>
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell>champion</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        <TableRow className={"teamClicker"}
                                                                  data-teamid={seasonData.winner.id}
                                                                  onClick={goToTeam}
                                                                  style={{backgroundColor: 'rgb(179, 184, 255)'}}>
                                                            <TableCell style={{minWidth: 120, maxWidth: 120}}>
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
                                                            <TableCell>runner-up</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        <TableRow className={"teamClicker"}
                                                                  data-teamid={seasonData.runner_up.id}
                                                                  onClick={goToTeam}
                                                                  style={{backgroundColor: 'rgb(226, 228, 255)'}}>
                                                            <TableCell style={{minWidth: 120, maxWidth: 120}}>
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
                                                            <TableCell>positions 3rd-4th</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        <TableRow className={"teamClicker"}
                                                                  data-teamid={seasonData.semifinalist1.id}
                                                                  onClick={goToTeam}
                                                                  style={{backgroundColor: 'rgb(217, 237, 247)'}}>
                                                            <TableCell style={{minWidth: 120, maxWidth: 120}}>
                                                                {seasonData.semifinalist1.name}
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow className={"teamClicker"}
                                                                  data-teamid={seasonData.semifinalist2.id}
                                                                  onClick={goToTeam}
                                                                  style={{backgroundColor: 'rgb(217, 237, 247)'}}>
                                                            <TableCell style={{minWidth: 120, maxWidth: 120}}>
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
                                                            <TableCell>positions 5th-6th</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        <TableRow className={"teamClicker"}
                                                                  data-teamid={seasonData.quarterfinalist1.id}
                                                                  onClick={goToTeam}
                                                                  style={{backgroundColor: 'rgb(252, 248, 227)'}}>
                                                            <TableCell style={{minWidth: 120, maxWidth: 120}}>
                                                                {seasonData.quarterfinalist1.name}
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow className={"teamClicker"}
                                                                  data-teamid={seasonData.quarterfinalist2.id}
                                                                  onClick={goToTeam}
                                                                  style={{backgroundColor: 'rgb(252, 248, 227)'}}>
                                                            <TableCell style={{minWidth: 120, maxWidth: 120}}>
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
                                                            <TableCell colSpan={3}>highest scoring game</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        <TableRow
                                                            style={{backgroundColor: '#e6ffe6'}}>
                                                            <TableCell align="right"
                                                                       className={"teamClicker"}
                                                                       style={{minWidth: 120, maxWidth: 120}}
                                                                       data-teamid={seasonData.highestScoringGame.homeTeam.id}
                                                                       onClick={goToTeam}>
                                                                {seasonData.highestScoringGame.homeTeam.name}</TableCell>
                                                            <TableCell style={{minWidth: 40, maxWidth: 40}}>
                                                                {seasonData.highestScoringGame.result.goalsMadeByHomeTeam + " - "
                                                                    + seasonData.highestScoringGame.result.goalsMadeByAwayTeam}  </TableCell>
                                                            <TableCell align="left"
                                                                       className={"teamClicker"}
                                                                       style={{minWidth: 120, maxWidth: 120}}
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
                                                            <TableCell colSpan={3}>best win</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        <TableRow
                                                            style={{backgroundColor: '#e6ffe6'}}>
                                                            <TableCell align="right"
                                                                       className={"teamClicker"}
                                                                       style={{minWidth: 120, maxWidth: 120}}
                                                                       data-teamid={seasonData.bestWin.homeTeam.id}
                                                                       onClick={goToTeam}>
                                                                {seasonData.bestWin.homeTeam.name}</TableCell>
                                                            <TableCell style={{minWidth: 40, maxWidth: 40}}>
                                                                {seasonData.bestWin.result.goalsMadeByHomeTeam + " - "
                                                                    + seasonData.bestWin.result.goalsMadeByAwayTeam}  </TableCell>
                                                            <TableCell align="left"
                                                                       className={"teamClicker"}
                                                                       style={{minWidth: 120, maxWidth: 120}}
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
                                                            <TableCell colSpan={3}>worst result</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        <TableRow
                                                            style={{backgroundColor: '#f2dede'}}>
                                                            <TableCell align="right"
                                                                       className={"teamClicker"}
                                                                       style={{minWidth: 120, maxWidth: 120}}
                                                                       data-teamid={seasonData.worstResult.homeTeam.id}
                                                                       onClick={goToTeam}>
                                                                {seasonData.worstResult.homeTeam.name}</TableCell>
                                                            <TableCell style={{minWidth: 40, maxWidth: 40}}>
                                                                {seasonData.worstResult.result.goalsMadeByHomeTeam + " - "
                                                                    + seasonData.worstResult.result.goalsMadeByAwayTeam}  </TableCell>
                                                            <TableCell align="left"
                                                                       className={"teamClicker"}
                                                                       style={{minWidth: 120, maxWidth: 120}}
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
                                                            <TableCell>overachievers</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {seasonData.overachievers == null ? (
                                                            <TableRow>
                                                                <TableCell>
                                                                    <TextField
                                                                        style={{width: 200}}
                                                                        id="overachievers"
                                                                        select
                                                                        label="overachievers"
                                                                        value={pageData.overachievers}
                                                                        onChange={handleChange("overachievers")}
                                                                        margin="normal">
                                                                        {teams.map(team => (
                                                                            <MenuItem key={team.id} value={team.id}>
                                                                                {team.name}
                                                                            </MenuItem>
                                                                        ))}
                                                                    </TextField>
                                                                </TableCell>
                                                            </TableRow>
                                                        ) : (
                                                            <TableRow className={"teamClicker"}
                                                                      data-teamid={seasonData.overachievers.id}
                                                                      onClick={goToTeam}
                                                                      style={{backgroundColor: 'rgb(226, 228, 255)'}}>
                                                                <TableCell style={{minWidth: 120, maxWidth: 120}}>
                                                                    {seasonData.overachievers.name}
                                                                </TableCell>
                                                            </TableRow>)}

                                                    </TableBody>
                                                </table>
                                            </Grid>
                                            <Grid item sm={12}>
                                                <table className="table" align={"left"}>
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell>underperformers</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {seasonData.underperformers == null ? (
                                                            <TableRow>
                                                                <TableCell>
                                                                    <TextField
                                                                        style={{width: 200}}
                                                                        id="underperformers"
                                                                        select
                                                                        label="underperformers"
                                                                        value={pageData.underperformers}
                                                                        onChange={handleChange("underperformers")}
                                                                        margin="normal">
                                                                        {teams.map(team => (
                                                                            <MenuItem key={team.id} value={team.id}>
                                                                                {team.name}
                                                                            </MenuItem>
                                                                        ))}
                                                                    </TextField>
                                                                </TableCell>
                                                            </TableRow>
                                                        ) : (
                                                            <TableRow className={"teamClicker"}
                                                                      data-teamid={seasonData.underperformers.id}
                                                                      onClick={goToTeam}
                                                                      style={{backgroundColor: '#f2dede'}}>
                                                                <TableCell style={{minWidth: 120, maxWidth: 120}}>
                                                                    {seasonData.underperformers.name}
                                                                </TableCell>
                                                            </TableRow>)}
                                                    </TableBody>
                                                </table>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item sm={4}>
                        <Card style={{margin: 20}}>
                            <CardHeader title={"Player Awards"} align={"center"}
                                        titleTypographyProps={{variant: 'h7'}}
                            />
                            <CardContent>
                                <Grid container spacing={1}>
                                    <Grid item sm={12}>
                                        <table className="table" align={"center"}>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell colSpan={2}>player of the year</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {seasonData.player_of_the_year == null ? (
                                                    <TableRow>
                                                        <TableCell>
                                                            <TextField
                                                                style={{width: 200}}
                                                                id="playerOfTheYear"
                                                                select
                                                                label="player of the year"
                                                                value={pageData.playerOfTheYear}
                                                                onChange={handleChange("playerOfTheYear")}
                                                                margin="normal">
                                                                {players.map(player => (
                                                                    <MenuItem key={player.id} value={player.id}>
                                                                        {player.name}
                                                                    </MenuItem>
                                                                ))}
                                                            </TextField>
                                                        </TableCell>
                                                    </TableRow>
                                                ) : (
                                                    <TableRow
                                                        style={{backgroundColor: 'rgb(179, 184, 255)'}}>
                                                        <TableCell className={"playerClicker"}
                                                                   data-playerid={seasonData.player_of_the_year.id}
                                                                   style={{minWidth: 150, maxWidth: 150}}
                                                                   onClick={goToPlayer}>
                                                            <img src={playeroftheyear}
                                                                 title={"player of the year"}/>
                                                            {seasonData.player_of_the_year.name}
                                                        </TableCell>
                                                        <TableCell className={"teamClicker"}
                                                                   data-teamid={seasonData.player_of_the_year.team.id}
                                                                   style={{minWidth: 120, maxWidth: 120}}
                                                                   onClick={goToTeam}>
                                                            {seasonData.player_of_the_year.team.name}
                                                        </TableCell>
                                                    </TableRow>)}

                                            </TableBody>
                                        </table>
                                    </Grid>

                                    <Grid item sm={12}>
                                        <table className="table" align={"center"}>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell colSpan={3}>
                                                        <img src={dreamteam} title={"selected in a dream team"}/>
                                                        dream team</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                <TableBody>
                                                    {seasonData.gk == null ? (
                                                        <TableRow>
                                                            <TableCell>GK</TableCell>
                                                            <TableCell>
                                                                <TextField
                                                                    style={{width: 200}}
                                                                    id="gk"
                                                                    select
                                                                    label="goalkeeper"
                                                                    value={pageData.gk}
                                                                    onChange={handleChange("gk")}
                                                                    margin="normal">
                                                                    {players.map(player => (
                                                                        <MenuItem key={player.id} value={player.id}>
                                                                            {player.name}
                                                                        </MenuItem>
                                                                    ))}
                                                                </TextField>
                                                            </TableCell>
                                                            <TableCell></TableCell>
                                                        </TableRow>
                                                    ) : (
                                                        <TableRow
                                                            style={{backgroundColor: '#d2a679'}}>
                                                            <TableCell>GK</TableCell>
                                                            <TableCell
                                                                className={"playerClicker"}
                                                                data-playerid={seasonData.gk.id}
                                                                onClick={goToPlayer}
                                                            >
                                                                {seasonData.gk.name}
                                                            </TableCell>
                                                            <TableCell className={"teamClicker"}
                                                                       data-teamid={seasonData.gk.team.id}
                                                                       style={{minWidth: 120, maxWidth: 120}}
                                                                       onClick={goToTeam}>
                                                                {seasonData.gk.team.name}
                                                            </TableCell>
                                                        </TableRow>)}

                                                    {seasonData.dcl == null ? (
                                                        <TableRow>
                                                            <TableCell>DC</TableCell>
                                                            <TableCell>
                                                                <TextField
                                                                    style={{width: 200}}
                                                                    id="dcl"
                                                                    select
                                                                    label="central defender"
                                                                    value={pageData.dcl}
                                                                    onChange={handleChange("dcl")}
                                                                    margin="normal">
                                                                    {players.map(player => (
                                                                        <MenuItem key={player.id} value={player.id}>
                                                                            {player.name}
                                                                        </MenuItem>
                                                                    ))}
                                                                </TextField>
                                                            </TableCell>
                                                            <TableCell></TableCell>
                                                        </TableRow>
                                                    ) : (
                                                        <TableRow
                                                            style={{backgroundColor: 'rgb(217, 237, 247)'}}>
                                                            <TableCell>DC</TableCell>
                                                            <TableCell
                                                                className={"playerClicker"}
                                                                data-playerid={seasonData.dcl.id}
                                                                style={{minWidth: 150, maxWidth: 150}}
                                                                onClick={goToPlayer}
                                                            >
                                                                {seasonData.dcl.name}
                                                            </TableCell>
                                                            <TableCell className={"teamClicker"}
                                                                       data-teamid={seasonData.dcl.team.id}
                                                                       style={{minWidth: 120, maxWidth: 120}}
                                                                       onClick={goToTeam}>
                                                                {seasonData.dcl.team.name}
                                                            </TableCell>
                                                        </TableRow>)}

                                                    {seasonData.dcr == null ? (
                                                        <TableRow>
                                                            <TableCell>DC</TableCell>
                                                            <TableCell>
                                                                <TextField
                                                                    style={{width: 200}}
                                                                    id="dcr"
                                                                    select
                                                                    label="central defender"
                                                                    value={pageData.dcr}
                                                                    onChange={handleChange("dcr")}
                                                                    margin="normal">
                                                                    {players.map(player => (
                                                                        <MenuItem key={player.id} value={player.id}>
                                                                            {player.name}
                                                                        </MenuItem>
                                                                    ))}
                                                                </TextField>
                                                            </TableCell>
                                                            <TableCell></TableCell>
                                                        </TableRow>
                                                    ) : (
                                                        <TableRow
                                                            style={{backgroundColor: 'rgb(217, 237, 247)'}}>
                                                            <TableCell>DC</TableCell>
                                                            <TableCell
                                                                className={"playerClicker"}
                                                                data-playerid={seasonData.dcr.id}
                                                                style={{minWidth: 150, maxWidth: 150}}
                                                                onClick={goToPlayer}
                                                            >
                                                                {seasonData.dcr.name}
                                                            </TableCell>
                                                            <TableCell className={"teamClicker"}
                                                                       data-teamid={seasonData.dcr.team.id}
                                                                       style={{minWidth: 120, maxWidth: 120}}
                                                                       onClick={goToTeam}>
                                                                {seasonData.dcr.team.name}
                                                            </TableCell>
                                                        </TableRow>)}

                                                    {seasonData.dl == null ? (
                                                        <TableRow>
                                                            <TableCell>DL</TableCell>
                                                            <TableCell>
                                                                <TextField
                                                                    style={{width: 200}}
                                                                    id="dl"
                                                                    select
                                                                    label="left defender"
                                                                    value={pageData.dl}
                                                                    onChange={handleChange("dl")}
                                                                    margin="normal">
                                                                    {players.map(player => (
                                                                        <MenuItem key={player.id} value={player.id}>
                                                                            {player.name}
                                                                        </MenuItem>
                                                                    ))}
                                                                </TextField>
                                                            </TableCell>
                                                            <TableCell></TableCell>
                                                        </TableRow>
                                                    ) : (
                                                        <TableRow
                                                            style={{backgroundColor: 'rgb(217, 237, 247)'}}>
                                                            <TableCell>DL</TableCell>
                                                            <TableCell
                                                                className={"playerClicker"}
                                                                data-playerid={seasonData.dl.id}
                                                                style={{minWidth: 150, maxWidth: 150}}
                                                                onClick={goToPlayer}
                                                            >
                                                                {seasonData.dl.name}
                                                            </TableCell>
                                                            <TableCell className={"teamClicker"}
                                                                       data-teamid={seasonData.dl.team.id}
                                                                       style={{minWidth: 120, maxWidth: 120}}
                                                                       onClick={goToTeam}>
                                                                {seasonData.dl.team.name}
                                                            </TableCell>
                                                        </TableRow>)}

                                                    {seasonData.dr == null ? (
                                                        <TableRow>
                                                            <TableCell>DR</TableCell>
                                                            <TableCell>
                                                                <TextField
                                                                    style={{width: 200}}
                                                                    id="dr"
                                                                    select
                                                                    label="right defender"
                                                                    value={pageData.dr}
                                                                    onChange={handleChange("dr")}
                                                                    margin="normal">
                                                                    {players.map(player => (
                                                                        <MenuItem key={player.id} value={player.id}>
                                                                            {player.name}
                                                                        </MenuItem>
                                                                    ))}
                                                                </TextField>
                                                            </TableCell>
                                                            <TableCell></TableCell>
                                                        </TableRow>
                                                    ) : (
                                                        <TableRow
                                                            style={{backgroundColor: 'rgb(217, 237, 247)'}}>
                                                            <TableCell>DR</TableCell>
                                                            <TableCell
                                                                className={"playerClicker"}
                                                                data-playerid={seasonData.dr.id}
                                                                style={{minWidth: 150, maxWidth: 150}}
                                                                onClick={goToPlayer}
                                                            >
                                                                {seasonData.dr.name}
                                                            </TableCell>
                                                            <TableCell className={"teamClicker"}
                                                                       data-teamid={seasonData.dr.team.id}
                                                                       style={{minWidth: 120, maxWidth: 120}}
                                                                       onClick={goToTeam}>
                                                                {seasonData.dr.team.name}
                                                            </TableCell>
                                                        </TableRow>)}

                                                    {seasonData.cml == null ? (
                                                        <TableRow>
                                                            <TableCell>CM</TableCell>
                                                            <TableCell>
                                                                <TextField
                                                                    style={{width: 200}}
                                                                    id="cml"
                                                                    select
                                                                    label="central midfielder"
                                                                    value={pageData.cml}
                                                                    onChange={handleChange("cml")}
                                                                    margin="normal">
                                                                    {players.map(player => (
                                                                        <MenuItem key={player.id} value={player.id}>
                                                                            {player.name}
                                                                        </MenuItem>
                                                                    ))}
                                                                </TextField>
                                                            </TableCell>
                                                            <TableCell></TableCell>
                                                        </TableRow>
                                                    ) : (
                                                        <TableRow
                                                            style={{backgroundColor: '#dbf0db'}}>
                                                            <TableCell>CM</TableCell>
                                                            <TableCell
                                                                className={"playerClicker"}
                                                                data-playerid={seasonData.cml.id}
                                                                style={{minWidth: 150, maxWidth: 150}}
                                                                onClick={goToPlayer}
                                                            >
                                                                {seasonData.cml.name}
                                                            </TableCell>
                                                            <TableCell className={"teamClicker"}
                                                                       data-teamid={seasonData.cml.team.id}
                                                                       style={{minWidth: 120, maxWidth: 120}}
                                                                       onClick={goToTeam}>
                                                                {seasonData.cml.team.name}
                                                            </TableCell>
                                                        </TableRow>)}

                                                    {seasonData.cmr == null ? (
                                                        <TableRow>
                                                            <TableCell>CM</TableCell>
                                                            <TableCell>
                                                                <TextField
                                                                    style={{width: 200}}
                                                                    id="cmr"
                                                                    select
                                                                    label="central midfielder"
                                                                    value={pageData.cmr}
                                                                    onChange={handleChange("cmr")}
                                                                    margin="normal">
                                                                    {players.map(player => (
                                                                        <MenuItem key={player.id} value={player.id}>
                                                                            {player.name}
                                                                        </MenuItem>
                                                                    ))}
                                                                </TextField>
                                                            </TableCell>
                                                            <TableCell></TableCell>
                                                        </TableRow>
                                                    ) : (
                                                        <TableRow
                                                            style={{backgroundColor: '#dbf0db'}}>
                                                            <TableCell>CM</TableCell>
                                                            <TableCell
                                                                className={"playerClicker"}
                                                                data-playerid={seasonData.cmr.id}
                                                                style={{minWidth: 150, maxWidth: 150}}
                                                                onClick={goToPlayer}
                                                            >
                                                                {seasonData.cmr.name}
                                                            </TableCell>
                                                            <TableCell className={"teamClicker"}
                                                                       data-teamid={seasonData.cmr.team.id}
                                                                       style={{minWidth: 120, maxWidth: 120}}
                                                                       onClick={goToTeam}>
                                                                {seasonData.cmr.team.name}
                                                            </TableCell>
                                                        </TableRow>)}


                                                    {seasonData.amc == null ? (
                                                        <TableRow>
                                                            <TableCell>AMC</TableCell>
                                                            <TableCell>
                                                                <TextField
                                                                    style={{width: 200}}
                                                                    id="amc"
                                                                    select
                                                                    label="attacking midfielder centre"
                                                                    value={pageData.amc}
                                                                    onChange={handleChange("amc")}
                                                                    margin="normal">
                                                                    {players.map(player => (
                                                                        <MenuItem key={player.id} value={player.id}>
                                                                            {player.name}
                                                                        </MenuItem>
                                                                    ))}
                                                                </TextField>
                                                            </TableCell>
                                                            <TableCell></TableCell>
                                                        </TableRow>
                                                    ) : (
                                                        <TableRow
                                                            style={{backgroundColor: '#dbf0db'}}>
                                                            <TableCell>AMC</TableCell>
                                                            <TableCell
                                                                className={"playerClicker"}
                                                                data-playerid={seasonData.amc.id}
                                                                style={{minWidth: 150, maxWidth: 150}}
                                                                onClick={goToPlayer}
                                                            >
                                                                {seasonData.amc.name}
                                                            </TableCell>
                                                            <TableCell className={"teamClicker"}
                                                                       data-teamid={seasonData.amc.team.id}
                                                                       style={{minWidth: 120, maxWidth: 120}}
                                                                       onClick={goToTeam}>
                                                                {seasonData.amc.team.name}
                                                            </TableCell>
                                                        </TableRow>)}

                                                    {seasonData.aml == null ? (
                                                        <TableRow>
                                                            <TableCell>LW</TableCell>
                                                            <TableCell>
                                                                <TextField
                                                                    style={{width: 200}}
                                                                    id="aml"
                                                                    select
                                                                    label="left winger"
                                                                    value={pageData.aml}
                                                                    onChange={handleChange("aml")}
                                                                    margin="normal">
                                                                    {players.map(player => (
                                                                        <MenuItem key={player.id} value={player.id}>
                                                                            {player.name}
                                                                        </MenuItem>
                                                                    ))}
                                                                </TextField>
                                                            </TableCell>
                                                            <TableCell></TableCell>
                                                        </TableRow>
                                                    ) : (
                                                        <TableRow
                                                            style={{backgroundColor: '#e2b6b6'}}>
                                                            <TableCell>LW</TableCell>
                                                            <TableCell
                                                                className={"playerClicker"}
                                                                data-playerid={seasonData.aml.id}
                                                                style={{minWidth: 150, maxWidth: 150}}
                                                                onClick={goToPlayer}
                                                            >
                                                                {seasonData.aml.name}
                                                            </TableCell>
                                                            <TableCell className={"teamClicker"}
                                                                       data-teamid={seasonData.aml.team.id}
                                                                       style={{minWidth: 120, maxWidth: 120}}
                                                                       onClick={goToTeam}>
                                                                {seasonData.aml.team.name}
                                                            </TableCell>
                                                        </TableRow>)}

                                                    {seasonData.amr == null ? (
                                                        <TableRow>
                                                            <TableCell>RW</TableCell>
                                                            <TableCell>
                                                                <TextField
                                                                    style={{width: 200}}
                                                                    id="amr"
                                                                    select
                                                                    label="right winger"
                                                                    value={pageData.amr}
                                                                    onChange={handleChange("amr")}
                                                                    margin="normal">
                                                                    {players.map(player => (
                                                                        <MenuItem key={player.id} value={player.id}>
                                                                            {player.name}
                                                                        </MenuItem>
                                                                    ))}
                                                                </TextField>
                                                            </TableCell>
                                                            <TableCell></TableCell>
                                                        </TableRow>
                                                    ) : (
                                                        <TableRow
                                                            style={{backgroundColor: '#e2b6b6'}}>
                                                            <TableCell>LR</TableCell>
                                                            <TableCell
                                                                className={"playerClicker"}
                                                                data-playerid={seasonData.amr.id}
                                                                style={{minWidth: 150, maxWidth: 150}}
                                                                onClick={goToPlayer}
                                                            >
                                                                {seasonData.amr.name}
                                                            </TableCell>
                                                            <TableCell className={"teamClicker"}
                                                                       data-teamid={seasonData.amr.team.id}
                                                                       style={{minWidth: 120, maxWidth: 120}}
                                                                       onClick={goToTeam}>
                                                                {seasonData.amr.team.name}
                                                            </TableCell>
                                                        </TableRow>)}

                                                    {seasonData.st == null ? (
                                                        <TableRow>
                                                            <TableCell>ST</TableCell>
                                                            <TableCell>
                                                                <TextField
                                                                    style={{width: 200}}
                                                                    id="st"
                                                                    select
                                                                    label="striker"
                                                                    value={pageData.st}
                                                                    onChange={handleChange("st")}
                                                                    margin="normal">
                                                                    {players.map(player => (
                                                                        <MenuItem key={player.id} value={player.id}>
                                                                            {player.name}
                                                                        </MenuItem>
                                                                    ))}
                                                                </TextField>
                                                            </TableCell>
                                                            <TableCell></TableCell>
                                                        </TableRow>
                                                    ) : (
                                                        <TableRow
                                                            style={{backgroundColor: '#e2b6b6'}}>
                                                            <TableCell>ST</TableCell>
                                                            <TableCell
                                                                className={"playerClicker"}
                                                                data-playerid={seasonData.st.id}
                                                                style={{minWidth: 150, maxWidth: 150}}
                                                                onClick={goToPlayer}
                                                            >
                                                                {seasonData.st.name}
                                                            </TableCell>
                                                            <TableCell className={"teamClicker"}
                                                                       data-teamid={seasonData.st.team.id}
                                                                       style={{minWidth: 120, maxWidth: 120}}
                                                                       onClick={goToTeam}>
                                                                {seasonData.st.team.name}
                                                            </TableCell>
                                                        </TableRow>)}

                                                </TableBody>
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
}
