import LeagueToolbar from "./LeagueToolbar"
import {AppBar, Box, Grid, Paper, Tab, Tabs} from "@material-ui/core"
import Seeding from "./season_components/Seeding"
import Groups1 from "./season_components/Groups1"
import Quals from "./season_components/Quals"
import Groups2 from "./season_components/Groups2"
import Knockouts from "./season_components/Knockouts"
import SeasonPostview from "./season_components/SeasonPostview"
import NextGame from "./NextGame"
import {useParams} from "react-router"
import {useTab} from "../TabsPersistanceManager"
import {useDataLoader} from "../DataLoaderManager"
import PageLoader from "../PageLoader";

export default function Season() {
    const {seasonNum} = useParams()

    const {tabActive, handleChangeTab} = useTab(seasonNum, "season")
    const stages = useDataLoader("/rest/seasons/" + seasonNum + "/status")

    if (stages === null) {
        return (<PageLoader />)
    } else {
        return (
            <Paper style={{margin: 10}} elevation={20}>
                <Grid container spacing={1}>
                    <Grid item xs={9}>
                        <LeagueToolbar pageTitle={"Season " + seasonNum} seasonNum={seasonNum}/>
                        <Box style={{margin: 10}}>
                            <AppBar position="static">
                                <Tabs value={tabActive} onChange={handleChangeTab} variant="scrollable">
                                    <Tab  label="Seeding"/>
                                    <Tab disabled={seasonNum == 1} label="Preliminary round"/>
                                    <Tab label="Qualifying round"/>
                                    <Tab label="Play-off round"/>
                                    <Tab label="1st Group stage"/>
                                    <Tab disabled={(stages.groups2 === "NOT_STARTED")} label="2nd Group stage"/>
                                    <Tab disabled={(stages.playoffs === "NOT_STARTED")} label="Knockout phase"/>
                                    <Tab disabled={(stages.playoffs !== "FINISHED")} label="Overview"/>
                                </Tabs>
                            </AppBar>
                            {tabActive === 0 && <Seeding year={seasonNum}/>}
                            {tabActive === 1 && <Quals year={seasonNum} round={0} stage={stages.quals0}/>}
                            {tabActive === 2 && <Quals year={seasonNum} round={1} stage={stages.quals1}/>}
                            {tabActive === 3 && <Quals year={seasonNum} round={2} stage={stages.quals2}/>}
                            {tabActive === 4 && <Groups1 year={seasonNum} stage={stages.groups1}/>}
                            {tabActive === 5 && <Groups2 year={seasonNum} stage={stages.groups1}/>}
                            {tabActive === 6 && <Knockouts year={seasonNum}/>}
                            {tabActive === 7 && <SeasonPostview year={seasonNum}/>}
                        </Box>
                    </Grid>
                    <Grid item xs={3}>
                        <NextGame/>
                    </Grid>
                </Grid>
            </Paper>
        )
    }
}